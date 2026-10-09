import Image from "next/image";
import type { Product } from "@/app/data/products";

interface GiftFinderCardProps {
  product: Product;
  /** Abre el detalle del producto (lo maneja el pop-up). */
  onDetail: () => void;
}

/**
 * Widget de producto dentro del pop-up "Cómo es tu Navidad".
 * Muestra la imagen, el nombre y el botón "Ver detalle".
 * Es presentacional: no tiene estado ni hooks, la interactividad llega por props.
 */
export default function GiftFinderCard({ product, onDetail }: GiftFinderCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-verde-bosque/10">
      {/* Imagen en formato 4:3 para que quepan más widgets en el pop-up */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Contenido: nombre del producto y botón de detalle */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="text-base leading-[23px] text-verde-bosque">
          {product.title}
        </h3>
        <button
          type="button"
          onClick={onDetail}
          className="mt-auto cursor-pointer rounded-full bg-vinotinto px-6 py-2.5 text-sm leading-[21px] font-semibold text-white transition-colors hover:bg-rosa-coral"
        >
          Ver detalle
        </button>
      </div>
    </article>
  );
}
