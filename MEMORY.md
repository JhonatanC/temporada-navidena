# MEMORY.md - Estado Actual del Proyecto

## 📌 Estado Actual (Fase Activa)

- **Fase en curso:** Composición de la página principal (`app/page.tsx`).
- **Objetivo inmediato:** Reemplazar los textos mock (hero, promo, cta, catálogo) por contenido real y conectar los botones.

## ✅ Hitos Recientes

- Home (`app/page.tsx`) monta en orden: Hero → Benefits → Promo (`#promo`) → Catalog (`#catalog`) → Cta (`#cta`). `<header>` es `absolute top-0 z-20`; `#wrapper` es `relative`.
- **Navbar** (`app/components/navbar/Navbar.tsx`, Client): transparente sobre el hero; enlaces mock en `app/data/navigation.ts`. Móvil: panel lateral `fixed top-0 h-dvh w-[70%]` fondo blanco, cierre con X/overlay, animado con `transition-[left]` + `inert`/`aria-hidden`. Íconos presentacionales en `navbar/partials/`.
- **Hero** con `app/assets/bg-main.jpg` (600px escritorio, auto móvil), overlay `bg-verde-bosque/60` y 2 botones mock.
- **Benefits** (`#benefits`): 3 cajas blancas `rounded-2xl` superpuestas al hero con `-mt-[81.5px]` (= mitad de 163px). **Ojo:** recalcular si cambia el contenido de la caja. Íconos en `benefits/partials/`.
- **Promo** (`#promo`): grid 2 columnas (texto + video mock `<video>` con poster `camino-de-mesa-rojo.jpeg`).
- **Catálogo "Detalles que enamoran"** (`app/components/catalog/Catalog.tsx`, Client): grid 1→2→3→4 columnas con `ProductCard` y `ProductModal`.
  - `app/data/products.json` reescrito: **20 productos**, uno por cada foto de `app/assets` (cojines, muñecos, pies de árbol, mesa, cubre sillas, cortineros). El campo `image` guarda el **nombre de archivo**; las `specs` usan claves en español.
  - `app/data/products.ts`: interfaz `Product` + mapa de **imports estáticos** `Record<string, StaticImageData>` que une el JSON con las imágenes. Al agregar un producto: agregar el import, la entrada del mapa y el registro en el JSON.
  - `ProductCard` (`cards/`): imagen `aspect-[3/4]` con `fill`/`object-cover`, badge de categoría, título y botón "Ver detalle" (`onDetail`).
  - `ProductModal` (`modal/`, Client): overlay, cierre con X/Escape/clic fuera, bloquea scroll del body; muestra imagen, categoría, título, precio, descripción y specs. Ícono propio en `modal/partials/`.
- **Cta** (`#cta`): fondo `bg-verde-profundo`, grid 2 columnas; textos mock en el objeto `cta`.
- **Tipografías** (`layout.tsx`, `next/font/google`): Cinzel Decorative (`--font-cinzel`, títulos H1-H6 por regla en `globals.css`) e Inter (`--font-inter`, textos).
- **Paleta** en `@theme` (`globals.css`): vinotinto, rosa-coral, verde-bosque, verde-oliva, fondo; extra verde-profundo y amarillo (solo CTA).

## 🚧 Próximos Pasos Pendientes

1. Reemplazar textos mock (hero, promo, cta) por contenido real.
2. Conectar botones mock ("Ver catálogo", "Contáctanos", "Comprar ahora") a rutas/acciones reales.
3. Reemplazar enlaces mock del navbar por rutas reales.
4. Normalizar los datos del catálogo (títulos, precios, descripciones) con el contenido real.

## ⚠️ Notas Técnicas y Reglas Activas

- **Interlineado:** estricto `font-size + 7px` (12→19, 14→21, 16→23, 20→27, 24→31, 30→37, 36→43).
- **Clases de texto:** usar utilidades Tailwind, no píxeles fijos.
- **Componentes:** uno por archivo, PascalCase, agrupados por dominio en `app/components/`; partials en `partials/`. `"use client"` solo con interactividad.
- **Imágenes:** se importan estáticamente desde `app/assets` (hero, poster, productos). El JSON referencia el nombre de archivo y `products.ts` lo resuelve.
