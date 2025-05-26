import { Suspense } from "react";
import SeriesDetailSkeleton from "@/components/skeletons/series-detail-skeleton";
import SeriesContent from "./series-content";

export default function SeriesPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<SeriesDetailSkeleton />}>
      <SeriesContent id={params.id} />
    </Suspense>
  );
}
