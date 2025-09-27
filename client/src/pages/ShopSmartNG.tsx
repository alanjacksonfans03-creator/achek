import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ShopSmartNG() {
  // demo static sample results
  const sampleProducts = [
    { id: 1, title: "Samsung Galaxy S23", store: "NaijaStore", price: 420000 },
    { id: 2, title: "iPhone 14", store: "LagosGadgets", price: 780000 },
    { id: 3, title: "Tecno Camon 19", store: "AbujaElectro", price: 150000 },
  ];

  return (
    <div className="pt-28 min-h-screen bg-muted-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">ShopSmart NG</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            AI-powered Nigeria price comparison — quickly find the best deals across local stores.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-8">
          <div className="flex">
            <input
              className="flex-1 px-4 py-3 rounded-l-lg border border-border bg-background text-foreground"
              placeholder="Search product, e.g. 'Galaxy S23'"
            />
            <Button className="rounded-r-lg px-6">Search</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sampleProducts.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="h-40 bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground">Image (demo)</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
                <div className="text-sm text-muted-foreground mb-4">{p.store}</div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold">₦{p.price.toLocaleString()}</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Compare</Button>
                    <Link href="/contact">
                      <Button size="sm">Contact Seller</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/marketplace">
            <Button className="gradient-bg text-white px-6 py-3 rounded-xl">Explore Marketplace</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
