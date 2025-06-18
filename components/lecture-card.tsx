"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Link from "next/link";
import { resourceUrl } from "@/lib/utils";
import { Lecture } from "@/lib/services/lectures-service";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { AudioTrack } from "@/types"
import sheikh from "@/lib/data/sheikh";
import Image from "next/image";

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
                <Image
                    src={lecture.thumbnail_url ? resourceUrl(lecture.thumbnail_url) : "/audio-thumbnail.jpg"}
                    alt={lecture.title}
                    width={500}
                    height={200}
                    className={`w-full h-48 rounded-lg`}
                />
                <div className="p-5">
                    {/* <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center text-xs text-gray-500 gap-1">
                            <Calendar className="size-3" />
                            <span>{formatDate(lecture.published_date)}</span>
                        </div>
                    </div> */}
                    <Link href={`/lectures/${lecture.id}`} className="block">
                        <h3 className="text-xl font-semibold mb-2 hover:underline transition-colors">
                            {lecture.title}
                        </h3>
                    </Link>
                    {/* <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {lecture.description}
                    </p> */}
                    <div className="flex items-center gap-4 mt-auto">
                        {track && (
                            <Button variant="outline" size="sm" onClick={() => player.setTrack(track)}>
                                <Play className="size-4" />
                                <span>استماع</span>
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};