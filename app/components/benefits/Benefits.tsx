import GiftIcon from "./partials/GiftIcon";
import ShippingIcon from "./partials/ShippingIcon";
import StarIcon from "./partials/StarIcon";

/**
 * Cajas de beneficios que se superponen al hero.
 * Datos e íconos mock: se reemplazarán por el contenido real más adelante.
 */
const benefits = [
  {
    id: "regalos",
    title: "Regalos únicos",
    Icon: GiftIcon,
  },
  {
    id: "envios",
    title: "Envíos a todo el país",
    Icon: ShippingIcon,
  },
  {
    id: "calidad",
    title: "Calidad garantizada",
    Icon: StarIcon,
  },
];

export default function Benefits() {
  // Margen top negativo = la mitad de la altura de la caja (163px / 2 = 81.5px):
  // p-8 (64) + ícono h-14 (56) + gap-4 (16) + línea de título (27).
  // Si cambia el contenido de la caja, ajustar este valor.
  return (
    <section
      id="benefits"
      aria-label="Beneficios"
      className="relative z-10 mx-auto -mt-[81.5px] grid max-w-7xl gap-6 px-6 md:grid-cols-3"
    >
      {benefits.map(({ id, title, Icon }) => (
        <article
          key={id}
          className="benefit-item flex w-full flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center shadow-lg"
        >
          {/* Contenedor del ícono: círculo claro que contrasta con la imagen del hero */}
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rosa-coral/15 text-vinotinto">
            <Icon />
          </span>
          <h3 className="text-xl leading-[27px] text-verde-bosque">{title}</h3>
        </article>
      ))}
    </section>
  );
}
