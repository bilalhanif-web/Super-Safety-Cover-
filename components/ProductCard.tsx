"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const isLiked = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedModel: product.bikeModel || undefined,
      selectedSize: product.sizes?.[0]?.name || undefined,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative flex flex-col w-full h-full bg-white rounded-lg border border-[#D8D2C5] overflow-hidden transition-all duration-200 hover:shadow-md hover:border-[#66743A]/50">
      {/* Top Badges & Wishlist Button */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          {product.discountPercent && (
            <span className="bg-brand-black text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-tight">
              -{product.discountPercent}%
            </span>
          )}
          {product.badge && (
            <span className="bg-olive text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-tight">
              {product.badge}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleWishlist}
          className={`pointer-events-auto p-1.5 rounded-full bg-white/90 border border-[#D8D2C5] transition-colors ${
            isLiked ? "text-olive fill-olive" : "text-brand-grey hover:text-olive"
          }`}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Image Container (Fixed 4:5 Aspect Ratio, Full Poster Visible) */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[4/5] w-full bg-[#F4F3ED]/40 overflow-hidden border-b border-[#D8D2C5] block"
        style={{ aspectRatio: "4 / 5" }}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority
          quality={95}
          className="object-contain object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </Link>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-semibold text-brand-grey uppercase tracking-wider truncate">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-brand-black shrink-0">
              <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current text-olive" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-brand-grey font-normal text-[10px] sm:text-[11px]">
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Product Name */}
          <Link
            href={`/product/${product.slug}`}
            className="block text-xs sm:text-sm font-bold text-brand-black hover:text-olive transition-colors line-clamp-2 mb-2"
          >
            {product.name}
          </Link>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
            <span className="text-sm sm:text-lg font-extrabold text-brand-black">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && (
              <span className="text-[11px] sm:text-sm text-brand-grey line-through font-normal">
                Rs. {product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Quick Add CTA */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-md text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] ${
              added
                ? "bg-brand-black text-white"
                : "bg-olive text-white hover:bg-olive-hover"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
