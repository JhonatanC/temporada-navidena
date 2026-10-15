import type { MetadataRoute } from "next";
import { siteUrl } from "./data/site";

/**
 * Sitemap (`/sitemap.xml`). El sitio es una sola página con secciones ancladas;
 * los anclajes (#id) no se incluyen porque los buscadores solo indexan URLs
 * completas. Al agregar rutas nuevas (ej. /catalogo) añádelas aquí.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
