import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VÊTIR — Premium Clothing Store",
  description:
    "Discover premium clothing essentials. Shop hoodies, jackets, sneakers & more with free shipping on orders over $100.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <CartProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </CartProvider>
      </body>
    </html>
  );
}
