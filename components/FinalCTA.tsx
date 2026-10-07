import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#121212] border-b border-[#222222] text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] text-xs font-semibold text-[#66743A] mb-4 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#66743A]" />
          <span>Protection Made Simple</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F4F3ED] tracking-tight mb-4">
          Keep It Covered. Keep It Protected.
        </h2>

        <p className="text-base sm:text-lg text-[#F4F3ED]/75 mb-8 max-w-xl mx-auto">
          Find the right protection for your everyday essentials. Cash on Delivery nationwide with prompt support.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/best-sellers"
            className="inline-flex items-center gap-2 bg-[#66743A] text-white px-8 py-4 rounded-md text-sm sm:text-base font-bold hover:bg-[#566230] transition-colors shadow-sm"
          >
            <span>Shop All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/bike-covers"
            className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#F4F3ED] border border-[#333333] px-7 py-4 rounded-md text-sm sm:text-base font-bold hover:text-[#66743A] hover:border-[#66743A] transition-colors"
          >
            <span>Explore Bike Covers</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
