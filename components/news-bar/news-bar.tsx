"use client";

import { useState, useEffect } from "react";
import { Megaphone } from "lucide-react";
import Link from "next/link";
import { News } from "@/lib/services/news-service";

interface NewsBarProps {
  duration?: number;       // ms between news changes
  transitionTime?: number; // ms fade transition
  news: News[];
}

export function NewsBar({
  duration = 4000,
  transitionTime = 600,
  news = [],
}: NewsBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (news.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, duration);

    return () => clearInterval(intervalId);
  }, [news.length, duration]);

  const currentNews = news[currentIndex];

  if (!currentNews) return null;

  return (
    <div className="bg-primary text-white py-2 text-right overflow-hidden">
      <div className="container mx-auto px-4 flex items-center gap-4">
        <Link href={"/news"} className="flex items-center gap-2 flex-shrink-0">
          <Megaphone className="h-4 w-4" />
          <span className="text-sm font-medium">أخر الأخبار</span>
        </Link>

        <div className="relative w-full h-6 overflow-hidden" aria-live="polite">
          {news.map((item, idx) => (
            <div
              key={item.id}
              className="absolute inset-0 px-4 whitespace-nowrap transition-opacity text-right"
              style={{
                opacity: idx === currentIndex ? 1 : 0,
                transition: `opacity ${transitionTime}ms ease-in-out`,
              }}
            >
              <Link href={`/news/${item.slug}`} className="hover:underline">
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsBar;
