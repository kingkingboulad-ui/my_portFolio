import React from 'react';
import { Code2, Palette, Terminal, Cpu } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      title: 'تطوير المواقع',
      desc: 'بناء تطبيقات ويب سريعة وقابلة للتوسع باستخدام أحدث التقنيات.',
      icon: <Code2 className="text-blue-400" size={28} />,
    },
    {
      title: 'تصميم واجهات UI/UX',
      desc: 'تحويل الأفكار إلى واجهات مستخدم عصرية تركز على تجربة المستخدم.',
      icon: <Palette className="text-purple-400" size={28} />,
    },
    {
      title: 'هندسة البرمجيات',
      desc: 'كتابة كود نظيف (Clean Code) ومنظم يسهل صيانته وتطويره.',
      icon: <Terminal className="text-green-400" size={28} />,
    },
  ];

  return (
    <section id="about" className="py-24 px-4 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* الجانب الأيسر: الصورة أو العنصر المرئي */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden aspect-square flex items-center justify-center backdrop-blur-3xl">
              {/* يمكنك وضع صورتك هنا أو أيقونة برمجية كبيرة */}
              <Cpu size={150} className="text-white/10 absolute animate-pulse" />
              <div className="z-10 text-center p-8">
                 <h3 className="text-6xl font-black mb-2 tracking-tighter mt-10">5+</h3>
                 <p className="text-gray-400 text-xl font-medium">سنوات من الشغف بالتطوير</p>
              </div>
            </div>
          </div>

          {/* الجانب الأيمن: النص التعريفي */}
          <div className="space-y-8">
            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] text-blue-500 font-bold mb-3">من أنا؟</h2>
              <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                أنا مطور برمجيات شغوف بدمج <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">الفن والمنطق</span>
              </h3>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed">
              أهلاً بك! أنا مطور واجهات خلفية وأمامية (Full-stack) أركز على خلق تجارب رقمية لا تُنسى. لا أكتفي بكتابة الكود فحسب، بل أهتم بأدق التفاصيل في التصميم والأداء لضمان وصول رسالتك بأفضل صورة ممكنة.
            </p>

            {/* بطاقات المميزات الصغيرة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((item, index) => (
                <div key={index} className="p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="mb-3">{item.icon}</div>
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-400 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              {/* <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300">
                مشاهدة سيرتي الذاتية
              </button> */}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;