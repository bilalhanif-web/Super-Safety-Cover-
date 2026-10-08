import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  MessageCircle,
  Facebook,
  Instagram,
  Mail,
  ArrowUpRight,
  Clock,
  Truck,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Super Safety Cover Pakistan",
  description:
    "Connect with Super Safety Cover. Direct support via WhatsApp, Facebook, Instagram, TikTok, and Email for sizing advice, custom covers, and order inquiries.",
};

const TikTokIcon: React.FC<{ className?: string }> = ({
  className = "w-6 h-6",
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 2.31-4.644c.314 0 .619.05 1.053.167V9.402c-.347-.046-.7-.07-1.053-.07A6.335 6.335 0 0 0 3.15 15.666 6.337 6.337 0 0 0 9.484 22a6.333 6.333 0 0 0 6.334-6.334V9.22a8.163 8.163 0 0 0 4.771 1.517V7.292a4.78 4.78 0 0 1-1-.606z" />
  </svg>
);

interface ConnectChannel {
  name: string;
  badge: string;
  badgeHighlight?: boolean;
  handleOrValue: string;
  description: string;
  href: string;
  actionText: string;
  icon: React.ReactNode;
  colSpan?: string;
}

const CONNECT_CHANNELS: ConnectChannel[] = [
  {
    name: "WhatsApp",
    badge: "Fastest Response",
    badgeHighlight: true,
    handleOrValue: "+92 328 8985916",
    description:
      "Instant messaging for bike sizing recommendations, custom measurements, and live order tracking.",
    href: "https://wa.me/923288985916",
    actionText: "Chat on WhatsApp",
    icon: <MessageCircle className="w-6 h-6 stroke-[1.8]" />,
  },
  {
    name: "Facebook",
    badge: "Official Page",
    handleOrValue: "Super Safety Covers",
    description:
      "Follow our official page for product demonstrations, customer reviews, photo galleries, and news.",
    href: "https://www.facebook.com/share/19Kk5K8U7j/",
    actionText: "Visit Facebook Page",
    icon: <Facebook className="w-6 h-6 stroke-[1.8]" />,
  },
  {
    name: "Instagram",
    badge: "Photos & Reels",
    handleOrValue: "@supersafetycover",
    description:
      "Explore cover fitting showcases, water resistance tests, behind-the-scenes clips, and customer reels.",
    href: "https://www.instagram.com/supersafetycover/",
    actionText: "Follow on Instagram",
    icon: <Instagram className="w-6 h-6 stroke-[1.8]" />,
  },
  {
    name: "TikTok",
    badge: "Video Demos",
    handleOrValue: "@supersafetycover",
    description:
      "Watch short video tutorials, real fabric durability trials, monsoon water tests, and cover reviews.",
    href: "https://www.tiktok.com/@supersafetycover",
    actionText: "Watch on TikTok",
    icon: <TikTokIcon className="w-6 h-6" />,
  },
  {
    name: "Email Support",
    badge: "Formal Inquiries",
    handleOrValue: "support@supersafetycover.com",
    description:
      "Ideal for bulk institutional orders, dealership inquiries, corporate partnerships, and formal feedback.",
    href: "mailto:support@supersafetycover.com",
    actionText: "Send an Email",
    icon: <Mail className="w-6 h-6 stroke-[1.8]" />,
    colSpan: "md:col-span-2",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#F4F3ED] min-h-screen pb-16">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

      {/* Header Banner */}
      <div className="bg-[#F4F3ED] border-b border-[#D8D2C5] py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#66743A]/10 text-[#66743A] mb-3">
            Customer Support & Assistance
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#121212] tracking-tight mb-3">
            Connect With Us
          </h1>
          <p className="text-sm sm:text-base text-[#5A5A55] max-w-2xl mx-auto leading-relaxed">
            Have questions about vehicle sizing, custom measurements, or order delivery? Reach out directly through any of our channels below. Our team is available 6 days a week.
          </p>
        </div>
      </div>

      {/* Main Connect Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {CONNECT_CHANNELS.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-white rounded-2xl border border-[#D8D2C5] p-6 sm:p-7 shadow-xs hover:border-[#66743A] hover:shadow-md transition-all duration-200 group flex flex-col justify-between ${
                item.colSpan || ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#66743A]/10 text-[#66743A] flex items-center justify-center group-hover:bg-[#66743A] group-hover:text-white transition-colors duration-200 shrink-0">
                    {item.icon}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase ${
                      item.badgeHighlight
                        ? "bg-[#66743A]/15 text-[#66743A]"
                        : "bg-[#F4F3ED] text-[#5A5A55]"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h2 className="text-lg font-extrabold text-[#121212] tracking-tight mb-1">
                  {item.name}
                </h2>
                <p className="text-sm sm:text-base font-bold text-[#66743A] mb-2 break-all">
                  {item.handleOrValue}
                </p>
                <p className="text-xs sm:text-sm text-[#5A5A55] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#F4F3ED] flex items-center justify-between text-xs font-bold text-[#66743A] group-hover:text-[#566230]">
                <span>{item.actionText}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>

        {/* Working Hours & Trust Strip */}
        <div className="mt-8 bg-white rounded-2xl border border-[#D8D2C5] p-6 sm:p-7 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3.5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#66743A]/10 text-[#66743A] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#121212]">
                  Working Hours
                </h3>
                <p className="text-xs text-[#5A5A55] mt-0.5">
                  Mon – Sat: 9:00 AM – 8:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#66743A]/10 text-[#66743A] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#121212]">
                  Nationwide Delivery
                </h3>
                <p className="text-xs text-[#5A5A55] mt-0.5">
                  Cash on Delivery across Pakistan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#66743A]/10 text-[#66743A] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#121212]">
                  Reliable Care
                </h3>
                <p className="text-xs text-[#5A5A55] mt-0.5">
                  Direct manufacturer warranty & support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
