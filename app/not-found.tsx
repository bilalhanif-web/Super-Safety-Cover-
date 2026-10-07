import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 px-4 bg-white text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-brand-offwhite border border-brand-lightgrey text-olive flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1 block">
          Error 404
        </span>
        <h1 className="text-3xl font-extrabold text-brand-black mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-brand-grey mb-8 leading-relaxed">
          The protective cover or page you are looking for may have been moved, renamed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-olive text-white px-6 py-3 rounded-md text-xs font-bold hover:bg-olive-hover transition-colors shadow-sm"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/bike-covers"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-md border border-brand-lightgrey text-xs font-bold text-brand-black hover:border-olive hover:text-olive bg-white transition-colors"
          >
            Shop Bike Covers
          </Link>
        </div>
      </div>
    </div>
  );
}
