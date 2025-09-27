import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, FileText, Hospital } from "lucide-react";

export default function HealthLinkNG() {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">HealthLink NG</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Telemedicine platform designed for Nigeria. Get instant access to doctors, 
            prescriptions, and hospitals — anytime, anywhere.
          </p>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="shadow-lg hover:shadow-xl transition">
            <CardContent className="p-6 text-center">
              <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Video Consultations</h3>
              <p className="text-muted-foreground">
                Talk to licensed doctors via secure HD video calls without leaving home.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Digital Prescriptions</h3>
              <p className="text-muted-foreground">
                Get prescriptions instantly and send them to partner pharmacies for doorstep delivery.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition">
            <CardContent className="p-6 text-center">
              <Hospital className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Hospital Integrations</h3>
              <p className="text-muted-foreground">
                Seamlessly connect with hospitals and specialists for follow-ups or advanced care.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Healthcare at Your Fingertips</h2>
          <p className="text-muted-foreground mb-6">
            HealthLink NG makes quality healthcare accessible across Nigeria.
          </p>
          <Button size="lg" className="px-8 py-4 rounded-xl">
            Book a Consultation
          </Button>
        </section>
      </div>
    </div>
  );
}
