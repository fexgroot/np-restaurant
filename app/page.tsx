import { Calendar, Clock, MapPin, Phone, Star, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const featuredDish = {
  id: 1,
  name: "Signature Beef Burger",
  description: "Premium beef patty with aged cheddar, crispy bacon, and our special sauce",
  price: "€18.50",
  image: "/img/10.jpg",
  onSale: true,
  originalPrice: "€22.00",
};

const upcomingActivities = [
  {
    id: 1,
    title: "Wine Tasting Evening",
    date: "2024-01-15",
    time: "19:00",
    description: "Join us for an exclusive wine tasting featuring local vintages",
  },
  {
    id: 2,
    title: "Live Jazz Night",
    date: "2024-01-20",
    time: "20:30",
    description: "Enjoy dinner with live jazz performances",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-gold/10 via-white to-brand-orange/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-brown mb-6">
              Welkom bij <span className="text-brand-orange">NP-Restaurant</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ervaar de perfecte combinatie van traditionele smaken en moderne culinaire kunst in het hart van de stad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-red text-white font-semibold px-8 py-4 rounded-full shadow-lg  "
                asChild
              >
                <Link href="/reserveren">
                  <Users className="mr-2 h-5 w-5" />
                  Reserveer Nu
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-brand-gold text-brand-brown hover:bg-brand-gold hover:text-white font-semibold px-8 py-4 rounded-full  "
                asChild
              >
                <Link href="/menu">Bekijk Menu</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-brand-orange mb-2" />
                <CardTitle className="text-brand-brown">Openingstijden</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Ma - Do</span>
                    <span className="font-semibold text-brand-brown">17:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vr - Za</span>
                    <span className="font-semibold text-brand-brown">17:00 - 23:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zondag</span>
                    <span className="font-semibold text-brand-brown">16:00 - 21:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="h-8 w-8 text-brand-orange mb-2" />
                <CardTitle className="text-brand-brown">Locatie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Hoofdstraat 123
                  <br />
                  1234 AB Groningen
                  <br />
                  Nederland
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Phone className="h-8 w-8 text-brand-orange mb-2" />
                <CardTitle className="text-brand-brown">Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-brand-brown">Tel: +31 20 123 4567</p>
                  <p>Email: info@np-restaurant.nl</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Dish */}
      <section className="py-16 bg-gradient-to-r from-brand-gold/5 to-brand-orange/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-brown mb-4">Gerecht van de Week</h2>
            <p className="text-lg text-gray-600">Ontdek onze chef's speciale aanbeveling</p>
          </div>

          <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl border-2 border-brand-gold/20">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredDish.image || "/placeholder.svg"}
                  alt={featuredDish.name}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-brand-red text-white">Aanbieding</Badge>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-brand-brown mb-4">{featuredDish.name}</h3>
                <p className="text-gray-600 mb-6">{featuredDish.description}</p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-brand-orange">{featuredDish.price}</span>
                  {featuredDish.onSale && (
                    <span className="text-lg text-gray-500 line-through">{featuredDish.originalPrice}</span>
                  )}
                </div>
                <Button
                  size="lg"
                  className="bg-brand-orange hover:bg-brand-red text-white font-semibold px-8 py-3 rounded-full shadow-lg"
                  asChild
                >
                  <Link href="/reserveren">Reserveer & Bestel</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Upcoming Activities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-brown mb-4">Aankomende Activiteiten</h2>
            <p className="text-lg text-gray-600">Mis onze speciale activiteiten niet</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingActivities.map((activity) => (
              <Card key={activity.id} className="border-l-4 border-brand-gold  ">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-brand-orange mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(activity.date).toLocaleDateString("nl-NL")}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{activity.time}</span>
                  </div>
                  <CardTitle className="text-brand-brown">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{activity.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 text-brand-orange hover:underline">
            <Link href="/activiteiten">Alle Activiteiten</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
