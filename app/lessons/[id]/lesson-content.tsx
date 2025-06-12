import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Calendar, Clock, ExternalLink } from "lucide-react";
import { formatDuration, formatDate, resourceUrl } from "@/lib/utils";
import Image from "next/image";
import { AudioTrack } from "@/types";
import { getLessonById } from "@/lib/services/lessons-service";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import PageSidebar from "@/components/page-sidebar";
import AudioPlayerButton from "@/components/audio-player/audio-player-button";
import sheikh from "@/lib/data/sheikh";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export default async function LessonContent({ id }: { id: string }) {
  const lesson = await getLessonById(id);

  if (!lesson) {
    notFound();
  }

  const audioTrack: AudioTrack | null = lesson.media_type === 'audio' ? {
    id: Number(lesson.id),
    title: lesson.title,
    artist: sheikh.name,
    audioUrl: resourceUrl(lesson.audio_url),
    duration: lesson.duration || 300,
    thumbnailUrl: resourceUrl(lesson.thumbnail_url),
    type: "lesson"
  } : null;
  
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
              <BreadcrumbLink href="/series">المكتبة العلمية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/lessons/${lesson.id}`}>{lesson.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="relative h-48 md:h-64 bg-gray-900">
              <Image
                src={"/background.jpg"}
                alt={lesson.title}
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {lesson.media_type === 'audio' && audioTrack ? (
                  <AudioPlayerButton track={audioTrack} />
                ) : lesson.media_type === 'video' && lesson.video_url ? (
                  <div className="w-full h-full aspect-video">
                    <iframe
                      className="w-full h-full rounded-md border-0"
                      src={lesson.video_url.includes('youtube.com/watch?v=') 
                        ? lesson.video_url.replace('youtube.com/watch?v=', 'youtube.com/embed/')
                        : lesson.video_url.replace("watch?v=", "embed/")}
                      title={lesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs">
                    {lesson.media_type === 'video' ? 'فيديو' : 'درس صوتي'}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">{lesson.category}</span>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-4">{lesson.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 ml-1" />
                  <span>{formatDate(lesson.published_date)}</span>
                </div>
                {/* <div className="flex items-center">
                  <Clock className="h-4 w-4 ml-1" />
                  <span>{formatDuration(lesson.duration || 0)}</span>
                </div> */}
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{lesson.description}</p>
                {lesson.content && (
                  <div className="mt-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                    dangerouslySetInnerHTML={{ __html: lesson.content.body }} />
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {lesson.media_type === 'audio' && lesson.audio_url && (
                  <Button variant="outline">تحميل الملف الصوتي</Button>
                )}
                {lesson.media_type === 'video' && lesson.video_url && (
                  <Button
                    variant="outline"
                    asChild
                  >
                    <Link href={lesson.video_url} target="_blank" className="flex items-center">
                      <ExternalLink className="h-4 w-4 ml-1" />
                      مشاهدة على يوتيوب
                    </Link>
                  </Button>
                )}
              </div>
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
