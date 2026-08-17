'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight, Save, Loader2, Key, User, Home, Phone, Mail,
  Globe, Briefcase, MessageSquare, BarChart3, LogOut,
} from 'lucide-react';
import axiosClient from '@/lib/api';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useSettings, useUpdateSettings } from '@/hooks/use-settings';

export default function SettingsClient() {
  const router = useRouter();
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const [saving, setSaving] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const [hero, setHero] = useState({ badge: '', titleLine1: '', titleLine2: '', subtitle: '', projectsCount: '', yearsCount: '', satisfaction: '' });
  const [about, setAbout] = useState({ name: '', location: '', specialty: '', languages: '', email: '', status: '', bio1: '', bio2: '', yearsExperience: '', projectsCompleted: '', coffeeCups: '', workingHours: '', completionRate: '' });
  const [contact, setContact] = useState({ email: '', phone: '', location: '', github: '', linkedin: '', twitter: '' });

  useEffect(() => {
    if (settings) {
      setHero(settings.hero);
      setAbout(settings.about);
      setContact(settings.contact);
    }
  }, [settings]);

  const handleSaveHero = async () => {
    setSaving(true);
    await updateSettings.mutateAsync({ hero });
    setSaving(false);
  };

  const handleSaveAbout = async () => {
    setSaving(true);
    await updateSettings.mutateAsync({ about });
    setSaving(false);
  };

  const handleSaveContact = async () => {
    setSaving(true);
    await updateSettings.mutateAsync({ contact });
    setSaving(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('كلمتا المرور غير متطابقتين');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    setLoading(true);
    const loadingToast = toast.loading('جاري تغيير كلمة المرور...');
    try {
      await axiosClient.put('/api/auth/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success('تم تغيير كلمة المرور بنجاح', { id: loadingToast });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch {
      toast.error('كلمة المرور الحالية غير صحيحة', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token', { path: '/' });
    Cookies.remove('role', { path: '/' });
    Cookies.remove('admin_name', { path: '/' });
    window.location.href = '/login';
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 text-right" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 rounded-xl hover:bg-card-bg transition-colors shrink-0">
          <ArrowRight className="w-5 h-5 text-t2" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-t1">إعدادات الموقع</h1>
          <p className="text-t3 text-xs md:text-sm mt-1">تحكم بكل محتويات الموقع من مكان واحد</p>
        </div>
      </div>

      <div className="space-y-6">

        {/* ===== Hero Section ===== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card-bg rounded-2xl border border-card-border p-5 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0"><Home size={18} /></div>
            <div className="flex-1">
              <h2 className="text-base md:text-lg font-bold text-t1">قسم الـ Hero (الرئيسية)</h2>
              <p className="text-xs text-t3">النص الرئيسي الذي يظهر في الصفحة الأولى</p>
            </div>
            <button onClick={handleSaveHero} disabled={saving} className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold px-4 py-2 rounded-xl text-sm transition-all active:scale-[0.98] disabled:opacity-50 shrink-0">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={14} />}
              حفظ
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">الشارة (Badge)</label>
              <input value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">السطر الأول من العنوان</label>
              <input value={hero.titleLine1} onChange={(e) => setHero({ ...hero, titleLine1: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">السطر الثاني من العنوان (الذهبي)</label>
              <input value={hero.titleLine2} onChange={(e) => setHero({ ...hero, titleLine2: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">الإحصائيات</label>
              <div className="grid grid-cols-3 gap-2">
                <input value={hero.projectsCount} onChange={(e) => setHero({ ...hero, projectsCount: e.target.value })} placeholder="مشاريع" className="w-full px-3 py-2.5 rounded-xl bg-input-bg border border-card-border text-t1 text-center text-sm placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
                <input value={hero.yearsCount} onChange={(e) => setHero({ ...hero, yearsCount: e.target.value })} placeholder="سنوات" className="w-full px-3 py-2.5 rounded-xl bg-input-bg border border-card-border text-t1 text-center text-sm placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
                <input value={hero.satisfaction} onChange={(e) => setHero({ ...hero, satisfaction: e.target.value })} placeholder="رضا" className="w-full px-3 py-2.5 rounded-xl bg-input-bg border border-card-border text-t1 text-center text-sm placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-t2">الوصف التوضيحي</label>
              <textarea rows={2} value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors resize-none" />
            </div>
          </div>
        </motion.div>

        {/* ===== About / Personal Info ===== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card-bg rounded-2xl border border-card-border p-5 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0"><User size={18} /></div>
            <div className="flex-1">
              <h2 className="text-base md:text-lg font-bold text-t1">المعلومات الشخصية</h2>
              <p className="text-xs text-t3">بياناتك الشخصية التي تظهر في صفحة About</p>
            </div>
            <button onClick={handleSaveAbout} disabled={saving} className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold px-4 py-2 rounded-xl text-sm transition-all active:scale-[0.98] disabled:opacity-50 shrink-0">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={14} />}
              حفظ
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">الاسم</label>
              <input value={about.name} onChange={(e) => setAbout({ ...about, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">الموقع</label>
              <input value={about.location} onChange={(e) => setAbout({ ...about, location: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">التخصص</label>
              <input value={about.specialty} onChange={(e) => setAbout({ ...about, specialty: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">اللغات</label>
              <input value={about.languages} onChange={(e) => setAbout({ ...about, languages: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">البريد الإلكتروني</label>
              <input value={about.email} onChange={(e) => setAbout({ ...about, email: e.target.value })} dir="ltr" className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 text-left placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">الحالة</label>
              <input value={about.status} onChange={(e) => setAbout({ ...about, status: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">النص التوضيحي الأول</label>
              <textarea rows={3} value={about.bio1} onChange={(e) => setAbout({ ...about, bio1: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors resize-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">النص التوضيحي الثاني</label>
              <textarea rows={3} value={about.bio2} onChange={(e) => setAbout({ ...about, bio2: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors resize-none" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">سنوات الخبرة</label>
              <input value={about.yearsExperience} onChange={(e) => setAbout({ ...about, yearsExperience: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-input-bg border border-card-border text-t1 text-center text-sm placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">مشاريع منجزة</label>
              <input value={about.projectsCompleted} onChange={(e) => setAbout({ ...about, projectsCompleted: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-input-bg border border-card-border text-t1 text-center text-sm placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">كوب قهوة</label>
              <input value={about.coffeeCups} onChange={(e) => setAbout({ ...about, coffeeCups: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-input-bg border border-card-border text-t1 text-center text-sm placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">ساعات عمل</label>
              <input value={about.workingHours} onChange={(e) => setAbout({ ...about, workingHours: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-input-bg border border-card-border text-t1 text-center text-sm placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">نسبة الإنجاز</label>
              <input value={about.completionRate} onChange={(e) => setAbout({ ...about, completionRate: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-input-bg border border-card-border text-t1 text-center text-sm placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
          </div>
        </motion.div>

        {/* ===== Contact Info ===== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card-bg rounded-2xl border border-card-border p-5 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0"><Phone size={18} /></div>
            <div className="flex-1">
              <h2 className="text-base md:text-lg font-bold text-t1">معلومات الاتصال</h2>
              <p className="text-xs text-t3">بيانات التواصل التي تظهر في صفحة Contact</p>
            </div>
            <button onClick={handleSaveContact} disabled={saving} className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold px-4 py-2 rounded-xl text-sm transition-all active:scale-[0.98] disabled:opacity-50 shrink-0">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={14} />}
              حفظ
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2 flex items-center gap-1.5"><Mail size={12} /> البريد الإلكتروني</label>
              <input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} dir="ltr" className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 text-left placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2 flex items-center gap-1.5"><Phone size={12} /> الهاتف</label>
              <input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} dir="ltr" className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 text-left placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2 flex items-center gap-1.5"><Globe size={12} /> الموقع</label>
              <input value={contact.location} onChange={(e) => setContact({ ...contact, location: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">GitHub</label>
              <input value={contact.github} onChange={(e) => setContact({ ...contact, github: e.target.value })} dir="ltr" placeholder="https://github.com/username" className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 text-left placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">LinkedIn</label>
              <input value={contact.linkedin} onChange={(e) => setContact({ ...contact, linkedin: e.target.value })} dir="ltr" placeholder="https://linkedin.com/in/username" className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 text-left placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-t2">Twitter / X</label>
              <input value={contact.twitter} onChange={(e) => setContact({ ...contact, twitter: e.target.value })} dir="ltr" placeholder="https://x.com/username" className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 text-left placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
          </div>
        </motion.div>

        {/* ===== Password ===== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card-bg rounded-2xl border border-card-border p-5 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0"><Key size={18} /></div>
            <h2 className="text-base md:text-lg font-bold text-t1">تغيير كلمة المرور</h2>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-t1">كلمة المرور الحالية</label>
              <input type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} required dir="ltr" className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 text-left placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-t1">كلمة المرور الجديدة</label>
                <input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} required dir="ltr" className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 text-left placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-t1">تأكيد كلمة المرور</label>
                <input type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} required dir="ltr" className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 text-left placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold px-6 py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
              تغيير كلمة المرور
            </button>
          </form>
        </motion.div>

        {/* ===== Logout ===== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card-bg rounded-2xl border border-card-border p-5 md:p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 shrink-0"><LogOut size={18} /></div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-t1">الحساب</h2>
              <p className="text-xs text-t3">تسجيل الخروج من لوحة التحكم</p>
            </div>
          </div>
          <button onClick={handleLogout} className="px-6 py-3 rounded-xl border border-red-500/20 text-red-400 font-medium text-sm hover:bg-red-500/10 transition-colors shrink-0">
            تسجيل الخروج
          </button>
        </motion.div>
      </div>
    </div>
  );
}
