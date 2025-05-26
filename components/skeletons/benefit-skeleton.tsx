import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export default function BenefitSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <div className="relative h-36 bg-gray-200">
        {/* Thumbnail skeleton */}
        <Skeleton className="h-full w-full" />
        {/* Category badge skeleton */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-gray-300 text-transparent">
            <Skeleton className="h-4 w-16" />
          </Badge>
        </div>
        {/* Play button skeleton */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
      <CardContent className="p-4">
        {/* Date and views skeleton */}
        <div className="flex items-center justify-between text-sm mb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        {/* Title skeleton */}
        <Skeleton className="h-6 w-full mb-2" />
        {/* Description skeleton */}
        <div className="space-y-2 mb-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        {/* Footer actions skeleton */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function BenefitSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6).fill(0).map((_, index) => (
        <BenefitSkeleton key={index} />
      ))}
    </div>
  )
}