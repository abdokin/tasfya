"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, BookText, FileText, Music, BookMarked, Search } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function BookmarksPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">يجب تسجيل الدخول للوصول إلى هذه الصفحة</h1>
          <Button asChild>
            <a href="/login">تسجيل الدخول</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/bookmarks">المحفوظات</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Title */}
        <div className="mb-8 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900">المحفوظات</h1>
              <p className="text-gray-600">استعراض المحتوى المحفوظ لديك</p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <Input
              type="search"
              placeholder="ابحث في محفوظاتك..."
              className="w-full p-2 pl-10 pr-4 border rounded-md border-gray-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="border rounded-lg p-1 mb-6 w-fit">
                <TabsTrigger
                  value="all"
                  className="rounded-md px-6"
                >
                  الكل
                </TabsTrigger>
                <TabsTrigger
                  value="lessons"
                  className="rounded-md px-6"
                >
                  الدروس
                </TabsTrigger>
                <TabsTrigger
                  value="lectures"
                  className="rounded-md px-6"
                >
                  المحاضرات
                </TabsTrigger>
                <TabsTrigger
                  value="books"
                  className="rounded-md px-6"
                >
                  الكتب
                </TabsTrigger>
              </TabsList>

              {/* All Content Tab */}
              <TabsContent value="all" className="mt-0">
                <div className="text-center py-16">
                  <BookMarked className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">لا توجد محتويات محفوظة</h2>
                  <p className="text-gray-500 mb-6">
                    يمكنك حفظ المحتويات التي تعجبك لتسهيل الوصول إليها فيما بعد
                  </p>
                  <Button asChild>
                    <Link href="/">استكشف المحتويات</Link>
                  </Button>
                </div>
              </TabsContent>

              {/* Lessons Tab */}
              <TabsContent value="lessons" className="mt-0">
                <div className="text-center py-16">
                  <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">لا توجد دروس محفوظة</h2>
                  <p className="text-gray-500 mb-6">
                    يمكنك حفظ الدروس التي تعجبك لتسهيل الوصول إليها فيما بعد
                  </p>
                  <Button asChild>
                    <Link href="/lessons">استعرض الدروس</Link>
                  </Button>
                </div>
              </TabsContent>

              {/* Lectures Tab */}
              <TabsContent value="lectures" className="mt-0">
                <div className="text-center py-16">
                  <Music className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">لا توجد محاضرات محفوظة</h2>
                  <p className="text-gray-500 mb-6">
                    يمكنك حفظ المحاضرات التي تعجبك لتسهيل الوصول إليها فيما بعد
                  </p>
                  <Button asChild>
                    <Link href="/lectures">استعرض المحاضرات</Link>
                  </Button>
                </div>
              </TabsContent>

              {/* Books Tab */}
              <TabsContent value="books" className="mt-0">
                <div className="text-center py-16">
                  <BookText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">لا توجد كتب محفوظة</h2>
                  <p className="text-gray-500 mb-6">
                    يمكنك حفظ الكتب التي تعجبك لتسهيل الوصول إليها فيما بعد
                  </p>
                  <Button asChild>
                    <Link href="/books">استعرض الكتب</Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card className="border-gray-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary">كيفية استخدام المحفوظات</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-2 mt-1">
                        <BookMarked className="size-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">حفظ المحتوى</h4>
                        <p className="text-xs text-gray-500">
                          انقر على زر الحفظ في أي محتوى تريد الاحتفاظ به للرجوع إليه لاحقاً
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-2 mt-1">
                        <FileText className="size-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">تصنيف المحفوظات</h4>
                        <p className="text-xs text-gray-500">
                          يتم تصنيف المحفوظات حسب نوع المحتوى (دروس، محاضرات، كتب)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-2 mt-1">
                        <Search className="size-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">البحث في المحفوظات</h4>
                        <p className="text-xs text-gray-500">
                          استخدم خانة البحث للعثور على محتوى معين ضمن المحفوظات
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-100 shadow-sm overflow-hidden">
                <div className="relative h-32">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="استمع للمزيد"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-end p-4">
                    <div className="text-white">
                      <h4 className="font-bold text-lg">استكشف المزيد</h4>
                      <p className="text-sm">تصفح مكتبة المحتوى الكاملة</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}