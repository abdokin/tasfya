import Link from "next/link";

const socialLinks = [
  // {
  //   name: "Instagram",
  //   href: "https://instagram.com",
  //   icon: (
  //     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  //       <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
  //       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
  //       <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  //     </svg>
  //   ),
  // },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@mohammed-ramzan",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/Moh1Rz2H3",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
      </svg>
    ),
  },
  // {
  //   name: "Facebook",
  //   href: "https://facebook.com",
  //   icon: (
  //     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  //       <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  //     </svg>
  //   ),
  // }
];

export default function SocialLinks() {
  return (
    <div className="flex items-center justify-start space-x-4 space-x-reverse">
      {socialLinks.map((link) => (
        <Link key={link.name} href={link.href} className="text-gray-600 hover:text-gray-900">
          {link.icon}
          <span className="sr-only">{link.name}</span>
        </Link>
      ))}
    </div>
  );
}
