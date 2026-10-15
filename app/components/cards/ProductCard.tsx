import Image from "next/image";
import type { Product } from "@/app/data/products";
import { formatPriceLabel } from "@/app/data/currency";

interface ProductCardProps {
  product: Product;
  /** Abre el detalle del producto (lo maneja el componente padre). */
  onDetail: () => void;
}

/**
 * Tarjeta de producto: imagen, categoría + estilo, título, descripción corta y botón "Ver detalle".
 * Es presentacional: no tiene estado ni hooks, la interactividad llega por props.
 */
export default function ProductCard({ product, onDetail }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-verde-bosque/5 transition-transform duration-300 hover:-translate-y-1">
      {/* Imagen en formato cuadrado (1:1) con zoom sutil al pasar el cursor */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Contenido: categoría + estilo, título y botón de detalle */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm leading-[21px] font-semibold tracking-wide text-verde-oliva uppercase">
            {product.category}
          </span>
          <span className="rounded-full bg-verde-oliva/15 px-3 py-1 text-xs leading-[19px] font-semibold text-verde-oliva">
            {product.style}
          </span>
        </div>
        <h3 className="text-lg leading-[25px] text-verde-bosque">
          {product.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-[21px] text-verde-oliva">
          {product.description}
        </p>
        <p className="text-lg leading-[25px] font-semibold text-vinotinto">
          {formatPriceLabel(product.price, {
            from: product.priceFrom,
            unit: product.unit,
          })}
        </p>
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
