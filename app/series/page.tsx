import { Suspense } from "react";
import SeriesSkeleton from "@/components/skeletons/series-skeleton";
import SeriesContent from "./series-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "السلاسل العلمية | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
  description: "استعرض السلاسل العلمية المتكاملة لفضيلة الشيخ محمد بن رمزان الهاجري في مختلف العلوم الشرعية",
  openGraph: {
    title: "السلاسل العلمية | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
    description: "استعرض السلاسل العلمية المتكاملة لفضيلة الشيخ محمد بن رمزان الهاجري في مختلف العلوم الشرعية",
    type: "website",
  },
};

export default async function SeriesPage({ searchParams }: {
  searchParams: Promise<{
    query?: string;
    lessons_page?: string;
    series_page?: string;
    category?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;
  return (
    <Suspense fallback={<SeriesSkeleton />}>
      <SeriesContent
        query={params.query}
        lessons_page={params.lessons_page}
        series_page={params.series_page}
        category={params.category}
        sort={params.sort}
      />
    </Suspense>
  );
}
