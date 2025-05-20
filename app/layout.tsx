import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AudioPlayerProvider } from "@/context/AudioPlayerContext"
import { AuthProvider } from "@/context/AuthContext"
import NewsBar from "@/components/news-bar/news-bar"
import { Toaster } from "sonner"
import { getRecentNews } from "@/lib/services/news-service"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "الموقع الرسمي للشيخ",
  description: "الموقع الرسمي للشيخ - دروس علمية، خطب، محاضرات، فتاوى",
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const news = await getRecentNews()
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <AuthProvider>
          <AudioPlayerProvider>
            <Header />
            <NewsBar news={news} />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster position="top-center" richColors />
          </AudioPlayerProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
