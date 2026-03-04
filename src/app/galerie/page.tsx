"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/locale-context";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { galleryImages } from "@/data/gallery";
import { Camera, X } from "lucide-react";
import type { GalleryImage } from "@/types";

const categories = ["all", "food", "interior", "events", "decoration"] as const;

export default function GalleryPage() {
  const { locale, t } = useLocale();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <Camera className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
              {t("gallery.title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("gallery.subtitle")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filtry */}
      <section className="border-b bg-background sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className="shrink-0"
              >
                {cat === "all"
                  ? locale === "cs"
                    ? "Vše"
                    : "Все"
                  : t(`gallery.categories.${cat}`)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filteredImages.map((image, index) => (
              <AnimatedSection key={image.id} delay={index * 0.05}>
                <div
                  className="mb-4 cursor-pointer overflow-hidden rounded-xl break-inside-avoid group"
                  onClick={() => setSelectedImage(image)}
                >
                  {/* Placeholder pro budouci fotky */}
                  <div
                    className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 transition-transform duration-300 group-hover:scale-[1.02]"
                    style={{
                      aspectRatio: `${image.width}/${image.height}`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <Camera className="mb-2 h-8 w-8 text-primary/40" />
                      <p className="text-sm font-medium text-muted-foreground/60">
                        {image.alt[locale]}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground/40">
                        {locale === "cs" ? "Foto bude doplněno" : "Фото буде додано"}
                      </p>
                    </div>
                    <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/5" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              {locale === "cs"
                ? "V této kategorii zatím nejsou žádné fotky."
                : "У цій категорії поки немає фотографій."}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {selectedImage && (
            <div>
              <div
                className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"
                style={{
                  aspectRatio: `${selectedImage.width}/${selectedImage.height}`,
                  maxHeight: "70vh",
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <Camera className="mb-3 h-12 w-12 text-primary/30" />
                  <p className="text-lg font-medium text-muted-foreground/60">
                    {selectedImage.alt[locale]}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground/40">
                    {locale === "cs"
                      ? "Fotografie bude doplněna po rekonstrukci"
                      : "Фотографію буде додано після реконструкції"}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="font-medium">{selectedImage.alt[locale]}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
