'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, ExternalLink, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import axiosClient from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useProjects } from '@/hooks/use-projects';
import { api } from '@/lib/config';

export default function ProjectsClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: projects, isLoading } = useProjects(undefined, searchQuery);
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;
    setDeletingId(id);
    try {
      await axiosClient.delete(`/api/project/${id}`);
      toast.success('تم حذف المشروع بنجاح');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    } catch {
      toast.error('حدث خطأ أثناء الحذف');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 md:p-6 text-right" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-t1">إدارة المشاريع</h1>
          <p className="text-t3 text-xs md:text-sm mt-1">عرض وتعديل وحذف المشاريع</p>
        </div>
        <Link
          href="/admin/add-project"
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          إضافة مشروع
        </Link>
      </div>

      <div className="mb-5">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-t4" />
          <input
            type="text"
            placeholder="ابحث عن مشروع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-3 rounded-xl bg-input-bg border border-card-border text-t1 placeholder:text-t4 outline-none focus:border-amber-500/40 transition-colors"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : !projects || projects.length === 0 ? (
        <div className="text-center py-20 text-t3">لا توجد مشاريع</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card-bg rounded-2xl border border-card-border overflow-hidden hover:border-amber-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5"
            >
              <div className="aspect-video bg-overlay relative">
                {project.image_url ? (
                  <img
                    src={`${api.base}${project.image_url}`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-t4 text-sm">
                    لا توجد صورة
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-bold text-t1 text-sm md:text-base truncate">{project.title}</h3>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${
                      project.status === 'published'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-input-bg text-t3'
                    }`}
                  >
                    {project.status === 'published' ? 'منشور' : 'مسودة'}
                  </span>
                </div>
                <p className="text-t3 text-xs md:text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] md:text-xs text-t4">{project.category || 'بدون تصنيف'}</span>
                  <div className="flex gap-1">
                    {project.live_demo_url && (
                      <a
                        href={project.live_demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 md:p-2 rounded-lg hover:bg-card-bg text-t3 hover:text-amber-400 transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deletingId === project.id}
                      className="p-1.5 md:p-2 rounded-lg hover:bg-red-500/10 text-t3 hover:text-red-400 transition-colors disabled:opacity-50"
                    >
                      {deletingId === project.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
