"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Play, FileText, Eye, Video, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { AudioTrack } from "@/types"
import { Lesson } from "@/lib/services/lessons-service"
import { formatDate, resourceUrl } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useAudioPlayer } from "@/context/AudioPlayerContext"
import sheikh from "@/lib/data/sheikh"

function LessonCard({ lesson }: { lesson: Lesson }) {
  const { setTrack } = useAudioPlayer()
  const handlePlayClick = (lessonId: string) => {
    if (lesson.media_type === 'video' && lesson.video_url) {
      window.open(lesson.video_url, "_blank")
    } else {
      const audioTrack: AudioTrack = {
        id: Number(lessonId),
        title: lesson.title,
        artist: sheikh.name,
        audioUrl: resourceUrl(lesson.audio_url),
        duration: lesson.duration || 300,
        thumbnailUrl: resourceUrl(lesson.thumbnail_url),
        type: "lesson"
      }
      setTrack(audioTrack)
    }
  }
  return (
    <Card
      key={lesson.id}
      className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Icon */}
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border text-primary mx-auto sm:mx-0">
            {lesson.media_type === 'video' ? (
              <Video className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </div>

          {/* Text and Info */}
          <div className="flex-1 text-center sm:text-start">
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mb-2">
              <span className="text-xs text-gray-500">{formatDate(lesson.published_date)}</span>
              <Badge>{lesson.media_type === 'video' ? 'فيديو' : 'صوت'}</Badge>
              {lesson.series_id && (
                <Link href={`/series/${lesson.series_id}`}>
                  <Badge variant="outline" className="cursor-pointer">
                    سلسلة: {lesson.series_title}
                  </Badge>
                </Link>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-medium">{lesson.title}</h3>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-2 mt-2 sm:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="rounded-md"
              onClick={() => handlePlayClick(lesson.id)}
            >
              {lesson.media_type === 'video' ? (
                <>
                  <ExternalLink className="h-4 w-4 ml-1" />
                  <span>مشاهدة</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 ml-1" />
                  <span>استماع</span>
                </>
              )}
            </Button>
            <Link href={`/lessons/${lesson.id}`}>
              <Button size="sm">
                <Eye className="h-4 w-4 ml-1" />
                قراءة
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>

  )
}

export function RecentLessons({ lessons }: { lessons: Lesson[] }) {

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">أحدث الدروس العلمية</h2>
        <Button asChild variant="link">
          <Link href="/series">
            عرض الكل <ArrowLeft className="h-4 w-4 mr-1" />
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>

    </section>
  )
}

export function LessonsList({ lessons }: { lessons: Lesson[] }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">أحدث الدروس العلمية</h2>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </section>
  )
}
