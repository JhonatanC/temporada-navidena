import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Tiempo (en segundos) que el navegador y el caché del servidor guardan la
    // imagen ya optimizada. Las imágenes del sitio se importan de forma estática,
    // así que su URL incluye un hash del contenido: cambiar el archivo cambia la
    // URL y no hay riesgo de servir una versión vieja. 31 días evita que en cada
    // visita se vuelvan a pedir las imágenes al servidor.
    minimumCacheTTL: 2678400,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
