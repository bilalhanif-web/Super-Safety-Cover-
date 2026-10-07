import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, PRODUCTS } from "@/data";
import { CategoryPageClient } from "@/components/CategoryPageClient";

interface Props {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return CATEGORIES.filter((c) => c.slug !== "bike-covers").map((c) => ({
    category: c.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = CATEGORIES.find((c) => c.slug === params.category);
  if (!category) return {};

  return {
    title: `${category.name} | Super Safety Cover Pakistan`,
    description: `${category.shortDescription} Cash on Delivery available across all cities in Pakistan.`,
  };
}

export default function GenericCategoryPage({ params }: Props) {
  const category = CATEGORIES.find((c) => c.slug === params.category);
  if (!category) notFound();

  const products = PRODUCTS.filter((p) => p.category === category.slug);

  return <CategoryPageClient category={category} initialProducts={products} />;
}
