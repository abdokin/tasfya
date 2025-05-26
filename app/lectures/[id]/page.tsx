import { Metadata } from "next";
import { getLectureById } from "@/lib/services/lectures-service";
import { Suspense } from "react";
import LectureDetailSkeleton from "@/components/skeletons/lecture-detail-skeleton";
import LectureContent from "./lecture-content";

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
    <Suspense fallback={<LectureDetailSkeleton />}>
      <LectureContent id={params.id} />
    </Suspense>
  );
}
