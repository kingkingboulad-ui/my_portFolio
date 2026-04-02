const Skills = () => {
    const skillCategories = [
      { title: "الواجهات الأمامية", skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
      { title: "الأنظمة الخلفية", skills: ["Node.js", "Express", "SQL / NoSQL", "Rest API" ,"laravel"] },
      { title: "الأدوات", skills: ["Git / GitHub",  "Postman"] }
    ];
  
    return (
      <section id="skills" className="py-24 bg-[#0a0a0a] ">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center mt-10">ترسانتي التقنية</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((cat, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors group">
                <h3 className="text-xl font-bold text-blue-400 mb-6">{cat.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-white/5 rounded-xl text-gray-300 text-sm border border-white/5 group-hover:bg-blue-500/10 transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };


  export default Skills;