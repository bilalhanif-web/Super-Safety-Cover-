import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShieldCheck, Droplets, CheckCircle2, Truck, Award } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Super Safety Cover Pakistan",
  description: "Learn about Super Safety Cover - Pakistan's dedicated protective covers and rain dress brand. Protection Made Simple.",
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-16">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      {/* Hero Banner */}
      <div className="bg-brand-offwhite border-y border-brand-lightgrey py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-olive mb-2 block">
              Our Story & Purpose
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight mb-4">
              Protection Made Simple.
            </h1>
            <p className="text-base sm:text-lg text-brand-grey leading-relaxed">
              Super Safety Cover was born out of a simple necessity: Pakistani vehicles, machines, and homes face extreme weather — searing summer heat, heavy monsoon downpours, and relentless dust. Generic marketplace covers tear easily, fade fast, or trap heat. We set out to engineer durable, tailored covers built to last.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-brand-grey leading-relaxed">
            <h2 className="text-2xl font-bold text-brand-black tracking-tight">
              Designed for Everyday Pakistani Realities
            </h2>
            <p>
              Whether you ride a <strong className="text-brand-black">Honda CD 70</strong>, <strong className="text-brand-black">CG 125</strong>, or <strong className="text-brand-black">Yamaha YBR 125</strong>, your motorcycle deserves a cover that won&apos;t blow away in high winds or scratch your petrol tank paint.
            </p>
            <p>
              From custom-fit bike covers and 2-piece biker rain dresses to automatic washing machine and split AC covers, every product in our catalog uses heavy-gauge, water-repellent ripstop parachute fabric with double-needle heat-taped seams.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-brand-black font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                <span>Locally calibrated sizing & fit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                <span>Heavy-duty windproof buckles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                <span>Cash on Delivery across Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                <span>7-Day hassle-free exchange</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-brand-offwhite p-8 rounded-2xl border border-brand-lightgrey space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-brand-lightgrey">
              <div className="w-12 h-12 rounded-xl bg-white border border-brand-lightgrey flex items-center justify-center text-olive">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-brand-black">Premium Craftsmanship</h3>
                <span className="text-xs text-brand-grey">Manufactured in Pakistan</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-brand-grey">
              <p>
                We do not compromise on fabric density. While cheap market alternatives use lightweight plastic that crumbles after 2 months in the sun, our 210D and 300D coated fabrics offer prolonged UV stability.
              </p>
              <div className="p-4 rounded-lg bg-white border border-brand-lightgrey flex items-center justify-between">
                <span className="text-xs font-bold text-brand-black">Delivery Promise</span>
                <span className="text-xs text-olive font-bold">2 - 4 Days Nationwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-brand-lightgrey">
          <div className="p-6 rounded-xl bg-brand-offwhite border border-brand-lightgrey">
            <ShieldCheck className="w-8 h-8 text-olive mb-3" />
            <h3 className="text-base font-bold text-brand-black mb-2">Practical Protection</h3>
            <p className="text-xs sm:text-sm text-brand-grey leading-relaxed">
              Every design feature solves a real problem: mirror cutouts, under-belly wind clips, and zipper access flaps so covers work seamlessly.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-brand-offwhite border border-brand-lightgrey">
            <Droplets className="w-8 h-8 text-olive mb-3" />
            <h3 className="text-base font-bold text-brand-black mb-2">All-Weather Durability</h3>
            <p className="text-xs sm:text-sm text-brand-grey leading-relaxed">
              Engineered to repel rain, block dust, and minimize paint oxidation from harsh Pakistani solar rays.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-brand-offwhite border border-brand-lightgrey">
            <Truck className="w-8 h-8 text-olive mb-3" />
            <h3 className="text-base font-bold text-brand-black mb-2">Cash on Delivery</h3>
            <p className="text-xs sm:text-sm text-brand-grey leading-relaxed">
              Reliable doorstep delivery in every city, town, and district in Pakistan. Pay only when your parcel arrives.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-olive text-white px-8 py-3.5 rounded-md text-sm font-bold hover:bg-olive-hover transition-colors shadow-sm"
          >
            Explore All Protective Covers
          </Link>
        </div>
      </div>
    </div>
  );
}
