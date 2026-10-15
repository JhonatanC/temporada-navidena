/**
 * Configuración general del sitio. Se comparte entre la metadata, el sitemap,
 * robots.txt y los datos estructurados para no repetir valores.
 *
 * `NEXT_PUBLIC_SITE_URL` debe definirse en producción con el dominio real
 * (ej. "https://decoracionesnavidenas.com"); en local cae a localhost.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, ""); // sin barra final para concatenar rutas de forma segura

/** Nombre de la marca / tienda. */
export const siteName = "Decoraciones Navideñas";

/** Descripción usada en la metadata y en las tarjetas sociales. */
export const siteDescription =
  "Tienda de decoración navideña: coronas, esferas, guirnaldas, cojines, centros de mesa y detalles únicos para llenar de magia cada rincón de tu hogar en Navidad.";
