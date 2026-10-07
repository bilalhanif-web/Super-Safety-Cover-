import { Metadata } from "next";
import { PRODUCTS } from "@/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Best Sellers | Super Safety Cover Pakistan",
  description: "Browse our most popular and highest rated protective covers for bikes, cars, home machines and rain dress in Pakistan.",
};

export default function BestSellersPage() {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <div className="bg-white min-h-screen">
      <Breadcrumbs items={[{ label: "Best Sellers" }]} />

      <div className="bg-brand-offwhite border-y border-brand-lightgrey py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1.5 block">
            Most Trusted by Customers
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-2">
            Best Sellers
          </h1>
          <p className="text-sm sm:text-base text-brand-grey max-w-2xl leading-relaxed">
            Every product here is thoroughly battle-tested against Pakistani weather, heat, and rain. All backed by our 7-day hassle-free exchange policy.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
