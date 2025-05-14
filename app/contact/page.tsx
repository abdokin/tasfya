import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import contact from "@/lib/data/contacts"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/contact">التواصل</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">تواصل مع الشيخ</h1>
        <p className="text-gray-600">يمكنكم التواصل من خلال الوسائل التالية أو عبر النموذج أدناه</p>
      </div>

      <Card className="border-gray-100 shadow-sm max-w-4xl">
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">البريد الإلكتروني</h4>
              <p className="flex items-center text-sm gap-1">
                <Mail className="size-4" />
                {contact.email}
              </p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">الهاتف</h4>
              <p className="flex items-center text-sm gap-1">
                <Phone className="size-4" />
                {contact.phone}
              </p>
            </div>
          </div>

          <form className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">الاسم</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder={contact.form.namePlaceholder} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
              <input type="email" className="w-full p-2 border rounded-md" placeholder={contact.form.emailPlaceholder} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الموضوع</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder={contact.form.subjectPlaceholder} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الرسالة</label>
              <textarea className="w-full p-2 border rounded-md" rows={4} placeholder={contact.form.messagePlaceholder}></textarea>
            </div>
            <div>
              <Button>
                {contact.form.buttonText}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
