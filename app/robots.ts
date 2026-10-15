import type { MetadataRoute } from "next";
import { siteUrl } from "./data/site";

/**
 * robots.txt generado en build (`/robots.txt`): permite rastrear todo el sitio
 * y apunta al sitemap. No se bloquea `/_next/` porque Google necesita sus
 * archivos para renderizar la página.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
