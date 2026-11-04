"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface SearchItem {
  t: string; // title
  s: string; // slug
  c: string; // categorySlug
  n: string; // categoryName
  r: string; // readTime
}

const QUICK_SUGGESTIONS = [
  "Sin acceso a Internet",
  "Casas grandes",
  "Doble banda 5 GHz",
  "Orientar antenas",
  "Repetidor vs Mesh",
  "Puerto Ethernet",
  "TP-Link AC1200",
  "Configurar WPS",
];

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data: SearchItem[]) => {
        if (mounted) {
          setIndex(data);
          setIsLoaded(true);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const results =
    query.trim().length >= 2
      ? index
          .filter((item) => {
            const q = normalize(query.trim());
            const terms = q.split(/\s+/);
            const target = normalize(`${item.t} ${item.n} ${item.s}`);
            return terms.every((term) => target.includes(term));
          })
          .slice(0, 8)
      : [];

  return (
    <div ref={containerRef} className="relative mx-auto max-w-2xl text-left">
      <div className="relative flex items-center rounded-2xl bg-white p-2 shadow-2xl ring-2 ring-sky-400/50 focus-within:ring-sky-400">
        <div className="pl-3.5 pr-2 text-slate-400">
          <svg
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          type="search"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Busca entre 809 guías: 'sin internet', 'doble banda', 'paredes gruesas', 'antenas', 'WPS'..."
          className="w-full bg-transparent py-2.5 px-2 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
          aria-label="Buscar guías de repetidores WiFi"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mr-2 rounded-lg p-1.5 text-xs font-bold text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        )}
        <span className="hidden sm:inline-flex shrink-0 items-center rounded-xl bg-primary px-4 py-2.5 text-xs font-extrabold text-white">
          Buscar Guía
        </span>
      </div>

      {/* Quick Search Chips */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
        <span className="text-slate-400 font-semibold mr-1">
          Búsquedas frecuentes:
        </span>
        {QUICK_SUGGESTIONS.map((sug) => (
          <button
            key={sug}
            type="button"
            onClick={() => {
              setQuery(sug);
              setIsOpen(true);
            }}
            className="rounded-full bg-white/10 hover:bg-sky-400 hover:text-slate-950 px-2.5 py-1 text-[11px] font-bold text-sky-200 transition cursor-pointer"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Instant Dropdown Results */}
      {isOpen && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-[68px] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-2.5 flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold">
              {results.length > 0
                ? `Mostrando ${results.length} resultados para "${query}"`
                : isLoaded
                ? `No se encontraron guías para "${query}"`
                : "Cargando índice de 809 guías..."}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 font-bold"
            >
              Cerrar
            </button>
          </div>
          {results.length > 0 && (
            <ul className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {results.map((item) => (
                <li key={item.s}>
                  <Link
                    href={`/${item.c}/${item.s}/`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-start justify-between gap-3 px-4 py-3.5 hover:bg-sky-50/70 transition"
                  >
                    <div className="min-w-0">
                      <span className="inline-block rounded-md bg-sky-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-primary-dark mb-1">
                        {item.n}
                      </span>
                      <p className="text-sm font-bold text-slate-900 line-clamp-1">
                        {item.t}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-bold text-primary self-center">
                      ⏱️ {item.r} →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
