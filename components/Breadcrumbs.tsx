import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://supersafetycover.pk",
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 2,
        "name": item.label,
        ...(item.href ? { "item": `https://supersafetycover.pk${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <ol className="flex items-center space-x-2 text-xs text-brand-grey flex-wrap">
          <li className="flex items-center">
            <Link
              href="/"
              className="hover:text-olive transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center space-x-2">
                <ChevronRight className="w-3.5 h-3.5 text-brand-lightgrey shrink-0" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-olive transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-brand-black line-clamp-1" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
