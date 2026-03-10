"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Search, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { products as initialProducts, categories, Product } from "@/data/products";

export default function AdminProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const filteredProducts = productsList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    setProductsList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAdd = () => {
    if (!formData.name || !formData.category || !formData.price) return;
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: formData.name,
      description: formData.description || "No description",
      category: formData.category,
      price: parseFloat(formData.price),
      sizes: ["S", "M", "L", "XL"],
      colors: [{ name: "Black", hex: "#000000" }],
      stock: parseInt(formData.stock) || 0,
      images: ["/images/products/tshirt.png"],
      featured: false,
      createdAt: new Date().toISOString().split("T")[0],
      rating: 4.0,
      reviews: 0,
    };
    setProductsList((prev) => [newProduct, ...prev]);
    setFormData({ name: "", category: "", price: "", stock: "", description: "" });
    setIsAddOpen(false);
  };

  const handleEdit = () => {
    if (!editProduct) return;
    setProductsList((prev) =>
      prev.map((p) =>
        p.id === editProduct.id
          ? {
              ...p,
              name: formData.name || p.name,
              category: formData.category || p.category,
              price: parseFloat(formData.price) || p.price,
              stock: parseInt(formData.stock) || p.stock,
              description: formData.description || p.description,
            }
          : p
      )
    );
    setEditProduct(null);
    setFormData({ name: "", category: "", price: "", stock: "", description: "" });
  };

  const openEdit = (product: Product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
    });
  };

  const ProductForm = ({ onSubmit, title }: { onSubmit: () => void; title: string }) => (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <Label className="text-xs font-medium">Product Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter product name"
            className="mt-1.5"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-medium">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(v) => setFormData({ ...formData, category: v })}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs font-medium">Price ($)</Label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0.00"
              className="mt-1.5"
            />
          </div>
        </div>
        <div>
          <Label className="text-xs font-medium">Stock Quantity</Label>
          <Input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            placeholder="0"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="text-xs font-medium">Description</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Product description..."
            className="mt-1.5"
            rows={3}
          />
        </div>
        <Button onClick={onSubmit} className="w-full bg-navy hover:bg-navy-light">
          {title}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your product inventory</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-navy hover:bg-navy-light text-sm">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <ProductForm onSubmit={handleAdd} title="Add Product" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-border/50 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-0">
          <CardTitle className="text-base font-semibold">
            {filteredProducts.length} Products
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Price</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Stock</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground hidden lg:table-cell">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-muted shrink-0">
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{product.name}</p>
                          <p className="text-[10px] text-muted-foreground sm:hidden">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">
                      {product.category}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm hidden md:table-cell">
                      <span className={product.stock < 20 ? "text-red-500 font-semibold" : "text-muted-foreground"}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-semibold ${
                          product.stock > 0
                            ? "bg-green-500/10 text-green-700 border-green-500/20"
                            : "bg-red-500/10 text-red-700 border-red-500/20"
                        }`}
                      >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(product)}>
                            <Pencil className="h-3.5 w-3.5 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(product.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editProduct} onOpenChange={(open) => !open && setEditProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <ProductForm onSubmit={handleEdit} title="Edit Product" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
