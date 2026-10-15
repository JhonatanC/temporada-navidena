import InfoIcon from "./partials/InfoIcon";

interface PriceNoteProps {
  /** Clases extra para ajustar márgenes/tamaño según dónde se use. */
  className?: string;
}

/** Aclaración completa que aparece en el tooltip del ícono de información. */
const TOOLTIP_TEXT =
  "El precio final se confirma según la talla, el color y el material que elijas.";

/** Nota visible que acompaña al precio "desde". */
const NOTE_TEXT =
  "Precio de referencia. Puede variar según talla, color o material.";

/**
 * Nota de precio: explica que el valor mostrado es "desde" y puede variar según
 * las especificaciones del producto (talla, color o material).
 *
 * Se presenta como una franja a todo el ancho del contenedor (respeta el padding
 * del modal): fondo rosa coral suave (`bg-rosa-coral/10`) con un anillo tenue del
 * mismo color y texto en el rosa coral a plena intensidad con peso semibold, para
 * que resalte sin chillar.
 *
 * Es presentacional (sin estado): el tooltip se muestra solo con CSS al pasar el
 * cursor o enfocar el botón, así que no necesita "use client" ni ids únicos.
 */
export default function PriceNote({ className = "" }: PriceNoteProps) {
  return (
    <div
      className={`flex w-full items-center gap-2 rounded-xl bg-rosa-coral/10 px-4 py-2 text-rosa-coral ring-1 ring-rosa-coral/20 ${className}`}
    >
      {/* Ícono ⓘ con tooltip: se muestra en hover y al enfocar con teclado/toque */}
      <span className="group relative inline-flex shrink-0">
        <button
          type="button"
          aria-label={TOOLTIP_TEXT}
          className="flex cursor-help items-center justify-center text-rosa-coral transition-colors hover:text-vinotinto focus:text-vinotinto focus:outline-none"
        >
          <InfoIcon />
        </button>

        {/* Tooltip visual (el texto accesible ya está en el botón y en la nota) */}
        <span
          aria-hidden="true"
          role="presentation"
          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-xl bg-verde-bosque px-3 py-2 text-left text-xs leading-[19px] font-normal whitespace-normal text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          {TOOLTIP_TEXT}
        </span>
      </span>

      {/* Texto completo (talla, color o material); se permite que fluya en varias líneas */}
      <span className="font-semibold">{NOTE_TEXT}</span>
    </div>
  );
}
