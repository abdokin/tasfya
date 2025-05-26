import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الملف الشخصي | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
  description: "إدارة الملف الشخصي والمحتوى المفضل في الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
