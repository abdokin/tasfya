import Image from "next/image";
import { notFound } from "next/navigation";
import { getNewsItem } from "@/lib/services/news-service";
import { formatDate, resourceUrl } from "@/lib/utils";
interface NewsPageProps {
  params: Promise<{
    slug: string;
  }>
}

export default async function NewsItemPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const news = await getNewsItem(slug);
  if (!news && !news.id) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
        <div className="text-gray-500 mb-4">
          {formatDate(news.published_at)}
        </div>

        {news.thumbnail_url && (
          <div className="relative h-80 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={resourceUrl(news.thumbnail_url)}
              alt={news.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        )}

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </div>
    </div>
  );
}
