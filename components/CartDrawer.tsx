"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, totalQuantity } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-black/60 transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-brand-lightgrey">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-olive" />
            <h2 className="text-base font-bold text-brand-black">
              Shopping Cart ({totalQuantity})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-md text-brand-grey hover:text-brand-black hover:bg-brand-offwhite transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping / COD banner */}
        <div className="bg-brand-offwhite px-4 sm:px-6 py-2.5 border-b border-brand-lightgrey flex items-center gap-2 text-xs font-medium text-brand-black">
          <ShieldCheck className="w-4 h-4 text-olive shrink-0" />
          <span>Cash on Delivery available on this order</span>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-brand-offwhite border border-brand-lightgrey flex items-center justify-center text-brand-grey mb-4">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-brand-black mb-1">
                Your cart is empty
              </h3>
              <p className="text-xs text-brand-grey mb-6">
                Explore our durable bike, car, and household protective covers.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="bg-olive text-white px-6 py-2.5 rounded-md text-xs font-bold hover:bg-olive-hover transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-brand-offwhite/50 rounded-lg border border-brand-lightgrey"
              >
                {/* Image */}
                <div className="relative w-20 h-20 bg-white rounded border border-brand-lightgrey overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-1"
                    sizes="80px"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs sm:text-sm font-bold text-brand-black hover:text-olive transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-brand-grey hover:text-red-500 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {(item.selectedModel || item.selectedSize || item.selectedColor || item.variantSummary) && (
                      <p className="text-[11px] text-brand-grey mt-0.5">
                        {item.variantSummary ? (
                          <span>{item.variantSummary}</span>
                        ) : (
                          <>
                            {item.selectedModel && <span>Model: {item.selectedModel}</span>}
                            {item.selectedModel && item.selectedSize && <span> | </span>}
                            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                            {item.selectedColor && (
                              <span>
                                {(item.selectedModel || item.selectedSize) ? " | " : ""}
                                Color: {item.selectedColor}
                              </span>
                            )}
                          </>
                        )}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-brand-lightgrey rounded bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-brand-grey hover:text-brand-black"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-brand-black">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-brand-grey hover:text-brand-black"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-xs sm:text-sm font-extrabold text-brand-black">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-brand-lightgrey bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-brand-grey">Subtotal</span>
              <span className="text-base font-extrabold text-brand-black">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4 text-xs text-brand-grey">
              <span>Delivery (Nationwide)</span>
              <span className="text-olive font-semibold">Calculated at checkout</span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full py-3.5 px-4 bg-olive text-white rounded-md text-sm font-bold flex items-center justify-center gap-2 hover:bg-olive-hover transition-colors shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="w-full text-center text-xs font-semibold text-brand-grey hover:text-olive mt-3 transition-colors"
            >
              Or Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
