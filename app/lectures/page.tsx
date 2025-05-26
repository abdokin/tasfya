import { Suspense } from "react";
import LectureSkeleton from "@/components/skeletons/lecture-skeleton";
import LecturesContent from "./lectures-content";

export default function LecturesPage({ searchParams }: {
  searchParams: {
    query?: string;
    page?: string;
    category?: string;
    sort?: string;
  };
}) {
  return (
    <Suspense fallback={<LectureSkeleton />}>
      <LecturesContent
        query={searchParams.query}
        page={searchParams.page}
        category={searchParams.category}
        sort={searchParams.sort}
      />
    </Suspense>
  );
}
