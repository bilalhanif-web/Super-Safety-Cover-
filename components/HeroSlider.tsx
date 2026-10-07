"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerSlide {
  id: number;
  desktopImage: string;
  mobileImage: string;
  alt: string;
  href: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: 1,
    desktopImage: "/images/banners/desktop/image-banner-1.webp",
    mobileImage: "/images/banners/mobile/image-banner-1.webp",
    alt: "Super Safety Cover - Everyday Essentials. Made to Protect.",
    href: "/shop",
  },
  {
    id: 2,
    desktopImage: "/images/banners/desktop/image-banner-2.webp",
    mobileImage: "/images/banners/mobile/image-banner-2.webp",
    alt: "Super Safety Cover - Keep Your Machines Covered.",
    href: "/washing-machine-covers",
  },
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  }, []);

  // Autoplay every 6 seconds with pause on hover
  useEffect(() => {
    if (!isPaused) {
      slideInterval.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative w-full bg-[#F4F3ED] border-b border-[#D8D2C5] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Carousel"
    >
      {/* 
        Responsive Aspect Container matching banner source aspect ratios:
        Mobile: 941 x 1672 (aspect-[941/1672])
        Desktop: 1672 x 941 (md:aspect-[1672/941])
      */}
      <div className="relative w-full aspect-[941/1672] md:aspect-[1672/941] max-w-[1920px] mx-auto">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          const isFirstSlide = index === 0;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 z-10 pointer-events-auto"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              <Link
                href={slide.href}
                className="relative block w-full h-full cursor-pointer group"
                aria-label={slide.alt}
              >
                {/* Desktop Banner Image (Hidden on Mobile) */}
                <div className="hidden md:block relative w-full h-full">
                  <Image
                    src={slide.desktopImage}
                    alt={slide.alt}
                    fill
                    priority={isFirstSlide}
                    className="object-contain object-center"
                    sizes="100vw"
                    quality={95}
                  />
                </div>

                {/* Mobile Banner Image (Hidden on Desktop) */}
                <div className="block md:hidden relative w-full h-full">
                  <Image
                    src={slide.mobileImage}
                    alt={slide.alt}
                    fill
                    priority={isFirstSlide}
                    className="object-contain object-center"
                    sizes="100vw"
                    quality={95}
                  />
                </div>
              </Link>
            </div>
          );
        })}

        {/* Previous Navigation Arrow */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/85 text-brand-black hover:text-olive hover:bg-white border border-brand-lightgrey/80 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-olive active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Next Navigation Arrow */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/85 text-brand-black hover:text-olive hover:bg-white border border-brand-lightgrey/80 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-olive active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Slider Indicator Dots */}
        <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/10 backdrop-blur-xs px-3 py-1.5 rounded-full">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentSlide(index);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-7 h-2 bg-olive"
                  : "w-2 h-2 bg-white/80 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
