import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPageBySlug, SITE_NAME, SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "¡Hola! ¿Hablamos? Charlie Lingán — Fundador y Editor",
  description:
    "Conoce a Charlie Lingán (Carlos Lingán), experto en ecommerce, auditoría financiera y transformación digital, fundador de Repetidores.org.",
  alternates: { canonical: `${SITE_URL}/hola-hablamos/` },
};

export default function HolaHablamosPage() {
  const page = getPageBySlug("hola-hablamos");

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Charlie Lingán",
      alternateName: "Carlos Lingán",
      url: `${SITE_URL}/hola-hablamos/`,
      image: `${SITE_URL}/images/charlie-lingan.jpg`,
      jobTitle: "Experto en Ecommerce y Transformación Digital",
      sameAs: ["https://charlielingan.com/", "https://carloslingan.pe/"],
    },
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <main className="min-h-screen bg-white pt-10 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Sobre Charlie Lingán / Contacto" },
            ]}
          />

          <div className="mt-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-[#0b192c] to-slate-900 p-8 sm:p-10 text-white shadow-lg flex flex-col sm:flex-row items-center gap-8">
            <img
              src="/images/charlie-lingan.jpg"
              alt="Charlie Lingán"
              className="h-32 w-32 sm:h-40 sm:w-40 rounded-2xl object-cover border-2 border-sky-400 shadow-md shrink-0"
            />
            <div>
              <span className="inline-block rounded-full bg-sky-400/20 px-3 py-1 text-xs font-extrabold text-sky-300">
                Dirección Editorial & Fundador de {SITE_NAME}
              </span>
              <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold leading-tight">
                ¡Hola! ¿Hablamos? Soy Charlie Lingán
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                Experto en ecommerce, auditoría financiera y transformación
                digital en Lima, Perú. Fundador de{" "}
                <strong>repetidores.org</strong>.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://charlielingan.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-sky-400 px-4 py-2 text-xs font-extrabold text-slate-950 hover:bg-sky-300 transition"
                >
                  Visitar charlielingan.com →
                </a>
                <Link
                  href="/guias/"
                  className="rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition"
                >
                  Explorar Guías de Repetidores
                </Link>
              </div>
            </div>
          </div>

          {page && (
            <div
              className="article-content mt-10 max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
