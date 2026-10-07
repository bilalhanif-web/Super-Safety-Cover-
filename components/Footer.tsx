import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { CATEGORIES } from "@/data";
import { MessageCircle, Facebook, Instagram, ShieldCheck, Mail, Phone } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121212] text-[#F4F3ED] pt-16 pb-12 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* COLUMN 1: Brand (4 cols) */}
          <div className="lg:col-span-4">
            <Logo isFooter className="mb-4" />
            <p className="text-xs sm:text-sm text-[#F4F3ED]/75 leading-relaxed mb-6 max-w-sm">
              Practical protection for your vehicle, machines and everyday essentials. Manufactured in Pakistan for lasting durability and clean care.
            </p>

            {/* Social media icons */}
            <div className="flex items-center space-x-3 text-brand-lightgrey">
              <a
                href="https://www.facebook.com/share/19Kk5K8U7j/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-olive hover:border-olive transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-olive hover:border-olive transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923288985916"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-olive hover:border-olive transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-brand-lightgrey/70">
              <ShieldCheck className="w-4 h-4 text-olive shrink-0" />
              <span>Cash on Delivery across Pakistan</span>
            </div>
          </div>

          {/* COLUMN 2: SHOP (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F4F3ED] mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#F4F3ED]/75">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${cat.slug}`}
                    className="hover:text-olive transition-colors block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: CUSTOMER HELP (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F4F3ED] mb-4">
              Customer Help
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#F4F3ED]/75">
              <li>
                <Link href="/contact" className="hover:text-olive transition-colors block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-olive transition-colors block">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping-information" className="hover:text-olive transition-colors block">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns-exchanges" className="hover:text-olive transition-colors block">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-olive transition-colors block">
                  Track Order
                </Link>
              </li>
            </ul>

            <div className="mt-6 space-y-2 text-xs text-[#F4F3ED]/65">
              <a
                href="tel:+923288985916"
                className="flex items-center gap-2 hover:text-olive transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-olive shrink-0" />
                <span>Call: +92 328 8985916</span>
              </a>
              <a
                href="https://wa.me/923288985916"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-olive transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-olive shrink-0" />
                <span>WhatsApp: +92 328 8985916</span>
              </a>
              <a
                href="mailto:support@supersafetycover.com"
                className="flex items-center gap-2 hover:text-olive transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-olive shrink-0" />
                <span>support@supersafetycover.com</span>
              </a>
            </div>
          </div>

          {/* COLUMN 4: LEGAL (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F4F3ED] mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#F4F3ED]/75">
              <li>
                <Link href="/privacy-policy" className="hover:text-olive transition-colors block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-olive transition-colors block">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-lightgrey/60 gap-4">
          <p>© Super Safety Cover. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Handcrafted for Pakistani Weather</span>
            <span>•</span>
            <span className="text-olive">Cash on Delivery</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
