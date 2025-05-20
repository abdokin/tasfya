import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { formatDuration, formatDate, resourceUrl } from "@/lib/utils";
import Image from "next/image";
import { AudioTrack, } from "@/types";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import PageSidebar from "@/components/page-sidebar";
import AudioPlayerButton from "@/components/audio-player/audio-player-button";
import { getLectureById } from "@/lib/services/lectures-service";
import sheikh from "@/lib/data/sheikh";

export default async function LecturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const lecture = await getLectureById(id);
  if (!lecture) {
    return <div className="text-center">المحاضرة غير موجودة</div>;
  }

  const audioTrack: AudioTrack = {
    id: Number(lecture.id),
    title: lecture.title,
    artist: sheikh.name,
    audioUrl: resourceUrl(lecture.audio_url),
    duration: lecture.duration,
    thumbnailUrl: resourceUrl(lecture.thumbnail_url),
    type: "lecture"
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
      <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/lectures">المحاضرات والكلمات</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/lectures/${lecture.id}`}>{lecture.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="relative h-48 md:h-64 bg-gray-900">
              <Image
                src={resourceUrl(lecture.thumbnail_url)}
                alt={lecture.title}
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <AudioPlayerButton track={audioTrack} />
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs">خطبة منبرية</span>
                <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">{lecture.category}</span>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-4">{lecture.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 ml-1" />
                  <span>{formatDate(lecture.published_date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 ml-1" />
                  <span>{formatDuration(lecture.duration || 0)}</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{lecture.description}</p>
                {lecture.content && (
                  <div className="mt-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" 
                       dangerouslySetInnerHTML={{ __html: lecture.content.body }} />
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {lecture.audio_url && (
                  <Button variant="outline">تحميل الخطبة</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <PageSidebar/>
        </div>
      </div>
    </div>
  );
}
