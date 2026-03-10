"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-muted/50 aspect-[3/4] mb-4">
        {/* Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.featured && (
            <Badge className="bg-sky text-white border-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
              FEATURED
            </Badge>
          )}
          {hasDiscount && (
            <Badge className="bg-maroon text-white border-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
              -{discountPercent}%
            </Badge>
          )}
          {product.stock < 20 && (
            <Badge className="bg-yellow text-navy border-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
              LOW STOCK
            </Badge>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:bg-white hover:shadow-md transition-all duration-200"
          >
            <Heart className="h-4 w-4 text-foreground/70" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:bg-white hover:shadow-md transition-all duration-200"
          >
            <ShoppingBag className="h-4 w-4 text-foreground/70" />
          </button>
        </div>

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="w-full py-2.5 bg-navy/90 backdrop-blur-sm text-white text-xs font-semibold rounded-xl hover:bg-navy transition-colors"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1.5 px-1">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-sky-dark transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star className="h-3 w-3 fill-yellow text-yellow" />
            <span className="text-xs font-medium text-foreground">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">${product.price.toFixed(2)}</span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice!.toFixed(2)}
            </span>
          )}
        </div>
        {/* Color swatches */}
        <div className="flex items-center gap-1.5 pt-1">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color.name}
              className="h-3.5 w-3.5 rounded-full border border-border/50 shadow-sm"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[10px] text-muted-foreground">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
