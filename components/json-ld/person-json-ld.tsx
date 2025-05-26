import { Person, WithContext } from "schema-dts";

export default function PersonJsonLd() {
  const jsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "الشيخ محمد بن رمزان الهاجري",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    "jobTitle": "عالم دين",
    "description": "فضيلة الشيخ محمد بن رمزان الهاجري - عالم دين وخطيب ومدرس علوم شرعية",
    "sameAs": [
      "https://twitter.com/sheikh_mohammad",
      "https://www.facebook.com/sheikh.mohammad",
      "https://www.youtube.com/c/SheikhMohammad"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
