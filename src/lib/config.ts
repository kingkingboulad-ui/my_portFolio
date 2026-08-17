const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  base: API_BASE_URL,
  endpoints: {
    auth: {
      login: `${API_BASE_URL}/api/auth/login`,
      profile: `${API_BASE_URL}/api/auth/profile`,
      changePassword: `${API_BASE_URL}/api/auth/change-password`,
    },
    projects: {
      list: `${API_BASE_URL}/api/project`,
      single: (id: number) => `${API_BASE_URL}/api/project/${id}`,
    },
    categories: {
      list: `${API_BASE_URL}/api/categories`,
    },
    contact: {
      send: `${API_BASE_URL}/api/contact`,
    },
    stats: {
      overview: `${API_BASE_URL}/api/stats`,
      latestProjects: `${API_BASE_URL}/api/latest-projects`,
      incrementVisits: `${API_BASE_URL}/api/increment-visits`,
    },
    health: `${API_BASE_URL}/api/health`,
  },
  socket: API_BASE_URL,
};
