'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-8xl font-black text-gradient-gold mb-4"
        >
          404
        </motion.div>
        <h1 className="text-2xl font-bold text-t1 mb-3">الصفحة غير موجودة</h1>
        <p className="text-t3 mb-8 max-w-md mx-auto">
          عذراً، يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold transition-all hover:shadow-lg hover:shadow-amber-500/25 active:scale-95"
        >
          <Home size={18} />
          العودة للرئيسية
          <ArrowLeft size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
