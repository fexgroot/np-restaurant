import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ReserverenModal } from "@/components/ReserverenModal";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <title>NP-Restaurant</title>
      </head>
      <body className={inter.className}>
        {children}
        <ReserverenModal />
        <Toaster />
      </body>
    </html>
  );
}
