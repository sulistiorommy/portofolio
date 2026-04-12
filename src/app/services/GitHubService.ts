const GITHUB_USERNAME = 'sulistiorommy';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers: HeadersInit = GITHUB_TOKEN ? {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json'
} : {
  'Accept': 'application/vnd.github.v3+json'
};

export const GitHubService = {
  async getUserProfile() {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch GitHub profile');
    return response.json();
  },

  async getUserRepos() {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers });
    if (!response.ok) return [];
    return response.json();
  },

  async getCommitActivity() {
    try {
      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);
      const dateStr = lastWeek.toISOString().split('T')[0];

      // Use Commit Search API to get activity for the last 7 days
      const response = await fetch(`https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}+committer-date:>${dateStr}&sort=committer-date&order=desc`, { headers });
      
      if (!response.ok) return [];
      
      const data = await response.json();
      const statsMap: Record<string, number> = {};
      
      // Initialize map with last 7 days set to 0
      for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        statsMap[d.toISOString().split('T')[0]] = 0;
      }

      data.items?.forEach((item: any) => {
        const date = item.commit.committer.date.split('T')[0];
        if (statsMap[date] !== undefined) {
          statsMap[date]++;
        }
      });

      return Object.entries(statsMap)
        .map(([date, count]) => ({
          name: new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
          commits: count
        }))
        .reverse();
    } catch (error) {
      console.error('Commit Stats Error:', error);
      return [];
    }
  },

  async getRecentCommits(limit = 3) {
    try {
      // Use Commit Search API which is more stable and accurate than the events feed
      const response = await fetch(`https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}&sort=committer-date&order=desc&per_page=${limit}`, { 
        headers
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error(`GitHub API Error (${response.status}):`, errorData);
        return [];
      }
      
      const data = await response.json();
      
      if (!data.items) return [];

      return data.items.map((item: any) => ({
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

  async getUserRepos() {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, { headers });
    if (!response.ok) throw new Error('Failed to fetch GitHub repos');
    return response.json();
  }
};
