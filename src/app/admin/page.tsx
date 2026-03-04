"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { IconBloom } from "@/components/icons";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.href = "/admin/dashboard";
      } else {
        toast.error("Nesprávné heslo.");
      }
    } catch {
      toast.error("Chyba při přihlášení.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <IconBloom className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="font-serif text-2xl">
            Administrace
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Rozkvetlá restaurace
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Heslo</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Zadejte heslo"
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              <Lock className="h-4 w-4" />
              {loading ? "Přihlašování..." : "Přihlásit se"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
