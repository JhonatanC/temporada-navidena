/**
 * Ícono de información (i en círculo) para la nota de precio.
 * SVG puro: no necesita "use client" (sin hooks ni interactividad).
 * Hereda el color del contenedor vía `currentColor`.
 */
export default function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 11v5" />
      <path strokeLinecap="round" d="M12 8h.01" />
    </svg>
  );
}
