"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/locale-context";
import { AnimatedSection } from "@/components/ui/animated-section";
import { featuredItems } from "@/data/menu";
import { openingHours } from "@/data/restaurant";
import { ArrowRight } from "lucide-react";
import {
  IconBloom,
  IconDining,
  IconTime,
  IconLeaf,
  IconSprout,
  IconCelebration,
  DecoLeaf,
  FloralDivider,
} from "@/components/icons";

const menuCardImages = [
  "/images/menu-1.jpg",
  "/images/menu-2.jpg",
  "/images/menu-3.jpg",
  "/images/menu-4.jpg",
];

/* ──────────────────────────────────────────────
   Homepage
   ────────────────────────────────────────────── */
export default function HomePage() {
  const { locale, t } = useLocale();

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-hero">
        {/* Decorative elements */}
        <DecoLeaf className="pointer-events-none absolute -left-10 top-10 h-40 w-40 text-primary opacity-60 rotate-[-20deg]" />
        <DecoLeaf className="pointer-events-none absolute -right-8 bottom-16 h-36 w-36 text-primary opacity-40 rotate-[30deg]" />

        <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2">
          <IconBloom
            className="h-10 w-10 text-primary opacity-15"
            strokeWidth={1.2}
          />
        </div>
        <div className="pointer-events-none absolute bottom-12 left-16 hidden md:block">
          <IconSprout
            className="h-8 w-8 text-primary opacity-15"
            strokeWidth={1.2}
          />
        </div>
        <div className="pointer-events-none absolute right-20 top-24 hidden md:block">
          <IconLeaf
            className="h-9 w-9 text-primary opacity-12 rotate-45"
            strokeWidth={1.2}
          />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:py-40">
          {/* Flower divider above title */}
          <FloralDivider className="mb-6" />

          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient-nature">{t("hero.title")}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {t("hero.subtitle")}
          </p>

          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground/80">
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/rezervace"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t("hero.cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-8 py-3.5 text-base font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <IconDining className="h-4 w-4" />
              {t("menu.title")}
            </Link>
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
                {t("about.title")}
              </h2>
              <div className="divider-floral mx-auto mt-4 max-w-xs">
                <IconLeaf className="h-4 w-4 shrink-0 text-primary/50" />
              </div>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <AnimatedSection delay={0.1}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t("about.text1")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t("about.text2")}
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3}>
            <div className="mt-10 rounded-2xl border border-border bg-gradient-nature p-6 text-center shadow-sm sm:p-8">
              <IconBloom
                className="mx-auto mb-3 h-8 w-8 text-primary/70"
                strokeWidth={1.5}
              />
              <p className="text-base font-medium text-foreground/90 sm:text-lg">
                {t("about.flowerShop")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ FEATURED MENU ============ */}
      <section className="bg-muted/40 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
                {locale === "cs" ? "Z na\u0161eho menu" : "\u0417 \u043d\u0430\u0448\u043e\u0433\u043e \u043c\u0435\u043d\u044e"}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {locale === "cs"
                  ? "Ochutnejte to nejlep\u0161\u00ed z \u010desk\u00e9 a ukrajinsk\u00e9 kuchyn\u011b"
                  : "\u0421\u043a\u0443\u0448\u0442\u0443\u0439\u0442\u0435 \u043d\u0430\u0439\u043a\u0440\u0430\u0449\u0435 \u0437 \u0447\u0435\u0441\u044c\u043a\u043e\u0457 \u0442\u0430 \u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u043e\u0457 \u043a\u0443\u0445\u043d\u0456"}
              </p>
              <div className="divider-floral mx-auto mt-4 max-w-xs">
                <IconDining className="h-4 w-4 shrink-0 text-primary/50" />
              </div>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredItems.map((item, idx) => {
              return (
                <AnimatedSection key={item.id} delay={0.1 + idx * 0.1}>
                  <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                    {/* Food photo */}
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={menuCardImages[idx % menuCardImages.length]}
                        alt={item.name[locale]}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>

                    {/* Card body */}
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-semibold leading-snug">
                        {item.name[locale]}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                        {item.description[locale]}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {item.price}&nbsp;{t("common.czk")}
                        </span>
                        {item.allergens && item.allergens.length > 0 && (
                          <span className="text-xs text-muted-foreground/70">
                            {locale === "cs" ? "Alergeny" : "\u0410\u043b\u0435\u0440\u0433\u0435\u043d\u0438"}:{" "}
                            {item.allergens.join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection delay={0.5}>
            <div className="mt-10 text-center">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {t("common.seeAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ CELEBRATIONS CTA ============ */}
      <section className="relative overflow-hidden bg-gradient-golden py-20 sm:py-24">
        {/* Decorative corner accents */}
        <div className="pointer-events-none absolute -right-6 -top-6">
          <IconBloom
            className="h-24 w-24 text-primary opacity-8"
            strokeWidth={0.8}
          />
        </div>
        <div className="pointer-events-none absolute -bottom-4 -left-4">
          <IconLeaf
            className="h-20 w-20 text-primary opacity-8 rotate-180"
            strokeWidth={0.8}
          />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <AnimatedSection>
            <IconCelebration className="mx-auto mb-4 h-10 w-10 text-accent-foreground/70" />

            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
              {t("celebrations.title")}
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              {t("celebrations.description")}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {(["wedding", "birthday", "corporate", "christening"] as const).map(
                (type) => (
                  <span
                    key={type}
                    className="rounded-full bg-background/70 px-4 py-1.5 text-sm font-medium text-foreground/80 backdrop-blur-sm"
                  >
                    {t(`celebrations.types.${type}`)}
                  </span>
                )
              )}
            </div>

            <div className="mt-10">
              <Link
                href="/oslavy"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {locale === "cs"
                  ? "Naplánujte svou oslavu"
                  : "\u0421\u043f\u043b\u0430\u043d\u0443\u0439\u0442\u0435 \u0441\u0432\u044f\u0442\u043a\u0443\u0432\u0430\u043d\u043d\u044f"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ OPENING HOURS ============ */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center">
              <IconTime className="mx-auto mb-3 h-8 w-8 text-primary/60" />
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
                {t("contact.openingHours")}
              </h2>
              <div className="divider-floral mx-auto mt-4 max-w-xs">
                <IconBloom
                  className="h-4 w-4 shrink-0 text-primary/50"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="divide-y divide-border">
                {openingHours.map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/40"
                  >
                    <span className="font-medium">{entry.days[locale]}</span>
                    <span className="font-semibold text-primary">
                      {entry.closed
                        ? locale === "cs"
                          ? "Zav\u0159eno"
                          : "\u0417\u0430\u0447\u0438\u043d\u0435\u043d\u043e"
                        : entry.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <div className="mt-8 text-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                {t("common.readMore")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
