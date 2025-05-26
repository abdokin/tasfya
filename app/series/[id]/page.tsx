import { Metadata } from "next";
import { getSeriesById } from "@/lib/services/series-service";
import { Suspense } from "react";
import SeriesDetailSkeleton from "@/components/skeletons/series-detail-skeleton";
import SeriesContent from "./series-content";

type Props = {
  params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get the series data
  const series = await getSeriesById(params.id);
  
  // If no series is found, return default metadata
  if (!series) {
    return {
      title: "السلسلة غير موجودة | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
      description: "السلسلة المطلوبة غير موجودة في الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري"
    };
  }
  
  return {
    title: `${series.title} | سلاسل الشيخ محمد بن رمزان الهاجري`,
    description: series.description || `سلسلة ${series.title} من سلاسل فضيلة الشيخ محمد بن رمزان الهاجري`,
    openGraph: {
      title: series.title,
      description: series.description || `سلسلة ${series.title} من سلاسل فضيلة الشيخ محمد بن رمزان الهاجري`,
      type: 'article',
    },
  };
}

export default function SeriesPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<SeriesDetailSkeleton />}>
      <SeriesContent id={params.id} />
    </Suspense>
  );
}
