import { Suspense } from "react";
import BenefitSkeleton from "@/components/skeletons/benefit-skeleton";
import BenefitsContent from "./benefits-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الفوائد | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
  description: "استمع إلى مجموعة من الفوائد العلمية والمقتطفات المنتقاة من دروس ومحاضرات فضيلة الشيخ محمد بن رمزان الهاجري",
  openGraph: {
    title: "الفوائد | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
    description: "استمع إلى مجموعة من الفوائد العلمية والمقتطفات المنتقاة من دروس ومحاضرات فضيلة الشيخ محمد بن رمزان الهاجري",
    type: "website",
  },
};

export default async function BenefitsPage({ searchParams }: {
  searchParams: Promise<{
    query?: string;
    page?: string;
    category?: string;
    sort?: string;
  }>;
}) {
  const { query = '', page = '1', category = '', sort = 'created_at' } = await searchParams;
  return (
    <Suspense fallback={<BenefitSkeleton />}>
      <BenefitsContent 
        query={query}
        page={page}
        category={category}
        sort={sort}
      />
    </Suspense>
  );
}
