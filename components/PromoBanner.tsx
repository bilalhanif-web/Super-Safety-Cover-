import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Banknote, Truck, RotateCcw } from "lucide-react";

export const PromoBanner: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-[#E7E2D7] border-b border-[#D8D2C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl md:rounded-3xl border border-[#D8D2C5] shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Content (Left) */}
          <div className="p-7 sm:p-10 lg:p-12 lg:col-span-6 xl:col-span-5">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F3ED] border border-[#D8D2C5] text-xs font-semibold text-[#66743A] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#66743A]" />
              <span>SUPER SAFETY COVER</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight mb-3">
              Protection Made <span className="text-[#66743A]">Simple.</span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-brand-grey mb-7 leading-relaxed max-w-md">
              Durable everyday covers designed to protect what matters. Engineered for Pakistani heat, monsoon rain and everyday dust.
            </p>

            {/* CTA Button */}
            <div className="mb-6">
              <Link
                href="/car-covers"
                className="inline-flex items-center gap-2 bg-[#66743A] text-white px-7 py-3.5 rounded-md text-sm font-semibold hover:bg-[#566230] transition-colors shadow-sm active:scale-[0.98]"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-y-2.5 gap-x-4 sm:gap-x-6 pt-5 border-t border-[#D8D2C5]">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-black">
                <div className="w-5 h-5 rounded-full bg-[#F4F3ED] flex items-center justify-center shrink-0 text-[#66743A]">
                  <Banknote className="w-3.5 h-3.5" />
                </div>
                <span>Cash on Delivery</span>
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-black">
                <div className="w-5 h-5 rounded-full bg-[#F4F3ED] flex items-center justify-center shrink-0 text-[#66743A]">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <span>Nationwide Delivery</span>
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-black">
                <div className="w-5 h-5 rounded-full bg-[#F4F3ED] flex items-center justify-center shrink-0 text-[#66743A]">
                  <RotateCcw className="w-3.5 h-3.5" />
                </div>
                <span>Easy Exchange</span>
              </div>
            </div>
          </div>

          {/* Product Photography (Right) */}
          <div className="lg:col-span-6 xl:col-span-7 bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-[#D8D2C5]">
            <div className="relative w-full max-w-[460px] aspect-[4/5] mx-auto rounded-xl overflow-hidden flex items-center justify-center">
              <Image
                src="/images/promo/car-cover.webp"
                alt="Car Cover"
                fill
                priority
                quality={95}
                className="object-contain object-center transition-transform duration-500 ease-out hover:scale-[1.01]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
