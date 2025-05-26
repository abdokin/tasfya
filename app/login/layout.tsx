import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
  description: "صفحة تسجيل الدخول للموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
