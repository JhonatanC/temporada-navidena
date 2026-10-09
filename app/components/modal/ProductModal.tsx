"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { Product } from "@/app/data/products";
import CloseIcon from "./partials/CloseIcon";

interface ProductModalProps {
  /** Producto a mostrar. Si es `null`, el modal no se renderiza. */
  product: Product | null;
  onClose: () => void;
}

/**
 * Modal de detalle de producto.
 * Se cierra con el botón X, al tocar el fondo o con la tecla Escape.
 * Mientras está abierto bloquea el scroll del body.
 */
export default function ProductModal({ product, onClose }: ProductModalProps) {
  // Cierra con Escape y bloquea el scroll del fondo mientras el modal está abierto.
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    // Fondo oscuro: al hacer clic fuera del panel se cierra el modal.
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-verde-bosque/60 p-4 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="relative grid max-h-[92vh] w-full max-w-5xl grid-cols-1 overflow-y-auto rounded-3xl bg-white shadow-2xl md:h-[80vh] md:grid-cols-2"
      >
        {/* Botón de cierre */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalle"
          className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-verde-bosque shadow-md transition-colors hover:bg-rosa-coral hover:text-white"
        >
          <CloseIcon />
        </button>

        {/* Imagen del producto */}
        <div className="relative aspect-[3/4] w-full md:h-full md:aspect-auto">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Información del producto */}
        <div className="flex flex-col justify-center gap-5 p-8 md:p-10">
          <span className="w-fit rounded-full bg-rosa-coral/15 px-4 py-1 text-sm leading-[21px] font-semibold text-vinotinto">
            {product.category}
          </span>

          <h3
            id="product-modal-title"
            className="text-2xl leading-[31px] text-verde-bosque md:text-3xl md:leading-[37px]"
          >
            {product.title}
          </h3>

          <p className="text-2xl leading-[31px] font-semibold text-vinotinto">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-base leading-[23px] text-verde-oliva">
            {product.description}
          </p>

          {/* Especificaciones */}
          <dl className="flex flex-col gap-2 border-t border-verde-bosque/10 pt-5">
            {Object.entries(product.specs).map(([label, value]) => (
              <div key={label} className="flex gap-2 text-sm leading-[21px]">
                <dt className="font-semibold text-verde-bosque">{label}:</dt>
                <dd className="text-verde-oliva">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
