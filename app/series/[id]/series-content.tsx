"use server";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSeriesById } from "@/lib/services/series-service";
import PageSidebar from "@/components/page-sidebar";
import { formatDate } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import { LessonsList } from "@/components/lessons-list";
import { notFound } from "next/navigation";

export default async function SeriesDetailPage({ id }: { id: string }) {
    const series = await getSeriesById(id);
    if (!series) {
        notFound();
    }
    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <Breadcrumb className="mb-4" dir="rtl">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/series">المكتبة العلمية</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/series/${series.id}`}>{series.title}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        <Card className="mb-8 border-gray-100 shadow-sm">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col md:flex-row justify-between gap-2">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900">{series.title}</h1>
                                            <div className="mt-2 flex items-center gap-2">
                                                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                                    {series.category}
                                                </Badge>
                                                <div className="text-sm text-gray-600 flex items-center gap-1">
                                                    <BookOpen className="h-4 w-4" />
                                                    <span>{series.lessons_count} دروس</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {formatDate(new Date(series.published_date))}
                                        </div>
                                    </div>
                                    <div className="prose max-w-none text-gray-700">
                                        <p>{series.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">دروس السلسلة</h2>
                        <Card className="border-gray-100 shadow-sm">
                            <CardContent className="p-4">
                                <div className="relative overflow-hidden rounded-lg">
                                    {series.lessons && series.lessons.length > 0 ? (
                                        <LessonsList lessons={series.lessons} order={true} />
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">لا توجد دروس متاحة في هذه السلسلة.</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-1">
                        <PageSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}