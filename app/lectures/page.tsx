import { Suspense } from "react";
import LectureSkeleton from "@/components/skeletons/lecture-skeleton";
import LecturesContent from "./lectures-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المحاضرات | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
  description: "استمع إلى المحاضرات العلمية المتنوعة لفضيلة الشيخ محمد بن رمزان الهاجري في مختلف المناسبات والأماكن",
  openGraph: {
    title: "المحاضرات | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
    description: "استمع إلى المحاضرات العلمية المتنوعة لفضيلة الشيخ محمد بن رمزان الهاجري في مختلف المناسبات والأماكن",
    type: "website",
  },
};

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
