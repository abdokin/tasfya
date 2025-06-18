import Hero from "@/components/hero"
import ContentCategories from "@/components/content-categories"
import RecentFatwas from "@/components/recent-fatwas"
import { RecentBooks } from "@/components/books-section"
import { RecentLessons } from "@/components/lessons-list"
import PageSidebar from "@/components/page-sidebar"
import { getRecentLessons } from "@/lib/services/lessons-service"
import { getRecentFatwas } from "@/lib/services/fatwas-service"
import { getRecentBooks } from "@/lib/services/books-service"
import { getRecentLecturess } from "@/lib/services/lectures-service"
import { Metadata } from "next"
import { LectureCard } from "@/components/lecture-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "الصفحة الرئيسية | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
  description: "الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري - يحتوي على دروس ومحاضرات وفتاوى وكتب ومقالات متنوعة",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

export default async function Home() {
  const [lessons, fatwas, books, lectures] = await Promise.all([
    getRecentLessons(),
    getRecentFatwas(),
    getRecentBooks(),
    getRecentLecturess()
  ])

  return (
    <div className="bg-gray-50" dir="rtl">
      {lessons.length > 0 && <Hero lesson={lessons[0]} />}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="mb-8">
              <ContentCategories />
            </div>
            <div className="mb-12">
              {lessons.length > 0 && <RecentLessons lessons={lessons} />}
              {lessons.length === 0 && (
                <div className="text-center text-gray-500">
                  لا توجد خطب جديدة حالياً
                </div>
              )}
            </div>
            <div className="mb-12">
              {lectures.length > 0 && (
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">أحدث المحاضرات والكلمات</h2>
                    <Button variant="link">
                      <Link href="/lectures" className="flex items-center gap-1">
                        عرض الكل <ArrowLeft />
                      </Link>
                    </Button>
                  </div>
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {lectures.map((lecture) => (
                        <LectureCard key={lecture.id} lecture={lecture} />
                      ))}
                    </div>
                  </div>
                </section>
              )}
              {lectures.length === 0 && (
                <div className="text-center text-gray-500">
                  لا توجد محاضرات جديدة حالياً
                </div>
              )}
            </div>
{/* 
            <div className="mb-12">
              {fatwas.length > 0 && <RecentFatwas fatwas={fatwas} />}
              {fatwas.length === 0 && (
                <div className="text-center text-gray-500">
                  لا توجد فتاوى جديدة حالياً
                </div>
              )}
            </div> */}
          </div>
          <div className="lg:col-span-1">
            <PageSidebar />
          </div>
        </div>

        <div className="mb-12">
          <RecentBooks books={books} />
        </div>
      </div>
    </div>
  )
}
