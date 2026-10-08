"use client";

import React, { useState, useEffect, useMemo } from "react";
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
import { PRODUCTS } from "@/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { CustomerReviews } from "@/components/CustomerReviews";
import { getProductDescription } from "@/data/productDescriptions";
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

// Final 6 universal color variants for EVERY product
export const PRODUCT_COLORS: ColorOption[] = [
  { name: "Green", hex: "#2E5A36" },
  { name: "Black", hex: "#1A1A1A" },
  { name: "Maroon", hex: "#6B1D2F" },
  { name: "Purple", hex: "#4E2A5E" },
  { name: "Navy", hex: "#1B2A4A" },
  { name: "Blue Grey", hex: "#5B6E7D" },
];

export interface CategoryMeasurementConfig {
  modelLabel: string;
  modelPlaceholder: string;
  dim1Label: string;
  dim1PlaceholderInches: string;
  dim1PlaceholderCm: string;
  dim2Label: string;
  dim2PlaceholderInches: string;
  dim2PlaceholderCm: string;
  dim3Label: string;
  dim3PlaceholderInches: string;
  dim3PlaceholderCm: string;
  notesPlaceholder: string;
}

export const CATEGORY_MEASUREMENT_CONFIGS: Record<string, CategoryMeasurementConfig> = {
  "bike-covers": {
    modelLabel: "Bike Model",
    modelPlaceholder: "e.g. Honda CD 70, Suzuki GR 150, Yamaha YBR, etc.",
    dim1Label: "Length",
    dim1PlaceholderInches: "e.g. 78",
    dim1PlaceholderCm: "e.g. 190",
    dim2Label: "Width",
    dim2PlaceholderInches: "e.g. 32",
    dim2PlaceholderCm: "e.g. 85",
    dim3Label: "Height",
    dim3PlaceholderInches: "e.g. 45",
    dim3PlaceholderCm: "e.g. 115",
    notesPlaceholder: "e.g. Side carrier boxes, high windshield, crash guard installed",
  },
  "car-covers": {
    modelLabel: "Car Model",
    modelPlaceholder: "e.g. Toyota Corolla, Honda Civic, Suzuki Alto, etc.",
    dim1Label: "Length",
    dim1PlaceholderInches: "e.g. 175",
    dim1PlaceholderCm: "e.g. 445",
    dim2Label: "Width",
    dim2PlaceholderInches: "e.g. 68",
    dim2PlaceholderCm: "e.g. 173",
    dim3Label: "Height",
    dim3PlaceholderInches: "e.g. 58",
    dim3PlaceholderCm: "e.g. 147",
    notesPlaceholder: "e.g. Rear spoiler, body kit, roof rack installed",
  },
  "ac-covers": {
    modelLabel: "AC Type",
    modelPlaceholder: "e.g. 1.5 Ton Gree Inverter, Standing AC, Floor AC, etc.",
    dim1Label: "Width",
    dim1PlaceholderInches: "e.g. 38",
    dim1PlaceholderCm: "e.g. 96",
    dim2Label: "Height",
    dim2PlaceholderInches: "e.g. 12",
    dim2PlaceholderCm: "e.g. 30",
    dim3Label: "Depth",
    dim3PlaceholderInches: "e.g. 9",
    dim3PlaceholderCm: "e.g. 23",
    notesPlaceholder: "e.g. Extra piping clearance on left/right side",
  },
  "washing-machine-covers": {
    modelLabel: "Machine Type",
    modelPlaceholder: "e.g. Haier 12KG Top Load, Dawlance Front Load, etc.",
    dim1Label: "Width",
    dim1PlaceholderInches: "e.g. 24",
    dim1PlaceholderCm: "e.g. 60",
    dim2Label: "Height",
    dim2PlaceholderInches: "e.g. 36",
    dim2PlaceholderCm: "e.g. 90",
    dim3Label: "Depth",
    dim3PlaceholderInches: "e.g. 24",
    dim3PlaceholderCm: "e.g. 60",
    notesPlaceholder: "e.g. Top transparent zipper window or rear pipe clearance",
  },
  "mattress-covers": {
    modelLabel: "Mattress Type",
    modelPlaceholder: "e.g. Master MoltyFoam, Custom Orthopedic, Single XL, etc.",
    dim1Label: "Length",
    dim1PlaceholderInches: "e.g. 78",
    dim1PlaceholderCm: "e.g. 198",
    dim2Label: "Width",
    dim2PlaceholderInches: "e.g. 72",
    dim2PlaceholderCm: "e.g. 183",
    dim3Label: "Thickness",
    dim3PlaceholderInches: "e.g. 8",
    dim3PlaceholderCm: "e.g. 20",
    notesPlaceholder: "e.g. Extra deep pillow-top pocket needed",
  },
  "fan-covers": {
    modelLabel: "Fan Type",
    modelPlaceholder: "e.g. Vintage Pak Fan, Exhaust Fan, Industrial Pedestal, etc.",
    dim1Label: "Diameter",
    dim1PlaceholderInches: "e.g. 56",
    dim1PlaceholderCm: "e.g. 142",
    dim2Label: "Height",
    dim2PlaceholderInches: "e.g. 18",
    dim2PlaceholderCm: "e.g. 45",
    dim3Label: "Base Size",
    dim3PlaceholderInches: "e.g. 12",
    dim3PlaceholderCm: "e.g. 30",
    notesPlaceholder: "e.g. Heavy motor canopy or special blade curve",
  },
  "air-cooler-covers": {
    modelLabel: "Cooler Type",
    modelPlaceholder: "e.g. Super Asia Room Cooler, Boss Desert Cooler, etc.",
    dim1Label: "Width",
    dim1PlaceholderInches: "e.g. 32",
    dim1PlaceholderCm: "e.g. 81",
    dim2Label: "Height",
    dim2PlaceholderInches: "e.g. 48",
    dim2PlaceholderCm: "e.g. 122",
    dim3Label: "Depth",
    dim3PlaceholderInches: "e.g. 28",
    dim3PlaceholderCm: "e.g. 71",
    notesPlaceholder: "e.g. Wheels attached, rear water pipe clearance",
  },
  "rain-dress": {
    modelLabel: "Fit / Suit Type",
    modelPlaceholder: "e.g. Slim Fit, Regular Over-Clothes Fit, etc.",
    dim1Label: "Chest",
    dim1PlaceholderInches: "e.g. 44",
    dim1PlaceholderCm: "e.g. 112",
    dim2Label: "Waist",
    dim2PlaceholderInches: "e.g. 36",
    dim2PlaceholderCm: "e.g. 91",
    dim3Label: "Height",
    dim3PlaceholderInches: "e.g. 68",
    dim3PlaceholderCm: "e.g. 172",
    notesPlaceholder: "e.g. Extended sleeve length, helmet-compatible hood",
  },
};

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

  // Custom Size Measurements State (for ALL Products)
  const [customSize, setCustomSize] = useState({
    modelName: "",
    dim1: "",
    dim2: "",
    dim3: "",
    unit: "inches" as "inches" | "cm",
    notes: "",
  });
  const [customSizeErrors, setCustomSizeErrors] = useState<Record<string, string>>({});

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // Validation & feedback state
  const [variantError, setVariantError] = useState<string>("");
  const [addedNotice, setAddedNotice] = useState(false);

  // Unique tailored product description & features
  const productDescriptionData = useMemo(
    () => getProductDescription(product.slug, product.category),
    [product.slug, product.category]
  );

  // 4 related products excluding current product
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product.id]);

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

  // Universal color options for this product
  const colorOptions = PRODUCT_COLORS;

  // Initialize default color if not set
  useEffect(() => {
    if (!selectedColor && PRODUCT_COLORS.length > 0) {
      setSelectedColor(PRODUCT_COLORS[0].name);
    }
  }, [selectedColor]);

  // Default variant initialization for AC covers
  useEffect(() => {
    if (product.category === "ac-covers") {
      if (!selectedAcSize) setSelectedAcSize("1.5 Ton");
      if (!selectedUnitType) setSelectedUnitType("Indoor Unit");
    }
  }, [product.category, selectedAcSize, selectedUnitType]);

  // Bike models list
  const bikeModelsList = [
    { name: "Honda CD 70", available: true },
    { name: "Honda CG 125", available: true },
    { name: "Yamaha YBR 125", available: true },
    { name: "Suzuki GS 150", available: true },
    { name: "Universal Fit", available: true },
    { name: "Custom Size", available: true },
  ];
  if (product.bikeModel && !bikeModelsList.some((bm) => bm.name === product.bikeModel)) {
    bikeModelsList.splice(4, 0, { name: product.bikeModel, available: true });
  }

  // Check if Custom Size is currently selected across ANY category
  const isCustomSizeActive =
    (product.category === "bike-covers" && selectedModel === "Custom Size") ||
    (product.category === "car-covers" && selectedSize === "Custom Size") ||
    (product.category === "ac-covers" && selectedAcSize === "Custom Size") ||
    (product.category === "washing-machine-covers" && selectedCapacity === "Custom Size") ||
    (product.category === "mattress-covers" && selectedSize === "Custom Size") ||
    (product.category === "fan-covers" && selectedFanSize === "Custom Size") ||
    (product.category === "air-cooler-covers" && selectedSize === "Custom Size") ||
    (product.category === "rain-dress" && selectedSize === "Custom Size") ||
    (!isBikeProduct && selectedSize === "Custom Size");

  // Variant validation function
  const validateVariants = (): boolean => {
    if (!selectedColor) {
      setVariantError("Please select a color.");
      return false;
    }

    const config =
      CATEGORY_MEASUREMENT_CONFIGS[product.category] ||
      CATEGORY_MEASUREMENT_CONFIGS["bike-covers"];

    if (isCustomSizeActive) {
      const errors: Record<string, string> = {};
      if (!customSize.modelName.trim()) {
        errors.modelName = `Please enter ${config.modelLabel}.`;
      }
      if (!customSize.dim1.trim()) {
        errors.dim1 = `${config.dim1Label} is required.`;
      }
      if (!customSize.dim2.trim()) {
        errors.dim2 = `${config.dim2Label} is required.`;
      }
      if (!customSize.dim3.trim()) {
        errors.dim3 = `${config.dim3Label} is required.`;
      }

      if (Object.keys(errors).length > 0) {
        setCustomSizeErrors(errors);
        setVariantError(
          `Please fill in required custom measurements (${config.modelLabel}, ${config.dim1Label}, ${config.dim2Label}, ${config.dim3Label}).`
        );
        return false;
      }

      setVariantError("");
      return true;
    }

    if (product.category === "bike-covers") {
      if (!selectedModel) {
        setVariantError("Please select your bike model.");
        return false;
      }
    } else if (product.category === "washing-machine-covers") {
      if (!selectedMachineType || !selectedCapacity) {
        setVariantError("Please select your machine type and capacity.");
        return false;
      }
    } else if (product.category === "ac-covers") {
      if (!selectedAcSize || !selectedUnitType) {
        setVariantError("Please select your AC size and unit type.");
        return false;
      }
    } else if (product.category === "mattress-covers") {
      if (!selectedSize) {
        setVariantError("Please select your mattress size.");
        return false;
      }
    } else if (product.category === "fan-covers") {
      if (!selectedFanType || !selectedFanSize) {
        setVariantError("Please select your fan type and size.");
        return false;
      }
    } else if (product.category === "air-cooler-covers") {
      if (!selectedSize) {
        setVariantError("Please select your cooler size.");
        return false;
      }
    } else if (product.category === "rain-dress") {
      if (!selectedSize) {
        setVariantError("Please select your size.");
        return false;
      }
    } else if (product.category === "car-covers") {
      if (!selectedSize) {
        setVariantError("Please select your car size.");
        return false;
      }
    } else if (product.sizes && product.sizes.length > 0) {
      if (!selectedSize) {
        setVariantError("Please select a size.");
        return false;
      }
    }

    setVariantError("");
    return true;
  };

  // Generate variant summary for cart and checkout synchronization
  const getVariantSummary = (): string => {
    const config =
      CATEGORY_MEASUREMENT_CONFIGS[product.category] ||
      CATEGORY_MEASUREMENT_CONFIGS["bike-covers"];

    if (isCustomSizeActive) {
      const notesPart = customSize.notes.trim() ? ` | Notes: ${customSize.notes.trim()}` : "";
      return `Variant: Custom Size | ${config.modelLabel}: ${customSize.modelName.trim()} | Color: ${selectedColor} | ${config.dim1Label}: ${customSize.dim1.trim()} ${customSize.unit}, ${config.dim2Label}: ${customSize.dim2.trim()} ${customSize.unit}, ${config.dim3Label}: ${customSize.dim3.trim()} ${customSize.unit}${notesPart}`;
    }

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
      return `Car Size: ${selectedSize} | Color: ${selectedColor}`;
    }
    return `Color: ${selectedColor}${selectedSize ? ` | Size: ${selectedSize}` : ""}`;
  };

  const handleAddToCart = () => {
    if (!validateVariants()) return;

    const config =
      CATEGORY_MEASUREMENT_CONFIGS[product.category] ||
      CATEGORY_MEASUREMENT_CONFIGS["bike-covers"];

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
      customMeasurements: isCustomSizeActive
        ? {
            productTypeOrModel: customSize.modelName.trim(),
            dim1Label: config.dim1Label,
            dim1Value: customSize.dim1.trim(),
            dim2Label: config.dim2Label,
            dim2Value: customSize.dim2.trim(),
            dim3Label: config.dim3Label,
            dim3Value: customSize.dim3.trim(),
            unit: customSize.unit,
            notes: customSize.notes.trim() || undefined,
            bikeModel: customSize.modelName.trim(),
            length: customSize.dim1.trim(),
            width: customSize.dim2.trim(),
            height: customSize.dim3.trim(),
          }
        : undefined,
      variantSummary: getVariantSummary(),
      quantity,
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    if (!validateVariants()) return;

    const config =
      CATEGORY_MEASUREMENT_CONFIGS[product.category] ||
      CATEGORY_MEASUREMENT_CONFIGS["bike-covers"];

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
      customMeasurements: isCustomSizeActive
        ? {
            productTypeOrModel: customSize.modelName.trim(),
            dim1Label: config.dim1Label,
            dim1Value: customSize.dim1.trim(),
            dim2Label: config.dim2Label,
            dim2Value: customSize.dim2.trim(),
            dim3Label: config.dim3Label,
            dim3Value: customSize.dim3.trim(),
            unit: customSize.unit,
            notes: customSize.notes.trim() || undefined,
            bikeModel: customSize.modelName.trim(),
            length: customSize.dim1.trim(),
            width: customSize.dim2.trim(),
            height: customSize.dim3.trim(),
          }
        : undefined,
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
    const config =
      CATEGORY_MEASUREMENT_CONFIGS[product.category] ||
      CATEGORY_MEASUREMENT_CONFIGS["bike-covers"];

    if (isCustomSizeActive) {
      variantLines.push(`Variant: Custom Size`);
      variantLines.push(`${config.modelLabel}: ${customSize.modelName.trim()}`);
      variantLines.push(`Color: ${selectedColor}`);
      variantLines.push(`${config.dim1Label}: ${customSize.dim1.trim()} ${customSize.unit}`);
      variantLines.push(`${config.dim2Label}: ${customSize.dim2.trim()} ${customSize.unit}`);
      variantLines.push(`${config.dim3Label}: ${customSize.dim3.trim()} ${customSize.unit}`);
      if (customSize.notes.trim()) {
        variantLines.push(`Additional Notes: ${customSize.notes.trim()}`);
      }
      variantLines.push(`Quantity: ${quantity}`);
      variantLines.push(`Price: Rs. ${(product.price * quantity).toLocaleString()}`);
    } else {
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
    }

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

  // Render dynamic custom measurement form based on category
  const renderCustomMeasurementForm = () => {
    const config =
      CATEGORY_MEASUREMENT_CONFIGS[product.category] ||
      CATEGORY_MEASUREMENT_CONFIGS["bike-covers"];

    return (
      <div className="mt-3.5 p-3.5 sm:p-4 rounded-xl bg-[#FAF9F5] border border-[#D8D2C5]">
        <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#E8E4DA]">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-brand-black flex items-center gap-1.5">
              <span>Custom Size Measurements</span>
            </h4>
            <p className="text-[11px] text-brand-grey mt-0.5">
              Enter your specifications for a custom made-to-order cover.
            </p>
          </div>

          {/* Unit Selector Toggle (Inches / cm) */}
          <div className="flex items-center gap-1 bg-white border border-[#D8D2C5] p-0.5 rounded-md shrink-0">
            <button
              type="button"
              onClick={() => setCustomSize((prev) => ({ ...prev, unit: "inches" }))}
              className={`px-2.5 py-1 text-[11px] font-bold rounded transition-colors ${
                customSize.unit === "inches"
                  ? "bg-olive text-white shadow-xs"
                  : "text-brand-grey hover:text-brand-black"
              }`}
            >
              Inches
            </button>
            <button
              type="button"
              onClick={() => setCustomSize((prev) => ({ ...prev, unit: "cm" }))}
              className={`px-2.5 py-1 text-[11px] font-bold rounded transition-colors ${
                customSize.unit === "cm"
                  ? "bg-olive text-white shadow-xs"
                  : "text-brand-grey hover:text-brand-black"
              }`}
            >
              cm
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {/* Model / Type Name * */}
          <div>
            <label className="block text-[11px] font-bold text-brand-black uppercase tracking-wider mb-1">
              {config.modelLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customSize.modelName}
              onChange={(e) => {
                setCustomSize((prev) => ({ ...prev, modelName: e.target.value }));
                if (customSizeErrors.modelName) {
                  setCustomSizeErrors((prev) => ({ ...prev, modelName: "" }));
                }
                setVariantError("");
              }}
              placeholder={config.modelPlaceholder}
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-md border bg-white text-brand-black placeholder-gray-400 focus:outline-none transition-colors ${
                customSizeErrors.modelName
                  ? "border-red-500 focus:border-red-500"
                  : "border-brand-lightgrey focus:border-olive"
              }`}
            />
            {customSizeErrors.modelName && (
              <span className="text-[10px] text-red-500 mt-1 block font-medium">
                {customSizeErrors.modelName}
              </span>
            )}
          </div>

          {/* 3 Dimension Fields */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* Dim 1 */}
            <div>
              <label className="block text-[11px] font-bold text-brand-black uppercase tracking-wider mb-1 truncate">
                {config.dim1Label} ({customSize.unit}) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={customSize.dim1}
                onChange={(e) => {
                  setCustomSize((prev) => ({ ...prev, dim1: e.target.value }));
                  if (customSizeErrors.dim1) {
                    setCustomSizeErrors((prev) => ({ ...prev, dim1: "" }));
                  }
                  setVariantError("");
                }}
                placeholder={
                  customSize.unit === "inches"
                    ? config.dim1PlaceholderInches
                    : config.dim1PlaceholderCm
                }
                className={`w-full px-2.5 sm:px-3 py-2 text-xs sm:text-sm rounded-md border bg-white text-brand-black placeholder-gray-400 focus:outline-none transition-colors ${
                  customSizeErrors.dim1
                    ? "border-red-500 focus:border-red-500"
                    : "border-brand-lightgrey focus:border-olive"
                }`}
              />
              {customSizeErrors.dim1 && (
                <span className="text-[10px] text-red-500 mt-1 block font-medium">
                  {customSizeErrors.dim1}
                </span>
              )}
            </div>

            {/* Dim 2 */}
            <div>
              <label className="block text-[11px] font-bold text-brand-black uppercase tracking-wider mb-1 truncate">
                {config.dim2Label} ({customSize.unit}) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={customSize.dim2}
                onChange={(e) => {
                  setCustomSize((prev) => ({ ...prev, dim2: e.target.value }));
                  if (customSizeErrors.dim2) {
                    setCustomSizeErrors((prev) => ({ ...prev, dim2: "" }));
                  }
                  setVariantError("");
                }}
                placeholder={
                  customSize.unit === "inches"
                    ? config.dim2PlaceholderInches
                    : config.dim2PlaceholderCm
                }
                className={`w-full px-2.5 sm:px-3 py-2 text-xs sm:text-sm rounded-md border bg-white text-brand-black placeholder-gray-400 focus:outline-none transition-colors ${
                  customSizeErrors.dim2
                    ? "border-red-500 focus:border-red-500"
                    : "border-brand-lightgrey focus:border-olive"
                }`}
              />
              {customSizeErrors.dim2 && (
                <span className="text-[10px] text-red-500 mt-1 block font-medium">
                  {customSizeErrors.dim2}
                </span>
              )}
            </div>

            {/* Dim 3 */}
            <div>
              <label className="block text-[11px] font-bold text-brand-black uppercase tracking-wider mb-1 truncate">
                {config.dim3Label} ({customSize.unit}) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={customSize.dim3}
                onChange={(e) => {
                  setCustomSize((prev) => ({ ...prev, dim3: e.target.value }));
                  if (customSizeErrors.dim3) {
                    setCustomSizeErrors((prev) => ({ ...prev, dim3: "" }));
                  }
                  setVariantError("");
                }}
                placeholder={
                  customSize.unit === "inches"
                    ? config.dim3PlaceholderInches
                    : config.dim3PlaceholderCm
                }
                className={`w-full px-2.5 sm:px-3 py-2 text-xs sm:text-sm rounded-md border bg-white text-brand-black placeholder-gray-400 focus:outline-none transition-colors ${
                  customSizeErrors.dim3
                    ? "border-red-500 focus:border-red-500"
                    : "border-brand-lightgrey focus:border-olive"
                }`}
              />
              {customSizeErrors.dim3 && (
                <span className="text-[10px] text-red-500 mt-1 block font-medium">
                  {customSizeErrors.dim3}
                </span>
              )}
            </div>
          </div>

          {/* Additional Notes (optional) */}
          <div>
            <label className="block text-[11px] font-bold text-brand-black uppercase tracking-wider mb-1">
              Additional Notes <span className="text-gray-400 font-normal normal-case">(optional)</span>
            </label>
            <input
              type="text"
              value={customSize.notes}
              onChange={(e) =>
                setCustomSize((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder={config.notesPlaceholder}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-md border border-brand-lightgrey bg-white text-brand-black placeholder-gray-400 focus:outline-none focus:border-olive transition-colors"
            />
          </div>
        </div>
      </div>
    );
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
                          setCustomSizeErrors({});
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

                {/* Custom Size Measurement Form (rendered only when Custom Size is selected) */}
                {selectedModel === "Custom Size" && renderCustomMeasurementForm()}
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
                    {["7 - 8 KG", "9 - 10 KG", "11 - 14 KG", "Custom Size"].map((cap) => (
                      <button
                        key={cap}
                        type="button"
                        onClick={() => {
                          setSelectedCapacity(cap);
                          setVariantError("");
                          setCustomSizeErrors({});
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

                {selectedCapacity === "Custom Size" && renderCustomMeasurementForm()}
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
                    {["1.0 Ton", "1.5 Ton", "2.0 Ton", "Custom Size"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setSelectedAcSize(size);
                          setVariantError("");
                          setCustomSizeErrors({});
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

                {selectedAcSize === "Custom Size" && renderCustomMeasurementForm()}
              </div>
            )}

            {/* D. Mattress Covers Variants */}
            {product.category === "mattress-covers" && (
              <div className="mb-5">
                <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                  Select Size <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Single Bed", "Queen Size", "King Size", "Custom Size"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setSelectedSize(sz);
                        setVariantError("");
                        setCustomSizeErrors({});
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

                {selectedSize === "Custom Size" && renderCustomMeasurementForm()}
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
                    {["Standard 56\"", "Large 60\"", "Custom Size"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setSelectedFanSize(s);
                          setVariantError("");
                          setCustomSizeErrors({});
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

                {selectedFanSize === "Custom Size" && renderCustomMeasurementForm()}
              </div>
            )}

            {/* F. Air Cooler Covers Variants */}
            {product.category === "air-cooler-covers" && (
              <div className="mb-5">
                <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                  Select Size <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Medium Room Cooler", "Jumbo / Desert Cooler", "Custom Size"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setSelectedSize(sz);
                        setVariantError("");
                        setCustomSizeErrors({});
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

                {selectedSize === "Custom Size" && renderCustomMeasurementForm()}
              </div>
            )}

            {/* G. Rain Dress Variants */}
            {product.category === "rain-dress" && (
              <div className="mb-5">
                <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                  Select Size <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Medium", "Large", "XL", "XXL", "Custom Size"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setSelectedSize(sz);
                        setVariantError("");
                        setCustomSizeErrors({});
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

                {selectedSize === "Custom Size" && renderCustomMeasurementForm()}
              </div>
            )}

            {/* H. Car Covers Variants */}
            {product.category === "car-covers" && (
              <div className="mb-5">
                <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                  Select Body Type / Size <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Hatchback", "Sedan", "SUV / Crossover", "Custom Size"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setSelectedSize(sz);
                        setVariantError("");
                        setCustomSizeErrors({});
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

                {selectedSize === "Custom Size" && renderCustomMeasurementForm()}
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
                    {[...product.sizes.map((s) => s.name), "Custom Size"].map((szName) => (
                      <button
                        key={szName}
                        type="button"
                        onClick={() => {
                          setSelectedSize(szName);
                          setVariantError("");
                          setCustomSizeErrors({});
                        }}
                        className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                          selectedSize === szName
                            ? "bg-olive text-white border-olive shadow-xs"
                            : "bg-white text-brand-black border-brand-lightgrey hover:border-olive"
                        }`}
                      >
                        {szName}
                      </button>
                    ))}
                  </div>

                  {selectedSize === "Custom Size" && renderCustomMeasurementForm()}
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
                      title={c.name}
                      aria-label={`Select ${c.name} color`}
                      onClick={() => {
                        setSelectedColor(c.name);
                        setVariantError("");
                      }}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold border transition-all ${
                        isSelected
                          ? "border-olive ring-2 ring-olive/25 bg-olive-soft/40 text-brand-black shadow-xs"
                          : "border-brand-lightgrey bg-white text-brand-black hover:border-olive/60"
                      }`}
                    >
                      <span
                        className="relative flex items-center justify-center w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-2xs"
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                        )}
                      </span>
                      <span>{c.name}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-olive shrink-0 ml-0.5" />
                      )}
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

        {/* ======================================================= */}
        {/* 1. PRODUCT DESCRIPTION (Clean direct section, no tabs)  */}
        {/* ======================================================= */}
        <section className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-brand-lightgrey" aria-labelledby="product-description-heading">
          <div className="max-w-3xl">
            <h2 id="product-description-heading" className="text-xl sm:text-2xl font-bold text-[#121212] tracking-tight mb-3">
              Product Description
            </h2>

            {/* Short product description paragraph (3–4 lines maximum) */}
            <p className="text-sm sm:text-base text-[#121212] leading-relaxed mb-6">
              {productDescriptionData.paragraph}
            </p>

            {/* Heading: KEY POINTS */}
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#66743A] mb-3">
              KEY POINTS
            </h3>

            {/* Small concise bullet points */}
            <ul className="space-y-2 sm:space-y-2.5">
              {productDescriptionData.bullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#121212] leading-normal"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#66743A] mt-2 shrink-0" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ======================================================= */}
        {/* 2. RELATED PRODUCTS (4 items, excluding current)        */}
        {/* ======================================================= */}
        <section className="mt-16 md:mt-20 pt-10 border-t border-brand-lightgrey" aria-labelledby="related-products-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1.5 block">
                Explore More Protection
              </span>
              <h2 id="related-products-heading" className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight">
                Related Products
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-brand-grey">
              Frequently paired protective covers across Pakistan
            </p>
          </div>

          {/* Responsive Grid: Desktop 4 cards, Tablet 2-3 cards, Mobile 2 cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>

        {/* ======================================================= */}
        {/* 3. CUSTOMER REVIEWS (Clean responsive carousel)          */}
        {/* ======================================================= */}
        <div className="mt-16 md:mt-20 -mx-4 sm:-mx-6 lg:-mx-8">
          <CustomerReviews
            title="Customer Reviews"
            badge="Verified Feedback"
            subtitle={`What customers across Pakistan say about our protective covers`}
            bgClassName="bg-[#F4F3ED]"
            categoryFilter={product.category}
          />
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
                  Full Name (مکمل نام) <span className="text-red-500">*</span>
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
                  Phone Number (فون نمبر) <span className="text-red-500">*</span>
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
                  City (شہر) <span className="text-red-500">*</span>
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
                  Delivery Address (ڈیلیوری ایڈریس) <span className="text-red-500">*</span>
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
                  Order Notes (آرڈر نوٹس) <span className="text-brand-grey font-normal">(Optional)</span>
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
