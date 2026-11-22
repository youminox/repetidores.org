"use client";

import Link from "next/link";
import { useState } from "react";
import OpenChatButton from "@/components/OpenChatButton";

export type WifiTechOption = {
  key: string;
  label: string;
  tier: string;
  maxMbps: number;
  bandSpec: string;
  coveragePerNodeM2: number;
  img: string;
  alt: string;
  desc: string;
  components: string;
  href: string;
};

/**
 * Calculadora interactiva de Cobertura WiFi por m², Muros y Velocidad Real:
 * Alterna entre 3 tecnologías (Repetidor WiFi 6 Doble Banda, Sistema WiFi Mesh 2–3 Nodos y Kit PLC Powerline)
 * y calcula los nodos necesarios, la velocidad real estimada tras paredes y la latencia.
 */
export default function CoverageCalculatorBlock({
  options,
}: {
  options: WifiTechOption[];
}) {
  const [k, setK] = useState(options[0].key);
  const [homeM2, setHomeM2] = useState(120);

  const p = options.find((o) => o.key === k) || options[0];
  const recommendedNodes = Math.max(1, Math.ceil(homeM2 / p.coveragePerNodeM2));
  const attenuationFactor =
    p.key === "mesh-wifi6"
      ? Math.max(0.72, 1 - (homeM2 - 60) * 0.0008)
      : p.key === "plc-powerline"
      ? Math.max(0.78, 1 - (homeM2 - 60) * 0.0005)
      : Math.max(0.45, 1 - (homeM2 - 60) * 0.0018);
  const estimatedRealMbps = Math.round(p.maxMbps * 0.42 * attenuationFactor);
  const pingMs = p.key === "plc-powerline" ? "6–10 ms" : p.key === "mesh-wifi6" ? "8–12 ms" : "12–22 ms";

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="card card-static spot relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#06b6d4]/15 blur-3xl" />
        <div className="relative">
          <div
            className="inline-flex flex-wrap rounded-full bg-[#f0f9ff] border border-[var(--line)] p-1"
            role="tablist"
            aria-label="Tecnología de Extensión WiFi"
          >
            {options.map((o) => (
              <button
                key={o.key}
                role="tab"
                type="button"
                aria-selected={o.key === k}
                onClick={() => setK(o.key)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  o.key === k
                    ? "bg-[#0284c7] text-white shadow"
                    : "text-[var(--muted)] hover:text-slate-900"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid items-center gap-6 sm:grid-cols-[1fr_1.15fr]">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[250px] overflow-hidden rounded-2xl border border-[var(--line)] shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={p.img}
                src={p.img}
                alt={p.alt}
                className="h-full w-full object-cover"
                style={{ animation: "fadeup .45s ease both" }}
              />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#0284c7]">
                {p.tier}
              </p>
              <p
                className="mt-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900"
                aria-live="polite"
              >
                Hasta {p.maxMbps} Mbps
              </p>
              <p className="mt-0.5 text-sm font-semibold text-[#0369a1]">
                Estándar · {p.bandSpec}
              </p>
              <p className="mt-2.5 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                {p.desc}
              </p>
              <p className="mt-2 rounded-xl bg-[#f0f9ff] border border-sky-200 px-3 py-2 text-xs text-slate-900">
                <strong>Equipo recomendado en Amazon:</strong> {p.components}
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={p.href}
              className="btn btn-buy shine flex-1 text-sm"
              data-magnetic
            >
              Ver guía de {p.label.toLowerCase()} →
            </Link>
            <OpenChatButton
              label="Pedir recomendación IA"
              prompt={`Mi casa tiene ${homeM2} m² y me interesa la opción ${p.label} (${p.components}). ¿Qué modelo exacto de Amazon me recomiendas comprar y dónde colocarlo?`}
              className="btn btn-ghost text-sm"
            />
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#071324] via-[#0c1d36] to-[#034066] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#38bdf8]/15 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#67e8f9]">
          Simulador de Cobertura Real por Superficie (m²)
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          ¿Cuánta velocidad llegará a tu habitación más lejana?
        </h3>
        <p className="mt-2 text-sm text-white/75">
          Desliza los metros cuadrados de tu vivienda u oficina. Calculamos cuántos equipos o nodos
          necesitas, la velocidad útil real tras atravesar tabiques y el ping estimado.
        </p>

        <label
          htmlFor="rep-m2"
          className="mt-6 flex items-center justify-between text-sm font-semibold"
        >
          <span>Superficie de tu casa u oficina</span>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-display text-lg text-[#67e8f9]">
            {homeM2} m²
          </span>
        </label>
        <input
          id="rep-m2"
          type="range"
          min={50}
          max={350}
          step={10}
          value={homeM2}
          onChange={(e) => setHomeM2(Number(e.target.value))}
          className="mt-3 w-full accent-[#38bdf8]"
        />
        <div className="mt-1 flex justify-between text-[0.7rem] text-white/45">
          {[50, 100, 150, 200, 275, 350].map((n) => (
            <span key={n}>{n} m²</span>
          ))}
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            ["Velocidad real", `~${estimatedRealMbps} Mbps`],
            ["Unidades / Nodos", `${recommendedNodes} ud${recommendedNodes > 1 ? "s." : "."}`],
            ["Latencia / Ping", pingMs],
          ].map(([l, val], i) => (
            <div
              key={l}
              className={`glass flex flex-col-reverse p-3 ${
                i === 0 ? "border-[#38bdf8]/50 bg-[#38bdf8]/10" : ""
              }`}
            >
              <dt className="mt-1 text-[0.7rem] leading-tight text-white/65">{l}</dt>
              <dd
                className={`font-display font-extrabold ${
                  i === 0
                    ? "text-xl text-[#67e8f9] sm:text-2xl"
                    : "text-xl sm:text-2xl"
                }`}
              >
                {val}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-xs text-white/65">
          Para una superficie de <strong>{homeM2} m²</strong> con{" "}
          <strong className="text-[#67e8f9]">{p.label}</strong>, recomendamos instalar{" "}
          <strong>
            {recommendedNodes} {recommendedNodes === 1 ? "equipo" : "nodos"}
          </strong>{" "}
          para sostener streaming 4K, videollamadas y gaming sin zonas muertas.
        </p>
      </div>
    </div>
  );
}
