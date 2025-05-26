import { Metadata } from "next";

export const metadata: Metadata = {
  title: "التواصل | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
  description: "تواصل مع فضيلة الشيخ محمد بن رمزان الهاجري عبر وسائل التواصل المختلفة أو عبر نموذج الاتصال",
  openGraph: {
    title: "التواصل | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
    description: "تواصل مع فضيلة الشيخ محمد بن رمزان الهاجري عبر وسائل التواصل المختلفة أو عبر نموذج الاتصال",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
