'use client';

import Link from 'next/link';
import { ExternalLink, Code2, ArrowLeft } from 'lucide-react';
import AnimatedSection from '@/components/shared/animated-section';
import LoadingSpinner from '@/components/shared/loading-spinner';
import EmptyState from '@/components/shared/empty-state';
import { useLatestProjects } from '@/hooks/use-projects';
import { api } from '@/lib/config';

export default function FeaturedProjects() {
  const { data: projects, isLoading } = useLatestProjects();

  return (
    <section className="py-24 bg-page">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-t1 mb-2">
                أحدث <span className="text-gradient-gold">المشاريع</span>
              </h2>
              <p className="text-t3">مجموعة مختارة من أفضل أعمالي</p>
            </div>
            <Link
              href="/projects"
              className="hidden md:flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium text-sm transition-colors"
            >
              عرض الكل
              <ArrowLeft size={16} />
            </Link>
          </div>
        </AnimatedSection>

        {isLoading ? (
          <div className="py-20">
            <LoadingSpinner />
          </div>
        ) : !projects || projects.length === 0 ? (
          <EmptyState title="لا توجد مشاريع" description="لم تتم إضافة أي مشاريع بعد" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl bg-card-bg border border-card-border hover:border-amber-500/20 transition-all duration-500 hover:shadow-lg hover:shadow-amber-500/5">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-overlay-heavy to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-6">
                    {project.category && (
                      <span className="inline-block text-xs font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg mb-3">
                        {project.category}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-t1 mb-2 group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-t3 text-sm line-clamp-2 mb-4">{project.description}</p>
                    <div className="flex gap-4">
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
                          الكود
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
