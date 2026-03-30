const Projects = () => {
    const projects = [
      {
        title: "نظام إدارة عقارات",
        tags: ["Next.js", "Tailwind", "Firebase"],
        image: "/p1.jpg" // استبدلها بصورة مشروعك
      },
      {
        title: "تطبيق تجارة إلكترونية",
        tags: ["React Native", "Node.js", "Stripe"],
        image: "/p2.jpg"
      }
    ];
  
    return (
      <section id="projects" className="py-24 bg-[#0d0d0d]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">أحدث المشاريع</h2>
              <p className="text-gray-400">مجموعة مختارة من أفضل أعمالي الأخيرة</p>
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10">
                {/* مكان الصورة */}
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                   <div className="w-full h-full group-hover:scale-110 transition-transform duration-500 opacity-50 bg-[url('/grid.png')]"></div>
                </div>
                
                <div className="p-8">
                  <div className="flex gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                  <button className="text-white font-medium underline decoration-blue-500 underline-offset-8 hover:text-blue-400 transition-colors">
                    تفاصيل المشروع
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default Projects;