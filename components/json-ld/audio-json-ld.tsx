import { AudioObject, WithContext } from "schema-dts";

interface AudioJsonLdProps {
  name: string;
  description: string;
  contentUrl: string;
  uploadDate: string;
  duration: string;
  thumbnailUrl?: string;
  author: string;
}

export default function AudioJsonLd({
  name,
  description,
  contentUrl,
  uploadDate,
  duration,
  thumbnailUrl,
  author
}: AudioJsonLdProps) {
  const jsonLd: WithContext<AudioObject> = {
    "@context": "https://schema.org",
    "@type": "AudioObject",
    "name": name,
    "description": description,
    "contentUrl": contentUrl,
    "uploadDate": uploadDate,
    "duration": duration,
    "encodingFormat": "audio/mpeg",
    "creator": {
      "@type": "Person",
      "name": author
    },
    "inLanguage": "ar"
  };

  if (thumbnailUrl) {
    jsonLd.thumbnailUrl = thumbnailUrl;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
