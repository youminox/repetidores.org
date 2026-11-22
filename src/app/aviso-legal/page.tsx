import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPageBySlug, SITE_NAME, SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: `Aviso Legal y condiciones de uso de ${SITE_NAME} (repetidores.org).`,
  alternates: { canonical: `${SITE_URL}/aviso-legal/` },
};

export default function AvisoLegalPage() {
  const page = getPageBySlug("aviso-legal");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-10 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Aviso Legal" },
            ]}
          />
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Aviso Legal
          </h1>
          {page && (
            <div
              className="article-content mt-8 max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          )}

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">
              Participación en el Programa de Afiliados de Amazon
            </h2>
            <p>
              <strong>{SITE_NAME}</strong> (<code>repetidores.org</code>) participa en el Programa de Afiliados de Amazon EU (ID de seguimiento oficial: <code>repetidores-21</code>) y en el Programa de Afiliados de Amazon.com Services LLC (ID de seguimiento oficial: <code>repetidores-20</code>), programas de publicidad para afiliados diseñados para ofrecer a sitios web un modo de obtener comisiones por publicidad, publicitando e incluyendo enlaces a <code>Amazon.es</code> y <code>Amazon.com</code>. En calidad de Afiliado de Amazon, obtenemos ingresos por las compras adscritas que cumplen los requisitos aplicables, sin que ello suponga ningún sobrecoste para el usuario.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
