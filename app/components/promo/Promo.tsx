import Image from "next/image";
import SalaDecorada from "../../assets/img-sala-decorada.webp";
import GiftFinderButton from "../gift-finder/GiftFinderButton";
import GiftIcon from "./partials/GiftIcon";

/**
 * Sección promocional: fila de dos columnas al 50% (texto a la izquierda e
 * imagen a la derecha), centrada en un contenedor de ancho máximo.
 * Textos y botones son mock: se reemplazarán por el contenido real.
 * Presentacional (Server Component): la interactividad vive en
 * `GiftFinderButton` (Client) y el scroll suave del ancla lo maneja CSS.
 */
const promo = {
  title: "Vive la magia de una Navidad hecha a tu medida",
  description:
    "Enciende cada rincón de tu hogar con detalles que cuentan historias: luces cálidas, texturas suaves y el aroma inconfundible de la temporada. Déjate inspirar por nuestros productos y descubre cómo transformar tu casa en un escenario lleno de Navidad.",
  primaryLabel: "Ver catálogo",
  secondaryLabel: "Encuentra tu regalo",
  // Imagen de una sala decorada con motivos navideños.
  image: SalaDecorada,
};

export default function Promo() {
  return (
    <section
      id="promo"
      aria-label="Imagen promocional de Navidad"
      className="mx-auto grid max-w-7xl scroll-mt-20 items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-16"
    >
      {/* Columna izquierda (50%): título, párrafo y botones */}
      <div className="flex flex-col items-start justify-center gap-6">
        <h2 className="text-3xl leading-[37px] text-verde-bosque md:text-4xl md:leading-[43px]">
          {promo.title}
        </h2>
        <p className="text-base leading-[23px] text-verde-oliva md:text-lg md:leading-[25px]">
          {promo.description}
        </p>

        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          {/* Botón principal: ancla nativa con scroll suave vía CSS */}
          <a
            href="#catalog"
            className="w-full cursor-pointer rounded-full bg-vinotinto px-8 py-3 text-center text-base leading-[23px] font-semibold text-white transition-colors hover:bg-rosa-coral sm:w-auto"
          >
            {promo.primaryLabel}
          </a>

          {/* Botón secundario con ícono de regalo: abre el pop-up "Cómo es tu Navidad" */}
          <GiftFinderButton
            label={promo.secondaryLabel}
            icon={<GiftIcon />}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-vinotinto px-8 py-3 text-base leading-[23px] font-semibold text-vinotinto transition-colors hover:bg-vinotinto hover:text-white sm:w-auto"
          />
        </div>
      </div>

      {/* Columna derecha (50%): imagen de una sala decorada */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-gray-50 shadow-xl ring-1 ring-verde-bosque/10 md:aspect-[3/4]">
        <Image
          src={promo.image}
          alt="Sala decorada con motivos navideños"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
          className="object-contain object-center"
        />
      </div>
    </section>
  );
}
