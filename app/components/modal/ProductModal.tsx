"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { Product } from "@/app/data/products";
import { formatPriceLabel } from "@/app/data/currency";
import PriceNote from "@/app/components/pricing/PriceNote";
import {
  buildProductWhatsAppMessage,
  buildWhatsAppHref,
} from "@/app/data/whatsapp";
import WhatsAppIcon from "@/app/components/whatsapp/partials/WhatsAppIcon";
import useBodyScrollLock from "@/app/hooks/useBodyScrollLock";
import CloseIcon from "./partials/CloseIcon";

interface ProductModalProps {
  /** Producto a mostrar. Si es `null`, el modal no se renderiza. */
  product: Product | null;
  onClose: () => void;
}

/**
 * Modal de detalle de producto.
 * Se cierra con el botón X, al tocar el fondo o con la tecla Escape.
 * Mientras está abierto bloquea el scroll del body (vía `useBodyScrollLock`,
 * que soporta modales anidados sin congelar la página).
 */
export default function ProductModal({ product, onClose }: ProductModalProps) {
  // Bloquea el scroll del fondo mientras el modal está abierto.
  useBodyScrollLock(product !== null);

  // Cierra con Escape mientras el modal está abierto.
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
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

        {/* Imagen del producto: al abrir el detalle queda a la vista de
            inmediato, así que se carga en modo `eager` (sin esperar al lazy). */}
        <div className="relative aspect-[3/4] w-full md:h-full md:aspect-auto">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
            placeholder="blur"
            className="object-cover"
          />
        </div>

        {/* Información del producto */}
        <div className="flex flex-col justify-center gap-5 p-8 md:p-10">
          {/* Categoría y taxonomía, con etiquetas para que el usuario entienda qué es cada dato */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-fit rounded-full px-4 py-1 text-sm leading-[21px] font-semibold text-vinotinto ring-1 ring-vinotinto">
              Categoría: {product.category}
            </span>
            <span className="w-fit rounded-full px-4 py-1 text-sm leading-[21px] font-semibold text-verde-oliva ring-1 ring-verde-oliva">
              Tipo de Navidad: {product.style}
            </span>
          </div>

          <h3
            id="product-modal-title"
            className="text-2xl leading-[31px] text-verde-bosque md:text-3xl md:leading-[37px]"
          >
            {product.title}
          </h3>

          <p className="text-2xl leading-[31px] font-semibold text-vinotinto">
            {formatPriceLabel(product.price, {
              from: product.priceFrom,
              unit: product.unit,
            })}
          </p>

          {/* Aclaración de que el precio es de referencia y puede variar */}
          <PriceNote className="-mt-2 text-xs leading-[19px] sm:text-sm sm:leading-[21px]" />

          <p className="text-base leading-[23px] text-verde-oliva">
            {product.descriptions.long}
          </p>

          {/* Botón verde oliva: lleva a WhatsApp con los datos del producto */}
          <a
            href={buildWhatsAppHref(buildProductWhatsAppMessage(product))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit cursor-pointer items-center justify-center gap-2 self-center rounded-full bg-verde-oliva px-6 py-3 text-base leading-[23px] font-semibold text-white transition-colors hover:bg-verde-bosque"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
