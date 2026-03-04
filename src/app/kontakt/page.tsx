"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { contactInfo, openingHours } from "@/data/restaurant";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Flower2,
  Navigation,
} from "lucide-react";

export default function ContactPage() {
  const { locale, t } = useLocale();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(t("contact.success"));
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(t("common.error"));
      }
    } catch {
      toast.error(t("common.error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <Flower2 className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
              {t("contact.title")}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Kontaktni informace */}
            <div className="space-y-8">
              <AnimatedSection>
                <div className="space-y-6">
                  {/* Adresa */}
                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold">
                          {locale === "cs" ? "Adresa" : "Адреса"}
                        </h3>
                        <p className="mt-1 text-muted-foreground">
                          {contactInfo.address}
                        </p>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <Navigation className="h-3 w-3" />
                          {locale === "cs" ? "Navigovat" : "Навігація"}
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Telefon */}
                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold">
                          {locale === "cs" ? "Telefon" : "Телефон"}
                        </h3>
                        <a
                          href={`tel:${contactInfo.phone}`}
                          className="mt-1 text-lg text-muted-foreground hover:text-primary"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Email */}
                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold">E-mail</h3>
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="mt-1 text-muted-foreground hover:text-primary"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Otviraci doba */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-serif font-semibold">
                          {t("contact.openingHours")}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {openingHours.map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-muted-foreground">
                              {item.days[locale]}
                            </span>
                            <span className="font-medium">{item.hours}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedSection>
            </div>

            {/* Formular a mapa */}
            <div className="space-y-8">
              {/* Google Maps */}
              <AnimatedSection delay={0.1}>
                <Card className="overflow-hidden">
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent("Topolová 2916/14, Praha 10, Czech Republic")}&language=${locale}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Rozkvetlá restaurace - mapa"
                    />
                  </div>
                </Card>
              </AnimatedSection>

              {/* Kontaktni formular */}
              <AnimatedSection delay={0.2}>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="mb-6 font-serif text-2xl font-bold">
                      {locale === "cs" ? "Napište nám" : "Напишіть нам"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t("contact.form.name")}</Label>
                          <Input
                            id="name"
                            name="name"
                            required
                            placeholder={t("contact.form.name")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            {t("contact.form.email")}
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder={t("contact.form.email")}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">
                          {t("contact.form.subject")}
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder={t("contact.form.subject")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">
                          {t("contact.form.message")}
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          placeholder={t("contact.form.message")}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full gap-2"
                        disabled={loading}
                      >
                        <Send className="h-4 w-4" />
                        {loading
                          ? t("common.loading")
                          : t("contact.form.submit")}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
