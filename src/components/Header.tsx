"use client";

import { useState } from "react";
import Link from "next/link";

const MAIN_NAV = [
  { label: "Guías de Compra", href: "/guias/" },
  { label: "Problemas y Soluciones", href: "/problemas-y-soluciones/" },
  { label: "Configuración", href: "/configuracion/" },
  { label: "Seguridad WiFi", href: "/seguridad/" },
  { label: "Reseñas", href: "/resenas/" },
];

const MORE_CATEGORIES = [
  { label: "Conceptos y Optimización WiFi", href: "/curiosidades/" },
  { label: "Usos por Espacio (Hogar/Oficina)", href: "/usos/" },
  { label: "Trucos de Instalación", href: "/trucos/" },
  { label: "Historia de Internet y Redes", href: "/historia/" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sky-400 shadow-xs transition group-hover:bg-primary group-hover:text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
              Repetidores<span className="text-primary">.org</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">
              Redes WiFi, Mesh & Cobertura
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-slate-700 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* Dropdown for Additional Categories */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-1 text-sm font-bold text-slate-700 hover:text-primary transition-colors py-2"
            >
              <span>Más Categorías</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                {MORE_CATEGORIES.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="block rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-primary transition"
                  >
                    {sub.label}
                  </Link>
                ))}
                <div className="my-1 border-t border-slate-100" />
                <Link
                  href="/hola-hablamos/"
                  className="block rounded-xl px-3.5 py-2 text-xs font-extrabold text-primary hover:bg-sky-50 transition"
                >
                  👤 Sobre Charlie Lingán →
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/#asesor-wifi"
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-extrabold text-white shadow-xs transition hover:bg-primary"
          >
            📡 Diagnóstico y Selector WiFi
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex lg:hidden items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-slate-100"
          aria-label="Abrir menú de navegación"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <p className="px-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Categorías Principales
          </p>
          {[...MAIN_NAV, ...MORE_CATEGORIES].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-bold text-slate-800 hover:bg-sky-50 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/hola-hablamos/"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-bold text-primary"
            >
              👤 Sobre Charlie Lingán / Contacto
            </Link>
            <Link
              href="/#asesor-wifi"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl bg-slate-900 px-4 py-2.5 text-center text-xs font-extrabold text-white"
            >
              📡 Ir al Diagnóstico y Selector WiFi
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
