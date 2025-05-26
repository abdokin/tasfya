import { Metadata } from "next";
import { getLessonById } from "@/lib/services/lessons-service";
import { Suspense } from "react";
import LessonSkeleton from "@/components/skeletons/lesson-skeleton";
import LessonContent from "./lesson-content";
import AudioJsonLd from "@/components/json-ld/audio-json-ld";
import { formatDate, formatDuration, resourceUrl } from "@/lib/utils";
import sheikh from "@/lib/data/sheikh";

type Props = {
  params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get the lesson data
  const lesson = await getLessonById(params.id);
  
  // If no lesson is found, return default metadata
  if (!lesson) {
    return {
      title: "الدرس غير موجود | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
      description: "الدرس المطلوب غير موجود في الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري"
    };
  }
  
  return {
    title: `${lesson.title} | دروس الشيخ محمد بن رمزان الهاجري`,
    description: lesson.description || `درس ${lesson.title} من دروس فضيلة الشيخ محمد بن رمزان الهاجري`,
    openGraph: {
      title: lesson.title,
      description: lesson.description || `درس ${lesson.title} من دروس فضيلة الشيخ محمد بن رمزان الهاجري`,
      type: 'article',
      images: lesson.thumbnail_url ? [{ url: lesson.thumbnail_url }] : [],
    },
  };
}

export default function LessonPage({ params }: { params: { id: string } }) {
  return (
    <>
      <LessonJsonLdWrapper id={params.id} />
      <Suspense fallback={<LessonSkeleton />}>
        <LessonContent id={params.id} />
      </Suspense>
    </>
  );
}

// Separate component for JSON-LD to avoid issues with suspense
function LessonJsonLdWrapper({ id }: { id: string }) {
  const lesson = getLessonById(id);
  
  // Using Promise to handle async data
  lesson.then(data => {
    if (!data || !data.audio_url) return null;
    
    return (
      <AudioJsonLd
        name={data.title}
        description={data.description || `درس ${data.title} من دروس فضيلة الشيخ محمد بن رمزان الهاجري`}
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
