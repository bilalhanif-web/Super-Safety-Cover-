"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ShoppingBag,
  Zap,
  Plus,
  Minus,
  Heart,
  AlertCircle,
  X,
} from "lucide-react";
import { Product } from "@/types";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductDetailClientProps {
  product: Product;
}

interface ColorOption {
  name: string;
  hex: string;
}

// WhatsApp brand SVG icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.507 14.307l-.009.075c-.244.59-1.282 1.155-1.782 1.206-.48.049-.966.197-3.14-.712-2.18-.912-3.593-3.167-3.702-3.317-.107-.15-1.002-1.332-1.002-2.54 0-1.208.636-1.803.86-2.046.223-.243.486-.304.648-.304.162 0 .324.002.464.01.15.008.35-.057.548.42.203.486.69 1.684.75 1.805.061.122.102.264.02.427-.08.162-.122.263-.243.405-.122.142-.256.317-.365.426-.122.122-.25.253-.108.496.142.243.633 1.045 1.36 1.692.935.832 1.724 1.09 1.968 1.211.243.122.386.102.528-.061.142-.163.608-.71.77-0.954.162-.244.324-.203.547-.122.223.081 1.419.669 1.663.791.243.122.405.183.466.284.061.102.061.59-.183 1.18zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.61a.5.5 0 00.627.625l4.57-1.341C8.683 21.572 10.297 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.632 0-3.155-.45-4.46-1.233a.5.5 0 00-.363-.053l-3.32.973.987-3.197a.5.5 0 00-.05-.386A7.95 7.95 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
  </svg>
);

// Color palettes per product category
const CATEGORY_COLORS: Record<string, ColorOption[]> = {
  "bike-covers": [
    { name: "Black", hex: "#111111" },
    { name: "Grey", hex: "#6B6B6B" },
    { name: "Olive Green", hex: "#66743A" },
    { name: "Navy Blue", hex: "#1E3A8A" },
  ],
  "car-covers": [
    { name: "Silver Grey", hex: "#9CA3AF" },
    { name: "Black", hex: "#111111" },
    { name: "Olive Green", hex: "#66743A" },
    { name: "Navy Blue", hex: "#1E3A8A" },
  ],
  "washing-machine-covers": [
    { name: "Grey", hex: "#6B6B6B" },
    { name: "Black", hex: "#111111" },
    { name: "Olive Green", hex: "#66743A" },
  ],
  "ac-covers": [
    { name: "Off-White", hex: "#F3F4F6" },
    { name: "Grey", hex: "#6B6B6B" },
    { name: "Olive Green", hex: "#66743A" },
  ],
  "mattress-covers": [
    { name: "White", hex: "#FFFFFF" },
    { name: "Grey", hex: "#6B6B6B" },
    { name: "Navy Blue", hex: "#1E3A8A" },
  ],
  "fan-covers": [
    { name: "Grey", hex: "#6B6B6B" },
    { name: "Black", hex: "#111111" },
    { name: "Olive Green", hex: "#66743A" },
  ],
  "air-cooler-covers": [
    { name: "Grey", hex: "#6B6B6B" },
    { name: "Black", hex: "#111111" },
    { name: "Olive Green", hex: "#66743A" },
  ],
  "rain-dress": [
    { name: "Black", hex: "#111111" },
    { name: "Navy Blue", hex: "#1E3A8A" },
    { name: "Olive Green", hex: "#66743A" },
  ],
};

const DEFAULT_COLORS: ColorOption[] = [
  { name: "Black", hex: "#111111" },
  { name: "Grey", hex: "#6B6B6B" },
  { name: "Olive Green", hex: "#66743A" },
  { name: "Navy Blue", hex: "#1E3A8A" },
];

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);
  const isBikeProduct = product.category === "bike-covers";

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Variant States
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedMachineType, setSelectedMachineType] = useState<string>("");
  const [selectedCapacity, setSelectedCapacity] = useState<string>("");
  const [selectedAcSize, setSelectedAcSize] = useState<string>("");
  const [selectedUnitType, setSelectedUnitType] = useState<string>("");
  const [selectedFanType, setSelectedFanType] = useState<string>("");
  const [selectedFanSize, setSelectedFanSize] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // Validation & feedback state
  const [variantError, setVariantError] = useState<string>("");
  const [addedNotice, setAddedNotice] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "description" | "features" | "specs" | "shipping" | "reviews"
  >("description");

  // WhatsApp Order Modal State
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Prevent background scroll when modal is active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isWhatsAppModalOpen) {
        setIsWhatsAppModalOpen(false);
      }
    };
    if (isWhatsAppModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isWhatsAppModalOpen]);

  // Color options for this product
  const colorOptions = CATEGORY_COLORS[product.category] || DEFAULT_COLORS;

  // Default variant initialization for AC covers
  useEffect(() => {
    if (product.category === "ac-covers") {
      if (!selectedAcSize) setSelectedAcSize("1.5 Ton");
      if (!selectedUnitType) setSelectedUnitType("Indoor Unit");
      if (!selectedColor && colorOptions.length > 0) setSelectedColor(colorOptions[0].name);
    }
  }, [product.category, colorOptions, selectedAcSize, selectedUnitType, selectedColor]);

  // Bike models list
  const bikeModelsList = [
    { name: "Honda CD 70", available: true },
    { name: "Honda CG 125", available: true },
    { name: "Yamaha YBR 125", available: true },
    { name: "Suzuki GS 150", available: true },
    { name: "Universal Fit", available: true },
  ];
  if (product.bikeModel && !bikeModelsList.some((bm) => bm.name === product.bikeModel)) {
    bikeModelsList.splice(4, 0, { name: product.bikeModel, available: true });
  }

  // Variant validation function
  const validateVariants = (): boolean => {
    if (product.category === "bike-covers") {
      if (!selectedModel || !selectedColor) {
        setVariantError("Please select your bike model and color.");
        return false;
      }
    } else if (product.category === "washing-machine-covers") {
      if (!selectedMachineType || !selectedCapacity || !selectedColor) {
        setVariantError("Please select your machine type, capacity, and color.");
        return false;
      }
    } else if (product.category === "ac-covers") {
      if (!selectedAcSize || !selectedUnitType || !selectedColor) {
        setVariantError("Please select your AC size, unit type, and color.");
        return false;
      }
    } else if (product.category === "mattress-covers") {
      if (!selectedSize || !selectedColor) {
        setVariantError("Please select your mattress size and color.");
        return false;
      }
    } else if (product.category === "fan-covers") {
      if (!selectedFanType || !selectedFanSize || !selectedColor) {
        setVariantError("Please select your fan type, size, and color.");
        return false;
      }
    } else if (product.category === "air-cooler-covers") {
      if (!selectedSize || !selectedColor) {
        setVariantError("Please select your cooler size and color.");
        return false;
      }
    } else if (product.category === "rain-dress") {
      if (!selectedSize || !selectedColor) {
        setVariantError("Please select your size and color.");
        return false;
      }
    } else if (product.category === "car-covers") {
      if (!selectedSize || !selectedColor) {
        setVariantError("Please select your car size and color.");
        return false;
      }
    } else {
      if (!selectedColor) {
        setVariantError("Please select a color.");
        return false;
      }
    }

    setVariantError("");
    return true;
  };

  // Generate variant summary for cart and checkout synchronization
  const getVariantSummary = (): string => {
    if (product.category === "bike-covers") {
      return `Bike Model: ${selectedModel} | Color: ${selectedColor}`;
    }
    if (product.category === "washing-machine-covers") {
      return `Machine Type: ${selectedMachineType} | Capacity: ${selectedCapacity} | Color: ${selectedColor}`;
    }
    if (product.category === "ac-covers") {
      return `AC Size: ${selectedAcSize} | Unit: ${selectedUnitType} | Color: ${selectedColor}`;
    }
    if (product.category === "mattress-covers") {
      return `Size: ${selectedSize} | Color: ${selectedColor}`;
    }
    if (product.category === "fan-covers") {
      return `Fan Type: ${selectedFanType} | Size: ${selectedFanSize} | Color: ${selectedColor}`;
    }
    if (product.category === "air-cooler-covers") {
      return `Size: ${selectedSize} | Color: ${selectedColor}`;
    }
    if (product.category === "rain-dress") {
      return `Size: ${selectedSize} | Color: ${selectedColor}`;
    }
    if (product.category === "car-covers") {
      return `Size: ${selectedSize} | Color: ${selectedColor}`;
    }
    return `Color: ${selectedColor}${selectedSize ? ` | Size: ${selectedSize}` : ""}`;
  };

  const handleAddToCart = () => {
    if (!validateVariants()) return;

    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedModel: product.category === "bike-covers" ? selectedModel : undefined,
      selectedSize: selectedSize || undefined,
      selectedColor,
      selectedType: selectedMachineType || selectedAcSize || selectedFanType || undefined,
      selectedCapacity: selectedCapacity || selectedUnitType || selectedFanSize || undefined,
      variantSummary: getVariantSummary(),
      quantity,
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    if (!validateVariants()) return;

    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedModel: product.category === "bike-covers" ? selectedModel : undefined,
      selectedSize: selectedSize || undefined,
      selectedColor,
      selectedType: selectedMachineType || selectedAcSize || selectedFanType || undefined,
      selectedCapacity: selectedCapacity || selectedUnitType || selectedFanSize || undefined,
      variantSummary: getVariantSummary(),
      quantity,
    });

    router.push("/checkout");
  };

  const handleOpenWhatsAppModal = () => {
    if (!validateVariants()) return;
    setIsWhatsAppModalOpen(true);
  };

  const handleWhatsAppFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    if (!customerForm.name.trim()) {
      errors.name = "Please enter your full name.";
    }
    if (!customerForm.phone.trim()) {
      errors.phone = "Please enter your phone number.";
    }
    if (!customerForm.city.trim()) {
      errors.city = "Please enter your city.";
    }
    if (!customerForm.address.trim()) {
      errors.address = "Please enter your delivery address.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const currentUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `https://supersafetycover.pk/product/${product.slug}`;

    // Dynamic variant lines based on category
    const variantLines: string[] = [];
    if (product.category === "bike-covers") {
      variantLines.push(`Bike Model: ${selectedModel}`);
    } else if (product.category === "washing-machine-covers") {
      variantLines.push(`Machine Type: ${selectedMachineType}`);
      variantLines.push(`Capacity: ${selectedCapacity}`);
    } else if (product.category === "ac-covers") {
      variantLines.push(`AC Size: ${selectedAcSize}`);
      variantLines.push(`Unit Type: ${selectedUnitType}`);
    } else if (product.category === "mattress-covers") {
      variantLines.push(`Size: ${selectedSize}`);
    } else if (product.category === "fan-covers") {
      variantLines.push(`Fan Type: ${selectedFanType}`);
      variantLines.push(`Size: ${selectedFanSize}`);
    } else if (product.category === "air-cooler-covers") {
      variantLines.push(`Size: ${selectedSize}`);
    } else if (product.category === "rain-dress") {
      variantLines.push(`Size: ${selectedSize}`);
    } else if (product.category === "car-covers") {
      variantLines.push(`Car Size: ${selectedSize}`);
    } else if (selectedSize) {
      variantLines.push(`Size: ${selectedSize}`);
    }

    variantLines.push(`Color: ${selectedColor}`);
    variantLines.push(`Quantity: ${quantity}`);
    variantLines.push(`Price: Rs. ${(product.price * quantity).toLocaleString()}`);

    const messageParts: string[] = [
      "Hi Super Safety Cover,",
      "",
      "I want to place an order.",
      "",
      `Product: ${product.name}`,
      ...variantLines,
      "",
      "Customer Details:",
      "",
      `Name: ${customerForm.name.trim()}`,
      `Phone: ${customerForm.phone.trim()}`,
      `City: ${customerForm.city.trim()}`,
      `Address: ${customerForm.address.trim()}`,
    ];

    if (customerForm.notes.trim()) {
      messageParts.push("", "Order Notes:", customerForm.notes.trim());
    }

    messageParts.push(
      "",
      "Product Link:",
      currentUrl,
      "",
      "Please confirm my order and delivery details."
    );

    const fullMessage = messageParts.join("\n");
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923288985916";
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(fullMessage)}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
    setIsWhatsAppModalOpen(false);
  };

  // Schema.org Product JSON-LD
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => `https://supersafetycover.pk${img}`),
    description: product.shortDescription,
    brand: {
      "@type": "Brand",
      name: "Super Safety Cover",
    },
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `https://supersafetycover.pk/product/${product.slug}`,
      priceCurrency: "PKR",
      price: product.price,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };

  return (
    <div className="bg-white min-h-screen pb-20 md:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: product.categoryName, href: `/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* LEFT: Product Image Gallery (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails (shown if multiple images exist) */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border bg-brand-offwhite transition-all ${
                      activeImageIndex === idx
                        ? "border-olive ring-1 ring-olive shadow-sm"
                        : "border-brand-lightgrey opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image (Full Ad Poster) */}
            <div className="relative aspect-[4/5] w-full rounded-xl bg-brand-offwhite border border-brand-lightgrey overflow-hidden shadow-xs">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-contain transition-transform duration-300 hover:scale-[1.01]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 border border-brand-lightgrey text-brand-grey hover:text-olive shadow-sm transition-colors z-10"
                aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "text-olive fill-olive" : ""}`} />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Section (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1 block">
              {product.categoryName}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight mb-2.5 leading-snug">
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-brand-lightgrey text-xs">
              <div className="flex items-center gap-1 text-olive font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-brand-black font-semibold">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-brand-grey">•</span>
              <span className="text-brand-grey">{product.reviewsCount} Customer Reviews</span>
              <span className="text-brand-grey">•</span>
              <span className="text-olive font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse"></span>
                In Stock ({product.stock} left)
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-extrabold text-brand-black">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-base text-brand-grey line-through font-normal">
                  Rs. {product.compareAtPrice.toLocaleString()}
                </span>
              )}
              {product.discountPercent && (
                <span className="text-xs font-bold text-olive bg-olive-soft px-2 py-0.5 rounded">
                  You save Rs. {(product.compareAtPrice! - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm text-brand-grey leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* ======================================================= */}
            {/* 2. PRODUCT MODEL / TYPE VARIANTS (Clickable Buttons Only) */}
            {/* ======================================================= */}

            {/* A. Bike Covers Model Selection */}
            {isBikeProduct && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold text-brand-black uppercase tracking-wider flex items-center gap-1">
                    <span>Select Bike Model</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-olive font-semibold">
                    100% Guaranteed Fit
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {bikeModelsList.map((bm) => {
                    const isSelected = selectedModel === bm.name;
                    const isAvailable = bm.available !== false;

                    return (
                      <button
                        key={bm.name}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => {
                          if (!isAvailable) return;
                          setSelectedModel(bm.name);
                          setVariantError("");
                        }}
                        className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                          !isAvailable
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                            : isSelected
                            ? "bg-olive text-white border-olive shadow-xs"
                            : "bg-white text-brand-black border-brand-lightgrey hover:border-olive"
                        }`}
                      >
                        {bm.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* B. Washing Machine Covers Variants */}
            {product.category === "washing-machine-covers" && (
              <div className="space-y-4 mb-5">
                <div>
                  <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                    Select Machine Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Top Load", "Front Load", "Twin Tub"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setSelectedMachineType(type);
                          setVariantError("");
                        }}
                        className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                          selectedMachineType === type
                            ? "bg-olive text-white border-olive shadow-xs"
                            : "bg-white text-brand-black border-brand-lightgrey hover:border-olive"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                    Select Capacity <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["7 - 8 KG", "9 - 10 KG", "11 - 14 KG"].map((cap) => (
                      <button
                        key={cap}
                        type="button"
                        onClick={() => {
                          setSelectedCapacity(cap);
                          setVariantError("");
                        }}
                        className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                          selectedCapacity === cap
                            ? "bg-olive text-white border-olive shadow-xs"
                            : "bg-white text-brand-black border-brand-lightgrey hover:border-olive"
                        }`}
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* C. AC Covers Variants */}
            {product.category === "ac-covers" && (
              <div className="space-y-4 mb-5">
                <div>
                  <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                    Select AC Size <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["1.0 Ton", "1.5 Ton", "2.0 Ton"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setSelectedAcSize(size);
                          setVariantError("");
                        }}
                        className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                          selectedAcSize === size
                            ? "bg-olive text-white border-olive shadow-xs"
                            : "bg-white text-brand-black border-brand-lightgrey hover:border-olive"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                    Select Unit Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Indoor Unit", "Outdoor Unit", "Full Set (Indoor + Outdoor)"].map(
                      (unit) => (
                        <button
                          key={unit}
                          type="button"
                          onClick={() => {
                            setSelectedUnitType(unit);
                            setVariantError("");
                          }}
                          className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                            selectedUnitType === unit
                              ? "bg-olive text-white border-olive shadow-xs"
                              : "bg-white text-brand-black border-brand-lightgrey hover:border-olive"
                          }`}
                        >
                          {unit}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* D. Mattress Covers Variants */}
            {product.category === "mattress-covers" && (
              <div className="mb-5">
                <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                  Select Size <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Single Bed", "Queen Size", "King Size"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setSelectedSize(sz);
                        setVariantError("");
                      }}
                      className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                        selectedSize === sz
                          ? "bg-olive text-white border-olive shadow-xs"
                          : "bg-white text-brand-black border-brand-lightgrey hover:border-olive"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* E. Fan Covers Variants */}
            {product.category === "fan-covers" && (
              <div className="space-y-4 mb-5">
                <div>
                  <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                    Select Fan Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Ceiling Fan", "Pedestal / Standing Fan", "Bracket / Wall Fan"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setSelectedFanType(t);
                          setVariantError("");
                        }}
                        className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                          selectedFanType === t
                            ? "bg-olive text-white border-olive shadow-xs"
                            : "bg-white text-brand-black border-brand-lightgrey hover:border-olive"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                    Select Size <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Standard 56\"", "Large 60\""].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setSelectedFanSize(s);
                          setVariantError("");
                        }}
                        className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                          selectedFanSize === s
                            ? "bg-olive text-white border-olive shadow-xs"
                            : "bg-white text-brand-black border-brand-lightgrey hover:border-olive"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* F. Air Cooler Covers Variants */}
            {product.category === "air-cooler-covers" && (
              <div className="mb-5">
                <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                  Select Size <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Medium Room Cooler", "Jumbo / Desert Cooler"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setSelectedSize(sz);
                        setVariantError("");
                      }}
                      className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                        selectedSize === sz
                          ? "bg-olive text-white border-olive shadow-xs"
                          : "bg-white text-brand-black border-brand-lightgrey hover:border-olive"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* G. Rain Dress Variants */}
            {product.category === "rain-dress" && (
              <div className="mb-5">
                <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                  Select Size <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Medium", "Large", "XL", "XXL"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setSelectedSize(sz);
                        setVariantError("");
                      }}
                      className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                        selectedSize === sz
                          ? "bg-olive text-white border-olive shadow-xs"
                          : "bg-white text-brand-black border-brand-lightgrey hover:border-olive"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* H. Car Covers Variants */}
            {product.category === "car-covers" && (
              <div className="mb-5">
                <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                  Select Body Type / Size <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Hatchback", "Sedan", "SUV / Crossover"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setSelectedSize(sz);
                        setVariantError("");
                      }}
                      className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                        selectedSize === sz
                          ? "bg-olive text-white border-olive shadow-xs"
                          : "bg-white text-brand-black border-brand-lightgrey hover:border-olive"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Fallback Size Buttons if product has sizes and none of the above categories matched */}
            {!isBikeProduct &&
              product.category !== "washing-machine-covers" &&
              product.category !== "ac-covers" &&
              product.category !== "mattress-covers" &&
              product.category !== "fan-covers" &&
              product.category !== "air-cooler-covers" &&
              product.category !== "rain-dress" &&
              product.category !== "car-covers" &&
              product.sizes &&
              product.sizes.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                    Select Size <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz.name}
                        type="button"
                        onClick={() => {
                          setSelectedSize(sz.name);
                          setVariantError("");
                        }}
                        className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                          selectedSize === sz.name
                            ? "bg-olive text-white border-olive shadow-xs"
                            : "bg-white text-brand-black border-brand-lightgrey hover:border-olive"
                        }`}
                      >
                        {sz.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {/* ======================================================= */}
            {/* 3. COLOR VARIANTS (Visual Swatches, Directly Below)    */}
            {/* ======================================================= */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold text-brand-black uppercase tracking-wider flex items-center gap-1">
                  <span>Select Color</span>
                  <span className="text-red-500">*</span>
                </label>
                {selectedColor && (
                  <span className="text-xs text-brand-grey font-medium">
                    Selected: <strong className="text-brand-black">{selectedColor}</strong>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {colorOptions.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => {
                        setSelectedColor(c.name);
                        setVariantError("");
                      }}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                        isSelected
                          ? "border-olive ring-1 ring-olive text-brand-black bg-olive/5 shadow-xs"
                          : "border-brand-lightgrey bg-white text-brand-black hover:border-brand-grey"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0 shadow-2xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ======================================================= */}
            {/* 5. INLINE VARIANT VALIDATION NOTICE                     */}
            {/* ======================================================= */}
            {variantError && (
              <div className="mb-3.5 p-3 bg-red-50 border border-red-200 rounded-md text-xs font-semibold text-red-700 flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{variantError}</span>
              </div>
            )}

            {/* ======================================================= */}
            {/* 4. QUANTITY + PURCHASE BUTTONS (Exact Order)            */}
            {/* ======================================================= */}
            <div className="space-y-3 mb-6">
              {/* Row 1: Quantity selector + Add to Cart */}
              <div className="flex items-center gap-3">
                {/* Quantity Buttons */}
                <div className="flex items-center border border-brand-lightgrey rounded-md bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-brand-grey hover:text-brand-black transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-bold text-brand-black min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-brand-grey hover:text-brand-black transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 min-w-0 py-3.5 px-3 sm:px-6 rounded-md bg-olive text-white font-bold text-xs sm:text-sm hover:bg-olive-hover transition-colors flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4 shrink-0" />
                  <span className="truncate">Add to Cart</span>
                </button>
              </div>

              {/* Row 2: Buy Now (Cash on Delivery) */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-md bg-brand-black text-white font-bold text-sm hover:bg-brand-black/90 transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
              >
                <Zap className="w-4 h-4 text-olive" />
                <span>Buy Now (Cash on Delivery)</span>
              </button>

              {/* Row 3: Order on WhatsApp */}
              <button
                type="button"
                onClick={handleOpenWhatsAppModal}
                className="w-full py-3.5 px-6 rounded-md bg-[#25D366] text-white font-bold text-sm hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99]"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>Order on WhatsApp</span>
              </button>

              {addedNotice && (
                <div className="p-2.5 text-center text-xs font-bold text-olive bg-olive-soft rounded-md animate-fade-in border border-olive/20">
                  ✓ Item added to cart! Slide-out cart is now open.
                </div>
              )}
            </div>

            {/* BENEFITS BELOW CTA */}
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-brand-lightgrey bg-brand-offwhite/50 rounded-lg p-3 text-center">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-olive mb-1" />
                <span className="text-[11px] font-bold text-brand-black leading-tight">
                  Cash on Delivery
                </span>
                <span className="text-[10px] text-brand-grey">Pay at your door</span>
              </div>
              <div className="flex flex-col items-center border-x border-brand-lightgrey">
                <ShieldCheck className="w-4 h-4 text-olive mb-1" />
                <span className="text-[11px] font-bold text-brand-black leading-tight">
                  Across Pakistan
                </span>
                <span className="text-[10px] text-brand-grey">2-4 Days Delivery</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-olive mb-1" />
                <span className="text-[11px] font-bold text-brand-black leading-tight">
                  Easy Exchange
                </span>
                <span className="text-[10px] text-brand-grey">7 Days Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* BELOW: Product Description, Features, Specs, Shipping, Reviews (Tabs) */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-brand-lightgrey">
          {/* Tab Navigation */}
          <div className="flex border-b border-brand-lightgrey overflow-x-auto space-x-6 sm:space-x-8 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-3 border-b-2 transition-colors shrink-0 ${
                activeTab === "description"
                  ? "border-olive text-olive"
                  : "border-transparent text-brand-grey hover:text-brand-black"
              }`}
            >
              Product Description
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`pb-3 border-b-2 transition-colors shrink-0 ${
                activeTab === "features"
                  ? "border-olive text-olive"
                  : "border-transparent text-brand-grey hover:text-brand-black"
              }`}
            >
              Key Features
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-3 border-b-2 transition-colors shrink-0 ${
                activeTab === "specs"
                  ? "border-olive text-olive"
                  : "border-transparent text-brand-grey hover:text-brand-black"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`pb-3 border-b-2 transition-colors shrink-0 ${
                activeTab === "shipping"
                  ? "border-olive text-olive"
                  : "border-transparent text-brand-grey hover:text-brand-black"
              }`}
            >
              Shipping & Returns
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 border-b-2 transition-colors shrink-0 ${
                activeTab === "reviews"
                  ? "border-olive text-olive"
                  : "border-transparent text-brand-grey hover:text-brand-black"
              }`}
            >
              Customer Reviews ({product.reviewsCount})
            </button>
          </div>

          {/* Tab Content */}
          <div className="py-8 max-w-4xl">
            {activeTab === "description" && (
              <div className="prose prose-sm text-brand-grey leading-relaxed space-y-4">
                <p className="text-base text-brand-black font-medium">
                  {product.description}
                </p>
                <p>
                  Manufactured under strict quality standards in Pakistan to meet the extreme challenges of local climate conditions. Whether parking in intense sunlight, under dusty trees, or during monsoon cloudbursts, Super Safety Cover preserves the factory finish of your equipment.
                </p>
              </div>
            )}

            {activeTab === "features" && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-brand-offwhite border border-brand-lightgrey text-xs sm:text-sm text-brand-black font-medium"
                  >
                    <Check className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "specs" && (
              <div className="border border-brand-lightgrey rounded-lg overflow-hidden">
                <table className="w-full text-xs sm:text-sm text-left">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? "bg-brand-offwhite" : "bg-white"}
                      >
                        <td className="px-4 py-3 font-bold text-brand-black border-r border-brand-lightgrey w-1/3">
                          {key}
                        </td>
                        <td className="px-4 py-3 text-brand-grey">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4 text-xs sm:text-sm text-brand-grey leading-relaxed">
                <div className="p-4 rounded-lg bg-brand-offwhite border border-brand-lightgrey space-y-2">
                  <h4 className="font-bold text-brand-black flex items-center gap-2">
                    <Truck className="w-4 h-4 text-olive" />
                    <span>Cash on Delivery Nationwide</span>
                  </h4>
                  <p>
                    All parcels are shipped via tracked express courier (Trax, Leopard, or TCS). Delivery timeline is typically 2 to 4 working days across all major Pakistani cities and tehsils.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-brand-offwhite border border-brand-lightgrey space-y-2">
                  <h4 className="font-bold text-brand-black flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-olive" />
                    <span>7-Day Return & Exchange Policy</span>
                  </h4>
                  <p>
                    If the cover does not fit your motorcycle or appliance, we provide a smooth exchange or 100% refund. Simply message our WhatsApp support desk at +92 328 8985916.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-brand-offwhite border border-brand-lightgrey mb-6">
                  <div className="text-3xl font-extrabold text-brand-black">
                    {product.rating.toFixed(1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-olive">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-brand-grey">
                      Based on {product.reviewsCount} verified customer ratings
                    </span>
                  </div>
                </div>

                {/* Example review */}
                <div className="p-4 rounded-lg border border-brand-lightgrey space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-brand-black">
                        Adeel Khan
                      </span>
                      <span className="text-[11px] text-olive font-semibold bg-olive-soft px-2 py-0.5 rounded">
                        Verified Purchase
                      </span>
                    </div>
                    <span className="text-xs text-brand-grey">3 days ago</span>
                  </div>
                  <div className="flex items-center gap-1 text-olive">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-brand-grey leading-relaxed">
                    Fabric quality is truly superior compared to generic market parachute. Water beads right off and under-clip stops it from flying away in high winds.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* 8. & 12. WHATSAPP ORDER FORM MODAL                      */}
      {/* ======================================================= */}
      {isWhatsAppModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsWhatsAppModalOpen(false);
          }}
        >
          <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl border border-brand-lightgrey max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-brand-lightgrey">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-brand-black tracking-tight">
                  Complete Your Order
                </h3>
                <p className="text-xs text-brand-grey mt-0.5">
                  Enter your delivery details to confirm your order via WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="p-1.5 rounded-full text-brand-grey hover:text-brand-black hover:bg-brand-offwhite transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selected Product Summary Box */}
            <div className="my-4 p-3 bg-brand-offwhite rounded-lg border border-brand-lightgrey text-xs space-y-1">
              <div className="font-bold text-brand-black">{product.name}</div>
              <div className="text-brand-grey">
                {getVariantSummary()} • Qty: {quantity}
              </div>
              <div className="font-bold text-olive pt-1 border-t border-brand-lightgrey/60">
                Total: Rs. {(product.price * quantity).toLocaleString()} (Cash on Delivery)
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleWhatsAppFormSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-brand-black mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerForm.name}
                  onChange={(e) => {
                    setCustomerForm({ ...customerForm, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: "" });
                  }}
                  placeholder="e.g. Bilal Ahmed"
                  className={`w-full px-3.5 py-2.5 rounded-md border text-xs sm:text-sm text-brand-black outline-none transition-colors ${
                    formErrors.name
                      ? "border-red-500 focus:border-red-500 bg-red-50/30"
                      : "border-brand-lightgrey focus:border-olive bg-white"
                  }`}
                />
                {formErrors.name && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">
                    {formErrors.name}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-brand-black mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={customerForm.phone}
                  onChange={(e) => {
                    setCustomerForm({ ...customerForm, phone: e.target.value });
                    if (formErrors.phone) setFormErrors({ ...formErrors, phone: "" });
                  }}
                  placeholder="e.g. 0300 1234567"
                  className={`w-full px-3.5 py-2.5 rounded-md border text-xs sm:text-sm text-brand-black outline-none transition-colors ${
                    formErrors.phone
                      ? "border-red-500 focus:border-red-500 bg-red-50/30"
                      : "border-brand-lightgrey focus:border-olive bg-white"
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-brand-black mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerForm.city}
                  onChange={(e) => {
                    setCustomerForm({ ...customerForm, city: e.target.value });
                    if (formErrors.city) setFormErrors({ ...formErrors, city: "" });
                  }}
                  placeholder="e.g. Lahore, Karachi, Rawalpindi"
                  className={`w-full px-3.5 py-2.5 rounded-md border text-xs sm:text-sm text-brand-black outline-none transition-colors ${
                    formErrors.city
                      ? "border-red-500 focus:border-red-500 bg-red-50/30"
                      : "border-brand-lightgrey focus:border-olive bg-white"
                  }`}
                />
                {formErrors.city && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">
                    {formErrors.city}
                  </p>
                )}
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-bold text-brand-black mb-1">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={customerForm.address}
                  onChange={(e) => {
                    setCustomerForm({ ...customerForm, address: e.target.value });
                    if (formErrors.address) setFormErrors({ ...formErrors, address: "" });
                  }}
                  placeholder="House #, Street #, Mohallah / Area name, Landmark"
                  className={`w-full px-3.5 py-2 rounded-md border text-xs sm:text-sm text-brand-black outline-none transition-colors ${
                    formErrors.address
                      ? "border-red-500 focus:border-red-500 bg-red-50/30"
                      : "border-brand-lightgrey focus:border-olive bg-white"
                  }`}
                />
                {formErrors.address && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">
                    {formErrors.address}
                  </p>
                )}
              </div>

              {/* Order Notes (optional) */}
              <div>
                <label className="block text-xs font-bold text-brand-black mb-1">
                  Order Notes <span className="text-brand-grey font-normal">(optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={customerForm.notes}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, notes: e.target.value })
                  }
                  placeholder="Any landmark or special delivery instructions"
                  className="w-full px-3.5 py-2 rounded-md border border-brand-lightgrey bg-white text-xs sm:text-sm text-brand-black outline-none focus:border-olive"
                />
              </div>

              {/* Continue to WhatsApp Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-md bg-[#25D366] text-white font-bold text-sm hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99]"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>Continue to WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-brand-lightgrey p-3 px-4 shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-brand-grey uppercase block leading-tight">Total Price</span>
          <span className="text-base font-extrabold text-brand-black">
            Rs. {(product.price * quantity).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-1 max-w-[240px]">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3 px-3 rounded-md bg-olive text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="py-3 px-3 rounded-md bg-brand-black text-white font-bold text-xs flex items-center justify-center active:scale-95 transition-transform"
          >
            <Zap className="w-3.5 h-3.5 text-olive" />
          </button>
        </div>
      </div>
    </div>
  );
};
