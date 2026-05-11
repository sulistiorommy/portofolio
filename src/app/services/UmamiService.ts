import type { UmamiStats, UmamiMetricPoint, UmamiChartPoint } from './types';

const UMAMI_WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID;
const UMAMI_API_KEY = import.meta.env.VITE_UMAMI_API_KEY;
const UMAMI_SERVER_URL = import.meta.env.VITE_UMAMI_SERVER_URL || 'https://api.umami.is';

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

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

      const endAt = Date.now();
      const startAt = endAt - DAY_MS;

      const response = await fetch(
        buildUrl('stats', { startAt, endAt }),
        { headers: getAuthHeaders() },
      );

      if (!response.ok) {
        if (response.status === 401) throw new Error('API_KEY_INVALID');
        throw new Error(`Umami API Error: ${response.status}`);
      }

      const data = await response.json();
      return {
        visitors: data.visitors || 0,
        pageviews: data.pageviews || 0,
        sessions: data.visits || data.sessions || 0,
        events: data.events || 0,
        totaltime: data.totaltime || 0,
      };
    } catch (error: unknown) {
      console.error('Umami Stats Error:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { ...this.getEmptyStats(), error: message };
    }
  },

  async getLocations(): Promise<UmamiMetricPoint[]> {
    try {
      if (!UMAMI_WEBSITE_ID || !UMAMI_API_KEY) return [];

      const endAt = Date.now();
      const startAt = endAt - 7 * DAY_MS;

      const response = await fetch(
        buildUrl('metrics', { type: 'country', startAt, endAt }),
        { headers: getAuthHeaders() },
      );

      if (!response.ok) throw new Error(`Umami Metrics Error: ${response.status}`);

      const data = await response.json();
      return Array.isArray(data) ? data.slice(0, 5) : [];
    } catch (error) {
      console.error('Umami Locations Error:', error);
      return [];
    }
  },

  async getChartData(view: '7d' | '12m' = '7d'): Promise<UmamiChartPoint[]> {
    try {
      if (!UMAMI_WEBSITE_ID || !UMAMI_API_KEY) return [];

      const endAt = Date.now();
      const startAt = view === '7d'
        ? endAt - 7 * DAY_MS
        : endAt - 12 * 30 * DAY_MS;
      const unit = view === '7d' ? 'day' : 'month';

      const response = await fetch(
        buildUrl('pageviews', { unit, startAt, endAt }),
        { headers: getAuthHeaders() },
      );

      if (!response.ok) throw new Error(`Umami Pageviews Error: ${response.status}`);

      const data = await response.json();
      return data.pageviews || [];
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

      const endAt = Date.now();
      const startAt = endAt - 7 * DAY_MS;

      const response = await fetch(
        buildUrl('metrics', { type, startAt, endAt }),
        { headers: getAuthHeaders() },
      );

      if (!response.ok) throw new Error(`Umami Metrics Error: ${response.status}`);

      const data = await response.json();
      return Array.isArray(data) ? data.slice(0, 5) : [];
    } catch (error) {
      console.error(`Umami Metrics (${type}) Error:`, error);
      return [];
    }
  },

  getEmptyStats(): UmamiStats {
    return { visitors: 0, pageviews: 0, sessions: 0, events: 0, totaltime: 0 };
  },
};
