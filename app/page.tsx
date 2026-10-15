"use client";

import BgHero from "./assets/bg-main.jpg";
import Navbar from "./components/navbar/Navbar";
import Benefits from "./components/benefits/Benefits";
import Promo from "./components/promo/Promo";
import Catalog from "./components/catalog/Catalog";
import Cta from "./components/cta/Cta";
import GiftFinderButton from "./components/gift-finder/GiftFinderButton";
import GiftIcon from "./components/hero/partials/GiftIcon";
import Footer from "./components/footer/Footer";

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
          className="relative flex h-auto w-full scroll-mt-20 items-center justify-center bg-cover bg-top md:h-[600px]"
          style={{ backgroundImage: `url(${BgHero.src})` }}
        >
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
              {/* Botón tipo "apply" (acción principal) */}
              <a
                href="#catalog"
                onClick={(event) => {
                  const target = document.getElementById("catalog");
                  if (target) {
                    event.preventDefault();
                    const prefersReducedMotion = window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches;
                    target.scrollIntoView({
                      behavior: prefersReducedMotion ? "auto" : "smooth",
                      block: "start",
                    });
                  }
                }}
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

        {/* Catálogo: "Detalles que enamoran" con tarjetas de producto y modal */}
        <Catalog />

        {/* Sección CTA a ancho completo: texto + estrella y botón */}
        <Cta />
      </main>
      {/* Pie de página: ancho completo, alto fijo y año dinámico */}
      <Footer />
    </div>
  );
}
