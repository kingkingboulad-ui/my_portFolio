"use client"; // تحويل الملف لـ Client Component لاستخدام usePathname

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation"; // استيراد هوك المسار
import "./globals.css";

import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // فحص ما إذا كان الرابط الحالي يخص لوحة التحكم (Admin)
  // هذا الشرط يتحقق إذا كان الرابط هو /admin أو أي صفحة فرعية له مثل /admin/users
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* إذا لم تكن صفحة أدمن، اظهر الـ Navbar */}
        {!isAdminPage && <Navbar />}
        
        <main className="flex-grow">
          {children}
        </main>

        {/* إذا لم تكن صفحة أدمن، اظهر الـ Footer */}
        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}