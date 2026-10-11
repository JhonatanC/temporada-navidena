import type { Metadata } from "next";
import { Cinzel_Decorative, Inter } from "next/font/google";
import WhatsAppButton from "./components/whatsapp/WhatsAppButton";
import "./globals.css";

// Inter: textos generales, párrafos, precios y especificaciones.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Cinzel Decorative: títulos (H1-H6), estilo elegante y festivo.
const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

// Descripción reutilizada en la metadata general y en las tarjetas sociales.
const siteDescription =
  "Tienda de decoración navideña: coronas, esferas, guirnaldas, cojines, centros de mesa y detalles únicos para llenar de magia cada rincón de tu hogar en Navidad.";

export const metadata: Metadata = {
  // URL base para resolver rutas absolutas (canonical, Open Graph, etc.).
  // En producción define NEXT_PUBLIC_SITE_URL con tu dominio real.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),

  // Título de la pestaña del navegador. `default` es la home y `template` se
  // aplica a las rutas hijas (ej. "Catálogo | Decoraciones Navideñas").
  title: {
    default: "Decoraciones Navideñas",
    template: "%s | Decoraciones Navideñas",
  },
  description: siteDescription,

  // Palabras clave alusivas al catálogo y a la intención de compra.
  keywords: [
    "decoración navideña",
    "adornos navideños",
    "decoración de Navidad",
    "esferas navideñas",
    "coronas navideñas",
    "guirnaldas navideñas",
    "árbol de Navidad",
    "arreglos navideños",
    "cojines navideños",
    "cubre sillas navideñas",
    "centros de mesa navideños",
    "pies de árbol navideños",
    "cortineros navideños",
    "detalles navideños",
    "decoración navideña para el hogar",
    "tienda de decoración navideña",
    "decoración navideña online",
  ],

  applicationName: "Decoraciones Navideñas",
  authors: [{ name: "Decoraciones Navideñas" }],
  creator: "Decoraciones Navideñas",
  publisher: "Decoraciones Navideñas",

  // Canónica de la home para evitar contenido duplicado en buscadores.
  alternates: { canonical: "/" },

  // Permitir que Google y otros buscadores indexen y sigan los enlaces.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Tarjetas al compartir el enlace en redes sociales / WhatsApp.
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: "Decoraciones Navideñas",
    title: "Decoraciones Navideñas | Detalles que enamoran",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Decoraciones Navideñas | Detalles que enamoran",
    description: siteDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${cinzelDecorative.variable} h-full antialiased`}
    >
      <body
        className={`${inter.className} min-h-full flex flex-col bg-fondo text-verde-bosque`}
      >
        {children}
        {/* Botón flotante de WhatsApp: visible en todo el sitio */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
