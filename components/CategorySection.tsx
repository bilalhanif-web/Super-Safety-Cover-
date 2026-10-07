import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data";

export const CategorySection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-brand-lightgrey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-3">
            Shop by Category
          </h2>
          <p className="text-sm sm:text-base text-brand-grey">
            Find the right protection for your everyday essentials.
          </p>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group flex flex-col bg-brand-offwhite rounded-lg border border-brand-lightgrey overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-olive/40 hover:shadow-md"
            >
              {/* Image Box */}
              <div className="relative aspect-square w-full bg-brand-offwhite overflow-hidden border-b border-brand-lightgrey">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>

              {/* Title & Arrow */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-brand-black group-hover:text-olive transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-brand-grey">
                    {cat.itemCount} items
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-brand-lightgrey flex items-center justify-center text-brand-grey group-hover:text-olive group-hover:border-olive transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
