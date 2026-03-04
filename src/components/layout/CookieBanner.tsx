"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";
import { Cookie } from "lucide-react";

export function CookieBanner() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 p-4 shadow-lg backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            {t("cookie.text")}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={decline}>
            {t("cookie.decline")}
          </Button>
          <Button size="sm" onClick={accept}>
            {t("cookie.accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
