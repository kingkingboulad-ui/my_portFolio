'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import axiosClient from '@/lib/api';

export default function LoginClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await axiosClient.post('/api/auth/login', { email, password });

      if (res.data.success) {
        const { token, admin } = res.data.data;
        Cookies.set('token', token, { expires: 7, path: '/' });
        Cookies.set('role', 'admin', { expires: 7, path: '/' });
        Cookies.set('admin_name', admin.name, { expires: 7, path: '/' });
        router.push('/admin');
      }
    } catch {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-page p-4" dir="rtl">
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[1000px] rounded-3xl border border-card-border shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[550px]"
      >
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-surface/80 backdrop-blur-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-t1 mb-2">تسجيل الدخول</h1>
            <p className="text-t3 text-sm">ادخل بيانات المسؤول للوصول للوحة التحكم</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">البريد الإلكتروني</label>
              <div className="relative group">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-t4 group-focus-within:text-amber-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@gmail.com"
                  dir="ltr"
                  className="w-full pr-11 pl-4 py-3.5 rounded-xl bg-input-bg border border-card-border text-t1 text-left placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">كلمة المرور</label>
              <div className="relative group">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-t4 group-focus-within:text-amber-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  dir="ltr"
                  className="w-full pr-11 pl-11 py-3.5 rounded-xl bg-input-bg border border-card-border text-t1 text-left placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-t4 hover:text-t2 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black py-3.5 rounded-xl font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  دخول المسؤول
                </>
              )}
            </button>
          </form>
        </div>

        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-amber-600/20 to-yellow-700/10 p-12 flex-col justify-between relative border-r border-card-border">
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-t1 leading-tight mb-4">
              لوحة تحكم
              <br />
              <span className="text-gradient-gold">المديرية</span>
            </h2>
            <p className="text-t2 text-sm leading-relaxed">
              نظام حماية متكامل مع JWT Authentication و Middleware آمن. وصول حصري للمسؤول فقط.
            </p>
          </div>

          <div className="relative z-10 p-4 rounded-2xl bg-black/30 backdrop-blur-xl border border-card-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600" />
              <div>
                <p className="font-bold text-sm text-t1">عبد الرزاق بولاد</p>
                <p className="text-xs text-t3">مدير النظام</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
