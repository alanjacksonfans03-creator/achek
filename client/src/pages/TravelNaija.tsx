import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Hotel, MapPin } from "lucide-react";

export default function TravelNaija() {
  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">TravelNaija</h1>
        <p className="text-lg text-muted-foreground">
          Discover Nigerian destinations. Book flights, hotels, and local
          experiences — all in one place.
        </p>
      </div>

      {/* Flight Deals */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Plane className="h-6 w-6 text-primary" />
          Flight Deals
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {flightDeals.map((deal, idx) => (
            <Card
              key={idx}
              className="shadow-lg hover:shadow-xl transition-transform hover:scale-105"
            >
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-2">{deal.route}</h3>
                <p className="text-muted-foreground mb-2">{deal.airline}</p>
                <p className="font-bold text-primary text-lg mb-4">
                  ₦{deal.price.toLocaleString()}
                </p>
                <Button className="w-full">Book Flight</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Hotels */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Hotel className="h-6 w-6 text-primary" />
          Hotels
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {hotels.map((hotel, idx) => (
            <Card
              key={idx}
              className="shadow-lg hover:shadow-xl transition-transform hover:scale-105"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-2">{hotel.name}</h3>
                <p className="text-muted-foreground mb-2">{hotel.location}</p>
                <p className="font-bold text-primary text-lg mb-4">
                  From ₦{hotel.price}/night
                </p>
                <Button className="w-full">Book Hotel</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Local Experiences */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          Local Experiences
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {experiences.map((exp, idx) => (
            <Card
              key={idx}
              className="shadow-lg hover:shadow-xl transition-transform hover:scale-105"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-2">{exp.title}</h3>
                <p className="text-muted-foreground mb-2">{exp.location}</p>
                <Badge className="mb-4">{exp.duration}</Badge>
                <Button className="w-full">Book Experience</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

const flightDeals = [
  { route: "Lagos → Abuja", airline: "Air Peace", price: 35000 },
  { route: "Port Harcourt → Lagos", airline: "Dana Air", price: 28000 },
  { route: "Abuja → Kano", airline: "Arik Air", price: 25000 },
];

const hotels = [
  {
    name: "Eko Hotels & Suites",
    location: "Victoria Island, Lagos",
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1551776235-dde6d4829808?w=600&auto=format&fit=crop",
  },
  {
    name: "Transcorp Hilton",
    location: "Abuja",
    price: 75000,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop",
  },
  {
    name: "Golden Tulip Hotel",
    location: "Port Harcourt",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop",
  },
];

const experiences = [
  {
    title: "Olumo Rock Tour",
    location: "Abeokuta, Ogun State",
    duration: "1 Day",
    image:
      "https://images.unsplash.com/photo-1568402102990-122b1f4d42f6?w=600&auto=format&fit=crop",
  },
  {
    title: "Yankari Game Reserve",
    location: "Bauchi State",
    duration: "3 Days",
    image:
      "https://images.unsplash.com/photo-1556388275-5d4a1a3e46cf?w=600&auto=format&fit=crop",
  },
  {
    title: "Lekki Conservation Centre",
    location: "Lagos",
    duration: "Half Day",
    image:
      "https://images.unsplash.com/photo-1543349689-9a4b63e273b1?w=600&auto=format&fit=crop",
  },
];
