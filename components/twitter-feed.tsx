"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import sheikh from "@/lib/data/sheikh";

export default function TwitterFeed({ username = sheikh.twitter }: { username?: string }) {
  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-primary">تغريدات الشيخ</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 h-96 overflow-y-auto">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={username}
          options={{ height: 350, lang: "ar" }}
          noHeader
          noBorders
          noFooter
          theme="light"
          placeholder={<p>جاري تحميل التغريدات...</p>}
        />
      </CardContent>
    </Card>
  );
}
