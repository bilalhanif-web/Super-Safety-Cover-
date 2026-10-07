"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";
import { CATEGORIES, BIKE_MODELS } from "@/data";

interface DesktopMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesktopMegaMenu: React.FC<DesktopMegaMenuProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string>("bike-covers");

  if (!isOpen) return null;

  const hondaModels = BIKE_MODELS.filter((m) => m.brand === "Honda");
  const yamahaModels = BIKE_MODELS.filter((m) => m.brand === "Yamaha");
  const suzukiModels = BIKE_MODELS.filter((m) => m.brand === "Suzuki");
  const universalModels = BIKE_MODELS.filter((m) => m.brand === "Universal");

  return (
    <div
      className="absolute top-full left-0 w-full bg-white border-b border-brand-lightgrey shadow-xl z-50 transition-all duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column: Categories List */}
          <div className="col-span-4 border-r border-brand-lightgrey pr-6">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-grey mb-4">
              All Protective Covers
            </div>
            <ul className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.slug;
                const isBike = cat.slug === "bike-covers";
                return (
                  <li key={cat.id}>
                    <div
                      onMouseEnter={() => setActiveCategory(cat.slug)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                        isActive
                          ? "bg-olive-soft text-olive font-semibold"
                          : "text-brand-black hover:text-olive hover:bg-brand-offwhite"
                      }`}
                    >
                      <Link
                        href={`/${cat.slug}`}
                        onClick={onClose}
                        className="flex-1"
                      >
                        {cat.name}
                      </Link>
                      {isBike && (
                        <ChevronRight className="w-4 h-4 text-olive ml-2 shrink-0" />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Center Column: Sub-menu dynamic content */}
          <div className="col-span-8">
            {activeCategory === "bike-covers" ? (
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-lightgrey">
                  <div>
                    <h3 className="text-base font-bold text-brand-black">
                      Bike Covers by Model
                    </h3>
                    <p className="text-xs text-brand-grey mt-0.5">
                      Tailored precision fits for Honda, Yamaha, Suzuki and Universal
                    </p>
                  </div>
                  <Link
                    href="/bike-covers"
                    onClick={onClose}
                    className="text-xs font-semibold text-olive hover:underline inline-flex items-center gap-1"
                  >
                    View All Bike Covers <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {/* Honda */}
                  <div>
                    <div className="text-xs font-bold text-brand-black uppercase tracking-wider mb-2.5 pb-1 border-b border-brand-lightgrey flex items-center justify-between">
                      <span>Honda</span>
                      <span className="text-[10px] text-brand-grey font-normal">70cc - 125cc</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-brand-grey">
                      {hondaModels.map((model) => (
                        <li key={model.id}>
                          <Link
                            href={`/bike-covers/${model.slug}`}
                            onClick={onClose}
                            className="block py-1 hover:text-olive hover:translate-x-0.5 transition-all text-brand-black"
                          >
                            {model.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Yamaha & Suzuki */}
                  <div>
                    <div className="text-xs font-bold text-brand-black uppercase tracking-wider mb-2.5 pb-1 border-b border-brand-lightgrey flex items-center justify-between">
                      <span>Yamaha</span>
                      <span className="text-[10px] text-brand-grey font-normal">YBR Series</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-brand-grey mb-4">
                      {yamahaModels.map((model) => (
                        <li key={model.id}>
                          <Link
                            href={`/bike-covers/${model.slug}`}
                            onClick={onClose}
                            className="block py-1 hover:text-olive hover:translate-x-0.5 transition-all text-brand-black"
                          >
                            {model.name}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className="text-xs font-bold text-brand-black uppercase tracking-wider mb-2.5 pb-1 border-b border-brand-lightgrey flex items-center justify-between">
                      <span>Suzuki</span>
                      <span className="text-[10px] text-brand-grey font-normal">GS & GD</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-brand-grey">
                      {suzukiModels.map((model) => (
                        <li key={model.id}>
                          <Link
                            href={`/bike-covers/${model.slug}`}
                            onClick={onClose}
                            className="block py-1 hover:text-olive hover:translate-x-0.5 transition-all text-brand-black"
                          >
                            {model.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Universal & Quick Feature Box */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-brand-black uppercase tracking-wider mb-2.5 pb-1 border-b border-brand-lightgrey">
                        Universal Fit
                      </div>
                      <ul className="space-y-1.5 text-xs text-brand-grey mb-4">
                        {universalModels.map((model) => (
                          <li key={model.id}>
                            <Link
                              href={`/bike-covers/${model.slug}`}
                              onClick={onClose}
                              className="block py-1 font-medium text-olive hover:underline"
                            >
                              {model.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quality Reassurance Card */}
                    <div className="bg-brand-offwhite p-4 rounded-lg border border-brand-lightgrey">
                      <div className="flex items-center gap-2 text-olive mb-1.5">
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span className="text-xs font-bold text-brand-black">
                          100% Water Repellent
                        </span>
                      </div>
                      <p className="text-[11px] text-brand-grey leading-relaxed">
                        Heat-sealed parachute fabric tailored to keep your tank paint scratch-free and chain rust-free.
                      </p>
                      <Link
                        href="/bike-covers"
                        onClick={onClose}
                        className="mt-3 inline-flex items-center text-xs font-semibold text-olive hover:underline"
                      >
                        Explore all fits &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Non-bike category preview */
              <div>
                {(() => {
                  const current = CATEGORIES.find((c) => c.slug === activeCategory);
                  if (!current) return null;
                  return (
                    <div className="grid grid-cols-2 gap-8 items-center">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1 block">
                          Category Spotlight
                        </span>
                        <h3 className="text-xl font-bold text-brand-black mb-2">
                          {current.name}
                        </h3>
                        <p className="text-sm text-brand-grey leading-relaxed mb-6">
                          {current.shortDescription}
                        </p>
                        <div className="space-y-2 mb-6 text-xs text-brand-black">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                            <span>Tailored Pakistani climate sizing</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                            <span>Water, dust, and UV protection</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                            <span>Cash on Delivery nationwide</span>
                          </div>
                        </div>
                        <Link
                          href={`/${current.slug}`}
                          onClick={onClose}
                          className="inline-flex items-center gap-2 bg-olive text-white px-5 py-2.5 rounded-md text-xs font-semibold hover:bg-olive-hover transition-colors"
                        >
                          Shop {current.name} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <div className="relative aspect-square max-w-[280px] mx-auto rounded-lg overflow-hidden border border-brand-lightgrey bg-brand-offwhite">
                        <Image
                          src={current.image}
                          alt={current.name}
                          fill
                          className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                          sizes="280px"
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
