"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  CalendarDays,
  ShoppingBag,
  Mail,
  PartyPopper,
  LogOut,
  RefreshCw,
  Clock,
  Check,
  X,
  Eye,
  Users,
} from "lucide-react";
import { IconBloom } from "@/components/icons";

interface Stats {
  totalReservations: number;
  todayReservations: number;
  pendingOrders: number;
  unreadMessages: number;
  totalEvents: number;
}

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  note: string | null;
  status: string;
  createdAt: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  pickupTime: string;
  note: string | null;
  totalPrice: number;
  status: string;
  items: OrderItem[];
  createdAt: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

type Tab = "overview" | "reservations" | "orders" | "messages";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  preparing: "bg-purple-100 text-purple-800",
  ready: "bg-emerald-100 text-emerald-800",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Čeká",
  confirmed: "Potvrzeno",
  completed: "Dokončeno",
  cancelled: "Zrušeno",
  preparing: "Připravuje se",
  ready: "Připraveno",
};

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, resRes, ordRes, msgRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/reservations"),
        fetch("/api/admin/orders"),
        fetch("/api/admin/messages"),
      ]);

      if (statsRes.status === 401) {
        window.location.href = "/admin";
        return;
      }

      setStats(await statsRes.json());
      setReservations(await resRes.json());
      setOrders(await ordRes.json());
      setMessages(await msgRes.json());
    } catch {
      toast.error("Chyba při načítání dat.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin";
  }

  async function updateReservationStatus(id: string, status: string) {
    try {
      const res = await fetch("/api/admin/reservations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        toast.success("Status rezervace aktualizován.");
        fetchData();
      }
    } catch {
      toast.error("Chyba při aktualizaci.");
    }
  }

  async function updateOrderStatus(id: string, status: string) {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        toast.success("Status objednávky aktualizován.");
        fetchData();
      }
    } catch {
      toast.error("Chyba při aktualizaci.");
    }
  }

  async function markMessageRead(id: string) {
    try {
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: true }),
      });
      fetchData();
    } catch {
      toast.error("Chyba.");
    }
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

  const formatDateTime = (d: string) =>
    new Date(d).toLocaleString("cs-CZ", {
      day: "numeric",
      month: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconBloom className="h-6 w-6 text-primary" />
            <h1 className="font-serif text-xl font-bold">Administrace</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchData}
              disabled={loading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`}
              />
              Obnovit
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Odhlásit
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Navigation tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-lg p-1 shadow-sm border overflow-x-auto">
          {(
            [
              { key: "overview", label: "Přehled", icon: Eye },
              { key: "reservations", label: "Rezervace", icon: CalendarDays },
              { key: "orders", label: "Objednávky", icon: ShoppingBag },
              { key: "messages", label: "Zprávy", icon: Mail },
            ] as const
          ).map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={tab === key ? "default" : "ghost"}
              size="sm"
              onClick={() => setTab(key)}
              className="gap-1.5 whitespace-nowrap"
            >
              <Icon className="h-4 w-4" />
              {label}
              {key === "orders" && stats?.pendingOrders ? (
                <Badge variant="destructive" className="ml-1 text-xs px-1.5">
                  {stats.pendingOrders}
                </Badge>
              ) : null}
              {key === "messages" && stats?.unreadMessages ? (
                <Badge variant="destructive" className="ml-1 text-xs px-1.5">
                  {stats.unreadMessages}
                </Badge>
              ) : null}
            </Button>
          ))}
        </div>

        {/* Overview tab */}
        {tab === "overview" && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                icon={CalendarDays}
                label="Dnešní rezervace"
                value={stats.todayReservations}
                color="text-blue-600"
              />
              <StatCard
                icon={ShoppingBag}
                label="Čekající objednávky"
                value={stats.pendingOrders}
                color="text-orange-600"
              />
              <StatCard
                icon={Mail}
                label="Nepřečtené zprávy"
                value={stats.unreadMessages}
                color="text-red-600"
              />
              <StatCard
                icon={PartyPopper}
                label="Poptávky oslav"
                value={stats.totalEvents}
                color="text-pink-600"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent reservations */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Poslední rezervace
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {reservations.slice(0, 5).map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div>
                        <span className="font-medium">{r.name}</span>
                        <span className="text-muted-foreground ml-2">
                          {formatDate(r.date)} {r.time} · {r.guests} os.
                        </span>
                      </div>
                      <Badge
                        className={STATUS_COLORS[r.status] || "bg-gray-100"}
                      >
                        {STATUS_LABELS[r.status] || r.status}
                      </Badge>
                    </div>
                  ))}
                  {reservations.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Žádné rezervace.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Recent orders */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Poslední objednávky
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {orders.slice(0, 5).map((o) => (
                    <div
                      key={o.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div>
                        <span className="font-medium">{o.name}</span>
                        <span className="text-muted-foreground ml-2">
                          {o.pickupTime} · {o.totalPrice / 100} Kč
                        </span>
                      </div>
                      <Badge
                        className={STATUS_COLORS[o.status] || "bg-gray-100"}
                      >
                        {STATUS_LABELS[o.status] || o.status}
                      </Badge>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Žádné objednávky.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Reservations tab */}
        {tab === "reservations" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Rezervace
              </CardTitle>
              <CardDescription>
                Celkem: {stats?.totalReservations || 0}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 pr-4 font-medium">Jméno</th>
                      <th className="pb-2 pr-4 font-medium">Datum</th>
                      <th className="pb-2 pr-4 font-medium">Čas</th>
                      <th className="pb-2 pr-4 font-medium">Osoby</th>
                      <th className="pb-2 pr-4 font-medium">Kontakt</th>
                      <th className="pb-2 pr-4 font-medium">Status</th>
                      <th className="pb-2 font-medium">Akce</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((r) => (
                      <tr key={r.id} className="border-b last:border-0">
                        <td className="py-3 pr-4 font-medium">{r.name}</td>
                        <td className="py-3 pr-4">{formatDate(r.date)}</td>
                        <td className="py-3 pr-4">{r.time}</td>
                        <td className="py-3 pr-4">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {r.guests}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          <div>{r.phone}</div>
                          <div className="text-muted-foreground text-xs">
                            {r.email}
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge
                            className={
                              STATUS_COLORS[r.status] || "bg-gray-100"
                            }
                          >
                            {STATUS_LABELS[r.status] || r.status}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex gap-1">
                            {r.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs"
                                  onClick={() =>
                                    updateReservationStatus(r.id, "confirmed")
                                  }
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Potvrdit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs text-red-600"
                                  onClick={() =>
                                    updateReservationStatus(r.id, "cancelled")
                                  }
                                >
                                  <X className="h-3 w-3 mr-1" />
                                  Zrušit
                                </Button>
                              </>
                            )}
                            {r.status === "confirmed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs"
                                onClick={() =>
                                  updateReservationStatus(r.id, "completed")
                                }
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Dokončit
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {reservations.length === 0 && (
                  <p className="text-center py-8 text-muted-foreground">
                    Zatím žádné rezervace.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Orders tab */}
        {tab === "orders" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Objednávky s sebou
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="font-semibold">{o.name}</span>
                      <span className="text-muted-foreground text-sm ml-2">
                        {o.phone}
                      </span>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Vyzvednutí: {o.pickupTime}
                        <span className="text-xs">
                          · {formatDateTime(o.createdAt)}
                        </span>
                      </div>
                    </div>
                    <Badge
                      className={STATUS_COLORS[o.status] || "bg-gray-100"}
                    >
                      {STATUS_LABELS[o.status] || o.status}
                    </Badge>
                  </div>

                  <div className="bg-muted/50 rounded p-3 mb-3">
                    {o.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm py-0.5"
                      >
                        <span>
                          {item.quantity}× {item.name}
                        </span>
                        <span>{(item.price * item.quantity) / 100} Kč</span>
                      </div>
                    ))}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Celkem</span>
                      <span>{o.totalPrice / 100} Kč</span>
                    </div>
                  </div>

                  {o.note && (
                    <p className="text-sm text-muted-foreground mb-3">
                      Poznámka: {o.note}
                    </p>
                  )}

                  <div className="flex gap-2">
                    {o.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() =>
                            updateOrderStatus(o.id, "confirmed")
                          }
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Potvrdit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600"
                          onClick={() =>
                            updateOrderStatus(o.id, "cancelled")
                          }
                        >
                          <X className="h-3 w-3 mr-1" />
                          Zrušit
                        </Button>
                      </>
                    )}
                    {o.status === "confirmed" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          updateOrderStatus(o.id, "preparing")
                        }
                      >
                        Připravuje se
                      </Button>
                    )}
                    {o.status === "preparing" && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(o.id, "ready")}
                      >
                        Připraveno
                      </Button>
                    )}
                    {o.status === "ready" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          updateOrderStatus(o.id, "completed")
                        }
                      >
                        Vyzvednuto
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">
                  Zatím žádné objednávky.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Messages tab */}
        {tab === "messages" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Zprávy z kontaktního formuláře
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`border rounded-lg p-4 ${
                    !m.read ? "bg-blue-50/50 border-blue-200" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-semibold">{m.name}</span>
                      {!m.read && (
                        <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">
                          Nové
                        </Badge>
                      )}
                      <div className="text-sm text-muted-foreground mt-0.5">
                        {m.email}
                        {m.phone && ` · ${m.phone}`}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(m.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{m.message}</p>
                  {!m.read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="mt-2 text-xs"
                      onClick={() => markMessageRead(m.id)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Označit jako přečtené
                    </Button>
                  )}
                </div>
              ))}
              {messages.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">
                  Žádné zprávy.
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <Icon className={`h-8 w-8 ${color}`} />
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
