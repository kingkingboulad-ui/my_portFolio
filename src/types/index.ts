export interface Project {
  id: number;
  title: string;
  category: string;
  image_url: string | null;
  live_demo_url: string | null;
  github_url: string | null;
  description: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: 'unread' | 'read' | 'archived';
  created_at: string;
}

export interface Stats {
  totalProjects: number;
  totalVisits: number;
  totalMessages: number;
  unreadMessages: number;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    admin: Admin;
  };
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  name: string;
  email: string;
  type: string;
  timestamp: Date;
}
