"use client";

import { useState } from "react";
import { orders, Order } from "@/data/orders";

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || o.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Orders</h1>

      <input
        placeholder="Search order or customer..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <table className="w-full border mt-4">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Order ID</th>
            <th className="text-left p-2">Customer</th>
            <th className="text-left p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.customer}</td>
              <td className="p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}