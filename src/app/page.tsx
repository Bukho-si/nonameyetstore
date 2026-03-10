import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, Shield, RefreshCw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const collections = [
  { name: "Street Essentials", image: "/images/products/hoodie.png", count: 24, slug: "Hoodies" },
  { name: "Outerwear", image: "/images/products/jacket.png", count: 18, slug: "Jackets" },
  { name: "Footwear", image: "/images/products/sneakers.png", count: 15, slug: "Sneakers" },
  { name: "Everyday Basics", image: "/images/products/tshirt.png", count: 32, slug: "T-Shirts" },
];

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
  { icon: Shield, title: "Secure Payment", desc: "100% protected checkout" },
  { icon: RefreshCw, title: "Easy Returns", desc: "30-day return policy" },
  { icon: Star, title: "Premium Quality", desc: "Handpicked materials" },
];

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero-banner.png"
            alt="Fashion banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky/10 border border-sky/20 rounded-full mb-6">
              <span className="h-2 w-2 rounded-full bg-sky animate-pulse" />
              <span className="text-xs font-medium text-sky">New Spring Collection 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Redefine Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky to-sky-light">
                Style
              </span>
            </h1>
            <p className="mt-5 text-lg text-white/60 max-w-lg leading-relaxed">
              Premium clothing essentials crafted for the modern individual. Quality meets contemporary design.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/shop">
                <Button className="bg-sky hover:bg-sky-dark text-white px-8 py-6 text-sm font-semibold rounded-xl shadow-lg shadow-sky/20 hover:shadow-xl hover:shadow-sky/30 transition-all duration-300 group">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-sm font-semibold rounded-xl transition-all duration-300"
                >
                  View Collections
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-sm">
              {[
                { value: "10K+", label: "Happy Customers" },
                { value: "500+", label: "Products" },
                { value: "4.9", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features bar */}
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky/5">
                  <f.icon className="h-5 w-5 text-sky" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-sky mb-2">Curated</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Shop by Collection</h2>
            </div>
            <Link href="/shop" className="text-sm font-medium text-sky-dark hover:text-sky transition-colors group flex items-center gap-1">
              View All
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {collections.map((col) => (
              <Link
                key={col.name}
                href={`/shop?category=${col.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-muted"
              >
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-lg">{col.name}</h3>
                  <p className="text-white/60 text-xs mt-1">{col.count} Products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-sky mb-2">Trending Now</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Products</h2>
            <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto">
              Handpicked styles that are making waves this season
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/shop">
              <Button variant="outline" className="px-8 py-5 rounded-xl text-sm font-semibold group">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy to-navy-light p-8 md:p-16">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sky/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-maroon/10 blur-3xl" />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow/10 rounded-full mb-4">
                  <span className="text-yellow text-xs font-bold">LIMITED TIME</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  Spring Sale —{" "}
                  <span className="text-yellow">30% Off</span>
                </h3>
                <p className="mt-3 text-white/60 text-sm max-w-md">
                  Refresh your wardrobe with our biggest sale of the season. Use code SPRING30 at checkout.
                </p>
              </div>
              <Link href="/shop">
                <Button className="bg-yellow hover:bg-yellow-light text-navy px-8 py-6 text-sm font-bold rounded-xl shadow-lg shadow-yellow/20 transition-all duration-300 shrink-0">
                  Shop the Sale
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category links */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-sky mb-2">Browse</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Shop by Category</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${cat}`}
                className="px-6 py-3 bg-white rounded-xl border border-border hover:border-sky hover:shadow-md hover:shadow-sky/5 text-sm font-medium text-foreground hover:text-sky-dark transition-all duration-200"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
