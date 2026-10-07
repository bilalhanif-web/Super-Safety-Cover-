import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms & Conditions | Super Safety Cover",
  description: "Terms and conditions of sale, Cash on Delivery, and return terms for Super Safety Cover.",
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen pb-16">
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />

      <div className="bg-brand-offwhite border-y border-brand-lightgrey py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-2">
            Terms & Conditions
          </h1>
          <p className="text-sm text-brand-grey max-w-2xl">
            Guidelines and customer commitments governing purchases at Super Safety Cover.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-sm text-brand-grey leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-black">1. Cash on Delivery Orders</h2>
          <p>
            By placing an order via our Cash on Delivery checkout, you enter into a purchase agreement to receive the parcel and remit payment in Pakistani Rupees (PKR) to the courier rider upon delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-black">2. Product Specifications & Compatibility</h2>
          <p>
            We strive to provide accurate compatibility information for all bike models (Honda, Yamaha, Suzuki), air conditioners, washing machines, and beds. If you receive an incorrectly sized item, our 7-day exchange warranty covers full replacement.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-black">3. Governing Law</h2>
          <p>
            These terms are governed by the laws and e-commerce consumer guidelines of the Islamic Republic of Pakistan.
          </p>
        </section>
      </div>
    </div>
  );
}
