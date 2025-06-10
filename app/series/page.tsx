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
    page?: string;
    category?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;
  return (
    <Suspense fallback={<SeriesSkeleton />}>
      <SeriesContent
        query={params.query}
        page={params.page}
        category={params.category}
        sort={params.sort}
      />
    </Suspense>
  );
}
