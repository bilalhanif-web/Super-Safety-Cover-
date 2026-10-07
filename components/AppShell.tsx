"use client";

import React, { useState } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { SearchModal } from "./SearchModal";
import { AccountModal } from "./AccountModal";
import { FloatingWhatsAppButton } from "./FloatingWhatsAppButton";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col bg-white text-brand-black selection:bg-olive selection:text-white">
          <AnnouncementBar />
          <Header
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAccount={() => setIsAccountOpen(true)}
          />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Floating Action Buttons */}
          <FloatingWhatsAppButton />

          {/* Overlays */}
          <CartDrawer />
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
          <AccountModal
            isOpen={isAccountOpen}
            onClose={() => setIsAccountOpen(false)}
          />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
};
