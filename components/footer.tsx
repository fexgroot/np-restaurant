import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center pb-4">
              <img src="/logo-4x.png" alt="Logo" className="h-16 w-auto" loading="lazy" />
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Uw bestemming voor uitzonderlijke culinaire ervaringen in het hart van Groningen. Sinds 2015 serveren wij
              de beste gerechten met passie en perfectie.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-gold hover:text-brand-gold-dark transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-brand-gold hover:text-brand-gold-dark transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-brand-gold hover:text-brand-gold-dark transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-gold">Navigatie</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/reserveren" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Reserveren
                </Link>
              </li>
              <li>
                <Link href="/activiteiten" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Activiteiten
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/over-ons" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Over Ons
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-gold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-brand-orange" />
                <div className="text-gray-300">
                  <p>Hoofdstraat 123</p>
                  <p>1234 AB Groningen</p>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-brand-orange" />
                <span className="text-gray-300">+31 20 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-brand-orange" />
                <span className="text-gray-300">info@np-restaurant.nl</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-brand-orange" />
                <div className="text-gray-300">
                  <p>Ma-Do: 17:00-22:00</p>
                  <p>Vr-Za: 17:00-23:00</p>
                  <p>Zo: 16:00-21:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-gold/20 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 NP-Restaurant. All rigts reserved.</p>
        </div>
      </div>
    </footer>
  );
}
