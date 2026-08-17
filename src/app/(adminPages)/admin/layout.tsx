'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../../_components/admin/sidebar';
import { usePathname } from 'next/navigation';

const pageTitles: Record<string, string> = {
  '/admin': 'لوحة التحكم',
  '/admin/project': 'إدارة المشاريع',
  '/admin/contacts': 'الرسائل',
  '/admin/add-project': 'إضافة مشروع',
  '/admin/add-category': 'إضافة تصنيف',
  '/admin/notification': 'الإشعارات',
  '/admin/setting': 'الإعدادات',
};

function AdminTopBar() {
  const pathname = usePathname();
  const title = pageTitles[pathname || ''] || 'لوحة التحكم';

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-card-border bg-page/80 backdrop-blur-md px-4 py-3 md:px-6">
      <SidebarTrigger className="p-2 rounded-xl hover:bg-card-bg transition-colors md:hidden" />
      <h2 className="text-sm font-bold text-t1 md:text-base">{title}</h2>
    </header>
  );
}

function AdminContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden bg-page">
      <AdminTopBar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <AdminContent>{children}</AdminContent>
    </SidebarProvider>
  );
}
