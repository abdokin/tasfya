import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LessonSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="relative h-48 md:h-64 bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="h-16 w-16 rounded-full" />
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>

              <Skeleton className="h-10 w-3/4 mb-4" />

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
              </div>

              <div className="space-y-4 mb-8">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              <Skeleton className="h-10 w-40 mt-8" />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Skeleton className="h-64 w-full" />
          <div className="mt-4 space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
