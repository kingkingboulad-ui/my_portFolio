import axiosClient from './api';

export interface SiteSettings {
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

const DEFAULT_SETTINGS: SiteSettings = {
  hero: {
    badge: 'متاح لمشاريع جديدة',
    titleLine1: 'أصمم وأبني',
    titleLine2: 'تجارب رقمية مذهلة',
    subtitle: 'مطور Full-Stack متخصص في تحويل الأفكار المعقدة إلى تطبيقات ويب بسيطة، سريعة، وذات واجهات مستخدم احترافية.',
    projectsCount: '+3',
    yearsCount: '+1',
    satisfaction: '100%',
  },
  about: {
    name: 'عبد الرزاق بولاد',
    location: 'الجزائر',
    specialty: 'Full-Stack Developer',
    languages: 'العربية، الفرنسية، الإنجليزية',
    email: 'bouladabedlrazak@gmail.com',
    status: 'متاح للعمل الحر',
    bio1: 'مطور Full-Stack شغوف ببناء تجارب ويب استثنائية.',
    bio2: 'أؤمن بأن التصميم الجيد ليس مجرد مظهر جميل.',
    yearsExperience: '+1',
    projectsCompleted: '+3',
    coffeeCups: '+500',
    workingHours: '+1000',
    completionRate: '100%',
  },
  contact: {
    email: 'bouladabedlrazak@gmail.com',
    phone: '+123 456 789',
    location: 'الجزائر',
    github: '#',
    linkedin: '#',
    twitter: '#',
  },
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const res = await axiosClient.get('/api/settings');
    if (res.data.success) return res.data.data;
  } catch {}
  return DEFAULT_SETTINGS;
}
