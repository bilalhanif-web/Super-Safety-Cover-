import React from "react";

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-brand-black text-brand-white text-[11px] sm:text-xs md:text-sm py-2 px-3 sm:px-4 text-center font-medium tracking-wide">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-olive animate-pulse"></span>
        <span>Cash on Delivery | Delivery Across Pakistan</span>
      </div>
    </div>
  );
};
