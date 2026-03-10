"use client";

import { DollarSign, ShoppingCart, Users, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { orders } from "@/data/orders";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

const stats = [
  {
    title: "Total Revenue",
    value: "$24,563.00",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "bg-sky/10 text-sky",
  },
  {
    title: "Total Orders",
    value: "384",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "bg-green-500/10 text-green-600",
  },
  {
    title: "Total Customers",
    value: "1,293",
    change: "+23.1%",
    trend: "up",
    icon: Users,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Total Products",
    value: "156",
    change: "-2.4%",
    trend: "down",
    icon: Package,
    color: "bg-yellow/10 text-yellow-600",
  },
];

const salesData = [
  { month: "Jul", revenue: 4200, orders: 42 },
  { month: "Aug", revenue: 5800, orders: 58 },
  { month: "Sep", revenue: 4900, orders: 49 },
  { month: "Oct", revenue: 7200, orders: 72 },
  { month: "Nov", revenue: 9100, orders: 91 },
  { month: "Dec", revenue: 12400, orders: 124 },
  { month: "Jan", revenue: 8600, orders: 86 },
  { month: "Feb", revenue: 10200, orders: 102 },
  { month: "Mar", revenue: 11500, orders: 115 },
];

const revenueData = [
  { day: "Mon", value: 2400 },
  { day: "Tue", value: 1398 },
  { day: "Wed", value: 3800 },
  { day: "Thu", value: 3908 },
  { day: "Fri", value: 4800 },
  { day: "Sat", value: 3800 },
  { day: "Sun", value: 4300 },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow/10 text-yellow-700 border-yellow/20",
  processing: "bg-sky/10 text-sky-dark border-sky/20",
  shipped: "bg-purple-500/10 text-purple-700 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-700 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-700 border-red-500/20",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back. Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    stat.trend === "up" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Sales Overview</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Monthly revenue & orders</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium bg-green-500/10 px-2.5 py-1 rounded-full">
                <TrendingUp className="h-3.5 w-3.5" />
                +12.5%
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#6B7280" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#6B7280" }} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B1F3B",
                      border: "none",
                      borderRadius: "12px",
                      padding: "8px 12px",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="#38BDF8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Weekly Revenue</CardTitle>
            <p className="text-xs text-muted-foreground">This week vs last week</p>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-foreground">$24.5k</p>
              <p className="text-xs text-muted-foreground mt-1">Total this week</p>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#6B7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B1F3B",
                      border: "none",
                      borderRadius: "12px",
                      padding: "8px 12px",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#38BDF8"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Your latest transactions</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              {orders.length} orders
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
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
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-sm font-semibold text-foreground">{order.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-xs font-semibold text-muted-foreground">
                            {order.customer.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{order.customer}</p>
                          <p className="text-[10px] text-muted-foreground">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1.5">
                        {order.items.slice(0, 2).map((item, i) => (
                          <div key={i} className="relative h-8 w-8 rounded-lg overflow-hidden bg-muted">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <span className="text-[10px] text-muted-foreground">
                            +{order.items.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold">${order.total.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-semibold capitalize ${statusColors[order.status]}`}
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground hidden md:table-cell">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
