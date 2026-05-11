import type { WakaTimeResponse, WakaTimeLanguage, WakaTimeEditor } from './types';

const WAKATIME_API_KEY = import.meta.env.VITE_WAKATIME_API_KEY;

export const WakaTimeService = {
  async getStats(): Promise<WakaTimeResponse> {
    try {
      if (!WAKATIME_API_KEY) {
        console.warn('WakaTime API Key missing. Using mock data.');
        return this.getMockData();
      }

      // Using the local Vite proxy set up in vite.config.ts
      // This bypasses CORS and preserves authentication headers
      const proxyUrl = '/api/wakatime/users/current/summaries?range=last_7_days';

      const response = await fetch(proxyUrl, {
        headers: {
          Authorization: `Basic ${btoa(WAKATIME_API_KEY + ':')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`WakaTime API Error: ${response.status}`);
      }

      const rawData = await response.json();
      return this.formatSummariesData(rawData);
    } catch (error) {
      console.error('WakaTime Fetch Error:', error);
      return this.getMockData();
    }
  },

  formatSummariesData(rawData: Record<string, unknown>): WakaTimeResponse {
    if (!rawData?.data) return this.getMockData();

    const days = rawData.data as Array<{
      range: { date: string; text: string };
      grand_total: { decimal: string };
      languages?: Array<{ name: string; percent: number }>;
      editors?: Array<{ name: string; percent: number }>;
    }>;

    const activity = days.map((day) => {
      const dateObj = new Date(day.range.date);
      return {
        day: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
        date: dateObj.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
        fullDate: day.range.text,
        hours: parseFloat(day.grand_total.decimal),
      };
    });

    // Aggregate language stats from all days instead of using mock data
    const languageMap = new Map<string, number>();
    const editorMap = new Map<string, number>();

    days.forEach((day) => {
      day.languages?.forEach((lang) => {
        languageMap.set(lang.name, (languageMap.get(lang.name) || 0) + lang.percent);
      });
      day.editors?.forEach((editor) => {
        editorMap.set(editor.name, (editorMap.get(editor.name) || 0) + editor.percent);
      });
    });

    const totalLangWeight = Array.from(languageMap.values()).reduce((a, b) => a + b, 0);
    const totalEditorWeight = Array.from(editorMap.values()).reduce((a, b) => a + b, 0);

    const languages: WakaTimeLanguage[] = Array.from(languageMap.entries())
      .map(([name, weight]) => ({
        name,
        percent: totalLangWeight > 0 ? Math.round((weight / totalLangWeight) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.percent - a.percent);

    const editors: WakaTimeEditor[] = Array.from(editorMap.entries())
      .map(([name, weight]) => ({
        name,
        percent: totalEditorWeight > 0 ? Math.round((weight / totalEditorWeight) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.percent - a.percent);

    const cumulativeTotal = rawData.cumulative_total as { text: string } | undefined;
    const dailyAverage = rawData.daily_average as { text: string } | undefined;

    return {
      data: {
        human_readable_total: cumulativeTotal?.text || '0h',
        daily_average: dailyAverage?.text || '0h',
        activity,
        languages: languages.length > 0 ? languages : this.getMockData().data.languages,
        editors: editors.length > 0 ? editors : this.getMockData().data.editors,
      },
    };
  },

  getMockData(): WakaTimeResponse {
    return {
      data: {
        human_readable_total: '28h 45m',
        daily_average: '4h 06m',
        languages: [
          { name: 'TypeScript', percent: 45.5 },
          { name: 'JavaScript', percent: 25.2 },
          { name: 'React', percent: 15.3 },
          { name: 'CSS', percent: 14.0 },
        ],
        editors: [
          { name: 'VS Code', percent: 85.0 },
          { name: 'Antigravity AI', percent: 15.0 },
        ],
        activity: [
          { day: 'Mon', date: '06 Apr', hours: 4.2 },
          { day: 'Tue', date: '07 Apr', hours: 3.8 },
          { day: 'Wed', date: '08 Apr', hours: 5.1 },
          { day: 'Thu', date: '09 Apr', hours: 4.5 },
          { day: 'Fri', date: '10 Apr', hours: 6.2 },
          { day: 'Sat', date: '11 Apr', hours: 2.5 },
          { day: 'Sun', date: '12 Apr', hours: 3.1 },
        ],
      },
    };
  },
};
