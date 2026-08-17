import Link from 'next/link';
import { Mail, Heart, Globe, Link2, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-page border-t border-amber-500/10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-black text-gradient-gold mb-4 block">
              Portfolio
            </Link>
            <p className="text-t3 text-sm leading-relaxed mb-6">
              مطور Full-Stack متخصص في بناء تجارب رقمية استثنائية.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Globe, href: '#' },
                { icon: Link2, href: '#' },
                { icon: MessageCircle, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="p-2.5 rounded-xl bg-input-bg border border-card-border-subtle text-t3 hover:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/20 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-t1 font-bold mb-6 text-sm uppercase tracking-wider">روابط سريعة</h3>
            <ul className="space-y-3">
              {[
                { label: 'الرئيسية', href: '/' },
                { label: 'أعمالي', href: '/projects' },
                { label: 'المهارات', href: '/skills' },
                { label: 'عني', href: '/about' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-t3 hover:text-amber-400 text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-t1 font-bold mb-6 text-sm uppercase tracking-wider">خدماتي</h3>
            <ul className="space-y-3 text-sm text-t3">
              <li>تطوير الويب Full-Stack</li>
              <li>تصميم UI/UX</li>
              <li>تحسين الأداء</li>
              <li>تطوير APIs</li>
            </ul>
          </div>

          <div>
            <h3 className="text-t1 font-bold mb-6 text-sm uppercase tracking-wider">تواصل معي</h3>
            <a
              href="mailto:bouladabedlrazak@gmail.com"
              className="flex items-center gap-2 text-t3 hover:text-amber-400 transition-colors text-sm"
            >
              <Mail size={16} />
              bouladabedlrazak@gmail.com
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-card-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-t4 text-xs">
            &copy; {currentYear} جميع الحقوق محفوظة.
          </p>
          <p className="flex items-center gap-1.5 text-t4 text-xs">
            صُنع بكل <Heart size={12} className="text-amber-500 fill-amber-500" /> بواسطة مطور
          </p>
        </div>
      </div>
    </footer>
  );
}
