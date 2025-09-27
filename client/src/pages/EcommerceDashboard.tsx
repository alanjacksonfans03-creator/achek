import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Clock,
  ShoppingCart,
  X,
  Truck,
  CheckCircle,
  Map,
} from "lucide-react";

/**
 * Food delivery demo page
 * - Mobile-first layout
 * - Restaurant list -> open menu modal -> add items to cart
 * - Checkout simulation -> order tracking page
 *
 * Drop this file into client/src/pages and add route /quickeats or /food
 */

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  spicy?: boolean;
};

type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  eta: string;
  imageUrl: string;
  address: string;
  menu: MenuItem[];
};

export default function FoodDelivery() {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<Record<string, { item: MenuItem; qty: number }>>({});
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"restaurants" | "checkout" | "tracking">("restaurants");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [trackingProgress, setTrackingProgress] = useState(0);

  useEffect(() => {
    // Mock fetch delay
    const t = setTimeout(() => {
      setRestaurants(sampleRestaurants);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  // simulate tracking progress
  useEffect(() => {
    if (view !== "tracking") return;
    setTrackingProgress(10);
    const iv = setInterval(() => {
      setTrackingProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          return 100;
        }
        return Math.min(100, p + Math.floor(Math.random() * 20) + 10);
      });
    }, 1500);
    return () => clearInterval(iv);
  }, [view]);

  const subtotal = useMemo(() => {
    return Object.values(cart).reduce((s, c) => s + c.item.price * c.qty, 0);
  }, [cart]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const ex = prev[item.id];
      return { ...prev, [item.id]: { item, qty: ex ? ex.qty + 1 : 1 } };
    });
  };

  const changeQty = (itemId: string, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: { ...prev[itemId], qty } };
    });
  };

  const checkout = () => {
    if (Object.keys(cart).length === 0) return;
    // fake order id
    const id = `QE-${Math.floor(Math.random() * 90000) + 10000}`;
    setOrderId(id);
    setView("checkout");
    setTimeout(() => {
      // after brief "processing", go to tracking
      setView("tracking");
      setCart({});
    }, 1200);
  };

  return (
    <div className="pt-16" data-testid="food-delivery-page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-pink-500 flex items-center justify-center text-white font-bold">
              QE
            </div>
            <div>
              <h1 className="text-2xl font-bold">QuickEats NG — Local Food Delivery</h1>
              <p className="text-sm text-muted-foreground">Discover restaurants nearby • Fast delivery • Mobile-first</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Lagos, Nigeria</span>
              <Clock className="h-4 w-4 ml-3" />
              <span>30–45 mins</span>
            </div>

            <button
              className="relative bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={() => setView("restaurants")}
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              <span className="ml-1 font-semibold">{Object.keys(cart).length}</span>
            </button>
          </div>
        </header>

        {/* Views */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            <Skeleton className="h-48" />
            <div className="grid sm:grid-cols-2 gap-6">
              <Skeleton className="h-40" />
              <Skeleton className="h-40" />
            </div>
          </div>
        ) : view === "restaurants" ? (
          <>
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Nearby Restaurants</h2>
                <div className="text-sm text-muted-foreground">Open now • Fast delivery</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {restaurants!.map((r) => (
                  <Card key={r.id} className="overflow-hidden group cursor-pointer" onClick={() => setSelected(r)}>
                    <div className="relative">
                      <img src={r.imageUrl} alt={r.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{r.cuisine}</span>
                      </div>
                    </div>
                    <CardContent>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{r.name}</h3>
                          <div className="text-sm text-muted-foreground mt-1">{r.address}</div>
                          <div className="flex items-center gap-2 mt-3 text-sm">
                            <Badge className="px-2 py-1">⭐ {r.rating}</Badge>
                            <Badge className="px-2 py-1">ETA: {r.eta}</Badge>
                          </div>
                        </div>
                        <div>
                          <Button onClick={() => setSelected(r)}>View Menu</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Cart summary (mobile fixed bottom) */}
            <div className="fixed left-4 right-4 bottom-4 sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:mt-6 z-40">
              <div className="bg-white dark:bg-card p-4 rounded-2xl shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5" />
                  <div className="text-sm">
                    <div className="font-semibold">{Object.values(cart).reduce((s, x) => s + x.qty, 0)} items</div>
                    <div className="text-muted-foreground">Subtotal: ₦{subtotal.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={() => setCart({})}>Clear</Button>
                  <Button onClick={() => setView("checkout")} disabled={Object.keys(cart).length === 0}>
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : view === "checkout" ? (
          <section className="py-8">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Checkout</h2>
                    <div className="text-sm text-muted-foreground">Secure • Cash/Card on delivery</div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Delivery Address</div>
                      <div className="mt-2">
                        <input className="w-full border rounded-md px-3 py-2" placeholder="Enter delivery address (e.g. 23 Awolowo Rd, Ikoyi)" />
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground">Order Summary</div>
                      <div className="mt-2 space-y-2">
                        {Object.values(cart).map((c) => (
                          <div key={c.item.id} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{c.item.name}</div>
                              <div className="text-sm text-muted-foreground">x{c.qty}</div>
                            </div>
                            <div>₦{(c.item.price * c.qty).toLocaleString()}</div>
                          </div>
                        ))}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="font-bold">Subtotal</div>
                          <div className="font-bold">₦{subtotal.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button onClick={checkout} disabled={Object.keys(cart).length === 0}>
                        Place Order
                      </Button>
                      <Button variant="ghost" onClick={() => setView("restaurants")}>Back</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        ) : (
          // tracking view
          <section className="py-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">Order Tracking</h2>
                      <div className="text-sm text-muted-foreground">Order ID: {orderId}</div>
                    </div>
                    <div>
                      <Badge className="px-3 py-1">ETA 20–35 mins</Badge>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="h-2 bg-primary" style={{ width: `${trackingProgress}%` }} />
                    </div>
                    <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                      <div>Preparing</div>
                      <div>On the way</div>
                      <div>Delivered</div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Rider</div>
                      <div className="font-medium mt-1">Tunde • +234 80 1234 5678</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Vehicle</div>
                      <div className="font-medium mt-1 flex items-center gap-2">
                        <Truck className="h-5 w-5" /> Bike • Plate: KJA-123FD
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <img src="https://images.pexels.com/photos/3807621/pexels-photo-3807621.jpeg" alt="map" className="w-full h-48 object-cover rounded-lg" />
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Button onClick={() => { setView("restaurants"); setOrderId(null); }}>Back to Restaurants</Button>
                    {trackingProgress >= 100 ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" /> Delivered
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Current: {trackingProgress}%</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Menu modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center">
            <div className="bg-white dark:bg-card w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{selected.name}</h3>
                  <div className="text-sm text-muted-foreground">{selected.cuisine} • {selected.address}</div>
                </div>
                <button onClick={() => setSelected(null)} className="p-2 rounded-md text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-4">
                {selected.menu.map((m) => (
                  <div key={m.id} className="flex items-center gap-4">
                    <img src={m.imageUrl} alt={m.name} className="w-20 h-16 object-cover rounded-md" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{m.name} {m.spicy ? <Badge className="ml-2 px-2 py-0.5">Spicy</Badge> : null}</div>
                          <div className="text-sm text-muted-foreground">{m.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₦{m.price.toLocaleString()}</div>
                          <button onClick={() => addToCart(m)} className="mt-2 inline-flex items-center gap-2 text-sm px-3 py-1 rounded-md bg-primary text-white">
                            <ShoppingCart className="h-4 w-4" /> Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Tap outside to close</div>
                <div className="flex items-center gap-3">
                  <Button onClick={() => setSelected(null)} variant="outline">Close</Button>
                  <Button onClick={() => { setView("checkout"); setSelected(null); }} disabled={Object.keys(cart).length === 0}>Go to Checkout</Button>
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
   Sample data (images from pexels/unsplash-ish)
   ------------------------ */
const sampleRestaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Mama Nkechi’s Kitchen",
    cuisine: "Nigerian • Local",
    rating: 4.8,
    eta: "25-35 mins",
    imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    address: "Ikeja, Lagos",
    menu: [
      { id: "m1", name: "Jollof Rice (Large)", description: "Spicy, fragrant jollof with chicken", price: 1800, imageUrl: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg" },
      { id: "m2", name: "Pepper Soup (Goat)", description: "Hot and comforting", price: 2200, imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg", spicy: true },
      { id: "m3", name: "Fried Plantain", description: "Sweet plantains", price: 700, imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg" },
    ],
  },
  {
    id: "r2",
    name: "Suya Spot",
    cuisine: "Grill • Nigerian",
    rating: 4.7,
    eta: "20-30 mins",
    imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    address: "Victoria Island",
    menu: [
      { id: "m4", name: "Beef Suya (Skewer)", description: "Smoky suya with pepper spice", price: 1200, imageUrl: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg", spicy: true },
      { id: "m5", name: "Yam Porridge", description: "Comforting yam with fish", price: 1600, imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg" },
    ],
  },
  {
    id: "r3",
    name: "Green Bowl (Healthy)",
    cuisine: "Healthy • Bowls",
    rating: 4.6,
    eta: "30-40 mins",
    imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    address: "Lekki",
    menu: [
      { id: "m6", name: "Quinoa Salad", description: "Quinoa, avocado, roasted veg", price: 2500, imageUrl: "https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg" },
      { id: "m7", name: "Grilled Chicken Bowl", description: "Lean protein with greens", price: 2800, imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg" },
    ],
  },
  {
    id: "r4",
    name: "BlueTailor Cafè",
    cuisine: "Cafe • Local",
    rating: 4.5,
    eta: "20-30 mins",
    imageUrl: "https://images.pexels.com/photos/46239/salmon-dish-food-healthy-46239.jpeg",
    address: "Yaba",
    menu: [
      { id: "m8", name: "Spicy Chicken Sandwich", description: "Toasted bread with zesty chicken", price: 1500, imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg" },
      { id: "m9", name: "Carrot Cake Slice", description: "Moist and sweet", price: 900, imageUrl: "https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg" },
    ],
  },
];
