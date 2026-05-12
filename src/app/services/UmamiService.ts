import type { UmamiStats, UmamiMetricPoint, UmamiChartPoint } from './types';

const UMAMI_WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID;
const UMAMI_API_KEY = import.meta.env.VITE_UMAMI_API_KEY;
const UMAMI_SERVER_URL = import.meta.env.VITE_UMAMI_SERVER_URL || 'https://api.umami.is';

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

// ── Timeout & Retry Configuration ──
const FETCH_TIMEOUT_MS = 12_000;  // 12 second timeout per request
const MAX_RETRIES = 2;            // Retry up to 2 times on failure
const RETRY_DELAY_MS = 1_000;     // Wait 1 second between retries

// ── Simple in-memory cache (5 minutes TTL) ──
const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, { data: unknown; timestamp: number }>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL_MS) {
    return entry.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// ── Fetch with timeout ──
async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

// ── Fetch with retry + timeout ──
async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options);
      if (response.ok) return response;

      // Don't retry on 401 (invalid key) or 403 (forbidden)
      if (response.status === 401 || response.status === 403) {
        return response;
      }

      // Retry on server errors (5xx) or rate limits (429)
      if (attempt < retries && (response.status >= 500 || response.status === 429)) {
        console.warn(`Umami API retry ${attempt + 1}/${retries} (status ${response.status})`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * (attempt + 1)));
        continue;
      }

      return response;
    } catch (error) {
      if (attempt < retries) {
        const isTimeout = error instanceof DOMException && error.name === 'AbortError';
        console.warn(`Umami API retry ${attempt + 1}/${retries} (${isTimeout ? 'timeout' : 'network error'})`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * (attempt + 1)));
        continue;
      }
      throw error;
    }
  }

  // This shouldn't be reached, but just in case
  throw new Error('Umami API: Max retries exceeded');
}

function buildUrl(path: string, params: Record<string, string | number>): string {
  const qs = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)]),
  ).toString();
  return `${UMAMI_SERVER_URL}/v1/websites/${UMAMI_WEBSITE_ID}/${path}?${qs}`;
}

function getAuthHeaders(): HeadersInit {
  return { 'x-umami-api-key': UMAMI_API_KEY };
}

export const UmamiService = {
  async getStats(): Promise<UmamiStats> {
    try {
      if (!UMAMI_WEBSITE_ID || !UMAMI_API_KEY) return this.getEmptyStats();

      // Check cache first
      const cached = getCached<UmamiStats>('stats');
      if (cached) return cached;

      const endAt = Date.now();
      const startAt = endAt - 30 * DAY_MS;

      const response = await fetchWithRetry(
        buildUrl('stats', { startAt, endAt }),
        { headers: getAuthHeaders() },
      );

      if (!response.ok) {
        if (response.status === 401) throw new Error('API_KEY_INVALID');
        throw new Error(`Umami API Error: ${response.status}`);
      }

      const data = await response.json();
      const result: UmamiStats = {
        visitors: data.visitors || 0,
        pageviews: data.pageviews || 0,
        sessions: data.visits || data.sessions || 0,
        events: data.events || 0,
        totaltime: data.totaltime || 0,
      };

      setCache('stats', result);
      return result;
    } catch (error: unknown) {
      console.error('Umami Stats Error:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { ...this.getEmptyStats(), error: message };
    }
  },

  async getLocations(): Promise<UmamiMetricPoint[]> {
    try {
      if (!UMAMI_WEBSITE_ID || !UMAMI_API_KEY) return [];

      const cached = getCached<UmamiMetricPoint[]>('locations');
      if (cached) return cached;

      const endAt = Date.now();
      const startAt = endAt - 7 * DAY_MS;

      const response = await fetchWithRetry(
        buildUrl('metrics', { type: 'country', startAt, endAt }),
        { headers: getAuthHeaders() },
      );

      if (!response.ok) throw new Error(`Umami Metrics Error: ${response.status}`);

      const data = await response.json();
      const result = Array.isArray(data) ? data.slice(0, 5) : [];
      setCache('locations', result);
      return result;
    } catch (error) {
      console.error('Umami Locations Error:', error);
      return [];
    }
  },

  async getChartData(view: '7d' | '12m' = '7d'): Promise<UmamiChartPoint[]> {
    try {
      if (!UMAMI_WEBSITE_ID || !UMAMI_API_KEY) return [];

      const cacheKey = `chart_${view}`;
      const cached = getCached<UmamiChartPoint[]>(cacheKey);
      if (cached) return cached;

      const endAt = Date.now();
      const startAt = view === '7d'
        ? endAt - 7 * DAY_MS
        : endAt - 12 * 30 * DAY_MS;
      const unit = view === '7d' ? 'day' : 'month';

      const response = await fetchWithRetry(
        buildUrl('pageviews', { unit, startAt, endAt }),
        { headers: getAuthHeaders() },
      );

      if (!response.ok) throw new Error(`Umami Pageviews Error: ${response.status}`);

      const data = await response.json();
      const result = data.pageviews || [];
      setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Umami Chart Error:', error);
      return [];
    }
  },

  async getMetrics(
    type: 'url' | 'referrer' | 'browser' | 'os' | 'device',
  ): Promise<UmamiMetricPoint[]> {
    try {
      if (!UMAMI_WEBSITE_ID || !UMAMI_API_KEY) return [];

      const cacheKey = `metrics_${type}`;
      const cached = getCached<UmamiMetricPoint[]>(cacheKey);
      if (cached) return cached;

      const endAt = Date.now();
      const startAt = endAt - 7 * DAY_MS;

      const response = await fetchWithRetry(
        buildUrl('metrics', { type, startAt, endAt }),
        { headers: getAuthHeaders() },
      );

      if (!response.ok) throw new Error(`Umami Metrics Error: ${response.status}`);

      const data = await response.json();
      const result = Array.isArray(data) ? data.slice(0, 5) : [];
      setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error(`Umami Metrics (${type}) Error:`, error);
      return [];
    }
  },

  getEmptyStats(): UmamiStats {
    return { visitors: 0, pageviews: 0, sessions: 0, events: 0, totaltime: 0 };
  },

  /** Clear all cached data (useful when switching views or force-refreshing) */
  clearCache(): void {
    cache.clear();
  },
};
