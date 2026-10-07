"use client";

import React, { useState, useMemo } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { Product, Category } from "@/types";
import { BIKE_MODELS } from "@/data";
import { SlidersHorizontal, ChevronDown, X, Check } from "lucide-react";
import Link from "next/link";

interface CategoryPageClientProps {
  category: Category;
  initialProducts: Product[];
  selectedModelSlug?: string;
}

export const CategoryPageClient: React.FC<CategoryPageClientProps> = ({
  category,
  initialProducts,
  selectedModelSlug,
}) => {
  const [modelFilter, setModelFilter] = useState<string>(selectedModelSlug || "all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const isBikeCategory = category.slug === "bike-covers";

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      // Model filter
      if (modelFilter !== "all") {
        const matchesModel =
          p.bikeModelSlug === modelFilter ||
          p.compatibleModels?.some(
            (m) =>
              m.toLowerCase().replace(/[^a-z0-9]/g, "-") === modelFilter ||
              m.toLowerCase().includes(modelFilter.replace(/-/g, " "))
          );
        if (!matchesModel) return false;
      }

      // Price filter
      if (priceRange === "under-1500" && p.price >= 1500) return false;
      if (priceRange === "1500-2500" && (p.price < 1500 || p.price > 2500)) return false;
      if (priceRange === "above-2500" && p.price <= 2500) return false;

      // In stock
      if (inStockOnly && p.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "best-selling") return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0; // featured
    });
  }, [initialProducts, modelFilter, priceRange, inStockOnly, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/best-sellers" },
          { label: category.name, href: `/${category.slug}` },
          ...(selectedModelSlug
            ? [
                {
                  label:
                    BIKE_MODELS.find((m) => m.slug === selectedModelSlug)?.name ||
                    selectedModelSlug,
                },
              ]
            : []),
        ]}
      />

      {/* Header Banner */}
      <div className="bg-brand-offwhite border-y border-brand-lightgrey py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1.5 block">
              Super Safety Protection
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-2">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-brand-grey leading-relaxed">
              {category.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-brand-lightgrey gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-brand-lightgrey bg-white text-xs font-semibold text-brand-black hover:border-olive"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-olive" />
              <span>Filters</span>
            </button>
            <span className="text-xs text-brand-grey">
              Showing <strong className="text-brand-black">{displayedProducts.length}</strong> of {filteredProducts.length} items
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="sort-select" className="text-brand-grey font-medium hidden sm:inline">
              Sort by:
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-brand-lightgrey rounded-md px-3 py-2 pr-8 text-xs font-semibold text-brand-black hover:border-olive focus:outline-none focus:border-olive cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="best-selling">Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-brand-grey absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-brand-offwhite p-5 rounded-lg border border-brand-lightgrey">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-lightgrey">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-black">
                  Filters
                </span>
                {(modelFilter !== "all" || priceRange !== "all" || inStockOnly) && (
                  <button
                    type="button"
                    onClick={() => {
                      setModelFilter("all");
                      setPriceRange("all");
                      setInStockOnly(false);
                    }}
                    className="text-xs text-olive font-semibold hover:underline"
                  >
                    Reset all
                  </button>
                )}
              </div>

              {/* Bike Model Filter (if bike covers) */}
              {isBikeCategory && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-brand-black uppercase tracking-wider mb-2.5">
                    Bike Model
                  </h3>
                  <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                    <button
                      type="button"
                      onClick={() => setModelFilter("all")}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                        modelFilter === "all"
                          ? "bg-olive text-white font-bold"
                          : "text-brand-black hover:bg-white"
                      }`}
                    >
                      <span>All Models</span>
                      {modelFilter === "all" && <Check className="w-3.5 h-3.5" />}
                    </button>
                    {BIKE_MODELS.map((model) => (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() => setModelFilter(model.slug)}
                        className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                          modelFilter === model.slug
                            ? "bg-olive text-white font-bold"
                            : "text-brand-black hover:bg-white"
                        }`}
                      >
                        <span>{model.name}</span>
                        {modelFilter === model.slug && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-brand-black uppercase tracking-wider mb-2.5">
                  Price (PKR)
                </h3>
                <div className="space-y-1 text-xs">
                  {[
                    { label: "All Prices", value: "all" },
                    { label: "Under Rs. 1,500", value: "under-1500" },
                    { label: "Rs. 1,500 - Rs. 2,500", value: "1500-2500" },
                    { label: "Above Rs. 2,500", value: "above-2500" },
                  ].map((p) => (
                    <label
                      key={p.value}
                      className="flex items-center gap-2 p-1.5 rounded hover:bg-white cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        name="price-filter"
                        value={p.value}
                        checked={priceRange === p.value}
                        onChange={() => setPriceRange(p.value)}
                        className="accent-olive"
                      />
                      <span className="text-brand-black">{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <h3 className="text-xs font-bold text-brand-black uppercase tracking-wider mb-2.5">
                  Availability
                </h3>
                <label className="flex items-center gap-2 p-1.5 rounded hover:bg-white cursor-pointer select-none text-xs">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-olive rounded"
                  />
                  <span className="text-brand-black">In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {displayedProducts.length === 0 ? (
              <div className="py-16 text-center bg-brand-offwhite rounded-lg border border-brand-lightgrey p-8">
                <p className="text-base font-bold text-brand-black mb-2">
                  No products matched your selected filters.
                </p>
                <p className="text-xs text-brand-grey mb-6">
                  Try clearing bike model or price filters to see available covers.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setModelFilter("all");
                    setPriceRange("all");
                    setInStockOnly(false);
                  }}
                  className="bg-olive text-white px-5 py-2.5 rounded-md text-xs font-bold hover:bg-olive-hover transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > visibleCount && (
              <div className="text-center mt-12">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="bg-white border border-brand-lightgrey text-brand-black hover:border-olive hover:text-olive px-8 py-3 rounded-md text-xs font-bold transition-all shadow-xs"
                >
                  Load More Products ({filteredProducts.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-brand-black/60"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-lightgrey">
              <span className="text-sm font-bold text-brand-black">Filters</span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-brand-grey hover:text-brand-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Bike Model Filter */}
            {isBikeCategory && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-brand-black uppercase mb-2">
                  Bike Model
                </h4>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setModelFilter("all");
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs ${
                      modelFilter === "all" ? "bg-olive text-white font-bold" : "text-brand-black"
                    }`}
                  >
                    All Models
                  </button>
                  {BIKE_MODELS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setModelFilter(m.slug);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs ${
                        modelFilter === m.slug ? "bg-olive text-white font-bold" : "text-brand-black"
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Price Filter */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-brand-black uppercase mb-2">
                Price (PKR)
              </h4>
              <div className="space-y-1 text-xs">
                {[
                  { label: "All Prices", value: "all" },
                  { label: "Under Rs. 1,500", value: "under-1500" },
                  { label: "Rs. 1,500 - Rs. 2,500", value: "1500-2500" },
                  { label: "Above Rs. 2,500", value: "above-2500" },
                ].map((p) => (
                  <label key={p.value} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input
                      type="radio"
                      name="m-price"
                      value={p.value}
                      checked={priceRange === p.value}
                      onChange={() => {
                        setPriceRange(p.value);
                        setMobileFilterOpen(false);
                      }}
                      className="accent-olive"
                    />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="mt-auto w-full bg-olive text-white py-3 rounded-md text-xs font-bold hover:bg-olive-hover"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
