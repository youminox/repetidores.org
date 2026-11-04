import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSearch from "@/components/HeroSearch";
import WifiCoverageAdvisor from "@/components/WifiCoverageAdvisor";
import BlogExplorerClient from "@/components/BlogExplorerClient";
import AdBanner from "@/components/AdBanner";
import {
  getFeaturedBuyingGuides,
  getTroubleshootingGuides,
  getTopSeoPosts,
  getPostsByCategory,
  getAllCategories,
  getPostUrl,
  getImageUrl,
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
} from "@/lib/data";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Mejores Repetidores WiFi, Guías de Compra, Configuración y Solución de Fallos`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
};

const PILLAR_HUBS = [
  {
    slug: "guias",
    tag: "Comparativas & Compra",
    title: "Guías de Compra y Comparativas WiFi",
    desc: "Análisis de repetidores de doble banda, largo alcance, puerto Gigabit Ethernet, antenas externas y sistemas Mesh para casas grandes, oficinas y gaming.",
    badge: "498 guías",
    accent: "from-slate-900 to-sky-950",
  },
  {
    slug: "seguridad",
    tag: "Protección & Privacidad",
    title: "Seguridad y Control de Red Doméstica",
    desc: "Cómo evitar que extraños se conecten a tu red extendida, bloquear dispositivos intrusos, configurar filtros MAC, IP estática y cifrado WPA3.",
    badge: "91 guías",
    accent: "from-sky-950 to-slate-900",
  },
  {
    slug: "problemas-y-soluciones",
    tag: "Diagnóstico Técnico",
    title: "Problemas y Soluciones en Repetidores",
    desc: "Soluciones paso a paso cuando el repetidor dice 'conectado sin internet', se desconecta solo, no aparece en la red o reduce la velocidad.",
    badge: "76 guías",
    accent: "from-slate-950 to-slate-900",
  },
  {
    slug: "configuracion",
    tag: "Instalación & Ajustes",
    title: "Compatibilidad y Configuración Paso a Paso",
    desc: "Cómo vincular tu repetidor con el router principal mediante navegador web, botón WPS, banda de 5 GHz o en modo Punto de Acceso (AP).",
    badge: "59 guías",
    accent: "from-slate-900 to-indigo-950",
  },
  {
    slug: "curiosidades",
    tag: "Antenas & Cobertura",
    title: "Conceptos y Optimización de Señal WiFi",
    desc: "Cómo orientar correctamente las antenas del repetidor, diferencias entre bandas de 2.4 GHz y 5 GHz, y ubicación estratégica libre de interferencias.",
    badge: "30 guías",
    accent: "from-sky-950 to-slate-950",
  },
  {
    slug: "usos",
    tag: "Aplicaciones por Espacio",
    title: "Usos en Hogar, Oficinas, Gaming y Exteriores",
    desc: "Configuraciones recomendadas para casas de varios pisos, jardines, cafeterías, hoteles, aulas educativas, consolas de videojuegos y streaming 4K.",
    badge: "30 guías",
    accent: "from-slate-900 to-slate-800",
  },
];

const HOME_FAQS = [
  {
    q: "¿Dónde se debe colocar exactamente un repetidor WiFi para obtener la máxima cobertura?",
    a: "El repetidor WiFi debe colocarse a mitad de camino entre tu router principal y la zona sin cobertura (zona muerta), en un punto donde el repetidor todavía reciba al menos un 60%–70% de señal estable del router. Evita enchufarlo detrás de televisores, cerca de hornos microondas, espejos grandes o a ras del suelo.",
  },
  {
    q: "¿Qué diferencia hay entre un repetidor WiFi tradicional, un Punto de Acceso (AP) y una red Mesh?",
    a: "Un repetidor WiFi capta la señal inalámbrica existente y la vuelve a emitir, siendo la opción más económica y rápida de instalar. Un Punto de Acceso (AP) se conecta al router por cable Ethernet para ofrecer el 100% de la velocidad sin pérdida. Un sistema WiFi Mesh utiliza varios nodos inteligentes que crean una única red sin cortes (roaming transparente) ideal para casas de más de 150 m² o varios pisos.",
  },
  {
    q: "¿Cómo deben ir orientadas las antenas de un repetidor WiFi?",
    a: "En viviendas u oficinas de una sola planta, coloca las antenas en posición completamente vertical (90°) para que las ondas se propaguen horizontalmente. Si necesitas enviar señal desde el primer piso hacia el segundo piso, coloca una antena en vertical (90°) y la segunda inclinada a 45° u horizontal para cubrir ambos planos.",
  },
  {
    q: "¿Por qué mi repetidor aparece como 'Conectado pero sin acceso a Internet' y cómo lo soluciono?",
    a: "Este fallo suele ocurrir por un conflicto de asignación de direcciones IP (DHCP) con el router principal o porque el repetidor perdió enlace con el canal del router. Se soluciona reiniciando ambos equipos, acercando ligeramente el repetidor al router principal o asignando una puerta de enlace e IP estática dentro del panel de administración (192.168.0.254).",
  },
];

export default function HomePage() {
  const buyingGuides = getFeaturedBuyingGuides(6);
  const troubleshootingGuides = getTroubleshootingGuides(6);
  const topSeoPosts = getTopSeoPosts(9);
  const categories = getAllCategories();

  // Balanced set of posts across all 9 categories for the interactive explorer
  const explorerPosts = [
    ...buyingGuides,
    ...troubleshootingGuides,
    ...topSeoPosts,
    ...getPostsByCategory("guias").slice(0, 10),
    ...getPostsByCategory("seguridad").slice(0, 8),
    ...getPostsByCategory("problemas-y-soluciones").slice(0, 8),
    ...getPostsByCategory("configuracion").slice(0, 8),
    ...getPostsByCategory("curiosidades").slice(0, 6),
    ...getPostsByCategory("usos").slice(0, 6),
    ...getPostsByCategory("historia").slice(0, 5),
    ...getPostsByCategory("resenas").slice(0, 6),
    ...getPostsByCategory("trucos").slice(0, 5),
  ].filter(
    (post, index, self) => self.findIndex((p) => p.id === post.id) === index
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        {/* Hero Section with Instant Search */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#0b192c] to-slate-900 py-20 sm:py-24 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-400/15 border border-sky-400/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-300">
              📡 Enciclopedia Técnica de Redes Inalámbricas y Cobertura WiFi
            </span>
            <h1 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Domina los{" "}
              <span className="text-sky-400">Repetidores de WiFi</span>: Guías
              de Compra, Configuración y Solución de Fallos
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Explora más de <strong className="text-white">809 manuales</strong>{" "}
              verificados sobre extensores de doble banda (2.4 GHz y 5 GHz),
              redes Mesh, ubicación de antenas, seguridad doméstica y solución a
              cortes de señal en casa u oficina.
            </p>

            <div className="mt-9">
              <HeroSearch />
            </div>

            {/* Quick Category Pills */}
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              <Link
                href="/guias/"
                className="rounded-full bg-sky-400 px-4 py-2 text-xs font-extrabold text-slate-950 hover:bg-sky-300 transition shadow-md"
              >
                🏆 Guías de Compra (498)
              </Link>
              <Link
                href="/problemas-y-soluciones/"
                className="rounded-full bg-orange-500 px-4 py-2 text-xs font-extrabold text-white hover:bg-orange-400 transition shadow-md"
              >
                🛠️ Problemas y Soluciones (76)
              </Link>
              <Link
                href="/seguridad/"
                className="rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-bold text-white transition"
              >
                🛡️ Seguridad WiFi (91)
              </Link>
              <Link
                href="/configuracion/"
                className="rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-bold text-white transition"
              >
                ⚙️ Configuración Paso a Paso (59)
              </Link>
              <Link
                href="/curiosidades/"
                className="rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-bold text-white transition"
              >
                📡 Antenas y Optimización (30)
              </Link>
              <Link
                href="/usos/"
                className="rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-bold text-white transition"
              >
                🏠 Usos por Espacio (30)
              </Link>
              <Link
                href="/resenas/"
                className="rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-bold text-white transition"
              >
                🔬 Reseñas de Modelos (6)
              </Link>
              <Link
                href="/trucos/"
                className="rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-bold text-white transition"
              >
                ⚡ Trucos de Instalación (5)
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive WiFi Coverage Advisor & Troubleshooter Section */}
        <section className="py-14 bg-light-bg border-b border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <WifiCoverageAdvisor />
          </div>
        </section>

        {/* AdSense Banner #1 */}
        <div className="mx-auto max-w-5xl px-4 py-6">
          <AdBanner />
        </div>

        {/* Section 1: Featured Buying Guides & Repeater Reviews */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                  Comparativas de Equipos Doble Banda, WiFi 6 y Sistemas Mesh
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Guías Esenciales para Elegir y Comparar tu Repetidor WiFi
                </h2>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/guias/"
                  className="text-sm font-bold text-primary hover:underline"
                >
                  Ver 498 Guías de Compra →
                </Link>
                <span className="text-slate-300">|</span>
                <Link
                  href="/resenas/"
                  className="text-sm font-bold text-primary hover:underline"
                >
                  Ver Reseñas a Fondo →
                </Link>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {buyingGuides.map((post) => (
                <Link
                  key={post.id}
                  href={getPostUrl(post)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-slate-100 relative">
                    <img
                      src={getImageUrl(post.featuredImageUrl)}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-bold text-sky-300">
                      {post.categoryName}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
                      <span>⏱️ {post.readTime} de lectura</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-semibold">
                        ✓ Análisis Verificado
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                      Leer análisis completo →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Major Pillar Hubs (Unlocking the 729 formerly orphaned articles!) */}
        <section className="py-16 bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-sky-400">
                Arquitectura Técnica Completa (809 Artículos)
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold">
                Explora Nuestros Manuales por Especialidad
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base">
                Accede directamente a nuestras bibliotecas especializadas en
                comparativas de compra, seguridad inalámbrica, solución de
                errores de conexión, configuración paso a paso y optimización de
                antenas.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PILLAR_HUBS.map((card) => {
                const samplePosts = getPostsByCategory(card.slug).slice(0, 3);
                return (
                  <div
                    key={card.slug}
                    className={`rounded-2xl border border-slate-800 bg-gradient-to-br ${card.accent} p-6 flex flex-col justify-between transition hover:border-sky-500/60`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-sky-400/15 px-3 py-1 text-xs font-extrabold text-sky-300">
                          {card.tag}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {card.badge}
                        </span>
                      </div>
                      <Link href={`/${card.slug}/`}>
                        <h3 className="mt-4 text-xl font-extrabold text-white hover:text-sky-300 transition-colors">
                          {card.title}
                        </h3>
                      </Link>
                      <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {card.desc}
                      </p>

                      <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-slate-300">
                        {samplePosts.map((sp) => (
                          <li key={sp.id}>
                            <Link
                              href={getPostUrl(sp)}
                              className="hover:text-sky-300 transition-colors line-clamp-1 flex items-center gap-1.5"
                            >
                              <span className="text-sky-400 font-bold">›</span>
                              <span>{sp.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/${card.slug}/`}
                      className="mt-6 inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-sky-400 hover:text-slate-950 px-4 py-2.5 text-xs font-extrabold text-white transition"
                    >
                      Explorar {card.badge} →
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Troubleshooting & SEO Power Guides */}
        <section className="py-16 bg-light-bg border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                🔥 Soluciones Técnicas Más Consultadas en Habla Hispana
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                Soluciona el Error &ldquo;Sin Acceso a Internet&rdquo;, Orientación de
                Antenas y Caídas de Velocidad
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Nuestros manuales de diagnóstico más leídos para eliminar zonas
                muertas y conseguir cobertura estable en cada habitación.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {topSeoPosts.map((post) => (
                <Link
                  key={post.id}
                  href={getPostUrl(post)}
                  className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs transition hover:border-primary hover:shadow-md"
                >
                  <img
                    src={getImageUrl(post.featuredImageUrl)}
                    alt={post.title}
                    className="h-22 w-24 shrink-0 rounded-xl object-cover bg-slate-100"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase text-primary">
                        {post.categoryName}
                      </span>
                      <h3 className="mt-0.5 text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      ⏱️ {post.readTime} · Leer solución →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* AdSense Banner #2 */}
        <div className="mx-auto max-w-5xl px-4 py-6">
          <AdBanner />
        </div>

        {/* Section 4: Interactive Article Explorer */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                Biblioteca Interactiva (809 Artículos)
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                Filtra Nuestras Guías por Categoría
              </h2>
            </div>

            <BlogExplorerClient
              initialPosts={explorerPosts}
              categories={categories}
            />
          </div>
        </section>

        {/* Section 5: Charlie Lingán Author & E-E-A-T Section */}
        <section className="py-16 bg-light-bg border-t border-slate-200">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8">
              <img
                src="/images/charlie-lingan.jpg"
                alt="Charlie Lingán — Fundador de Repetidores.org"
                className="h-32 w-32 sm:h-36 sm:w-36 rounded-2xl object-cover shadow-md shrink-0 border-2 border-primary"
                loading="lazy"
              />
              <div className="space-y-3 text-center md:text-left">
                <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-extrabold text-primary-dark">
                  Dirección Editorial y Experiencia Empresarial
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  ¡Hola! Soy Charlie Lingán, apasionado por la tecnología y el
                  ecommerce
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  En <strong>Repetidores.org</strong> reunimos guías técnicas
                  verificadas, comparativas honestas de repetidores WiFi,
                  extensores de doble banda y sistemas Mesh, así como manuales de
                  seguridad y diagnóstico para ayudarte a lograr una conexión
                  rápida y estable en todo tu hogar o empresa.
                </p>
                <div className="pt-2">
                  <Link
                    href="/hola-hablamos/"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-sky-300 hover:bg-primary hover:text-white transition"
                  >
                    Conoce mi trayectoria y contáctame →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Home FAQ Section */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                Preguntas Frecuentes
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                Dudas Comunes sobre Repetidores WiFi, Antenas y Redes Mesh
              </h2>
            </div>

            <div className="space-y-4">
              {HOME_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-light-bg/60 p-6"
                >
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
