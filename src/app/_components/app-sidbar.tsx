"use client" // تأكد من وجود هذه في أعلى الملف

import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, Settings, User, FolderOpen,Plus } from "lucide-react"

const items = [
  { title: "الرئيسية", url: "/admin", icon: Home },
  { title: "المشاريع", url: "/admin/project", icon: FolderOpen },
  // { title: "الملف الشخصي", url: "/profile", icon: User },
  { title: "الإعدادات", url: "/admin/setting", icon: Settings },
  { title: "اضافة مشروع ", url: "/admin/add-project", icon: Plus },
]

export function AppSidebar() {
  return (
    <Sidebar side="right"> {/* استخدم side="right" بدلاً من dir="rtl" إذا كنت تستخدم النسخة الأحدث من shadcn */}
      <SidebarHeader className="p-4 font-bold text-xl text-right">
        لوحة التحكم
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-right">القائمة الرئيسية</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  {/* تأكد أن Link هو العنصر الوحيد المباشر تحت SidebarMenuButton */}
                  <Link href={item.url}>
                    <item.icon className="ml-2 h-5 w-5" /> {/* استخدم ml-2 للمسافة في RTL */}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}