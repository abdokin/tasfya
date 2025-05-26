import { Suspense } from "react";
import { Metadata } from "next";
import NewsSkeleton from "@/components/skeletons/news-skeleton";
import NewsContent from "./news-content";

export const metadata: Metadata = {
  title: "الأخبار | الموقع الرسمي للشيخ",
  description: "آخر الأخبار والإعلانات من الموقع الرسمي للشيخ"
};

interface NewsPageProps {
  searchParams: { page?: string; q?: string }
}

export default function NewsPage({ searchParams }: NewsPageProps) {
  return (
    <Suspense fallback={<NewsSkeleton />}>
      <NewsContent page={searchParams.page} q={searchParams.q} />
    </Suspense>
  );
}
