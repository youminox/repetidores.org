"use client";

import { useEffect, useState } from "react";
import {
  AmazonProductRecommendation,
  AmazonStoreRegion,
  buildAmazonUrl,
  detectUserAmazonRegion,
} from "@/lib/amazon";

interface AmazonAffiliateBoxProps {
  variant: "inline" | "showcase" | "sidebar";
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
}

function CategoryIcon({
  type,
}: {
  type: AmazonProductRecommendation["categoryType"];
}) {
  if (type === "mesh_system") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-700 border border-blue-300/60">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="5" cy="18" r="2.5" />
          <circle cx="19" cy="18" r="2.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 7L6.5 15.5M13.5 7l4 8.5M7.5 18h9" />
        </svg>
      </div>
    );
  }
  if (type === "plc_powerline") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 border border-amber-300/60">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
    );
  }
  if (type === "outdoor_ap") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700 border border-emerald-300/60">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M8 6v6M16 6v6M5 9c0-3.866 3.134-7 7-7s7 3.134 7 7" />
        </svg>
      </div>
    );
  }
  if (type === "ethernet_cable") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-700 border border-cyan-300/60">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="6" y="3" width="12" height="8" rx="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v3M12 3v3M15 3v3M12 11v10" />
        </svg>
      </div>
    );
  }
  if (type === "security_router") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-700 border border-indigo-300/60">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 5-3.5 8.5-7 9.5-3.5-1-7-4.5-7-9.5V7l7-4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        </svg>
      </div>
    );
  }
  // Default: WiFi 6 Repeater / Extender
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-cyan-400 border border-cyan-500/40 shadow-2xs">
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0" />
        <circle cx="12" cy="20" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}

export default function AmazonAffiliateBox({
  variant,
  sectionTitle,
  sectionSubtitle,
  products,
}: AmazonAffiliateBoxProps) {
  const [region, setRegion] = useState<AmazonStoreRegion>("ES");

  useEffect(() => {
    setRegion(detectUserAmazonRegion());
  }, []);

  const primaryProduct = products[0];
  const storeName = region === "ES" ? "Amazon.es" : "Amazon.com";

  // 1. INLINE VARIANT (Appears mid-article for high mobile CTR)
  if (variant === "inline") {
    const url = buildAmazonUrl(primaryProduct, region);

    return (
      <aside
        aria-label="Recomendación destacada en Amazon"
        className="my-9 rounded-2xl border-2 border-blue-400/80 bg-gradient-to-br from-[#f8fbff] via-[#f0f7ff] to-[#e6f1fe] p-5 sm:p-6 shadow-md"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-extrabold text-blue-950 border border-blue-400/50">
            {primaryProduct.badge}
          </span>
          <div className="inline-flex items-center gap-1 rounded-full bg-white/90 border border-slate-200 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
            <span>Tienda:</span>
            <button
              type="button"
              onClick={() => setRegion("ES")}
              className={`px-1.5 py-0.5 rounded-full transition cursor-pointer ${
                region === "ES"
                  ? "bg-amber-400 text-slate-950 font-extrabold"
                  : "hover:text-slate-900"
              }`}
              title="Ver en Amazon España (repetidores-21)"
            >
              🇪🇸 ES
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => setRegion("US")}
              className={`px-1.5 py-0.5 rounded-full transition cursor-pointer ${
                region === "US"
                  ? "bg-amber-400 text-slate-950 font-extrabold"
                  : "hover:text-slate-900"
              }`}
              title="Ver en Amazon USA / Global (repetidores-20)"
            >
              🇺🇸 US
            </button>
          </div>
        </div>

            </div>
          </div>

          <div className="sm:shrink-0">
            <a
              href={url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-3.5 text-sm font-extrabold text-slate-950 shadow-sm transition hover:from-amber-300 hover:to-amber-400 hover:shadow-md"
            >
              <span>{primaryProduct.ctaLabel}</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // 2. SIDEBAR VARIANT (Sticky right column on desktop)
  if (variant === "sidebar") {
    return (
      <div className="rounded-2xl border-2 border-blue-400/70 bg-gradient-to-b from-[#f8fbff] to-[#eef6ff] p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-950">
            🛒 Top WiFi en {storeName}
          </span>
          <div className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
            <button
              type="button"
              onClick={() => setRegion("ES")}
              className={`cursor-pointer ${region === "ES" ? "text-blue-700 font-extrabold underline" : ""}`}
            >
              🇪🇸 ES
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setRegion("US")}
              className={`cursor-pointer ${region === "US" ? "text-blue-700 font-extrabold underline" : ""}`}
            >
              🇺🇸 US
            </button>
          </div>
        </div>

                <a
                  href={url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-400 px-3 py-2 text-xs font-extrabold text-slate-950 transition hover:bg-amber-300"
                >
                  <span>Ver en {storeName}</span>
                  <span>→</span>
                </a>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[10px] text-slate-500 leading-tight text-center">
          Afiliado Oficial de Amazon ({region === "ES" ? "repetidores-21" : "repetidores-20"}).
        </p>
      </div>
    );
  }

  // 3. SHOWCASE VARIANT (Full 3-product comparison grid)
  return (
    <section
      aria-label="Selección de repetidores WiFi recomendados en Amazon"
      className="my-12 rounded-3xl border-2 border-blue-400/70 bg-gradient-to-br from-[#061124] via-[#0a1d3b] to-[#08172e] p-6 sm:p-8 text-white shadow-xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-extrabold text-cyan-300">
            📶 Selección Oficial Repetidores.org · Disponible en {storeName}
          </span>
          <h2 className="mt-2.5 text-xl sm:text-2xl font-extrabold text-white">
            {sectionTitle}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            {sectionSubtitle}
          </p>
        </div>

        {/* Store Switcher (Auto-detected + Manual Override) */}
        <div className="shrink-0 self-start sm:self-center rounded-xl bg-white/10 p-1.5 border border-white/15 text-xs">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setRegion("ES")}
              className={`rounded-lg px-2.5 py-1.5 font-bold transition cursor-pointer ${
                region === "ES"
                  ? "bg-amber-400 text-slate-950 shadow-2xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              🇪🇸 Amazon.es
            </button>
            <button
              type="button"
              onClick={() => setRegion("US")}
              className={`rounded-lg px-2.5 py-1.5 font-bold transition cursor-pointer ${
                region === "US"
                  ? "bg-amber-400 text-slate-950 shadow-2xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              🇺🇸 Amazon.com
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {products.map((product, index) => {
          const url = buildAmazonUrl(product, region);
          const isFeatured = index === 0;

          return (
            <div
              key={product.id}
              className={`flex flex-col justify-between rounded-2xl p-5 transition ${
                isFeatured
                  ? "bg-gradient-to-b from-white via-[#f8fbff] to-[#eef6ff] text-slate-900 ring-2 ring-amber-400 shadow-lg"
                  : "bg-white/95 text-slate-900 border border-slate-200/80"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-[11px] font-extrabold ${
                      isFeatured
                        ? "bg-amber-400 text-slate-950"
                        : "bg-blue-100 text-blue-900"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>

                <div className="mt-3.5 flex items-start gap-3">
                  <CategoryIcon type={product.categoryType} />
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {product.title}
                  </h3>
                </div>

                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                  {product.subtitle}
                </p>

                <ul className="mt-3.5 space-y-1.5 border-t border-slate-200/80 pt-3 text-xs text-slate-700">
                  {product.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5">
                      <span className="font-extrabold text-emerald-600">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>


                <a
                  href={url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs sm:text-sm font-extrabold transition shadow-xs ${
                    isFeatured
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400"
                      : "bg-slate-900 text-white hover:bg-blue-700"
                  }`}
                >
                  <span>{product.ctaLabel}</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-center text-[11px] text-slate-400">
        En calidad de Afiliado de Amazon ({region === "ES" ? "repetidores-21 en Amazon.es" : "repetidores-20 en Amazon.com"}), Repetidores.org obtiene ingresos por las compras adscritas que cumplen los requisitos aplicables, sin ningún costo adicional para ti.
      </p>
    </section>
  );
}
