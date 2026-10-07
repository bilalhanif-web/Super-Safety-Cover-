import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RotateCcw, CheckCircle2, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Returns & Exchanges | Super Safety Cover",
  description: "7-day hassle free return and exchange policy for protective covers in Pakistan.",
};

export default function ReturnsPage() {
  return (
    <div className="bg-white min-h-screen pb-16">
      <Breadcrumbs items={[{ label: "Returns & Exchanges" }]} />

      <div className="bg-brand-offwhite border-y border-brand-lightgrey py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1.5 block">
            Customer Satisfaction Guarantee
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-2">
            Returns & Exchanges Policy
          </h1>
          <p className="text-sm sm:text-base text-brand-grey max-w-2xl leading-relaxed">
            We want you to have 100% peace of mind with the fit, finish, and durability of your Super Safety Cover.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-sm text-brand-grey leading-relaxed">
        <div className="p-6 rounded-xl bg-olive-soft border border-olive/30 flex items-start gap-4">
          <RotateCcw className="w-8 h-8 text-olive shrink-0 mt-1" />
          <div>
            <h2 className="text-base font-bold text-brand-black mb-1">
              7-Day Hassle-Free Exchange Window
            </h2>
            <p className="text-xs sm:text-sm text-brand-grey">
              If your bike model cover doesn’t fit exactly as promised, or you ordered the wrong size for your washing machine or mattress, we will replace it with the correct size at zero extra hassle.
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-brand-black">Exchange Process:</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-olive shrink-0 mt-0.5" />
              <span>Contact us on WhatsApp at <a href="https://wa.me/923288985916" target="_blank" rel="noopener noreferrer" className="text-olive hover:underline font-bold">+92 328 8985916</a> with your Order ID.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-olive shrink-0 mt-0.5" />
              <span>Share a quick photo of the cover on your motorcycle or appliance.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-olive shrink-0 mt-0.5" />
              <span>Our team arranges a reverse pickup or courier swap directly at your doorstep.</span>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-brand-black">Conditions for Return:</h3>
          <p>
            Items must be in original condition, unwashed, and free of grease or oil stains. Please retain the original zip pouch packaging.
          </p>
        </section>

        <div className="pt-4">
          <a
            href="https://wa.me/923288985916?text=Hi%20Super%20Safety%20Cover,%20I%20would%20like%20to%20request%20an%20exchange."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-olive text-white px-6 py-3 rounded-md text-xs sm:text-sm font-bold hover:bg-olive-hover transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp for Quick Exchange</span>
          </a>
        </div>
      </div>
    </div>
  );
}
