import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { ar } from "date-fns/locale";
import Pagination from "@/components/pagination";
import NewsSearch from "@/components/news-search";
import { getNews, News } from "@/lib/services/news-service";
import { resourceUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "الأخبار | الموقع الرسمي للشيخ",
  description: "آخر الأخبار والإعلانات من الموقع الرسمي للشيخ"
};

interface NewsPageProps {
  searchParams: Promise<{ page?: string; q?: string }>
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const {page, q} = await searchParams;
  const currentPage = Number(page) || 1;
  const searchQuery = q;
  const response = await getNews(currentPage, 9, searchQuery);
  const news = response.data;
  const totalPages = response.meta.total_pages;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">الأخبار والإعلانات</h1>
      
      {/* Search component */}
      <div className="mb-8">
        <NewsSearch />
      </div>
      
      {news.length === 0 ? (
        <div className="py-12 text-center">
          <h2 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-4">
            لا توجد أخبار {searchQuery && "تطابق بحثك"}
          </h2>
          {searchQuery && (
            <p className="text-gray-500 dark:text-gray-400">
              جرب استخدام كلمات بحث أخرى أو تصفح جميع الأخبار
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item: News ) => (
            <Link 
              href={`/news/${item.slug}`} 
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <div className="relative h-48 w-full">
                {item.thumbnail_url ? (
                  <Image 
                    src={resourceUrl(item.thumbnail_url)} 
                    alt={item.title} 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">لا توجد صورة</span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{item.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <span>
                    {formatDistance(new Date(item.published_at), new Date(), { 
                      addSuffix: true,
                      locale: ar
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} resourceType="news" />
      )}
    </div>
  );
}
