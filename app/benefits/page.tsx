import { Suspense } from "react";
import BenefitSkeleton from "@/components/skeletons/benefit-skeleton";
import BenefitsContent from "./benefits-content";

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
