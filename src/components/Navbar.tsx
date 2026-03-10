"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Hoodies", label: "Hoodies" },
  { href: "/shop?category=Sneakers", label: "Sneakers" },
  { href: "/shop?category=Jackets", label: "Jackets" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-border/50">
      {/* Top bar */}
      <div className="bg-navy text-white text-center py-2 px-4 text-xs tracking-wider font-medium">
        FREE SHIPPING ON ORDERS OVER $100 — USE CODE{" "}
        <span className="text-yellow font-bold">STYLE2026</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <Link href="/" className="text-2xl font-bold tracking-tight text-navy">
                    VÊTIR
                  </Link>
                </div>
                <nav className="flex-1 p-6 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block py-3 px-4 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-lg transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t mt-4">
                    <Link
                      href="/admin"
                      className="block py-3 px-4 text-sm font-medium text-sky-dark hover:bg-sky/10 rounded-lg transition-all duration-200"
                    >
                      Admin Dashboard
                    </Link>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight text-navy">
              VÊTIR
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-sky group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/70 hover:text-foreground"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-foreground/70 hover:text-foreground"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-foreground/70 hover:text-foreground"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-sky text-white text-[10px] font-bold border-2 border-white">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/admin" className="hidden lg:block ml-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-medium border-sky/30 text-sky-dark hover:bg-sky/5 hover:border-sky"
              >
                Admin
              </Button>
            </Link>
          </div>
        </div>

        {/* Search bar */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isSearchOpen ? "max-h-16 pb-4" : "max-h-0"
          }`}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-sky/30 transition-all"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
