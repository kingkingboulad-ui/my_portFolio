"use client"

import React, { useState } from 'react'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 

} from 'lucide-react'
import Link from 'next/link'

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // محاكاة عملية تسجيل دخول
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] p-4 md:p-8" dir="rtl">
      
      {/* الحاوية الرئيسية */}
      <div className="w-full max-w-[1100px] bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* القسم الأيمن: نموذج الدخول */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-right">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">مرحباً بك مجدداً!</h1>
            <p className="text-gray-500">الرجاء إدخال بياناتك للوصول إلى لوحة التحكم.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* البريد الإلكتروني */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 mr-1">البريد الإلكتروني</label>
              <div className="relative group">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  className="w-full pr-12 pl-4 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-left dir-ltr"
                />
              </div>
            </div>

            {/* كلمة المرور */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-gray-700">كلمة المرور</label>
                <Link href="#" className="text-xs font-bold text-blue-600 hover:underline">نسيت كلمة المرور؟</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  className="w-full pr-12 pl-12 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-left dir-ltr"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* زر الدخول */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  تسجيل الدخول
                </>
              )}
            </button>
          </form>

          {/* خيارات الدخول الأخرى */}
          <div className="mt-8">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400 font-medium">أو الدخول بواسطة</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700 text-sm">
                {/* <Chrome className="w-4 h-4 text-red-500" /> Google */}
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700 text-sm">
                {/* <Github className="w-4 h-4" /> Github */}
              </button>
            </div>
          </div>
        </div>

        {/* القسم الأيسر: بصري (ظاهر فقط في الشاشات الكبيرة) */}
        <div className="hidden md:flex w-1/2 bg-blue-600 p-12 text-white flex-col justify-between relative overflow-hidden">
          {/* خلفية جمالية */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-8">
              <div className="w-6 h-6 bg-white rounded-full opacity-90"></div>
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-6">ابدأ رحلتك في إدارة مشاريعك باحترافية.</h2>
            <p className="text-blue-100 text-lg">منصة متكاملة للمطورين والمصممين لعرض أعمالهم وإدارة بياناتهم من مكان واحد.</p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-[2rem]">
            <p className="italic text-blue-50 mb-4 text-sm">"هذه المنصة ساعدتني في تنظيم معرض أعمالي وزيادة مبيعات خدماتي بنسبة 40%."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-400"></div>
              <div>
                <p className="font-bold text-sm">أحمد علي</p>
                <p className="text-xs text-blue-200">مطور واجهات مستقل</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage