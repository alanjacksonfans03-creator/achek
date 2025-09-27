import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Home, DollarSign, Heart, X } from "lucide-react";

/**
 * Real Estate Nigeria demo
 * - Property listings
 * - Detail modal with tour
 * - Mortgage calculator
 */

type Property = {
  id: string;
  title: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  imageUrl: string;
  description: string;
  tourUrl?: string; // video/3D embed
};

export default function RealEstate() {
  const [properties, setProperties] = useState<Property[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Property | null>(null);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [loan, setLoan] = useState({ amount: "", rate: "", years: "" });
  const [monthly, setMonthly] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setProperties(sampleProps);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const calcMortgage = () => {
    const P = parseFloat(loan.amount);
    const r = parseFloat(loan.rate) / 100 / 12;
    const n = parseFloat(loan.years) * 12;
    if (P && r && n) {
      const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthly(M);
    } else setMonthly(null);
  };

  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">Find Your Dream Home</h1>
          <p className="text-muted-foreground mt-2">
            Explore properties across Nigeria with financing tools and virtual tours.
          </p>
        </header>

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
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {properties!.map((p) => (
              <Card
                key={p.id}
                className="group cursor-pointer"
                onClick={() => setSelected(p)}
              >
                <div className="relative">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSaved((s) => ({ ...s, [p.id]: !s[p.id] }));
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-card/80"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        saved[p.id] ? "text-red-500 fill-red-500" : ""
                      }`}
                    />
                  </button>
                </div>
                <CardContent>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4" />
                    {p.city}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-primary">
                      ₦{p.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {p.bedrooms} bd • {p.bathrooms} ba
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Mortgage Calculator */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <DollarSign className="h-6 w-6" /> Mortgage Calculator
          </h2>
          <div className="grid sm:grid-cols-4 gap-4">
            <input
              placeholder="Loan amount (₦)"
              className="border px-3 py-2 rounded-md"
              value={loan.amount}
              onChange={(e) => setLoan({ ...loan, amount: e.target.value })}
            />
            <input
              placeholder="Rate (%)"
              className="border px-3 py-2 rounded-md"
              value={loan.rate}
              onChange={(e) => setLoan({ ...loan, rate: e.target.value })}
            />
            <input
              placeholder="Years"
              className="border px-3 py-2 rounded-md"
              value={loan.years}
              onChange={(e) => setLoan({ ...loan, years: e.target.value })}
            />
            <Button onClick={calcMortgage}>Calculate</Button>
          </div>
          {monthly && (
            <div className="mt-4 font-semibold">
              Monthly Payment: ₦{monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          )}
        </section>
      </div>

      {/* Property Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-card rounded-2xl w-full max-w-4xl overflow-hidden">
            <div className="relative">
              <img
                src={selected.imageUrl}
                alt={selected.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-card/90"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold">{selected.title}</h2>
              <div className="flex items-center gap-2 text-muted-foreground mt-2">
                <MapPin className="h-4 w-4" /> {selected.city}
              </div>
              <p className="mt-4 text-muted-foreground">{selected.description}</p>
              <div className="mt-4 font-bold text-lg">
                ₦{selected.price.toLocaleString()}
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Virtual Tour</h3>
                {selected.tourUrl ? (
                  <iframe
                    src={selected.tourUrl}
                    className="w-full h-64 rounded-md"
                    allowFullScreen
                  />
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Tour not available.
                  </div>
                )}
              </div>
              <div className="mt-6 flex gap-3">
                <Button>Contact Agent</Button>
                <Button variant="outline">Schedule Visit</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Demo properties */
const sampleProps: Property[] = [
  {
    id: "p1",
    title: "4-Bedroom Duplex in Lekki",
    city: "Lagos",
    price: 75000000,
    bedrooms: 4,
    bathrooms: 5,
    imageUrl:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    description:
      "Modern duplex in Lekki Phase 1 with spacious rooms, fitted kitchen, and secure estate.",
    tourUrl: "https://www.youtube.com/embed/TJ2ifmkGGus",
  },
  {
    id: "p2",
    title: "Luxury Apartment in Maitama",
    city: "Abuja",
    price: 95000000,
    bedrooms: 3,
    bathrooms: 4,
    imageUrl:
      "https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg",
    description:
      "Beautiful 3-bedroom serviced apartment with swimming pool, gym, and 24/7 power supply.",
  },
  {
    id: "p3",
    title: "Affordable 2-Bed Flat in Port Harcourt",
    city: "Port Harcourt",
    price: 25000000,
    bedrooms: 2,
    bathrooms: 2,
    imageUrl:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    description:
      "Perfect starter home in a gated community with good road network and water supply.",
    tourUrl: "https://www.youtube.com/embed/6lt2JfJdGSY",
  },
];
