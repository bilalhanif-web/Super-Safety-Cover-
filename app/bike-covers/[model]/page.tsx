import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, PRODUCTS, BIKE_MODELS } from "@/data";
import { CategoryPageClient } from "@/components/CategoryPageClient";

interface Props {
  params: {
    model: string;
  };
}

export function generateStaticParams() {
  return BIKE_MODELS.map((m) => ({
    model: m.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const model = BIKE_MODELS.find((m) => m.slug === params.model);
  const name = model ? model.name : params.model.replace(/-/g, " ");

  return {
    title: `${name} Waterproof Bike Cover | Super Safety Cover Pakistan`,
    description: `Buy custom-fit waterproof parachute bike cover for ${name}. 100% water repellent, windproof under-buckle, UV heat protection with Cash on Delivery in Pakistan.`,
  };
}

export default function BikeModelPage({ params }: Props) {
  const category = CATEGORIES.find((c) => c.slug === "bike-covers")!;
  const model = BIKE_MODELS.find((m) => m.slug === params.model);

  if (!model && params.model !== "universal") {
    // If not found, still gracefully show all bike covers or notFound
    // but check if any model matches
    const exists = BIKE_MODELS.some((m) => m.slug === params.model);
    if (!exists) notFound();
  }

  const products = PRODUCTS.filter((p) => p.category === "bike-covers");

  return (
    <CategoryPageClient
      category={category}
      initialProducts={products}
      selectedModelSlug={params.model}
    />
  );
}
