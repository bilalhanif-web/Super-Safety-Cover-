import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const SecondPromo: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#D8D2C5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image (Left) */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[460px] aspect-[4/5] mx-auto rounded-xl overflow-hidden bg-[#E7E2D7] border border-[#D8D2C5] shadow-xs flex items-center justify-center">
              <Image
                src="/images/promo/machine-cover.webp"
                alt="Washing Machine Cover"
                fill
                priority
                quality={95}
                className="object-contain object-center transition-transform duration-500 ease-out hover:scale-[1.01]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Content (Right) */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-wider text-olive mb-2 block">
              Everyday Reliability
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-4">
              Made for Everyday Protection.
            </h2>

            <p className="text-sm sm:text-base text-brand-grey mb-8 leading-relaxed">
              From your bike to your household essentials, keep everyday items cleaner and better protected. We design practical, durable covers that save you from costly appliance repairs, fading bike paint, and seasonal rain damage.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-brand-black">
                <CheckCircle2 className="w-5 h-5 text-olive shrink-0" />
                <span>Heavy-duty fabrics chosen specifically for Pakistani weather</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-brand-black">
                <CheckCircle2 className="w-5 h-5 text-olive shrink-0" />
                <span>Precision tailored measurements for appliances and motorcycles</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-brand-black">
                <CheckCircle2 className="w-5 h-5 text-olive shrink-0" />
                <span>Fast Cash on Delivery with transparent tracking</span>
              </div>
            </div>

            <Link
              href="/bike-covers"
              className="inline-flex items-center gap-2 bg-olive text-white px-7 py-3.5 rounded-md text-sm font-semibold hover:bg-olive-hover transition-colors shadow-sm"
            >
              <span>Shop Covers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
