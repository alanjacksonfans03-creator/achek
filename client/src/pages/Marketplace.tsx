import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Wallet, Plus, Minus, X } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  vendor: string;
};

export default function Marketplace() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [wallet, setWallet] = useState(20000); // initial wallet balance ₦20k
  const [showCart, setShowCart] = useState(false);

  const addToCart = (id: string) =>
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));

  const removeFromCart = (id: string) =>
    setCart((c) => {
      const copy = { ...c };
      if (copy[id] > 1) copy[id]--;
      else delete copy[id];
      return copy;
    });

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find((p) => p.id === id);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  const checkout = () => {
    if (total > wallet) {
      alert("Insufficient wallet balance! Please top up.");
      return;
    }
    setWallet((w) => w - total);
    setCart({});
    alert("Order placed successfully!");
  };

  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wallet + Cart header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            <span className="font-semibold">
              Wallet: ₦{wallet.toLocaleString()}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setWallet((w) => w + 10000)}
            >
              Top Up ₦10k
            </Button>
          </div>
          <Button onClick={() => setShowCart(true)} variant="outline">
            <ShoppingCart className="h-5 w-5 mr-2" /> Cart ({Object.keys(cart).length})
          </Button>
        </div>

        {/* Product grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <Card key={p.id} className="flex flex-col">
              <img
                src={p.imageUrl}
                alt={p.name}
                className="h-44 w-full object-cover"
              />
              <CardContent className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Sold by {p.vendor}
                  </p>
                  <div className="font-semibold text-primary mb-2">
                    ₦{p.price.toLocaleString()}
                  </div>
                </div>
                <Button onClick={() => addToCart(p.id)}>Add to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="bg-black/50 flex-1"
            onClick={() => setShowCart(false)}
          />
          <div className="bg-white dark:bg-card w-96 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={() => setShowCart(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {Object.entries(cart).length === 0 ? (
                <p className="text-muted-foreground">Cart is empty</p>
              ) : (
                Object.entries(cart).map(([id, qty]) => {
                  const product = products.find((p) => p.id === id)!;
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between mb-3"
                    >
                      <div>
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ₦{product.price.toLocaleString()} × {qty}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{qty}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToCart(id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between font-semibold mb-3">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <Button
                className="w-full"
                onClick={checkout}
                disabled={Object.keys(cart).length === 0}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const products: Product[] = [
  {
    id: "1",
    name: "Nigerian Ankara Dress",
    price: 15000,
    vendor: "Ada's Fashion",
    imageUrl:
      "https://images.pexels.com/photos/2889494/pexels-photo-2889494.jpeg",
  },
  {
    id: "2",
    name: "Suya Spice Pack",
    price: 3500,
    vendor: "Abuja Spices",
    imageUrl:
      "https://images.pexels.com/photos/6940991/pexels-photo-6940991.jpeg",
  },
  {
    id: "3",
    name: "Handcrafted Aso Oke Cap",
    price: 8000,
    vendor: "Lagos Crafts",
    imageUrl:
      "https://images.pexels.com/photos/6782485/pexels-photo-6782485.jpeg",
  },
  {
    id: "4",
    name: "Shea Butter 500ml",
    price: 2500,
    vendor: "Northern Naturals",
    imageUrl:
      "https://images.pexels.com/photos/6621312/pexels-photo-6621312.jpeg",
  },
  {
    id: "5",
    name: "Leather Sandals",
    price: 12000,
    vendor: "Jos Leather Works",
    imageUrl:
      "https://images.pexels.com/photos/19090/pexels-photo.jpg",
  },
];
