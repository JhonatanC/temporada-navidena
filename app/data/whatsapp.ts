// Datos de contacto de WhatsApp, compartidos por el botón flotante y por los
// CTA que llevan directo a la conversación (evita duplicar número y mensaje).

/** Número en formato internacional, sin espacios ni "+". Corresponde a +57 315 3412432. */
export const WHATSAPP_NUMBER = "573153412432";

/** Mensaje que se precarga en el chat (el usuario puede editarlo antes de enviar). */
export const WHATSAPP_MESSAGE = "¡Hola! Me interesa su decoración navideña.";

/** Construye el enlace a wa.me con el mensaje precargado. */
export function buildWhatsAppHref(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;
}
