interface PriceNoteProps {
  /** Clases extra para ajustar márgenes/tamaño según dónde se use. */
  className?: string;
}

/** Nota visible que acompaña al precio "desde". */
const NOTE_TEXT =
  "Precio de referencia: El producto puede variar dependiendo del tamaño color o material de tú preferencia, cualquier diseño que escojas es personalizable a tu gusto";

/**
 * Nota de precio: explica que el valor mostrado es "desde" y puede variar según
 * las especificaciones del producto (tamaño, color o material).
 *
 * Se presenta como una franja a todo el ancho del contenedor (respeta el padding
 * del modal): fondo rosa coral suave (`bg-rosa-coral/10`) con un anillo tenue del
 * mismo color y texto en el rosa coral a plena intensidad con peso semibold, para
 * que resalte sin chillar.
 *
 * Es presentacional (sin estado, sin ícono ni tooltip): no necesita "use client".
 */
export default function PriceNote({ className = "" }: PriceNoteProps) {
  return (
    <div
      className={`flex w-full items-center gap-2 rounded-xl bg-rosa-coral/10 px-4 py-2 text-rosa-coral ring-1 ring-rosa-coral/20 ${className}`}
    >
      {/* Texto completo; se permite que fluya en varias líneas */}
      <span className="font-semibold">{NOTE_TEXT}</span>
    </div>
  );
}
