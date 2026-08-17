import Link from 'next/link';
import AnimatedSection from '@/components/shared/animated-section';
import { ArrowLeft, User } from 'lucide-react';
import { getSettings } from '@/lib/settings';

export default async function AboutPreview() {
  const settings = await getSettings();
  const a = settings.about;

  return (
    <section className="py-24 bg-page">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="right">
            <div className="relative">
              <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-amber-500/10 to-yellow-600/5 border border-amber-500/10 flex items-center justify-center overflow-hidden">
                <div className="p-8 rounded-full bg-amber-500/10">
                  <User className="w-24 h-24 text-amber-400/60" />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 p-4 rounded-2xl bg-overlay-heavy backdrop-blur-xl border border-card-border">
                <p className="text-2xl font-black text-t1">{a.yearsExperience}</p>
                <p className="text-xs text-t3">سنة خبرة</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left">
            <h2 className="text-4xl font-black text-t1 mb-6">
              من <span className="text-gradient-gold">أنا</span>؟
            </h2>
            <p className="text-t2 leading-relaxed mb-4">
              {a.bio1}
            </p>
            <p className="text-t2 leading-relaxed mb-8">
              {a.bio2}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: 'الاسم', value: a.name },
                { label: 'الموقع', value: a.location },
                { label: 'التخصص', value: a.specialty },
                { label: 'الحالة', value: a.status },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-t4 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm text-t1 font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-input-bg border border-card-border text-t1 font-medium text-sm hover:bg-amber-500/10 hover:border-amber-500/20 hover:text-amber-400 transition-all duration-300"
            >
              اعرف أكثر
              <ArrowLeft size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
