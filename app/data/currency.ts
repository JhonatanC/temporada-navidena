/**
 * Moneda y formato de precios del catálogo.
 *
 * Los precios se guardan en pesos colombianos (COP) como enteros. Por defecto se
 * muestran como valor "desde" (puede subir según tamaño, color, etc.); los
 * productos con `priceFrom: false` se muestran como precio estándar ("$X").
 */
export const CURRENCY = "COP";

// Un solo formateador reutilizable: agrupa miles con punto (estilo es-CO),
// sin decimales. Se instancia una vez para no repetir el trabajo.
const copFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0,
});

/** Formatea un precio en COP con separador de miles: `240000` -> `"$240.000"`. */
export function formatPrice(value: number): string {
  return `$${copFormatter.format(value)}`;
}

/**
 * Arma la etiqueta de precio que comparten la tarjeta y el modal.
 *
 * Por defecto antepone "Desde" (precio de referencia); con `from: false` muestra
 * solo el valor. Si viene `unit` (p. ej. "c/u"), lo concatena al final.
 */
export function formatPriceLabel(
  value: number,
  { from = true, unit }: { from?: boolean; unit?: string } = {},
): string {
  return `${from ? "Desde " : ""}${formatPrice(value)}${unit ? ` ${unit}` : ""}`;
}
