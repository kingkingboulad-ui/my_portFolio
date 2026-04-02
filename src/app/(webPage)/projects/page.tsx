"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Image from 'next/image'; // يفضل استخدام مكون Image في Next.js

interface Project {
  id: number;
  title: string;
  category: string;
  image_url: string;
  description: string;
  live_demo_url: string;
  github_url: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // الرابط الأساسي للسيرفر للوصول للصور
  const SERVER_URL = "http://localhost:3001";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/project`);
        // تأكد أن الباك أند يعيد مصفوفة المشاريع في response.data
        setProjects(response.data); 
      } catch (error) {
        console.error("خطأ في جلب المشاريع:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center py-24 text-white">جاري تحميل المشاريع...</div>;
  }

  return (
    <section id="projects" className="py-24 bg-[#0d0d0d] text-right" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 mt-10">أحدث المشاريع</h2>
            <p className="text-gray-400">مجموعة مختارة من أفضل أعمالي الأخيرة</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10">
              
              {/* عرض صورة المشروع من السيرفر */}
              <div className="aspect-video relative overflow-hidden bg-gray-800">
                {project.image_url ? (
                  <img 
                    src={`${SERVER_URL}${project.image_url}`} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    لا توجد صورة
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <div className="flex gap-2 mb-4">
                  {/* عرض التصنيف كـ Tag */}
                  <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{project.description}</p>
                
                <div className="flex gap-6">
                   {project.live_demo_url && (
                      <a 
                        href={project.live_demo_url} 
                        target="_blank" 
                        className="text-white font-medium underline decoration-blue-500 underline-offset-8 hover:text-blue-400 transition-colors"
                      >
                        معاينة حية
                      </a>
                   )}
                   {project.github_url && (
                      <a 
                        href={project.github_url} 
                        target="_blank" 
                        className="text-gray-400 font-medium hover:text-white transition-colors"
                      >
                        كود المشروع
                      </a>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center text-gray-500 py-12">لا توجد مشاريع مضافة حالياً.</div>
        )}
      </div>
    </section>
  );
};

export default Projects;