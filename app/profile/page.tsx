"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  User as UserIcon,
  Mail,
  Calendar,
  BookOpen,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext"
import { resourceUrl } from "@/lib/utils"
import { useState } from "react"
import { User } from "@/types"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const getUserInitials = (user: User) => {
    if (!user.name) return user.email[0].toUpperCase()
    return user.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/profile">الملف الشخصي</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {isLoading && (
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">جارٍ تحميل البيانات...</h1>
          </div>
        )}

        {user && (
          <>
            {/* Profile Card */}
            <div className="mb-8 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Avatar className="size-24">
                  <AvatarImage src={resourceUrl(user.avatar_url)} />
                  <AvatarFallback className="text-2xl">
                    {getUserInitials(user)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    {user.name || "المستخدم"}
                  </h1>
                  <div className="text-gray-600 flex items-center gap-1">
                    <Mail className="size-4" />
                    <span>{user.email}</span>
                  </div>
                  {user.created_at && (
                    <div className="text-gray-600 flex items-center gap-1 mt-1">
                      <Calendar className="size-4" />
                      <span>
                        تاريخ الانضمام:{" "}
                        {new Date(user.created_at).toLocaleDateString("ar-SA")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="border rounded-lg p-1 mb-6 w-fit">
                    <TabsTrigger value="account" className="rounded-md px-6">
                      معلومات الحساب
                    </TabsTrigger>
                    <TabsTrigger value="activities" className="rounded-md px-6">
                      الأنشطة
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="rounded-md px-6">
                      الإعدادات
                    </TabsTrigger>
                  </TabsList>

                  {/* Account Tab */}
                  <TabsContent value="account">
                    <Card className="border-gray-100 shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-xl">معلومات الحساب</CardTitle>
                        <Button
                          variant={isEditing ? "default" : "outline"}
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          {isEditing ? "حفظ التغييرات" : "تعديل المعلومات"}
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <form className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">الاسم الكامل</Label>
                            <Input
                              id="name"
                              defaultValue={user.name}
                              disabled={!isEditing}
                              placeholder="الاسم الكامل"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <Input
                              id="email"
                              defaultValue={user.email}
                              disabled={!isEditing}
                              placeholder="البريد الإلكتروني"
                              dir="ltr"
                            />
                          </div>

                          {isEditing && (
                            <div className="pt-4">
                              <h4 className="font-medium mb-2">تغيير كلمة المرور</h4>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                                  <Input id="current-password" type="password" dir="ltr" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                                  <Input id="new-password" type="password" dir="ltr" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                                  <Input id="confirm-password" type="password" dir="ltr" />
                                </div>
                              </div>
                            </div>
                          )}
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Activities Tab */}
                  <TabsContent value="activities">
                    <Card className="border-gray-100 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-xl">أنشطتك الأخيرة</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8 text-gray-500">
                          لا توجد أنشطة حديثة
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Settings Tab */}
                  <TabsContent value="settings">
                    <Card className="border-gray-100 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-xl">إعدادات الحساب</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">إشعارات البريد الإلكتروني</h4>
                              <p className="text-sm text-gray-500">
                                استلام إشعارات عبر البريد الإلكتروني
                              </p>
                            </div>
                            <Button variant="outline">تعطيل</Button>
                          </div>
                          <hr />
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-red-500">حذف الحساب</h4>
                              <p className="text-sm text-gray-500">
                                حذف الحساب نهائياً وجميع البيانات المرتبطة به
                              </p>
                            </div>
                            <Button variant="destructive">حذف</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-primary">إحصائيات الحساب</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <span className="block text-2xl font-bold text-primary">0</span>
                          <span className="text-xs text-gray-600">تعليق</span>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <span className="block text-2xl font-bold text-primary">0</span>
                          <span className="text-xs text-gray-600">محتوى محفوظ</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-primary">روابط سريعة</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href="/bookmarks">
                            <BookOpen className="ml-2 size-4" />
                            المحتوى المحفوظ
                          </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href="/comments">
                            <UserIcon className="ml-2 size-4" />
                            تعليقاتي
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
