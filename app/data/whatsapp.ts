// Datos de contacto de WhatsApp, compartidos por el botón flotante y por los
// CTA que llevan directo a la conversación (evita duplicar número y mensaje).

/** Número en formato internacional, sin espacios ni "+". Corresponde a +57 315 3412432. */
export const WHATSAPP_NUMBER = "573153412432";

/** Mensaje que se precarga en el chat (el usuario puede editarlo antes de enviar). */
export const WHATSAPP_MESSAGE = "¡Hola! Me interesa su decoración navideña.";

/**
 * Construye el enlace a wa.me con el mensaje precargado.
 * Si no se pasa `message`, usa el mensaje genérico del negocio.
 */
export function buildWhatsAppHref(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Mensaje para pedir un producto específico desde el detalle del catálogo. */
export function buildProductWhatsAppMessage({
  title,
  category,
}: {
  title: string;
  category: string;
}): string {
  return `¡Hola! Me interesa este producto: ${title} (${category})`;
}
