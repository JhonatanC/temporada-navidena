# MEMORY.md - Estado Actual del Proyecto

## 📌 Estado Actual (Fase Activa)

- **Fase en curso:** Tipado de datos y componentes del catálogo.
- **Objetivo inmediato:** Definir la interfaz TypeScript `Product` que refleje el JSON y comenzar con `ProductCard`.

## ✅ Hitos Recientes

- Creado `app/data/products.json` con 4 productos mock (corona, esferas, guirnalda, centro de mesa); sus `specs` varían por producto (keys distintas por objeto).
- Configuración inicial del Stack (Next.js App Router + Tailwind CSS v4).
- Creación y refinamiento de la documentación base (`README.md`, `AGENT.md` y protocolo de memoria).
- Definición de la paleta de colores corporativa y asignación tipográfica (**Cinzel Decorative** para títulos e **Inter** para párrafos).
- Corrección de estructura: el App Router vive en `app/` (raíz), no en `src/app/`; se eliminó `src/` y se renombró el mock a `products.json` (plural, al ser un listado).

## 🚧 Próximos Pasos Pendientes

1. Definir la interfaz TypeScript para tipar los productos del catálogo.
2. Crear el componente reutilizable `ProductCard` aplicando las clases de Tailwind y los colores corporativos.

## ⚠️ Notas Técnicas y Reglas Activas

- **Interlineado:** Mantener estricto el cálculo de `font-size + 7px`.
- **Clases de texto:** Usar utilidades de Tailwind (`text-xl`, etc.) en lugar de píxeles fijos.
