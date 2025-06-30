"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Heart, CroissantIcon as Crescent } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { MenuGerecht } from "@/components/MenuGerecht";

interface Dish {
  id: number;
  name: string;
  description: string;
  price: string;
  ingredients: string[];
  dietary: {
    vegetarian: boolean;
    pregnancySafe: boolean;
    halal: boolean;
  };
  originLink?: string;
  category: string;
}

// Mock data - in real app, this would come from Strapi
const mockDishes: Dish[] = [
  {
    id: 1,
    name: "Gegrilde Zalm",
    description: "Verse Atlantische zalm met seizoensgroenten",
    price: "€24.50",
    ingredients: ["Zalm", "Broccoli", "Wortelen", "Citroen", "Olijfolie"],
    dietary: { vegetarian: false, pregnancySafe: true, halal: false },
    originLink: "https://example.com/salmon-farm",
    category: "hoofdgerechten",
  },
  {
    id: 2,
    name: "Vegetarische Pasta",
    description: "Huisgemaakte pasta met seizoensgroenten en pesto",
    price: "€18.00",
    ingredients: ["Pasta", "Courgette", "Paprika", "Basilicum", "Pijnboompitten"],
    dietary: { vegetarian: true, pregnancySafe: true, halal: true },
    category: "hoofdgerechten",
  },
  {
    id: 3,
    name: "Bruschetta Trio",
    description: "Drie variaties van klassieke bruschetta",
    price: "€12.50",
    ingredients: ["Ciabatta", "Tomaten", "Mozzarella", "Basilicum", "Balsamico"],
    dietary: { vegetarian: true, pregnancySafe: true, halal: true },
    category: "voorgerechten",
  },
  {
    id: 4,
    name: "Tiramisu",
    description: "Klassieke Italiaanse tiramisu met mascarpone",
    price: "€8.50",
    ingredients: ["Mascarpone", "Ladyfingers", "Espresso", "Cacao", "Eieren"],
    dietary: { vegetarian: true, pregnancySafe: false, halal: true },
    category: "desserts",
  },
];

const categories = [
  { id: "voorgerechten", name: "Voorgerechten" },
  { id: "hoofdgerechten", name: "Hoofdgerechten" },
  { id: "desserts", name: "Desserts" },
  { id: "dranken", name: "Dranken" },
];

export default function MenuPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    // Simulate API call to Strapi
    const fetchDishes = async () => {
      try {
        // In real app: const response = await fetch('http://localhost:1337/api/dishes?populate=*')
        // const data = await response.json()

        // Mock delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setDishes(mockDishes);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  const getDietaryIcons = (dietary: Dish["dietary"]) => {
    const icons = [];
    if (dietary.vegetarian)
      icons.push(
        <Leaf key="veg" className="h-4 w-4 text-green-600">
          <title>Vegetarisch</title>
        </Leaf>
      );
    if (dietary.pregnancySafe)
      icons.push(
        <Heart key="preg" className="h-4 w-4 text-pink-600">
          <title>Zwangerschap veilig</title>
        </Heart>
      );
    if (dietary.halal)
      icons.push(
        <Crescent key="halal" className="h-4 w-4 text-blue-600">
          <title>Halal</title>
        </Crescent>
      );
    return icons;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="bg-gradient-to-br from-brand-gold/5 via-white to-brand-orange/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-brand-brown mb-4">Ons Menu</h1>
            <p className="text-lg text-gray-600">Ontdek onze zorgvuldig samengestelde gerechten</p>
          </div>

          <Tabs defaultValue="voorgerechten" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white border-2 border-brand-gold/20">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-brand-gold data-[state=active]:text-white font-semibold"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dishes
                    .filter((dish) => dish.category === category.id)
                    .map((dish) => (
                      <MenuGerecht key={dish.id} dish={dish} />
                    ))}
                </div>

                {dishes.filter((dish) => dish.category === category.id).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Geen gerechten beschikbaar in deze categorie.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
}
