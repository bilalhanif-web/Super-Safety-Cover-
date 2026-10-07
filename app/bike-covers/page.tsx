import { Metadata } from "next";
import { CATEGORIES, PRODUCTS } from "@/data";
import { CategoryPageClient } from "@/components/CategoryPageClient";

export const metadata: Metadata = {
  title: "Bike Covers Pakistan | Tailored Waterproof Covers | Super Safety Cover",
  description: "Shop custom waterproof parachute bike covers for Honda CD 70, CG 125, Yamaha YBR 125, Suzuki GS 150. Heavy duty, heat sealed, Cash on Delivery nationwide.",
};

export default function BikeCoversPage() {
  const category = CATEGORIES.find((c) => c.slug === "bike-covers")!;
  const products = PRODUCTS.filter((p) => p.category === "bike-covers");

  return <CategoryPageClient category={category} initialProducts={products} />;
}
