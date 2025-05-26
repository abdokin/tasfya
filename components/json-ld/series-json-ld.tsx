import { ItemList, WithContext } from "schema-dts";

interface SeriesJsonLdProps {
  title: string;
  description: string;
  url: string;
  lessons: {
    id: string;
    title: string;
    url: string;
  }[];
}

export default function SeriesJsonLd({
  title,
  description,
  url,
  lessons
}: SeriesJsonLdProps) {
  const jsonLd: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": title,
    "description": description,
    "itemListElement": lessons.map((lesson, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "AudioObject",
        "name": lesson.title,
        "url": lesson.url
      }
    })),
    "numberOfItems": lessons.length,
    "url": url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
