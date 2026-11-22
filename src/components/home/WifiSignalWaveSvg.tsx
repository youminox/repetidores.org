/** SVG animado: propagación electromagnética de las bandas de 2.4 GHz (largo alcance) y 5 GHz / WiFi 6 (alta velocidad Gigabit). Solo corre cuando está en pantalla. */
export default function WifiSignalWaveSvg() {
  const drops = Array.from({ length: 12 }).map((_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return {
      x: 200 + Math.cos(a) * 46,
      y: 210 + Math.sin(a) * 46,
      dx: `${Math.cos(a) * 150}px`,
      dy: `${Math.sin(a) * 150}px`,
      d: `${(i % 6) * 0.65}s`,
      r: 7 + (i % 3) * 2,
    };
  });
  const strands = Array.from({ length: 7 }).map((_, i) => {
    const a = (i / 7) * Math.PI * 2 + 0.3;
    const x1 = 200 + Math.cos(a) * 30,
      y1 = 210 + Math.sin(a) * 30;
    const x2 = 200 + Math.cos(a) * 124,
      y2 = 210 + Math.sin(a) * 124;
    const mx = 200 + Math.cos(a + 0.5) * 82,
      my = 210 + Math.sin(a + 0.5) * 82;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  });

  return (
    <div className="gel-scene relative mx-auto aspect-square w-full max-w-[460px]">
      <svg
        viewBox="0 0 400 420"
        className="h-full w-full"
        role="img"
        aria-label="Ilustración: propagación de ondas WiFi de doble banda 2.4 GHz y 5 GHz con Beamforming y MU-MIMO"
      >
        <defs>
          <filter id="fg-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b" />
            <feColorMatrix
              in="b"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
          <radialGradient id="fg-gel" cx="45%" cy="40%" r="60%">
            <stop offset="0" stopColor="#67e8f9" />
            <stop offset="0.55" stopColor="#0284c7" />
            <stop offset="1" stopColor="#10b981" />
          </radialGradient>
          <radialGradient id="fg-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="1" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="210" r="190" fill="url(#fg-halo)" />
        <circle
          cx="200"
          cy="210"
          r="152"
          fill="none"
          stroke="rgba(16,185,129,0.25)"
          strokeDasharray="4 7"
        />
        <circle
          cx="200"
          cy="210"
          r="116"
          fill="none"
          stroke="rgba(56,189,248,0.28)"
          strokeDasharray="8 6"
        />

        {strands.map((d, i) => (
          <path
            key={i}
            d={d}
            className="fiber-strand"
            fill="none"
            stroke="#38bdf8"
            strokeOpacity="0.75"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}

        <g filter="url(#fg-goo)">
          <circle className="gel-blob" cx="200" cy="210" r="46" fill="url(#fg-gel)" />
          <circle
            className="gel-blob"
            cx="178"
            cy="196"
            r="26"
            fill="#06b6d4"
            style={{ animationDelay: "0.4s" }}
          />
          <circle
            className="gel-blob"
            cx="224"
            cy="226"
            r="24"
            fill="#10b981"
            style={{ animationDelay: "0.9s" }}
          />
          {drops.map((p, i) => (
            <circle
              key={i}
              className="drop"
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="#67e8f9"
              style={{
                ["--dx" as string]: p.dx,
                ["--dy" as string]: p.dy,
                animationDelay: p.d,
              }}
            />
          ))}
        </g>

        <g fontFamily="Inter, sans-serif" fontSize="11.5" fontWeight="700">
          <g transform="translate(12 40)">
            <rect
              width="148"
              height="26"
              rx="13"
              fill="rgba(56,189,248,0.18)"
              stroke="rgba(56,189,248,0.55)"
            />
            <text x="74" y="17" textAnchor="middle" fill="#e0f2fe">
              5 GHz · 1200–2400 Mbps
            </text>
          </g>
          <g transform="translate(238 58)">
            <rect
              width="148"
              height="26"
              rx="13"
              fill="rgba(16,185,129,0.18)"
              stroke="rgba(16,185,129,0.6)"
            />
            <text x="74" y="17" textAnchor="middle" fill="#a7f3d0">
              2.4 GHz · atraviesa muros
            </text>
          </g>
          <g transform="translate(106 372)">
            <rect
              width="188"
              height="26"
              rx="13"
              fill="rgba(2,132,199,0.28)"
              stroke="rgba(103,232,249,0.6)"
            />
            <text x="94" y="17" textAnchor="middle" fill="#bae6fd">
              señal óptima: -50 a -65 dBm
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
