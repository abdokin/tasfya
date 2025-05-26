import { Metadata } from "next";
import { getNewsItem } from "@/lib/services/news-service";
import { Suspense } from "react";
import NewsDetailSkeleton from "@/components/skeletons/news-detail-skeleton";
import NewsItemContent from "./news-item-content";
import ArticleJsonLd from "@/components/json-ld/article-json-ld";
import { resourceUrl } from "@/lib/utils";

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get the news item data
  const newsItem = await getNewsItem(params.slug);
  
  // If no news item is found, return default metadata
  if (!newsItem.id) {
    return {
      title: "الخبر غير موجود | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
      description: "الخبر المطلوب غير موجود في الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري"
    };
  }
  
  return {
    title: `${newsItem.title} | أخبار الشيخ محمد بن رمزان الهاجري`,
    description: newsItem.description || `${newsItem.title} - من أخبار فضيلة الشيخ محمد بن رمزان الهاجري`,
    openGraph: {
      title: newsItem.title,
      description: newsItem.description || `${newsItem.title} - من أخبار فضيلة الشيخ محمد بن رمزان الهاجري`,
      type: 'article',
      images: newsItem.thumbnail_url ? [{ url: newsItem.thumbnail_url }] : [],
    },
  };
}

export default function NewsItemPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <NewsJsonLdWrapper slug={params.slug} />
      <Suspense fallback={<NewsDetailSkeleton />}>
        <NewsItemContent slug={params.slug} />
      </Suspense>
    </>
  );
}

// Separate component for JSON-LD to avoid issues with suspense
function NewsJsonLdWrapper({ slug }: { slug: string }) {
  const newsItem = getNewsItem(slug);
  // Using Promise to handle async data
  return newsItem.then(item => {
    if (!item || !item.id) return null;
    
    return (
      <ArticleJsonLd
        title={item.title}
        description={item.description || item.title}
        datePublished={item.published_at || new Date().toISOString()}
        dateModified={item.updated_at || item.published_at || new Date().toISOString()}
        authorName="مشرف الموقع"
        imageUrl={item.thumbnail_url ? resourceUrl(item.thumbnail_url) : undefined}
        url={`${process.env.NEXT_PUBLIC_SITE_URL}/news/${item.slug}`}
      />
    );
  });
}
