// filepath: /home/abdo/almaktabah/frontend/app/fatwas/page.tsx
import { Suspense } from "react";
import FatwaSkeleton from "@/components/skeletons/fatwa-skeleton";
import FatwasContent from "./fatwas-content";

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
