import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import PageSidebar from "@/components/page-sidebar";
import { getFatwaById } from "@/lib/services/fatwas-service";

export default async function FatwaContent({ id }: { id: string }) {
  const fatwa = await getFatwaById(id);

  if (!fatwa) {
    return <div className="container mx-auto px-4 py-8">الفتوى غير موجودة</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/fatwas">الفتاوى</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/fatwas/${fatwa.id}`}>فتوى</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="mb-6 shadow-sm">
              <CardHeader>
                <CardTitle>السؤال</CardTitle>
              </CardHeader>
              <CardContent>
                <h1 className="text-xl font-semibold mb-4">{fatwa.title}</h1>
                <div className="text-gray-700 prose max-w-none mb-6"
                  dangerouslySetInnerHTML={{ __html: fatwa.question.body }}
                ></div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>الإجابة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                </div>
                <div 
                  className="prose max-w-none mb-6" 
                  dangerouslySetInnerHTML={{ __html: fatwa.answer }} 
                />
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold">التصنيف:</span> {fatwa.category || 'عام'}
                  </div>
                  <div className="flex gap-2">
                    {/* Share buttons could go here */}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">فتاوى ذات صلة</h3>
              <div className="grid grid-cols-1 gap-4">
                {/* Related fatwas would go here */}
                <div className="text-gray-500">لا توجد فتاوى ذات صلة</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <PageSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
