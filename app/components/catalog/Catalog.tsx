"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");

  // Ref a la sección del catálogo para hacer scroll al cambiar de página.
  const catalogRef = useRef<HTMLElement>(null);
  // Flag de intención de navegación: solo se activa al hacer clic explícito
  // en los controles de paginación, filtro o buscador. Nunca al montar ni al
  // refrescar la página.
  const shouldScrollToCatalog = useRef(false);

  // Al cambiar de página de paginación, vuelve al inicio de la sección del
  // catálogo con scroll suave, pero únicamente si el cambio fue provocado por
  // una interacción explícita del usuario. Al refrescar o montar la página
  // desde otra sección (ej. el hero) no ocurre ningún scroll.
  useEffect(() => {
    if (!shouldScrollToCatalog.current) {
      return;
    }
    shouldScrollToCatalog.current = false;
    catalogRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentPage]);

  // "Todos" + las categorías únicas del catálogo, en orden de aparición.
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(products.map((p) => p.category)))],
    [],
  );

  // Solo se consideran las tarjetas de la categoría activa (o todas), filtradas
  // también por el texto del buscador (coincide en título o categoría).
  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== ALL) {
      result = result.filter((p) => p.category === activeCategory);
    }
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

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
    shouldScrollToCatalog.current = true;
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // Al escribir en el buscador se reinicia la paginación a la primera página.
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    shouldScrollToCatalog.current = true;
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <section
      id="catalog"
      ref={catalogRef}
      aria-label="Detalles que enamoran"
      className="mx-auto w-full max-w-7xl scroll-mt-20 px-6 pt-8 pb-20"
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

        {/* Buscador de productos: 100% de ancho en móvil y el 50% centrado
             a partir de tablets/desktop. */}
        <div className="w-full md:w-1/2 max-w-md mx-auto mt-4">
          <input
            type="search"
            aria-label="Buscar productos"
            placeholder="Buscar productos (ej. Noel, Reno, Cojín)"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-full bg-white px-4 py-2.5 text-base leading-[23px] text-verde-bosque placeholder:text-verde-bosque/40 ring-1 ring-verde-bosque/15 focus:outline-none focus:ring-2 focus:ring-vinotinto transition-colors"
          />
        </div>

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

      {filteredProducts.length === 0 ? (
        <p className="mt-12 text-center text-base leading-[23px] text-verde-bosque">
          {searchQuery.trim()
            ? `No se encontraron productos con "${searchQuery}".`
            : "No hay productos en esta categoría."}
        </p>
      ) : (
        <>
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
                onClick={() => {
                  shouldScrollToCatalog.current = true;
                  setCurrentPage((page) => page - 1);
                }}
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
                      onClick={() => {
                        shouldScrollToCatalog.current = true;
                        setCurrentPage(page);
                      }}
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
                onClick={() => {
                  shouldScrollToCatalog.current = true;
                  setCurrentPage((page) => page + 1);
                }}
                className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm leading-[21px] font-semibold text-verde-bosque ring-1 ring-verde-bosque/15 transition-colors hover:bg-rosa-coral/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Siguiente
              </button>
            </nav>
          )}
        </>
      )}

      {/* Modal de detalle (se monta solo cuando hay un producto seleccionado) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
