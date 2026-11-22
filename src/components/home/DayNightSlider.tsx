"use client";

import { useCallback, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Escena arrastrable día ↔ noche: cambia la carga de la red WiFi doméstica, del teletrabajo diurno al streaming 4K y gaming nocturno. */
export default function DayNightSlider() {
  const [v, setV] = useState(25);
  const [touched, setTouched] = useState(false);
  const scene = useRef<HTMLDivElement>(null);

  const t = v / 100;
  const dusk = clamp(1 - Math.abs(t - 0.5) * 2.4);
  const night = clamp((t - 0.45) / 0.45);
  const stars = clamp((t - 0.62) / 0.3);
  const sunX = 110 + t * 520;
  const sunY = 95 + Math.pow(t, 1.6) * 330;
  const sunO = 1 - clamp((t - 0.55) / 0.2);
  const moonY = 420 - clamp((t - 0.5) / 0.5) * 320;
  const hour = 8 + t * 15;
  const hh = Math.floor(hour);
  const mm = Math.round(((hour - hh) * 60) / 15) * 15;
  const time = `${String((hh + (mm === 60 ? 1 : 0)) % 24).padStart(2, "0")}:${String(
    mm === 60 ? 0 : mm
  ).padStart(2, "0")}`;

  const phase =
    t < 0.34
      ? "Mañana · Teletrabajo, Zoom & Home Office"
      : t < 0.67
      ? "Tarde · Estudio, Descargas & Smart Home IoT"
      : "Noche · Streaming 4K, Gaming Online & +20 Dispositivos";

  const ritualNote =
    t < 0.34
      ? "Prioriza la banda de 5 GHz o cable Ethernet Gigabit desde el repetidor hacia tu laptop de trabajo"
      : t < 0.67
      ? "La banda de 2.4 GHz mantiene cámaras, domótica y móviles conectados en patios y habitaciones lejanas"
      : "MU-MIMO y OFDMA reparten el ancho de banda entre Smart TVs 4K y consolas con ping < 10 ms";

  const fromPointer = useCallback((clientX: number) => {
    const el = scene.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setV(Math.round(clamp((clientX - r.left) / r.width) * 100));
    setTouched(true);
  }, []);

  return (
    <div className="daynight bg-[#071324] shadow-[0_40px_80px_-40px_rgba(7,19,36,0.75)]">
      <div
        ref={scene}
        className="relative aspect-[4/5] cursor-ew-resize select-none sm:aspect-[16/9]"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") e.preventDefault();
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === "touch") {
            if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId))
              fromPointer(e.clientX);
          }
        }}
      >
        <svg
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="dn-day" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7cc8f2" />
              <stop offset="1" stopColor="#e0f2fe" />
            </linearGradient>
            <linearGradient id="dn-dusk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1e3a8a" />
              <stop offset="0.52" stopColor="#0284c7" />
              <stop offset="1" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="dn-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#040914" />
              <stop offset="0.7" stopColor="#0a1628" />
              <stop offset="1" stopColor="#0f2744" />
            </linearGradient>
            <radialGradient id="dn-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#fff7d1" />
              <stop offset="0.5" stopColor="#ffd166" />
              <stop offset="1" stopColor="#ffd166" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="dn-lamp" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="800" height="450" fill="url(#dn-day)" />
          <rect width="800" height="450" fill="url(#dn-dusk)" opacity={dusk} />
          <rect width="800" height="450" fill="url(#dn-night)" opacity={night} />

          {/* Estrellas */}
          <g opacity={stars} fill="#e0f2fe">
            {[
              [60, 40, 1.6],
              [140, 90, 1.1],
              [230, 30, 1.4],
              [320, 70, 1],
              [410, 25, 1.5],
              [500, 85, 1.1],
              [590, 35, 1.3],
              [690, 70, 1],
              [760, 30, 1.4],
              [100, 160, 1],
              [380, 140, 0.9],
              [720, 150, 1.2],
            ].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} />
            ))}
          </g>

          {/* Sol */}
          <g opacity={sunO}>
            <circle cx={sunX} cy={sunY} r="90" fill="url(#dn-sun)" />
            <circle cx={sunX} cy={sunY} r="30" fill="#ffe08a" />
          </g>

          {/* Luna */}
          <g transform={`translate(640 ${moonY})`} opacity={clamp((t - 0.5) / 0.25)}>
            <circle r="30" fill="#e0f2fe" />
            <circle cx="12" cy="-8" r="26" fill="#071324" opacity={0.9 * night + 0.1} />
          </g>

          {/* Horizonte */}
          <path
            d="M0 330 C120 290 210 300 300 320 C400 280 520 290 620 315 C700 300 760 305 800 310 L800 450 L0 450 Z"
            fill={night > 0.5 ? "#0b192c" : "#94a3b8"}
            opacity="0.9"
          />
          <path
            d="M0 330 C120 290 210 300 300 320 C400 280 520 290 620 315 C700 300 760 305 800 310 L800 450 L0 450 Z"
            fill="#071324"
            opacity={night}
          />
          <g fill={t > 0.5 ? "#091526" : "#64748b"}>
            {[
              [40, 300, 40, 150],
              [90, 270, 36, 180],
              [135, 310, 50, 140],
              [520, 285, 40, 165],
              [565, 255, 46, 195],
              [618, 300, 36, 150],
              [660, 275, 44, 175],
              [712, 305, 48, 145],
            ].map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx="3" />
            ))}
          </g>
          <g fill="#7dd3fc" opacity={night}>
            {[
              [100, 285],
              [112, 310],
              [100, 335],
              [150, 325],
              [530, 300],
              [578, 270],
              [590, 300],
              [578, 330],
              [672, 290],
              [684, 320],
              [725, 318],
            ].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="7" height="9" rx="1" />
            ))}
          </g>

          {/* Halo WiFi 6 nocturno */}
          <circle cx="400" cy="335" r="215" fill="url(#dn-lamp)" opacity={night} />

          {/* Suelo / Plataforma del Hogar Conectado */}
          <rect x="0" y="392" width="800" height="58" fill={night > 0.5 ? "#0f172a" : "#475569"} />
          <rect x="0" y="392" width="800" height="58" fill="#071324" opacity={night * 0.72} />
          <rect x="0" y="388" width="800" height="6" fill="#38bdf8" opacity="0.28" />

          {/* Router Principal a la izquierda */}
          <g transform="translate(185 330)">
            <rect width="74" height="58" rx="10" fill="#1e293b" stroke="#0284c7" strokeWidth="2" />
            <line x1="16" y1="0" x2="10" y2="-24" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            <line x1="37" y1="0" x2="37" y2="-28" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            <line x1="58" y1="0" x2="64" y2="-24" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            <rect x="12" y="34" width="50" height="14" rx="4" fill="#0284c7" />
            <text x="37" y="44" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff">
              ROUTER FIBRA
            </text>
          </g>

          {/* Repetidor WiFi 6 / Nodo Mesh Central */}
          <g transform="translate(335 262)">
            <rect
              width="130"
              height="128"
              rx="16"
              fill="rgba(15, 23, 42, 0.92)"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
            <line x1="20" y1="12" x2="10" y2="-28" stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" />
            <line x1="110" y1="12" x2="120" y2="-28" stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" />
            <circle cx="65" cy="52" r="24" fill="rgba(16, 185, 129, 0.18)" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="65" cy="52" r="9" fill="#10b981" />
            <text x="65" y="96" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">
              WIFI 6 · MESH
            </text>
            <text x="65" y="112" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#6ee7b7">
              -54 dBm · 1200 Mbps
            </text>
          </g>

          {/* Smart TV 4K & Gaming Setup a la derecha */}
          <g transform="translate(530 312)">
            <rect width="102" height="64" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2.2" />
            <rect x="8" y="8" width="86" height="44" rx="4" fill="rgba(6, 182, 212, 0.25)" />
            <text x="51" y="29" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff">
              4K · GAMING
            </text>
            <text x="51" y="42" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#6ee7b7">
              0% CORTES · 8ms
            </text>
            <rect x="38" y="64" width="26" height="14" rx="2" fill="#334155" />
          </g>

          {/* Ondas WiFi sincronizadas */}
          <g
            className="steam"
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.9"
          >
            <path d="M368 248 C355 224 382 208 368 182" />
            <path d="M400 244 C387 218 414 200 400 170" />
            <path d="M432 248 C419 224 446 208 432 182" />
          </g>
        </svg>

        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/30 bg-black/45 px-4 py-2 text-white backdrop-blur-md sm:left-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cyan-300">
            {phase}
          </p>
          <p className="font-display text-3xl font-extrabold tabular-nums">{time}</p>
        </div>

        <div className="pointer-events-none absolute right-4 top-4 max-w-[54%] rounded-2xl border border-white/30 bg-black/45 px-4 py-3 text-right text-white backdrop-blur-md sm:right-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#6ee7b7]">
            Red doméstica 24/7 sin saturación
          </p>
          <p className="font-display text-xs font-bold leading-snug sm:text-base">{ritualNote}</p>
        </div>

        {!touched && (
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse whitespace-nowrap rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-lg sm:bottom-5 sm:px-4 sm:py-2 sm:text-sm">
            ← Arrastra para pasar del Teletrabajo Diurno al Streaming 4K Nocturno →
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 bg-[#071324] px-5 py-4 text-white sm:px-7">
        <span aria-hidden>☀️</span>
        <label className="sr-only" htmlFor="dn-range">
          Hora del día en tu red WiFi doméstica
        </label>
        <input
          id="dn-range"
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => {
            setV(Number(e.target.value));
            setTouched(true);
          }}
          aria-valuetext={`${phase}, ${time}`}
        />
        <span aria-hidden>🌙</span>
      </div>
    </div>
  );
}
