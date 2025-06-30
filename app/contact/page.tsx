"use client";

import type React from "react";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import dynamic from "next/dynamic";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Bericht verzonden!",
        description: "Bedankt voor uw bericht. Wij nemen zo spoedig mogelijk contact met u op.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="bg-gradient-to-br from-brand-gold/5 via-white to-brand-orange/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-brand-brown mb-4">Contact</h1>
            <p className="text-lg text-gray-600">Neem contact met ons op voor vragen, reserveringen of feedback</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-brand-brown">
                    <Phone className="h-5 w-5 text-brand-orange" />
                    Telefoon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-brand-brown">+31 20 123 4567</p>
                  <p className="text-gray-600 mt-2">Bereikbaar tijdens openingstijden voor reserveringen en vragen</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-brand-brown">
                    <Mail className="h-5 w-5 text-brand-orange" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold text-brand-brown">Algemene vragen:</p>
                      <p className="text-gray-600">info@np-restaurant.nl</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-brand-brown">
                    <MapPin className="h-5 w-5 text-brand-orange" />
                    Adres
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-semibold text-brand-brown">NP-Restaurant</p>
                    <p className="text-gray-600">
                      Hoofdstraat 123
                      <br />
                      1234 AB Groningen
                      <br />
                      Nederland
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-brand-brown">
                    <Clock className="h-5 w-5 text-brand-orange" />
                    Openingstijden
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Maandag - Donderdag</span>
                      <span className="text-brand-brown font-semibold">17:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Vrijdag - Zaterdag</span>
                      <span className="text-brand-brown font-semibold">17:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Zondag</span>
                      <span className="text-brand-brown font-semibold">16:00 - 21:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-brand-brown">Stuur ons een bericht</CardTitle>
                  <CardDescription>
                    Vul het formulier in en wij nemen zo spoedig mogelijk contact met u op
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Naam *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefoon</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">Onderwerp *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Waar gaat uw bericht over?"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Bericht *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Typ hier uw bericht..."
                        rows={6}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-brand-orange hover:bg-brand-red text-white font-semibold py-3 rounded-full shadow-lg   "
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Verzenden...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Bericht Verzenden
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-brand-brown">Locatie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden border-2 border-brand-gold/20">
                    {typeof window !== "undefined" &&
                      dynamic(() => import("@/components/MapGroningen"), { ssr: false })()}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
