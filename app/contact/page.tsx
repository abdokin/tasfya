"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContactFormSchema, ContactFormType } from "@/lib/validations/contact"
import contact from "@/lib/data/contacts"
import { submitContact } from "@/lib/services/contact-service"

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<ContactFormType>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormType) => {
    setLoading(true);
    setSubmitError(null);
    
    try {
      await submitContact(data);
      setSuccess(true);
      reset();
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setSubmitError("حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };
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

          {success ? (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
              <h3 className="font-bold text-lg">تم إرسال الرسالة بنجاح!</h3>
              <p>سيتم الرد عليك في أقرب وقت ممكن.</p>
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => setSuccess(false)}
              >
                إرسال رسالة أخرى
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              {submitError && (
                <div className="p-3 bg-red-100 text-red-800 rounded-md">
                  {submitError}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">الاسم</label>
                <input 
                  type="text"
                  className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : ''}`}
                  placeholder={contact.form.namePlaceholder}
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                <input 
                  type="email"
                  className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : ''}`}
                  placeholder={contact.form.emailPlaceholder}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">الموضوع</label>
                <input 
                  type="text"
                  className={`w-full p-2 border rounded-md ${errors.subject ? 'border-red-500' : ''}`}
                  placeholder={contact.form.subjectPlaceholder}
                  {...register('subject')}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">الرسالة</label>
                <textarea 
                  className={`w-full p-2 border rounded-md ${errors.message ? 'border-red-500' : ''}`}
                  rows={4} 
                  placeholder={contact.form.messagePlaceholder}
                  {...register('message')}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              <div>
                <Button 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'جاري الإرسال...' : contact.form.buttonText}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
