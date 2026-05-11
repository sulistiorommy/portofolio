// ── GitHub Types ──

export interface GitHubProfile {
  login: string;
  name: string;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  name: string;
  stargazers_count: number;
  html_url: string;
}

export interface CommitEntry {
  repo: string;
  message: string;
  sha: string;
  date: string;
}

export interface CommitActivityPoint {
  name: string;
  commits: number;
}

// ── WakaTime Types ──

export interface WakaTimeLanguage {
  name: string;
  percent: number;
}

export interface WakaTimeEditor {
  name: string;
  percent: number;
}

export interface WakaTimeActivity {
  day: string;
  date: string;
  fullDate?: string;
  hours: number;
}

export interface WakaTimeData {
  human_readable_total: string;
  daily_average: string;
  languages: WakaTimeLanguage[];
  editors: WakaTimeEditor[];
  activity: WakaTimeActivity[];
}

export interface WakaTimeResponse {
  data: WakaTimeData;
}

// ── Umami Types ──

export interface UmamiStats {
  visitors: number;
  pageviews: number;
  sessions: number;
  events: number;
  totaltime: number;
  error?: string;
}

export interface UmamiMetricPoint {
  x: string;
  y: number;
}

export interface UmamiChartPoint {
  x: string;
  y: number;
}
