import type { GitHubProfile, GitHubRepo, CommitEntry, CommitActivityPoint } from './types';

const GITHUB_USERNAME = 'sulistiorommy';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers: HeadersInit = {
  Accept: 'application/vnd.github.v3+json',
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

// ── Timeout & Retry Configuration ──
const FETCH_TIMEOUT_MS = 10_000;  // 10 second timeout per request
const MAX_RETRIES = 1;            // Retry once on failure

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
async function fetchWithRetry(url: string, options: RequestInit): Promise<Response> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options);
      if (response.ok || response.status < 500) return response;

      if (attempt < MAX_RETRIES) {
        console.warn(`GitHub API retry ${attempt + 1}/${MAX_RETRIES} (status ${response.status})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }
      return response;
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        const isTimeout = error instanceof DOMException && error.name === 'AbortError';
        console.warn(`GitHub API retry ${attempt + 1}/${MAX_RETRIES} (${isTimeout ? 'timeout' : 'network error'})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }
      throw error;
    }
  }
  throw new Error('GitHub API: Max retries exceeded');
}

export const GitHubService = {
  async getUserProfile(): Promise<GitHubProfile> {
    const response = await fetchWithRetry(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      { headers },
    );
    if (!response.ok) throw new Error('Failed to fetch GitHub profile');
    return response.json();
  },

  async getUserRepos(): Promise<GitHubRepo[]> {
    const response = await fetchWithRetry(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { headers },
    );
    if (!response.ok) return [];
    return response.json();
  },

  async getCommitActivity(): Promise<CommitActivityPoint[]> {
    try {
      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);
      const dateStr = lastWeek.toISOString().split('T')[0];

      const response = await fetchWithRetry(
        `https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}+committer-date:>${dateStr}&sort=committer-date&order=desc`,
        { headers },
      );

      if (!response.ok) return [];

      const data = await response.json();
      const statsMap: Record<string, number> = {};

      // Initialize map with last 7 days set to 0
      for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        statsMap[d.toISOString().split('T')[0]] = 0;
      }

      data.items?.forEach((item: { commit: { committer: { date: string } } }) => {
        const date = item.commit.committer.date.split('T')[0];
        if (statsMap[date] !== undefined) {
          statsMap[date]++;
        }
      });

      return Object.entries(statsMap)
        .map(([date, count]) => ({
          name: new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
          commits: count,
        }))
        .reverse();
    } catch (error) {
      console.error('Commit Stats Error:', error);
      return [];
    }
  },

  async getRecentCommits(limit = 3): Promise<CommitEntry[]> {
    try {
      const response = await fetchWithRetry(
        `https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}&sort=committer-date&order=desc&per_page=${limit}`,
        { headers },
      );

      if (!response.ok) {
        console.error(`GitHub API Error (${response.status}):`, await response.text());
        return [];
      }

      const data = await response.json();
      if (!data.items) return [];

      return data.items.map((item: { repository: { name: string }; commit: { message: string; author: { date: string } }; sha: string }) => ({
        repo: item.repository.name,
        message: item.commit.message,
        sha: item.sha,
        date: item.commit.author.date,
      }));
    } catch (error) {
      console.error('GitHub Service Error:', error);
      return [];
    }
  },
};
