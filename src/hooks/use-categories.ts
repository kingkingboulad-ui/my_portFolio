'use client';

import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/lib/api';
import type { Category } from '@/types';

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axiosClient.get('/api/categories');
      return res.data.data;
    },
  });
}
