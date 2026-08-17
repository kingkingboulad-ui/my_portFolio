import Link from 'next/link';
import AnimatedSection from '@/components/shared/animated-section';
import { ArrowLeft, Mail } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection>
          <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-600/5 border border-amber-500/10 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 mb-6">
                <Mail className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-t1 mb-4">
                لديك مشروع؟ <span className="text-gradient-gold">لنعمل معاً</span>
              </h2>
              <p className="text-t3 max-w-lg mx-auto mb-8">
                دع معرفتك تتحول إلى واقع. تواصل معي الآن وسنحول فكرتك إلى مشروع ناجح.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 hover:scale-105"
              >
                تواصل معي
                <ArrowLeft size={20} />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
