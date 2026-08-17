'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';

export default function Hero() {
  const { data: settings } = useSettings();
  const h = settings?.hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-page">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-yellow-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-8"
        >
          <Sparkles size={16} />
          <span className="text-sm font-medium">{h?.badge || 'متاح لمشاريع جديدة'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-5xl md:text-8xl font-black text-t1 mb-6 leading-tight"
        >
          {h?.titleLine1 || 'أصمم وأبني'}
          <br />
          <span className="text-gradient-gold">{h?.titleLine2 || 'تجارب رقمية مذهلة'}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-t2 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {h?.subtitle || 'مطور Full-Stack متخصص في تحويل الأفكار المعقدة إلى تطبيقات ويب بسيطة، سريعة، وذات واجهات مستخدم احترافية.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black rounded-2xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 hover:scale-105 flex items-center gap-2"
          >
            استعرض أعمالي
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 glass text-t1 rounded-2xl font-bold transition-all duration-300 hover:bg-card-bg"
          >
            تواصل معي
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 flex items-center justify-center gap-8 text-t4 text-sm"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-t1">{h?.projectsCount || '+3'}</span>
            <span>مشاريع منجزة</span>
          </div>
          <div className="w-px h-8 bg-card-bg" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-t1">{h?.yearsCount || '+1'}</span>
            <span>سنة خبرة</span>
          </div>
          <div className="w-px h-8 bg-card-bg" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-t1">{h?.satisfaction || '100%'}</span>
            <span>رضا العملاء</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
