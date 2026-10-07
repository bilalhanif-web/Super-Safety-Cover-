"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronUp, Phone, Truck, MessageCircle } from "lucide-react";
import { BIKE_MODELS } from "@/data";
import { Logo } from "./Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [shopCoversOpen, setShopCoversOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>("bike-covers");

  if (!isOpen) return null;

  const toggleCategory = (cat: string) => {
    setOpenCategory(openCategory === cat ? null : cat);
  };

  const hondaModels = BIKE_MODELS.filter((m) => m.brand === "Honda");
  const yamahaModels = BIKE_MODELS.filter((m) => m.brand === "Yamaha");
  const suzukiModels = BIKE_MODELS.filter((m) => m.brand === "Suzuki");
  const universalModels = BIKE_MODELS.filter((m) => m.brand === "Universal");

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-lightgrey">
          <Logo />
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-brand-black hover:bg-brand-offwhite"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
          {/* 1. Home */}
          <Link
            href="/"
            onClick={onClose}
            className="block py-2.5 text-sm font-semibold text-brand-black hover:text-olive border-b border-brand-lightgrey/50"
          >
            Home
          </Link>

          {/* 2. Shop Covers Accordion */}
          <div className="border-b border-brand-lightgrey/50 py-1">
            <button
              onClick={() => setShopCoversOpen(!shopCoversOpen)}
              className="flex items-center justify-between w-full py-2.5 text-sm font-semibold text-brand-black hover:text-olive"
            >
              <span>Shop Covers</span>
              {shopCoversOpen ? (
                <ChevronUp className="w-4 h-4 text-olive" />
              ) : (
                <ChevronDown className="w-4 h-4 text-brand-grey" />
              )}
            </button>

            {shopCoversOpen && (
              <div className="pl-2 pr-1 py-1 space-y-1 text-sm bg-brand-offwhite/50 rounded-md">
                {/* Bike Covers + */}
                <div>
                  <button
                    onClick={() => toggleCategory("bike-covers")}
                    className="flex items-center justify-between w-full py-2 text-xs font-bold text-brand-black hover:text-olive"
                  >
                    <span>Bike Covers</span>
                    {openCategory === "bike-covers" ? (
                      <ChevronUp className="w-3.5 h-3.5 text-olive" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-brand-grey" />
                    )}
                  </button>

                  {openCategory === "bike-covers" && (
                    <div className="pl-3 py-1 space-y-2 border-l-2 border-olive/30 my-1 text-xs">
                      <Link
                        href="/bike-covers"
                        onClick={onClose}
                        className="block py-0.5 font-bold text-olive hover:underline"
                      >
                        All Bike Covers &rarr;
                      </Link>

                      {/* Honda */}
                      <div>
                        <span className="font-bold text-[11px] text-brand-grey uppercase block mb-1">
                          Honda
                        </span>
                        <div className="space-y-1 pl-1">
                          {hondaModels.map((m) => (
                            <Link
                              key={m.id}
                              href={`/bike-covers/${m.slug}`}
                              onClick={onClose}
                              className="block py-0.5 text-brand-black hover:text-olive"
                            >
                              {m.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Yamaha */}
                      <div>
                        <span className="font-bold text-[11px] text-brand-grey uppercase block mb-1">
                          Yamaha
                        </span>
                        <div className="space-y-1 pl-1">
                          {yamahaModels.map((m) => (
                            <Link
                              key={m.id}
                              href={`/bike-covers/${m.slug}`}
                              onClick={onClose}
                              className="block py-0.5 text-brand-black hover:text-olive"
                            >
                              {m.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Suzuki */}
                      <div>
                        <span className="font-bold text-[11px] text-brand-grey uppercase block mb-1">
                          Suzuki
                        </span>
                        <div className="space-y-1 pl-1">
                          {suzukiModels.map((m) => (
                            <Link
                              key={m.id}
                              href={`/bike-covers/${m.slug}`}
                              onClick={onClose}
                              className="block py-0.5 text-brand-black hover:text-olive"
                            >
                              {m.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Universal */}
                      <div>
                        <span className="font-bold text-[11px] text-brand-grey uppercase block mb-1">
                          Universal
                        </span>
                        <div className="space-y-1 pl-1">
                          {universalModels.map((m) => (
                            <Link
                              key={m.id}
                              href={`/bike-covers/${m.slug}`}
                              onClick={onClose}
                              className="block py-0.5 text-brand-black hover:text-olive"
                            >
                              {m.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Car Covers + */}
                <div>
                  <button
                    onClick={() => toggleCategory("car-covers")}
                    className="flex items-center justify-between w-full py-2 text-xs font-bold text-brand-black hover:text-olive"
                  >
                    <span>Car Covers</span>
                    {openCategory === "car-covers" ? (
                      <ChevronUp className="w-3.5 h-3.5 text-olive" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-brand-grey" />
                    )}
                  </button>
                  {openCategory === "car-covers" && (
                    <div className="pl-3 py-1 space-y-1 border-l-2 border-olive/30 my-1 text-xs">
                      <Link href="/car-covers" onClick={onClose} className="block py-0.5 text-brand-black hover:text-olive">
                        Hatchback, Sedan & SUV Covers
                      </Link>
                    </div>
                  )}
                </div>

                {/* AC Covers + */}
                <div>
                  <button
                    onClick={() => toggleCategory("ac-covers")}
                    className="flex items-center justify-between w-full py-2 text-xs font-bold text-brand-black hover:text-olive"
                  >
                    <span>AC Covers</span>
                    {openCategory === "ac-covers" ? (
                      <ChevronUp className="w-3.5 h-3.5 text-olive" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-brand-grey" />
                    )}
                  </button>
                  {openCategory === "ac-covers" && (
                    <div className="pl-3 py-1 space-y-1 border-l-2 border-olive/30 my-1 text-xs">
                      <Link href="/ac-covers" onClick={onClose} className="block py-0.5 text-brand-black hover:text-olive">
                        1.0, 1.5 & 2.0 Ton Indoor/Outdoor Units
                      </Link>
                    </div>
                  )}
                </div>

                {/* Washing Machine Covers + */}
                <div>
                  <button
                    onClick={() => toggleCategory("washing-machine-covers")}
                    className="flex items-center justify-between w-full py-2 text-xs font-bold text-brand-black hover:text-olive"
                  >
                    <span>Washing Machine Covers</span>
                    {openCategory === "washing-machine-covers" ? (
                      <ChevronUp className="w-3.5 h-3.5 text-olive" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-brand-grey" />
                    )}
                  </button>
                  {openCategory === "washing-machine-covers" && (
                    <div className="pl-3 py-1 space-y-1 border-l-2 border-olive/30 my-1 text-xs">
                      <Link href="/washing-machine-covers" onClick={onClose} className="block py-0.5 text-brand-black hover:text-olive">
                        Top Load, Front Load & Twin Tub
                      </Link>
                    </div>
                  )}
                </div>

                {/* Rain Dress + */}
                <div>
                  <button
                    onClick={() => toggleCategory("rain-dress")}
                    className="flex items-center justify-between w-full py-2 text-xs font-bold text-brand-black hover:text-olive"
                  >
                    <span>Rain Dress</span>
                    {openCategory === "rain-dress" ? (
                      <ChevronUp className="w-3.5 h-3.5 text-olive" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-brand-grey" />
                    )}
                  </button>
                  {openCategory === "rain-dress" && (
                    <div className="pl-3 py-1 space-y-1 border-l-2 border-olive/30 my-1 text-xs">
                      <Link href="/rain-dress" onClick={onClose} className="block py-0.5 text-brand-black hover:text-olive">
                        2-Piece Waterproof Suit (M, L, XL, XXL)
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mattress Covers + */}
                <div>
                  <button
                    onClick={() => toggleCategory("mattress-covers")}
                    className="flex items-center justify-between w-full py-2 text-xs font-bold text-brand-black hover:text-olive"
                  >
                    <span>Mattress Covers</span>
                    {openCategory === "mattress-covers" ? (
                      <ChevronUp className="w-3.5 h-3.5 text-olive" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-brand-grey" />
                    )}
                  </button>
                  {openCategory === "mattress-covers" && (
                    <div className="pl-3 py-1 space-y-1 border-l-2 border-olive/30 my-1 text-xs">
                      <Link href="/mattress-covers" onClick={onClose} className="block py-0.5 text-brand-black hover:text-olive">
                        Single, Double, Queen & King Fitted
                      </Link>
                    </div>
                  )}
                </div>

                {/* Fan Covers + */}
                <div>
                  <button
                    onClick={() => toggleCategory("fan-covers")}
                    className="flex items-center justify-between w-full py-2 text-xs font-bold text-brand-black hover:text-olive"
                  >
                    <span>Fan Covers</span>
                    {openCategory === "fan-covers" ? (
                      <ChevronUp className="w-3.5 h-3.5 text-olive" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-brand-grey" />
                    )}
                  </button>
                  {openCategory === "fan-covers" && (
                    <div className="pl-3 py-1 space-y-1 border-l-2 border-olive/30 my-1 text-xs">
                      <Link href="/fan-covers" onClick={onClose} className="block py-0.5 text-brand-black hover:text-olive">
                        Ceiling Fan Blade Sets & Pedestal Fans
                      </Link>
                    </div>
                  )}
                </div>

                {/* Air Cooler Covers + */}
                <div>
                  <button
                    onClick={() => toggleCategory("air-cooler-covers")}
                    className="flex items-center justify-between w-full py-2 text-xs font-bold text-brand-black hover:text-olive"
                  >
                    <span>Air Cooler Covers</span>
                    {openCategory === "air-cooler-covers" ? (
                      <ChevronUp className="w-3.5 h-3.5 text-olive" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-brand-grey" />
                    )}
                  </button>
                  {openCategory === "air-cooler-covers" && (
                    <div className="pl-3 py-1 space-y-1 border-l-2 border-olive/30 my-1 text-xs">
                      <Link href="/air-cooler-covers" onClick={onClose} className="block py-0.5 text-brand-black hover:text-olive">
                        Room & Desert Evaporative Coolers
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 3. About Us */}
          <Link
            href="/about"
            onClick={onClose}
            className="block py-2.5 text-sm font-semibold text-brand-black hover:text-olive border-b border-brand-lightgrey/50"
          >
            About Us
          </Link>

          {/* 5. Contact Us */}
          <Link
            href="/contact"
            onClick={onClose}
            className="block py-2.5 text-sm font-semibold text-brand-black hover:text-olive border-b border-brand-lightgrey/50"
          >
            Contact Us
          </Link>

          {/* 6. Blog */}
          <Link
            href="/blog"
            onClick={onClose}
            className="block py-2.5 text-sm font-semibold text-brand-black hover:text-olive border-b border-brand-lightgrey/50"
          >
            Blog
          </Link>
        </div>

        {/* Footer info in Mobile Drawer */}
        <div className="p-5 border-t border-brand-lightgrey bg-brand-offwhite">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-black mb-2.5">
            <Truck className="w-4 h-4 text-olive shrink-0" />
            <span>Cash on Delivery Across Pakistan</span>
          </div>
          <div className="flex flex-col gap-2 text-xs text-brand-grey">
            <a
              href="tel:+923288985916"
              className="flex items-center gap-2 hover:text-olive transition-colors"
            >
              <Phone className="w-4 h-4 text-olive shrink-0" />
              <span>Call: +92 328 8985916</span>
            </a>
            <a
              href="https://wa.me/923288985916"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-olive transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-olive shrink-0" />
              <span>WhatsApp: +92 328 8985916</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
