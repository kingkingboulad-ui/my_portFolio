'use client';

import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/lib/api';
import type { Stats } from '@/types';

export function useStats() {
  return useQuery<Stats>({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await axiosClient.get('/api/stats');
      return res.data.data;
    },
  });
}
