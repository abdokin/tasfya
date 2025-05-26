import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function BookmarksLoading() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 flex items-center">
          <Skeleton className="h-4 w-20 mr-2" />
          <Skeleton className="h-4 w-4 mx-2" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="mb-8">
          <Skeleton className="h-8 w-60 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Search bar skeleton */}
        <div className="mb-8 relative">
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Tabs skeleton */}
            <div className="border rounded-lg p-1 mb-6 w-fit flex">
              <Skeleton className="h-10 w-20 rounded-md mx-1" />
              <Skeleton className="h-10 w-20 rounded-md mx-1" />
              <Skeleton className="h-10 w-20 rounded-md mx-1" />
              <Skeleton className="h-10 w-20 rounded-md mx-1" />
            </div>

            {/* Bookmarks list skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array(6).fill(0).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-40 w-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <div className="flex items-center gap-2 mt-4">
                      <Skeleton className="h-8 w-20 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination skeleton */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-20 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-20 rounded-md" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
