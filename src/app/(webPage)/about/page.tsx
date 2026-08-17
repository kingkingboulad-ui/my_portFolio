import AnimatedSection from '@/components/shared/animated-section';
import {
  Code2, Database, Globe, Palette, Server, Smartphone,
  Award, Coffee, Clock, CheckCircle,
} from 'lucide-react';
import { getSettings } from '@/lib/settings';

const skillIcons = [Code2, Server, Database, Globe, Palette, Smartphone];

const skillData = [
  {
    title: 'Frontend Development',
    description: 'بناء واجهات مستخدم تفاعلية وسريعة',
    items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'shadcn/ui', 'Framer Motion'],
  },
  {
    title: 'Backend Development',
    description: 'تطوير خوادم قوية وAPIs فعالة',
    items: ['Node.js', 'Express 5', 'REST APIs', 'Socket.IO', 'JWT Auth', 'Middleware'],
  },
  {
    title: 'Database Management',
    description: 'إدارة وتحسين قواعد البيانات',
    items: ['MySQL', 'MongoDB', 'Prisma ORM', 'Query Optimization', 'Indexing', 'Migrations'],
  },
  {
    title: 'DevOps & Tools',
    description: 'أدوات النشر والإدارة',
    items: ['Git & GitHub', 'Docker', 'Linux', 'CI/CD', 'Vercel', 'Postman'],
  },
  {
    title: 'UI/UX Design',
    description: 'تصميم واجهات المستخدم',
    items: ['Figma', 'Design Systems', 'Responsive Design', 'RTL Support', 'Dark Mode', 'Accessibility'],
  },
  {
    title: 'Mobile & PWA',
    description: 'تطبيقات الجوال والويب المحسّنة',
    items: ['React Native', 'PWA', 'Mobile-First', 'Touch Gestures', 'Offline Support'],
  },
];

export default async function AboutPage() {
  const settings = await getSettings();
  const a = settings.about;

  const stats = [
    { icon: Award, value: a.projectsCompleted, label: 'مشاريع منجزة' },
    { icon: Coffee, value: a.coffeeCups, label: 'كوب قهوة' },
    { icon: Clock, value: a.workingHours, label: 'ساعة عمل' },
    { icon: CheckCircle, value: a.completionRate, label: 'نسبة الإنجاز' },
  ];

  const info = [
    { label: 'الاسم', value: a.name },
    { label: 'الموقع', value: a.location },
    { label: 'التخصص', value: a.specialty },
    { label: 'اللغات', value: a.languages },
    { label: 'البريد', value: a.email },
    { label: 'الحالة', value: a.status },
  ];

  return (
    <section className="py-24 bg-page min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-t1 mb-3 mt-10">
              عني <span className="text-gradient-gold">وخبراتي</span>
            </h1>
            <p className="text-t3 max-w-lg mx-auto">
              تعرف على مسيرتي المهاراتية وما أقدمه من حلول تقنية
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="p-8 rounded-2xl bg-card-bg border border-card-border mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-black text-t1 mb-4">{a.name}</h2>
                <p className="text-t2 leading-relaxed mb-4">{a.bio1}</p>
                <p className="text-t2 leading-relaxed">{a.bio2}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {info.map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-t4 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm text-t1 font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 0.1}>
              <div className="p-6 rounded-2xl bg-card-bg border border-card-border text-center">
                <div className="inline-flex p-2 rounded-xl bg-amber-500/10 text-amber-400 mb-3">
                  <stat.icon size={20} />
                </div>
                <p className="text-3xl font-black text-t1 mb-1">{stat.value}</p>
                <p className="text-xs text-t3">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <h2 className="text-3xl font-black text-t1 mb-8 text-center">
            المهارات <span className="text-gradient-gold">التقنية</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillData.map((skill, index) => {
            const Icon = skillIcons[index];
            return (
              <AnimatedSection key={skill.title} delay={index * 0.08}>
                <div className="group p-6 rounded-2xl bg-card-bg border border-card-border hover:border-amber-500/20 transition-all duration-500 h-full">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-t1 mb-1">{skill.title}</h3>
                  <p className="text-xs text-t4 mb-4">{skill.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="text-xs px-2.5 py-1 rounded-lg bg-input-bg text-t2 border border-card-border-subtle">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
