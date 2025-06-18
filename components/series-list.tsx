"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import { Series } from "@/lib/services/series-service"

function SeriesCard({ series }: { series: Series }) {
  return (
    <Card
      key={series.id}
      dir="rtl"
      className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <CardContent className="p-4" dir="rtl">
        <Link href={`/series/${series.id}`}>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex flex-col md:flex-row justify-between gap-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{series.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <div className="text-sm text-gray-600 flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded">
                      <BookOpen className="h-4 w-4" />
                      <span>{series.lessons_count} {series.lessons_count > 10 ? 'درساً' : 'دروس'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 line-clamp-2">{series.description}</p>
            </div>
            <div className="flex items-center md:items-end space-x-2 rtl:space-x-reverse">
              <Button variant="outline" className="h-9 gap-1">
                  <span>عرض السلسلة</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}

export function SeriesList({ series }: { series: Series[] }) {
  return (
    <div className="space-y-4">
      {series.map((item) => (
        <SeriesCard key={item.id} series={item} />
      ))}
    </div>
  )
}
