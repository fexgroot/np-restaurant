"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Activiteiten", href: "/activiteiten" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-brand-gold sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/logo-1x.png" alt="Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium   ${
                    isActive(item.href)
                      ? "bg-brand-gold text-white shadow-md"
                      : "text-brand-brown hover:text-brand-orange hover:bg-brand-gold/10"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-brand-brown">
              <Phone className="h-4 w-4" />
              <span className="text-sm">+31 20 123 4567</span>
            </div>
            <Button
              asChild
              className="bg-brand-orange hover:bg-brand-red text-white font-semibold px-6 py-2 rounded-full shadow-lg  "
            >
              <Link href="/reserveren">Reserveer Nu</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-brand-brown hover:text-brand-orange">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-2 mb-8 pt-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-gold to-brand-orange rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">NP</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-brand-brown">NP-Restaurant</h2>
                      <p className="text-xs text-brand-orange">Culinaire Excellence</p>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-2 mb-8">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-3 rounded-lg text-base font-medium   ${
                          isActive(item.href)
                            ? "bg-brand-gold text-white shadow-md"
                            : "text-brand-brown hover:text-brand-orange hover:bg-brand-gold/10"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Contact Info */}
                  <div className="border-t border-gray-200 pt-6 mt-auto">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 text-brand-brown">
                        <Phone className="h-5 w-5 text-brand-orange" />
                        <div>
                          <p className="font-medium">Telefoon</p>
                          <p className="text-sm">+31 20 123 4567</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-brand-brown">
                        <Clock className="h-5 w-5 text-brand-orange" />
                        <div>
                          <p className="font-medium">Vandaag Open</p>
                          <p className="text-sm">17:00 - 22:00</p>
                        </div>
                      </div>
                      <Button
                        asChild
                        className="w-full bg-brand-orange hover:bg-brand-red text-white font-semibold py-3 rounded-full shadow-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/reserveren">Reserveer Nu</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
