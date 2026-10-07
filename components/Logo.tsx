import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  isFooter?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", isFooter = false }) => {
  return (
    <Link
      href="/"
      className={`inline-flex items-center select-none group transition-opacity hover:opacity-90 ${className}`}
      aria-label="Super Safety Covers Home"
    >
      <Image
        src="/images/logo/logo.png"
        alt="Super Safety Covers"
        width={103}
        height={50}
        priority
        quality={95}
        className={`w-auto object-contain transition-all ${
          isFooter
            ? "h-[40px] sm:h-[44px] md:h-[48px] invert brightness-105"
            : "h-[36px] sm:h-[40px] md:h-[46px] lg:h-[50px]"
        }`}
      />
    </Link>
  );
};
