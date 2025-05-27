"use client"

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import sheikh from "@/lib/data/sheikh";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export default function TwitterFeed({ username = sheikh.twitter }: { username?: string }) {
  const twitterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTwitterScript = () => {
      if (window.twttr) {
        window.twttr.widgets.load(twitterRef.current!);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => {
        window.twttr?.widgets?.load(twitterRef.current!);
      };
      document.body.appendChild(script);
    };

    loadTwitterScript();
  }, [username]);

  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-primary">تغريدات الشيخ</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 h-96 overflow-hidden">
        <div ref={twitterRef}>
          <a
            key={username} // 🔑 Triggers re-render if username changes
            className="twitter-timeline"
            data-lang="ar"
            data-height="350"
            data-theme="light"
            href={`https://twitter.com/${username}`}
          >
            تغريدات من {sheikh.name}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
