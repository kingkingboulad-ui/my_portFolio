'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, Eye, MessageSquare, Plus, ExternalLink, Loader2 } from 'lucide-react';
import { useStats } from '@/hooks/use-stats';
import { useLatestProjects } from '@/hooks/use-projects';

export default function AdminDashboardClient() {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: projects, isLoading: projectsLoading } = useLatestProjects();

  const statCards = [
    {
      title: 'إجمالي المشاريع',
      value: stats?.totalProjects ?? 0,
      icon: Briefcase,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      title: 'زوار الموقع',
      value: (stats?.totalVisits ?? 0).toLocaleString('ar-EG'),
      icon: Eye,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
    },
    {
      title: 'الرسائل',
      value: stats?.totalMessages ?? 0,
      icon: MessageSquare,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
    },
    {
      title: 'غير مقروءة',
      value: stats?.unreadMessages ?? 0,
      icon: MessageSquare,
      color: 'text-red-400',
      bg: 'bg-red-400/10',
    },
  ];

  return (
    <div className="p-4 md:p-6 text-right" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-t1">لوحة تحكم معرض أعمالي</h1>
          <p className="text-t3 text-xs md:text-sm mt-1">نظرة سريعة على أداء موقعك الشخصي</p>
        </div>
        <Link
          href="/admin/add-project"
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          إضافة مشروع
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card-bg p-3 md:p-5 rounded-2xl border border-card-border hover:border-amber-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5"
          >
            <div className="flex justify-between items-start">
              <div className={`p-2 md:p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              {statsLoading && <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin text-t4" />}
            </div>
            <div className="mt-3 md:mt-4">
              <p className="text-xs md:text-sm text-t3 font-medium">{stat.title}</p>
              <h3 className="text-lg md:text-2xl font-bold text-t1 mt-1">
                {statsLoading ? '...' : stat.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-card-bg rounded-2xl border border-card-border overflow-hidden">
        <div className="p-4 md:p-6 border-b border-card-border flex justify-between items-center">
          <h2 className="text-base md:text-lg font-bold text-t1">آخر المشاريع</h2>
          <Link href="/admin/project" className="text-amber-400 text-xs md:text-sm font-medium hover:text-amber-300 transition-colors">
            عرض الكل
          </Link>
        </div>

        {projectsLoading ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-t4" />
          </div>
        ) : !projects || projects.length === 0 ? (
          <p className="p-8 text-center text-t3 text-sm">لا توجد مشاريع بعد</p>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-card-bg">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-t3">اسم المشروع</th>
                    <th className="px-6 py-3 font-semibold text-t3">التصنيف</th>
                    <th className="px-6 py-3 font-semibold text-t3">الحالة</th>
                    <th className="px-6 py-3 font-semibold text-t3">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-card-bg transition-colors">
                      <td className="px-6 py-3 font-medium text-t1">{project.title}</td>
                      <td className="px-6 py-3 text-t2">{project.category || '-'}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === 'published'
                              ? 'bg-green-500/10 text-green-400'
                              : 'bg-input-bg text-t3'
                          }`}
                        >
                          {project.status === 'published' ? 'منشور' : 'مسودة'}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        {project.live_demo_url && (
                          <a
                            href={project.live_demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-t3 hover:text-amber-400 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-card-border">
              {projects.map((project) => (
                <div key={project.id} className="p-4 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-t1 text-sm truncate">{project.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-t3">{project.category || '-'}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          project.status === 'published'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-white/5 text-gray-500'
                        }`}
                      >
                        {project.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                    </div>
                  </div>
                  {project.live_demo_url && (
                    <a
                      href={project.live_demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-t3 hover:text-amber-400 transition-colors shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
