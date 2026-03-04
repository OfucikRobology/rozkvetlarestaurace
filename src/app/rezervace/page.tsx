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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CalendarDays, Clock, Users, Send, Info } from "lucide-react";
import { IconBloom } from "@/components/icons";

// Generate time slots from 11:00 to 21:00 in 30-minute intervals
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 11; hour <= 21; hour++) {
    for (const minutes of [0, 30]) {
      // Skip 21:30 — last slot is 21:00
      if (hour === 21 && minutes === 30) continue;
      const hh = hour.toString().padStart(2, "0");
      const mm = minutes.toString().padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

export default function ReservationPage() {
  const { t } = useLocale();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get today's date in YYYY-MM-DD for the min attribute on the date input
  const today = new Date().toISOString().split("T")[0];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? Math.max(1, Math.min(150, Number(value))) : value,
    }));
  }

  function handleTimeChange(value: string) {
    setFormData((prev) => ({ ...prev, time: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Client-side validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.date ||
      !formData.time
    ) {
      toast.error(t("reservation.error"));
      return;
    }

    if (formData.guests < 1 || formData.guests > 150) {
      toast.error(t("reservation.error"));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          date: formData.date,
          time: formData.time,
          guests: formData.guests,
          note: formData.note.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit reservation");
      }

      toast.success(t("reservation.success"));

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 2,
        note: "",
      });
    } catch {
      toast.error(t("reservation.error"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50/50 to-white">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-green-900 py-20 text-white">
        <div className="absolute inset-0 bg-[url('/images/pattern-flowers.svg')] opacity-10" />
        <div className="container relative mx-auto px-4 text-center">
          <AnimatedSection>
            <IconBloom className="mx-auto mb-4 h-12 w-12 text-green-300" />
            <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
              {t("reservation.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-green-200">
              {t("reservation.subtitle")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="container mx-auto max-w-2xl px-4 py-16">
        <AnimatedSection delay={0.1}>
          <Card className="border-green-100 shadow-lg">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="flex items-center gap-2 text-2xl text-green-800">
                <CalendarDays className="h-6 w-6" />
                {t("reservation.title")}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">{t("reservation.form.name")} *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={t("reservation.form.name")}
                    value={formData.name}
                    onChange={handleChange}
                    className="border-green-200 focus-visible:ring-green-500"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">{t("reservation.form.email")} *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("reservation.form.email")}
                    value={formData.email}
                    onChange={handleChange}
                    className="border-green-200 focus-visible:ring-green-500"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("reservation.form.phone")} *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+420 ..."
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-green-200 focus-visible:ring-green-500"
                  />
                </div>

                {/* Date and Time row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Date */}
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-green-600" />
                      {t("reservation.form.date")} *
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      required
                      min={today}
                      value={formData.date}
                      onChange={handleChange}
                      className="border-green-200 focus-visible:ring-green-500"
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-green-600" />
                      {t("reservation.form.time")} *
                    </Label>
                    <Select
                      value={formData.time}
                      onValueChange={handleTimeChange}
                      required
                    >
                      <SelectTrigger className="border-green-200 focus:ring-green-500">
                        <SelectValue placeholder={t("reservation.form.time")} />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <Label htmlFor="guests" className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-green-600" />
                    {t("reservation.form.guests")} *
                  </Label>
                  <Input
                    id="guests"
                    name="guests"
                    type="number"
                    required
                    min={1}
                    max={150}
                    value={formData.guests}
                    onChange={handleChange}
                    className="border-green-200 focus-visible:ring-green-500"
                  />

                  {/* Capacity notice for groups > 15 */}
                  {formData.guests > 15 && (
                    <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                      <Info className="mt-0.5 h-4 w-4 shrink-0" />
                      <p>{t("reservation.maxGuests")}</p>
                    </div>
                  )}
                </div>

                {/* Note */}
                <div className="space-y-2">
                  <Label htmlFor="note">{t("reservation.form.note")}</Label>
                  <Textarea
                    id="note"
                    name="note"
                    rows={3}
                    placeholder={t("reservation.form.note")}
                    value={formData.note}
                    onChange={handleChange}
                    className="border-green-200 focus-visible:ring-green-500"
                  />
                </div>

                {/* Capacity info */}
                <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{t("reservation.capacity")}</p>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-700 text-white hover:bg-green-800 disabled:opacity-50"
                  size="lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {t("common.loading")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      {t("reservation.form.submit")}
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </AnimatedSection>
      </section>
    </main>
  );
}
