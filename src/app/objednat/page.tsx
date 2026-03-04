"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { menuItems } from "@/data/menu";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Clock,
  Send,
  School,
} from "lucide-react";

const categoryOrder = [
  "appetizers",
  "soups",
  "mainCourses",
  "desserts",
] as const;

export default function TakeawayPage() {
  const { locale, t } = useLocale();

  // Cart state: mapping item.id -> quantity
  const [cart, setCart] = useState<Record<string, number>>({});

  // Form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    pickupTime: "",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Filter out drinks for takeaway
  const takeawayItems = menuItems.filter((item) => item.category !== "drinks");

  // Group items by category
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    items: takeawayItems.filter((item) => item.category === cat),
  }));

  // Cart helpers
  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const clearItem = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const cartEntries = Object.entries(cart).filter(([, qty]) => qty > 0);
  const cartItems = cartEntries
    .map(([id, qty]) => {
      const item = menuItems.find((m) => m.id === id);
      return item ? { item, qty } : null;
    })
    .filter(Boolean) as { item: (typeof menuItems)[number]; qty: number }[];

  const totalPrice = cartItems.reduce(
    (sum, { item, qty }) => sum + item.price * qty,
    0
  );

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartEntries.length === 0) {
      toast.error(t("takeaway.cart.empty"));
      return;
    }
    setSubmitting(true);
    try {
      const orderItems = cartItems.map(({ item, qty }) => ({
        id: item.id,
        name: item.name[locale],
        price: item.price,
        quantity: qty,
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: orderItems,
          totalPrice,
          locale,
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      toast.success(t("takeaway.success"));
      setCart({});
      setForm({ name: "", phone: "", email: "", pickupTime: "", note: "" });
    } catch {
      toast.error(t("common.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50/40 to-white">
      {/* Page Header */}
      <AnimatedSection>
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShoppingBag className="h-8 w-8 text-green-700" />
              <h1 className="text-4xl font-bold text-green-900">
                {t("takeaway.title")}
              </h1>
            </div>
            <p className="text-lg text-green-800/80 max-w-2xl mx-auto mb-2">
              {t("takeaway.subtitle")}
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              {t("takeaway.description")}
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Nearby school info */}
      <AnimatedSection delay={0.1}>
        <section className="container mx-auto px-4 mb-8">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 max-w-3xl mx-auto">
            <School className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-amber-800 text-sm">
              {t("takeaway.nearbySchool")}
            </p>
          </div>
        </section>
      </AnimatedSection>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu items - left/main area */}
          <div className="lg:col-span-2 space-y-8">
            {grouped.map(
              ({ category, items }) =>
                items.length > 0 && (
                  <AnimatedSection key={category} delay={0.1}>
                    <div>
                      <h2 className="text-2xl font-semibold text-green-900 mb-4">
                        {t(`menu.categories.${category}`)}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {items.map((item) => {
                          const qty = cart[item.id] || 0;
                          return (
                            <Card
                              key={item.id}
                              className="overflow-hidden hover:shadow-md transition-shadow"
                            >
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-medium text-foreground leading-tight">
                                    {item.name[locale]}
                                  </h3>
                                  <Badge
                                    variant="secondary"
                                    className="ml-2 shrink-0 font-semibold"
                                  >
                                    {item.price} {t("common.czk")}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {item.description[locale]}
                                </p>
                                {item.allergens && item.allergens.length > 0 && (
                                  <p className="text-xs text-muted-foreground/70 mb-3">
                                    {locale === "cs" ? "Alergeny" : "Алергени"}:{" "}
                                    {item.allergens.join(", ")}
                                  </p>
                                )}
                                <div className="flex items-center gap-2">
                                  {qty === 0 ? (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => addToCart(item.id)}
                                      className="w-full"
                                    >
                                      <Plus className="h-4 w-4 mr-1" />
                                      {t("takeaway.cart.addItem")}
                                    </Button>
                                  ) : (
                                    <div className="flex items-center gap-2 w-full">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                          removeFromCart(item.id)
                                        }
                                        className="h-8 w-8 p-0"
                                      >
                                        <Minus className="h-4 w-4" />
                                      </Button>
                                      <span className="font-semibold text-center min-w-[2rem]">
                                        {qty}
                                      </span>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => addToCart(item.id)}
                                        className="h-8 w-8 p-0"
                                      >
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => clearItem(item.id)}
                                        className="h-8 w-8 p-0 ml-auto text-red-500 hover:text-red-700 hover:bg-red-50"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </AnimatedSection>
                )
            )}
          </div>

          {/* Cart sidebar */}
          <div className="lg:col-span-1">
            <AnimatedSection delay={0.2}>
              <div className="sticky top-24">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-900">
                      <ShoppingBag className="h-5 w-5" />
                      {t("takeaway.cart.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cartItems.length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center py-4">
                        {t("takeaway.cart.empty")}
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {cartItems.map(({ item, qty }) => (
                          <div key={item.id} className="flex items-center gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {item.name[locale]}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {qty} x {item.price} {t("common.czk")}
                              </p>
                            </div>
                            <span className="text-sm font-semibold shrink-0">
                              {item.price * qty} {t("common.czk")}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => clearItem(item.id)}
                              className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}

                        <Separator className="my-3" />

                        <div className="flex justify-between items-center font-bold text-lg">
                          <span>{t("takeaway.cart.total")}:</span>
                          <span className="text-green-700">
                            {totalPrice} {t("common.czk")}
                          </span>
                        </div>
                      </div>
                    )}

                    <Separator className="my-4" />

                    {/* Order form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("takeaway.form.name")} *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleFormChange}
                          required
                          placeholder={t("takeaway.form.name")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {t("takeaway.form.phone")} *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleFormChange}
                          required
                          placeholder="+420 ..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {t("takeaway.form.email")}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleFormChange}
                          placeholder={t("takeaway.form.email")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pickupTime">
                          <Clock className="inline h-4 w-4 mr-1" />
                          {t("takeaway.form.pickupTime")} *
                        </Label>
                        <Input
                          id="pickupTime"
                          name="pickupTime"
                          type="time"
                          value={form.pickupTime}
                          onChange={handleFormChange}
                          required
                          min="11:00"
                          max="21:00"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="note">{t("takeaway.form.note")}</Label>
                        <Textarea
                          id="note"
                          name="note"
                          value={form.note}
                          onChange={handleFormChange}
                          placeholder={t("takeaway.form.note")}
                          rows={3}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={submitting || cartItems.length === 0}
                        className="w-full bg-green-700 hover:bg-green-800 text-white"
                      >
                        {submitting ? (
                          t("common.loading")
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            {t("takeaway.form.submit")}
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </main>
  );
}
