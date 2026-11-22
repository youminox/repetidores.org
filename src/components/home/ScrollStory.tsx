"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    n: "01",
    t: "Diagnóstico de la Zona Muerta y Atenuación por Muros",
    d: "El router principal pierde entre -12 y -25 dBm al atravesar paredes de ladrillo, puertas cerradas o forjados hacia el segundo piso.",
  },
  {
    n: "02",
    t: "Ubicación en el Punto Intermedio (-60 dBm) y Antenas",
    d: "El repetidor se enchufa a mitad de camino donde aún recibe señal estable del router, con sus antenas orientadas en vertical u oblicuo a 45°.",
  },
  {
    n: "03",
    t: "Regeneración Doble Banda (2.4 GHz + 5 GHz / WiFi 6)",
    d: "El extensor regenera la onda inalámbrica y habilita el puerto Gigabit Ethernet para llevar velocidad total hasta el último rincón de la casa.",
  },
];

/** Escena fijada con GSAP ScrollTrigger: del router con zona muerta a la cobertura total WiFi 6 con el repetidor en el punto intermedio. */
export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    let io: IntersectionObserver | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        if (reduce) {
          gsap.set(q(".repeater-waves, .room2-connected, .night, .moon, .stars, .warm-glow"), {
            opacity: 1,
          });
          gsap.set(q(".step"), { opacity: 1 });
          gsap.set(q(".bar"), { scaleX: 1 });
          return;
        }
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=2000",
            scrub: 0.7,
            pin: q(".pin")[0],
            anticipatePin: 1,
          },
        });

        tl.to(q(".step-0"), { opacity: 1, duration: 0.2 }, 0)
          .to(q(".step-0 .dot"), { backgroundColor: "#0284c7", color: "#fff", duration: 0.2 }, 0)
          .fromTo(
            q(".router-waves"),
            { opacity: 0.2, scale: 0.85, transformOrigin: "85px 290px" },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
            0
          )
          .to(q(".step-0"), { opacity: 0.8, duration: 0.2 }, 1.05)
          .to(q(".step-1"), { opacity: 1, duration: 0.2 }, 1.05)
          .to(q(".step-1 .dot"), { backgroundColor: "#0369a1", color: "#fff", duration: 0.2 }, 1.05)
          .fromTo(
            q(".repeater-node"),
            { y: 18, opacity: 0.25 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            1.05
          )
          .to(q(".repeater-led"), { fill: "#10b981", duration: 0.35 }, 1.45)
          .to(q(".step-1"), { opacity: 0.8, duration: 0.2 }, 2.15)
          .to(q(".step-2"), { opacity: 1, duration: 0.2 }, 2.15)
          .to(
            q(".step-2 .dot"),
            { backgroundColor: "#10b981", color: "#061626", duration: 0.2 },
            2.15
          )
          .fromTo(
            q(".repeater-waves"),
            { scale: 0.3, opacity: 0, transformOrigin: "200px 235px" },
            { scale: 1, opacity: 1, duration: 1.0, ease: "power1.inOut" },
            2.0
          )
          .to(q(".room2-connected"), { opacity: 1, duration: 0.6 }, 2.3)
          .to(q(".warm-glow"), { opacity: 0.95, duration: 0.5 }, 2.25)
          .to(q(".night"), { opacity: 1, duration: 0.6 }, 2.6)
          .fromTo(q(".moon"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 2.75)
          .to(q(".stars"), { opacity: 1, duration: 0.5 }, 2.85)
          .to(q(".done"), { opacity: 1, y: 0, duration: 0.4 }, 3.1)
          .to(q(".bar"), { scaleX: 1, duration: 3.5 }, 0);
      }, el);
    };

    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io?.disconnect();
          init();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io?.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="como-elimina-zonas-muertas"
      ref={root}
      className="relative bg-gradient-to-b from-white via-[#f0f9ff] to-white"
    >
      <div className="pin flex min-h-[100svh] items-center overflow-hidden py-10 lg:py-14">
        <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="eyebrow">De la zona muerta al WiFi en toda la casa</span>
            <h2 className="section-title mt-3">
              Tres etapas. <span className="text-[#0284c7]">Cobertura al 100% sin caídas.</span>
            </h2>
            <div className="mt-4 h-1.5 w-full max-w-sm overflow-hidden rounded bg-[var(--line)]">
              <div className="bar h-full origin-left scale-x-0 bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#10b981]" />
            </div>
            <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-5">
              {STEPS.map((s, i) => (
                <li key={s.n} className={`step step-${i} flex gap-4`} style={{ opacity: 0.8 }}>
                  <span className="dot grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white font-display font-extrabold text-slate-900 shadow-md">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold sm:text-xl">{s.t}</p>
                    <p className="text-sm text-slate-600 sm:text-base">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p
              className="done mt-6 hidden text-sm text-[var(--muted)] sm:block"
              style={{ opacity: 0, transform: "translateY(10px)" }}
            >
              Regla de oro WiFi: “Nunca coloques el repetidor dentro de la habitación que ya no
              tiene señal; colócalo en el punto intermedio donde aún llegan al menos 3 barras (-60
              dBm) del router principal.”
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[270px] sm:max-w-[370px] lg:max-w-[440px]">
            <svg
              viewBox="0 0 400 440"
              className="relative w-full drop-shadow-[0_30px_50px_rgba(2,132,199,0.25)]"
              role="img"
              aria-label="Animación: una vivienda de dos plantas donde el repetidor WiFi ubicado en el punto intermedio regenera la señal de 2.4 y 5 GHz hacia las zonas muertas"
            >
              <defs>
                <linearGradient id="rep-day" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#e0f2fe" />
                  <stop offset="1" stopColor="#f8fafc" />
                </linearGradient>
                <linearGradient id="rep-night" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#040b16" />
                  <stop offset="0.65" stopColor="#0a192f" />
                  <stop offset="1" stopColor="#0f294a" />
                </linearGradient>
                <radialGradient id="rep-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#10b981" stopOpacity="0.45" />
                  <stop offset="1" stopColor="#0284c7" stopOpacity="0" />
                </radialGradient>
                <clipPath id="rep-panel">
                  <rect x="0" y="0" width="400" height="440" rx="36" />
                </clipPath>
              </defs>

              <g clipPath="url(#rep-panel)">
                {/* Cielo Día / Noche */}
                <rect width="400" height="440" fill="url(#rep-day)" />
                <circle cx="330" cy="62" r="22" fill="#38bdf8" opacity="0.55" />
                <rect className="night" width="400" height="440" fill="url(#rep-night)" opacity="0" />
                <g className="stars" opacity="0" fill="#bae6fd">
                  {[
                    [40, 38, 1.5],
                    [92, 76, 1.1],
                    [150, 28, 1.4],
                    [225, 62, 1],
                    [58, 118, 1.2],
                    [265, 32, 1.5],
                    [362, 115, 1.1],
                  ].map(([x, y, r], i) => (
                    <circle key={i} cx={x} cy={y} r={r} />
                  ))}
                </g>
                <g className="moon" opacity="0">
                  <circle cx="324" cy="64" r="22" fill="#e0f2fe" />
                  <circle cx="334" cy="56" r="18" fill="#071527" />
                </g>

                <circle className="warm-glow" cx="200" cy="240" r="185" fill="url(#rep-glow)" opacity="0" />

                {/* Estructura de la Casa de 2 Plantas */}
                <polygon
                  points="200,82 36,154 364,154"
                  fill="#0f172a"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                <rect
                  x="48"
                  y="154"
                  width="304"
                  height="236"
                  rx="10"
                  fill="#0f172a"
                  fillOpacity="0.92"
                  stroke="#334155"
                  strokeWidth="2.5"
                />
                {/* Forjado intermedio (Piso 1 / Piso 2) y Muro Central */}
                <rect x="50" y="266" width="300" height="10" fill="#334155" />
                <rect x="196" y="156" width="10" height="232" fill="#334155" />

                {/* Etiquetas de Habitaciones */}
                <text x="120" y="176" textAnchor="middle" fontSize="9" fontWeight="800" fill="#94a3b8">
                  PLANTA ALTA · ESTUDIO
                </text>
                <text x="280" y="176" textAnchor="middle" fontSize="9" fontWeight="800" fill="#94a3b8">
                  DORMITORIO · SMART TV 4K
                </text>
                <text x="120" y="290" textAnchor="middle" fontSize="9" fontWeight="800" fill="#38bdf8">
                  SALA · ROUTER PRINCIPAL
                </text>
                <text x="280" y="290" textAnchor="middle" fontSize="9" fontWeight="800" fill="#94a3b8">
                  TERRAZA / OFICINA
                </text>

                {/* Router Principal en Planta Baja Izquierda */}
                <g transform="translate(72 340)">
                  <rect width="54" height="18" rx="4" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.5" />
                  <line x1="10" y1="0" x2="6" y2="-18" stroke="#bae6fd" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="27" y1="0" x2="27" y2="-20" stroke="#bae6fd" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="44" y1="0" x2="48" y2="-18" stroke="#bae6fd" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="14" cy="9" r="2.2" fill="#10b981" />
                  <circle cx="24" cy="9" r="2.2" fill="#38bdf8" />
                </g>

                {/* Ondas del Router Principal */}
                <g className="router-waves" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 4">
                  <circle cx="99" cy="340" r="45" opacity="0.85" />
                  <circle cx="99" cy="340" r="85" opacity="0.55" />
                  <circle cx="99" cy="340" r="125" opacity="0.28" />
                </g>

                {/* Repetidor WiFi en el Punto Intermedio Central (-60 dBm) */}
                <g className="repeater-node" transform="translate(178 215)">
                  <rect
                    width="44"
                    height="52"
                    rx="10"
                    fill="#ffffff"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                  />
                  {/* Antenas externas del repetidor */}
                  <line x1="6" y1="8" x2="2" y2="-16" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                  <line x1="38" y1="8" x2="42" y2="-16" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                  <circle className="repeater-led" cx="22" cy="22" r="6" fill="#f59e0b" />
                  <text x="22" y="42" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#0f172a">
                    WIFI 6
                  </text>
                </g>

                {/* Ondas Regeneradas por el Repetidor WiFi 6 / Mesh */}
                <g className="repeater-waves" opacity="0" fill="none">
                  <circle cx="200" cy="240" r="55" stroke="#10b981" strokeWidth="2.5" />
                  <circle cx="200" cy="240" r="102" stroke="#38bdf8" strokeWidth="2.2" strokeDasharray="6 4" />
                  <circle cx="200" cy="240" r="150" stroke="#10b981" strokeWidth="1.8" opacity="0.7" />
                </g>

                {/* Dispositivos en Planta Alta y Derecha recibiendo 100% Señal */}
                <g className="room2-connected" opacity="0.25">
                  {/* Smart TV 4K en Planta Alta Derecha */}
                  <rect x="246" y="198" width="68" height="40" rx="5" fill="#0284c7" stroke="#6ee7b7" strokeWidth="2" />
                  <text x="280" y="217" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff">
                    4K STREAM
                  </text>
                  <text x="280" y="229" textAnchor="middle" fontSize="7" fontWeight="700" fill="#6ee7b7">
                    5 GHz · 867 Mbps
                  </text>

                  {/* Laptop / Gaming en Planta Baja Derecha */}
                  <rect x="250" y="324" width="60" height="36" rx="5" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                  <text x="280" y="341" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#fff">
                    PING 8 ms
                  </text>
                  <text x="280" y="352" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#a7f3d0">
                    100% SEÑAL
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
