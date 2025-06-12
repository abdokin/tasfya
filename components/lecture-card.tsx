"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Play,
} from "lucide-react";
import Link from "next/link";
import { formatDate, resourceUrl } from "@/lib/utils";
import { Lecture } from "@/lib/services/lectures-service";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { AudioTrack } from "@/types"
import sheikh from "@/lib/data/sheikh";

export const LectureCard = ({ lecture }: { lecture: Lecture }) => {
    const player = useAudioPlayer();
    const track: AudioTrack | null = lecture.audio_url ? {
        id: 0,
        title: lecture.title,
        audioUrl: resourceUrl(lecture.audio_url),
        thumbnailUrl: resourceUrl(lecture.thumbnail_url),
        duration: lecture.duration,
        type: "lecture",
        artist: sheikh.name,
    } : null;
    return (
        <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardContent className="p-0">
                <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center text-xs text-gray-500 gap-1">
                            <Calendar className="size-3" />
                            <span>{formatDate(lecture.published_date)}</span>
                        </div>
                    </div>
                    <Link href={`/lectures/${lecture.id}`} className="block">
                        <h3 className="text-xl font-semibold mb-2 hover:underline transition-colors">
                            {lecture.title}
                        </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {lecture.description}
                    </p>
                    <div className="flex items-center gap-4">
                        {lecture.media_type === 'audio' && track && (
                            <Button variant="outline" size="sm" onClick={() => player.setTrack(track)}>
                                <Play className="size-4" />
                                <span>استماع</span>
                            </Button>
                        )}

                        {lecture.video_url && (
                            <Link href={`/lectures/${lecture.id}/video`} className="flex items-center gap-2 text-blue-600 hover:underline">
                                <Play className="size-4" />
                                <span>مشاهدة الفيديو</span>
                            </Link>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};