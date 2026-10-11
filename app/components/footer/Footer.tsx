"use client";

import { useSyncExternalStore } from "react";

/** Sin suscripciones: el "año" se recalcula en cada render, no se escucha. */
const emptySubscribe = () => () => {};

/** Año actual, leído en tiempo de ejecución (no queda fijo en el build). */
function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Pie de página a ancho completo (100% del viewport) con 15px de padding vertical.
 * Muestra el símbolo de copyright, el nombre de la marca y el año actual.
 *
 * El año se calcula con `new Date().getFullYear()` vía `useSyncExternalStore`:
 * se evalúa en el navegador (y en cada render), así nunca queda fijo y se
 * actualiza automáticamente conforme cambian los años.
 * El tercer argumento (snapshot para el servidor) devuelve `null` para no
 * emitir el `new Date()` durante el prerender de Next.js.
 */
export default function Footer() {
  const year = useSyncExternalStore(
    emptySubscribe,
    getCurrentYear,
    () => null,
  );

  return (
    <footer className="flex w-full items-center justify-center bg-verde-bosque py-[15px]">
      <p className="text-center text-sm leading-[21px] text-fondo">
        {/* El año se interpola solo tras calcularse en el navegador */}
        © {year !== null ? `${year} Temporada Navideña` : "Temporada Navideña"}
      </p>
    </footer>
  );
}