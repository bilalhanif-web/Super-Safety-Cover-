import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data";
import { ProductCard } from "./ProductCard";

export const NewArrivalsSection: React.FC = () => {
  // Products that are new or featured
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival || p.badge === "New Arrival" || p.category === "rain-dress").slice(0, 8);

  return (
    <section className="py-16 md:py-20 bg-white border-b border-brand-lightgrey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1.5 block">
              Just Added
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight">
              New Arrivals
            </h2>
            <p className="text-sm text-brand-grey mt-1">
              Explore our latest protective upgrades and 2-piece rain dress editions.
            </p>
          </div>
          <Link
            href="/new-arrivals"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-olive hover:underline shrink-0"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
