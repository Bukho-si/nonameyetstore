"use client";

import { useState } from "react";
import { Store, Upload, Palette, Truck, DollarSign, Bell, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    storeName: "VÊTIR",
    storeEmail: "admin@vetir.com",
    storePhone: "+1 (555) 123-4567",
    currency: "USD",
    freeShippingThreshold: "100",
    flatShippingRate: "9.99",
    taxRate: "8",
    emailOrderConfirm: true,
    emailShipNotify: true,
    emailPromo: false,
    emailNewsletter: true,
    primaryColor: "#0B1F3B",
    accentColor: "#38BDF8",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSetting = <K extends keyof typeof settings>(key: K, value: typeof settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const themePreviewColors = [
    { label: "Navy", hex: "#0B1F3B" },
    { label: "Sky Blue", hex: "#38BDF8" },
    { label: "Maroon", hex: "#7F1D1D" },
    { label: "Yellow", hex: "#FACC15" },
    { label: "Grey", hex: "#6B7280" },
    { label: "Emerald", hex: "#10B981" },
    { label: "Purple", hex: "#8B5CF6" },
    { label: "Rose", hex: "#F43F5E" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure your store preferences</p>
        </div>
        <Button
          onClick={handleSave}
          className={`transition-all duration-300 ${
            saved ? "bg-green-600 hover:bg-green-700" : "bg-navy hover:bg-navy-light"
          }`}
        >
          {saved ? (
            <>
              <Check className="h-4 w-4 mr-1.5" />
              Saved!
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-1.5" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Information */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Store className="h-4 w-4 text-sky" />
              Store Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs font-medium">Store Name</Label>
              <Input
                value={settings.storeName}
                onChange={(e) => updateSetting("storeName", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="text-xs font-medium">Contact Email</Label>
              <Input
                value={settings.storeEmail}
                onChange={(e) => updateSetting("storeEmail", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="text-xs font-medium">Phone Number</Label>
              <Input
                value={settings.storePhone}
                onChange={(e) => updateSetting("storePhone", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="text-xs font-medium">Store Logo</Label>
              <div className="mt-1.5 border-2 border-dashed rounded-xl p-6 text-center hover:border-sky/50 hover:bg-sky/5 transition-all cursor-pointer">
                <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">
                  SVG, PNG, or JPG (max 2MB)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Colors */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Palette className="h-4 w-4 text-sky" />
              Theme Colors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs font-medium">Primary Color</Label>
              <div className="flex gap-2 mt-1.5">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => updateSetting("primaryColor", e.target.value)}
                  className="h-9 w-9 rounded-lg border border-border cursor-pointer"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => updateSetting("primaryColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium">Accent Color</Label>
              <div className="flex gap-2 mt-1.5">
                <input
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => updateSetting("accentColor", e.target.value)}
                  className="h-9 w-9 rounded-lg border border-border cursor-pointer"
                />
                <Input
                  value={settings.accentColor}
                  onChange={(e) => updateSetting("accentColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-xs font-medium mb-2 block">Preset Colors</Label>
              <div className="grid grid-cols-4 gap-2">
                {themePreviewColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => updateSetting("primaryColor", color.hex)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                      settings.primaryColor === color.hex
                        ? "border-navy shadow-sm bg-muted/50"
                        : "border-border/50 hover:border-border"
                    }`}
                  >
                    <span
                      className="h-8 w-8 rounded-lg"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[10px] font-medium text-muted-foreground">{color.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div>
              <Label className="text-xs font-medium mb-2 block">Preview</Label>
              <div
                className="rounded-xl p-4 text-white text-center text-sm font-semibold"
                style={{ backgroundColor: settings.primaryColor }}
              >
                <p>Store Preview</p>
                <button
                  className="mt-2 px-4 py-1.5 rounded-lg text-xs font-bold"
                  style={{ backgroundColor: settings.accentColor }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Truck className="h-4 w-4 text-sky" />
              Shipping Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs font-medium">Free Shipping Threshold ($)</Label>
              <Input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => updateSetting("freeShippingThreshold", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="text-xs font-medium">Flat Rate Shipping ($)</Label>
              <Input
                type="number"
                value={settings.flatShippingRate}
                onChange={(e) => updateSetting("flatShippingRate", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-medium">Tax Rate (%)</Label>
                <Input
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) => updateSetting("taxRate", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label className="text-xs font-medium">Currency</Label>
                <Select value={settings.currency} onValueChange={(v) => updateSetting("currency", v)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="ZAR">ZAR (R)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Bell className="h-4 w-4 text-sky" />
              Email Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "emailOrderConfirm" as const, label: "Order Confirmation", desc: "Send confirmation when an order is placed" },
              { key: "emailShipNotify" as const, label: "Shipping Notifications", desc: "Notify customers when order ships" },
              { key: "emailPromo" as const, label: "Promotional Emails", desc: "Send promotional offers to customers" },
              { key: "emailNewsletter" as const, label: "Newsletter", desc: "Weekly newsletter updates" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <Switch
                  checked={settings[item.key] as boolean}
                  onCheckedChange={(v) => updateSetting(item.key, v)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
