"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocale } from "@/lib/locale-context";
import { NAV_LINKS } from "@/data/restaurant";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Flower2 className="h-8 w-8 text-primary transition-transform group-hover:rotate-12" />
          <span className="font-serif text-xl font-semibold text-foreground">
            Rozkvetlá
          </span>
        </Link>

        {/* Desktop navigace */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        {/* Akce */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          <Link href="/rezervace" className="hidden sm:block">
            <Button size="sm" className="gap-2">
              <Phone className="h-4 w-4" />
              {t("hero.cta")}
            </Button>
          </Link>

          {/* Mobilni menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4 pt-8">
                <Link
                  href="/"
                  className="flex items-center gap-2 mb-4"
                  onClick={() => setOpen(false)}
                >
                  <Flower2 className="h-8 w-8 text-primary" />
                  <span className="font-serif text-xl font-semibold">
                    Rozkvetlá
                  </span>
                </Link>

                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </nav>

                <div className="mt-4 border-t pt-4">
                  <Link href="/rezervace" onClick={() => setOpen(false)}>
                    <Button className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      {t("hero.cta")}
                    </Button>
                  </Link>
                </div>

                <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+420731163777">731 163 777</a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
