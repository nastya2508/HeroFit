import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HeroFit — Твій Шлях до Героя",
  description: "Додаток для фітнесу та гейміфікації тренувань",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0f1a] relative overflow-x-hidden selection:bg-cyan-500/30">
        
        {/* --- ГЛОБАЛЬНІ MESH ГРАДІЄНТИ (ДЛЯ ВСІХ СТОРІНОК) --- */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Синя сфера зліва зверху */}
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] animate-pulse duration-[10s]" />
          
          {/* Фіолетова сфера по центру справа */}
          <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse duration-[15s]" />
          
          {/* Темно-синя/блакитна сфера знизу зліва */}
          <div className="absolute bottom-[-5%] left-[15%] w-[700px] h-[700px] bg-blue-900/15 rounded-full blur-[150px]" />
        </div>

        {/* --- КОНТЕНТ --- */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}