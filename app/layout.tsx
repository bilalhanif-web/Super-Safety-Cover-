import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://supersafetycover.pk"),
  title: "Super Safety Cover | Protection Made Simple",
  description: "Durable protective covers and rain dresses in Pakistan. Tailored waterproof parachute bike covers for Honda CD 70, CG 125, Yamaha YBR 125, Suzuki GS 150, car covers, washing machines, and AC units with Cash on Delivery nationwide.",
  keywords: [
    "Super Safety Cover",
    "Bike Cover Pakistan",
    "Honda CD 70 cover",
    "Honda CG 125 cover",
    "Yamaha YBR 125 cover",
    "Suzuki GS 150 cover",
    "Rain Dress Pakistan",
    "Car Cover Pakistan",
    "Washing Machine Cover",
    "AC Cover",
    "Mattress Cover",
    "Waterproof covers",
    "Cash on delivery Pakistan",
  ],
  authors: [{ name: "Super Safety Cover" }],
  openGraph: {
    title: "Super Safety Cover | Protection Made Simple",
    description: "Premium protective covers for motorcycles, cars, appliances, and 2-piece rain dresses in Pakistan.",
    url: "https://supersafetycover.pk",
    siteName: "Super Safety Cover",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "/images/banners/banner-1.webp",
        width: 1200,
        height: 630,
        alt: "Super Safety Cover - Protection Made Simple",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-brand-black">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
