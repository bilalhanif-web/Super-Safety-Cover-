import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data";
import { ProductDetailClient } from "@/components/ProductDetailClient";

interface Props {
  params: {
    slug: string;
  };
}

const SLUG_ALIASES: Record<string, string> = {
  "honda-cd-70-waterproof-bike-cover": "bike-cover",
  "honda-cg-125-waterproof-bike-cover": "bike-cover",
  "yamaha-ybr-125-bike-cover": "bike-cover",
  "suzuki-gs-150-bike-cover": "bike-cover",
  "yamaha-ybr-125g-trail-cover": "bike-cover",
  "universal-motorcycle-protective-cover": "bike-cover",
  "premium-car-cover": "car-cover",
  "heavy-duty-suv-crossover-car-cover": "car-cover",
  "ac-protective-cover": "ac-cover",
  "split-ac-outdoor-unit-heavy-cover": "ac-cover",
  "pro-commuter-rain-dress": "rain-dress",
};

function getProduct(slug: string) {
  const targetSlug = SLUG_ALIASES[slug] || slug;
  return PRODUCTS.find((p) => p.slug === targetSlug);
}

export function generateStaticParams() {
  const directSlugs = PRODUCTS.map((p) => ({ slug: p.slug }));
  const aliasSlugs = Object.keys(SLUG_ALIASES).map((slug) => ({ slug }));
  return [...directSlugs, ...aliasSlugs];
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};

  return {
    title: `${product.name} | Super Safety Cover Pakistan`,
    description: `${product.shortDescription} Cash on Delivery nationwide across Pakistan. Rs. ${product.price.toLocaleString()}.`,
    openGraph: {
      title: `${product.name} | Super Safety Cover`,
      description: product.shortDescription,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

