import React from 'react';
// الاستيراد المباشر يحل مشاكل "Export doesn't exist" في Turbopack
import Github from 'lucide-react/dist/esm/icons/github';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin';
import Twitter from 'lucide-react/dist/esm/icons/twitter';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Heart from 'lucide-react/dist/esm/icons/heart';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-gray-400 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* العمود الأول */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-6">
              PORT<span className="text-blue-500">FOLIO</span>
            </h2>
            <p className="text-sm leading-relaxed mb-6">
              مطور برمجيات متخصص في بناء تجارب رقمية استثنائية.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Github size={20} /> 
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* عمود الروابط السريعة */}
          <div>
            <h3 className="text-white font-bold mb-6">روابط سريعة</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">أعمالي</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">عني</a></li>
            </ul>
          </div>

          {/* عمود الخدمات */}
          <div>
            <h3 className="text-white font-bold mb-6">خدماتي</h3>
            <ul className="space-y-4 text-sm">
              <li>تطوير الويب</li>
              <li>تصميم UI/UX</li>
            </ul>
          </div>

          {/* عمود التواصل */}
          <div>
            <h3 className="text-white font-bold mb-6">تواصل معي</h3>
            <a href="mailto:your@email.com" className="flex items-center gap-2 text-white hover:text-blue-400">
              <Mail size={18} />
              <span>your@email.com</span>
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex justify-between items-center text-xs">
          <p>© {currentYear} جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1">
            صُنع بكل <Heart size={12} className="text-red-500 fill-red-500" /> بواسطة مطور
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;