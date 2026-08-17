'use client';

import { motion } from 'framer-motion';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex p-4 rounded-2xl bg-red-500/10 mb-6">
          <AlertTriangle className="w-10 h-10 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-t1 mb-3">حدث خطأ غير متوقع</h1>
        <p className="text-t3 mb-8 max-w-md mx-auto">
          عذراً، حدث خطأ أثناء تحميل الصفحة. يرجى المحاولة مرة أخرى.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold transition-all hover:shadow-lg hover:shadow-amber-500/25 active:scale-95"
        >
          <RefreshCw size={18} />
          إعادة المحاولة
        </button>
      </motion.div>
    </div>
  );
}
