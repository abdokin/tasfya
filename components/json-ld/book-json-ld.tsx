import { Book, WithContext } from "schema-dts";

interface BookJsonLdProps {
  title: string;
  author: string;
  datePublished: string;
  description: string;
  url: string;
  imageUrl?: string;
  isbn?: string;
  publisher?: string;
}

export default function BookJsonLd({
  title,
  author,
  datePublished,
  description,
  url,
  imageUrl,
  isbn,
  publisher
}: BookJsonLdProps) {
  const jsonLd: WithContext<Book> = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": title,
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": datePublished,
    "description": description,
    "url": url,
    "inLanguage": "ar"
  };

  if (imageUrl) {
    jsonLd.image = imageUrl;
  }

  if (isbn) {
    jsonLd.isbn = isbn;
  }

  if (publisher) {
    jsonLd.publisher = {
      "@type": "Organization",
      "name": publisher
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
