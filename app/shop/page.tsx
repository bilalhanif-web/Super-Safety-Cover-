import { Metadata } from "next";
import { PRODUCTS, CATEGORIES } from "@/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Shop All Protective Covers | Super Safety Cover Pakistan",
  description: "Browse all motorcycle covers, car covers, AC covers, washing machine covers, and 2-piece rain dresses with Cash on Delivery in Pakistan.",
};

export default function ShopPage() {
  return (
    <div className="bg-white min-h-screen pb-16">
      <Breadcrumbs items={[{ label: "Shop All" }]} />

      <div className="bg-brand-offwhite border-y border-brand-lightgrey py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1.5 block">
            Complete Inventory
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-2">
            All Protective Covers & Gear
          </h1>
          <p className="text-sm sm:text-base text-brand-grey max-w-2xl leading-relaxed">
            Practical, weather-tested protection for your motorcycles, vehicles, household machines, and monsoon riding essentials.
          </p>
        </div>
      </div>

      {/* Quick Category Chips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap gap-2 pb-6 border-b border-brand-lightgrey">
          <span className="text-xs font-bold text-brand-grey self-center mr-2">Categories:</span>
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/${c.slug}`}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-offwhite hover:bg-olive hover:text-white border border-brand-lightgrey transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
