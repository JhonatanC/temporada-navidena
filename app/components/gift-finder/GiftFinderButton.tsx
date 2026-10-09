"use client";

import { useState, type ReactNode } from "react";
import GiftFinderModal from "./GiftFinderModal";

interface GiftFinderButtonProps {
  /** Texto del botón (por ejemplo, "Encuentra tu regalo"). */
  label: string;
  /** Clases del botón: cada sección define su propio estilo. */
  className: string;
  /** Ícono opcional que se muestra a la izquierda del texto. */
  icon?: ReactNode;
}

/**
 * Botón que abre el pop-up "Cómo es tu Navidad" con el filtro por taxonomía.
 * Es Client Component por el estado del pop-up; el estilo del botón llega por
 * props para que cada sección (hero, promo, cta) conserve el suyo.
 */
export default function GiftFinderButton({ label, className, icon }: GiftFinderButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
      >
        {icon}
        {label}
      </button>
      <GiftFinderModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
