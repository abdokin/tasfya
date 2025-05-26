import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المفضلة | موقع فضيلة الشيخ محمد بن رمزان الهاجري",
  description: "المحتوى المحفوظ في المفضلة من دروس ومحاضرات وكتب ومقالات",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
