import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">المحاضرة غير موجودة</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        عذراً، المحاضرة التي تبحث عنها غير موجودة أو ربما تم نقلها
      </p>
      <Button asChild>
        <Link 
          href="/lectures"
          className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
        >
          العودة إلى صفحة المحاضرات
        </Link>
      </Button>
    </div>
  );
}
