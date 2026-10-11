import WhatsAppIcon from "./partials/WhatsAppIcon";

/**
 * Número de WhatsApp en formato internacional, sin espacios ni "+".
 * Corresponde a +57 315 3412432.
 */
const WHATSAPP_NUMBER = "573153412432";

/** Mensaje que se precarga en el chat (el usuario puede editarlo antes de enviar). */
const WHATSAPP_MESSAGE = "¡Hola! Me interesa su decoración navideña.";

/**
 * Botón flotante de WhatsApp en la esquina inferior derecha.
 * Es un enlace directo a wa.me, así que es un Server Component (sin estado).
 * `z-30` lo deja debajo de los modales (overlay z-40, ficha z-50) para que no
 * se solape con ellos cuando estén abiertos.
 */
export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
      className="fixed right-6 bottom-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition hover:scale-110 hover:bg-whatsapp-oscuro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-bosque"
    >
      <WhatsAppIcon />
    </a>
  );
}
