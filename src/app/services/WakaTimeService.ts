const WAKATIME_USERNAME = 'sulistiorommy'; // Ideally this can be dynamic
const WAKATIME_API_KEY = import.meta.env.VITE_WAKATIME_API_KEY;

export const WakaTimeService = {
  async getStats() {
    // Note: WakaTime API usually requires CORS handling if called directly from browser.
    // If it fails, we might need a backup or inform the user about CORS.
    // For many, using the public JSON export or a serverless function is preferred.
    try {
      const response = await fetch(`https://wakatime.com/api/v1/users/${WAKATIME_USERNAME}/stats/last_7_days`);
      if (!response.ok) {
        // Fallback or error
        console.warn('Wakatime API call failed (likely CORS). Using mock data for development.');
        return this.getMockData();
      }
      return response.json();
    } catch (error) {
      console.error('WakaTime Error:', error);
      return this.getMockData();
    }
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
        ]
      }
    };
  }
};
