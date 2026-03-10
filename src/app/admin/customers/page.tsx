"use client";

import { useState } from "react";
import { Search, Mail, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { customers, Customer } from "@/data/customers";
import { orders } from "@/data/orders";

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCustomerOrders = (email: string) => orders.filter((o) => o.email === email);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Customers</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your customer base</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{customers.length}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mt-0.5">Total Customers</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{customers.filter((c) => c.status === "active").length}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mt-0.5">Active</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              ${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toFixed(0)}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mt-0.5">Avg. Spend</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {(customers.reduce((sum, c) => sum + c.orders, 0) / customers.length).toFixed(1)}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mt-0.5">Avg. Orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-border/50 shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-0">
          <CardTitle className="text-base font-semibold">{filteredCustomers.length} Customers</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground hidden sm:table-cell">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Orders</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Total Spent</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground hidden lg:table-cell">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-navy/5 text-navy text-[10px] font-bold">
                            {customer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-semibold text-foreground">{customer.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{customer.email}</td>
                    <td className="py-3 px-4 text-sm font-medium">{customer.orders}</td>
                    <td className="py-3 px-4 text-sm font-semibold hidden md:table-cell">${customer.totalSpent.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-semibold capitalize ${
                          customer.status === "active"
                            ? "bg-green-500/10 text-green-700 border-green-500/20"
                            : "bg-gray-500/10 text-gray-600 border-gray-500/20"
                        }`}
                      >
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground hidden lg:table-cell">
                      {new Date(customer.joinedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Detail */}
      <Dialog open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">Customer Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-navy/5 text-navy text-sm font-bold">
                      {selectedCustomer.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-bold">{selectedCustomer.name}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {selectedCustomer.email}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <p className="text-lg font-bold">{selectedCustomer.orders}</p>
                    <p className="text-[10px] text-muted-foreground">Orders</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <p className="text-lg font-bold">${selectedCustomer.totalSpent.toFixed(0)}</p>
                    <p className="text-[10px] text-muted-foreground">Total Spent</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <p className="text-lg font-bold capitalize">{selectedCustomer.status}</p>
                    <p className="text-[10px] text-muted-foreground">Status</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Purchase History
                  </p>
                  <div className="space-y-2">
                    {getCustomerOrders(selectedCustomer.email).length === 0 ? (
                      <p className="text-xs text-muted-foreground">No orders found.</p>
                    ) : (
                      getCustomerOrders(selectedCustomer.email).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <div>
                            <p className="text-sm font-medium">{order.id}</p>
                            <p className="text-[10px] text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">${order.total.toFixed(2)}</p>
                            <Badge variant="outline" className="text-[10px] capitalize">{order.status}</Badge>
                          </div>
                        </div>
                      ))
                    )}
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
