"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Calendar, BookmarkPlus, ThumbsUp, Eye, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { formatDate, resourceUrl } from "@/lib/utils"
import { Benefit } from "@/lib/services/benefits-service"
import { useAudioPlayer } from "@/context/AudioPlayerContext"
import { AudioTrack } from "@/types"
import sheikh from "@/lib/data/sheikh"

export const BenefitCard = ({ benefit }: { benefit: Benefit }) => {
    const player = useAudioPlayer()
    const track: AudioTrack = {
        id: Number(benefit.id),
        title: benefit.title,
        audioUrl: resourceUrl(benefit.audio_url),
        thumbnailUrl: resourceUrl(benefit.thumbnail_url),
        duration: benefit.duration,
        type: "benefit",
        artist: sheikh.name,
    }
    return (
        <Card className="overflow-hidden border-0 shadow-sm group hover:shadow-md transition-shadow">
            <div className="relative h-36">
                <Image src={resourceUrl(benefit.thumbnail_url)} alt={benefit.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-3 right-3">
                    <Badge>{benefit.category}</Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => player.setTrack(track)}
                                className="rounded-full bg-white/20 border-white/40 text-white hover:bg-white/30 hover:text-white"
                            >
                                <Play className="size-4" />
                                <span>استماع</span>
                            </Button>
                        </div>
            </div>
            <CardContent className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        <span>{formatDate(benefit.published_date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye className="size-4" />
                        <span>{benefit.views}</span>
                    </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                    {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {benefit.description}
                </p>
                <div className="flex justify-between items-center">
                    <Button variant="link" className="p-0 h-auto" asChild>
                        <Link href={`/benefits/${benefit.id}`}>
                            قراءة كاملة
                        </Link>
                    </Button>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                            <BookmarkPlus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}