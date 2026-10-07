import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data";
import { ProductCard } from "./ProductCard";

// The 8 main products requested in order:
// 1. Bike Cover
// 2. Car Cover
// 3. AC Cover
// 4. Washing Machine Cover
// 5. Rain Dress
// 6. Mattress Cover
// 7. Fan Cover
// 8. Air Cooler Cover
const BEST_SELLER_SLUGS = [
  "bike-cover",
  "car-cover",
  "ac-cover",
  "washing-machine-cover",
  "rain-dress",
  "mattress-cover",
  "fan-cover",
  "air-cooler-cover",
];

export const BestSellersSection: React.FC = () => {
  const bestSellers = BEST_SELLER_SLUGS.map((slug) =>
    PRODUCTS.find(
      (p) =>
        p.slug === slug ||
        (slug === "car-cover" && p.slug === "premium-car-cover") ||
        (slug === "ac-cover" && (p.slug === "ac-cover" || p.slug === "ac-protective-cover"))
    )
  ).filter(Boolean) as typeof PRODUCTS;

  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#D8D2C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1.5 block">
              Proven Protection
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight">
              Best Sellers
            </h2>
            <p className="text-sm text-brand-grey mt-1">
              Our highest rated, customer-tested protective covers across Pakistan.
            </p>
          </div>
          <Link
            href="/best-sellers"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-olive hover:underline shrink-0"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid:
            Desktop: 4 cards in 1st row, 3 cards in 2nd row (centered)
            Tablet: 2-3 cards per row
            Mobile: 2 cards per row
        */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="w-full min-[360px]:w-[calc(50%-8px)] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] flex"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
