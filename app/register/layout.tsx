import { Metadata } from "next";

export const metadata: Metadata = {
  title: "التسجيل | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
  description: "صفحة التسجيل في الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
