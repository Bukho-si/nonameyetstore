"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { orders, Order } from "@/data/orders";

const statusColors: Record<string, string> = {
  pending: "bg-yellow/10 text-yellow-700 border-yellow/20",
  processing: "bg-sky/10 text-sky-dark border-sky/20",
  shipped: "bg-purple-500/10 text-purple-700 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-700 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-700 border-red-500/20",
};

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">Track and manage customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {["all", "pending", "processing", "shipped", "delivered"].map((status) => {
          const count = status === "all" ? orders.length : orders.filter((o) => o.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                filterStatus === status
                  ? "border-navy bg-navy/5 shadow-sm"
                  : "border-border/50 hover:border-border"
              }`}
            >
              <p className="text-xl font-bold text-foreground">{count}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium capitalize mt-0.5">
                {status === "all" ? "Total" : status}
              </p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="border-border/50 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          <Select onValueChange={(value) => setSelectedValue(value ?? '')}>
  <SelectTrigger className="w-full sm:w-[180px]">
    <SelectValue placeholder="All Status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All Status</SelectItem>
    <SelectItem value="pending">Pending</SelectItem>
    <SelectItem value="processing">Processing</SelectItem>
    <SelectItem value="shipped">Shipped</SelectItem>
    <SelectItem value="delivered">Delivered</SelectItem>
    <SelectItem value="cancelled">Cancelled</SelectItem>
  </SelectContent>
</Select>  
        <CardHeader className="pb-0">
          <CardTitle className="text-base font-semibold">{filteredOrders.length} Orders</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Order</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground hidden sm:table-cell">Items</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Date</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-sm font-semibold text-foreground">{order.id}</td>
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-foreground">{order.customer}</p>
                      <p className="text-[10px] text-muted-foreground">{order.email}</p>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, i) => (
                          <div key={i} className="relative h-8 w-8 rounded-lg overflow-hidden bg-muted border-2 border-white">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold">${order.total.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={`text-[10px] font-semibold capitalize ${statusColors[order.status]}`}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground hidden md:table-cell">
                      {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedOrder(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">Order {selectedOrder.id}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Customer</p>
                    <p className="text-sm font-semibold">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge variant="outline" className={`text-[10px] font-semibold capitalize mt-1 ${statusColors[selectedOrder.status]}`}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-medium">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-sm font-bold">${selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Shipping Address</p>
                  <p className="text-sm text-foreground">{selectedOrder.address}</p>
                </div>

                <Separator />

                <div>
                  <p className="text-xs font-semibold text-foreground mb-3">Items ({selectedOrder.items.length})</p>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {item.color} · Size {item.size} · Qty {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
