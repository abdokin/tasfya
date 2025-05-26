import { Suspense } from "react";
import BenefitDetailSkeleton from "@/components/skeletons/benefit-detail-skeleton";
import BenefitContent from "./benefit-content";

export default function BenefitPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<BenefitDetailSkeleton />}>
      <BenefitContent id={params.id} />
    </Suspense>
  );
}
