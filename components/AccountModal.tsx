"use client";

import React, { useState } from "react";
import { X, Package, ShieldCheck, Phone, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-black/60 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-brand-lightgrey z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-lightgrey">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-olive" />
            <h3 className="text-base font-bold text-brand-black">
              Order Lookup & Support
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-brand-grey hover:text-brand-black hover:bg-brand-offwhite"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs sm:text-sm text-brand-grey mb-4 leading-relaxed">
            Enter your mobile number used during Cash on Delivery checkout to view active shipments and dispatch updates.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (phone) setChecked(true);
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="account-phone" className="block text-xs font-bold text-brand-black mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <input
                  id="account-phone"
                  type="tel"
                  required
                  placeholder="03001234567"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setChecked(false);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-md border border-brand-lightgrey text-sm text-brand-black outline-none focus:border-olive"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-olive text-white py-2.5 rounded-md text-xs sm:text-sm font-bold hover:bg-olive-hover transition-colors"
            >
              Find My Order
            </button>
          </form>

          {checked && (
            <div className="mt-5 p-4 rounded-lg bg-brand-offwhite border border-brand-lightgrey text-xs">
              <div className="flex items-center gap-2 text-olive font-bold mb-1">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Active Account Record Found</span>
              </div>
              <p className="text-brand-grey leading-relaxed">
                Courier dispatch SMS updates are automatically routed to <strong className="text-brand-black">{phone}</strong>. For instant updates, message our support on WhatsApp.
              </p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-brand-lightgrey space-y-2 text-xs text-brand-grey">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-olive shrink-0" />
              <span>No password needed for Cash on Delivery orders</span>
            </div>
            <a
              href="https://wa.me/923288985916"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-olive transition-colors"
            >
              <Phone className="w-4 h-4 text-olive shrink-0" />
              <span>Need help? WhatsApp: +92 328 8985916</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
