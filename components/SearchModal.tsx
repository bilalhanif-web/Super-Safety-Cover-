"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import { PRODUCTS, CATEGORIES, BIKE_MODELS } from "@/data";
import { Product } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredProducts: Product[] = trimmed
    ? PRODUCTS.filter((p) => {
        const matchName = p.name.toLowerCase().includes(trimmed);
        const matchCategory = p.categoryName.toLowerCase().includes(trimmed);
        const matchBike = p.bikeModel?.toLowerCase().includes(trimmed);
        const matchCompatible = p.compatibleModels?.some((m) =>
          m.toLowerCase().includes(trimmed)
        );
        const matchFeatures = p.features.some((f) =>
          f.toLowerCase().includes(trimmed)
        );
        return matchName || matchCategory || matchBike || matchCompatible || matchFeatures;
      })
    : [];

  const filteredModels = trimmed
    ? BIKE_MODELS.filter((m) => m.name.toLowerCase().includes(trimmed))
    : [];

  const quickPicks = ["CD 70", "CG 125", "YBR 125", "Car Cover", "Rain Dress", "AC Cover", "Washing Machine"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-black/60 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-brand-lightgrey z-10 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-brand-lightgrey gap-3">
          <Search className="w-5 h-5 text-olive shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by bike model (e.g. CD 70, YBR), cover, or category..."
            className="w-full text-sm sm:text-base text-brand-black placeholder:text-brand-grey outline-none bg-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-brand-grey hover:text-brand-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-brand-grey hover:text-brand-black px-2 py-1 rounded bg-brand-offwhite"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestions when empty */}
        {!trimmed && (
          <div className="p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-grey mb-3 block">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2 mb-6">
              {quickPicks.map((pick) => (
                <button
                  key={pick}
                  type="button"
                  onClick={() => setQuery(pick)}
                  className="px-3 py-1.5 rounded-full bg-brand-offwhite hover:bg-olive hover:text-white border border-brand-lightgrey text-xs font-semibold text-brand-black transition-colors"
                >
                  {pick}
                </button>
              ))}
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-brand-grey mb-3 block">
              Explore by Category
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES.slice(0, 4).map((c) => (
                <Link
                  key={c.id}
                  href={`/${c.slug}`}
                  onClick={onClose}
                  className="p-2.5 rounded bg-brand-offwhite/50 border border-brand-lightgrey hover:border-olive text-xs font-medium text-brand-black flex items-center justify-between group"
                >
                  <span>{c.name}</span>
                  <ArrowRight className="w-3 h-3 text-olive group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {trimmed && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Matching Bike Models */}
            {filteredModels.length > 0 && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-olive mb-2 block">
                  Bike Models
                </span>
                <div className="flex flex-wrap gap-2">
                  {filteredModels.map((m) => (
                    <Link
                      key={m.id}
                      href={`/bike-covers/${m.slug}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-olive-soft border border-olive/30 text-xs font-semibold text-olive hover:bg-olive hover:text-white transition-colors"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{m.name} Covers</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Products */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-grey mb-3 block">
                Products ({filteredProducts.length})
              </span>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm font-semibold text-brand-black mb-1">
                    No products found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-brand-grey">
                    Try searching for &ldquo;CD 70&rdquo;, &ldquo;Bike Cover&rdquo;, &ldquo;Rain Dress&rdquo; or &ldquo;Car Cover&rdquo;.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-2.5 rounded-lg border border-brand-lightgrey hover:border-olive hover:bg-brand-offwhite transition-all group"
                    >
                      <div className="relative w-14 h-14 bg-white rounded border border-brand-lightgrey overflow-hidden shrink-0">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          className="object-contain p-1"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-brand-black group-hover:text-olive transition-colors truncate">
                          {p.name}
                        </h4>
                        <span className="text-[11px] text-brand-grey">
                          {p.categoryName} {p.bikeModel && `• ${p.bikeModel}`}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-extrabold text-brand-black">
                          Rs. {p.price.toLocaleString()}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
