import { Suspense } from "react";
import NewsDetailSkeleton from "@/components/skeletons/news-detail-skeleton";
import NewsItemContent from "./news-item-content";

export default function NewsItemPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<NewsDetailSkeleton />}>
      <NewsItemContent slug={params.slug} />
    </Suspense>
  );
}
