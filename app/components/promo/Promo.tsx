import PosterVideo from "../../assets/camino-de-mesa-rojo.jpeg";

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
  secondaryLabel: "Contáctanos",
  // Video mock de ejemplo (fuente pública CC0 de MDN). Reemplazar por el video real.
  videoSrc: "https://mdn.github.io/shared-assets/videos/flower.mp4",
  poster: PosterVideo.src,
};

export default function Promo() {
  return (
    <section
      id="promo"
      aria-label="Video promocional de Navidad"
      className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-16"
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
          <button
            type="button"
            className="cursor-pointer rounded-full bg-vinotinto px-8 py-3 text-base leading-[23px] font-semibold text-white transition-colors hover:bg-rosa-coral"
          >
            {promo.primaryLabel}
          </button>

          {/* Botón secundario */}
          <button
            type="button"
            className="cursor-pointer rounded-full border-2 border-vinotinto px-8 py-3 text-base leading-[23px] font-semibold text-vinotinto transition-colors hover:bg-vinotinto hover:text-white"
          >
            {promo.secondaryLabel}
          </button>
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

        {/* Insignia que anticipa la llegada de un nuevo video */}
        <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-vinotinto/90 px-4 py-1 text-sm leading-[21px] font-semibold text-white">
          Nuevo video
        </span>
      </div>
    </section>
  );
}
