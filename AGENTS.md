# AGENT.md - Instrucciones para el Asistente de IA

## 🛠️ Stack Tecnológico del Proyecto

- **Framework:** Next.js (App Router, utilizando la estructura dentro de `app/`).
- **Estilos:** Tailwind CSS (v4).
- **Gestión de Datos:** Inicialmente archivo local (`app/data/products.json`), con opción futura de integrar Firebase Firestore.

---

## 🗂️ Estructura de Componentes

Los componentes reutilizables viven en `app/components/`, agrupados por dominio:

- `navbar/` → barra de navegación del sitio (antes llamada `header/`). Es un **Client Component** (`"use client"`) por el menú hamburguesa.
- `footer/` → pie de página.
- `cards/` → tarjetas de producto (`ProductCard`).
- `modal/` → ventanas modales (ficha de detalle).

Convención: un archivo por componente y el nombre en PascalCase (ej. `Navbar.tsx`).
Cada dominio puede tener una subcarpeta `partials/` para piezas pequeñas y desacopladas (ej. los íconos en `navbar/partials/`). Los componentes presentacionales puros (sin hooks ni eventos) no necesitan `"use client"`, aunque los importe un Client Component.

---

## 🎯 Reglas de Desarrollo

1. **Componentes:** Prioriza componentes funcionales limpios. Utiliza Server Components por defecto en Next.js, y marca con `"use client"` únicamente los componentes que manejen interactividad (filtros, barras de búsqueda, estados de botones, etc.).
2. **Estructura de Datos:** Cada producto en el catálogo debe seguir una interfaz clara y consistente:
   - `id`: string o number
   - `title`: string
   - `category`: string
   - `price`: number
   - `description`: string
3. **Simplicity First:** Al ser un proyecto de aprendizaje y portafolio, mantén el código legible, bien comentado y sin abstracciones innecesarias.

---

## 🎨 Guía de Estilos, Tipografía y Diseño (UI)

- **Tipografía para Títulos (H1 al H6):**
  - Utilizar **Cinzel Decorative** (de Google Fonts) para aportar un estilo elegante, sofisticado y festivo acorde al enfoque de temporada navideña.
- **Tipografía para Párrafos y Textos Generales:**
  - Utilizar **Inter** para garantizar una legibilidad limpia y moderna en descripciones, precios y especificaciones.
- **Jerarquía de Títulos y Textos:**
  - Utiliza las clases utilitarias predeterminadas de Tailwind (ej. `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, etc.) según la jerarquía visual requerida, evitando definir tamaños fijos en píxeles.
- **Regla estricta de Interlineado (`line-height`):**
  - Independientemente de la clase de tamaño utilizada, el interlineado debe cumplir estrictamente con la regla matemática de **sumar 7px al tamaño equivalente de la fuente** (ej: si usas una fuente de 12px, su `line-height` debe configurarse en 19px).
- **Paleta de Colores Personalizada (Estricta):**
  No utilices colores genéricos por defecto de Tailwind; aplica siempre esta paleta corporativa/de diseño:
  - **Color primario / Acentos fuertes:** Vinotinto (`#73020C`)
  - **Color secundario / Destacados suaves:** Rosa / Coral (`#D95560`)
  - **Color de contraste / Textos oscuros o acentos principales:** Verde Bosque (`#182602`)
  - **Color complementario / Elementos secundarios:** Verde Oliva (`#2D4003`)
  - **Color de fondo general:** Gris muy claro (`#F2F2F2`)

---

## 🧠 Memoria y Contexto del Proyecto

- Al empezar, lee `MEMORY.md` para conocer el estado del proyecto y las decisiones tomadas[cite: 1].
- Al terminar una tarea, actualízalo: estado actual, decisiones importantes (con su porqué) y errores a evitar[cite: 1].
- Mantenlo breve (máximo ~50 líneas): resume o elimina lo que ya no aporte[cite: 1].
- Si algo se convierte en una regla permanente, propón moverlo a `AGENT.md` en lugar de dejarlo en la memoria[cite: 1].
- No guardes nunca datos sensibles (claves, tokens, datos personales)[cite: 1].

## 🛑 Límites y Restricciones

- ✅ **Siempre:** actualizar `MEMORY.md` al terminar cada tarea[cite: 1].

---

## 🚀 Comandos Frecuentes

- Iniciar entorno de desarrollo: `npm run dev`
- Compilar proyecto para producción: `npm run build`
- Ejecutar linter / revisión de código: `npm run lint`
