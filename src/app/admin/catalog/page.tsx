"use client";

import { useState } from "react";
import { Plus, X, Palette, Ruler, FolderOpen, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categories as initialCategories, allSizes as initialSizes, allColors as initialColors } from "@/data/products";

export default function AdminCatalogPage() {
  const [cats, setCats] = useState(initialCategories);
  const [sizes, setSizes] = useState(initialSizes);
  const [colors, setColors] = useState(initialColors);
  const [collections, setCollections] = useState(["Spring 2026", "Summer Essentials", "Street Luxe", "Basics"]);

  const [newCat, setNewCat] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#000000");
  const [newCollection, setNewCollection] = useState("");

  const addCategory = () => {
    if (newCat.trim() && !cats.includes(newCat.trim())) {
      setCats([...cats, newCat.trim()]);
      setNewCat("");
    }
  };

  const addSize = () => {
    if (newSize.trim() && !sizes.includes(newSize.trim())) {
      setSizes([...sizes, newSize.trim()]);
      setNewSize("");
    }
  };

  const addColor = () => {
    if (newColorName.trim() && !colors.find((c) => c.name === newColorName.trim())) {
      setColors([...colors, { name: newColorName.trim(), hex: newColorHex }]);
      setNewColorName("");
      setNewColorHex("#000000");
    }
  };

  const addCollection = () => {
    if (newCollection.trim() && !collections.includes(newCollection.trim())) {
      setCollections([...collections, newCollection.trim()]);
      setNewCollection("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Catalog Manager</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage categories, sizes, colors, and collections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Categories */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-sky" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {cats.map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  className="text-xs px-3 py-1.5 flex items-center gap-1.5"
                >
                  {cat}
                  <button onClick={() => setCats(cats.filter((c) => c !== cat))}>
                    <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="New category"
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCategory()}
                className="flex-1"
              />
              <Button onClick={addCategory} size="sm" className="bg-navy hover:bg-navy-light shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sizes */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Ruler className="h-4 w-4 text-sky" />
              Sizes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Badge
                  key={size}
                  variant="secondary"
                  className="text-xs px-3 py-1.5 flex items-center gap-1.5"
                >
                  {size}
                  <button onClick={() => setSizes(sizes.filter((s) => s !== size))}>
                    <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="New size"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSize()}
                className="flex-1"
              />
              <Button onClick={addSize} size="sm" className="bg-navy hover:bg-navy-light shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Palette className="h-4 w-4 text-sky" />
              Colors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <Badge
                  key={color.name}
                  variant="secondary"
                  className="text-xs px-3 py-1.5 flex items-center gap-1.5"
                >
                  <span
                    className="h-3 w-3 rounded-full border border-border/50"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                  <button onClick={() => setColors(colors.filter((c) => c.name !== color.name))}>
                    <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Color name"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                className="flex-1"
              />
              <div>
                <Label className="sr-only">Color</Label>
                <input
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  className="h-9 w-9 rounded-lg border border-border cursor-pointer"
                />
              </div>
              <Button onClick={addColor} size="sm" className="bg-navy hover:bg-navy-light shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Collections */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Tag className="h-4 w-4 text-sky" />
              Collections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {collections.map((col) => (
                <Badge
                  key={col}
                  variant="secondary"
                  className="text-xs px-3 py-1.5 flex items-center gap-1.5"
                >
                  {col}
                  <button onClick={() => setCollections(collections.filter((c) => c !== col))}>
                    <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="New collection"
                value={newCollection}
                onChange={(e) => setNewCollection(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCollection()}
                className="flex-1"
              />
              <Button onClick={addCollection} size="sm" className="bg-navy hover:bg-navy-light shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
