"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Truck,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    province: "Punjab",
    city: "",
    address: "",
    orderNotes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");
  const [placedOrderSummary, setPlacedOrderSummary] = useState<any>(null);

  const shipping = subtotal > 3000 ? 0 : 250;
  const total = subtotal + shipping;

  const provinces = [
    "Punjab",
    "Sindh",
    "Khyber Pakhtunkhwa",
    "Balochistan",
    "Islamabad Capital Territory",
    "Azad Kashmir",
    "Gilgit-Baltistan",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const generatedId = `SSC-${Math.floor(100000 + Math.random() * 900000)}`;
      setPlacedOrderId(generatedId);
      setPlacedOrderSummary({
        orderId: generatedId,
        customer: formData,
        items: [...cart],
        subtotal,
        shipping,
        total,
        date: new Date().toLocaleDateString("en-PK", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      });
      clearCart();
      setIsSubmitting(false);
      setOrderComplete(true);
    }, 800);
  };

  if (orderComplete && placedOrderSummary) {
    return (
      <div className="bg-white min-h-screen py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-brand-offwhite rounded-2xl border border-brand-lightgrey p-6 sm:p-10 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-olive-soft text-olive mx-auto flex items-center justify-center mb-5">
              <CheckCircle2 className="w-10 h-10 stroke-[2]" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1 block">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-black mb-2">
              Thank You, {placedOrderSummary.customer.fullName}!
            </h1>
            <p className="text-sm text-brand-grey mb-6">
              Your order has been received and is being prepared for dispatch. You will pay in cash upon receiving your parcel.
            </p>

            <div className="bg-white p-5 rounded-lg border border-brand-lightgrey text-left mb-6 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-brand-lightgrey pb-2">
                <span className="text-brand-grey">Order Reference:</span>
                <span className="font-extrabold text-brand-black">{placedOrderId}</span>
              </div>
              <div className="flex justify-between border-b border-brand-lightgrey pb-2">
                <span className="text-brand-grey">Payment Method:</span>
                <span className="font-bold text-olive">Cash on Delivery (COD)</span>
              </div>
              <div className="flex justify-between border-b border-brand-lightgrey pb-2">
                <span className="text-brand-grey">Shipping To:</span>
                <span className="font-medium text-brand-black text-right max-w-xs truncate">
                  {placedOrderSummary.customer.address}, {placedOrderSummary.customer.city}, {placedOrderSummary.customer.province}
                </span>
              </div>
              <div className="flex justify-between border-b border-brand-lightgrey pb-2">
                <span className="text-brand-grey">Contact Phone:</span>
                <span className="font-bold text-brand-black">{placedOrderSummary.customer.phone}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-brand-black pt-1">
                <span>Total Amount:</span>
                <span>Rs. {placedOrderSummary.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/923288985916?text=Hi%20Super%20Safety%20Cover,%20I%20placed%20order%20${placedOrderId}%20for%20Rs.%20${placedOrderSummary.total}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-olive text-white px-6 py-3 rounded-md text-xs sm:text-sm font-bold hover:bg-olive-hover transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-md border border-brand-lightgrey text-xs sm:text-sm font-bold text-brand-black hover:border-olive hover:text-olive bg-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-16">
      <Breadcrumbs items={[{ label: "Checkout" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight mb-2">
          Cash on Delivery Checkout
        </h1>
        <p className="text-xs sm:text-sm text-brand-grey mb-8">
          Complete your delivery details. No advance online payment needed.
        </p>

        {cart.length === 0 ? (
          <div className="bg-brand-offwhite rounded-xl border border-brand-lightgrey p-10 text-center max-w-lg mx-auto">
            <ShoppingBag className="w-12 h-12 text-brand-grey mx-auto mb-3" />
            <h2 className="text-lg font-bold text-brand-black mb-1">
              Your cart is empty
            </h2>
            <p className="text-xs text-brand-grey mb-6">
              Please add products to your cart before proceeding to checkout.
            </p>
            <Link
              href="/best-sellers"
              className="inline-flex items-center gap-2 bg-olive text-white px-6 py-3 rounded-md text-xs font-bold hover:bg-olive-hover transition-colors"
            >
              <span>Explore Protective Covers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT: Checkout Form (7 cols) */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-brand-offwhite p-6 rounded-xl border border-brand-lightgrey space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-brand-black border-b border-brand-lightgrey pb-3">
                    1. Contact & Customer Information
                  </h2>

                  <div>
                    <label htmlFor="checkout-fullname" className="block text-xs font-bold text-brand-black mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-fullname"
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Muhammad Ali"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-md border border-brand-lightgrey bg-white text-xs sm:text-sm text-brand-black outline-none focus:border-olive"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="checkout-phone" className="block text-xs font-bold text-brand-black mb-1.5">
                        Phone Number (Active for SMS/WhatsApp) <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        name="phone"
                        required
                        placeholder="03001234567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-md border border-brand-lightgrey bg-white text-xs sm:text-sm text-brand-black outline-none focus:border-olive"
                      />
                    </div>
                    <div>
                      <label htmlFor="checkout-email" className="block text-xs font-bold text-brand-black mb-1.5">
                        Email Address <span className="text-brand-grey font-normal">(Optional)</span>
                      </label>
                      <input
                        id="checkout-email"
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-md border border-brand-lightgrey bg-white text-xs sm:text-sm text-brand-black outline-none focus:border-olive"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-brand-offwhite p-6 rounded-xl border border-brand-lightgrey space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-brand-black border-b border-brand-lightgrey pb-3">
                    2. Shipping Address
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="checkout-province" className="block text-xs font-bold text-brand-black mb-1.5">
                        Province <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="checkout-province"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-md border border-brand-lightgrey bg-white text-xs sm:text-sm text-brand-black outline-none focus:border-olive cursor-pointer"
                      >
                        {provinces.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="checkout-city" className="block text-xs font-bold text-brand-black mb-1.5">
                        City / District <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="checkout-city"
                        type="text"
                        name="city"
                        required
                        placeholder="e.g. Lahore, Karachi, Rawalpindi"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-md border border-brand-lightgrey bg-white text-xs sm:text-sm text-brand-black outline-none focus:border-olive"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="checkout-address" className="block text-xs font-bold text-brand-black mb-1.5">
                      Full Street Address / House & Colony <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="checkout-address"
                      name="address"
                      required
                      rows={2}
                      placeholder="House #, Street #, Mohallah / Area name, Landmark"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 rounded-md border border-brand-lightgrey bg-white text-xs sm:text-sm text-brand-black outline-none focus:border-olive"
                    />
                  </div>

                  <div>
                    <label htmlFor="checkout-notes" className="block text-xs font-bold text-brand-black mb-1.5">
                      Order Notes <span className="text-brand-grey font-normal">(Optional)</span>
                    </label>
                    <input
                      id="checkout-notes"
                      type="text"
                      name="orderNotes"
                      placeholder="Special delivery instructions or bike model note"
                      value={formData.orderNotes}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 rounded-md border border-brand-lightgrey bg-white text-xs sm:text-sm text-brand-black outline-none focus:border-olive"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-brand-offwhite p-6 rounded-xl border border-brand-lightgrey">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-brand-black border-b border-brand-lightgrey pb-3 mb-4">
                    3. Payment Method
                  </h2>

                  <div className="p-4 rounded-lg border-2 border-olive bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-4 border-olive bg-white"></div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-brand-black block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-xs text-brand-grey">
                          Pay in cash directly to courier rider upon inspection of parcel.
                        </span>
                      </div>
                    </div>
                    <Truck className="w-5 h-5 text-olive shrink-0" />
                  </div>

                  {/* Ready for future payment gateways notice */}
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-brand-grey">
                    <ShieldCheck className="w-3.5 h-3.5 text-olive shrink-0" />
                    <span>Safe & contactless cash transaction at your doorstep.</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-md bg-olive text-white font-extrabold text-sm sm:text-base hover:bg-olive-hover transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Place Order (Cash on Delivery)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* RIGHT: Order Summary (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-brand-offwhite p-6 rounded-xl border border-brand-lightgrey sticky top-24">
                <h2 className="text-sm font-bold uppercase tracking-wider text-brand-black border-b border-brand-lightgrey pb-3 mb-4">
                  Order Summary ({cart.length})
                </h2>

                <div className="space-y-3 mb-6 max-h-72 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-brand-lightgrey"
                    >
                      <div className="relative w-14 h-14 bg-brand-offwhite rounded overflow-hidden shrink-0 border border-brand-lightgrey">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-brand-black truncate">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-brand-grey block">
                          Qty: {item.quantity} {item.variantSummary ? `• ${item.variantSummary}` : (
                            <>
                              {item.selectedModel && `• ${item.selectedModel}`}
                              {item.selectedSize && `• ${item.selectedSize}`}
                              {item.selectedColor && `• ${item.selectedColor}`}
                            </>
                          )}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-extrabold text-brand-black">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-brand-lightgrey pt-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-brand-grey">
                    <span>Subtotal</span>
                    <span className="font-bold text-brand-black">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-brand-grey">
                    <span>Shipping</span>
                    <span className="font-bold text-brand-black">
                      {shipping === 0 ? (
                        <span className="text-olive">FREE</span>
                      ) : (
                        `Rs. ${shipping}`
                      )}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-[11px] text-olive font-medium">
                      Tip: Orders above Rs. 3,000 qualify for Free Shipping!
                    </p>
                  )}

                  <div className="border-t border-brand-lightgrey pt-3 flex justify-between text-base font-extrabold text-brand-black">
                    <span>Total Amount</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-white border border-brand-lightgrey space-y-2 text-xs text-brand-grey">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-olive shrink-0" />
                    <span>7-Day Return & Exchange Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-olive shrink-0" />
                    <span>Dispatched via Leopard / TCS / Trax</span>
                  </div>
                  <a
                    href="tel:+923288985916"
                    className="flex items-center gap-2 hover:text-olive transition-colors"
                  >
                    <Phone className="w-4 h-4 text-olive shrink-0" />
                    <span>Support: +92 328 8985916</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
