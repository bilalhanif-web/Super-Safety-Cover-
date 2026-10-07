"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  ChevronDown,
} from "lucide-react";
import { Logo } from "./Logo";
import { ShopCoversMegaMenu } from "./ShopCoversMegaMenu";
import { MobileMenu } from "./MobileMenu";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenAccount }) => {
  const pathname = usePathname();
  const { totalQuantity, setIsCartOpen } = useCart();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const megaMenuContainerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 120);
  };

  const isShopActive =
    megaMenuOpen ||
    pathname.includes("-covers") ||
    pathname === "/rain-dress" ||
    pathname === "/shop";

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white border-b border-[#D8D2C5] transition-shadow ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile: Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-brand-black hover:text-olive focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* LEFT: Logo */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* CENTER MENU (Desktop: Home | Shop Covers ▼ | Best Sellers | About Us | Contact Us | Blog) */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8 text-sm font-semibold text-brand-black">
              {/* 1. Home */}
              <Link
                href="/"
                className={`py-2 transition-colors hover:text-olive ${
                  pathname === "/" ? "text-olive font-bold" : ""
                }`}
              >
                Home
              </Link>

              {/* 2. Shop Covers ▼ (Mega Menu Trigger) */}
              <div
                ref={megaMenuContainerRef}
                className="relative py-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                  className={`inline-flex items-center gap-1 transition-colors hover:text-olive ${
                    isShopActive ? "text-olive font-bold" : ""
                  }`}
                  aria-expanded={megaMenuOpen}
                >
                  <span>Shop Covers</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      megaMenuOpen ? "rotate-180 text-olive" : "text-brand-grey"
                    }`}
                  />
                </button>
              </div>

              {/* 3. About Us */}
              <Link
                href="/about"
                className={`py-2 transition-colors hover:text-olive ${
                  pathname === "/about" ? "text-olive font-bold" : ""
                }`}
              >
                About Us
              </Link>

              {/* 5. Contact Us */}
              <Link
                href="/contact"
                className={`py-2 transition-colors hover:text-olive ${
                  pathname === "/contact" ? "text-olive font-bold" : ""
                }`}
              >
                Contact Us
              </Link>

              {/* 6. Blog */}
              <Link
                href="/blog"
                className={`py-2 transition-colors hover:text-olive ${
                  pathname === "/blog" ? "text-olive font-bold" : ""
                }`}
              >
                Blog
              </Link>
            </nav>

            {/* RIGHT: Actions (Search, Account, Cart) */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search icon */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-2 text-brand-black hover:text-olive transition-colors rounded-full hover:bg-brand-offwhite"
                aria-label="Search products or categories"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account icon */}
              <button
                type="button"
                onClick={onOpenAccount}
                className="hidden sm:inline-flex p-2 text-brand-black hover:text-olive transition-colors rounded-full hover:bg-brand-offwhite"
                aria-label="Account and orders"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Cart icon */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-brand-black hover:text-olive transition-colors rounded-full hover:bg-brand-offwhite"
                aria-label={`Shopping cart with ${totalQuantity} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-olive text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH MEGA MENU DROPDOWN (Desktop only) */}
        <div
          className="hidden lg:block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ShopCoversMegaMenu
            isOpen={megaMenuOpen}
            onClose={() => setMegaMenuOpen(false)}
          />
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={() => {
          setMobileMenuOpen(false);
          onOpenSearch();
        }}
      />
    </>
  );
};
