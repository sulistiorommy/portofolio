const GITHUB_USERNAME = 'sulistiorommy';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers: HeadersInit = GITHUB_TOKEN ? {
  Authorization: `token ${GITHUB_TOKEN}`,
} : {};

export const GitHubService = {
  async getUserProfile() {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch GitHub profile');
    return response.json();
  },

  async getRecentCommits(limit = 3) {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events`, { headers });
    if (!response.ok) throw new Error('Failed to fetch GitHub events');
    const events = await response.json();
    
    // Filter PushEvents and extract commits
    const commits: any[] = [];
    for (const event of events) {
      if (event.type === 'PushEvent' && event.payload.commits) {
        for (const commit of event.payload.commits) {
          commits.push({
            repo: event.repo.name.replace(`${GITHUB_USERNAME}/`, ''),
            message: commit.message,
            sha: commit.sha,
            date: event.created_at,
          });
          if (commits.length >= limit) return commits;
        }
      }
    }
    return commits;
  },

  async getUserRepos() {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, { headers });
    if (!response.ok) throw new Error('Failed to fetch GitHub repos');
    return response.json();
  }
};
