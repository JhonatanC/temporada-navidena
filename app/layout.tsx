import type { Metadata } from "next";
import { Cinzel_Decorative, Inter } from "next/font/google";
import StructuredData from "./components/seo/StructuredData";
import WhatsAppButton from "./components/whatsapp/WhatsAppButton";
import { siteDescription, siteName, siteUrl } from "./data/site";
import "./globals.css";

// Inter: textos generales, párrafos, precios y especificaciones.
// `display: "swap"` hace que el texto se pinte con la fuente de respaldo
// (Times/serif → sistema) mientras llega la definitiva, sin bloquear la
// primera pintura. Se deja variable (sin `weight`): un solo archivo cubre
// todos los pesos usados (400 y semibold de botones).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Cinzel Decorative: títulos (H1-H6), estilo elegante y festivo.
// Solo el peso 400 (el que se usa en toda la UI; los títulos heredan el peso
// normal del body): cargar pesos sin usar retrasa la ruta crítica.
const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  // URL base para resolver rutas absolutas (canonical, Open Graph, etc.).
  // En producción define NEXT_PUBLIC_SITE_URL con tu dominio real.
  metadataBase: new URL(siteUrl),

  // Título de la pestaña del navegador. `default` es la home y `template` se
  // aplica a las rutas hijas (ej. "Catálogo | Decoraciones Navideñas").
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
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

  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,

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
    siteName: siteName,
    title: `${siteName} | Detalles que enamoran`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Detalles que enamoran`,
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
        {/* Datos estructurados JSON-LD (tienda + catálogo) para buscadores */}
        <StructuredData />
      </body>
    </html>
  );
}
