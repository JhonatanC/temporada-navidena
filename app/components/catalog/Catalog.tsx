"use client";

import { useState } from "react";
import { products, type Product } from "@/app/data/products";
import ProductCard from "@/app/components/cards/ProductCard";
import ProductModal from "@/app/components/modal/ProductModal";

/**
 * Sección "Detalles que enamoran".
 * Muestra todas las imágenes de los productos en un grid de tarjetas y abre
 * un modal de detalle al pulsar "Ver detalle" en cada una.
 * Es Client Component por el estado del producto seleccionado.
 */
export default function Catalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section
      id="catalog"
      aria-label="Detalles que enamoran"
      className="mx-auto w-full max-w-7xl px-6 py-20"
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
      </div>

      {/* Grid de tarjetas: 1 columna en móvil y hasta 4 en pantallas grandes */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDetail={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* Modal de detalle (se monta solo cuando hay un producto seleccionado) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
