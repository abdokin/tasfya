import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function BenefitDetailSkeleton() {
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
              <Skeleton className="h-4 w-20" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="overflow-hidden border-0 shadow-md">
            {/* Thumbnail skeleton */}
            <div className="relative h-48 md:h-64 bg-gray-200">
              <Skeleton className="h-full w-full" />
              {/* Audio player button skeleton */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="h-14 w-14 rounded-full" />
              </div>
            </div>

            <CardContent className="p-6">
              {/* Category badges skeleton */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16 rounded" />
                  <Skeleton className="h-5 w-24 rounded" />
                </div>
              </div>

              {/* Title skeleton */}
              <Skeleton className="h-8 w-3/4 mb-4" />

              {/* Metadata skeleton */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>

              {/* Description skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* Content skeleton */}
              <div className="mt-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>

              {/* Actions skeleton */}
              <div className="mt-8">
                <Skeleton className="h-9 w-32" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar skeleton */}
        <div className="md:col-span-1">
          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}