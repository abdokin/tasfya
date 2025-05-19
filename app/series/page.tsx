"use server";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import PageSidebar from "@/components/page-sidebar";
import { getAllLessons } from "@/lib/services/lessons-service";
import { getAllSeries } from "@/lib/services/series-service";
import { SearchBar } from "@/components/search-bar";
import { LessonsList } from "@/components/lessons-list";
import { SeriesList } from "@/components/series-list";
import Pagination from "@/components/pagination";


export default async function SeriePage(props: {
  searchParams?: Promise<{
    query?: string;
    lessons_page?: string;
    series_page?: string;
    category?: string;
    sort?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const lessonsPage = Number(searchParams?.lessons_page) || 1;
  const seriesPage = Number(searchParams?.series_page) || 1;
  const category = searchParams?.category || '';
  const sort = searchParams?.sort || 'created_at';
  
  const { meta, lessons } = await getAllLessons(lessonsPage, query, category);
  const { meta: seriesMeta, series } = await getAllSeries(seriesPage, query, category);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb className="mb-4" dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
              <BreadcrumbLink href="/series">المكتبة العلمية</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="mb-8 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-gray-900">المكتبة العلمية</h1>
                  <p className="text-gray-600">تصفح جميع الدروس العلمية والسلاسل العلمية للشيخ</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <Card className="border-gray-100 shadow-sm mb-8">
                <CardContent className="p-4">
                  <SearchBar categories={meta.categories} />
                </CardContent>
              </Card>

              {/* Series Section */}
              <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span>السلاسل العلمية</span>
                <span className="text-sm font-normal text-gray-500">({seriesMeta.total_items})</span>
              </h2>
              
              <Card className="border-gray-100 shadow-sm mb-10">
                <CardContent className="p-4">
                  <div className="relative overflow-hidden rounded-lg">
                    {series.length > 0 ? (
                      <SeriesList series={series} />
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">لا توجد سلاسل متاحة.</p>
                      </div>
                    )}
                    {seriesMeta.total_pages > 1 && (
                      <div className="mt-4">
                        <Pagination totalPages={seriesMeta.total_pages} resourceType="series" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Lessons Section */}
              <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span>الدروس العلمية</span>
                <span className="text-sm font-normal text-gray-500">({meta.total_items})</span>
              </h2>
              
              <Card className="border-gray-100 shadow-sm">
                <CardContent className="p-4">
                  <div className="relative overflow-hidden rounded-lg">
                    {lessons.length > 0 ? (
                      <LessonsList lessons={lessons} />
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">لا توجد دروس متاحة.</p>
                      </div>
                    )}
                    {meta.total_pages > 1 && (
                      <div className="mt-4">
                        <Pagination totalPages={meta.total_pages} resourceType="lessons" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="lg:col-span-1">
            <PageSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
