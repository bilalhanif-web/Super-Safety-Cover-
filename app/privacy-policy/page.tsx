import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | Super Safety Cover",
  description: "Privacy policy and data protection principles for Super Safety Cover.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen pb-16">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <div className="bg-brand-offwhite border-y border-brand-lightgrey py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-brand-grey max-w-2xl">
            We value your trust and are committed to protecting your personal information.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-sm text-brand-grey leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-black">Information We Collect</h2>
          <p>
            When placing a Cash on Delivery order with Super Safety Cover, we collect your full name, mobile contact number, shipping destination city, and physical address strictly for courier dispatch and delivery verification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-black">Use of Your Data</h2>
          <p>
            Your information is exclusively utilized to process, pack, and transport your order through trusted third-party courier services (TCS, Leopard, Trax). We never sell, rent, or trade your personal telephone numbers or addresses to third-party telemarketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-black">Security & WhatsApp Communication</h2>
          <p>
            Order tracking updates and dispatch alerts are shared with you via SMS and official WhatsApp business channels for your real-time convenience.
          </p>
        </section>
      </div>
    </div>
  );
}
