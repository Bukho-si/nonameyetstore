export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  images: string[];
  featured: boolean;
  createdAt: string;
  rating: number;
  reviews: number;
}

export const categories = [
  "Hoodies",
  "T-Shirts",
  "Jackets",
  "Pants",
  "Sneakers",
  "Caps",
];

export const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const allColors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#0B1F3B" },
  { name: "Grey", hex: "#6B7280" },
  { name: "Sky Blue", hex: "#38BDF8" },
  { name: "Maroon", hex: "#7F1D1D" },
  { name: "Olive", hex: "#556B2F" },
  { name: "Beige", hex: "#F5F5DC" },
];

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Essential Comfort Hoodie",
    description:
      "Crafted from premium heavyweight French terry cotton, this hoodie delivers unmatched softness and warmth. Features a relaxed fit, kangaroo pocket, and ribbed cuffs for a timeless silhouette that pairs effortlessly with any outfit.",
    category: "Hoodies",
    price: 89.99,
    originalPrice: 119.99,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy", hex: "#0B1F3B" },
      { name: "Black", hex: "#000000" },
      { name: "Grey", hex: "#6B7280" },
    ],
    stock: 45,
    images: ["/images/products/hoodie.png"],
    featured: true,
    createdAt: "2025-12-01",
    rating: 4.8,
    reviews: 234,
  },
  {
    id: "prod-002",
    name: "Urban Edge T-Shirt",
    description:
      "Our signature t-shirt made from 100% organic Pima cotton. The perfect everyday essential with a modern slim fit, reinforced shoulder seams, and a buttery-soft hand feel that gets better with every wash.",
    category: "T-Shirts",
    price: 39.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#0B1F3B" },
      { name: "Sky Blue", hex: "#38BDF8" },
    ],
    stock: 120,
    images: ["/images/products/tshirt.png"],
    featured: true,
    createdAt: "2025-11-15",
    rating: 4.6,
    reviews: 456,
  },
  {
    id: "prod-003",
    name: "Moto Leather Jacket",
    description:
      "A statement piece handcrafted from genuine lamb leather. This jacket features asymmetric zip closure, snap-down lapels, and quilted shoulder panels for a bold, rebellious aesthetic with premium construction.",
    category: "Jackets",
    price: 299.99,
    originalPrice: 399.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Maroon", hex: "#7F1D1D" },
    ],
    stock: 18,
    images: ["/images/products/jacket.png"],
    featured: true,
    createdAt: "2025-10-20",
    rating: 4.9,
    reviews: 128,
  },
  {
    id: "prod-004",
    name: "Slim Tapered Chinos",
    description:
      "Engineered with 4-way stretch twill for all-day comfort. These chinos feature a slim tapered leg, hidden flex waistband, and wrinkle-resistant finish—perfect for the office or a night out.",
    category: "Pants",
    price: 79.99,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy", hex: "#0B1F3B" },
      { name: "Olive", hex: "#556B2F" },
      { name: "Black", hex: "#000000" },
      { name: "Beige", hex: "#F5F5DC" },
    ],
    stock: 67,
    images: ["/images/products/pants.png"],
    featured: false,
    createdAt: "2025-11-01",
    rating: 4.5,
    reviews: 312,
  },
  {
    id: "prod-005",
    name: "Cloud Runner Sneakers",
    description:
      "Step into the future with our ultra-lightweight running sneakers. Featuring CloudFoam midsole technology, breathable mesh upper, and a responsive outsole that adapts to every stride.",
    category: "Sneakers",
    price: 149.99,
    originalPrice: 189.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Sky Blue", hex: "#38BDF8" },
    ],
    stock: 33,
    images: ["/images/products/sneakers.png"],
    featured: true,
    createdAt: "2025-12-10",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "prod-006",
    name: "Street Logo Cap",
    description:
      "Classic snapback cap with embroidered logo detailing. Made from durable cotton twill with an adjustable snap closure and pre-curved brim for a comfortable, casual look.",
    category: "Caps",
    price: 34.99,
    sizes: ["M", "L"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#0B1F3B" },
      { name: "White", hex: "#FFFFFF" },
    ],
    stock: 89,
    images: ["/images/products/cap.png"],
    featured: false,
    createdAt: "2025-11-20",
    rating: 4.4,
    reviews: 98,
  },
  {
    id: "prod-007",
    name: "Oversized Graphic Hoodie",
    description:
      "Make a statement with this oversized hoodie featuring bold graphic prints. Crafted from a plush cotton-polyester blend with dropped shoulders and a boxy silhouette for maximum street cred.",
    category: "Hoodies",
    price: 109.99,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Maroon", hex: "#7F1D1D" },
    ],
    stock: 28,
    images: ["/images/products/hoodie.png"],
    featured: true,
    createdAt: "2025-12-05",
    rating: 4.7,
    reviews: 167,
  },
  {
    id: "prod-008",
    name: "Vintage Wash Tee",
    description:
      "Achieve that perfectly worn-in look with our vintage wash t-shirt. Pre-washed and garment-dyed for a lived-in feel from day one, with a relaxed boxy fit and raw-edge hem detail.",
    category: "T-Shirts",
    price: 44.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Grey", hex: "#6B7280" },
      { name: "Olive", hex: "#556B2F" },
      { name: "Beige", hex: "#F5F5DC" },
    ],
    stock: 95,
    images: ["/images/products/tshirt.png"],
    featured: false,
    createdAt: "2025-11-10",
    rating: 4.3,
    reviews: 201,
  },
  {
    id: "prod-009",
    name: "Windbreaker Pro Jacket",
    description:
      "Lightweight, water-resistant windbreaker designed for unpredictable weather. Features sealed seams, adjustable hood, and reflective accents for visibility. Packs into its own pocket for easy travel.",
    category: "Jackets",
    price: 129.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy", hex: "#0B1F3B" },
      { name: "Black", hex: "#000000" },
      { name: "Sky Blue", hex: "#38BDF8" },
    ],
    stock: 42,
    images: ["/images/products/jacket.png"],
    featured: false,
    createdAt: "2025-10-15",
    rating: 4.6,
    reviews: 145,
  },
  {
    id: "prod-010",
    name: "Relaxed Cargo Pants",
    description:
      "Modern cargo pants reimagined for the contemporary wardrobe. Featuring a relaxed straight leg, multiple utility pockets, and an elastic drawstring waist for effortless style and function.",
    category: "Pants",
    price: 89.99,
    originalPrice: 109.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Olive", hex: "#556B2F" },
      { name: "Beige", hex: "#F5F5DC" },
    ],
    stock: 54,
    images: ["/images/products/pants.png"],
    featured: false,
    createdAt: "2025-11-25",
    rating: 4.5,
    reviews: 178,
  },
  {
    id: "prod-011",
    name: "Retro High-Top Sneakers",
    description:
      "Throwback high-tops with a modern twist. Premium suede and canvas construction with padded ankle collar, vulcanized rubber sole, and vintage-inspired colorways that elevate any casual look.",
    category: "Sneakers",
    price: 119.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#0B1F3B" },
      { name: "Maroon", hex: "#7F1D1D" },
    ],
    stock: 26,
    images: ["/images/products/sneakers.png"],
    featured: false,
    createdAt: "2025-12-08",
    rating: 4.8,
    reviews: 92,
  },
  {
    id: "prod-012",
    name: "Wool Blend Beanie Cap",
    description:
      "Cozy up in our premium wool-blend beanie. Double-layered knit construction provides exceptional warmth while the fold-over cuff offers adjustable coverage and a clean, versatile look.",
    category: "Caps",
    price: 29.99,
    sizes: ["M", "L"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Grey", hex: "#6B7280" },
      { name: "Maroon", hex: "#7F1D1D" },
      { name: "Navy", hex: "#0B1F3B" },
    ],
    stock: 110,
    images: ["/images/products/cap.png"],
    featured: false,
    createdAt: "2025-11-30",
    rating: 4.6,
    reviews: 76,
  },
];
