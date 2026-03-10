export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  address: string;
}

export const orders: Order[] = [
  {
    id: "ORD-1001",
    customer: "Alex Johnson",
    email: "alex@example.com",
    items: [
      { productId: "prod-001", name: "Essential Comfort Hoodie", price: 89.99, quantity: 1, size: "L", color: "Navy", image: "/images/products/hoodie.png" },
      { productId: "prod-002", name: "Urban Edge T-Shirt", price: 39.99, quantity: 2, size: "M", color: "White", image: "/images/products/tshirt.png" },
    ],
    total: 169.97,
    status: "delivered",
    date: "2026-01-15",
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-1002",
    customer: "Sarah Chen",
    email: "sarah@example.com",
    items: [
      { productId: "prod-003", name: "Moto Leather Jacket", price: 299.99, quantity: 1, size: "S", color: "Black", image: "/images/products/jacket.png" },
    ],
    total: 299.99,
    status: "shipped",
    date: "2026-02-20",
    address: "456 Oak Ave, San Francisco, CA 94102",
  },
  {
    id: "ORD-1003",
    customer: "Marcus Williams",
    email: "marcus@example.com",
    items: [
      { productId: "prod-005", name: "Cloud Runner Sneakers", price: 149.99, quantity: 1, size: "L", color: "White", image: "/images/products/sneakers.png" },
      { productId: "prod-006", name: "Street Logo Cap", price: 34.99, quantity: 1, size: "M", color: "Black", image: "/images/products/cap.png" },
    ],
    total: 184.98,
    status: "processing",
    date: "2026-03-01",
    address: "789 Elm St, Chicago, IL 60601",
  },
  {
    id: "ORD-1004",
    customer: "Emma Davis",
    email: "emma@example.com",
    items: [
      { productId: "prod-004", name: "Slim Tapered Chinos", price: 79.99, quantity: 2, size: "M", color: "Navy", image: "/images/products/pants.png" },
    ],
    total: 159.98,
    status: "pending",
    date: "2026-03-05",
    address: "321 Pine Rd, Austin, TX 73301",
  },
  {
    id: "ORD-1005",
    customer: "Jordan Lee",
    email: "jordan@example.com",
    items: [
      { productId: "prod-007", name: "Oversized Graphic Hoodie", price: 109.99, quantity: 1, size: "XL", color: "Black", image: "/images/products/hoodie.png" },
      { productId: "prod-008", name: "Vintage Wash Tee", price: 44.99, quantity: 3, size: "L", color: "Grey", image: "/images/products/tshirt.png" },
    ],
    total: 244.96,
    status: "delivered",
    date: "2026-01-28",
    address: "555 Maple Dr, Seattle, WA 98101",
  },
  {
    id: "ORD-1006",
    customer: "Olivia Martinez",
    email: "olivia@example.com",
    items: [
      { productId: "prod-009", name: "Windbreaker Pro Jacket", price: 129.99, quantity: 1, size: "M", color: "Navy", image: "/images/products/jacket.png" },
    ],
    total: 129.99,
    status: "shipped",
    date: "2026-02-14",
    address: "888 Cedar Ln, Miami, FL 33101",
  },
  {
    id: "ORD-1007",
    customer: "Liam Brown",
    email: "liam@example.com",
    items: [
      { productId: "prod-010", name: "Relaxed Cargo Pants", price: 89.99, quantity: 1, size: "L", color: "Olive", image: "/images/products/pants.png" },
      { productId: "prod-012", name: "Wool Blend Beanie Cap", price: 29.99, quantity: 2, size: "M", color: "Black", image: "/images/products/cap.png" },
    ],
    total: 149.97,
    status: "delivered",
    date: "2026-01-10",
    address: "222 Birch St, Denver, CO 80201",
  },
  {
    id: "ORD-1008",
    customer: "Sophia Kim",
    email: "sophia@example.com",
    items: [
      { productId: "prod-011", name: "Retro High-Top Sneakers", price: 119.99, quantity: 1, size: "M", color: "White", image: "/images/products/sneakers.png" },
    ],
    total: 119.99,
    status: "cancelled",
    date: "2026-02-28",
    address: "444 Walnut Blvd, Portland, OR 97201",
  },
];
