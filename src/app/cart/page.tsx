"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Shopping Cart
          {totalItems > 0 && (
            <span className="text-muted-foreground font-normal text-lg ml-2">
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          )}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Your cart is empty</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
              Looks like you haven&apos;t added any items yet. Start exploring our collection!
            </p>
            <Link href="/shop">
              <Button className="mt-6 bg-navy hover:bg-navy-light px-8 py-5 rounded-xl">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4 p-4 bg-white rounded-2xl border border-border/50 hover:border-border hover:shadow-sm transition-all duration-200"
                >
                  <Link href={`/product/${item.productId}`}>
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-muted shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div>
                        <Link href={`/product/${item.productId}`}>
                          <h3 className="text-sm font-semibold text-foreground hover:text-sky-dark transition-colors line-clamp-1">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.color} · Size {item.size}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-foreground shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="inline-flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-4 py-2 text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors mt-2"
              >
                Clear all items
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white rounded-2xl border p-6 space-y-5">
                <h2 className="text-lg font-bold text-foreground">Order Summary</h2>

                {/* Promo code */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="w-full pl-9 pr-3 py-2.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky/30"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="text-xs px-4 shrink-0">
                    Apply
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">${orderTotal.toFixed(2)}</span>
                </div>

                {totalPrice < 100 && (
                  <p className="text-xs text-muted-foreground bg-sky/5 rounded-lg p-3 text-center">
                    Add <span className="font-semibold text-sky-dark">${(100 - totalPrice).toFixed(2)}</span>{" "}
                    more for free shipping!
                  </p>
                )}

                <Button className="w-full py-6 bg-navy hover:bg-navy-light text-sm font-semibold rounded-xl shadow-lg shadow-navy/20 transition-all duration-300">
                  Proceed to Checkout
                </Button>

                <p className="text-[10px] text-muted-foreground text-center">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
