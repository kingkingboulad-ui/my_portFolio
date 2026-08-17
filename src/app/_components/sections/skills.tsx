import AnimatedSection from '@/components/shared/animated-section';
import {
  Code2,
  Database,
  Globe,
  Palette,
  Server,
  Smartphone,
} from 'lucide-react';

const skills = [
  {
    icon: Code2,
    title: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    color: 'amber',
  },
  {
    icon: Server,
    title: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'Socket.IO'],
    color: 'yellow',
  },
  {
    icon: Database,
    title: 'Database',
    items: ['MySQL', 'MongoDB', 'Prisma', 'Redis'],
    color: 'orange',
  },
  {
    icon: Globe,
    title: 'DevOps',
    items: ['Git', 'Docker', 'Linux', 'CI/CD'],
    color: 'amber',
  },
  {
    icon: Palette,
    title: 'UI/UX',
    items: ['Figma', 'shadcn/ui', 'Framer Motion', 'Responsive'],
    color: 'yellow',
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    items: ['React Native', 'PWA', 'Responsive', 'RTL Support'],
    color: 'orange',
  },
];

export default function Skills() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-t1 mb-3">
              المهارات <span className="text-gradient-gold">التقنية</span>
            </h2>
            <p className="text-t3 max-w-lg mx-auto">
              أدوات وتقنيات أستخدمها لبناء تجارب رقمية متميزة
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, index) => (
            <AnimatedSection key={skill.title} delay={index * 0.08}>
              <div className="group p-6 rounded-2xl bg-card-bg border border-card-border hover:border-amber-500/20 transition-all duration-500 hover:shadow-lg hover:shadow-amber-500/5 h-full">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <skill.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-t1 mb-3">{skill.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2.5 py-1 rounded-lg bg-input-bg text-t2 border border-card-border-subtle"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
