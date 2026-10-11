"use client";

import PosterVideo from "../../assets/camino-de-mesa-rojo.jpeg";
import GiftFinderButton from "../gift-finder/GiftFinderButton";
import GiftIcon from "./partials/GiftIcon";

/**
 * Sección promocional: fila de dos columnas al 50% (texto a la izquierda y
 * video a la derecha), centrada en un contenedor de ancho máximo.
 * Textos, botones y video son mock: se reemplazarán por el contenido real.
 */
const promo = {
  title: "Vive la magia de una Navidad hecha a tu medida",
  description:
    "Enciende cada rincón de tu hogar con detalles que cuentan historias: luces cálidas, texturas suaves y el aroma inconfundible de la temporada. Déjate inspirar por nuestro video y descubre cómo transformar tu casa en un escenario lleno de Navidad.",
  primaryLabel: "Ver catálogo",
  secondaryLabel: "Encuentra tu regalo",
  // Video mock de ejemplo (fuente pública CC0 de MDN). Reemplazar por el video real.
  videoSrc: "https://mdn.github.io/shared-assets/videos/flower.mp4",
  poster: PosterVideo.src,
};

export default function Promo() {
  return (
    <section
      id="promo"
      aria-label="Video promocional de Navidad"
      className="mx-auto grid max-w-7xl scroll-mt-20 items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-16"
    >
      {/* Columna izquierda (50%): título, párrafo y botones */}
      <div className="flex flex-col items-start gap-6">
        <h2 className="text-3xl leading-[37px] text-verde-bosque md:text-4xl md:leading-[43px]">
          {promo.title}
        </h2>
        <p className="text-base leading-[23px] text-verde-oliva md:text-lg md:leading-[25px]">
          {promo.description}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Botón principal */}
          <a
            href="#catalog"
            onClick={(event) => {
              const target = document.getElementById("catalog");
              if (target) {
                event.preventDefault();
                const prefersReducedMotion = window.matchMedia(
                  "(prefers-reduced-motion: reduce)",
                ).matches;
                target.scrollIntoView({
                  behavior: prefersReducedMotion ? "auto" : "smooth",
                  block: "start",
                });
              }
            }}
            className="cursor-pointer rounded-full bg-vinotinto px-8 py-3 text-base leading-[23px] font-semibold text-white transition-colors hover:bg-rosa-coral"
          >
            {promo.primaryLabel}
          </a>

          {/* Botón secundario con ícono de regalo: abre el pop-up "Cómo es tu Navidad" */}
          <GiftFinderButton
            label={promo.secondaryLabel}
            icon={<GiftIcon />}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-vinotinto px-8 py-3 text-base leading-[23px] font-semibold text-vinotinto transition-colors hover:bg-vinotinto hover:text-white"
          />
        </div>
      </div>

      {/* Columna derecha (50%): video mock con imagen de preview */}
      <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-verde-bosque/10">
        <video
          className="h-full w-full object-cover"
          poster={promo.poster}
          controls
          preload="none"
          playsInline
        >
          <source src={promo.videoSrc} type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>


      </div>
    </section>
  );
}
