// Enlaces de navegación del sitio. Cada ancla (`#id`) apunta a una sección de la
// página principal, por lo que el navbar hace scroll suave hacia ella.
export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  // Inicio: el hero junto con las cajas de beneficios (parte superior).
  { label: "Inicio", href: "#inicio" },
  // Nosotros: sección con la imagen informativa y su descripción.
  { label: "Nosotros", href: "#promo" },
  // Catálogo: "Detalles que enamoran" con las tarjetas de producto.
  { label: "Catálogo", href: "#catalog" },
  // Contacto: el call to action de la sección CTA.
  { label: "Contacto", href: "#cta" },
];
