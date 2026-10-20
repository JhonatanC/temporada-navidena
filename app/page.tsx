import { Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import BgHero from "./assets/bg-main.webp";
import Navbar from "./components/navbar/Navbar";
import Benefits from "./components/benefits/Benefits";
import Promo from "./components/promo/Promo";
import Cta from "./components/cta/Cta";
import GiftFinderButton from "./components/gift-finder/GiftFinderButton";
import GiftIcon from "./components/hero/partials/GiftIcon";
import Footer from "./components/footer/Footer";

// Catálogo en un chunk aparte: es la sección más pesada (30 productos +
// buscador + filtros + paginación + modal) y vive bajo el pliegue. Diferir su
// JS deja más ancho de banda al inicio para el LCP (la imagen del hero).
// El prerender sigue incluyendo el HTML (SEO intacto); solo se separa el JS.
const Catalog = dynamic(() => import("./components/catalog/Catalog"));

// Datos mock del hero. Se reemplazarán por el contenido real más adelante.
const hero = {
  title: "Decora tu hogar esta Navidad",
  description:
    "Descubre nuestra colección de decoración navideña: coronas, esferas, guirnaldas y detalles para darle vida a cada rincón.",
  applyLabel: "Ver catálogo",
  fieldLabel: "Encuentra tu regalo",
};

export default function Home() {
  return (
    <div id="wrapper" className="relative">
      {/* Navbar fijo: gestiona su propia posición, fondo y visibilidad */}
      <header>
        <Navbar />
      </header>
      <main className="flex-1">
        {/* HERO: ancho completo. Alto de 600px en escritorio y automático en móvil.
            El id="inicio" permite que el enlace "Inicio" del navbar llegue aquí
            (junto con los beneficios, que se superponen justo debajo).
            `scroll-mt-20` compensa la altura del navbar fijo al navegar por anclas. */}
        <section
          id="inicio"
          className="relative flex h-auto w-full scroll-mt-20 items-center justify-center md:h-[600px]"
        >
          {/* Imagen de fondo del hero: es la imagen más grande de la primera
              pantalla (LCP), por eso se precarga con `preload` en vez de usar
              la carga perezosa que next/image aplica por defecto, y se marca
              con `fetchPriority="high"` para que el navegador la priorice. */}
          <Image
            src={BgHero}
            alt=""
            fill
            preload
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-top"
          />

          {/* Capa oscura para dar contraste al texto sobre la imagen */}
          <div
            className="absolute inset-0 bg-verde-bosque/60"
            aria-hidden="true"
          />

          {/* Contenido del hero */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-6 pt-28 pb-16 text-center md:py-0">
            <h1 className="font-display text-4xl leading-[43px] text-white drop-shadow-md md:text-5xl md:leading-[55px]">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-base leading-[23px] text-fondo/90 md:text-lg md:leading-[25px]">
              {hero.description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Botón tipo "apply" (acción principal). Es un ancla nativa a
                  #catalog: el scroll suave lo maneja CSS (globals.css) respetando
                  prefers-reduced-motion, y `scroll-mt-20` en la sección compensa
                  el navbar fijo. Así la home puede ser Server Component. */}
              <a
                href="#catalog"
                className="cursor-pointer rounded-full bg-vinotinto px-8 py-3 text-base leading-[23px] font-semibold text-white transition-colors hover:bg-rosa-coral"
              >
                {hero.applyLabel}
              </a>

              {/* Botón tipo "field" (acción secundaria) con ícono de regalo.
                  Abre el pop-up "Cómo es tu Navidad" con el filtro por taxonomía. */}
              <GiftFinderButton
                label={hero.fieldLabel}
                icon={<GiftIcon />}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white/80 px-8 py-3 text-base leading-[23px] font-semibold text-white transition-colors hover:bg-white/10"
              />
            </div>
          </div>
        </section>

        {/* Cajas de beneficios: se superponen al hero con margen top negativo */}
        <Benefits />

        {/* Sección promocional: fila texto + imagen */}
        <Promo />

        {/* Catálogo: "Detalles que enamoran" con tarjetas de producto y modal.
            Cargado en chunk aparte (ver import dynamic más arriba). */}
        <Suspense fallback={null}>
          <Catalog />
        </Suspense>

        {/* Sección CTA a ancho completo: texto + estrella y botón */}
        <Cta />
      </main>
      {/* Pie de página: ancho completo, alto fijo y año dinámico */}
      <Footer />
    </div>
  );
}
