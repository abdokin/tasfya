import { Suspense } from "react";
import FatwaSkeleton from "@/components/skeletons/fatwa-skeleton";
import FatwasContent from "./fatwas-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الفتاوى | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
  description: "اطلع على مجموعة من الفتاوى والأسئلة الشرعية المجاب عليها من فضيلة الشيخ محمد بن رمزان الهاجري",
  openGraph: {
    title: "الفتاوى | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
    description: "اطلع على مجموعة من الفتاوى والأسئلة الشرعية المجاب عليها من فضيلة الشيخ محمد بن رمزان الهاجري",
    type: "website",
  },
};

export default function FatwasPage({ searchParams }: {
  searchParams: {
    query?: string;
    page?: string;
    category?: string;
    sort?: string;
  };
}) {
  return (
    <Suspense fallback={<FatwaSkeleton />}>
      <FatwasContent
        query={searchParams.query}
        page={searchParams.page}
        category={searchParams.category}
        sort={searchParams.sort}
      />
    </Suspense>
  );
}
