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
import WebsiteJsonLd from "@/components/json-ld/website-json-ld"
import PersonJsonLd from "@/components/json-ld/person-json-ld"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
    default: "الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري",
  },
  description: "الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري - مجموعة من الدروس والمحاضرات والفتاوى والكتب والمقالات",
  keywords: ["محمد بن رمزان الهاجري", "الشيخ محمد الهاجري", "دروس إسلامية", "فتاوى", "محاضرات دينية", "كتب إسلامية", "علوم شرعية"],
  authors: [{ name: "الشيخ محمد بن رمزان الهاجري" }],
  creator: "الموقع الرسمي للشيخ محمد بن رمزان الهاجري",
  publisher: "الموقع الرسمي للشيخ محمد بن رمزان الهاجري",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  openGraph: {
    title: "الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري",
    description: "الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري - مجموعة من الدروس والمحاضرات والفتاوى والكتب والمقالات",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "موقع فضيلة الشيخ محمد بن رمزان الهاجري",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري",
    description: "الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري - مجموعة من الدروس والمحاضرات والفتاوى والكتب والمقالات",
  },
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
            <WebsiteJsonLd />
            <PersonJsonLd />
          </AudioPlayerProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
