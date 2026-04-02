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
import { Home, Settings, User, FolderOpen, Plus, LayoutGrid } from "lucide-react"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const items = [
  { title: "الرئيسية", url: "/admin", icon: Home },
  { title: "المشاريع", url: "/admin/project", icon: FolderOpen },
  // { title: "الملف الشخصي", url: "/profile", icon: User },
  { title: "الإعدادات", url: "/admin/setting", icon: Settings },
  { title: "اضافة مشروع ", url: "/admin/add-project", icon: Plus },
  { title: "اضافة فىْة ", url: "/admin/add-category", icon: LayoutGrid },
  { title: "تسجيل الخروج", action: "logout", icon: User }, // 👈 جديد
]

export function AppSidebar() {
  const router = useRouter();

  const handleLogout = () => {
  
    Cookies.remove("token", { path: "/" });
    Cookies.remove("role", { path: "/" });

  
    window.location.href = "/login";
  };
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
                  {item.action === "logout" ? (
                    <button onClick={handleLogout} className="flex items-center w-full">
                      <item.icon className="ml-2 h-5 w-5" />
                      <span>{item.title}</span>
                    </button>
                  ) : (
                    <Link href={item.url}>
                      <item.icon className="ml-2 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}