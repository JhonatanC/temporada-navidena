# MEMORY.md - Estado Actual del Proyecto

## 📌 Estado Actual (Fase Activa)

- **Fase en curso:** Composición de la página principal (`app/page.tsx`).
- **Objetivo inmediato:** Reemplazar los textos mock (hero, promo, cta, catálogo) por contenido real y conectar los botones.

## ✅ Hitos Recientes

- Home (`app/page.tsx`) monta en orden: Hero (`#inicio`) → Benefits (`#benefits`, superpuesto) → Promo (`#promo`) → Catalog (`#catalog`) → Cta (`#cta`). `<header>` va en flujo (sin posicionamiento; el navbar se fija solo) y `#wrapper` es `relative`. Las secciones destino llevan `scroll-mt-20` para compensar la altura del navbar fijo.
- **Navbar** (`app/components/navbar/Navbar.tsx`, Client): **fijo** (`fixed inset-x-0 top-0 z-30`) y transparente sobre el hero; al superar el hero pasa a fondo sólido (`bg-white shadow-md`) y el texto cambia de blanco a `verde-bosque`. Se **muestra mientras hay scroll** (en cualquier dirección) y se **oculta al detenerse** (`-translate-y-full` + timeout `HIDE_DELAY`=300ms); en la parte superior (scrollY ≤ 8) queda siempre visible y con el menú móvil abierto también. La capa que se traslada (transform) es hermana del menú móvil, para no romper su `fixed`. Enlaces en `app/data/navigation.ts`, en orden **Inicio → Nosotros → Catálogo → Contacto**, con anclas a secciones de la home: `#inicio` (hero + benefits), `#promo` (video + descripción), `#catalog` (Detalles que enamoran) y `#cta` (call to action). `handleNavClick` intercepta los `#` y usa `scrollIntoView` con `behavior:"smooth"` (respeta `prefers-reduced-motion`) y cierra el menú móvil. Móvil: panel lateral `fixed top-0 h-dvh w-[70%]` fondo blanco, cierre con X/overlay, animado con `transition-[left]` + `inert`/`aria-hidden`. Íconos presentacionales en `navbar/partials/`.
- **Hero** con `app/assets/bg-main.jpg` (600px escritorio, auto móvil), overlay `bg-verde-bosque/60` y 2 botones mock ("Ver catálogo" y "Encuentra tu detalle" con ícono de regalo `hero/partials/GiftIcon.tsx`). El hero vive inline en `app/page.tsx`.
- **Benefits** (`#benefits`): 3 cajas blancas `rounded-2xl` superpuestas al hero con `-mt-[110.5px]` (= mitad de 221px). Cada caja tiene ícono, título y una descripción corta en cursiva (`italic`), ancho máximo `max-w-[16rem]` y `line-clamp-3`. **Ojo:** recalcular `-mt` si cambia el contenido de la caja (p-8 + ícono h-14 + 2 gaps + título + 2 líneas de texto). Íconos en `benefits/partials/`.
- **Promo** (`#promo`): grid 2 columnas (texto + video mock `<video>` con poster `camino-de-mesa-rojo.jpeg`). El botón secundario "Encuentra tu detalle" lleva un ícono de regalo a la izquierda (`promo/partials/GiftIcon.tsx`).
- **Catálogo "Detalles que enamoran"** (`app/components/catalog/Catalog.tsx`, Client): filtro por categoría con botones bullet (`Todos` + categorías únicas derivadas de los productos; el activo es vinotinto), grid 1→2→3 columnas con `ProductCard` y `ProductModal`, y **paginación de 6 productos por página** (`ITEMS_PER_PAGE`) que solo se muestra si hay más de una página. Al cambiar de categoría vuelve a la página 1.
  - `app/data/products.json` reescrito: **26 productos**, uno por cada foto de `app/assets` (cojines, muñecos, pies de árbol, mesa, cubre sillas, cortineros y un reloj). El campo `image` guarda el **nombre de archivo**; las `specs` usan claves en español. Cada producto tiene un campo `style` (**taxonomía**: "Clásica" | "Natural" | "Brillante") pensado para funcionalidades futuras.
  - Nuevos (prod-21 a prod-26, inferidos del nombre del archivo): `camino-de-mesa-rosado.jpeg`, `cojin-muneco-nieve.jpeg`, `cojin-reno-cafe.jpeg`, `cubre-sillas-2.jpeg`, `cubre-sillas-claros.jpeg` y `reloj.jpeg` (este último abre la categoría **"Decoración"**, que el filtro del catálogo deriva dinámicamente). Pendiente validar títulos/colores reales (no se pudieron ver las imágenes).
  - `app/data/products.ts`: interfaz `Product` + tipo `ProductStyle` + mapa de **imports estáticos** `Record<string, StaticImageData>` que une el JSON con las imágenes. Al agregar un producto: agregar el import, la entrada del mapa y el registro en el JSON (incluido `style`).
  - `ProductCard` (`cards/`): imagen `aspect-square` con `fill`/`object-cover`; encima del título una fila con categoría (izquierda) y badge de `style`/taxonomía (derecha); título `text-lg`, descripción corta (`line-clamp-2`) y botón "Ver detalle" (`onDetail`).
  - `ProductModal` (`modal/`, Client): overlay, cierre con X/Escape/clic fuera, bloquea scroll del body; panel `max-w-5xl` y `md:h-[80vh]` (imagen a toda la columna), contenido centrado verticalmente; muestra imagen, categoría, título, precio, descripción y specs. Ícono propio en `modal/partials/`.
- **Cta** (`#cta`): fondo `bg-verde-profundo`, grid 2 columnas; textos mock en el objeto `cta`. El botón amarillo "Encuentra tu regalo" lleva ícono de regalo (`cta/partials/GiftIcon.tsx`).
- **Pop-up "Cómo es tu Navidad"** (dominio `app/components/gift-finder/`): los 3 botones "Encuentra tu regalo" (hero en `page.tsx`, promo y cta) usan `GiftFinderButton` (Client, recibe `label`/`className`/`icon` y abre el modal), así Promo/Cta siguen siendo Server Components. `GiftFinderModal`: estrella en círculo verde → título "Cómo es tu Navidad" → subtítulo "Elige la que va más contigo" → chips de filtro con **solo las 3 taxonomías** (`productStyles`, mismo estilo que el filtro del catálogo; por defecto "Clásica") → grilla de `GiftFinderCard` (imagen 4:3 + nombre + "Ver detalle") **paginada de 3 en 3** (mismo look que la paginación del catálogo; solo aparece con más de una página y al cambiar de taxonomía vuelve a la página 1). "Ver detalle" superpone `ProductModal` (z-50 sobre el overlay z-40); Escape cierra primero el detalle y luego el pop-up; al cerrar el pop-up el filtro vuelve a "Clásica" y la página 1.
- `app/data/products.ts`: nuevo export `productStyles: ProductStyle[]` = ["Clásica", "Natural", "Brillante"] (mantener sincronizado con el tipo).
- **Tipografías** (`layout.tsx`, `next/font/google`): Cinzel Decorative (`--font-cinzel`, títulos H1-H6 por regla en `globals.css`) e Inter (`--font-inter`, textos).
- **Paleta** en `@theme` (`globals.css`): vinotinto, rosa-coral, verde-bosque, verde-oliva, fondo; extra verde-profundo y amarillo (solo CTA).

## 🚧 Próximos Pasos Pendientes

1. Reemplazar textos mock (hero, promo, cta) por contenido real.
2. Conectar botones mock ("Ver catálogo", "Contáctanos", "Comprar ahora") a rutas/acciones reales.
3. Normalizar los datos del catálogo (títulos, precios, descripciones) con el contenido real.

## ⚠️ Notas Técnicas y Reglas Activas

- **Interlineado:** estricto `font-size + 7px` (12→19, 14→21, 16→23, 20→27, 24→31, 30→37, 36→43).
- **Clases de texto:** usar utilidades Tailwind, no píxeles fijos.
- **Componentes:** uno por archivo, PascalCase, agrupados por dominio en `app/components/`; partials en `partials/`. `"use client"` solo con interactividad.
- **Imágenes:** se importan estáticamente desde `app/assets` (hero, poster, productos). El JSON referencia el nombre de archivo y `products.ts` lo resuelve.
- **Apilamiento (z-index):** el hero y Benefits usan `relative z-10`; el navbar es `fixed z-30` (overlay móvil `z-20`, panel lateral `z-30`). `GiftFinderModal` se monta con `createPortal` a `document.body` (overlay `z-40`, `ProductModal` `z-50`) para quedar **por encima del navbar** y de Benefits. Ojo con repetir el patrón de portal en futuros pop-ups que se abran desde el hero.
