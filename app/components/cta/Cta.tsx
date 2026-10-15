import { buildWhatsAppHref } from "../../data/whatsapp";
import WhatsAppIcon from "../whatsapp/partials/WhatsAppIcon";
import StarIcon from "./partials/StarIcon";

/**
 * Sección CTA a ancho completo (100% del viewport, con su contenido centrado
 * en un contenedor de ancho máximo, igual que Benefits y Promo).
 * Fila de dos columnas: a la izquierda un bloque de texto (título blanco,
 * subtítulo amarillo y párrafo) y a la derecha una estrella con un botón
 * amarillo que lleva directo a WhatsApp.
 * Fondo verde profundo (#0d3b2d) en todo el bloque.
 * El mensaje invita a separar los productos con tiempo (plan de separación
 * desde el 20% o el 50%) y a escribir por WhatsApp para reservarlos.
 */
const cta = {
  title: "Decora tu Navidad sin complicarte",
  subtitle: "Plan de separación desde el 20% o el 50%",
  description:
    "Con el plan de separación apartas tus productos favoritos con solo una parte y pagas el resto después. Resérvalos con tiempo y asegúralos para diciembre.",
  buttonLabel: "Reserva por WhatsApp",
};

export default function Cta() {
  return (
    <section
      id="cta"
      aria-label="Promoción de temporada"
      className="w-full scroll-mt-20 bg-verde-profundo px-6 py-18 md:px-12 md:py-20"
    >
      {/* Fila de dos columnas (50% / 50%), centrada en un contenedor de ancho máximo como las secciones Benefits y Promo */}
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* Columna izquierda: textos */}
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-3xl leading-[37px] text-white md:text-4xl md:leading-[43px]">
            {cta.title}
          </h2>
          <p className="text-xl leading-[27px] font-semibold text-amarillo md:text-2xl md:leading-[31px]">
            {cta.subtitle}
          </p>
          <p className="text-base leading-[23px] text-fondo/80 md:text-lg md:leading-[25px]">
            {cta.description}
          </p>
        </div>

        {/* Columna derecha: estrella + botón amarillo con texto verde oliva */}
        <div className="flex flex-col items-center gap-6">
          <span className="text-amarillo">
            <StarIcon />
          </span>
          {/* Botón amarillo: enlace directo a WhatsApp (abre la conversación) */}
          <a
            href={buildWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-amarillo px-8 py-3 text-base leading-[23px] font-semibold text-verde-oliva transition-colors hover:bg-amarillo/90"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {cta.buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
