"use client";

import { useEffect } from "react";

// Contador de bloqueos activos a nivel módulo (ref-count). Permite anidar
// modales (por ejemplo, el detalle de producto sobre el pop-up
// "Cómo es tu Navidad") sin que la página quede congelada: el scroll solo se
// restaura cuando todos los bloqueos se liberaron.
let lockCount = 0;

// Valor original de `document.body.style.overflow` antes del primer lock.
let previousOverflow = "";
// Posición de scroll guardada al bloquear (para iOS y para devolverla al cerrar).
let savedScrollY = 0;

/**
 * Bloquea el scroll del body mientras `active` sea `true`, de forma segura
 * con modales anidados:
 * - Solo el primer lock guarda el estado original del body; solo el último
 *   unlock lo restaura (contador compartido entre todos los modales).
 * - Compensa el ancho de la barra de scroll (`padding-right`) para que el
 *   contenido no salte de lado al abrir o cerrar el modal.
 * - En iOS/Safari el scroll táctil ignora `overflow: hidden`, así que el body
 *   se congela en su posición actual con `position: fixed` + `top: -scrollY`
 *   y, al desbloquear, se vuelve a la misma posición con un `window.scrollTo`
 *   instantáneo (no hereda el scroll suave global de las anclas).
 *
 * Uso: `useBodyScrollLock(product !== null)`. No usar el patrón
 * guardar/restaurar `body.style.overflow` a mano: con dos modales anidados
 * termina dejando la página sin scroll.
 */
export default function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    lock();
    return unlock;
  }, [active]);
}

/** Primer lock: guarda el estado original y bloquea el scroll. */
function lock() {
  lockCount += 1;
  if (lockCount > 1) return; // Ya hay un modal bloqueando el scroll.

  const body = document.body;
  previousOverflow = body.style.overflow;

  // Compensación de la barra de scroll (evita el salto horizontal).
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }

  // iOS/Safari: `position: fixed` con `top` negado detiene el scroll táctil
  // manteniendo la posición visual de la página.
  savedScrollY = window.scrollY;
  body.style.position = "fixed";
  body.style.top = `-${savedScrollY}px`;
  body.style.width = "100%";

  body.style.overflow = "hidden";
}

/** Último unlock: restaura el body a su estado original. */
function unlock() {
  lockCount -= 1;
  if (lockCount > 0) return; // Aún queda un modal abierto por encima.

  const body = document.body;
  body.style.overflow = previousOverflow;
  body.style.position = "";
  body.style.top = "";
  body.style.width = "";
  body.style.paddingRight = "";

  // Devuelve la página a la posición donde estaba antes de bloquear (al quitar
  // el `position: fixed` el scroll queda en 0). El retorno debe ser
  // **instantáneo**: con `html { scroll-behavior: smooth }` (anclas de
  // hero/promo) el navegador animaría este scrollTo y, al cerrar un modal, la
  // página haría un viaje visible por el hero hasta volver a la posición. Se
  // fuerza `auto` solo en esta ventana; el scroll suave global no se toca.
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, savedScrollY);
  root.style.scrollBehavior = previousBehavior;
}
