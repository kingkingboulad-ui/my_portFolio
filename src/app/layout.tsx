'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import { usePathname } from 'next/navigation';
import './globals.css';
import QueryProvider from '@/components/query-provider';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/app/_components/layout/navbar';
import Footer from '@/app/_components/layout/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  const isLoginPage = pathname?.startsWith('/login');

  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <QueryProvider>
            {!isAdminPage && !isLoginPage && <Navbar />}
            <main className="flex-grow">{children}</main>
            {!isAdminPage && !isLoginPage && <Footer />}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
