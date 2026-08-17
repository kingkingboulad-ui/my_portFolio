'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Home,
  Settings,
  FolderOpen,
  Plus,
  LayoutGrid,
  LogOut,
  Bell,
  MessageSquare,
} from 'lucide-react';

const items = [
  { title: 'الرئيسية', url: '/admin', icon: Home },
  { title: 'المشاريع', url: '/admin/project', icon: FolderOpen },
  { title: 'الرسائل', url: '/admin/contacts', icon: MessageSquare },
  { title: 'الإعدادات', url: '/admin/setting', icon: Settings },
  { title: 'إضافة مشروع', url: '/admin/add-project', icon: Plus },
  { title: 'إضافة تصنيف', url: '/admin/add-category', icon: LayoutGrid },
  { title: 'الإشعارات', url: '/admin/notification', icon: Bell },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove('token', { path: '/' });
    Cookies.remove('role', { path: '/' });
    Cookies.remove('admin_name', { path: '/' });
    window.location.href = '/login';
  };

  return (
    <Sidebar side="right">
      <SidebarHeader className="p-4 border-b border-card-border">
        <p className="font-black text-xl text-gradient-gold">لوحة التحكم</p>
      </SidebarHeader>

      <SidebarContent className="bg-surface">
        <SidebarGroup>
          <SidebarGroupLabel className="text-right text-t3">القائمة الرئيسية</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  className="text-t2 hover:text-t1 hover:bg-card-bg data-[active=true]:text-amber-400 data-[active=true]:bg-amber-500/10"
                >
                  <Link href={item.url}>
                    <item.icon className="ml-2 h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="text-t2 hover:text-t1 hover:bg-card-bg">
                <ThemeToggle />
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                className="text-t2 hover:text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="ml-2 h-5 w-5" />
                <span>تسجيل الخروج</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
