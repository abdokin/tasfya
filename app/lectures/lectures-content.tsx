import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PageSidebar from "@/components/page-sidebar";
import { getAllLectures } from "@/lib/services/lectures-service";
import { SearchBar } from "@/components/search-bar";
import Pagination from "@/components/pagination";
import { LectureCard } from "@/components/lecture-card";

interface LecturesContentProps {
  query?: string;
  page?: string;
  category?: string;
  sort?: string;
}

export default async function LecturesContent({
  query = '',
  page = '1',
  category = '',
  sort = 'created_at'
}: LecturesContentProps) {
  const currentPage = Number(page) || 1;
  const { meta, lectures } = await getAllLectures(currentPage, query, category);
  const totalPages = meta.total_pages;
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/lectures">المحاضرات</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">المحاضرات</h1>
              <SearchBar placeholder="ابحث في المحاضرات..." categories={meta.categories} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lectures.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  <h3 className="text-xl font-medium text-gray-600 mb-2">لا توجد محاضرات متاحة</h3>
                  <p className="text-gray-500">جرب البحث باستخدام كلمات مفتاحية مختلفة</p>
                </div>
              ) : (
                lectures.map((lecture) => (
                  <LectureCard key={lecture.id} lecture={lecture} />
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination totalPages={totalPages} />
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/4 mt-8 lg:mt-0">
            <PageSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
