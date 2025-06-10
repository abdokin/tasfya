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

interface SeriesContentProps {
  query?: string;
  page?: string;
  category?: string;
  sort?: string;
}

export default async function SeriesContent({
  query = '',
  page = '1',
  category = '',
  sort = 'created_at'
}: SeriesContentProps) {
  const seriesPage = Number(page) || 1;

  const { meta: seriesMeta, series } = await getAllSeries(seriesPage, query, category);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/series">المكتبة العلمية</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">المكتبة العلمية</h1>
              <SearchBar placeholder="ابحث في المكتبة العلمية..." categories={seriesMeta.categories} />
            </div>

            {/* <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">أحدث الدروس</h2>
                <LessonsList lessons={lessons} />
                {meta.total_pages > 1 && (
                  <div className="mt-6 flex justify-center">
                    <Pagination
                      totalPages={meta.total_pages}
                      resourceType="series"
                    />
                  </div>
                )}
              </CardContent>
            </Card> */}

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">سلاسل الدروس</h2>
                <SeriesList series={series} />
                {seriesMeta.total_pages > 1 && (
                  <div className="mt-6 flex justify-center">
                    <Pagination
                      totalPages={seriesMeta.total_pages}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="w-full lg:w-1/4 mt-8 lg:mt-0">
            <PageSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
