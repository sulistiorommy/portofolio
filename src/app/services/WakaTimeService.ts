const WAKATIME_API_KEY = import.meta.env.VITE_WAKATIME_API_KEY;

export const WakaTimeService = {
  async getStats() {
    try {
      if (!WAKATIME_API_KEY) {
        console.warn('WakaTime API Key missing. Using mock data.');
        return this.getMockData();
      }

      // Using the local Vite proxy set up in vite.config.ts
      // This bypasses CORS and preserves authentication headers
      const proxyUrl = `/api/wakatime/users/current/summaries?range=last_7_days`;
      
      const response = await fetch(proxyUrl, {
        headers: {
          'Authorization': `Basic ${btoa(WAKATIME_API_KEY + ':')}`,
        }
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

  formatSummariesData(rawData: any) {
    if (!rawData || !rawData.data) return this.getMockData();

    const activity = rawData.data.map((day: any) => {
      const dateObj = new Date(day.range.date);
      return {
        day: dateObj.toLocaleDateString('en-US', { weekday: 'short' }), // "Mon"
        date: dateObj.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }), // "12 Apr"
        fullDate: day.range.text, // "Sunday, April 12, 2026"
        hours: parseFloat(day.grand_total.decimal)
      };
    });

    return {
      data: {
        human_readable_total: rawData.cumulative_total.text,
        daily_average: rawData.daily_average.text,
        activity,
        // Since summaries endpoint doesn't give languages/editors in the basic range call 
        // as easily as stats, we provide fallbacks or empty for now, or the user can expand this.
        languages: this.getMockData().data.languages, 
        editors: this.getMockData().data.editors
      }
    };
  },

  getMockData() {
    return {
      data: {
        human_readable_total: "28h 45m",
        daily_average: "4h 06m",
        languages: [
          { name: "TypeScript", percent: 45.5 },
          { name: "JavaScript", percent: 25.2 },
          { name: "React", percent: 15.3 },
          { name: "CSS", percent: 14.0 }
        ],
        editors: [
          { name: "VS Code", percent: 85.0 },
          { name: "Antigravity AI", percent: 15.0 }
        ],
        activity: [
          { day: "Mon", date: "06 Apr", hours: 4.2 },
          { day: "Tue", date: "07 Apr", hours: 3.8 },
          { day: "Wed", date: "08 Apr", hours: 5.1 },
          { day: "Thu", date: "09 Apr", hours: 4.5 },
          { day: "Fri", date: "10 Apr", hours: 6.2 },
          { day: "Sat", date: "11 Apr", hours: 2.5 },
          { day: "Sun", date: "12 Apr", hours: 3.1 }
        ]
      }
    };
  }
};
