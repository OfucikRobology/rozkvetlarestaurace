"use client";

import { useLocale } from "@/lib/locale-context";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { menuItems } from "@/data/menu";
import {
  UtensilsCrossed,
  Soup,
  Salad,
  CakeSlice,
  Wine,
  ExternalLink,
  CalendarDays,
  Clock,
} from "lucide-react";
import type { MenuCategory } from "@/types";

/* -------------------------------------------------- */
/*  Category metadata helpers                         */
/* -------------------------------------------------- */

const categoryIcons: Record<MenuCategory, React.ElementType> = {
  appetizers: Salad,
  soups: Soup,
  mainCourses: UtensilsCrossed,
  desserts: CakeSlice,
  drinks: Wine,
};

const categoryOrder: MenuCategory[] = [
  "appetizers",
  "soups",
  "mainCourses",
  "desserts",
  "drinks",
];

const foodCategories: MenuCategory[] = [
  "appetizers",
  "soups",
  "mainCourses",
  "desserts",
];

/* -------------------------------------------------- */
/*  Allergen legend (EU numbering)                    */
/* -------------------------------------------------- */

const allergenNames: Record<
  string,
  Record<number, string>
> = {
  cs: {
    1: "Lepek",
    2: "Korysci",
    3: "Vejce",
    4: "Ryby",
    5: "Arasidy",
    6: "Soja",
    7: "Mleko",
    8: "Skorapky",
    9: "Celer",
    10: "Horcice",
    11: "Sezam",
    12: "Sircitan",
    13: "Vlci bob",
    14: "Mekkys",
  },
  uk: {
    1: "Глютен",
    2: "Ракоподiбнi",
    3: "Яйця",
    4: "Риба",
    5: "Арахiс",
    6: "Соя",
    7: "Молоко",
    8: "Горiхи",
    9: "Селера",
    10: "Гiрчиця",
    11: "Кунжут",
    12: "Сульфiти",
    13: "Люпин",
    14: "Молюски",
  },
};

/* -------------------------------------------------- */
/*  Weekly menu placeholder days                      */
/* -------------------------------------------------- */

const weekDayKeys = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
] as const;

/* ================================================== */
/*  MenuPage component                                */
/* ================================================== */

export default function MenuPage() {
  const { locale, t } = useLocale();

  /* Group menu items by category */
  const grouped = menuItems.reduce<Record<MenuCategory, typeof menuItems>>(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<MenuCategory, typeof menuItems>
  );

  /* Helper: render a single menu item card */
  const renderMenuItem = (item: (typeof menuItems)[number]) => (
    <div
      key={item.id}
      className="group flex items-start justify-between gap-4 rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md sm:p-5"
    >
      {/* Left: name, description, allergens */}
      <div className="min-w-0 flex-1 space-y-1.5">
        <h4 className="font-serif text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {item.name[locale]}
        </h4>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {item.description[locale]}
        </p>

        {/* Allergen badges */}
        {item.allergens && item.allergens.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.allergens.map((num) => (
              <Badge
                key={num}
                variant="outline"
                className="h-5 rounded-md px-1.5 text-[10px] font-medium text-muted-foreground"
                title={
                  allergenNames[locale]?.[num] ??
                  allergenNames.cs[num] ??
                  String(num)
                }
              >
                {num}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Right: price */}
      <div className="shrink-0 pt-0.5 text-right">
        <span className="font-serif text-lg font-bold text-primary">
          {item.price}&nbsp;{t("common.czk")}
        </span>
      </div>
    </div>
  );

  /* Helper: render a category section */
  const renderCategorySection = (
    category: MenuCategory,
    index: number
  ) => {
    const items = grouped[category];
    if (!items || items.length === 0) return null;

    const Icon = categoryIcons[category];

    return (
      <AnimatedSection key={category} delay={index * 0.1}>
        {index > 0 && <Separator className="my-8" />}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-foreground">
            {t(`menu.categories.${category}`)}
          </h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">{items.map(renderMenuItem)}</div>
      </AnimatedSection>
    );
  };

  /* ---------------------------------------------- */
  /*  Render                                        */
  /* ---------------------------------------------- */

  return (
    <main className="min-h-screen bg-background">
      {/* ========== Page Header ========== */}
      <section className="bg-gradient-nature pb-12 pt-28 sm:pt-32">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <AnimatedSection>
            <span className="divider-floral mx-auto mb-4 max-w-xs text-sm uppercase tracking-widest text-muted-foreground">
              <UtensilsCrossed className="mx-auto h-5 w-5 text-primary" />
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t("menu.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
              {locale === "cs"
                ? "Objevte spojeni ceske a ukrajinske kuchyne v nasem starostlive pripravovanem menu"
                : "Vidkryite poiednannia cheskoi ta ukrainskoi kukhni u nashomu retelnemu menu"}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== Tabs Section ========== */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <Tabs defaultValue="permanent" className="w-full">
          {/* Tab triggers */}
          <AnimatedSection>
            <TabsList className="mx-auto mb-10 grid w-full max-w-lg grid-cols-3">
              <TabsTrigger value="permanent" className="gap-1.5 text-sm">
                <UtensilsCrossed className="h-4 w-4" />
                <span className="hidden sm:inline">{t("menu.permanentMenu")}</span>
                <span className="sm:hidden">
                  {locale === "cs" ? "Stale" : "Postijne"}
                </span>
              </TabsTrigger>
              <TabsTrigger value="weekly" className="gap-1.5 text-sm">
                <CalendarDays className="h-4 w-4" />
                <span className="hidden sm:inline">{t("menu.weeklyMenu")}</span>
                <span className="sm:hidden">
                  {locale === "cs" ? "Tydenni" : "Tyzhden"}
                </span>
              </TabsTrigger>
              <TabsTrigger value="drinks" className="gap-1.5 text-sm">
                <Wine className="h-4 w-4" />
                <span className="hidden sm:inline">{t("menu.drinks")}</span>
                <span className="sm:hidden">
                  {locale === "cs" ? "Napoje" : "Napoi"}
                </span>
              </TabsTrigger>
            </TabsList>
          </AnimatedSection>

          {/* ============================== */}
          {/*  Tab 1 - Stale menu            */}
          {/* ============================== */}
          <TabsContent value="permanent">
            <div className="space-y-2">
              {foodCategories.map((cat, idx) =>
                renderCategorySection(cat, idx)
              )}
            </div>
          </TabsContent>

          {/* ============================== */}
          {/*  Tab 2 - Tydenni menu          */}
          {/* ============================== */}
          <TabsContent value="weekly">
            <AnimatedSection>
              <Card className="border-dashed border-primary/30 bg-card/50">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CalendarDays className="h-7 w-7" />
                  </div>
                  <CardTitle className="font-serif text-2xl">
                    {t("menu.weeklyMenu")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Weekly menu table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="pb-3 pr-4 font-semibold text-foreground">
                            {locale === "cs" ? "Den" : "День"}
                          </th>
                          <th className="pb-3 pr-4 font-semibold text-foreground">
                            {t("menu.soup")}
                          </th>
                          <th className="pb-3 pr-4 font-semibold text-foreground">
                            {t("menu.mainDish")}
                          </th>
                          <th className="pb-3 text-right font-semibold text-foreground">
                            {t("menu.price")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {weekDayKeys.map((day) => (
                          <tr
                            key={day}
                            className="border-b border-border/50 last:border-0"
                          >
                            <td className="py-3 pr-4 font-medium text-foreground">
                              {t(`menu.weekDays.${day}`)}
                            </td>
                            <td className="py-3 pr-4 text-muted-foreground">
                              &mdash;
                            </td>
                            <td className="py-3 pr-4 text-muted-foreground">
                              &mdash;
                            </td>
                            <td className="py-3 text-right text-muted-foreground">
                              &mdash;
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Placeholder notice */}
                  <div className="mt-6 flex items-center gap-3 rounded-lg bg-muted/60 p-4 text-sm text-muted-foreground">
                    <Clock className="h-5 w-5 shrink-0 text-primary" />
                    <p>
                      {locale === "cs"
                        ? "Tydenni menu aktualizujeme kazde pondeli. Sledujte nase socialni site nebo Nesnezeno.cz pro aktualni nabidku."
                        : "Tyzhdeneve menu onovliuiemo shchoponedilka. Slidkuite za nashymy sotsialnymy merezhamy abo Nesnezeno.cz dlia aktualnoi propozytsii."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>

          {/* ============================== */}
          {/*  Tab 3 - Napoje                */}
          {/* ============================== */}
          <TabsContent value="drinks">
            <AnimatedSection>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Wine className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground">
                  {t("menu.categories.drinks")}
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {(grouped.drinks ?? []).map(renderMenuItem)}
              </div>
            </AnimatedSection>
          </TabsContent>
        </Tabs>
      </section>

      {/* ========== Allergen legend ========== */}
      <section className="container mx-auto max-w-5xl px-4 pb-6">
        <AnimatedSection>
          <div className="rounded-xl border border-border/60 bg-muted/40 p-5">
            <h4 className="mb-3 font-serif text-base font-semibold text-foreground">
              {locale === "cs" ? "Alergeny" : "Алергени"}
            </h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
              {Object.entries(allergenNames[locale] ?? allergenNames.cs).map(
                ([num, name]) => (
                  <span key={num}>
                    <strong className="text-foreground">{num}</strong> &ndash;{" "}
                    {name}
                  </span>
                )
              )}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ========== Nesnezeno link ========== */}
      <section className="container mx-auto max-w-5xl px-4 pb-16">
        <AnimatedSection>
          <a
            href="https://www.nesnezeno.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-6 py-4 transition-all hover:border-primary/40 hover:bg-primary/10"
          >
            <span className="text-sm font-medium text-foreground">
              {t("menu.nesnezenoLink")}
            </span>
            <Badge
              variant="secondary"
              className="gap-1 transition-transform group-hover:translate-x-0.5"
            >
              Nesnezeno.cz
              <ExternalLink className="h-3 w-3" />
            </Badge>
          </a>
        </AnimatedSection>
      </section>
    </main>
  );
}
