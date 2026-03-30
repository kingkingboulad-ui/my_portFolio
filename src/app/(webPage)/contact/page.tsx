import React from 'react';
// الاستيراد المباشر يحل مشكلة Turbopack تماماً
import Mail from 'lucide-react/dist/esm/icons/mail';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Send from 'lucide-react/dist/esm/icons/send';
import Github from 'lucide-react/dist/esm/icons/github';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin';
import Twitter from 'lucide-react/dist/esm/icons/twitter';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <div className="max-w-6xl w-full">
        
        {/* العنوان */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            لنعمل معاً
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            لديك فكرة مشروع أو ترغب في التعاون؟ سأكون سعيداً بسماع ذلك منك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* معلومات التواصل */}
          <div className="space-y-8 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-6">معلومات الاتصال</h3>
            
            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">البريد الإلكتروني</p>
                <p className="text-lg font-medium">yourname@email.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="p-3 bg-purple-600/20 rounded-xl text-purple-400">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">الهاتف</p>
                <p className="text-lg font-medium">+123 456 789</p>
              </div>
            </div>

            {/* روابط التواصل الاجتماعي */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-4">تابعني على:</p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5">
                  <Github size={20} />
                </a>
                <a href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* نموذج التواصل (Form) */}
          <form className="space-y-6 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 px-1">الاسم بالكامل</label>
                <input 
                  type="text" 
                  placeholder="أحمد محمد"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 px-1">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 px-1">الموضوع</label>
              <input 
                type="text" 
                placeholder="كيف يمكنني مساعدتك؟"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 px-1">الرسالة</label>
              <textarea 
                rows={5}
                placeholder="اكتب رسالتك هنا..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 resize-none outline-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
            >
              <span>إرسال الرسالة</span>
              <Send size={18} />
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;