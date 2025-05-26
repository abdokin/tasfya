import { Metadata } from "next";
import { getLessonById } from "@/lib/services/lessons-service";
import { Suspense } from "react";
import LessonSkeleton from "@/components/skeletons/lesson-skeleton";
import LessonContent from "./lesson-content";

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
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContent id={params.id} />
    </Suspense>
  );
}
