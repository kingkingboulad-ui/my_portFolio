import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/api';
import { toast } from 'react-hot-toast';

interface SiteSettings {
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    projectsCount: string;
    yearsCount: string;
    satisfaction: string;
  };
  about: {
    name: string;
    location: string;
    specialty: string;
    languages: string;
    email: string;
    status: string;
    bio1: string;
    bio2: string;
    yearsExperience: string;
    projectsCompleted: string;
    coffeeCups: string;
    workingHours: string;
    completionRate: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export function useSettings() {
  return useQuery<SiteSettings>({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await axiosClient.get('/api/settings');
      return res.data.data;
    },
    staleTime: 0,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: Partial<SiteSettings>) => {
      const res = await axiosClient.put('/api/settings', settings);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('تم حفظ الإعدادات بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء حفظ الإعدادات');
    },
  });
}
