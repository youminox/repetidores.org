import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSearch from "@/components/HeroSearch";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-slate-950 text-white flex items-center py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="inline-block rounded-full bg-sky-400/20 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-sky-300">
            Error 404 — Guía no encontrada
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold">
            No encontramos la página que buscabas
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Utiliza nuestro buscador instantáneo para encontrar cualquiera de
            nuestras 809 guías sobre repetidores WiFi, redes Mesh y solución de
            fallos de conexión:
          </p>
          <div className="mt-8">
            <HeroSearch />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-xl bg-sky-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-sky-300 transition"
            >
              ← Volver al Inicio
            </Link>
            <Link
              href="/guias/"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition"
            >
              Ver Guías de Compra
            </Link>
            <Link
              href="/problemas-y-soluciones/"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition"
            >
              Ver Problemas y Soluciones
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
