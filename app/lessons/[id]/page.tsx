import { Suspense } from "react";
import LessonSkeleton from "@/components/skeletons/lesson-skeleton";
import LessonContent from "./lesson-content";

export default function LessonPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContent id={params.id} />
    </Suspense>
  );
}
