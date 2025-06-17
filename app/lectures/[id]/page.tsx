import { Metadata } from "next";
import { getLectureById } from "@/lib/services/lectures-service";
import { Suspense } from "react";
import LectureDetailSkeleton from "@/components/skeletons/lecture-detail-skeleton";
import LectureContent from "./lecture-content";
import AudioJsonLd from "@/components/json-ld/audio-json-ld";
import { formatDate, formatDuration, resourceUrl } from "@/lib/utils";
import sheikh from "@/lib/data/sheikh";

type Props = {
  params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get the lecture data
  const lecture = await getLectureById(params.id);
  
  // If no lecture is found, return default metadata
  if (!lecture) {
    return {
      title: "المحاضرة غير موجودة | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
      description: "المحاضرة المطلوبة غير موجودة في الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري"
    };
  }
  
  return {
    title: `${lecture.title} | محاضرات الشيخ محمد بن رمزان الهاجري`,
    description: lecture.description || `محاضرة ${lecture.title} من محاضرات فضيلة الشيخ محمد بن رمزان الهاجري`,
    openGraph: {
      title: lecture.title,
      description: lecture.description || `محاضرة ${lecture.title} من محاضرات فضيلة الشيخ محمد بن رمزان الهاجري`,
      type: 'article',
      images: lecture.thumbnail_url ? [{ url: lecture.thumbnail_url }] : [],
    },
  };
}

export default function LecturePage({ params }: { params: { id: string } }) {
  return (
    <>
      <LectureJsonLdWrapper id={params.id} />
      <Suspense fallback={<LectureDetailSkeleton />}>
        <LectureContent id={params.id} />
      </Suspense>
    </>
  );
}

// Separate component for JSON-LD to avoid issues with suspense
async function LectureJsonLdWrapper({ id }: { id: string }) {
  const lecture = getLectureById(id);
  // Using Promise to handle async data
  return lecture.then(lectureData => {
    if (!lectureData) return null;
    
    const formattedDuration = lectureData.duration ? 
      `PT${Math.floor(lectureData.duration / 60)}M${lectureData.duration % 60}S` : 
      "PT30M";
    
    return (
      <AudioJsonLd
        name={lectureData.title}
        description={lectureData.description || `محاضرة ${lectureData.title} من محاضرات فضيلة الشيخ محمد بن رمزان الهاجري`}
        contentUrl={resourceUrl(lectureData.audio_url!)}
        uploadDate={lectureData.published_date || new Date().toISOString()}
        duration={formattedDuration}
        thumbnailUrl={lectureData.thumbnail_url ? resourceUrl(lectureData.thumbnail_url) : undefined}
        author={sheikh.name}
      />
    );
  });
}
