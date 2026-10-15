"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { products, productStyles, type Product, type ProductStyle } from "@/app/data/products";
import ProductModal from "@/app/components/modal/ProductModal";
import useBodyScrollLock from "@/app/hooks/useBodyScrollLock";
import CloseIcon from "@/app/components/modal/partials/CloseIcon";
import GiftFinderCard from "./partials/GiftFinderCard";
import StarIcon from "./partials/StarIcon";

/** Productos visibles por página (una fila de 3 en pantallas grandes). */
const ITEMS_PER_PAGE = 3;

interface GiftFinderModalProps {
  /** Abre el pop-up. Si es `false`, el modal no se renderiza. */
  open: boolean;
  onClose: () => void;
}

/**
 * Pop-up "Cómo es tu Navidad".
 * Encabezado con estrella, título y subtítulo; un filtro por taxonomía
 * (estilo) con el mismo estilo de botones que el del catálogo; y una grilla
 * con la imagen, el nombre y el botón "Ver detalle" de cada producto,
 * paginada de 3 en 3.
 * Al pulsar "Ver detalle" se superpone el `ProductModal` del producto elegido.
 * Se renderiza con un portal a `document.body` para que su `z-40` no quede
 * atrapado en el contexto de apilamiento del hero y se pinte por encima de las
 * tarjetas de beneficios.
 */
export default function GiftFinderModal({ open, onClose }: GiftFinderModalProps) {
  // Por defecto se muestra la primera taxonomía ("Clásica").
  const [activeStyle, setActiveStyle] = useState<ProductStyle>(productStyles[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Bloquea el scroll del body mientras el pop-up está abierto. El hook usa un
  // contador compartido entre modales, así que superponer el detalle de
  // producto (que también bloquea) ya no puede dejar la página congelada al
  // cerrar (bug: el guardado manual capturaba el "hidden" del otro modal).
  useBodyScrollLock(open);

  // Cierra con Escape, salvo que el detalle de producto esté encima,
  // que tiene su propio listener (se cierra primero ese).
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !selectedProduct) {
        setSelectedProduct(null);
        setActiveStyle(productStyles[0]);
        setCurrentPage(1);
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, selectedProduct, onClose]);

  // Cierra el pop-up y lo deja listo para el próximo uso (vuelve a "Clásica").
  const handleClose = () => {
    setSelectedProduct(null);
    setActiveStyle(productStyles[0]);
    setCurrentPage(1);
    onClose();
  };

  // Al cambiar de taxonomía se vuelve siempre a la primera página.
  const handleStyleChange = (style: ProductStyle) => {
    setActiveStyle(style);
    setCurrentPage(1);
  };

  // Solo se consideran los productos del estilo activo.
  const filteredProducts = useMemo(
    () => products.filter((p) => p.style === activeStyle),
    [activeStyle],
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Trozo de productos correspondiente a la página actual.
  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [filteredProducts, currentPage],
  );

  if (!open) return null;

  return createPortal(
    // Fondo oscuro: al hacer clic fuera del panel se cierra el pop-up.
    <div
      role="presentation"
      onClick={handleClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-verde-bosque/60 p-4 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gift-finder-title"
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-10"
      >
        {/* Botón de cierre */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar pop-up"
          className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-verde-bosque shadow-md transition-colors hover:bg-rosa-coral hover:text-white"
        >
          <CloseIcon />
        </button>

        {/* Encabezado: estrella, título y subtítulo */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-verde-bosque text-amarillo">
            <StarIcon />
          </span>
          <h2
            id="gift-finder-title"
            className="text-2xl leading-[31px] text-verde-bosque md:text-3xl md:leading-[37px]"
          >
            Cómo es tu Navidad
          </h2>
          <p className="text-base leading-[23px] text-verde-oliva md:text-lg md:leading-[25px]">
            Elige la que va más contigo
          </p>
        </div>

        {/* Botones tipo bullet para filtrar por taxonomía (estilo) */}
        <div
          role="group"
          aria-label="Filtrar por estilo"
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {productStyles.map((style) => {
            const isActive = style === activeStyle;
            return (
              <button
                key={style}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleStyleChange(style)}
                className={`cursor-pointer rounded-full px-5 py-2 text-sm leading-[21px] font-semibold transition-colors ${
                  isActive
                    ? "bg-vinotinto text-white"
                    : "bg-white text-verde-bosque ring-1 ring-verde-bosque/15 hover:bg-rosa-coral/10"
                }`}
              >
                {style}
              </button>
            );
          })}
        </div>

        {/* Grilla de widgets: imagen, nombre y "Ver detalle" */}
        {paginatedProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map((product) => (
              <GiftFinderCard
                key={product.id}
                product={product}
                onDetail={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-base leading-[23px] text-verde-oliva">
            Todavía no hay productos con este estilo.
          </p>
        )}

        {/* Paginación: solo aparece cuando hay más de una página */}
        {totalPages > 1 && (
          <nav
            aria-label="Paginación del buscador de regalos"
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm leading-[21px] font-semibold text-verde-bosque ring-1 ring-verde-bosque/15 transition-colors hover:bg-rosa-coral/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => {
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 cursor-pointer rounded-full text-sm leading-[21px] font-semibold transition-colors ${
                      isActive
                        ? "bg-vinotinto text-white"
                        : "bg-white text-verde-bosque ring-1 ring-verde-bosque/15 hover:bg-rosa-coral/10"
                    }`}
                  >
                    {page}
                  </button>
                );
              },
            )}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm leading-[21px] font-semibold text-verde-bosque ring-1 ring-verde-bosque/15 transition-colors hover:bg-rosa-coral/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
            </button>
          </nav>
        )}

        {/* Detalle del producto elegido, superpuesto al pop-up */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </div>,
    document.body,
  );
}
