import { Metadata } from "next";
import { getSeriesById } from "@/lib/services/series-service";
import { Suspense } from "react";
import SeriesDetailSkeleton from "@/components/skeletons/series-detail-skeleton";
import SeriesContent from "./series-content";
import SeriesJsonLd from "@/components/json-ld/series-json-ld";

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const series = await getSeriesById(id);
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
    <>
      <SeriesJsonLdWrapper id={params.id} />
      <Suspense fallback={<SeriesDetailSkeleton />}>
        <SeriesContent id={params.id} />
      </Suspense>
    </>
  );
}

function SeriesJsonLdWrapper({ id }: { id: string }) {
  const series = getSeriesById(id);
  
  series.then(data => {
    if (!data || !data.lessons || data.lessons.length === 0) return null;
    
    return (
      <SeriesJsonLd
        title={data.title}
        description={data.description || `سلسلة ${data.title} من سلاسل فضيلة الشيخ محمد بن رمزان الهاجري`}
        url={`${process.env.NEXT_PUBLIC_SITE_URL}/series/${data.id}`}
        lessons={data.lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/lessons/${lesson.id}`
        }))}
      />
    );
  });
  
  return null;
}
