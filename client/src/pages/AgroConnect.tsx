import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tractor, TrendingUp, ShieldCheck } from "lucide-react";

export default function AgroConnect() {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AgroConnect
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A digital marketplace connecting Nigerian farmers directly to buyers. 
            Empowering agriculture with crop tracking, pricing analytics, and secure payments.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="shadow-lg hover:shadow-xl transition">
            <CardContent className="p-6 text-center">
              <Tractor className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Crop Tracking</h3>
              <p className="text-muted-foreground">
                Farmers can monitor crop progress and share updates with potential buyers.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Pricing Analytics</h3>
              <p className="text-muted-foreground">
                Real-time data and market insights to help farmers and buyers make informed decisions.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition">
            <CardContent className="p-6 text-center">
              <ShieldCheck className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">
                Safe transactions that ensure trust between farmers and buyers nationwide.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connecting Farmers to the Future</h2>
          <p className="text-muted-foreground mb-6">
            AgroConnect bridges the gap between agriculture and technology in Nigeria.
          </p>
          <Button size="lg" className="px-8 py-4 rounded-xl">
            Get Started
          </Button>
        </section>
      </div>
    </div>
  );
}
