# 🛍️ Catálogo Visual de Productos

Un proyecto web básico y moderno desarrollado como catálogo visual para exhibir productos, detallando sus características principales (títulos, categorías, precios, dimensiones y materiales). Este proyecto está diseñado para afianzar conceptos clave de desarrollo web moderno e inteligencia artificial.

---

## 🚀 Tecnologías Principales

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Estilos:** Tailwind CSS _(opcional o recomendado)_
- **Almacenamiento de Datos (Opciones flexibles):**
  - Opción A: Archivo local (`.json`) para un desarrollo rápido y sin dependencias externas.
  - Opción B: [Firebase Firestore](https://firebase.google.com/) para persistencia de datos en la nube.

---

## ✨ Características del Proyecto

- **Vista de Catálogo:** Visualización limpia y organizada de todos los productos.
- **Navegación Responsiva:** Barra transparente superpuesta sobre el hero; enlaces en línea en tablet/escritorio y menú hamburguesa en móvil.
- **Sistema de Categorías:** Filtrado rápido para encontrar productos por tipo o categoría.
- **Ficha de Detalle:** Cada producto incluye:
  - Título y precio orientativo.
  - Descripción detallada.
  - Especificaciones físicas (tamaño, materiales, etc.).

---

## 📂 Estructura del Proyecto (Estimada)

```text
/
├── public/           # Archivos estáticos e imágenes
├── app/              # Rutas y páginas de Next.js (App Router)
│   ├── assets/       # Imágenes y recursos visuales
│   ├── components/   # Componentes reutilizables agrupados por dominio
│   │   ├── navbar/   # Barra de navegación (móvil: menú hamburguesa)
│   │   │   └── partials/  # Piezas internas del navbar (íconos)
│   │   ├── footer/   # Pie de página
│   │   ├── cards/    # Tarjetas de producto
│   │   └── modal/    # Ventanas modales (ficha de detalle)
│   ├── data/         # Datos locales (products.json, navigation.ts)
│   ├── globals.css   # Estilos globales (Tailwind)
│   ├── layout.tsx    # Layout raíz de la aplicación
│   └── page.tsx      # Página principal (catálogo)
├── package.json
└── README.md
```
