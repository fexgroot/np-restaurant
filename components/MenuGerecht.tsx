import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Heart, CroissantIcon as Crescent } from "lucide-react";
import React from "react";

interface MenuGerechtProps {
  dish: {
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
  };
}

function getDietaryIcons(dietary: MenuGerechtProps["dish"]["dietary"]) {
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
}

export const MenuGerecht: React.FC<MenuGerechtProps> = ({ dish }) => (
  <Card className="overflow-hidden border-l-4 border-brand-gold">
    <CardHeader>
      <div className="flex justify-between items-start">
        <CardTitle className="text-xl text-brand-brown">{dish.name}</CardTitle>
        <span className="text-xl font-bold text-brand-orange">{dish.price}</span>
      </div>
      <CardDescription>{dish.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm text-brand-brown mb-2">Ingrediënten:</h4>
          <div className="flex flex-wrap gap-1">
            {dish.ingredients.map((ingredient, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-brand-gold/10 text-brand-brown">
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">{getDietaryIcons(dish.dietary)}</div>
          {dish.originLink && (
            <a
              href={dish.originLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-orange hover:underline"
            >
              Herkomst ingrediënten
            </a>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);
