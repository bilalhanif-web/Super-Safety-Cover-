import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Information | Super Safety Cover",
  description: "Delivery timelines, courier services, and Cash on Delivery guidelines across Pakistan.",
};

export default function ShippingPage() {
  return (
    <div className="bg-white min-h-screen pb-16">
      <Breadcrumbs items={[{ label: "Shipping Information" }]} />

      <div className="bg-brand-offwhite border-y border-brand-lightgrey py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1.5 block">
            Nationwide Logistics
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-2">
            Shipping & Delivery Policy
          </h1>
          <p className="text-sm sm:text-base text-brand-grey max-w-2xl leading-relaxed">
            Reliable Cash on Delivery dispatch across all four provinces, Islamabad, Azad Kashmir, and Gilgit-Baltistan.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-sm text-brand-grey leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-5 rounded-xl bg-brand-offwhite border border-brand-lightgrey">
            <Truck className="w-6 h-6 text-olive mb-2" />
            <h3 className="font-bold text-brand-black mb-1">Standard Delivery</h3>
            <p className="text-xs text-brand-grey">2 - 4 business days for major metropolitan areas.</p>
          </div>
          <div className="p-5 rounded-xl bg-brand-offwhite border border-brand-lightgrey">
            <Clock className="w-6 h-6 text-olive mb-2" />
            <h3 className="font-bold text-brand-black mb-1">Order Dispatch</h3>
            <p className="text-xs text-brand-grey">Orders placed before 3:00 PM are processed same day.</p>
          </div>
          <div className="p-5 rounded-xl bg-brand-offwhite border border-brand-lightgrey">
            <ShieldCheck className="w-6 h-6 text-olive mb-2" />
            <h3 className="font-bold text-brand-black mb-1">Cash on Delivery</h3>
            <p className="text-xs text-brand-grey">Pay in cash directly to the courier upon delivery.</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-brand-black">Courier Partners</h2>
          <p>
            We partner with Pakistan’s leading logistics networks including <strong>TCS, Leopard Courier, and Trax Logistics</strong> to ensure your covers reach you securely and promptly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-brand-black">Shipping Charges</h2>
          <p>
            We charge a flat nominal delivery fee of <strong>Rs. 250</strong> per order across Pakistan. Any single order containing merchandise value exceeding <strong>Rs. 3,000 qualifies for Free Delivery</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-brand-black">Inspection & Receipt</h2>
          <p>
            You are welcome to visually inspect the courier package outer envelope before handing payment to the rider. In case of any sizing discrepancies, our 7-day exchange desk handles size swaps immediately.
          </p>
        </section>
      </div>
    </div>
  );
}
