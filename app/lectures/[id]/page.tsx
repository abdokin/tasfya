import { Suspense } from "react";
import LectureDetailSkeleton from "@/components/skeletons/lecture-detail-skeleton";
import LectureContent from "./lecture-content";

export default function LecturePage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<LectureDetailSkeleton />}>
      <LectureContent id={params.id} />
    </Suspense>
  );
}
