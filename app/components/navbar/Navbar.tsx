"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { navLinks } from "@/app/data/navigation";
import MenuIcon from "./partials/MenuIcon";
import CloseIcon from "./partials/CloseIcon";

/** Altura aproximada de la barra: al superarla, el fondo pasa de transparente a sólido. */
const NAVBAR_HEIGHT = 64;

/**
 * Barra de navegación principal, fija en la parte superior.
 * - Transparente mientras se ve el hero; pasa a fondo sólido al dejar el hero atrás.
 * - Se oculta al hacer scroll hacia abajo y reaparece al hacer scroll hacia arriba.
 * - En tablet y escritorio muestra los enlaces en línea; en móvil, menú hamburguesa.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // Fondo sólido una vez se supera el hero (transparente mientras se ve el hero).
  const [isSolid, setIsSolid] = useState(false);
  // Se oculta al bajar y se muestra al subir.
  const [isVisible, setIsVisible] = useState(true);

  // Detecta el scroll para (1) cambiar el fondo al salir del hero y
  // (2) ocultar la barra al bajar, mostrarla al subir (en la parte superior
  // siempre permanece visible).
  useEffect(() => {
    let prevY = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      const heroBottom = document
        .getElementById("inicio")
        ?.getBoundingClientRect().bottom;

      // Fondo sólido cuando el hero ya no cubre la barra (fallback si no hay hero).
      setIsSolid(
        heroBottom !== undefined ? heroBottom <= NAVBAR_HEIGHT : y > 80,
      );

      // Scroll down → ocultar; scroll up → mostrar; en la parte superior, visible.
      if (y <= 8) {
        setIsVisible(true);
      } else if (y > prevY) {
        setIsVisible(false);
      } else if (y < prevY) {
        setIsVisible(true);
      }
      prevY = y;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Con el menú móvil abierto la barra permanece visible para poder cerrarlo.
  const showBar = isVisible || isOpen;

  /**
   * Intercepta los enlaces internos (`#seccion`) y hace scroll suave hasta la
   * sección destino en lugar del salto inmediato del ancla.
   * - Respeta `prefers-reduced-motion`: sin animación si el usuario la desactiva.
   * - Al navegar desde el menú móvil, lo cierra para liberar la pantalla.
   * Los enlaces externos o de ruta se dejan pasar sin cambios.
   */
  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    setIsOpen(false);
  };

  return (
    <nav aria-label="Navegación principal">
      {/* Barra fija: se traslada hacia arriba para ocultarse y cambia a fondo
          sólido al dejar el hero atrás. El `transform` vive en esta capa, por
          fuera del menú móvil, para no romper su posicionamiento `fixed`. */}
      <div
        className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ease-in-out ${
          showBar ? "translate-y-0" : "-translate-y-full"
        } ${isSolid ? "bg-white shadow-md" : "bg-transparent"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Marca / logo */}
          <Link
            href="/"
            className={`font-display text-xl leading-[27px] transition-colors hover:text-rosa-coral ${
              isSolid ? "text-verde-bosque" : "text-white"
            }`}
          >
            Temporada Navideña
          </Link>

          {/* Enlaces en línea: visible desde tablet */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className={`text-base leading-[23px] transition-colors hover:text-rosa-coral ${
                    isSolid ? "text-verde-bosque" : "text-white/90"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Botón hamburguesa: solo móvil */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`transition-colors hover:text-rosa-coral md:hidden ${
              isSolid ? "text-verde-bosque" : "text-white"
            }`}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Overlay: capa oscura que resalta el menú sobre el contenido (solo móvil).
          Se desvanece con transition; al tocarlo, se cierra el menú. */}
      <div
        className={`fixed inset-0 z-20 bg-black/40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Menú lateral móvil: alto completo y ~70% del ancho, fondo blanco sobre el overlay.
          Anclado a la izquierda: se desliza de izquierda a derecha animando `left`.
          Cerrado queda fuera de pantalla (-70%) y oculto para foco/lectores (inert). */}
      <div
        id="mobile-menu"
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={`fixed top-0 z-30 flex h-dvh w-[70%] flex-col gap-6 bg-white px-6 py-6 transition-[left] duration-300 ease-in-out md:hidden ${
          isOpen ? "left-0" : "-left-[70%]"
        }`}
      >
        {/* Enlaces de navegación: separados por borde inferior, salvo el último */}
        <ul className="flex flex-col">
          {navLinks.map((link, index) => {
            const isLast = index === navLinks.length - 1;

            return (
              <li
                key={link.href}
                className={isLast ? "" : "border-b border-verde-bosque/20"}
              >
                <Link
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="block py-3 text-base leading-[23px] text-verde-bosque transition-colors hover:text-rosa-coral"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
