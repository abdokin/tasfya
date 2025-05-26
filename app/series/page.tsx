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

export default function SeriesPage({ searchParams }: {
  searchParams: {
    query?: string;
    lessons_page?: string;
    series_page?: string;
    category?: string;
    sort?: string;
  };
}) {
  return (
    <Suspense fallback={<SeriesSkeleton />}>
      <SeriesContent
        query={searchParams.query}
        lessons_page={searchParams.lessons_page}
        series_page={searchParams.series_page}
        category={searchParams.category}
        sort={searchParams.sort}
      />
    </Suspense>
  );
}
