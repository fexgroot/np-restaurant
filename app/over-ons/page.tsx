import { Users, MapPin, Clock, Award, Heart, Leaf } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const teamMembers = [
  {
    name: "Marco van der Berg",
    role: "Eigenaar & Head Chef",
    description:
      "Met 15 jaar ervaring in de culinaire wereld brengt Marco zijn passie voor lokale ingrediënten en innovatieve technieken samen.",
    image: "/img/05.jpg",
  },
  {
    name: "Sophie Janssen",
    role: "Sous Chef",
    description:
      "Sophie's expertise in Franse kooktechnieken en haar oog voor detail maken elk gerecht tot een kunstwerk.",
    image: "/img/12.jpg",
  },
  {
    name: "David Rodriguez",
    role: "Sommelier",
    description:
      "David's uitgebreide kennis van wijnen helpt gasten bij het vinden van de perfecte wijn bij hun maaltijd.",
    image: "/img/05.jpg",
  },
  {
    name: "Emma de Wit",
    role: "Restaurant Manager",
    description: "Emma zorgt ervoor dat elke gast zich welkom voelt en een onvergetelijke ervaring heeft.",
    image: "/img/12.jpg",
  },
]

const values = [
  {
    icon: <Leaf className="h-8 w-8 text-green-600" />,
    title: "Duurzaamheid",
    description: "Wij werken samen met lokale boeren en leveranciers om de beste seizoensproducten te gebruiken.",
  },
  {
    icon: <Heart className="h-8 w-8 text-red-600" />,
    title: "Passie",
    description: "Elke dag streven wij ernaar om onze gasten te verrassen met uitzonderlijke smaken en service.",
  },
  {
    icon: <Award className="h-8 w-8 text-yellow-600" />,
    title: "Kwaliteit",
    description: "Van ingrediënt tot presentatie, wij accepteren alleen het beste voor onze gasten.",
  },
]

export default function OverOnsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="bg-gradient-to-br from-brand-gold/5 via-white to-brand-orange/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-brand-brown mb-6">Over NP-Restaurant</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sinds 2015 bieden wij onze gasten een unieke culinaire ervaring in het hart van Groningen. Ons verhaal
              begint met een eenvoudige passie: het creëren van onvergetelijke momenten door middel van uitzonderlijk
              eten.
            </p>
          </div>

          {/* Story Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-brand-brown mb-6">Ons Verhaal</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    NP-Restaurant werd opgericht door Marco van der Berg, een gepassioneerde chef met een droom om de
                    beste lokale ingrediënten te transformeren tot culinaire kunstwerken. Wat begon als een klein
                    restaurant met 10 tafels, is uitgegroeid tot een geliefde bestemming voor fijnproevers.
                  </p>
                  <p>
                    Onze filosofie is eenvoudig: respect voor ingrediënten, passie voor perfectie, en liefde voor onze
                    gasten. Wij geloven dat een maaltijd meer is dan alleen voedsel - het is een ervaring die mensen
                    samenbrengt en herinneringen creëert.
                  </p>
                  <p>
                    Door de jaren heen hebben wij ons gespecialiseerd in moderne Nederlandse keuken met internationale
                    invloeden, waarbij wij altijd streven naar innovatie zonder onze roots te vergeten.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/img/05.jpg"
                  alt="Restaurant interior"
                  className="rounded-lg shadow-lg w-full border-4 border-brand-gold/20"
                />
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-brown mb-4">Onze Waarden</h2>
              <p className="text-lg text-gray-600">De principes die ons dagelijks werk sturen</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="text-center border-t-4 border-brand-gold  "
                >
                  <CardHeader>
                    <div className="flex justify-center mb-4">{value.icon}</div>
                    <CardTitle className="text-brand-brown">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-brown mb-4">Ons Team</h2>
              <p className="text-lg text-gray-600">Ontmoet de mensen achter de magie</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-l-4 border-brand-gold  "
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image || "/img/05.jpg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-brand-brown">{member.name}</CardTitle>
                    <Badge className="w-fit bg-brand-orange text-white">{member.role}</Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{member.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Location & Details */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-brand-brown">
                    <MapPin className="h-5 w-5 text-brand-orange" />
                    Locatie & Bereikbaarheid
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-brand-brown">Adres</h4>
                    <p className="text-gray-600">
                      Hoofdstraat 123
                      <br />
                      1234 AB Groningen
                      <br />
                      Nederland
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-brand-brown">Openbaar Vervoer</h4>
                    <p className="text-gray-600">
                      2 minuten lopen vanaf Groningen Centraal Station
                      <br />
                      Tram 1, 2, 5 - halte Nieuwmarkt
                      <br />
                      Metro 51, 53, 54 - station Nieuwmarkt
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-brand-brown">Parkeren</h4>
                    <p className="text-gray-600">
                      Parkeergarage Nieuwmarkt (100m)
                      <br />
                      Parkeergarage Centraal Station (300m)
                      <br />
                      Betaald parkeren op straat
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-brand-brown">
                    <Clock className="h-5 w-5 text-brand-orange" />
                    Praktische Informatie
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-brand-brown">Openingstijden</h4>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex justify-between">
                        <span>Maandag - Donderdag</span>
                        <span className="font-semibold text-brand-brown">17:00 - 22:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vrijdag - Zaterdag</span>
                        <span className="font-semibold text-brand-brown">17:00 - 23:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Zondag</span>
                        <span className="font-semibold text-brand-brown">16:00 - 21:00</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-brand-brown">Capaciteit</h4>
                    <p className="text-gray-600">
                      20 tafels (2-8 personen)
                      <br />
                      Totaal 80 zitplaatsen
                      <br />
                      Privé dining room beschikbaar
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-brand-brown">Faciliteiten</h4>
                    <p className="text-gray-600">
                      Rolstoeltoegankelijk
                      <br />
                      WiFi beschikbaar
                      <br />
                      Kinderstoelen beschikbaar
                      <br />
                      Vegetarische & veganistische opties
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Awards & Recognition */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-brown mb-4">Erkenning & Awards</h2>
              <p className="text-lg text-gray-600">Wij zijn trots op de erkenning die wij hebben ontvangen</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border-t-4 border-brand-gold  ">
                <CardHeader>
                  <Award className="h-12 w-12 text-brand-gold mx-auto mb-4" />
                  <CardTitle className="text-brand-brown">Michelin Bib Gourmand</CardTitle>
                  <CardDescription>2022 - 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Erkend voor uitzonderlijke kwaliteit tegen een redelijke prijs</p>
                </CardContent>
              </Card>

              <Card className="text-center border-t-4 border-brand-orange  ">
                <CardHeader>
                  <Users className="h-12 w-12 text-brand-orange mx-auto mb-4" />
                  <CardTitle className="text-brand-brown">TripAdvisor Excellence</CardTitle>
                  <CardDescription>2021 - 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Consistent hoge beoordelingen van onze gasten</p>
                </CardContent>
              </Card>

              <Card className="text-center border-t-4 border-brand-gold-dark  ">
                <CardHeader>
                  <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-brand-brown">Green Key Certificaat</CardTitle>
                  <CardDescription>2023 - 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Erkend voor onze duurzame bedrijfsvoering</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
