import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Mail, Phone } from "lucide-react"
import Image from "next/image"
import SocialLinks from "@/components/social-links"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import sheikh from "@/lib/data/sheikh"
import publications from "@/lib/data/publications"
import activities from "@/lib/data/activities"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/about">مع الشيخ</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">مع الشيخ</h1>
        <p className="text-gray-600">تعرف على الشيخ وسيرته ونشاطاته العلمية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile */}
        <div className="md:col-span-1">
          <Card className="border-gray-100 shadow-sm overflow-hidden">
            <div className="relative w-full h-48">
              <Image
                src={sheikh.image}
                alt="صورة الشيخ"
                fill
                className="object-fit"
              />
            </div>
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">{sheikh.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{sheikh.bio[0]}</p>
              <hr className="my-4" />
              <div className="space-y-3 text-sm text-right">
                <div className="flex items-center justify-between gap-2">
                  <span>{sheikh.location}</span>
                  <MapPin className="size-4 text-gray-500" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>{sheikh.birth}</span>
                  <Calendar className="size-4 text-gray-500" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>{sheikh.email}</span>
                  <Mail className="size-4 text-gray-500" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>{sheikh.phone}</span>
                  <Phone className="size-4 text-gray-500" />
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-center">
                <SocialLinks />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="bio" dir="rtl">
            <TabsList className="border rounded-lg p-1 mb-6 w-fit mx-auto">
              <TabsTrigger value="bio" className="rounded-md px-6">السيرة الذاتية</TabsTrigger>
              <TabsTrigger value="publications" className="rounded-md px-6">المؤلفات</TabsTrigger>
              <TabsTrigger value="activities" className="rounded-md px-6">النشاطات</TabsTrigger>
            </TabsList>

            <TabsContent value="bio">
              <Card className="border-gray-100 shadow-sm">
                <CardContent className="p-6 space-y-4 text-gray-700">
                  {sheikh.bio.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="publications">
              <Card className="border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {publications.list.map((title, idx) => (
                      <li key={idx}>{title}</li>
                    ))}
                  </ul>
                  <Button className="mt-4">
                    <Link href="/books">
                      <span className="flex items-center">
                        تصفح جميع مؤلفات الشيخ
                      </span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities">
              <Card className="border-gray-100 shadow-sm">
                <CardContent className="p-6 space-y-4 text-gray-700">
                  {activities.items.map((item, idx) => (
                    <p key={idx}>{item}</p>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
