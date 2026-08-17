'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, MapPin } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import AnimatedSection from '@/components/shared/animated-section';
import axiosClient from '@/lib/api';
import { useSocket } from '@/hooks/use-socket';
import { useSettings } from '@/hooks/use-settings';

export default function ContactClient() {
  const { data: settings } = useSettings();
  const c = settings?.contact;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { emitContact } = useSocket();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    setLoading(true);
    const loadingToast = toast.loading('جاري إرسال رسالتك...');
    try {
      const res = await axiosClient.post('/api/contact', { name, email, subject, message });
      if (res.data.success) {
        toast.success('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', { id: loadingToast });
        setName(''); setEmail(''); setSubject(''); setMessage('');
        emitContact({ id: Date.now(), title: `رسالة جديدة من ${name}`, message: subject || message.substring(0, 50), name, email, type: 'user' });
      }
    } catch {
      toast.error('حدث خطأ أثناء الإرسال، حاول مرة أخرى.', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 min-h-screen flex items-center bg-page">
      <Toaster position="top-center" toastOptions={{ style: { background: '#141414', color: '#fff', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' } }} />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-t1 mb-3 mt-10">
              لنعمل <span className="text-gradient-gold">معاً</span>
            </h1>
            <p className="text-t3 max-w-lg mx-auto">
              لديك فكرة مشروع أو ترغب في التعاون؟ سأكون سعيداً بسماع ذلك منك.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <AnimatedSection direction="right" className="lg:col-span-2">
            <div className="space-y-6 p-8 rounded-2xl bg-card-bg border border-card-border">
              <h3 className="text-xl font-bold text-t1 mb-6">معلومات الاتصال</h3>
              {[
                { icon: Mail, label: 'البريد الإلكتروني', value: c?.email || 'bouladabedlrazak@gmail.com', color: 'amber' },
                { icon: Phone, label: 'الهاتف', value: c?.phone || '+123 456 789', color: 'yellow' },
                { icon: MapPin, label: 'الموقع', value: c?.location || 'الجزائر', color: 'orange' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-400`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-t4 uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-sm text-t1 font-medium" dir="ltr">{value}</p>
                  </div>
                </div>
              ))}
              <div className="pt-6 border-t border-card-border-subtle">
                <p className="text-xs text-t4 mb-3">تابعني على</p>
                <div className="flex gap-3">
                  {[
                    { name: 'GitHub', url: c?.github || '#' },
                    { name: 'LinkedIn', url: c?.linkedin || '#' },
                    { name: 'Twitter', url: c?.twitter || '#' },
                  ].map((social) => (
                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-input-bg border border-card-border-subtle text-xs text-t3 hover:text-amber-400 hover:bg-amber-500/10 transition-all">
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card-bg border border-card-border space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs text-t3 px-1">الاسم بالكامل</label>
                  <input type="text" placeholder="أحمد محمد" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-t3 px-1">البريد الإلكتروني</label>
                  <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr"
                    className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors text-left" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-t3 px-1">الموضوع</label>
                <input type="text" placeholder="كيف يمكنني مساعدتك؟" value={subject} onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-t3 px-1">الرسالة</label>
                <textarea rows={5} placeholder="اكتب رسالتك هنا..." value={message} onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors resize-none" />
              </div>
              <motion.button whileTap={{ scale: 0.98 }} disabled={loading} type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <><span>إرسال الرسالة</span><Send size={16} /></>
                )}
              </motion.button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
