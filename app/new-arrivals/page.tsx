import { Metadata } from "next";
import { PRODUCTS } from "@/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "New Arrivals | Super Safety Cover Pakistan",
  description: "Check out our newest all-weather motorcycle covers, 2-piece rain dresses, and upgraded appliance protective covers.",
};

export default function NewArrivalsPage() {
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival || p.badge === "New Arrival" || p.category === "rain-dress");

  return (
    <div className="bg-white min-h-screen">
      <Breadcrumbs items={[{ label: "New Arrivals" }]} />

      <div className="bg-brand-offwhite border-y border-brand-lightgrey py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1.5 block">
            Latest Innovations
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-2">
            New Arrivals
          </h1>
          <p className="text-sm sm:text-base text-brand-grey max-w-2xl leading-relaxed">
            Discover newly engineered protective covers with reinforced triple seams, heavy-gauge ripstop parachute fabric, and pro commuter gear.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
