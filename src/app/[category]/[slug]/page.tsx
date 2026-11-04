import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdBanner from "@/components/AdBanner";
import {
  getAllPosts,
  getPostBySlug,
  getCategoryBySlug,
  getRelatedPosts,
  getContextualRelatedPosts,
  getFeaturedBuyingGuides,
  getTroubleshootingGuides,
  getTopSeoPosts,
  getPostUrl,
  getImageUrl,
  generateExcerpt,
  SITE_NAME,
  SITE_URL,
} from "@/lib/data";

type Params = Promise<{ category: string; slug: string }>;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: `Artículo no encontrado | ${SITE_NAME}` };
  }

  const description = post.excerpt || generateExcerpt(post.content, 158);
  const absoluteImageUrl = `${SITE_URL}${getImageUrl(post.featuredImageUrl)}`;
  const canonicalUrl = `${SITE_URL}/${post.category}/${post.slug}/`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      type: "article",
      locale: "es_ES",
      siteName: SITE_NAME,
      authors: ["Charlie Lingán"],
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [absoluteImageUrl],
    },
  };
}

interface TocItem {
  id: string;
  text: string;
}

function addHeadingIdsAndExtractToc(html: string): {
  enhancedHtml: string;
  toc: TocItem[];
} {
  const toc: TocItem[] = [];
  let index = 0;

  const enhancedHtml = html.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (fullMatch, attrs, inner) => {
      const plainText = inner
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (!plainText) return fullMatch;
      index += 1;
      const id = `seccion-${index}`;
      toc.push({ id, text: plainText });
      if (/id=/i.test(attrs)) {
        return fullMatch;
      }
      return `<h2 id="${id}"${attrs}>${inner}</h2>`;
    }
  );

  return { enhancedHtml, toc };
}

function splitContentAtThirdH2(htmlContent: string): [string, string | null] {
  const h2Matches = [...htmlContent.matchAll(/<h2[^>]*>/gi)];
  if (h2Matches.length < 3) {
    return [htmlContent, null];
  }
  const splitIndex = h2Matches[2].index;
  if (splitIndex === undefined || splitIndex <= 0) {
    return [htmlContent, null];
  }
  return [htmlContent.slice(0, splitIndex), htmlContent.slice(splitIndex)];
}

function extractFaqPairs(
  htmlContent: string
): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const regex =
    /<h[23][^>]*>\s*(?:<[^>]+>)*\s*(¿[^<]+\?)\s*(?:<\/[^>]+>)*\s*<\/h[23]>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(htmlContent)) !== null && faqs.length < 6) {
    const question = match[1]
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const answer = match[2]
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (question.length > 10 && answer.length > 20) {
      faqs.push({ question, answer });
    }
  }
  return faqs;
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { category: categorySlug, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    const validCat = getCategoryBySlug(categorySlug);
    if (validCat) {
      permanentRedirect(`/${categorySlug}/`);
    }
    notFound();
  }

  if (categorySlug !== post.category) {
    permanentRedirect(`/${post.category}/${post.slug}/`);
  }

  const category = getCategoryBySlug(post.category);
  const relatedPosts = getRelatedPosts(post, 4);
  const contextualPosts = getContextualRelatedPosts(post, 3);
  const buyingGuides = getFeaturedBuyingGuides(5).filter(
    (p) => p.id !== post.id
  );
  const troubleshootingGuides = getTroubleshootingGuides(5).filter(
    (p) => p.id !== post.id
  );
  const topSeoPosts = getTopSeoPosts(10).filter((p) => p.id !== post.id);

  const isBuyingOrReviewArticle =
    post.category === "guias" ||
    post.category === "resenas" ||
    post.category === "usos";

  const { enhancedHtml, toc } = addHeadingIdsAndExtractToc(post.content);
  const [firstHalfContent, secondHalfContent] =
    splitContentAtThirdH2(enhancedHtml);
  const faqPairs = extractFaqPairs(post.content);

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: category?.name || post.categoryName, href: `/${post.category}/` },
    { label: post.title },
  ];

  const absoluteImageUrl = `${SITE_URL}${getImageUrl(post.featuredImageUrl)}`;
  const canonicalUrl = `${SITE_URL}/${post.category}/${post.slug}/`;
  const freshIsoDate = new Date().toISOString().split("T")[0];

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || generateExcerpt(post.content, 160),
    image: absoluteImageUrl,
    datePublished: post.date.split(" ")[0] || freshIsoDate,
    dateModified: freshIsoDate,
    inLanguage: "es",
    author: {
      "@type": "Person",
      name: "Charlie Lingán",
      url: `${SITE_URL}/hola-hablamos/`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  const faqSchema =
    faqPairs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqPairs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      {/* Dinamica.pe Article Page Layout adapted for Repetidores.org */}
      <main className="min-h-screen bg-white pt-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-12">
            {/* Main Article Column */}
            <article className="min-w-0 flex-1 lg:max-w-3xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <Link
                  href={`/${post.category}/`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-primary"
                >
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
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                  Volver a {category?.name || post.categoryName}
                </Link>
              </div>

              <Breadcrumbs items={breadcrumbItems} />

              {/* Category Pill & Verification Meta */}
              <div className="mt-4 mb-5 flex flex-wrap items-center gap-3">
                <Link
                  href={`/${post.category}/`}
                  className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary hover:bg-primary hover:text-white transition"
                >
                  {category?.name || post.categoryName}
                </Link>
                <span className="text-sm font-medium text-slate-500">
                  ⏱️ {post.readTime} de lectura
                </span>
                <span className="text-sm text-slate-300">·</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  ✓ Guía Técnica Verificada
                </span>
              </div>

              {/* H1 Title */}
              <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                {post.title}
              </h1>

              {/* Featured Image — Dinamica.pe rounded-2xl shadow-md */}
              {post.featuredImageUrl && (
                <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 shadow-md">
                  <img
                    src={getImageUrl(post.featuredImageUrl)}
                    alt={post.title}
                    className="w-full max-h-[430px] object-cover"
                  />
                </div>
              )}

              {/* Above-the-fold AdSense Banner */}
              <AdBanner className="my-8" />

              {/* Automatic Table of Contents (TOC) & AI Overview Summary */}
              {toc.length >= 2 && (
                <nav
                  aria-label="Tabla de contenidos"
                  className="my-8 rounded-2xl border border-slate-200 bg-light-bg/80 p-6"
                >
                  <p className="text-sm font-extrabold uppercase tracking-wider text-primary-dark mb-3 flex items-center gap-2">
                    <span>📡</span> Puntos clave y contenido de esta guía
                  </p>
                  <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {toc.map((item, idx) => (
                      <li key={item.id} className="truncate">
                        <a
                          href={`#${item.id}`}
                          className="text-slate-700 hover:text-primary font-medium transition-colors"
                        >
                          <span className="font-bold text-primary mr-1.5">
                            {idx + 1}.
                          </span>
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {/* Content Part 1 */}
              <div
                className="article-content mt-8 max-w-none"
                dangerouslySetInnerHTML={{ __html: firstHalfContent }}
              />

              {/* Contextual Internal Links Box + In-Article AdSense */}
              {secondHalfContent && (
                <>
                  {contextualPosts.length > 0 && (
                    <aside className="my-10 rounded-2xl border-l-4 border-primary bg-sky-50/70 p-6 shadow-xs">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-primary-dark mb-3">
                        📡 También te puede interesar en{" "}
                        {category?.name || post.categoryName}
                      </p>
                      <ul className="space-y-2.5">
                        {contextualPosts.map((cp) => (
                          <li key={cp.id}>
                            <Link
                              href={getPostUrl(cp)}
                              className="text-sm sm:text-base font-bold text-slate-900 hover:text-primary transition-colors flex items-start gap-2"
                            >
                              <span className="text-primary font-extrabold">
                                →
                              </span>
                              <span>{cp.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </aside>
                  )}

                  <AdBanner className="my-8" />

                  <div
                    className="article-content max-w-none"
                    dangerouslySetInnerHTML={{ __html: secondHalfContent }}
                  />
                </>
              )}

              {/* Internal WiFi Repeater Comparison Hub (Replaces former broken Amazon clusters) */}
              {isBuyingOrReviewArticle && (
                <section className="my-12 rounded-2xl border border-slate-200 bg-light-bg p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                        🏆 Comparativas y Reseñas de Conectividad
                      </span>
                      <h2 className="text-xl font-extrabold text-slate-900">
                        Guías Recomendadas de Repetidores Doble Banda y Redes Mesh
                      </h2>
                    </div>
                    <Link
                      href="/guias/"
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Ver las 498 guías →
                    </Link>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {buyingGuides.slice(0, 4).map((guide) => (
                      <Link
                        key={guide.id}
                        href={getPostUrl(guide)}
                        className="group flex gap-3.5 rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-primary hover:shadow-md"
                      >
                        <img
                          src={getImageUrl(guide.featuredImageUrl)}
                          alt={guide.title}
                          className="h-16 w-20 shrink-0 rounded-lg object-cover bg-slate-100"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                            {guide.title}
                          </h3>
                          <span className="mt-1 inline-block text-[11px] font-bold text-primary">
                            Ver comparativa →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* End-of-Article AdSense Banner */}
              <AdBanner className="my-10" />

              {/* CTA Banner inside article — Dinamica.pe style adapted for Repetidores.org */}
              <div className="mt-12 rounded-2xl bg-gradient-to-br from-slate-950 via-[#0b192c] to-slate-900 p-8 sm:p-10 text-center text-white shadow-lg border border-sky-500/30">
                <span className="inline-block rounded-full bg-sky-400/20 px-3 py-1 text-xs font-bold text-sky-300">
                  📡 Centro Técnico Repetidores.org
                </span>
                <h3 className="mt-3 text-2xl font-extrabold">
                  ¿Buscas el repetidor ideal para tu casa o necesitas solucionar
                  un corte de señal WiFi?
                </h3>
                <p className="mt-2 text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
                  Utiliza nuestro diagnosticador interactivo de cobertura o
                  explora nuestras 498 comparativas de extensores de doble banda
                  y sistemas Mesh.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/guias/"
                    className="inline-block rounded-xl bg-sky-400 px-6 py-3.5 text-sm font-extrabold text-slate-950 transition hover:bg-sky-300"
                  >
                    Explorar Guías de Compra
                  </Link>
                  <Link
                    href="/problemas-y-soluciones/"
                    className="inline-block rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
                  >
                    Ver Solución de Problemas
                  </Link>
                </div>
              </div>

              {/* Author Box (E-E-A-T) */}
              <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 flex flex-col sm:flex-row items-center gap-5">
                <img
                  src="/images/charlie-lingan.jpg"
                  alt="Charlie Lingán"
                  className="h-20 w-20 rounded-2xl object-cover shrink-0 border border-primary shadow-xs"
                  loading="lazy"
                />
                <div className="text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <Link
                      href="/hola-hablamos/"
                      className="text-base font-extrabold text-slate-900 hover:text-primary"
                    >
                      Charlie Lingán
                    </Link>
                    <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-bold text-primary-dark">
                      Editor & Fundador
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Experto en ecommerce, transformación digital y redes de
                    conectividad. En <strong>Repetidores.org</strong>{" "}
                    compartimos manuales técnicos verificados, comparativas de
                    equipos y soluciones prácticas para eliminar las zonas sin
                    WiFi en tu hogar o empresa.
                  </p>
                </div>
              </div>

              {/* Bottom Related Posts Grid */}
              {relatedPosts.length > 0 && (
                <section className="mt-14 pt-10 border-t border-slate-200">
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
                    Más guías sobre {category?.name || post.categoryName}
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {relatedPosts.map((rp) => (
                      <Link
                        key={rp.id}
                        href={getPostUrl(rp)}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg hover:border-primary/40"
                      >
                        <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                          <img
                            src={getImageUrl(rp.featuredImageUrl)}
                            alt={rp.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[11px] font-bold text-primary uppercase">
                              {rp.categoryName}
                            </span>
                            <h3 className="mt-1 text-base font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                              {rp.title}
                            </h3>
                          </div>
                          <span className="mt-3 inline-block text-xs font-bold text-primary">
                            Leer guía completa →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Sticky Sidebar — Dinamica.pe style */}
            <aside className="mt-12 lg:mt-0 lg:w-80 lg:flex-shrink-0">
              <div className="sticky top-24 space-y-8">
                {/* Related Articles Box */}
                {relatedPosts.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                    <h3 className="mb-4 text-base font-extrabold text-slate-900">
                      Artículos Relacionados
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((p) => (
                        <Link
                          key={p.id}
                          href={getPostUrl(p)}
                          className="group flex gap-3 rounded-xl p-2 transition hover:bg-white"
                        >
                          <img
                            src={getImageUrl(p.featuredImageUrl)}
                            alt={p.title}
                            className="h-16 w-20 flex-shrink-0 rounded-lg object-cover bg-slate-200"
                            loading="lazy"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary transition line-clamp-2 leading-snug">
                              {p.title}
                            </h4>
                            <span className="mt-1 block text-[11px] text-slate-400">
                              ⏱️ {p.readTime}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Featured Troubleshooting & Buying Guides Box */}
                <div className="rounded-2xl border border-slate-200 bg-light-bg/70 p-6">
                  <h3 className="mb-4 text-base font-extrabold text-slate-900">
                    🛠️ Soluciones Más Consultadas
                  </h3>
                  <ul className="space-y-3">
                    {troubleshootingGuides.slice(0, 5).map((fg) => (
                      <li
                        key={fg.id}
                        className="border-b border-slate-200/70 pb-2.5 last:border-0 last:pb-0"
                      >
                        <Link
                          href={getPostUrl(fg)}
                          className="text-xs font-bold text-slate-800 hover:text-primary transition-colors line-clamp-2"
                        >
                          → {fg.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* High-Traffic Guides Box */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="mb-4 text-base font-extrabold text-slate-900">
                    📡 Guías Destacadas
                  </h3>
                  <ul className="space-y-3">
                    {topSeoPosts.slice(0, 5).map((tp) => (
                      <li
                        key={tp.id}
                        className="border-b border-slate-100 pb-2.5 last:border-0 last:pb-0"
                      >
                        <span className="block text-[10px] font-bold uppercase text-primary">
                          {tp.categoryName}
                        </span>
                        <Link
                          href={getPostUrl(tp)}
                          className="text-xs font-bold text-slate-800 hover:text-primary transition-colors line-clamp-2"
                        >
                          {tp.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sidebar Sticky AdSense Unit */}
                <AdBanner format="vertical" className="min-h-[250px]" />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
