import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { formatDuration, formatDate, resourceUrl } from "@/lib/utils";
import Image from "next/image";
import { AudioTrack, } from "@/types";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import PageSidebar from "@/components/page-sidebar";
import AudioPlayerButton from "@/components/audio-player/audio-player-button";
import { getBenefitById } from "@/lib/services/benefits-service";
import sheikh from "@/lib/data/sheikh";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export default async function BenefitPage({ id }: { id: string }) {
  const benefit = await getBenefitById(id);
  if (!benefit) {
    notFound();
  }

  const audioTrack: AudioTrack = {
    id: Number(benefit.id),
    title: benefit.title,
    artist: sheikh.name,
    audioUrl: resourceUrl(benefit.audio_url),
    duration: benefit.duration,
    thumbnailUrl: resourceUrl(benefit.thumbnail_url),
    type: "benefit"
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
              <BreadcrumbLink href="/benefits">الفوائد</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/benefits/${benefit.id}`}>{benefit.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="relative h-48 md:h-64 bg-gray-900">
              <Image
                src={resourceUrl(benefit.thumbnail_url)}
                alt={benefit.title}
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
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs">فائدة</span>
                <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">{benefit.category}</span>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-4">{benefit.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="size-4" />
                  <span>{formatDate(benefit.published_date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="size-4" />
                  <span>{formatDuration(benefit.duration || 0)}</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                {benefit.content && (
                  <div className="mt-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" 
                       dangerouslySetInnerHTML={{ __html: benefit.content.body }} />
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {benefit.audio_url && (
                  <Button variant="outline">تحميل الفائدة</Button>
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
