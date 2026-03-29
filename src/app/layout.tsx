import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "SmartClinic - Tu salud, sin esperas",
  description: "Transformamos la experiencia clínica mediante automatización e inteligencia artificial. Sistema de autogestión de citas y reservas 24/7.",
  openGraph: {
    title: 'SmartClinic OS - Innovación en Salud',
    description: 'Reserva tu cita al instante gracias a nuestro sistema de reservas y triaje automatizado por inteligencia artificial.',
    url: 'https://smartclinic-os.vercel.app',
    siteName: 'SmartClinic OS',
    images: [
      {
        url: '/images/b2b_banner.png',
        width: 1200,
        height: 630,
        alt: 'SmartClinic Dashboard y Recepción',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartClinic OS',
    description: 'Tu clínica con reservas automáticas e IA.',
    images: ['/images/b2b_banner.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/20`}
      >
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
