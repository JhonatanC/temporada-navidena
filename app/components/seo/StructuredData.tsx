import { CURRENCY } from "../../data/currency";
import { products } from "../../data/products";
import { siteDescription, siteName, siteUrl } from "../../data/site";
import { WHATSAPP_NUMBER } from "../../data/whatsapp";

/**
 * Datos estructurados JSON-LD (schema.org) para resultados enriquecidos:
 * una tienda en línea (`OnlineStore`) y el catálogo como `ItemList` de
 * `Product` con su `Offer`. Se genera en el servidor a partir de datos propios
 * (no hay input del usuario) y se inyecta en un <script>.
 */
export default function StructuredData() {
  const store = {
    "@type": "OnlineStore",
    "@id": `${siteUrl}/#store`,
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    image: `${siteUrl}/icon.svg`,
    telephone: `+${WHATSAPP_NUMBER}`,
    priceRange: "$$",
    currenciesAccepted: CURRENCY,
  };

  const catalog = {
    "@type": "ItemList",
    name: `Catálogo de ${siteName}`,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.title,
        description: product.descriptions.short,
        sku: product.id,
        category: product.category,
        image: new URL(product.image.src, siteUrl).href,
        brand: { "@type": "Brand", name: siteName },
        offers: {
          "@type": "Offer",
          price: String(product.price),
          priceCurrency: CURRENCY,
          availability: "https://schema.org/InStock",
          url: siteUrl,
        },
      },
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [store, catalog],
  };

  return (
    <script
      type="application/ld+json"
      // Se escapa "<" para no cerrar el <script> por accidente.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
