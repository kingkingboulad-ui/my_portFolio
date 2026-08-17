'use client';

import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/lib/api';
import type { Project } from '@/types';

export function useProjects(category?: string, search?: string) {
  return useQuery<Project[]>({
    queryKey: ['projects', category, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (search) params.append('search', search);
      const url = `/api/project${params.toString() ? '?' + params.toString() : ''}`;
      const res = await axiosClient.get(url);
      return res.data.data;
    },
  });
}

export function useLatestProjects() {
  return useQuery<Project[]>({
    queryKey: ['latestProjects'],
    queryFn: async () => {
      const res = await axiosClient.get('/api/latest-projects');
      return res.data.data;
    },
  });
}
