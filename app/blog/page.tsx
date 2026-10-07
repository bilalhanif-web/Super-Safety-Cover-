import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import { Clock, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Protection & Care Guides | Super Safety Cover Blog",
  description: "Helpful guides and tips on motorcycle care, monsoon protection, rain dresses, and household appliance covers in Pakistan.",
};

const POSTS = [
  {
    slug: "monsoon-motorcycle-protection-guide",
    title: "How to Protect Your Motorcycle During Monsoon Season in Pakistan",
    excerpt: "Monsoon humidity and rain quickly lead to fuel tank rust, chain corrosion, and electrical switch malfunction. Here are 5 practical steps to keep your bike pristine.",
    category: "Bike Care",
    date: "Sep 28, 2026",
    readTime: "4 min read",
  },
  {
    slug: "two-piece-rain-dress-vs-raincoat",
    title: "Why 2-Piece Rain Dresses Are Far Superior to Long Raincoats for Bikers",
    excerpt: "Loose long coats catch wind, flap dangerously into spokes, and leave your trousers soaked from road spray. A 2-piece hooded upper and waterproof trouser set keeps you 100% dry.",
    category: "Rain Dress",
    date: "Sep 20, 2026",
    readTime: "3 min read",
  },
  {
    slug: "washing-machine-ac-cover-benefits",
    title: "How Protective Covers Extend the Lifespan of Your AC and Washing Machine",
    excerpt: "Dust accumulation on electronic circuit boards and outdoor compressor rust are the primary causes of breakdown in Pakistani homes. Learn how simple covers protect your investment.",
    category: "Home Care",
    date: "Sep 12, 2026",
    readTime: "5 min read",
  },
  {
    slug: "bike-cover-sizing-guide",
    title: "Finding the Perfect Bike Cover: CD 70, CG 125, YBR & GS 150",
    excerpt: "A universal cover may flap loosely in high winds, while an undersized cover pulls against the mirrors. Here is how to select the exact precision fit for your ride.",
    category: "Buying Guide",
    date: "Aug 30, 2026",
    readTime: "4 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen pb-16">
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <div className="bg-brand-offwhite border-y border-brand-lightgrey py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-olive mb-2 block">
              Knowledge & Tips
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight mb-4">
              Care & Protection Blog
            </h1>
            <p className="text-base sm:text-lg text-brand-grey leading-relaxed">
              Practical guides on maintaining your vehicles, monsoon riding safety, and keeping home machines protected against dust and moisture in Pakistan.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-brand-offwhite rounded-xl border border-brand-lightgrey p-6 sm:p-8 flex flex-col justify-between hover:border-olive/50 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-bold text-olive uppercase tracking-wider bg-olive-soft px-2.5 py-1 rounded">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-brand-grey">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-brand-black group-hover:text-olive transition-colors mb-3">
                  {post.title}
                </h2>

                <p className="text-sm text-brand-grey leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-lightgrey flex items-center justify-between text-xs">
                <span className="text-brand-grey">{post.date}</span>
                <span className="font-bold text-olive flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Protection Banner inside Blog */}
        <div className="mt-14 p-8 rounded-2xl bg-brand-offwhite border border-brand-lightgrey flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-10 h-10 text-olive shrink-0" />
            <div>
              <h3 className="text-base font-bold text-brand-black">Looking for tailored covers?</h3>
              <p className="text-xs sm:text-sm text-brand-grey">Browse our complete lineup with Cash on Delivery across Pakistan.</p>
            </div>
          </div>
          <Link
            href="/shop"
            className="bg-olive text-white px-6 py-3 rounded-md text-xs sm:text-sm font-bold hover:bg-olive-hover transition-colors shrink-0"
          >
            Shop All Covers &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
