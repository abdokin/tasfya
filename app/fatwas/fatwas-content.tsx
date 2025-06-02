import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import PageSidebar from "@/components/page-sidebar";
import { getAllFatwas } from "@/lib/services/fatwas-service";
import { SearchBar } from "@/components/search-bar";
import Pagination from "@/components/pagination";
import { FatwaCard } from "@/components/fatwa-card";

interface FatwasContentProps {
  query?: string;
  page?: string;
  category?: string;
  sort?: string;
}

export default async function FatwasContent({
  query = '',
  page = '1',
  category = '',
  sort = 'created_at'
}: FatwasContentProps) {
  const currentPage = Number(page) || 1;
  const { meta, fatwas } = await getAllFatwas(currentPage, query, category);
  const totalPages = meta.total_pages;
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4" dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/fatwas">الفتاوى</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">الفتاوى</h1>
              <SearchBar placeholder="ابحث عن سؤال..." />
            </div>

            <div className="space-y-6">
              {fatwas.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-600 mb-2">لا توجد فتاوى مطابقة</h3>
                    <p className="text-gray-500 mb-4">جرب البحث باستخدام كلمات مفتاحية مختلفة</p>
                    <Button variant="outline">عرض كل الفتاوى</Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {fatwas.map((fatwa) => (
                    <FatwaCard key={fatwa.id} fatwa={fatwa} />
                  ))}
                </>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  totalPages={totalPages}
                  resourceType="fatwas"
                />
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
