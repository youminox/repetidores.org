import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WifiCoverageAdvisor from "@/components/WifiCoverageAdvisor";
import BlogExplorerClient from "@/components/BlogExplorerClient";
import AdBanner from "@/components/AdBanner";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import ReadingProgress from "@/components/ReadingProgress";
import ClientEffects from "@/components/ClientEffects";
import SplitHeading from "@/components/SplitHeading";
import OpenChatButton from "@/components/OpenChatButton";
import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/home/ScrollStory";
import WifiSignalWaveSvg from "@/components/home/WifiSignalWaveSvg";
import WifiOrbit, { type OrbitItem } from "@/components/home/WifiOrbit";
import WifiCounters, { type CounterItem } from "@/components/home/WifiCounters";
import DayNightSlider from "@/components/home/DayNightSlider";
import MomentsCarousel, { type Moment } from "@/components/home/MomentsCarousel";
import CoverageCalculatorBlock, {
  type WifiTechOption,
} from "@/components/home/CoverageCalculatorBlock";
import { getContextualAmazonProducts } from "@/lib/amazon";
import {
  getAllPosts,
  getFeaturedBuyingGuides,
  getTroubleshootingGuides,
  getTopSeoPosts,
  getPostsByCategory,
  getAllCategories,
  getPostUrl,
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
} from "@/lib/data";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} — Mejores Repetidores WiFi, Guías de Compra, Configuración y Solución de Fallos`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
};

const CLAIMS = [
  "Repetidores WiFi 6 Doble Banda",
  "Sistemas WiFi Mesh Todo el Hogar",
  "2.4 GHz Largo Alcance & 5 GHz Gigabit",
  "Kit PLC Powerline Red Eléctrica",
  "Modo Punto de Acceso (AP) Ethernet",
  "Extensores Exteriores Impermeables IP65",
  "Tecnología Beamforming & MU-MIMO",
  "Seguridad Cifrada WPA3 Personal",
];

const CLAIMS_2 = [
  "Solución a Conectado sin Acceso a Internet",
  "Ubicación en el Punto Intermedio (-60 dBm)",
  "Orientación Óptima de Antenas Externas",
  "Configuración Guiada con y sin WPS",
  "Cobertura para Casas de 2 y 3 Pisos",
  "Especial Paredes Gruesas de Hormigón",
  "Streaming 4K y Gaming sin Latencia",
  "Detección de Intrusos en tu Red WiFi",
];

const HOME_FAQS = [
  {
    q: "¿Dónde se debe colocar un repetidor WiFi para que funcione al 100%?",
    a: "La regla técnica fundamental es colocar el repetidor en el punto intermedio exacto entre tu router principal y la zona sin cobertura, donde el repetidor aún reciba al menos un 60%–70% de intensidad de señal (entre -55 dBm y -65 dBm). Nunca lo enchufes dentro de la habitación que ya no tiene señal ni detrás de muebles metálicos, espejos o microondas.",
  },
  {
    q: "¿Qué es mejor comprar: un repetidor WiFi de doble banda, un sistema Mesh o un PLC Powerline?",
    a: "Un repetidor WiFi de doble banda (AC1200 o WiFi 6 AX1500/AX3000) es la solución más económica y rápida para pisos de 70 a 130 m² con 1 o 2 habitaciones débiles. Si vives en una casa de 2 o 3 pisos o más de 160 m², un sistema WiFi Mesh de 2 o 3 nodos crea una red única sin cortes al caminar. Y si tienes muros muy gruesos de hormigón o un sótano donde las ondas de radio no pasan, un Kit PLC Powerline transmite el internet por los cables eléctricos con máxima estabilidad.",
  },
  {
    q: "¿Cómo funciona el Asesor Técnico IA WiFi de Repetidores.org?",
    a: "Haz clic en el botón flotante 'Asesor IA WiFi' en cualquier momento y pregúntale qué repetidor o sistema Mesh comprar en Amazon según los metros cuadrados de tu casa, cómo solucionar el fallo 'conectado pero sin acceso a internet', cómo configurar tu extensor con o sin botón WPS o cómo orientar las antenas. Te responderá al instante con pasos exactos, enlaces a nuestras 809 guías y recomendaciones de compra.",
  },
  {
    q: "¿Por qué mi repetidor WiFi dice 'Conectado pero sin acceso a internet' y cómo se arregla?",
    a: "Este error suele ocurrir por tres causas: un conflicto de dirección IP o servidor DHCP entre el router y el repetidor, haber introducido una contraseña WiFi errónea al vincularlo, o que el repetidor está demasiado lejos del router principal. Reiniciar el router y el repetidor, actualizar su configuración desde el panel web (192.168.0.254 / tplinkrepeater.net) o acercarlo un enchufe hacia el router resuelve el 95% de los casos.",
  },
  {
    q: "¿Cuál es la diferencia entre la banda de 2.4 GHz y la banda de 5 GHz en un repetidor?",
    a: "La banda de 2.4 GHz utiliza ondas más largas que atraviesan mejor las paredes de ladrillo y llegan más lejos, ofreciendo velocidades de 100 a 300 Mbps. La banda de 5 GHz ofrece velocidades ultrarrápidas de 867 a 2400 Mbps y mínima interferencia para Smart TV 4K, videollamadas y consolas, aunque tiene menor alcance físico ante obstáculos.",
  },
  {
    q: "¿Cómo se deben colocar las antenas de un repetidor WiFi para cubrir uno o dos pisos?",
    a: "Si tu vivienda es de una sola planta, coloca las antenas del repetidor completamente en vertical (90° respecto al suelo) para que la onda se expanda en horizontal por todas las habitaciones. Si necesitas enviar señal del primer al segundo piso, coloca una antena en vertical y la otra en horizontal o inclinada a 45° para radiar en ambos planos.",
  },
];

const CATEGORY_ICONS: Record<string, string> = {
  guias: "🏆",
  seguridad: "🔒",
  "problemas-y-soluciones": "🛠️",
  configuracion: "⚙️",
  curiosidades: "📡",
  usos: "🏠",
  historia: "🌐",
  resenas: "🔬",
  trucos: "⚡",
};

export default function HomePage() {
  const allPosts = getAllPosts();
  const buyingGuides = getFeaturedBuyingGuides(6);
  const troubleshootingGuides = getTroubleshootingGuides(6);
  const topSeoPosts = getTopSeoPosts(9);
  const categories = getAllCategories();
  const homeAmazon = getContextualAmazonProducts(
    "home-repetidores",
    "guias",
    "Mejores Repetidores WiFi 6 Sistemas Mesh y PLC Powerline"
  );

  const explorerPosts = [
    ...buyingGuides,
    ...troubleshootingGuides,
    ...topSeoPosts,
    ...getPostsByCategory("guias").slice(0, 8),
    ...getPostsByCategory("problemas-y-soluciones").slice(0, 8),
    ...getPostsByCategory("configuracion").slice(0, 8),
    ...getPostsByCategory("seguridad").slice(0, 8),
    ...getPostsByCategory("curiosidades").slice(0, 6),
    ...getPostsByCategory("usos").slice(0, 6),
    ...getPostsByCategory("trucos").slice(0, 5),
    ...getPostsByCategory("resenas").slice(0, 5),
  ].filter(
    (post, index, self) => self.findIndex((p) => p.id === post.id) === index
  );

  const orbit: OrbitItem[] = [
    {
      k: "ubicacion-optima",
      name: "Ubicación en Punto Intermedio",
      img: "/images/Mejores-lugares-para-poner-un-repetidor-WiFi-en-casa.jpg",
      role: "El secreto de los -60 dBm para no perder velocidad",
      d: "Colocar el repetidor a mitad de camino entre el router y la zona muerta (a 1–1.5 m del suelo y lejos de microondas o espejos) duplica el caudal real de megas.",
      href: "/trucos/mejores-lugares-para-poner-un-repetidor-wifi-en-casa/",
    },
    {
      k: "antenas-orientacion",
      name: "Orientación de Antenas (90° y 45°)",
      img: "/images/Como-colocar-las-antenas-de-un-repetidor-WiFi.jpg",
      role: "Polarización horizontal y vertical entre plantas",
      d: "Las antenas omnidireccionales emiten en forma de donut perpendicular a su eje: verticales para cubrir un piso, y en ángulo L o 45° para subir señal al segundo piso.",
      href: "/curiosidades/como-colocar-las-antenas-de-un-repetidor-wifi/",
    },
    {
      k: "mesh-vs-repetidor",
      name: "Repetidor vs. Sistema Mesh",
      img: "/images/Comparativa-entre-repetidores-de-senal-y-sistemas-mesh.jpg",
      role: "Extensión puntual vs. Roaming inteligente 802.11k/v/r",
      d: "Mientras que un repetidor es ideal para ampliar 1 o 2 habitaciones, un sistema Mesh de 2–3 nodos crea una malla única en casas grandes sin desconexiones al caminar.",
      href: "/guias/comparativa-entre-repetidores-de-senal-y-sistemas-mesh/",
    },
    {
      k: "doble-banda",
      name: "Doble Banda 2.4 GHz & 5 GHz",
      img: "/images/Repetidores-con-doble-banda-ventajas-y-modelos-sugeridos.jpg",
      role: "Alcance a través de muros + Velocidad Gigabit",
      d: "Los repetidores Dual-Band y WiFi 6 combinan 2.4 GHz para atravesar tabiques lejanos y 5 GHz para streaming 4K, videollamadas y descargas de alta velocidad.",
      href: "/guias/repetidores-con-doble-banda-ventajas-y-modelos-sugeridos/",
    },
    {
      k: "modo-ap-ethernet",
      name: "Puerto Gigabit & Modo AP",
      img: "/images/Configurar-repetidor-en-modo-punto-de-acceso.jpg",
      role: "0% pérdida de velocidad conectado por cable RJ45",
      d: "Si llevas un cable Ethernet desde tu router al repetidor y lo configuras en Modo Punto de Acceso (AP), obtienes el 100% de la velocidad de tu fibra óptica.",
      href: "/configuracion/configurar-repetidor-en-modo-punto-de-acceso/",
    },
    {
      k: "configuracion-wps",
      name: "Configuración Web / App vs. WPS",
      img: "/images/Como-usar-WPS-para-vincular-repetidor-y-router.jpg",
      role: "Vinculación limpia en 2 minutos con cualquier operadora",
      d: "Aprende cuándo usar el botón físico WPS para emparejar en segundos y cuándo configurar por navegador o App móvil para fijar canal e IP sin errores.",
      href: "/configuracion/como-usar-wps-para-vincular-repetidor-y-router/",
    },
    {
      k: "sin-internet",
      name: "Solución a 'Conectado sin Internet'",
      img: "/images/Repetidor-conectado-pero-sin-acceso-a-internet.jpg",
      role: "76 manuales de diagnóstico de DHCP, IP y DNS",
      d: "Resolvemos el fallo más común en repetidores WiFi: conflictos de puerta de enlace, pérdida de enlace con la banda de 5 GHz, luces rojas y microcortes.",
      href: "/problemas-y-soluciones/repetidor-conectado-pero-sin-acceso-a-internet/",
    },
    {
      k: "seguridad-wpa3",
      name: "Seguridad WPA3 & Anti-Intrusos",
      img: "/images/Como-proteger-tu-red-WiFi-con-repetidores.jpg",
      role: "91 guías de cifrado, filtrado MAC y blindaje doméstico",
      d: "Detecta quién está conectado a tu repetidor sin permiso, desactiva el PIN WPS vulnerable y blinda tu red con WPA3/WPA2-AES y lista blanca MAC.",
      href: "/seguridad/como-proteger-tu-red-wifi-con-repetidores/",
    },
  ];

  const counters: CounterItem[] = [
    {
      v: allPosts.length,
      dec: 0,
      u: "guías",
      l: "Enciclopedia Total WiFi",
      pct: 100,
      note: "Comparativas, configuración, fallos y seguridad",
    },
    {
      v: 498,
      dec: 0,
      u: "comparativas",
      l: "Guías de Compra WiFi",
      pct: 96,
      note: "Repetidores Doble Banda, WiFi 6, Mesh y PLC",
    },
    {
      v: 91,
      dec: 0,
      u: "manuales",
      l: "Seguridad y Red Doméstica",
      pct: 88,
      note: "Cifrado WPA3, filtrado MAC y anti-intrusos",
    },
    {
      v: 76,
      dec: 0,
      u: "soluciones",
      l: "Diagnóstico de Fallos",
      pct: 86,
      note: "Conectado sin internet, baja velocidad y WPS",
    },
    {
      v: 59,
      dec: 0,
      u: "tutoriales",
      l: "Configuración Paso a Paso",
      pct: 84,
      note: "Modo Punto de Acceso (AP), 5 GHz y paneles IP",
    },
    {
      v: 85,
      dec: 0,
      u: "artículos",
      l: "Trucos, Usos y Reseñas",
      pct: 85,
      note: "Orientación de antenas, casas de 2 pisos y gaming",
    },
  ];

  const moments: Moment[] = [
    {
      img: "/images/Mejores-lugares-para-poner-un-repetidor-WiFi-en-casa.jpg",
      t: "Mejores Lugares para tu Repetidor",
      d: "Dónde enchufarlo exactamente y qué objetos de tu casa absorben o bloquean las ondas WiFi.",
      href: "/trucos/mejores-lugares-para-poner-un-repetidor-wifi-en-casa/",
      alt: "Los mejores lugares para poner un repetidor WiFi en casa",
      tag: "Power Page #1",
    },
    {
      img: "/images/Repetidor-conectado-pero-sin-acceso-a-internet.jpg",
      t: "Conectado pero sin Internet",
      d: "Pasos definitivos para reparar conflictos de IP, DHCP y DNS cuando tu repetidor tiene señal pero no navega.",
      href: "/problemas-y-soluciones/repetidor-conectado-pero-sin-acceso-a-internet/",
      alt: "Repetidor conectado pero sin acceso a internet soluciones",
      tag: "Fallo #1 Resuelto",
    },
    {
      img: "/images/Comparativa-entre-repetidores-de-senal-y-sistemas-mesh.jpg",
      t: "Repetidor WiFi vs. Sistema Mesh",
      d: "Comparativa técnica de alcance, roaming sin cortes, velocidad real y presupuesto según tu vivienda.",
      href: "/guias/comparativa-entre-repetidores-de-senal-y-sistemas-mesh/",
      alt: "Comparativa entre repetidores de señal y sistemas Mesh",
      tag: "Guía de Compra",
    },
    {
      img: "/images/Como-colocar-las-antenas-de-un-repetidor-WiFi.jpg",
      t: "Cómo Orientar las Antenas",
      d: "Ángulos exactos (90° vertical vs. 45° oblicuo) para cubrir un piso completo o enviar señal a la planta alta.",
      href: "/curiosidades/como-colocar-las-antenas-de-un-repetidor-wifi/",
      alt: "Cómo colocar las antenas de un repetidor WiFi",
      tag: "Optimización",
    },
    {
      img: "/images/La-velocidad-baja-mucho-cuando-uso-el-repetidor.jpg",
      t: "¿La Velocidad Baja con el Repetidor?",
      d: "Cómo evitar la pérdida del 50% de ancho de banda usando Cross-Band, canal de 5 GHz o Modo Punto de Acceso.",
      href: "/problemas-y-soluciones/la-velocidad-baja-mucho-cuando-uso-el-repetidor/",
      alt: "Soluciones cuando la velocidad baja mucho con el repetidor",
      tag: "Velocidad Máxima",
    },
    {
      img: "/images/Repetidores-recomendados-para-oficinas-con-paredes-gruesas.jpg",
      t: "Especial Paredes Gruesas y 2 Pisos",
      d: "Qué tecnología atraviesa mejor los muros de ladrillo y hormigón armado sin microcortes.",
      href: "/guias/repetidores-recomendados-para-oficinas-con-paredes-gruesas/",
      alt: "Repetidores recomendados para oficinas y casas con paredes gruesas",
      tag: "Muros Gruesos",
    },
    {
      img: "/images/Como-proteger-tu-red-WiFi-con-repetidores.jpg",
      t: "Blindaje WiFi y Anti-Intrusos",
      d: "Cómo detectar si un vecino usa tu repetidor sin permiso y configurar WPA3 y filtrado MAC.",
      href: "/seguridad/como-proteger-tu-red-wifi-con-repetidores/",
      alt: "Cómo proteger tu red WiFi con repetidores",
      tag: "Seguridad WiFi",
    },
  ];

  const wifiTechOptions: WifiTechOption[] = [
    {
      key: "repetidor-wifi6",
      label: "Repetidor WiFi 6 Doble Banda",
      tier: "Ideal para Pisos de 70 a 140 m² y 1–2 Habitaciones · Plug & Play",
      maxMbps: 1500,
      bandSpec: "WiFi 6 AX1500/AX3000 · 5 GHz (1200 Mbps) + 2.4 GHz (300 Mbps) + Puerto Gigabit",
      coveragePerNodeM2: 120,
      img: "/images/Repetidores-con-doble-banda-ventajas-y-modelos-sugeridos.jpg",
      alt: "Repetidor WiFi 6 de doble banda con puerto Gigabit Ethernet",
      desc: "La solución más rápida y rentable para eliminar zonas sin señal en el dormitorio, estudio o terraza: se enchufa en el punto intermedio y amplifica ambas bandas en 2 minutos.",
      components: "TP-Link RE505X / RE700X WiFi 6 o TP-Link RE330 AC1200 Doble Banda.",
      href: "/guias/repetidores-con-doble-banda-ventajas-y-modelos-sugeridos/",
    },
    {
      key: "mesh-wifi6",
      label: "Sistema WiFi Mesh (2–3 Nodos)",
      tier: "Cobertura Total para Casas Grandes (150–350 m²) y 2 o 3 Plantas",
      maxMbps: 3000,
      bandSpec: "Malla Inteligente 802.11k/v/r · Un Solo Nombre WiFi · Roaming Sin Cortes",
      coveragePerNodeM2: 145,
      img: "/images/Comparativa-entre-repetidores-de-senal-y-sistemas-mesh.jpg",
      alt: "Sistema WiFi Mesh para casas grandes de varias plantas",
      desc: "Reemplaza o extiende tu router creando una red única en toda la vivienda: tus móviles y laptops saltan automáticamente al nodo más cercano sin cortar videollamadas ni juegos.",
      components: "Pack de 2 o 3 Nodos TP-Link Deco X50 WiFi 6 / Deco M4 Gigabit.",
      href: "/guias/comparativa-entre-repetidores-de-senal-y-sistemas-mesh/",
    },
    {
      key: "plc-powerline",
      label: "Kit PLC Powerline + WiFi",
      tier: "Máxima Penetración contra Muros de Hormigón, Sótanos y Plantas Lejanas",
      maxMbps: 1200,
      bandSpec: "Transmisión por Red Eléctrica AV1000 + Punto WiFi AC1200 + LAN Gigabit",
      coveragePerNodeM2: 135,
      img: "/images/Repetidores-recomendados-para-oficinas-con-paredes-gruesas.jpg",
      alt: "Kit PLC Powerline WiFi para atravesar paredes gruesas",
      desc: "Cuando las paredes son tan gruesas que bloquean las ondas de radio, el PLC viaja por el cableado eléctrico de tu casa y crea una red WiFi nueva a máxima velocidad al otro extremo.",
      components: "Kit PLC WiFi TP-Link TL-WPA7617 AV1000 Gigabit con Enchufe Integrado.",
      href: "/guias/repetidores-recomendados-para-oficinas-con-paredes-gruesas/",
    },
  ];

  const bentoOrder = [
    "guias",
    "problemas-y-soluciones",
    "seguridad",
    "configuracion",
    "curiosidades",
    "usos",
  ];
  const bentoCats = bentoOrder
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

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
      <ReadingProgress />
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        {/* 1–2. Hero 3D con Partículas WiFi, Buscador Instantáneo y Escenario Tilt */}
        <Hero totalPosts={allPosts.length} totalCategories={categories.length} />

        {/* 3. Doble Cinta Marquee de Tecnologías WiFi y Soluciones */}
        <div className="relative border-b border-[var(--line)] bg-white py-5">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track font-display text-lg font-bold text-slate-900/85"
                aria-hidden={k === 1}
              >
                {CLAIMS.map((t) => (
                  <span key={t} className="flex items-center gap-3 whitespace-nowrap">
                    <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-to-br from-[#38bdf8] to-[#0284c7]" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee reverse mt-3" aria-hidden>
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track text-sm font-semibold uppercase tracking-[0.14em] text-[#0369a1]/80"
              >
                {CLAIMS_2.map((t) => (
                  <span key={t} className="flex items-center gap-3 whitespace-nowrap">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4. ¿Qué es Repetidores.org? + Mosaico Spotlight */}
        <section id="que-es" className="wrap py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Ingeniería de redes y conectividad doméstica
              </span>
              <SplitHeading
                text="Los repetidores WiFi y redes Mesh,"
                accent={{
                  text: "explicados con pruebas reales",
                  className: "text-[#0284c7]",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                <strong className="text-slate-900">Repetidores.org</strong> es la enciclopedia
                técnica en español dedicada a optimizar tu conexión inalámbrica. Reunimos{" "}
                <strong className="text-slate-900">
                  {allPosts.length.toLocaleString("es-PE")} comparativas de compra, tutoriales de
                  configuración y guías de diagnóstico paso a paso
                </strong>{" "}
                para que elijas el extensor o sistema Mesh ideal, elimines el error{" "}
                <em>&ldquo;conectado pero sin acceso a internet&rdquo;</em> y lleves el 100% de tu
                fibra hasta el último rincón de tu casa.
              </p>
              <div
                className="mt-6 rounded-2xl border border-sky-300/70 bg-sky-50/80 p-5"
                data-reveal
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0369a1]">
                  📡 Lo que encontrarás en nuestra enciclopedia técnica
                </p>
                <ul className="mt-2 space-y-1.5 text-[0.95rem] text-slate-900">
                  <li className="relative pl-4">
                    <span className="absolute left-0 top-0 font-bold text-[#0284c7]">•</span>
                    498 comparativas y guías de compra de repetidores doble banda, WiFi 6, sistemas
                    Mesh, PLC Powerline y extensores de exterior IP65.
                  </li>
                  <li className="relative pl-4">
                    <span className="absolute left-0 top-0 font-bold text-[#0284c7]">•</span>
                    226 manuales prácticos de configuración (con y sin WPS, Modo Punto de Acceso,
                    5 GHz), solución de fallos y seguridad WPA3 contra intrusos.
                  </li>
                  <li className="relative pl-4">
                    <span className="absolute left-0 top-0 font-bold text-[#0284c7]">•</span>
                    Asesor Técnico IA WiFi en tiempo real entrenado con nuestras 809 guías para
                    diagnosticar tu red y recomendarte el equipo exacto en Amazon.
                  </li>
                </ul>
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link href="/guias/" className="btn btn-ghost" data-magnetic>
                  Explorar 498 Guías de Compra WiFi
                </Link>
                <Link href="/problemas-y-soluciones/" className="btn btn-ghost" data-magnetic>
                  Ver 76 Soluciones a Fallos de Red
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative col-span-2 aspect-[16/8] overflow-hidden rounded-3xl shadow-[0_30px_60px_-35px_rgba(7,19,36,0.65)]"
                data-reveal
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/Comparativa-entre-repetidores-de-senal-y-sistemas-mesh.jpg"
                  alt="Comparativa técnica entre repetidores de señal WiFi y sistemas Mesh"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0369a1]">
                  Doble Banda 2.4 & 5 GHz · WiFi 6 · Mesh & PLC
                </span>
              </div>
              {[
                [
                  "🏆",
                  "Comparativas por Vivienda",
                  "Qué equipo elegir para pisos, casas de 2–3 plantas, paredes gruesas o jardines.",
                ],
                [
                  "📐",
                  "Ubicación y Antenas",
                  "La regla del punto intermedio (-60 dBm) y ángulos exactos de radiación.",
                ],
                [
                  "🛠️",
                  "Diagnóstico sin Cortes",
                  "Soluciones definitivas cuando el repetidor no da internet o baja la velocidad.",
                ],
                [
                  "🔒",
                  "Red Doméstica Blindada",
                  "Cifrado WPA3, detección de intrusos, filtrado MAC y desactivación de PIN WPS.",
                ],
              ].map(([e, t, d], i) => (
                <div
                  key={t}
                  className="card spot p-5"
                  data-reveal
                  data-reveal-delay={String(i)}
                >
                  <p className="text-2xl" aria-hidden>
                    {e}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold leading-tight text-slate-900">
                    {t}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Historia fijada GSAP: de la zona muerta al WiFi en toda la casa */}
        <ScrollStory />

        {/* 6. Física de las ondas WiFi 2.4 GHz vs 5 GHz (SVG animado) */}
        <section className="relative isolate overflow-hidden bg-[#071324] py-24 text-white">
          <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-[#0284c7]/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[#10b981]/25 blur-3xl" />
          <div className="hero-grid opacity-50" />
          <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="eyebrow !text-[#67e8f9]" data-reveal>
                Física de radiofrecuencia, sin humo
              </span>
              <SplitHeading
                text="Cómo interactúan las bandas de"
                accent={{
                  text: "2.4 GHz y 5 GHz con tus paredes",
                  className: "text-gradient",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-white/80" data-reveal>
                La onda de <strong className="text-white">2.4 GHz</strong> tiene una longitud de
                onda de <strong>12.5 cm</strong> que atraviesa tabiques de ladrillo y puertas
                cerradas con menor pérdida, mientras que la banda de{" "}
                <strong className="text-white">5 GHz / WiFi 6 (longitud de 6 cm)</strong> ofrece
                canales anchos de <strong>80 y 160 MHz</strong> capaces de superar{" "}
                <strong>1.200 Mbps</strong> sin interferencias de electrodomésticos.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3" data-reveal>
                {[
                  ["📶", "2.4 GHz · Alcance"],
                  ["⚡", "5 GHz · Gigabit"],
                  ["🎯", "Beamforming & MIMO"],
                ].map(([e, t]) => (
                  <div key={t} className="glass p-4 text-center">
                    <p className="text-2xl" aria-hidden>
                      {e}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{t}</p>
                  </div>
                ))}
              </div>
              <div className="glass mt-6 p-5 text-sm text-white/80" data-reveal>
                <strong className="text-[#6ee7b7]">Regla de ingeniería inalámbrica:</strong> activa
                el modo <strong>Cross-Band / Alta Velocidad</strong> en tu repetidor para que se
                comunique con el router por la banda de <strong>5 GHz</strong> y distribuya a tus
                dispositivos en <strong>2.4 GHz</strong> (o viceversa), evitando perder el 50% del
                caudal.
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/guias/repetidores-con-doble-banda-ventajas-y-modelos-sugeridos/"
                  className="btn btn-glass"
                  data-magnetic
                >
                  Ventajas de los repetidores Doble Banda
                </Link>
                <Link
                  href="/configuracion/conectar-repetidor-a-una-red-de-5-ghz-paso-a-paso/"
                  className="btn btn-glass"
                  data-magnetic
                >
                  Cómo vincular la red de 5 GHz
                </Link>
              </div>
            </div>
            <div data-reveal>
              <WifiSignalWaveSvg />
            </div>
          </div>
        </section>

        {/* 7. Órbita interactiva de componentes y soluciones WiFi */}
        <section className="wrap py-24">
          <WifiOrbit
            items={orbit}
            center="/images/Mejores-lugares-para-poner-un-repetidor-WiFi-en-casa.jpg"
          />
          <p className="mt-10 text-center text-sm text-[var(--muted)]">
            ¿Buscas una guía para un modelo, fallo o configuración específica?{" "}
            <Link href="#explorador" className="font-bold text-[#0284c7] underline">
              Explorar el buscador interactivo de las {allPosts.length.toLocaleString("es-PE")}{" "}
              guías →
            </Link>
          </p>
        </section>

        {/* 8. Contadores animados y Tabla Oficial de Bandas y Niveles de Señal (dBm) */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#071324] via-[#0b1d36] to-[#042f4b] py-24 text-white">
          <div className="hero-aurora opacity-40" />
          <div className="wrap relative grid items-start gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="eyebrow !text-[#67e8f9]" data-reveal>
                La enciclopedia WiFi en números reales
              </span>
              <SplitHeading
                text="Nuestro archivo técnico de conectividad,"
                accent={{ text: "cifra por cifra", className: "text-gradient" }}
                className="section-title mt-3"
              />
              <p className="mt-4 max-w-xl text-white/75" data-reveal>
                Desde la elección de tu primer extensor de rango o sistema Mesh hasta el blindaje
                criptográfico WPA3, orientación de antenas y solución de caídas de red.
              </p>
              <div className="mt-8">
                <WifiCounters data={counters} />
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/guias/diferencias-clave-entre-router-repetidor-y-amplificador-wi-fi/"
                  className="btn btn-glass"
                  data-magnetic
                >
                  Diferencias Router vs. Repetidor vs. Amplificador
                </Link>
                <Link
                  href="/configuracion/como-configurar-un-repetidor-con-tu-router-principal/"
                  className="btn btn-glass"
                  data-magnetic
                >
                  Guía Maestra de Configuración
                </Link>
              </div>
            </div>

            <div
              className="mx-auto w-full max-w-[440px] rounded-3xl bg-white p-6 text-slate-900 shadow-2xl"
              data-reveal
            >
              <div className="border-b-4 border-slate-900 pb-3">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#0284c7]">
                  Referencia Rápida de Conectividad
                </p>
                <h3 className="font-display text-3xl font-extrabold leading-tight">
                  Tabla Oficial WiFi & dBm
                </h3>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Parámetros verificados de frecuencia, velocidad real y nivel de señal óptimo
                </p>
              </div>
              <dl className="mt-4 divide-y divide-slate-200 text-sm">
                {[
                  [
                    "🟢 Señal Ideal para Enchufar",
                    "-50 a -65 dBm",
                    "Punto intermedio exacto con 3–4 barras del router",
                  ],
                  [
                    "📶 Banda 2.4 GHz (802.11n/ax)",
                    "300–574 Mbps",
                    "Canales 1, 6 y 11 · Máxima penetración en muros",
                  ],
                  [
                    "⚡ Banda 5 GHz (WiFi 5 / WiFi 6)",
                    "867–2400 Mbps",
                    "Canales 36–48 · Streaming 4K y Gaming sin lag",
                  ],
                  [
                    "🏠 Sistema WiFi Mesh (2–3 Nodos)",
                    "180–550 m²",
                    "Roaming 802.11k/v/r · 1 sola red en 2–3 plantas",
                  ],
                  [
                    "🧱 Kit PLC Powerline AV1000",
                    "Hasta 1000 Mbps",
                    "Viaja por el cable eléctrico · Ignora paredes gruesas",
                  ],
                ].map(([k, v, sub]) => (
                  <div key={k} className="py-3 flex items-center justify-between gap-3">
                    <div>
                      <dt className="font-bold text-slate-900">{k}</dt>
                      <dd className="text-xs text-[var(--muted)]">{sub}</dd>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#f0f9ff] border border-sky-300/80 px-3 py-1 font-extrabold text-xs text-[#0369a1]">
                      {v}
                    </span>
                  </div>
                ))}
              </dl>
              <div className="mt-4 rounded-2xl bg-sky-50 p-3.5 text-xs text-[#0369a1]">
                <strong>Regla anti-saturación:</strong> si recibes menos de{" "}
                <strong>-75 dBm</strong> en el enchufe elegido, acércalo un metro más hacia el
                router principal o utiliza un enlace por cable Ethernet (Modo AP) o Kit PLC.
              </div>
            </div>
          </div>
        </section>

        {/* 9. Escena Día ↔ Noche: del teletrabajo diurno al streaming 4K nocturno */}
        <section className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Conectividad estable las 24 horas
              </span>
              <SplitHeading
                text="Del teletrabajo diurno al streaming 4K nocturno,"
                accent={{
                  text: "tu red nunca se satura",
                  className: "text-[#0284c7]",
                }}
                className="section-title mt-3"
              />
            </div>
            <p className="text-lg text-[var(--muted)]" data-reveal>
              Arrastra la escena para ver cómo responde una red bien dimensionada a lo largo del
              día. De mañana sostiene videollamadas en el estudio; de noche alimenta Smart TVs 4K,
              consolas y más de 20 dispositivos con{" "}
              <strong className="text-slate-900">
                doble banda activa, MU-MIMO y seguridad WPA3
              </strong>
              .
            </p>
          </div>

          <div data-reveal>
            <DayNightSlider />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              [
                "1. Ubicación Estratégica",
                "Punto intermedio a -60 dBm lejos de espejos y electrodomésticos",
                "/images/Mejores-lugares-para-poner-un-repetidor-WiFi-en-casa.jpg",
                "/trucos/mejores-lugares-para-poner-un-repetidor-wifi-en-casa/",
              ],
              [
                "2. Modo Punto de Acceso (AP)",
                "Conecta por cable Ethernet para obtener el 100% de tus megas",
                "/images/Configurar-repetidor-en-modo-punto-de-acceso.jpg",
                "/configuracion/configurar-repetidor-en-modo-punto-de-acceso/",
              ],
              [
                "3. Blindaje contra Intrusos",
                "Detecta dispositivos desconocidos y protege tu repetidor",
                "/images/Como-detectar-si-alguien-usa-tu-repetidor-sin-permiso.jpg",
                "/seguridad/como-detectar-si-alguien-usa-tu-repetidor-sin-permiso/",
              ],
            ].map(([t, d, src, href], i) => (
              <Link
                key={t}
                href={href}
                className="card spot overflow-hidden group"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={t}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-4 p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#071324] font-display font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold leading-tight group-hover:text-[#0284c7] transition-colors">
                      {t}
                    </p>
                    <p className="text-sm text-[var(--muted)]">{d}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 10. Carrusel Horizontal 4:5 de Soluciones y Guías Más Consultadas */}
        <section className="overflow-hidden bg-[#f0f9ff] py-24 border-y border-[var(--line)]">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Las guías más consultadas en español
              </span>
              <SplitHeading
                text="Soluciones técnicas y"
                accent={{ text: "comparativas reales de cobertura", className: "text-[#0369a1]" }}
                className="section-title mt-3"
              />
            </div>
            <MomentsCarousel items={moments} />
          </div>
        </section>

        {/* 11. Simulador de Cobertura por m² + Diagnosticador Interactivo */}
        <section id="planificador" className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Calculadora de Cobertura WiFi y Ancho de Banda
              </span>
              <SplitHeading
                text="Elige tu tecnología WiFi."
                accent={{
                  text: "Calcula tu velocidad real por m².",
                  className: "text-[#0284c7]",
                }}
                className="section-title mt-3"
              />
            </div>
            <ul className="grid gap-2 text-[var(--muted)] text-sm" data-reveal>
              {[
                "Cálculo según superficie real (50 m² a 350 m²) y atenuación por tabiques",
                "Comparación directa entre Repetidor WiFi 6, Sistema Mesh y Kit PLC Powerline",
                "Modelos recomendados en Amazon con envío rápido en España, EE. UU. y LATAM",
                "Diagnóstico interactivo en 2 clics para encontrar tu guía exacta",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sky-100 text-xs font-bold text-[#0369a1]">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <CoverageCalculatorBlock options={wifiTechOptions} />
          </div>

          <div className="mt-14" data-reveal>
            <WifiCoverageAdvisor />
          </div>
        </section>

        {/* Top Leaderboard AdSense Unit */}
        <div className="wrap">
          <AdBanner className="my-4" />
        </div>

        {/* 12. Bento Grid de las 9 Categorías + Vitrina Amazon + Power Pages + Explorador */}
        <section className="bg-gradient-to-b from-white via-[#f0f9ff]/60 to-white py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Biblioteca técnica organizada por pilares
              </span>
              <SplitHeading
                text="Todo sobre repetidores WiFi,"
                accent={{
                  text: "ordenado por especialidad",
                  className: "text-[#0369a1]",
                }}
                className="section-title mt-3"
              />
            </div>

            <div className="grid auto-rows-[minmax(195px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4">
              {bentoCats.map((c, i) => {
                const catPosts = getPostsByCategory(c.slug);
                const big = i === 0;
                const wide = i === 1 || i === 4 || i === 5;
                return (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/`}
                    className={`card spot group flex flex-col p-7 ${
                      big
                        ? "spot-dark border-transparent bg-gradient-to-br from-[#071324] via-[#0369a1] to-[#0284c7] text-white md:col-span-2 lg:row-span-2"
                        : ""
                    } ${wide ? "lg:col-span-2" : ""}`}
                    data-reveal
                    data-reveal-delay={String(i % 4)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${
                          big ? "bg-white/15" : "bg-sky-50 border border-sky-200/60"
                        }`}
                        aria-hidden
                      >
                        {CATEGORY_ICONS[c.slug] || "📡"}
                      </span>
                      <span
                        className={`text-xs font-extrabold uppercase tracking-wider ${
                          big ? "text-[#67e8f9]" : "text-[#0284c7]"
                        }`}
                      >
                        {c.count} guías
                      </span>
                    </div>
                    <h3
                      className={`mt-5 font-display font-extrabold ${
                        big ? "text-3xl sm:text-4xl" : "text-2xl text-slate-900"
                      }`}
                    >
                      {c.name}
                    </h3>
                    <p className={`mt-2 text-sm ${big ? "text-white/80" : "text-[var(--muted)]"}`}>
                      {c.description}
                    </p>
                    {big && (
                      <ul className="mt-6 space-y-2 text-sm text-white/90">
                        {catPosts.slice(0, 5).map((a) => (
                          <li key={a.id} className="truncate">
                            → {a.title}
                          </li>
                        ))}
                      </ul>
                    )}
                    {i === 1 && (
                      <p className="mt-4 font-display text-3xl font-extrabold text-[#0284c7]">
                        Diagnóstico WiFi{" "}
                        <span className="text-sm font-bold text-[var(--muted)]">
                          · Sin Internet · Baja Velocidad · WPS · Panel IP
                        </span>
                      </p>
                    )}
                    <span
                      className={`mt-auto pt-5 font-bold text-sm ${
                        big ? "text-[#67e8f9]" : "text-[#0284c7]"
                      }`}
                    >
                      Explorar categoría →
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Todas las 9 categorías en chips rápidos */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5" data-reveal>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}/`}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-2xs transition hover:border-[#0284c7] hover:text-[#0284c7]"
                >
                  <span>{CATEGORY_ICONS[cat.slug] || "📡"}</span>
                  <span>{cat.name}</span>
                  <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-extrabold text-[#0369a1]">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>

            {/* Vitrina Amazon Affiliate Box en la Home */}
            <div className="mt-14" data-reveal>
              <AmazonAffiliateBox
                variant="showcase"
                sectionTitle={homeAmazon.sectionTitle}
                sectionSubtitle={homeAmazon.sectionSubtitle}
                products={homeAmazon.products}
              />
            </div>

            {/* Power Pages: Lo Más Consultado en Google */}
            <div className="mt-16">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <span className="eyebrow" data-reveal>
                    Power Pages · Top Rankings
                  </span>
                  <h3
                    className="font-display text-2xl font-extrabold sm:text-3xl mt-1 text-slate-900"
                    data-reveal
                  >
                    Las Guías de Repetidores WiFi Más Consultadas en Hispanoamérica
                  </h3>
                </div>
                <Link
                  href="/guias/"
                  className="text-sm font-bold text-[#0284c7] hover:underline"
                >
                  Ver las 498 guías de compra →
                </Link>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {topSeoPosts.map((post, idx) => (
                  <Link
                    key={post.id}
                    href={getPostUrl(post)}
                    className="card spot group flex items-start gap-4 p-5"
                    data-reveal
                    data-reveal-delay={String(idx % 3)}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0284c7] to-[#071324] font-display text-sm font-black text-white shadow-sm">
                      0{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0284c7]">
                        {post.categoryName} · ⏱️ {post.readTime}
                      </span>
                      <h4 className="mt-1 font-display text-base font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Explorador Interactivo con Pestañas y Buscador */}
            <div id="explorador" className="mt-20">
              <BlogExplorerClient initialPosts={explorerPosts} categories={categories} />
            </div>
          </div>
        </section>

        {/* 13. Criterio Técnico y Dirección Editorial (E-E-A-T Charlie Lingán) */}
        <section className="wrap py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Rigor técnico y pruebas de conectividad
              </span>
              <SplitHeading
                text="Mediciones reales en dBm,"
                accent={{
                  text: "no promesas de caja",
                  className: "text-[#0284c7]",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Colocar mal un repetidor o elegir un modelo de banda única obsoleto puede reducir a
                la mitad la velocidad de tu fibra óptica. En{" "}
                <strong className="text-slate-900">Repetidores.org</strong> analizamos la ganancia
                real de antenas, protocolos de seguridad WPA3, compatibilidad entre marcas y modos
                de Punto de Acceso.
              </p>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link href="/hola-hablamos/" className="btn btn-ghost" data-magnetic>
                  Conocer a Charlie Lingán →
                </Link>
                <OpenChatButton
                  label="Consultar al Asesor Técnico IA"
                  className="btn btn-buy"
                  magnetic
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card spot p-6" data-reveal>
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">
                  ✓ Estándar Técnico Repetidores.org
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Comparativas por tipo de pared, plantas y metros cuadrados</li>
                  <li>• Configuración verificada en 2.4 GHz, 5 GHz, WPS y Modo AP</li>
                  <li>• Solución paso a paso a errores de IP, DHCP y microcortes</li>
                  <li>• Recomendaciones actualizadas con disponibilidad en Amazon</li>
                </ul>
              </div>
              <div className="card spot p-6" data-reveal data-reveal-delay="1">
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                  ⚠️ Errores frecuentes al instalar WiFi
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Enchufar el repetidor dentro de la habitación que ya no tiene señal</li>
                  <li>• Colocarlo junto a microondas, espejos grandes o televisores</li>
                  <li>• Comprar repetidores antiguos N300 de una sola banda para fibra rápida</li>
                  <li>• Dejar el PIN WPS abierto sin cifrado WPA2-AES / WPA3</li>
                </ul>
              </div>
              <div
                className="card spot sm:col-span-2 p-6 flex flex-col sm:flex-row items-center gap-5"
                data-reveal
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/charlie-lingan.jpg"
                  alt="Charlie Lingán — Fundador y Editor de Repetidores.org"
                  className="h-20 w-20 rounded-2xl object-cover shrink-0 border-2 border-[#0284c7] shadow-md"
                  loading="lazy"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href="/hola-hablamos/"
                      className="font-display text-lg font-extrabold text-slate-900 hover:text-[#0284c7]"
                    >
                      Charlie Lingán
                    </Link>
                    <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-bold text-[#0369a1]">
                      Fundador & Director Editorial
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                    Experto en ecommerce, transformación digital y telecomunicaciones domésticas.
                    Creador de <strong>repetidores.org</strong> con la misión de ayudar a hogares,
                    teletrabajadores y empresas de habla hispana a lograr una conectividad WiFi
                    rápida, segura y sin zonas muertas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 14. Preguntas Frecuentes (FAQ) con Schema FAQPage */}
        <section className="wrap pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Preguntas frecuentes sobre repetidores WiFi
              </span>
              <SplitHeading
                text="Respuestas rápidas de conectividad"
                className="section-title mt-3"
              />
              <p className="mt-4 text-[var(--muted)]" data-reveal>
                ¿No sabes si tu casa necesita un repetidor WiFi 6, un sistema Mesh o un Kit PLC
                Powerline? Nuestro Asesor Técnico IA analiza tu caso al instante.
              </p>
              <div className="mt-6 flex flex-wrap gap-3" data-reveal>
                <OpenChatButton
                  label="Preguntar al Asesor IA WiFi"
                  className="btn btn-buy"
                  magnetic
                />
                <Link
                  href="/guias/comparativa-entre-repetidores-de-senal-y-sistemas-mesh/"
                  className="btn btn-ghost"
                >
                  Repetidor vs. Sistema Mesh
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              {HOME_FAQS.map((f, idx) => (
                <details
                  key={f.q}
                  open={idx === 0}
                  className="card card-static group p-5 open:shadow-lg"
                  data-reveal
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold text-slate-900">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-50 text-[#0284c7] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 15. CTA Final con Aurora, Rejilla e Imagen Flotante */}
        <section className="wrap pb-14">
          <div className="relative isolate overflow-hidden rounded-[36px] bg-gradient-to-br from-[#071324] via-[#0b2545] to-[#0284c7] px-6 py-14 text-white sm:px-14 sm:py-20 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Mejores-lugares-para-poner-un-repetidor-WiFi-en-casa.jpg"
              alt=""
              loading="lazy"
              className="absolute inset-0 -z-[2] h-full w-full object-cover opacity-15 mix-blend-luminosity"
            />
            <div className="hero-grid opacity-60" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#38bdf8]/35 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-[#10b981]/25 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
              <div className="text-center lg:text-left">
                <SplitHeading
                  text="Tu red WiFi en toda la casa,"
                  accent={{
                    text: "a máxima velocidad y sin zonas muertas",
                    className: "text-[#67e8f9]",
                  }}
                  className="text-3xl font-extrabold sm:text-5xl"
                />
                <p className="mt-4 text-base sm:text-lg text-white/85">
                  Explora nuestras{" "}
                  <strong>{allPosts.length.toLocaleString("es-PE")} guías verificadas</strong> o
                  consúltale en vivo a nuestro <strong>Asesor Técnico IA WiFi</strong> qué
                  repetidor, sistema Mesh o Kit PLC comprar en Amazon para tu hogar.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <OpenChatButton
                    label="Abrir Asesor Técnico IA WiFi Ahora"
                    className="btn btn-lime shine text-base"
                    magnetic
                  />
                  <Link href="/guias/" className="btn btn-glass" data-magnetic>
                    Explorar Guías de Compra
                  </Link>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[340px]">
                <div className="absolute inset-[10%] rounded-full bg-[#38bdf8]/25 blur-3xl" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/Comparativa-entre-repetidores-de-senal-y-sistemas-mesh.jpg"
                  alt="Repetidores WiFi y Sistemas Mesh en Repetidores.org"
                  width={400}
                  height={320}
                  loading="lazy"
                  className="float-y relative h-auto w-full rounded-3xl border-2 border-cyan-300/35 object-cover shadow-[0_30px_50px_rgba(0,0,0,0.65)]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ClientEffects />
    </>
  );
}
