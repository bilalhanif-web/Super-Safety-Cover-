"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { REVIEWS } from "@/data";

/**
 * Helper to resolve the correct product thumbnail
 */
function getProductThumbnail(productName: string, explicitImage?: string): string {
  if (explicitImage) return explicitImage;
  const lower = productName.toLowerCase();
  if (lower.includes("car")) return "/images/products/car-cover.webp";
  if (lower.includes("ac") || lower.includes("air conditioner")) return "/images/products/ac-cover.webp";
  if (lower.includes("machine") || lower.includes("washing")) return "/images/products/machine-cover.webp";
  if (lower.includes("fan")) return "/images/products/fan-cover.webp";
  if (lower.includes("cooler")) return "/images/products/air-coller-cover.webp";
  if (lower.includes("mattress")) return "/images/products/mattress-cover.webp";
  if (lower.includes("rain")) return "/images/products/rain-dress-cover.webp";
  return "/images/products/bike-cover.webp";
}

/**
 * Continuous Marquee Review Carousel
 * - Auto-moves continuously from right to left in an infinite loop
 * - Smooth motion with requestAnimationFrame and timestamp delta
 * - Pauses on hover
 * - Visible left/right navigation arrow buttons
 * - Mobile swipe and desktop mouse drag support
 * - Exact responsive cards: Desktop (3), Tablet (2), Mobile (1)
 * - Brand palette: #121212, #F4F3ED, #E7E2D7, #66743A, #FFFFFF, #D8D2C5
 */
export const CustomerReviews: React.FC = () => {
  // Triple duplicated array for seamless infinite looping
  const allReviews = useMemo(() => [...REVIEWS, ...REVIEWS, ...REVIEWS], []);

  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [cardWidth, setCardWidth] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const setWidthRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const isInteractingRef = useRef<boolean>(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

  const dragStartXRef = useRef<number>(0);
  const dragStartScrollLeftRef = useRef<number>(0);

  // Responsive cardWidth calculation
  useEffect(() => {
    const updateDimensions = () => {
      if (!carouselRef.current) return;
      const containerWidth = carouselRef.current.clientWidth;
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const gap = isMobile ? 16 : 24;

      let calculatedWidth: number;
      if (isMobile) {
        // Mobile: 1 card visible (full width of container)
        calculatedWidth = containerWidth;
      } else if (isTablet) {
        // Tablet: 2 cards visible
        calculatedWidth = Math.floor((containerWidth - gap) / 2);
      } else {
        // Desktop: 3 cards visible
        calculatedWidth = Math.floor((containerWidth - gap * 2) / 3);
      }

      setCardWidth(calculatedWidth);
      const oneSetWidth = REVIEWS.length * (calculatedWidth + gap);
      setWidthRef.current = oneSetWidth;

      // Center in set 2 if scrollLeft is uninitialized or 0
      if (carouselRef.current.scrollLeft === 0 && oneSetWidth > 0) {
        carouselRef.current.scrollLeft = oneSetWidth;
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Temporary interaction pause helper
  const pauseTemporarily = (durationMs = 2500) => {
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      lastTimestampRef.current = null;
    }, durationMs);
  };

  // Continuous auto-scroll loop via RAF
  useEffect(() => {
    let reqId: number;
    const speed = 36; // ~36px per second for a slow, premium drift

    const step = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }
      const delta = Math.min(timestamp - lastTimestampRef.current, 100);
      lastTimestampRef.current = timestamp;

      const container = carouselRef.current;
      if (container && !isPausedRef.current && !isInteractingRef.current) {
        const setWidth = setWidthRef.current;
        if (setWidth > 0) {
          const deltaScroll = (speed * delta) / 1000;
          container.scrollLeft += deltaScroll;

          // Infinite loop seamless wrap
          if (container.scrollLeft >= setWidth * 2) {
            container.scrollLeft -= setWidth;
          }
        }
      }

      reqId = requestAnimationFrame(step);
    };

    reqId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(reqId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // Wrap listener for manual drag/touch/wheel
  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const setWidth = setWidthRef.current;
    if (setWidth > 0) {
      if (container.scrollLeft >= setWidth * 2) {
        container.scrollLeft -= setWidth;
      } else if (container.scrollLeft <= 20) {
        container.scrollLeft += setWidth;
      }
    }
  };

  // Arrow navigation
  const handlePrev = () => {
    pauseTemporarily(3500);
    const container = carouselRef.current;
    if (!container) return;
    const setWidth = setWidthRef.current;
    const gap = window.innerWidth < 640 ? 16 : 24;
    const step = cardWidth > 0 ? cardWidth + gap : 360;

    if (container.scrollLeft - step < 20 && setWidth > 0) {
      container.scrollLeft += setWidth;
    }
    container.scrollBy({ left: -step, behavior: "smooth" });
  };

  const handleNext = () => {
    pauseTemporarily(3500);
    const container = carouselRef.current;
    if (!container) return;
    const setWidth = setWidthRef.current;
    const gap = window.innerWidth < 640 ? 16 : 24;
    const step = cardWidth > 0 ? cardWidth + gap : 360;

    if (container.scrollLeft + step >= setWidth * 2 && setWidth > 0) {
      container.scrollLeft -= setWidth;
    }
    container.scrollBy({ left: step, behavior: "smooth" });
  };

  // Touch Swipe Handlers
  const handleTouchStart = () => {
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    pauseTemporarily(1800);
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    isInteractingRef.current = true;
    dragStartXRef.current = e.pageX;
    dragStartScrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const diff = e.pageX - dragStartXRef.current;
    carouselRef.current.scrollLeft = dragStartScrollLeftRef.current - diff;
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      pauseTemporarily(2000);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[#E7E2D7] border-b border-[#D8D2C5] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1.5 block">
              Customer Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-2">
              What Our Customers Say
            </h2>
            <p className="text-sm text-brand-grey">
              Real experiences from motorcycle owners, car drivers, and families across Pakistan.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous reviews"
              className="w-10 h-10 rounded-full border border-[#D8D2C5] bg-white text-brand-black hover:bg-olive hover:text-white hover:border-olive shadow-xs transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-olive/40 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              aria-label="Next reviews"
              className="w-10 h-10 rounded-full border border-[#D8D2C5] bg-white text-brand-black hover:bg-olive hover:text-white hover:border-olive shadow-xs transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-olive/40 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
            lastTimestampRef.current = null;
            if (isDragging) {
              setIsDragging(false);
              pauseTemporarily(1500);
            }
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div ref={trackRef} className="flex gap-4 sm:gap-6 w-max">
            {allReviews.map((rev, index) => {
              const isUrdu = rev.language === "ur";
              const thumbSrc = getProductThumbnail(rev.productName, rev.productImage);

              return (
                <div
                  key={`${rev.id}-${index}`}
                  style={{
                    width: cardWidth > 0 ? `${cardWidth}px` : undefined,
                  }}
                  className="flex-shrink-0 w-[300px] sm:w-[320px] lg:w-[380px]"
                >
                  <div className="h-[270px] sm:h-[280px] bg-white rounded-2xl p-6 sm:p-7 border border-[#D8D2C5] shadow-xs hover:shadow-md hover:border-olive/50 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      {/* Top Bar: Star Rating & Date */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-olive">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-brand-grey font-medium">
                          {rev.date}
                        </span>
                      </div>

                      {/* Review Text */}
                      {isUrdu ? (
                        <div dir="rtl" className="mb-4">
                          <p
                            className="text-right text-[15px] sm:text-base leading-[1.9] text-brand-black font-medium line-clamp-3"
                            style={{
                              fontFamily:
                                "'Noto Nastaliq Urdu', 'Urdu Typesetting', 'Jameel Noori Nastaleeq', 'Nafees Web Naskh', Tahoma, sans-serif",
                            }}
                          >
                            &ldquo;{rev.comment}&rdquo;
                          </p>
                        </div>
                      ) : (
                        <div dir="ltr" className="mb-4">
                          <p className="text-left text-sm sm:text-[15px] leading-relaxed text-brand-black font-medium line-clamp-3">
                            &ldquo;{rev.comment}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bottom Meta Area with Product Thumbnail */}
                    <div className="pt-3.5 border-t border-[#EAE7DC] mt-auto flex items-center gap-3">
                      {/* Product Thumbnail */}
                      <div className="relative w-12 h-12 rounded-xl bg-[#F4F3ED] border border-[#D8D2C5] p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <Image
                          src={thumbSrc}
                          alt={rev.productName}
                          fill
                          sizes="48px"
                          className="object-contain p-0.5"
                        />
                      </div>

                      {/* Customer Info & Product Name */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1.5">
                          <h3 className="text-sm font-bold text-brand-black truncate">
                            {rev.customerName}
                            <span className="text-xs font-normal text-brand-grey ml-1.5">
                              ({rev.city})
                            </span>
                          </h3>
                          {rev.verifiedPurchase && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-olive bg-olive/10 px-2 py-0.5 rounded-full flex-shrink-0">
                              <CheckCircle className="w-3 h-3 text-olive" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-brand-grey mt-0.5 truncate font-medium">
                          {rev.productName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
