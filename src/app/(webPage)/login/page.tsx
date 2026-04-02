"use client"

import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // محاكاة تأخير بسيط للتحقق
    setTimeout(() => {
      // التحقق من البيانات المطلوبة
      if (email === "abed@gmail.com" && password === "wq123456@@$$") {
        
        /** * مهم جداً: القيم هنا يجب أن تطابق ما يتوقعه الـ Middleware
         * الـ Middleware يبحث عن cookie باسم "token" و "role" قيمتها "admin"
         */
        Cookies.set("token", "secure_admin_session_token", { expires: 7, path: '/' });
        Cookies.set("role", "admin", { expires: 7, path: '/' });

        // التوجيه إلى لوحة التحكم
        // الـ Middleware سيسمح بالمرور الآن لأن الكوكيز أصبحت موجودة
        window.location.href = "/admin";
        router.refresh(); // لضمان تحديث حالة الـ Middleware فوراً
      } else {
        setError("عذراً، البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020617] p-4 md:p-8" dir="rtl">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none "></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative w-full max-w-[1100px] bg-[#0f172a]/50 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] mt-24">
        
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-3">تسجيل الدخول</h1>
            <p className="text-slate-400">ادخل بيانات الأدمن للوصول للمنطقة المحمية.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm text-center animate-pulse">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">البريد الإلكتروني</label>
              <div className="relative group">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Exmple@gmail.com"
                  className="w-full pr-12 pl-4 py-4 rounded-2xl border border-white/5 bg-slate-900/50 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all text-left dir-ltr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-300">كلمة المرور</label>
              </div>
              <div className="relative group">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pr-12 pl-12 py-4 rounded-2xl border border-white/5 bg-slate-900/50 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all text-left dir-ltr"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-900/20 transition-all active:scale-[0.95] flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  دخول المسؤول
                </>
              )}
            </button>
          </form>
        </div>

        {/* الجانب البصري */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 p-12 text-white flex-col justify-between relative">
           <div className="relative z-10">
            <h2 className="text-4xl font-bold leading-tight mb-6">نظام حماية المسارات</h2>
            <p className="text-blue-100 text-lg opacity-80">تم تفعيل الـ Middleware بنجاح. لن يتمكن أحد من دخول صفحة /admin إلا ببياناتك الخاصة.</p>
          </div>
          
          <div className="relative z-10 bg-black/20 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-400 border border-white/20"></div>
              <div>
                <p className="font-bold text-sm">عبد الرزاق بولاد</p>
                <p className="text-xs text-blue-200/70">مدير النظام</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage