# MEMORY.md - Estado Actual del Proyecto

## 📌 Estado Actual (Fase Activa)

- **Fase en curso:** Construcción de la página principal (`app/page.tsx`).
- **Objetivo inmediato:** Definir la interfaz TypeScript `Product` que refleje el JSON y comenzar con `ProductCard`.

## ✅ Hitos Recientes

- **Navbar responsivo** creado en `app/components/navbar/Navbar.tsx` (carpeta antes llamada `header/`):
  - Transparente y superpuesto sobre el hero (el `<header>` en `page.tsx` es `absolute top-0 z-20` y `#wrapper` es `relative`).
  - Enlaces mock centralizados en `app/data/navigation.ts` (`NavLink`, `navLinks`).
  - Tablet/escritorio: enlaces en línea (`md:flex`). Móvil: menú hamburguesa con `useState` (por eso es Client Component).
  - Móvil: el menú es un **panel lateral** anclado a la izquierda (`fixed top-0 h-dvh w-[70%]`) con **fondo blanco** (texto `verde-bosque`) y sin logo interno; los ítems se separan con `border-b` excepto el último. El cierre se hace con la X externa (el hamburguesa cambia a X) o tocando el overlay. Siempre montado y animado con `transition-[left]` (`left-0` abierto / `-left-[70%]` cerrado) + `inert`/`aria-hidden` cuando está cerrado. Sobre un **overlay** `fixed inset-0 bg-black/40` con fundido (`transition-opacity`) que cierra el menú al tocar.
  - Texto blanco con hover `rosa-coral`; se ajustó el padding superior del hero (`pt-28`) para no chocar con la barra.
  - Íconos `MenuIcon` y `CloseIcon` extraídos a `app/components/navbar/partials/` (presentacionales puros, sin `"use client"`).
- Creado el **hero** en `app/page.tsx` usando `app/assets/bg-main.jpg` como fondo (100% ancho, `600px` en escritorio, `auto` en móvil vía `md:h-[600px]`).
- Sección **Benefits** (`#benefits`) creada en `app/components/benefits/Benefits.tsx`:
  - 3 cajas (`benefit-item`) blancas con `rounded-2xl` y sombra que se superponen al hero con margen top negativo (`-mt-[81.5px]` = mitad de la altura de la caja: 163px / 2) y `relative z-10`. **Ojo:** si cambia el contenido de la caja (p-8, h-14, gap-4 o tamaño del título), hay que recalcular ese margen.
  - Cada caja tiene ícono (en círculo `bg-rosa-coral/15` con trazo `vinotinto`) + título en `verde-bosque` **sin negrilla** (peso normal). Grid `md:grid-cols-3`, apiladas en móvil, a **ancho completo de la columna** (sin `max-w-xs`) para que se vean menos cuadradas.
  - Textos mock iniciales (a petición del usuario): "Regalos únicos", "Envíos a todo el país", "Calidad garantizada".
  - Íconos mock en `app/components/benefits/partials/` (`GiftIcon`, `ShippingIcon`, `StarIcon`), presentacionales puros, siguiendo el patrón del navbar. Datos mock en un array `benefits` (título e ícono por ítem) listos para reemplazar con contenido real.
- Hero con **2 botones mock** (apply: vinotinto / field: borde blanco) con `cursor-pointer`.
- Sección **Promo** (`#promo`) creada en `app/components/promo/Promo.tsx`, debajo de Benefits: fila `md:grid-cols-2` (2 columnas al 50%), centrada con `mx-auto max-w-7xl`.
  - Izquierda: `h2` + párrafo mock navideños + 2 botones (principal `vinotinto`→hover `rosa-coral`; secundario borde/texto `vinotinto`). Textos mock en el objeto `promo`.
  - Derecha: **video mock** `<video controls poster preload="none" playsInline>` en contenedor `aspect-video rounded-3xl`; `poster` = `camino-de-mesa-rojo.jpeg` y `src` = video público CC0 de MDN (`mdn.github.io/shared-assets`), con insignia "Nuevo video". Reemplazar por el video real.
- Tipografías con `next/font/google` en `layout.tsx`: **Cinzel Decorative** (`font-display`) e **Inter** (`font-sans`); tema de fuentes en `globals.css`.
- Regla global en `globals.css` (`@layer base`): todos los H1-H6 usan Cinzel Decorative por defecto vía `var(--font-cinzel)` (no `var(--font-display)`, porque `@theme inline` no emite esa variable).
- Creado `app/data/products.json` con 4 productos mock (coronas, esferas, guirnalda, centro de mesa); `specs` varían por producto.
- Paleta corporativa y documentación base (`README.md`, `AGENT.md`, protocolo de memoria) definidas.

## 🚧 Próximos Pasos Pendientes

1. Reemplazar los textos mock del hero por contenido real.
2. Reemplazar los enlaces mock del navbar por rutas reales.
3. Definir la interfaz TypeScript para tipar los productos del catálogo.
4. Crear el componente reutilizable `ProductCard` en `app/components/cards/`.

## ⚠️ Notas Técnicas y Reglas Activas

- **Interlineado:** Mantener estricto el cálculo de `font-size + 7px`.
- **Clases de texto:** Usar utilidades de Tailwind (`text-xl`, etc.) en lugar de píxeles fijos.
- **Componentes:** Un archivo por componente, PascalCase, agrupados por dominio en `app/components/`.
