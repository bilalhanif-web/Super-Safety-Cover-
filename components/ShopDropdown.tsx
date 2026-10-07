"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data";

interface ShopDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShopDropdown: React.FC<ShopDropdownProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 mt-1 w-72 bg-white border border-brand-lightgrey rounded-xl shadow-xl py-2.5 z-50 transition-all duration-150 animate-in fade-in slide-in-from-top-1"
      onMouseLeave={onClose}
    >
      <div className="px-4 py-1.5 mb-1.5 border-b border-brand-lightgrey flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-brand-grey">
        <span>Categories</span>
        <Link
          href="/shop"
          onClick={onClose}
          className="text-olive hover:underline normal-case text-xs font-semibold"
        >
          All Products &rarr;
        </Link>
      </div>

      <ul className="space-y-0.5 px-2">
        {CATEGORIES.map((cat) => (
          <li key={cat.id}>
            <Link
              href={`/${cat.slug}`}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-brand-black hover:text-olive hover:bg-brand-offwhite transition-colors group"
            >
              <span>{cat.name}</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-lightgrey group-hover:text-olive group-hover:translate-x-0.5 transition-all" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
