import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { formatDuration, formatDate, resourceUrl, formatYoutubeUrl } from "@/lib/utils";
import Image from "next/image";
import { AudioTrack } from "@/types";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import PageSidebar from "@/components/page-sidebar";
import AudioPlayerButton from "@/components/audio-player/audio-player-button";
import { getLectureById } from "@/lib/services/lectures-service";
import sheikh from "@/lib/data/sheikh";
import { notFound } from "next/navigation";

export default async function LectureContent({ id }: { id: string }) {
  const lecture = await getLectureById(id);
  if (!lecture) {
    notFound();
  }

  const audioTrack: AudioTrack | null =lecture.audio_url ? {
    id: Number(lecture.id),
    title: lecture.title,
    artist: sheikh.name,
    audioUrl: resourceUrl(lecture.audio_url),
    duration: lecture.duration,
    thumbnailUrl: resourceUrl(lecture.thumbnail_url),
    type: "lecture"
  }: null;

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
              <BreadcrumbLink href="/lectures">المحاضرات</BreadcrumbLink>
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
                src={lecture.thumbnail_url ? resourceUrl(lecture.thumbnail_url) : "/background.jpg"}
                alt={lecture.title}
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {lecture.media_type === 'video' ? (lecture.video_url && lecture.audio_url?.endsWith(".com") ? (
                  <div className="w-full h-full aspect-video">
                    <iframe
                      className="w-full h-full rounded-md border-0"
                      src={formatYoutubeUrl(lecture.video_url)}
                      title={lecture.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                    <iframe
                      className="w-full h-full rounded-md border-0"
                      src={lecture.video_url}
                      title={lecture.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                )) : lecture.media_type === 'audio' && audioTrack && (
                  <AudioPlayerButton track={audioTrack} />
                )}
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs">
                    محاضرة صوتية
                  </span>
                  {lecture.category && (
                    <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">{lecture.category}</span>
                  )}
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-4">{lecture.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                {/* {lecture.published_date && (
                  <div className="flex items-center gap-1">
                    <span>{formatDate(lecture.published_date)}</span>
                    <Calendar className="size-4" />
                  </div>
                )} */}
                {lecture.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="size-4" />
                    <span>{formatDuration(lecture.duration)}</span>
                  </div>
                )}
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{lecture.description}</p>
                {lecture.content && (
                  <div className="mt-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                    dangerouslySetInnerHTML={{ __html: lecture.content.body }} />
                )}
              </div>

              {lecture.audio_url && (
                <div className="mt-8">
                  <Button variant="outline">
                    <Link href={resourceUrl(lecture.audio_url)} target="_blank">
                      تحميل المحاضرة
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <PageSidebar />
        </div>
      </div>
    </div>
  );
}
