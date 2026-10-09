import GiftIcon from "./partials/GiftIcon";
import ShippingIcon from "./partials/ShippingIcon";
import StarIcon from "./partials/StarIcon";

/**
 * Cajas de beneficios que se superponen al hero.
 * Cada beneficio tiene un título y un texto corto de apoyo (máx. 3 líneas).
 * Datos e íconos mock: se reemplazarán por el contenido real más adelante.
 */
const benefits = [
  {
    id: "regalos",
    title: "Regalos únicos",
    description: "Piezas especiales para sorprender a quien más quieres.",
    Icon: GiftIcon,
  },
  {
    id: "envios",
    title: "Envíos a todo el país",
    description: "Recibe tu pedido en casa, rápido y sin complicaciones.",
    Icon: ShippingIcon,
  },
  {
    id: "calidad",
    title: "Calidad garantizada",
    description: "Materiales y acabados que duran toda la temporada.",
    Icon: StarIcon,
  },
];

export default function Benefits() {
  // Margen top negativo = la mitad de la altura de la caja (221px / 2 = 110.5px):
  // p-8 (64) + ícono h-14 (56) + gap-4 x2 (32) + título (27) + descripción 2 líneas (42).
  // Si cambia el contenido de la caja, ajustar este valor.
  return (
    <section
      id="benefits"
      aria-label="Beneficios"
      className="relative z-10 mx-auto -mt-[110.5px] grid max-w-7xl gap-6 px-6 md:grid-cols-3"
    >
      {benefits.map(({ id, title, description, Icon }) => (
        <article
          key={id}
          className="benefit-item flex w-full flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center shadow-lg"
        >
          {/* Contenedor del ícono: círculo claro que contrasta con la imagen del hero */}
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rosa-coral/15 text-vinotinto">
            <Icon />
          </span>
          <h3 className="text-xl leading-[27px] text-verde-bosque">{title}</h3>
          <p className="line-clamp-3 w-full max-w-[16rem] text-sm leading-[21px] text-verde-oliva italic">
            {description}
          </p>
        </article>
      ))}
    </section>
  );
}
