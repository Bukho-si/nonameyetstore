export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalSpent: number;
  orders: number;
  joinedDate: string;
  lastPurchase: string;
  status: "active" | "inactive";
}

export const customers: Customer[] = [
  { id: "cust-001", name: "Alex Johnson", email: "alex@example.com", avatar: "AJ", totalSpent: 489.95, orders: 4, joinedDate: "2025-06-15", lastPurchase: "2026-01-15", status: "active" },
  { id: "cust-002", name: "Sarah Chen", email: "sarah@example.com", avatar: "SC", totalSpent: 729.97, orders: 3, joinedDate: "2025-08-20", lastPurchase: "2026-02-20", status: "active" },
  { id: "cust-003", name: "Marcus Williams", email: "marcus@example.com", avatar: "MW", totalSpent: 324.96, orders: 2, joinedDate: "2025-09-10", lastPurchase: "2026-03-01", status: "active" },
  { id: "cust-004", name: "Emma Davis", email: "emma@example.com", avatar: "ED", totalSpent: 559.94, orders: 5, joinedDate: "2025-05-01", lastPurchase: "2026-03-05", status: "active" },
  { id: "cust-005", name: "Jordan Lee", email: "jordan@example.com", avatar: "JL", totalSpent: 894.91, orders: 7, joinedDate: "2025-03-22", lastPurchase: "2026-01-28", status: "active" },
  { id: "cust-006", name: "Olivia Martinez", email: "olivia@example.com", avatar: "OM", totalSpent: 259.98, orders: 2, joinedDate: "2025-10-05", lastPurchase: "2026-02-14", status: "active" },
  { id: "cust-007", name: "Liam Brown", email: "liam@example.com", avatar: "LB", totalSpent: 149.97, orders: 1, joinedDate: "2025-12-15", lastPurchase: "2026-01-10", status: "inactive" },
  { id: "cust-008", name: "Sophia Kim", email: "sophia@example.com", avatar: "SK", totalSpent: 119.99, orders: 1, joinedDate: "2025-11-20", lastPurchase: "2026-02-28", status: "inactive" },
];
