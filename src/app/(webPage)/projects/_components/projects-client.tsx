'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Search, Filter } from 'lucide-react';
import LoadingSpinner from '@/components/shared/loading-spinner';
import EmptyState from '@/components/shared/empty-state';
import AnimatedSection from '@/components/shared/animated-section';
import { useProjects } from '@/hooks/use-projects';
import { useCategories } from '@/hooks/use-categories';
import { api } from '@/lib/config';

export default function ProjectsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: projects, isLoading } = useProjects(selectedCategory, searchQuery);
  const { data: categories } = useCategories();

  return (
    <section className="py-24 bg-page min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-t1 mb-3 mt-10">
              أعمالي <span className="text-gradient-gold">البصريّة</span>
            </h1>
            <p className="text-t3 max-w-lg mx-auto">
              مجموعة مختارة من أفضل المشاريع التي عملت عليها
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-t4" />
              <input
                type="text"
                placeholder="ابحث عن مشروع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t3 outline-none focus:border-amber-500/40 transition-colors"
              />
            </div>
            <div className="relative">
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-t4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pr-10 pl-8 py-3 rounded-xl bg-input-bg border border-card-border text-t1 outline-none focus:border-amber-500/40 transition-colors cursor-pointer"
              >
                <option value="" className="bg-surface">جميع التصنيفات</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.name} className="bg-surface">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </AnimatedSection>

        {isLoading ? (
          <div className="py-20">
            <LoadingSpinner />
          </div>
        ) : !projects || projects.length === 0 ? (
          <EmptyState title="لا توجد مشاريع" description="لم يتم العثور على مشاريع تطابق بحثك" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl bg-card-bg border border-card-border hover:border-amber-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/5"
                >
                  <div className="aspect-video relative overflow-hidden bg-overlay">
                    {project.image_url ? (
                      <img
                        src={`${api.base}${project.image_url}`}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-t4">
                        لا توجد صورة
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-8">
                    {project.category && (
                      <span className="inline-block text-xs font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg mb-3">
                        {project.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-t1 mb-2 group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-t3 text-sm mb-6 line-clamp-2">{project.description}</p>
                    <div className="flex gap-6">
                      {project.live_demo_url && (
                        <a
                          href={project.live_demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-t2 hover:text-amber-400 transition-colors"
                        >
                          <ExternalLink size={14} />
                          معاينة حية
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-t2 hover:text-t1 transition-colors"
                        >
                          <Code2 size={14} />
                          كود المشروع
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
