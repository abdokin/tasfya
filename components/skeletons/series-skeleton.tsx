import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SeriesSkeleton() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4">
            <div className="mb-6">
              <Skeleton className="h-10 w-64 mb-4" />
              <Skeleton className="h-12 w-full max-w-md mb-4" />
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <Skeleton className="h-8 w-60 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <Skeleton className="h-20 w-20 flex-shrink-0 rounded-md" />
                      <div className="flex-1">
                        <Skeleton className="h-6 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-1" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <Skeleton className="h-10 w-72" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-60 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, i) => (
                    <Card key={i} className="border shadow-sm">
                      <CardContent className="p-4">
                        <Skeleton className="h-6 w-5/6 mb-2" />
                        <Skeleton className="h-4 w-20 mb-3" />
                        <div className="space-y-2">
                          {Array(3).fill(0).map((_, j) => (
                            <div key={j} className="flex gap-2 items-center">
                              <Skeleton className="h-3 w-3 rounded-full" />
                              <Skeleton className="h-4 w-full" />
                            </div>
                          ))}
                        </div>
                        <Skeleton className="h-8 w-full mt-4" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <Skeleton className="h-10 w-72" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full lg:w-1/4 mt-8 lg:mt-0">
            <Skeleton className="h-64 w-full" />
            <div className="mt-6 space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
