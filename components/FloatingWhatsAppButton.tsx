"use client";

import React from "react";
import { usePathname } from "next/navigation";

// Official WhatsApp Brand SVG
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.507 14.307l-.009.075c-.244.59-1.282 1.155-1.782 1.206-.48.049-.966.197-3.14-.712-2.18-.912-3.593-3.167-3.702-3.317-.107-.15-1.002-1.332-1.002-2.54 0-1.208.636-1.803.86-2.046.223-.243.486-.304.648-.304.162 0 .324.002.464.01.15.008.35-.057.548.42.203.486.69 1.684.75 1.805.061.122.102.264.02.427-.08.162-.122.263-.243.405-.122.142-.256.317-.365.426-.122.122-.25.253-.108.496.142.243.633 1.045 1.36 1.692.935.832 1.724 1.09 1.968 1.211.243.122.386.102.528-.061.142-.163.608-.71.77-0.954.162-.244.324-.203.547-.122.223.081 1.419.669 1.663.791.243.122.405.183.466.284.061.102.061.59-.183 1.18zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.61a.5.5 0 00.627.625l4.57-1.341C8.683 21.572 10.297 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.632 0-3.155-.45-4.46-1.233a.5.5 0 00-.363-.053l-3.32.973.987-3.197a.5.5 0 00-.05-.386A7.95 7.95 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
  </svg>
);

export const FloatingWhatsAppButton: React.FC = () => {
  const pathname = usePathname();
  const isProductPage = pathname?.startsWith("/product/");

  const phoneNumber = "923288985916";
  const defaultMessage = "Hi Super Safety Cover, I need help with a product.";
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside aria-label="WhatsApp quick contact">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Super Safety Cover"
        className={`fixed z-40 right-4 sm:right-6 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 rounded-full focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 ${
          isProductPage ? "bottom-[76px] lg:bottom-6" : "bottom-5 sm:bottom-6"
        } p-3 sm:px-4 sm:py-2.5`}
      >
        <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
        <span className="hidden sm:inline-block text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};
