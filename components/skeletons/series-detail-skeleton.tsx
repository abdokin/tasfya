import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SeriesDetailSkeleton() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-4" dir="rtl">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Series Title and Meta Card */}
            <Card className="mb-8 border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row justify-between gap-2">
                    <div>
                      <Skeleton className="h-9 w-3/4 mb-2" />
                      <div className="mt-2 flex items-center gap-2">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-28" />
                  </div>
                  <div className="prose max-w-none">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Series Lessons Section */}
            <div className="mb-4">
              <Skeleton className="h-8 w-40 mb-4" />
            </div>
            
            <Card className="border-gray-100 shadow-sm">
              <CardContent className="p-4">
                <div className="relative overflow-hidden rounded-lg">
                  {/* Lessons List Skeleton */}
                  <div className="space-y-4">
                    {Array(5).fill(0).map((_, index) => (
                      <div key={index} className="flex items-center p-3 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                          <Skeleton className="h-5 w-5/6 mb-2" />
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <Skeleton className="h-7 w-32 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full rounded-md" />
                  <Skeleton className="h-16 w-full rounded-md" />
                  <Skeleton className="h-16 w-full rounded-md" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}