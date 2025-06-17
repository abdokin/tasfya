import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Mail, Phone } from "lucide-react"
import Image from "next/image"
import SocialLinks from "@/components/social-links"
import sheikh from "@/lib/data/sheikh"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "عن الشيخ | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
  description: "تعرف على السيرة الذاتية للشيخ محمد بن رمزان الهاجري ونبذة عن حياته ومؤلفاته ونشاطاته العلمية",
  openGraph: {
    title: "عن الشيخ | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
    description: "تعرف على السيرة الذاتية للشيخ محمد بن رمزان الهاجري ونبذة عن حياته ومؤلفاته ونشاطاته العلمية",
    type: "profile",
  },
}

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
              <p className="text-gray-600 text-sm mb-4">{sheikh.bio.split('\n')[0]}</p>
          
              <hr className="my-4" />
              <div className="space-y-3 text-sm text-right">
                <div className="flex items-center justify-between gap-2">
                  <span>{sheikh.location}</span>
                  <MapPin className="size-4 text-gray-500" />
                </div>
              </div>
              <div className="space-y-3 text-sm text-right mt-2">
                <div className="flex items-center justify-between gap-2">
                  <span>{sheikh.birthYear} هـ</span>
                  <Calendar className="size-4 text-gray-500" />
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-center">
                <SocialLinks />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bio Content */}
        <div className="md:col-span-2">
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="p-6 space-y-4 text-gray-700 whitespace-pre-line">
              {sheikh.bio}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
