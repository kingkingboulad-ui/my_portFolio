import AnimatedSection from '@/components/shared/animated-section';
import {
  Code2,
  Server,
  Database,
  Globe,
  Palette,
  Smartphone,
} from 'lucide-react';

const skillCategories = [
  {
    icon: Code2,
    title: 'Frontend',
    color: 'amber',
    skills: [
      { name: 'Next.js', level: 90 },
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'shadcn/ui', level: 90 },
    ],
  },
  {
    icon: Server,
    title: 'Backend',
    color: 'yellow',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express', level: 90 },
      { name: 'REST APIs', level: 92 },
      { name: 'Socket.IO', level: 80 },
      { name: 'JWT Auth', level: 85 },
    ],
  },
  {
    icon: Database,
    title: 'Database',
    color: 'orange',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'MongoDB', level: 75 },
      { name: 'Prisma', level: 70 },
      { name: 'Query Optimization', level: 80 },
    ],
  },
  {
    icon: Globe,
    title: 'DevOps',
    color: 'amber',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 70 },
      { name: 'Linux', level: 75 },
      { name: 'CI/CD', level: 72 },
    ],
  },
  {
    icon: Palette,
    title: 'Design',
    color: 'yellow',
    skills: [
      { name: 'Figma', level: 80 },
      { name: 'UI/UX Design', level: 85 },
      { name: 'Responsive Design', level: 95 },
      { name: 'Dark Mode', level: 90 },
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    color: 'orange',
    skills: [
      { name: 'React Native', level: 65 },
      { name: 'PWA', level: 80 },
      { name: 'Mobile-First', level: 90 },
    ],
  },
];

export default function SkillsPage() {
  return (
    <section className="py-24 bg-page min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-t1 mb-3 mt-10">
              المهارات <span className="text-gradient-gold">التقنية</span>
            </h1>
            <p className="text-t3 max-w-lg mx-auto">
              نظرة تفصيلية على أدوات وتقنيات أتقنها
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, index) => (
            <AnimatedSection key={category.title} delay={index * 0.08}>
              <div className="group p-6 rounded-2xl bg-card-bg border border-card-border hover:border-amber-500/20 transition-all duration-500 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                    <category.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-t1">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm text-t2">{skill.name}</span>
                        <span className="text-xs text-amber-400 font-mono">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-input-bg overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
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
