import { Metadata } from "next";
import { getBenefitById } from "@/lib/services/benefits-service";
import { Suspense } from "react";
import BenefitDetailSkeleton from "@/components/skeletons/benefit-detail-skeleton";
import BenefitContent from "./benefit-content";

type Props = {
  params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get the benefit data
  const benefit = await getBenefitById(params.id);
  
  // If no benefit is found, return default metadata
  if (!benefit) {
    return {
      title: "الفائدة غير موجودة | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
      description: "الفائدة المطلوبة غير موجودة في الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري"
    };
  }
  
  return {
    title: `${benefit.title} | فوائد الشيخ محمد بن رمزان الهاجري`,
    description: benefit.description || `فائدة ${benefit.title} من فوائد فضيلة الشيخ محمد بن رمزان الهاجري`,
    openGraph: {
      title: benefit.title,
      description: benefit.description || `فائدة ${benefit.title} من فوائد فضيلة الشيخ محمد بن رمزان الهاجري`,
      type: 'article',
      images: benefit.thumbnail_url ? [{ url: benefit.thumbnail_url }] : [],
    },
  };
}

export default function BenefitPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<BenefitDetailSkeleton />}>
      <BenefitContent id={params.id} />
    </Suspense>
  );
}
