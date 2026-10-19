import BgGif from "../../assets/bg-gif.jpg";
import BgSend from "../../assets/bg-send.jpg";
import BgCheck from "../../assets/bg-check.jpg";
import GiftIcon from "./partials/GiftIcon";
import ShippingIcon from "./partials/ShippingIcon";
import StarIcon from "./partials/StarIcon";

/**
 * Cajas de beneficios que se superponen al hero.
 * Cada beneficio tiene un título y un texto corto de apoyo (máx. 3 líneas).
 * Datos e íconos mock: se reemplazarán por el contenido real más adelante.
 * Las imágenes de la cara trasera se importan como módulos (igual que en
 * `app/data/products.ts`), ya que los assets viven dentro de `app/assets/`.
 */
const benefits = [
  {
    id: "regalos",
    title: "Regalos únicos",
    description: "Piezas especiales para sorprender a quien más quieres.",
    Icon: GiftIcon,
    bgImage: BgGif.src,
  },
  {
    id: "envios",
    title: "Envíos a toda Colombia",
    description: "Recibe tu pedido en casa, rápido y sin complicaciones.",
    Icon: ShippingIcon,
    bgImage: BgSend.src,
  },
  {
    id: "calidad",
    title: "Calidad garantizada",
    description: "Materiales y acabados que duran toda la temporada.",
    Icon: StarIcon,
    bgImage: BgCheck.src,
  },
];

export default function Benefits() {
  // En móvil las cajas van debajo del hero con un margen top (`mt-10`) que las
  // separa. El alto mínimo es de 300px para que los textos no se corten en
  // pantallas pequeñas. Desde `md` se superponen con un margen top negativo =
  // la mitad de la altura de la caja (221px / 2 = 110.5px): p-8 (64) +
  // ícono h-14 (56) + gap-4 x2 (32) + título (27) + descripción 2 líneas (42).
  // Si cambia el contenido de la caja, ajustar estos valores.
  return (
    <section
      id="benefits"
      aria-label="Beneficios"
      className="relative z-10 mx-auto mt-10 grid max-w-7xl gap-6 px-6 md:-mt-[110.5px] md:grid-cols-3"
    >
      {benefits.map(({ id, title, description, Icon, bgImage }) => (
        <article
          key={id}
          className="benefits-item group h-full min-h-[260px] md:min-h-[240px] w-full [perspective:1200px]"
        >
          <div className="relative h-full w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)] motion-reduce:transition-none motion-reduce:group-hover:[transform:none]">
            {/* Cara frontal */}
            <div className="absolute inset-0 flex h-full flex-col items-center gap-4 rounded-2xl border border-fondo bg-white p-8 text-center shadow-lg [backface-visibility:hidden]">
              {/* Contenedor del ícono: círculo claro que contrasta con la imagen del hero */}
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rosa-coral/15 text-vinotinto">
                <Icon />
              </span>
              <h2 className="text-xl leading-[27px] text-verde-bosque">
                {title}
              </h2>
              <p className="line-clamp-3 w-full max-w-[16rem] text-sm leading-[21px] italic text-verde-oliva">
                {description}
              </p>
            </div>

            {/* Cara trasera */}
            <div
              className="absolute inset-0 flex h-full flex-col items-center gap-4 rounded-2xl p-8 text-center text-white [backface-visibility:hidden] [transform:rotateX(180deg)] bg-cover bg-center"
              style={{ backgroundImage: `url(${bgImage})` }}
            >
              {/* Overlay semi-transparente de marca para que el texto y el ícono resalten */}
              <div
                className="absolute inset-0 rounded-2xl bg-verde-bosque/60"
                aria-hidden="true"
              />
              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white">
                  <Icon />
                </span>
                <h2 className="text-xl leading-[27px] text-white">{title}</h2>
                <p className="line-clamp-3 w-full max-w-[16rem] text-sm leading-[21px] italic text-white/90">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
