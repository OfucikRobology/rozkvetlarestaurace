"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { galleryImages } from "@/data/gallery";
import { IconLens } from "@/components/icons";
import { getIllustrationForGallery } from "@/components/illustrations";
import type { GalleryImage } from "@/types";

const categories = ["all", "food", "interior", "events", "decoration"] as const;

// Soft per-category gradient backgrounds
const categoryGradients: Record<string, string> = {
  food: "from-amber-50/80 via-orange-50/40 to-green-50/50",
  interior: "from-stone-50/80 via-slate-50/40 to-amber-50/50",
  events: "from-rose-50/80 via-pink-50/40 to-amber-50/50",
  decoration: "from-emerald-50/80 via-teal-50/40 to-lime-50/50",
};

// Track index per-category so each card gets a unique illustration
function getCategoryIndex(images: GalleryImage[], currentImage: GalleryImage) {
  return images
    .filter((img) => img.category === currentImage.category)
    .findIndex((img) => img.id === currentImage.id);
}

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
            <IconLens className="mx-auto mb-4 h-12 w-12 text-primary" />
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
            {filteredImages.map((image, index) => {
              const catIdx = getCategoryIndex(galleryImages, image);
              const Illustration = getIllustrationForGallery(image.category, catIdx);
              const gradient = categoryGradients[image.category] || categoryGradients.food;

              return (
                <AnimatedSection key={image.id} delay={index * 0.05}>
                  <div
                    className="mb-4 cursor-pointer overflow-hidden rounded-xl break-inside-avoid group"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div
                      className={`relative bg-gradient-to-br ${gradient} transition-transform duration-300 group-hover:scale-[1.02]`}
                      style={{
                        aspectRatio: `${image.width}/${image.height}`,
                      }}
                    >
                      {/* SVG illustration */}
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <Illustration className="h-full w-full max-h-40 text-primary/70" />
                      </div>

                      {/* Label overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/80 to-transparent p-4 pt-8">
                        <p className="text-sm font-medium text-foreground/70">
                          {image.alt[locale]}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground/50">
                          {locale === "cs" ? "Foto bude doplněno" : "Фото буде додано"}
                        </p>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/5" />
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
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
          {selectedImage && (() => {
            const catIdx = getCategoryIndex(galleryImages, selectedImage);
            const Illustration = getIllustrationForGallery(selectedImage.category, catIdx);
            const gradient = categoryGradients[selectedImage.category] || categoryGradients.food;

            return (
              <div>
                <div
                  className={`relative bg-gradient-to-br ${gradient}`}
                  style={{
                    aspectRatio: `${selectedImage.width}/${selectedImage.height}`,
                    maxHeight: "70vh",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <Illustration className="h-full w-full max-h-64 text-primary/60" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/90 to-transparent p-6 pt-12 text-center">
                    <p className="text-lg font-medium text-foreground/70">
                      {selectedImage.alt[locale]}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground/50">
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
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
