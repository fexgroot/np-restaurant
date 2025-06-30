"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { strapiAPI } from "@/lib/strapi";

interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  maxParticipants?: number;
  currentParticipants?: number;
  price?: string;
  image?: string;
}

export default function ActiviteitenPage() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await strapiAPI.getActivities();
        console.log("Raw Strapi response:", response.data);

        const data = Array.isArray(response.data)
          ? response.data.map((activity: any) => ({
              id: activity.id,
              title: activity.attributes.title,
              description: activity.attributes.description,
              date: activity.attributes.date,
              maxParticipants: activity.attributes.maxParticipants || 0,
              currentParticipants: activity.attributes.currentParticipants || 0,
              price: activity.attributes.price || "",
              image: activity.attributes.image?.data?.attributes?.url || "",
            }))
          : [];

        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nl-NL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isUpcoming = (dateString: string) => {
    const activityDate = new Date(dateString);
    const today = new Date();
    return activityDate >= today;
  };

  const getAvailabilityStatus = (current = 0, max = 0) => {
    if (max === 0) return null;
    const percentage = (current / max) * 100;
    if (percentage >= 90) return { status: "Bijna vol", color: "destructive" };
    if (percentage >= 70) return { status: "Beperkt beschikbaar", color: "secondary" };
    return { status: "Beschikbaar", color: "default" };
  };

  const upcomingActivities = activities.filter((activity) => isUpcoming(activity.date));
  const pastActivities = activities.filter((activity) => !isUpcoming(activity.date));

  console.log("Upcoming activities:", upcomingActivities);
  console.log("Past activities:", pastActivities);

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="bg-gradient-to-br from-brand-gold/5 via-white to-brand-orange/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-brand-brown mb-4">Activiteiten</h1>
            <p className="text-lg text-gray-600">Ontdek onze speciale activiteiten en culinaire ervaringen</p>
          </div>

          {/* Upcoming Activities */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-brand-brown mb-8">Aankomende activiteiten</h2>

            {upcomingActivities.length === 0 ? (
              <Card className="border-2 border-brand-gold/20">
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 text-brand-gold mx-auto mb-4" />
                  <p className="text-gray-500">Geen aankomende activiteiten gepland.</p>
                  <p className="text-sm text-gray-400 mt-2">Houd deze pagina in de gaten voor nieuwe activiteiten!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingActivities.map((activity) => {
                  const availability = getAvailabilityStatus(activity.currentParticipants, activity.maxParticipants);

                  return (
                    <Card key={activity.id} className="overflow-hidden   border-l-4 border-brand-gold">
                      {activity.image && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={activity.image || "/placeholder.svg"}
                            alt={activity.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl text-brand-brown">{activity.title}</CardTitle>
                          {activity.price && (
                            <Badge className="bg-brand-orange text-white border-brand-orange">{activity.price}</Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-brand-orange">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(activity.date)}</span>
                          </div>
                        </div>

                        {availability && (
                          <Badge
                            variant={availability.color as any}
                            className={`w-fit ${
                              availability.color === "destructive"
                                ? "bg-brand-red text-white"
                                : availability.color === "secondary"
                                ? "bg-brand-gold-dark text-white"
                                : "bg-brand-gold text-white"
                            }`}
                          >
                            {availability.status}
                          </Badge>
                        )}
                      </CardHeader>

                      <CardContent>
                        <CardDescription className="mb-4">{activity.description}</CardDescription>

                        {activity.maxParticipants && (
                          <div className="flex items-center gap-2 text-sm text-brand-brown mb-4">
                            <Users className="h-4 w-4 text-brand-orange" />
                            <span>
                              {activity.currentParticipants || 0} / {activity.maxParticipants} deelnemers
                            </span>
                          </div>
                        )}

                        <Button className="w-full bg-brand-orange hover:bg-brand-red text-white font-semibold rounded-full">
                          Aanmelden
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>

          {/* Past Activities */}
          {pastActivities.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-brand-brown mb-8">Afgelopen activiteiten</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastActivities.map((activity) => (
                  <Card key={activity.id} className="overflow-hidden opacity-75 border-l-4 border-gray-300">
                    {activity.image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.title}
                          className="w-full h-full object-cover grayscale"
                        />
                      </div>
                    )}

                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl text-brand-brown">{activity.title}</CardTitle>
                        <Badge variant="secondary">Afgelopen</Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(activity.date)}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <CardDescription>{activity.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
