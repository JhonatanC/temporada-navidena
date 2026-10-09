"use client";

import { useMemo, useState } from "react";
import { products, type Product } from "@/app/data/products";
import ProductCard from "@/app/components/cards/ProductCard";
import ProductModal from "@/app/components/modal/ProductModal";

/** Opción "Todos" para mostrar el catálogo completo. */
const ALL = "Todos";

/** Productos visibles por página (2 filas de 3 en pantallas grandes). */
const ITEMS_PER_PAGE = 6;

/**
 * Sección "Detalles que enamoran".
 * Muestra las imágenes de los productos en un grid de tarjetas, permite filtrar
 * por categoría con botones tipo bullet y paginar de 6 en 6 cuando hay más
 * productos que ese límite. Abre un modal de detalle al pulsar "Ver detalle".
 * Es Client Component por el estado del filtro, la página y el producto elegido.
 */
export default function Catalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [currentPage, setCurrentPage] = useState(1);

  // "Todos" + las categorías únicas del catálogo, en orden de aparición.
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(products.map((p) => p.category)))],
    [],
  );

  // Solo se consideran las tarjetas de la categoría activa (o todas).
  const filteredProducts = useMemo(
    () =>
      activeCategory === ALL
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory],
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

  // Al cambiar de categoría se vuelve siempre a la primera página.
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <section
      id="catalog"
      aria-label="Detalles que enamoran"
      className="mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-20"
    >
      {/* Encabezado de la sección */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl leading-[37px] text-verde-bosque md:text-4xl md:leading-[43px]">
          Detalles que enamoran
        </h2>
        <p className="max-w-2xl text-base leading-[23px] text-verde-oliva md:text-lg md:leading-[25px]">
          Cada pieza de nuestra colección está pensada para transformar tu hogar
          en una Navidad inolvidable.
        </p>

        {/* Botones tipo bullet para mostrar u ocultar categorías */}
        <div
          role="group"
          aria-label="Filtrar por categoría"
          className="mt-2 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleCategoryChange(category)}
                className={`cursor-pointer rounded-full px-5 py-2 text-sm leading-[21px] font-semibold transition-colors ${
                  isActive
                    ? "bg-vinotinto text-white"
                    : "bg-white text-verde-bosque ring-1 ring-verde-bosque/15 hover:bg-rosa-coral/10"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de tarjetas: 1 columna en móvil y hasta 3 en pantallas grandes */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDetail={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* Paginación: solo aparece cuando hay más de una página */}
      {totalPages > 1 && (
        <nav
          aria-label="Paginación del catálogo"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
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

      {/* Modal de detalle (se monta solo cuando hay un producto seleccionado) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
