"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  celebrationTypes,
  celebrationPackages,
  celebrationThemes,
} from "@/data/celebrations";
import { Send, Check, Star, Sparkles } from "lucide-react";
import { IconCelebration } from "@/components/icons";
import { IllustrationWedding, IllustrationParty } from "@/components/illustrations";

export default function CelebrationsPage() {
  const { locale, t } = useLocale();

  // Inquiry form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    guests: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });

      if (!res.ok) throw new Error("Event inquiry failed");

      toast.success(t("celebrations.success"));
      setForm({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        date: "",
        guests: "",
        message: "",
      });
    } catch {
      toast.error(t("common.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50/40 to-white">
      {/* Hero Section */}
      <AnimatedSection>
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <IconCelebration className="h-10 w-10 text-pink-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-pink-900">
                {t("celebrations.title")}
              </h1>
            </div>
            <p className="text-xl text-pink-800/80 max-w-2xl mx-auto mb-3">
              {t("celebrations.subtitle")}
            </p>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              {t("celebrations.description")}
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Event Types Grid */}
      <AnimatedSection delay={0.1}>
        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl font-semibold text-center text-foreground mb-8">
            {locale === "cs"
              ? "Typy akcí, které pořádáme"
              : "Типи заходів, які ми організовуємо"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {celebrationTypes.map((type) => (
              <Card
                key={type.id}
                className="text-center hover:shadow-lg transition-shadow border-pink-100"
              >
                <CardHeader className="pb-2">
                  <div className="text-5xl mb-3">{type.icon}</div>
                  <CardTitle className="text-lg">{t(type.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {t(type.descriptionKey)}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Celebration Themes */}
      <AnimatedSection delay={0.15}>
        <section className="container mx-auto px-4 pb-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="h-6 w-6 text-pink-600" />
            <h2 className="text-2xl font-semibold text-foreground">
              {locale === "cs" ? "Tematické styly" : "Тематичні стилі"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {celebrationThemes.map((theme) => (
              <Card
                key={theme.id}
                className={`${theme.color} border-0 hover:shadow-lg transition-shadow`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    {t(theme.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t(theme.descKey)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Packages Section */}
      <AnimatedSection delay={0.2}>
        <section className="container mx-auto px-4 pb-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Star className="h-6 w-6 text-amber-500" />
            <h2 className="text-2xl font-semibold text-foreground">
              {locale === "cs" ? "Naše balíčky" : "Наші пакети"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {celebrationPackages.map((pkg, index) => (
              <Card
                key={pkg.id}
                className={`relative overflow-hidden hover:shadow-lg transition-shadow ${
                  index === 1 ? "border-pink-300 ring-2 ring-pink-200" : ""
                }`}
              >
                {index === 1 && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-none rounded-bl-lg bg-pink-600 text-white hover:bg-pink-600">
                      {locale === "cs" ? "Nejoblíbenější" : "Найпопулярніший"}
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.title[locale]}</CardTitle>
                  <CardDescription>{pkg.description[locale]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features[locale].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Gallery Placeholder */}
      <AnimatedSection delay={0.25}>
        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl font-semibold text-center text-foreground mb-8">
            {locale === "cs"
              ? "Z nasich oslav"
              : "З наших святкувань"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[IllustrationWedding, IllustrationParty, IllustrationWedding, IllustrationParty].map((Illustration, i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg flex items-center justify-center p-6"
              >
                <Illustration className="h-full w-full text-pink-400/70" />
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {locale === "cs"
              ? "Fotogalerie bude brzy doplnena."
              : "Фотогалерея буде незабаром додана."}
          </p>
        </section>
      </AnimatedSection>

      {/* Inquiry Form */}
      <AnimatedSection delay={0.3}>
        <section className="container mx-auto px-4 pb-20">
          <Card className="max-w-2xl mx-auto border-pink-200">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl text-pink-900">
                <Send className="h-5 w-5" />
                {locale === "cs"
                  ? "Nezavazna poptavka"
                  : "Незобов'язковий запит"}
              </CardTitle>
              <CardDescription>
                {locale === "cs"
                  ? "Vyplnte formular a my se vam ozveme do 24 hodin."
                  : "Заповнiть форму i ми зв'яжемося з вами протягом 24 годин."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {t("celebrations.form.name")} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      required
                      placeholder={t("celebrations.form.name")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {t("celebrations.form.email")} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleFormChange}
                      required
                      placeholder={t("celebrations.form.email")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {t("celebrations.form.phone")} *
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
                    <Label htmlFor="eventType">
                      {t("celebrations.form.eventType")} *
                    </Label>
                    <Select
                      value={form.eventType}
                      onValueChange={(value) =>
                        setForm((prev) => ({ ...prev, eventType: value }))
                      }
                      required
                    >
                      <SelectTrigger id="eventType">
                        <SelectValue
                          placeholder={t("celebrations.form.eventType")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {celebrationTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.icon} {t(type.titleKey)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">
                      {t("celebrations.form.date")} *
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">
                      {t("celebrations.form.guests")} *
                    </Label>
                    <Input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      max="200"
                      value={form.guests}
                      onChange={handleFormChange}
                      required
                      placeholder="20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    {t("celebrations.form.message")}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleFormChange}
                    placeholder={t("celebrations.form.message")}
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-pink-700 hover:bg-pink-800 text-white"
                >
                  {submitting ? (
                    t("common.loading")
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t("celebrations.form.submit")}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </AnimatedSection>
    </main>
  );
}
