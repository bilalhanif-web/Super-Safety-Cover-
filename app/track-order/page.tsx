"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Search, Package, CheckCircle2, Clock, Truck, ShieldCheck } from "lucide-react";

export default function TrackOrderPage() {
  const [orderQuery, setOrderQuery] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    // Simulated tracking
    setResult({
      id: orderQuery.toUpperCase().startsWith("SSC-") ? orderQuery.toUpperCase() : `SSC-${orderQuery}`,
      status: "In Transit with Courier",
      carrier: "Trax Express Logistics",
      trackingNumber: `TRX-${Math.floor(10000000 + Math.random() * 90000000)}`,
      destinationCity: "Pakistan",
      estimatedDelivery: "Within 2 - 3 business days",
      steps: [
        { title: "Order Confirmed & Verified", done: true, time: "Yesterday, 3:30 PM" },
        { title: "Packed at Warehouse & Quality Checked", done: true, time: "Yesterday, 5:45 PM" },
        { title: "Dispatched with Courier Partner", done: true, time: "Today, 10:00 AM" },
        { title: "Out for Doorstep Delivery", done: false, time: "Expected Tomorrow" },
      ],
    });
  };

  return (
    <div className="bg-white min-h-screen pb-16">
      <Breadcrumbs items={[{ label: "Track Order" }]} />

      <div className="bg-brand-offwhite border-y border-brand-lightgrey py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1.5 block">
            Shipment Status
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-2">
            Track Your Order
          </h1>
          <p className="text-sm sm:text-base text-brand-grey max-w-2xl leading-relaxed">
            Enter your Super Safety Cover Order Reference (e.g. SSC-123456) or the mobile phone number used during checkout.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleTrack} className="flex gap-2 max-w-xl mx-auto mb-10">
          <input
            type="text"
            required
            placeholder="Order ID (e.g. SSC-784123) or Mobile #"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            className="flex-1 px-4 py-3 rounded-md border border-brand-lightgrey text-xs sm:text-sm text-brand-black outline-none focus:border-olive"
          />
          <button
            type="submit"
            className="bg-olive text-white px-6 py-3 rounded-md text-xs sm:text-sm font-bold hover:bg-olive-hover transition-colors shrink-0 flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Track</span>
          </button>
        </form>

        {result && (
          <div className="bg-brand-offwhite p-6 sm:p-8 rounded-2xl border border-brand-lightgrey space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-lightgrey pb-4">
              <div>
                <span className="text-xs text-brand-grey block">Order Reference</span>
                <span className="text-base font-extrabold text-brand-black">{result.id}</span>
              </div>
              <div>
                <span className="text-xs text-brand-grey block">Courier Tracking #</span>
                <span className="text-sm font-bold text-olive">{result.trackingNumber}</span>
              </div>
              <div className="bg-olive-soft px-3 py-1 rounded-md text-xs font-bold text-olive">
                {result.status}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-black">
                Tracking History
              </h3>
              <div className="space-y-4 border-l-2 border-olive pl-4 ml-2">
                {result.steps.map((st: any, i: number) => (
                  <div key={i} className="relative">
                    <div
                      className={`absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full border-2 bg-white ${
                        st.done ? "border-olive bg-olive" : "border-brand-grey"
                      }`}
                    />
                    <h4 className="text-xs sm:text-sm font-bold text-brand-black">
                      {st.title}
                    </h4>
                    <span className="text-[11px] text-brand-grey">{st.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white border border-brand-lightgrey flex items-center justify-between text-xs text-brand-grey">
              <span>Payment: <strong>Cash on Delivery (COD)</strong></span>
              <a
                href="https://wa.me/923288985916"
                target="_blank"
                rel="noopener noreferrer"
                className="text-olive font-bold hover:underline"
              >
                Inquire on WhatsApp &rarr;
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
