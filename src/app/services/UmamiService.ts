const UMAMI_WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID;
const UMAMI_SHARE_TOKEN = import.meta.env.VITE_UMAMI_SHARE_TOKEN;
const UMAMI_SERVER_URL = import.meta.env.VITE_UMAMI_SERVER_URL || 'https://cloud.umami.is';

export const UmamiService = {
  async getStats() {
    try {
      if (!UMAMI_WEBSITE_ID || !UMAMI_SHARE_TOKEN) {
        return this.getEmptyStats();
      }

      const endAt = Date.now();
      const startAt = endAt - 24 * 60 * 60 * 1000;

      const apiUrl = `${UMAMI_SERVER_URL}/api/share/${UMAMI_SHARE_TOKEN}/stats?startAt=${startAt}&endAt=${endAt}`;
      const response = await fetch(apiUrl);

      if (!response.ok) throw new Error(`Umami API Error: ${response.status}`);

      const data = await response.json();
      return {
        visitors: data.visitors?.value || 0,
        pageviews: data.pageviews?.value || 0,
        sessions: data.sessions?.value || 0,
        events: data.events?.value || 0,
        totaltime: data.totaltime?.value || 0
      };
    } catch (error) {
      console.error('Umami Stats Error:', error);
      return this.getEmptyStats();
    }
  },

  async getLocations() {
    try {
      if (!UMAMI_WEBSITE_ID || !UMAMI_SHARE_TOKEN) return [];

      const endAt = Date.now();
      const startAt = endAt - 7 * 24 * 60 * 60 * 1000;

      const apiUrl = `${UMAMI_SERVER_URL}/api/share/${UMAMI_SHARE_TOKEN}/metrics?type=country&startAt=${startAt}&endAt=${endAt}`;
      const response = await fetch(apiUrl);

      if (!response.ok) throw new Error(`Umami Metrics Error: ${response.status}`);

      const data = await response.json();
      return Array.isArray(data) ? data.slice(0, 5) : [];
    } catch (error) {
      console.error('Umami Locations Error:', error);
      return [];
    }
  },

  async getChartData(view: '7d' | '12m' = '7d') {
    try {
      if (!UMAMI_WEBSITE_ID || !UMAMI_SHARE_TOKEN) return [];

      const endAt = Date.now();
      let startAt;
      let unit: 'day' | 'month';

      if (view === '7d') {
        startAt = endAt - 7 * 24 * 60 * 60 * 1000;
        unit = 'day';
      } else {
        startAt = endAt - 12 * 30 * 24 * 60 * 60 * 1000; // ~12 months
        unit = 'month';
      }

      const apiUrl = `${UMAMI_SERVER_URL}/api/share/${UMAMI_SHARE_TOKEN}/pageviews?unit=${unit}&startAt=${startAt}&endAt=${endAt}`;
      const response = await fetch(apiUrl);

      if (!response.ok) throw new Error(`Umami Pageviews Error: ${response.status}`);

      const data = await response.json();
      return data.pageviews || [];
    } catch (error) {
      console.error('Umami Chart Error:', error);
      return [];
    }
  },

  async getMetrics(type: 'url' | 'referrer' | 'browser' | 'os' | 'device') {
    try {
      if (!UMAMI_WEBSITE_ID || !UMAMI_SHARE_TOKEN) return [];

      const endAt = Date.now();
      const startAt = endAt - 7 * 24 * 60 * 60 * 1000; // Last 7 days

      const apiUrl = `${UMAMI_SERVER_URL}/api/share/${UMAMI_SHARE_TOKEN}/metrics?type=${type}&startAt=${startAt}&endAt=${endAt}`;
      const response = await fetch(apiUrl);

      if (!response.ok) throw new Error(`Umami Metrics Error: ${response.status}`);

      const data = await response.json();
      return Array.isArray(data) ? data.slice(0, 5) : [];
    } catch (error) {
      console.error(`Umami Metrics (${type}) Error:`, error);
      return [];
    }
  },

  getEmptyStats() {
    return { visitors: 0, pageviews: 0, sessions: 0, events: 0, totaltime: 0 };
  }
};


