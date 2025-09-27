import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, Clock, Ticket, X } from "lucide-react";

/**
 * EventHub Africa demo page
 * - Events listing -> event modal -> ticket selection -> checkout -> confirmation
 * - Put this file in client/src/pages/EventHub.tsx
 * - Add route: <Route path="/eventhub" component={EventHub} />
 */

type TicketOption = {
  id: string;
  label: string;
  price: number;
  available: number;
};

type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  imageUrl: string;
  category: string; // Concert, Conference, Wedding, etc.
  excerpt: string;
  description: string;
  tickets: TicketOption[];
};

export default function EventHub() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [cart, setCart] = useState<Record<string, { ticket: TicketOption; qty: number }>>({});
  const [view, setView] = useState<"list" | "checkout" | "confirmation">("list");
  const [orderRef, setOrderRef] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setEvents(sampleEvents);
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  // subtotal
  const subtotal = useMemo(() => {
    return Object.values(cart).reduce((s, c) => s + c.ticket.price * c.qty, 0);
  }, [cart]);

  const addTicket = (ticket: TicketOption) => {
    setCart((prev) => {
      const ex = prev[ticket.id];
      return { ...prev, [ticket.id]: { ticket, qty: ex ? ex.qty + 1 : 1 } };
    });
  };

  const changeQty = (ticketId: string, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[ticketId];
        return next;
      }
      const item = prev[ticketId];
      if (!item) return prev;
      return { ...prev, [ticketId]: { ...item, qty } };
    });
  };

  const placeOrder = () => {
    if (Object.keys(cart).length === 0) return;
    // fake order ref
    const ref = `EH-${Math.floor(100000 + Math.random() * 899999)}`;
    setOrderRef(ref);
    setView("confirmation");
    setCart({});
    setSelectedEvent(null);
  };

  return (
    <div className="pt-28 pb-16" data-testid="eventhub-page">
      {/* pt-28 avoids being covered by fixed navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">EventHub Africa</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Discover and book tickets for concerts, conferences, weddings and more across Nigeria.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge className="px-3 py-1">Events • Live</Badge>
              <Badge className="px-3 py-1">Secure Payment</Badge>
              <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Explore</Button>
            </div>
          </div>
        </header>

        {/* Main */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="w-full h-44" />
                <CardContent>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-8 w-28 mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : view === "list" ? (
          <>
            {/* Filters row (simple) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <select className="px-3 py-2 rounded-md border bg-transparent">
                  <option>All categories</option>
                  <option>Concert</option>
                  <option>Conference</option>
                  <option>Wedding</option>
                </select>
                <select className="px-3 py-2 rounded-md border bg-transparent">
                  <option>All cities</option>
                  <option>Lagos</option>
                  <option>Abuja</option>
                  <option>Port Harcourt</option>
                </select>
              </div>

              <div className="text-sm text-muted-foreground">
                Showing {events?.length ?? 0} events
              </div>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {events!.map((ev) => (
                <Card key={ev.id} className="group cursor-pointer" onClick={() => setSelectedEvent(ev)}>
                  <div className="relative overflow-hidden">
                    <img src={ev.imageUrl} alt={ev.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute left-3 top-3">
                      <Badge className="px-2 py-1">{ev.category}</Badge>
                    </div>
                    <div className="absolute right-3 top-3 text-right text-white">
                      <div className="text-sm bg-black/50 px-2 py-1 rounded">{ev.date}</div>
                    </div>
                  </div>

                  <CardContent>
                    <h3 className="text-lg font-semibold mb-2">{ev.title}</h3>
                    <div className="text-sm text-muted-foreground mb-3">{ev.excerpt}</div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{ev.city}</span>
                        <Clock className="h-4 w-4 ml-3" />
                        <span>{ev.time}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={(e) => { e.stopPropagation(); setSelectedEvent(ev); }}>
                          View
                        </Button>
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); /* quick add cheapest ticket */ 
                          const opt = ev.tickets[0];
                          addTicket(opt);
                        }}>
                          <Ticket className="h-4 w-4 mr-1" /> Book
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : view === "checkout" ? (
          <section className="py-8">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Checkout</h2>
                    <div className="text-sm text-muted-foreground">Secure • Pay on arrival / Card (demo)</div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Selected Tickets</div>
                      <div className="mt-2 space-y-3">
                        {Object.values(cart).map((c) => (
                          <div key={c.ticket.id} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{c.ticket.label}</div>
                              <div className="text-sm text-muted-foreground">{c.qty} × ₦{c.ticket.price.toLocaleString()}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" onClick={() => changeQty(c.ticket.id, c.qty - 1)}>-</Button>
                              <div className="font-medium">{c.qty}</div>
                              <Button size="sm" variant="ghost" onClick={() => changeQty(c.ticket.id, c.qty + 1)}>+</Button>
                            </div>
                          </div>
                        ))}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="font-bold">Subtotal</div>
                          <div className="font-bold">₦{subtotal.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground">Your Details</div>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input className="w-full border rounded-md px-3 py-2" placeholder="Full name" />
                        <input className="w-full border rounded-md px-3 py-2" placeholder="Phone (e.g. +234 80 ...)" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button onClick={placeOrder} disabled={Object.keys(cart).length === 0}>Place Booking</Button>
                      <Button variant="ghost" onClick={() => setView("list")}>Back</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        ) : (
          <section className="py-8">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">Booking Confirmed</h2>
                      <div className="text-sm text-muted-foreground">Order ref: <span className="font-mono">{orderRef}</span></div>
                    </div>
                    <Badge className="px-3 py-1">E-ticket</Badge>
                  </div>

                  <div className="text-muted-foreground">Thank you! Your booking is confirmed. Present this reference at the entrance or show the e-ticket.</div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/20">
                      <div className="font-medium">Event</div>
                      <div className="text-sm">Multiple (see your email for details)</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/20">
                      <div className="font-medium">Total Paid</div>
                      <div className="text-sm">₦{subtotal.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button onClick={() => { setView("list"); setOrderRef(null); }}>Back to Events</Button>
                    <Button variant="outline">Download E-ticket</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Right-side (mobile below, desktop sidebar): quick cart summary */}
        <aside className="mt-8">
          <div className="sticky top-36">
            <Card>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Ticket className="h-5 w-5" />
                    <div className="font-medium">Your Cart</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{Object.keys(cart).length} items</div>
                </div>

                {Object.values(cart).length === 0 ? (
                  <div className="text-sm text-muted-foreground">No tickets selected yet.</div>
                ) : (
                  <div className="space-y-2">
                    {Object.values(cart).map((c) => (
                      <div key={c.ticket.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{c.ticket.label}</div>
                          <div className="text-sm text-muted-foreground">x{c.qty}</div>
                        </div>
                        <div>₦{(c.ticket.price * c.qty).toLocaleString()}</div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="font-bold">Total</div>
                      <div className="font-bold">₦{subtotal.toLocaleString()}</div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button onClick={() => setView("checkout")} className="flex-1">Checkout</Button>
                      <Button variant="ghost" onClick={() => setCart({})}>Clear</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Event details modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-card rounded-2xl w-full max-w-4xl overflow-hidden">
              <div className="relative">
                <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="w-full h-64 object-cover" />
                <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-card/90">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="max-w-2xl">
                    <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {selectedEvent.date} • {selectedEvent.time}</div>
                      <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {selectedEvent.venue}, {selectedEvent.city}</div>
                    </div>
                    <p className="mt-4 text-muted-foreground">{selectedEvent.description}</p>
                  </div>

                  <div className="w-56">
                    <div className="text-sm text-muted-foreground mb-2">Tickets</div>
                    <div className="space-y-2">
                      {selectedEvent.tickets.map((t) => (
                        <div key={t.id} className="flex items-center justify-between border rounded-md p-3">
                          <div>
                            <div className="font-medium">{t.label}</div>
                            <div className="text-sm text-muted-foreground">{t.available} available</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">₦{t.price.toLocaleString()}</div>
                            <div className="mt-2 flex items-center gap-2">
                              <Button size="sm" variant="ghost" onClick={() => changeQty(t.id, (cart[t.id]?.qty ?? 0) - 1)}>-</Button>
                              <div>{cart[t.id]?.qty ?? 0}</div>
                              <Button size="sm" onClick={() => addTicket(t)}>Add</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <Button onClick={() => { setSelectedEvent(null); setView("checkout"); }}>Go to Checkout</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------
   Sample data (replace with real images & feeds)
   ------------------------ */
const sampleEvents: EventItem[] = [
  {
    id: "e1",
    title: "AfroBeat Nights — Lagos Live",
    date: "2025-11-12",
    time: "19:00",
    venue: "Eko Convention Centre",
    city: "Lagos",
    imageUrl: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg",
    category: "Concert",
    excerpt: "A night of top Afrobeat artists, DJs and a vibrant crowd.",
    description:
      "Experience the best Afrobeat artists live on stage with immersive sound and LED visuals. Food & drinks stalls available.",
    tickets: [
      { id: "t-e1-vip", label: "VIP (Front)", price: 25000, available: 50 },
      { id: "t-e1-ga", label: "General Admission", price: 8000, available: 500 },
      { id: "t-e1-early", label: "Early Bird", price: 6000, available: 200 },
    ],
  },
  {
    id: "e2",
    title: "TechNigeria Summit 2025",
    date: "2025-10-03",
    time: "09:00",
    venue: "Transcorp Hilton",
    city: "Abuja",
    imageUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    category: "Conference",
    excerpt: "Keynotes, panels and workshops focused on African tech growth.",
    description:
      "Join founders, investors and engineers for a day of compelling talks, networking and workshops on scaling tech businesses in Africa.",
    tickets: [
      { id: "t-e2-pro", label: "Professional", price: 35000, available: 200 },
      { id: "t-e2-student", label: "Student", price: 8000, available: 150 },
    ],
  },
  {
    id: "e3",
    title: "Lagos Wedding Expo",
    date: "2025-12-04",
    time: "10:00",
    venue: "Eko Hotel",
    city: "Lagos",
    imageUrl: "https://images.pexels.com/photos/1669827/pexels-photo-1669827.jpeg",
    category: "Wedding",
    excerpt: "Vendors, planners and inspiration for your big day.",
    description:
      "Meet top wedding vendors, browse sample setups, and book on-the-spot consultations with planners and photographers.",
    tickets: [
      { id: "t-e3-vip", label: "Vendor Pass", price: 15000, available: 80 },
      { id: "t-e3-guest", label: "Guest Pass", price: 3000, available: 1000 },
    ],
  },
  // add more demo events if you like
];
