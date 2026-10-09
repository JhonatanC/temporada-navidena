import Image from "next/image";
import type { Product } from "@/app/data/products";

interface ProductCardProps {
  product: Product;
  /** Abre el detalle del producto (lo maneja el componente padre). */
  onDetail: () => void;
}

/**
 * Tarjeta de producto: imagen, categoría, título y botón "Ver detalle".
 * Es presentacional: no tiene estado ni hooks, la interactividad llega por props.
 */
export default function ProductCard({ product, onDetail }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-verde-bosque/5 transition-transform duration-300 hover:-translate-y-1">
      {/* Imagen en formato retrato (3:4) con zoom sutil al pasar el cursor */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-vinotinto/90 px-3 py-1 text-xs leading-[19px] font-semibold text-white">
          {product.category}
        </span>
      </div>

      {/* Contenido: título y botón de detalle */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-xl leading-[27px] text-verde-bosque">
          {product.title}
        </h3>
        <button
          type="button"
          onClick={onDetail}
          className="mt-auto cursor-pointer rounded-full bg-vinotinto px-6 py-3 text-base leading-[23px] font-semibold text-white transition-colors hover:bg-rosa-coral"
        >
          Ver detalle
        </button>
      </div>
    </article>
  );
}
