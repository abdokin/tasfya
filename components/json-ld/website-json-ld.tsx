import { WebSite, WithContext } from "schema-dts";

export default function WebsiteJsonLd() {
  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "موقع فضيلة الشيخ محمد بن رمزان الهاجري",
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "description": "الموقع الرسمي لفضيلة الشيخ محمد بن رمزان الهاجري - يحتوي على دروس ومحاضرات وفتاوى وكتب ومقالات متنوعة",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`
      },
    },
    "inLanguage": "ar"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
