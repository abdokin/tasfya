import { Metadata } from "next";
import { getBenefitById } from "@/lib/services/benefits-service";
import { Suspense } from "react";
import BenefitDetailSkeleton from "@/components/skeletons/benefit-detail-skeleton";
import BenefitContent from "./benefit-content";
import AudioJsonLd from "@/components/json-ld/audio-json-ld";
import { formatDate, formatDuration, resourceUrl } from "@/lib/utils";
import sheikh from "@/lib/data/sheikh";

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
    <>
      <BenefitJsonLdWrapper id={params.id} />
      <Suspense fallback={<BenefitDetailSkeleton />}>
        <BenefitContent id={params.id} />
      </Suspense>
    </>
  );
}

// Separate component for JSON-LD to avoid issues with suspense
function BenefitJsonLdWrapper({ id }: { id: string }) {
  const benefit = getBenefitById(id);
  
  // Using Promise to handle async data
  benefit.then(data => {
    if (!data || !data.audio_url) return null;
    
    return (
      <AudioJsonLd
        name={data.title}
        description={data.description || `فائدة ${data.title} من فوائد فضيلة الشيخ محمد بن رمزان الهاجري`}
        contentUrl={resourceUrl(data.audio_url)}
        uploadDate={formatDate(data.published_date)}
        duration={formatDuration(data.duration || 0)}
        thumbnailUrl={data.thumbnail_url ? resourceUrl(data.thumbnail_url) : undefined}
        author={sheikh.name}
      />
    );
  });
  
  return null;
}
