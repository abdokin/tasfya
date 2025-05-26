import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import PageSidebar from "@/components/page-sidebar"
import { getAllBenefits } from "@/lib/services/benefits-service";
import { BenefitCard } from "@/components/benefit-card";
import Pagination from "@/components/pagination";
import { SearchBar } from "@/components/search-bar";

interface BenefitsContentProps {
    query?: string;
    page?: string;
    category?: string;
    sort?: string;
}

export default async function BenefitsContent({
    query = '',
    page = '1',
    category = '',
    sort = 'created_at'
}: BenefitsContentProps) {
    const currentPage = Number(page) || 1;
    const { meta, benefits } = await getAllBenefits(currentPage, query, category);
    const totalPages = meta.total_pages;
    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-4">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/benifits">الفوائد</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Page Title with Stats */}
                        <div className="mb-8 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2 text-gray-900">الفوائد العلمية</h1>
                                    <p className="text-gray-600">فوائد علمية منتقاة من دروس ومحاضرات الشيخ</p>
                                </div>
                            </div>
                            <SearchBar categories={meta.categories} />
                        </div>

                        {/* Categories Tabs */}
                        <div className="mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {benefits.map((benefit) => (
                                    <BenefitCard key={benefit.id} benefit={benefit} />
                                ))}
                                {meta.total_items === 0 && (
                                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                                            <p className="text-gray-600">لا توجد نتائج مطابقة للبحث</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Pagination totalPages={totalPages} />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <PageSidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}