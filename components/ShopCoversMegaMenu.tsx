"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data";

interface ShopCoversMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ColumnGroup {
  heading: string;
  items: { name: string; href: string }[];
}

interface CategoryData {
  title: string;
  description: string;
  viewAllHref: string;
  viewAllText: string;
  image: string;
  altText: string;
  col1: ColumnGroup;
  col2: ColumnGroup[];
}

const CATEGORY_PANELS: Record<string, CategoryData> = {
  "bike-covers": {
    title: "Bike Covers by Model",
    description: "Tailored fits for Honda, Yamaha, Suzuki and Universal bikes.",
    viewAllHref: "/bike-covers",
    viewAllText: "View All Bike Covers →",
    image: "/images/menu/bike-cover.webp",
    altText: "Super Safety Bike Cover tailored protection",
    col1: {
      heading: "HONDA",
      items: [
        { name: "Honda CD 70", href: "/bike-covers/honda-cd-70" },
        { name: "Honda CD 70 Dream", href: "/bike-covers/honda-cd-70-dream" },
        { name: "Honda Pridor", href: "/bike-covers/honda-pridor" },
        { name: "Honda CG 125", href: "/bike-covers/honda-cg-125" },
        { name: "Honda CG 125S", href: "/bike-covers/honda-cg-125s" },
        { name: "Honda CB 125F", href: "/bike-covers/honda-cb-125f" },
      ],
    },
    col2: [
      {
        heading: "YAMAHA",
        items: [
          { name: "Yamaha YBR 125", href: "/bike-covers/yamaha-ybr-125" },
          { name: "Yamaha YBR 125G", href: "/bike-covers/yamaha-ybr-125g" },
        ],
      },
      {
        heading: "SUZUKI",
        items: [
          { name: "Suzuki GD 110S", href: "/bike-covers/suzuki-gd-110s" },
          { name: "Suzuki GS 150", href: "/bike-covers/suzuki-gs-150" },
          { name: "Suzuki GSX 125", href: "/bike-covers/suzuki-gsx-125" },
          { name: "Suzuki GR 150", href: "/bike-covers/suzuki-gr-150" },
        ],
      },
    ],
  },
  "car-covers": {
    title: "Car Covers by Body Type",
    description: "Multi-layer all-weather protection tailored for sedans, hatchbacks and SUVs.",
    viewAllHref: "/car-covers",
    viewAllText: "View All Car Covers →",
    image: "/images/menu/car-cover.webp",
    altText: "Super Safety Car Cover vehicle protection",
    col1: {
      heading: "PASSENGER CARS",
      items: [
        { name: "Hatchback (Alto, Swift, Cultus)", href: "/car-covers" },
        { name: "Compact Sedan (City, Yaris, Alsvin)", href: "/car-covers" },
        { name: "Full Sedan (Corolla, Civic, Elantra)", href: "/car-covers" },
      ],
    },
    col2: [
      {
        heading: "SUVS & SPECIALTY",
        items: [
          { name: "Crossover (Sportage, Tucson, Vezel)", href: "/car-covers" },
          { name: "Large 4x4 (Fortuner, Prado, Revo)", href: "/car-covers" },
          { name: "Universal Elastic Car Cover", href: "/car-covers" },
        ],
      },
    ],
  },
  "washing-machine-covers": {
    title: "Washing Machine Covers by Style",
    description: "Water-repellent zippered covers that allow operation without removing the cover.",
    viewAllHref: "/washing-machine-covers",
    viewAllText: "View All Machine Covers →",
    image: "/images/menu/machine-cover.webp",
    altText: "Super Safety Washing Machine protective cover",
    col1: {
      heading: "MACHINE TYPE",
      items: [
        { name: "Top Load Automatic", href: "/washing-machine-covers" },
        { name: "Front Load Automatic", href: "/washing-machine-covers" },
        { name: "Twin Tub Semi-Automatic", href: "/washing-machine-covers" },
        { name: "Single Tub Spinner/Washer", href: "/washing-machine-covers" },
      ],
    },
    col2: [
      {
        heading: "CAPACITY",
        items: [
          { name: "7 – 8 KG Capacity", href: "/washing-machine-covers" },
          { name: "9 – 10 KG Capacity", href: "/washing-machine-covers" },
          { name: "12 KG Capacity", href: "/washing-machine-covers" },
          { name: "15 KG Jumbo Capacity", href: "/washing-machine-covers" },
        ],
      },
    ],
  },
  "ac-covers": {
    title: "AC Covers by Capacity & Unit",
    description: "Protective weather covers for indoor blowers and outdoor condenser units.",
    viewAllHref: "/ac-covers",
    viewAllText: "View All AC Covers →",
    image: "/images/menu/ac-cover.webp",
    altText: "Super Safety Split AC protective cover set",
    col1: {
      heading: "CAPACITY",
      items: [
        { name: "1.0 Ton Split Units", href: "/ac-covers" },
        { name: "1.5 Ton Split Units", href: "/ac-covers" },
        { name: "2.0 Ton Split Units", href: "/ac-covers" },
      ],
    },
    col2: [
      {
        heading: "UNIT CONFIGURATION",
        items: [
          { name: "Indoor Unit Cover", href: "/ac-covers" },
          { name: "Outdoor Compressor Cover", href: "/ac-covers" },
          { name: "Complete Dual Unit Set", href: "/ac-covers" },
        ],
      },
    ],
  },
  "rain-dress": {
    title: "Rain Dress (2-Piece Waterproof Suit)",
    description: "Hooded waterproof upper + matching waterproof trousers for bikers.",
    viewAllHref: "/rain-dress",
    viewAllText: "View All Rain Dress →",
    image: "/images/menu/rain-dress.webp",
    altText: "Super Safety 2-piece biker rain dress",
    col1: {
      heading: "AVAILABLE SIZES",
      items: [
        { name: "Small (S)", href: "/rain-dress" },
        { name: "Medium (M)", href: "/rain-dress" },
        { name: "Large (L)", href: "/rain-dress" },
      ],
    },
    col2: [
      {
        heading: "PLUS SIZES & EDITIONS",
        items: [
          { name: "Extra Large (XL)", href: "/rain-dress" },
          { name: "Double XL (XXL)", href: "/rain-dress" },
          { name: "Pro Commuter Breathable Mesh", href: "/rain-dress" },
        ],
      },
    ],
  },
  "mattress-covers": {
    title: "Mattress Covers by Bed Size",
    description: "100% waterproof and breathable fitted elastic mattress protectors.",
    viewAllHref: "/mattress-covers",
    viewAllText: "View All Mattress Covers →",
    image: "/images/menu/mattress-cover.webp",
    altText: "Super Safety fitted waterproof mattress protector",
    col1: {
      heading: "STANDARD SIZES",
      items: [
        { name: "Single Bed (39 x 75 in)", href: "/mattress-covers" },
        { name: "Double Bed (54 x 75 in)", href: "/mattress-covers" },
      ],
    },
    col2: [
      {
        heading: "MASTER BED SIZES",
        items: [
          { name: "Queen Bed (60 x 78 in)", href: "/mattress-covers" },
          { name: "King Bed (72 x 78 in)", href: "/mattress-covers" },
        ],
      },
    ],
  },
  "fan-covers": {
    title: "Fan Covers by Model",
    description: "Off-season washable dust guards for blades and motor bodies.",
    viewAllHref: "/fan-covers",
    viewAllText: "View All Fan Covers →",
    image: "/images/menu/fan-cover.webp",
    altText: "Super Safety ceiling and pedestal fan cover",
    col1: {
      heading: "CEILING FANS",
      items: [
        { name: "Ceiling Fan Set (Pack of 4)", href: "/fan-covers" },
        { name: "Blade Sleeves (Individual)", href: "/fan-covers" },
      ],
    },
    col2: [
      {
        heading: "STAND & WALL FANS",
        items: [
          { name: "Pedestal Floor Fan Cover", href: "/fan-covers" },
          { name: "Bracket Wall Fan Cover", href: "/fan-covers" },
          { name: "Table Fan Compact Cover", href: "/fan-covers" },
        ],
      },
    ],
  },
  "air-cooler-covers": {
    title: "Air Cooler Covers by Size",
    description: "Heavy-duty UV and rain shields for room and desert evaporative coolers.",
    viewAllHref: "/air-cooler-covers",
    viewAllText: "View All Cooler Covers →",
    image: "/images/menu/air-cooler-cover.webp",
    altText: "Super Safety evaporative air cooler protective cover",
    col1: {
      heading: "ROOM COOLERS",
      items: [
        { name: "Small Room Cooler", href: "/air-cooler-covers" },
        { name: "Medium Standard Cooler", href: "/air-cooler-covers" },
      ],
    },
    col2: [
      {
        heading: "DESERT COOLERS",
        items: [
          { name: "Large Desert Cooler", href: "/air-cooler-covers" },
          { name: "XL Jumbo Industrial Cooler", href: "/air-cooler-covers" },
        ],
      },
    ],
  },
};

export const ShopCoversMegaMenu: React.FC<ShopCoversMegaMenuProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string>("bike-covers");

  const currentPanel = CATEGORY_PANELS[activeCategory] || CATEGORY_PANELS["bike-covers"];

  return (
    <div
      className={`absolute top-full left-0 w-full bg-white border-b border-brand-lightgrey shadow-md z-50 transition-all duration-200 ${
        isOpen
          ? "opacity-100 visible pointer-events-auto translate-y-0"
          : "opacity-0 invisible pointer-events-none -translate-y-1"
      }`}
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 py-7">
        <div className="flex gap-8">
          {/* LEFT COLUMN: Main Category List */}
          <div className="w-56 shrink-0 border-r border-brand-lightgrey pr-6">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-brand-grey mb-3 px-2">
              All Protective Covers
            </h3>
            <ul className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveCategory(cat.slug)}
                      onClick={() => setActiveCategory(cat.slug)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-bold transition-colors text-left ${
                        isActive
                          ? "bg-olive-soft text-olive"
                          : "text-brand-black hover:text-olive hover:bg-brand-offwhite"
                      }`}
                    >
                      <span>{cat.name}</span>
                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-olive shrink-0" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT AREA: Exact Reference Layout */}
          <div className="flex-1 min-w-0">
            {/* Top Row: Title, Short Description, View All Link */}
            <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-brand-lightgrey">
              <div>
                <h4 className="text-base font-extrabold text-brand-black tracking-tight">
                  {currentPanel.title}
                </h4>
                <p className="text-xs text-brand-grey mt-0.5">
                  {currentPanel.description}
                </p>
              </div>
              <Link
                href={currentPanel.viewAllHref}
                onClick={onClose}
                className="text-xs font-bold text-olive hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>{currentPanel.viewAllText}</span>
              </Link>
            </div>

            {/* Below: Column 1 | Column 2 | Right Side Product Image */}
            <div className="grid grid-cols-12 gap-8 items-start">
              {/* COLUMN 1 */}
              <div className="col-span-4">
                <div className="text-xs font-bold text-brand-black uppercase tracking-wider mb-2.5 pb-1 border-b border-brand-lightgrey">
                  {currentPanel.col1.heading}
                </div>
                <ul className="space-y-2 text-xs">
                  {currentPanel.col1.items.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block py-0.5 text-brand-black hover:text-olive font-medium transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COLUMN 2 */}
              <div className="col-span-4 space-y-6">
                {currentPanel.col2.map((group, gIdx) => (
                  <div key={gIdx}>
                    <div className="text-xs font-bold text-brand-black uppercase tracking-wider mb-2.5 pb-1 border-b border-brand-lightgrey">
                      {group.heading}
                    </div>
                    <ul className="space-y-2 text-xs">
                      {group.items.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="block py-0.5 text-brand-black hover:text-olive font-medium transition-colors"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* RIGHT SIDE: LARGE CLEAN PRODUCT IMAGE */}
              <div className="col-span-4 flex items-center justify-center self-stretch">
                <Link
                  href={currentPanel.viewAllHref}
                  onClick={onClose}
                  className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-white rounded-xl border border-brand-lightgrey/60 overflow-hidden group transition-colors hover:border-olive/40"
                >
                  <div className="relative w-full h-full p-2 flex items-center justify-center">
                    <Image
                      src={currentPanel.image}
                      alt={currentPanel.altText}
                      fill
                      priority
                      className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 1280px) 360px, 420px"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
