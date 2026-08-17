'use client';

import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/lib/api';
import type { Contact } from '@/types';

export function useContacts() {
  return useQuery<Contact[], Error>({
    queryKey: ['contacts'],
    queryFn: async () => {
      const res = await axiosClient.get('/api/contacts');
      return res.data.data;
    },
    retry: 1,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}
