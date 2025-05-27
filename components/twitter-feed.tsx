"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";
import sheikh from "@/lib/data/sheikh";

declare global {
  interface Window {
    twttr: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
      ready: (callback: Function) => void;
      _e: Function[];
    };
  }
}

export default function TwitterFeed({ username = sheikh.twitter }: { username?: string }) {
  const twitterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use the recommended Twitter widget initialization pattern
    window.twttr = window.twttr || {};
    window.twttr._e = window.twttr._e || [];
    
    if (!document.getElementById("twitter-wjs")) {
      const script = document.createElement("script");
      script.id = "twitter-wjs";
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.head.appendChild(script);
    }
    
    // Queue the widget load function
    window.twttr.ready = window.twttr.ready || function(f: Function) {
      window.twttr._e.push(f);
    };
    
    window.twttr.ready(() => {
      if (twitterRef.current && window.twttr?.widgets) {
        window.twttr.widgets.load(twitterRef.current);
      }
    });
    
    return () => {
      const script = document.getElementById("twitter-wjs");
      if (script) {
        script.remove();
      }
    };
  }, [username]);

  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-primary">تغريدات الشيخ</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 h-96 overflow-hidden">
        <div ref={twitterRef}>
          <Link
            className="twitter-timeline" 
            data-lang="ar"
            data-height="350"
            data-theme="light"
            href={`https://x.com/${username}`}
          >
            تغريدات من {sheikh.name}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
