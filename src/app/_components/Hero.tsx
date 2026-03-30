import { ArrowLeft, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0a0a0a]">
      {/* خلفية ضوئية خلف النص */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 mb-8 animate-bounce">
          <Sparkles size={16} />
          <span className="text-sm font-medium">متاح لمشاريع جديدة</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight">
          أصمم وأبني <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            تجارب رقمية مذهلة
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          مطور Full-Stack متخصص في تحويل الأفكار المعقدة إلى تطبيقات ويب بسيطة، سريعة، وذات واجهات مستخدم "Premium".
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all transform hover:scale-105 flex items-center gap-2">
            استعرض أعمالي <ArrowLeft size={20} />
          </button>
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all">
            تواصل معي
          </button>
        </div>
      </div>
    </section>
  );
};


export default Hero