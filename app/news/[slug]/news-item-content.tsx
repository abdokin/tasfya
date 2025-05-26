import Image from "next/image";
import { notFound } from "next/navigation";
import { getNewsItem } from "@/lib/services/news-service";
import { formatDate, resourceUrl } from "@/lib/utils";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import PageSidebar from "@/components/page-sidebar";

export default async function NewsItemContent({ slug }: { slug: string }) {
  const news = await getNewsItem(slug);
  
  if (!news.id) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/news">الأخبار</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/news/${news.slug}`}>{news.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="overflow-hidden border-0 shadow-md">
            {news.thumbnail_url && (
              <div className="relative w-full aspect-[16/9]">
              <Image
                src={resourceUrl(news.thumbnail_url)}
                alt={news.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              </div>
            )}

            <CardContent className="p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{news.title}</h1>
              <div className="flex items-center gap-2 text-gray-500 mb-6">
                <span>{formatDate(news.published_at)}</span>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{news.description}</p>
                {news.content && (
                  <div 
                    className="mt-4"
                    // dangerouslySetInnerHTML={{ __html: news.content }}
                  />
                )}
              </div>
              <hr className="my-6" />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                  <span className="font-medium">مشرف الموقع</span>
                </div>
                <div className="flex gap-2">
                  {/* Social sharing buttons would go here */}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related news would go here */}
        </div>

        <div className="md:col-span-1">
          <PageSidebar />
        </div>
      </div>
    </div>
  );
}
