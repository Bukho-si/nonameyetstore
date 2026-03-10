"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid3X3, LayoutGrid, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { products, categories, allSizes, allColors } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 400]);
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 400]);
    setCurrentPage(1);
  };

  const activeFiltersCount =
    selectedCategories.length + selectedSizes.length + selectedColors.length +
    (priceRange[0] > 0 || priceRange[1] < 400 ? 1 : 0);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }
    if (selectedColors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => selectedColors.includes(c.name)));
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategories, selectedSizes, selectedColors, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          Category
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {cat}
              </span>
              <span className="text-xs text-muted-foreground/60 ml-auto">
                ({products.filter((p) => p.category === cat).length})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          Price Range
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </h3>
        <Slider
          value={priceRange}
          min={0}
          max={400}
          step={10}
          onValueChange={(v) => { setPriceRange(v); setCurrentPage(1); }}
          className="mt-2"
        />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          Size
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                selectedSizes.includes(size)
                  ? "bg-navy text-white border-navy"
                  : "bg-white border-border hover:border-navy/30 text-foreground"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          Color
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </h3>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border transition-all duration-200 ${
                selectedColors.includes(color.name)
                  ? "border-navy shadow-sm"
                  : "border-border hover:border-navy/30"
              }`}
            >
              <span
                className="h-3.5 w-3.5 rounded-full border border-border/50"
                style={{ backgroundColor: color.hex }}
              />
              <span className="font-medium">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full text-xs"
        >
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Page header */}
      <div className="bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {selectedCategories.length === 1 ? selectedCategories[0] : "All Products"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredProducts.length} products found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-2">
                {/* Mobile filter button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden text-xs">
                      <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge className="ml-1.5 h-4 px-1 text-[10px] bg-sky text-white">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-6">
                    <h2 className="text-lg font-bold mb-6">Filters</h2>
                    <FilterSidebar />
                  </SheetContent>
                </Sheet>

                {/* Active filter pills */}
                <div className="hidden md:flex flex-wrap gap-1.5">
                  {selectedCategories.map((cat) => (
                    <Badge
                      key={cat}
                      variant="secondary"
                      className="text-xs px-2.5 py-1 cursor-pointer hover:bg-destructive/10"
                      onClick={() => toggleCategory(cat)}
                    >
                      {cat}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                  {selectedSizes.map((size) => (
                    <Badge
                      key={size}
                      variant="secondary"
                      className="text-xs px-2.5 py-1 cursor-pointer hover:bg-destructive/10"
                      onClick={() => toggleSize(size)}
                    >
                      Size: {size}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden md:flex items-center gap-1 border rounded-lg p-0.5">
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-1.5 rounded-md transition-colors ${gridCols === 3 ? "bg-muted" : ""}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-1.5 rounded-md transition-colors ${gridCols === 4 ? "bg-muted" : ""}`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product grid */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg font-semibold text-foreground">No products found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your filters to find what you&apos;re looking for.
                </p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-4 md:gap-6 ${
                  gridCols === 3
                    ? "grid-cols-2 md:grid-cols-3"
                    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="text-xs"
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="text-xs w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="text-xs"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function ShopLoadingGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[3/4] rounded-2xl" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoadingGrid />}>
      <ShopContent />
    </Suspense>
  );
}
