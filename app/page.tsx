import BgHero from "./assets/bg-main.jpg";
import Navbar from "./components/navbar/Navbar";

// Datos mock del hero. Se reemplazarán por el contenido real más adelante.
const hero = {
  title: "Decora tu hogar esta Navidad",
  description:
    "Descubre nuestra colección de decoración navideña: coronas, esferas, guirnaldas y detalles para darle vida a cada rincón.",
  applyLabel: "Ver catálogo",
  fieldLabel: "Contáctanos",
};

export default function Home() {
  return (
    <div id="wrapper" className="relative">
      {/* Navbar transparente superpuesto sobre el hero */}
      <header className="absolute inset-x-0 top-0 z-20">
        <Navbar />
      </header>
      <main className="flex-1">
        {/* HERO: ancho completo. Alto de 600px en escritorio y automático en móvil. */}
        <section
          className="relative flex h-auto w-full items-center justify-center bg-cover bg-top md:h-[600px]"
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
              <button
                type="button"
                className="cursor-pointer rounded-full bg-vinotinto px-8 py-3 text-base leading-[23px] font-semibold text-white transition-colors hover:bg-rosa-coral"
              >
                {hero.applyLabel}
              </button>

              {/* Botón tipo "field" (acción secundaria) */}
              <button
                type="button"
                className="cursor-pointer rounded-full border-2 border-white/80 px-8 py-3 text-base leading-[23px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                {hero.fieldLabel}
              </button>
            </div>
          </div>
        </section>

        <div id="box-steps">
          <div className="step-item"></div>
          <div className="step-item"></div>
          <div className="step-item"></div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
