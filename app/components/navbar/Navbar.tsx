"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/app/data/navigation";
import MenuIcon from "./partials/MenuIcon";
import CloseIcon from "./partials/CloseIcon";

/**
 * Barra de navegación principal.
 * - Transparente, pensada para superponerse sobre el hero.
 * - En tablet y escritorio muestra los enlaces en línea.
 * - En móvil muestra un menú tipo hamburguesa.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav aria-label="Navegación principal" className="relative w-full">
      {/* Overlay: capa oscura que resalta el menú sobre el contenido (solo móvil).
          Se desvanece con transition; al tocarlo, se cierra el menú. */}
      <div
        className={`fixed inset-0 z-10 bg-black/40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Marca / logo */}
        <Link
          href="/"
          className="font-display text-xl leading-[27px] text-white transition-colors hover:text-rosa-coral"
        >
          Navidad
        </Link>

        {/* Enlaces en línea: visible desde tablet */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-base leading-[23px] text-white/90 transition-colors hover:text-rosa-coral"
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
          className="text-white transition-colors hover:text-rosa-coral md:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Menú lateral móvil: alto completo y ~70% del ancho, fondo blanco sobre el overlay.
          Anclado a la izquierda: se desliza de izquierda a derecha animando `left`.
          Cerrado queda fuera de pantalla (-70%) y oculto para foco/lectores (inert). */}
      <div
        id="mobile-menu"
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={`fixed top-0 z-20 flex h-dvh w-[70%] flex-col gap-6 bg-white px-6 py-6 transition-[left] duration-300 ease-in-out md:hidden ${
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
                  onClick={() => setIsOpen(false)}
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

