"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Star, Truck, RefreshCw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.id === resolvedParams.id);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <Link href="/shop">
            <Button className="mt-4">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/50">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {hasDiscount && (
                <Badge className="absolute top-4 left-4 bg-maroon text-white border-0 text-xs font-semibold px-3 py-1 rounded-full">
                  SALE
                </Badge>
              )}
            </div>
            {/* Thumbnail strip (show repeated images for demo effect) */}
            <div className="flex gap-3">
              {[0, 0, 0].map((imgIdx, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(imgIdx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    i === activeImage
                      ? "border-sky shadow-md"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <Image
                    src={product.images[imgIdx]}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-sky font-semibold mb-2">
                {product.category}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow text-yellow"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice!.toFixed(2)}
                  </span>
                  <Badge className="bg-maroon/10 text-maroon border-0 text-xs font-semibold">
                    Save ${(product.originalPrice! - product.price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            <Separator />

            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Color selector */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Color {selectedColor && <span className="font-normal text-muted-foreground">— {selectedColor}</span>}
              </h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`h-10 w-10 rounded-xl border-2 transition-all duration-200 ${
                      selectedColor === color.name
                        ? "border-navy scale-110 shadow-md"
                        : "border-border hover:border-navy/30 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Size {selectedSize && <span className="font-normal text-muted-foreground">— {selectedSize}</span>}
                </h3>
                <button className="text-xs text-sky-dark hover:text-sky font-medium">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-navy text-white border-navy shadow-md"
                        : "bg-white border-border hover:border-navy/30 text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Quantity</h3>
              <div className="inline-flex items-center border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 py-3 text-sm font-semibold min-w-[50px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="ml-3 text-xs text-muted-foreground">
                {product.stock} in stock
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className={`flex-1 py-6 text-sm font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                  addedToCart
                    ? "bg-green-600 hover:bg-green-700 shadow-green-600/20"
                    : "bg-navy hover:bg-navy-light shadow-navy/20"
                }`}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                {addedToCart ? "Added to Cart!" : !selectedSize || !selectedColor ? "Select Options" : "Add to Cart"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-xl shrink-0"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: RefreshCw, label: "Easy Returns" },
                { icon: Shield, label: "Warranty" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/50 text-center">
                  <Icon className="h-4 w-4 text-sky" />
                  <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xl font-bold text-foreground mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
