export const AMAZON_TAG_US = "repetidores-20";
export const AMAZON_TAG_ES = "repetidores-21";

export type AmazonStoreRegion = "ES" | "US";

export interface AmazonProductRecommendation {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  categoryType:
    | "repeater_wifi6"
    | "mesh_system"
    | "plc_powerline"
    | "outdoor_ap"
    | "ethernet_cable"
    | "usb_portable"
    | "security_router";
  /** Direct ASIN on Amazon.com if fixed product */
  asinUS?: string;
  /** Direct ASIN on Amazon.es if fixed product */
  asinES?: string;
  /** Search query fallback or primary dynamic search on Amazon.com */
  queryUS: string;
  /** Search query fallback or primary dynamic search on Amazon.es */
  queryES: string;
  ctaLabel: string;
}

/**
 * Generates an official Amazon Affiliate link with automatic geolocation store support:
 * - Spain & Europe (ES): amazon.es with tag=repetidores-21
 * - USA & Latin America (US): amazon.com with tag=repetidores-20
 */
export function buildAmazonUrl(
  product: AmazonProductRecommendation,
  region: AmazonStoreRegion
): string {
  if (region === "ES") {
    if (product.asinES) {
      return `https://www.amazon.es/dp/${product.asinES}?tag=${AMAZON_TAG_ES}`;
    }
    const q = encodeURIComponent(product.queryES);
    return `https://www.amazon.es/s?k=${q}&tag=${AMAZON_TAG_ES}`;
  }

  if (product.asinUS) {
    return `https://www.amazon.com/dp/${product.asinUS}?tag=${AMAZON_TAG_US}`;
  }
  const q = encodeURIComponent(product.queryUS);
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG_US}`;
}

/**
 * Detects whether the user is browsing from Spain/Europe or Americas
 * based on browser timezone and language locale.
 */
export function detectUserAmazonRegion(): AmazonStoreRegion {
  if (typeof window === "undefined") {
    return "ES";
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (navigator.language || "").toLowerCase();

    if (
      tz === "Europe/Madrid" ||
      tz === "Atlantic/Canary" ||
      tz === "Europe/Ceuta" ||
      lang === "es-es" ||
      tz.startsWith("Europe/")
    ) {
      return "ES";
    }

    return "US";
  } catch {
    return "ES";
  }
}

// ============================================================================
// CURATED WIFI REPEATERS, MESH SYSTEMS, PLC POWERLINE & NETWORKING CATALOG
// ============================================================================

export const CATALOG = {
  TPLINK_RE505X_WIFI6: {
    id: "tplink-re505x-wifi6",
    badge: "🏆 #1 Repetidor WiFi 6 Más Vendido",
    title: "TP-Link RE505X / RE700X — Repetidor WiFi 6 AX1500/AX3000 Doble Banda + Gigabit",
    subtitle:
      "El repetidor de nueva generación más recomendado: compatible con cualquier router, con puerto Ethernet Gigabit, modo Punto de Acceso (AP) y tecnología OneMesh.",
    features: [
      "Doble banda WiFi 6 (1200 Mbps en 5 GHz + 300 Mbps en 2.4 GHz) sin caídas de velocidad",
      "Puerto Ethernet Gigabit integrado para conectar Smart TV, PC o consola por cable o crear un Punto de Acceso",
      "Configuración en 2 minutos desde la App TP-Link Tether o botón WPS con indicador LED de señal óptima",
    ],
    categoryType: "repeater_wifi6",
    queryUS: "TP-Link AX1500 AX3000 WiFi 6 Range Extender RE505X Gigabit Ethernet",
    queryES: "TP-Link RE505X RE700X repetidor WiFi 6 amplificador senal Gigabit",
    ctaLabel: "Ver oferta en Amazon",
  } satisfies AmazonProductRecommendation,

  TPLINK_RE330_AC1200: {
    id: "tplink-re330-ac1200",
    badge: " Mejor Calidad/Precio Doble Banda",
    title: "TP-Link RE330 / RE305 AC1200 — Extensor de Red WiFi Doble Banda (2.4 y 5 GHz)",
    subtitle:
      "El superventas mundial para eliminar zonas muertas en pisos y apartamentos sin gastar de más: compacto, fiable y con puerto Ethernet.",
    features: [
      "Extiende simultáneamente 2.4 GHz (300 Mbps, largo alcance) y 5 GHz (867 Mbps, streaming HD y videollamadas)",
      "Selección adaptativa de ruta y modo Alta Velocidad que aprovecha ambas bandas al máximo",
      "Indicador luminoso inteligente que te avisa del enchufe exacto donde recibe mejor señal del router",
    ],
    categoryType: "repeater_wifi6",
    queryUS: "TP-Link AC1200 WiFi Extender RE315 RE305 Dual Band Ethernet Port",
    queryES: "TP-Link RE330 RE305 AC1200 repetidor WiFi doble banda amplificador",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  TPLINK_RE650_AC2600: {
    id: "tplink-re650-ac2600",
    badge: "📡 Máxima Potencia (4 Antenas MU-MIMO)",
    title: "TP-Link RE650 / RE550 AC2600 — Repetidor de Largo Alcance con 4 Antenas Externas",
    subtitle:
      "Diseñado para hogares con muchos dispositivos, teletrabajo exigente, streaming 4K y cobertura extendida hasta 130 m² adicionales.",
    features: [
      "4 antenas externas de alta ganancia con tecnología Beamforming que dirige la señal hacia tus dispositivos",
      "MU-MIMO 4×4: atiende a múltiples móviles, laptops y Smart TVs a la vez hasta 4 veces más rápido",
      "Puerto Ethernet Gigabit ultrarrápido y procesador Dual-Core para cero desconexiones",
    ],
    categoryType: "repeater_wifi6",
    queryUS: "TP-Link AC2600 RE650 AC1900 RE550 WiFi Extender 4 Antennas Gigabit",
    queryES: "TP-Link RE650 RE550 AC2600 repetidor WiFi largo alcance 4 antenas",
    ctaLabel: "Ver oferta en Amazon",
  } satisfies AmazonProductRecommendation,

  TPLINK_DECO_MESH_X50: {
    id: "tplink-deco-mesh-x50",
    badge: "🏠 #1 Para Casas Grandes y 2–3 Pisos",
    title: "TP-Link Deco X50 / Deco M4 (Pack 2 o 3 Nodos) — Sistema WiFi Mesh Todo el Hogar",
    subtitle:
      "La solución definitiva cuando un repetidor tradicional no basta: crea una única red WiFi en toda la casa con cambio automático de nodo sin cortes.",
    features: [
      "Cobertura real de 350 a 600 m² en casas de 2 o 3 plantas: un solo nombre de red y contraseña en toda la vivienda",
      "Roaming inteligente 802.11k/v/r: camina de la sala al segundo piso en videollamada sin perder ni 1 segundo de conexión",
      "Soporta +100 dispositivos conectados simultáneamente y cada nodo incluye puertos Ethernet Gigabit",
    ],
    categoryType: "mesh_system",
    queryUS: "TP-Link Deco AX3000 X50 X20 M4 Whole Home Mesh WiFi System 3-Pack",
    queryES: "TP-Link Deco X50 Deco M4 sistema WiFi Mesh casa completa pack",
    ctaLabel: "Ver Pack Mesh en Amazon",
  } satisfies AmazonProductRecommendation,

  TPLINK_PLC_WPA7617: {
    id: "tplink-plc-wpa7617",
    badge: "🧱 Solución #1 Contra Paredes Gruesas",
    title: "Kit PLC Powerline WiFi TP-Link TL-WPA7617 AV1000 Gigabit con Enchufe Integrado",
    subtitle:
      "Lleva el internet a través de los cables eléctricos de tu casa: atraviesa muros de hormigón, forjados, sótanos y segundas plantas sin perder señal.",
    features: [
      "Transmite los datos por la instalación eléctrica hasta 300 metros dentro del mismo cuadro eléctrico",
      "Genera un nuevo punto WiFi de doble banda AC1200 + Puerto Ethernet Gigabit en la habitación más lejana",
      "Clonado automático WiFi en 1 clic y enchufe hembra integrado para no perder ninguna toma de corriente",
    ],
    categoryType: "plc_powerline",
    queryUS: "TP-Link AV1000 Powerline WiFi Extender Starter Kit Gigabit Port",
    queryES: "TP-Link TL-WPA7617 Kit PLC Powerline WiFi AV1000 Gigabit enchufe",
    ctaLabel: "Ver Kit PLC en Amazon",
  } satisfies AmazonProductRecommendation,

  WAVLINK_OUTDOOR_IP65: {
    id: "wavlink-outdoor-ip65",
    badge: "🌧️ #1 Repetidor Exterior / Jardín IP65",
    title: "WAVLINK AC1200 / TP-Link EAP225-Outdoor — Repetidor y Punto de Acceso WiFi Exterior IP65",
    subtitle:
      "Cobertura WiFi de largo alcance resistente a lluvia, sol, polvo y heladas para jardines, terrazas, piscinas, parcelas, talleres y zonas rurales.",
    features: [
      "Carcasa estanca IP65 con protección contra rayos (15KV ESD y 4KV) y antenas omnidireccionales desmontables de 7 dBi",
      "Alimentación PoE (Power over Ethernet): lleva corriente y datos por un solo cable de red hasta 60 metros",
      "4 modos de trabajo: Repetidor WiFi Exterior, Punto de Acceso (AP), Router y Puente WISP de largo alcance",
    ],
    categoryType: "outdoor_ap",
    queryUS: "WAVLINK AC1200 TP-Link EAP225 Outdoor Weatherproof WiFi Extender Access Point PoE",
    queryES: "repetidor punto de acceso WiFi exterior impermeable IP65 largo alcance jardin",
    ctaLabel: "Ver modelo exterior en Amazon",
  } satisfies AmazonProductRecommendation,

  ETHERNET_CAT8_CABLE: {
    id: "ethernet-cat8-cable",
    badge: "⚡ Máxima Estabilidad Modo AP y Gaming",
    title: "Cable de Red Ethernet Cat 8 Blindado S/FTP (40 Gbps / 2000 MHz — 5m / 10m / 20m)",
    subtitle:
      "Imprescindible para conectar tu repetidor en Modo Punto de Acceso (AP) o enlazar PC, PS5, Xbox y Smart TV 4K con 0% pérdida de velocidad y latencia mínima.",
    features: [
      "Doble blindaje de aluminio S/FTP con conectores RJ45 chapados en oro contra interferencias electromagnéticas",
      "Compatible con routers Fibra 1 Gbps / 10 Gbps, repetidores con puerto Ethernet, Switches y sistemas Mesh",
      "Cubierta trenzada o exterior ultrarresistente para pasar por zócalos, canaletas o paredes",
    ],
    categoryType: "ethernet_cable",
    queryUS: "Cat 8 Ethernet Cable High Speed Braided RJ45 LAN Network Cable",
    queryES: "cable Ethernet Cat 8 blindado alta velocidad RJ45 red fibra",
    ctaLabel: "Ver medidas en Amazon",
  } satisfies AmazonProductRecommendation,

  SWITCH_GIGABIT_5PORT: {
    id: "switch-gigabit-5port",
    badge: "🔌 Multiplica los Puertos de tu Repetidor",
    title: "TP-Link LS1005G / TL-SG105 — Switch Gigabit Ethernet de 5/8 Puertos Metálico Plug & Play",
    subtitle:
      "Conéctalo al puerto Ethernet de tu repetidor o nodo Mesh para tener 4 o 7 tomas de cable Gigabit adicionales en tu escritorio o mueble de TV.",
    features: [
      "5 puertos RJ45 a 1000 Mbps reales con negociación automática y tecnología Green Ethernet de bajo consumo",
      "Instalación instantánea sin configuración ni software: enchufar y navegar a máxima velocidad",
      "Operación 100% silenciosa sin ventiladores, ideal para conectar Smart TV, consola, PC y decodificador",
    ],
    categoryType: "ethernet_cable",
    queryUS: "TP-Link TL-SG105 5 Port Gigabit Ethernet Network Switch Metal",
    queryES: "TP-Link TL-SG105 LS1005G Switch Gigabit 5 puertos Ethernet",
    ctaLabel: "Ver Switch en Amazon",
  } satisfies AmazonProductRecommendation,

  XIAOMI_EXTENDER_AC1200: {
    id: "xiaomi-extender-ac1200",
    badge: "💸 Superventas Compacto Doble Banda",
    title: "Xiaomi Mi WiFi Range Extender AC1200 — Repetidor Doble Banda con Puerto Ethernet",
    subtitle:
      "El repetidor compacto favorito por su relación calidad/precio: incluye banda de 5 GHz, puerto Fast Ethernet, modo Punto de Acceso y función SmartLink.",
    features: [
      "Doble banda de hasta 1200 Mbps con cambio automático SmartLink si falla la banda principal",
      "Configuración guiada desde la App Mi Home en Android e iOS y modo Punto de Acceso por cable",
      "Diseño discreto en negro mate con indicador LED frontal de calidad de señal",
    ],
    categoryType: "repeater_wifi6",
    queryUS: "Xiaomi Mi WiFi Range Extender AC1200 Dual Band Ethernet Port",
    queryES: "Xiaomi Mi WiFi Range Extender AC1200 repetidor amplificador doble banda",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  NETGEAR_EX6120_AC1200: {
    id: "netgear-ex6120-ac1200",
    badge: "🛡️ Fiabilidad Netgear con Antenas Orientables",
    title: "NETGEAR EX6120 / Nighthawk WiFi 6 — Repetidor Doble Banda con Tecnología FastLane",
    subtitle:
      "Ingeniería norteamericana de alta estabilidad con antenas externas orientables y modo FastLane que dedica una banda al router y otra a tus dispositivos.",
    features: [
      "Tecnología exclusiva FastLane que evita la caída del 50% de velocidad típica de los repetidores básicos",
      "Compatible con cualquier router de operadora (Movistar, Orange, Vodafone, Digi, Claro, Telmex) y puerto Ethernet",
      "Soporte de seguridad WPA2/WPA3 y conmutador físico para alternar entre Modo Extensor y Modo Punto de Acceso",
    ],
    categoryType: "repeater_wifi6",
    queryUS: "NETGEAR WiFi Range Extender EX6120 AC1200 Nighthawk WiFi 6 Mesh",
    queryES: "NETGEAR EX6120 Nighthawk repetidor extensor rango WiFi doble banda",
    ctaLabel: "Ver modelos Netgear en Amazon",
  } satisfies AmazonProductRecommendation,

  USB_WIFI6_ADAPTER: {
    id: "usb-wifi6-adapter",
    badge: "💻 Mejora la Recepción WiFi de tu PC/Laptop",
    title: "Adaptador Receptor WiFi 6 USB 3.0 AX1800 Doble Banda con Antenas de Alta Ganancia",
    subtitle:
      "Si tu ordenador de sobremesa o portátil antiguo no capta la banda de 5 GHz del repetidor, este receptor USB 3.0 actualiza su tarjeta de red al instante.",
    features: [
      "Añade conectividad WiFi 6 (5 GHz + 2.4 GHz) y soporte WPA3 a cualquier PC o laptop por puerto USB 3.0",
      "2 antenas externas orientables de 5 dBi con base o conexión directa para captar señal a través de paredes",
      "Plug & Play con drivers preinstalados para Windows 10/11",
    ],
    categoryType: "usb_portable",
    queryUS: "USB WiFi 6 Adapter AX1800 Dual Band High Gain Antenna PC Desktop",
    queryES: "adaptador receptor WiFi 6 USB 3.0 antena alta ganancia PC doble banda",
    ctaLabel: "Ver adaptador USB en Amazon",
  } satisfies AmazonProductRecommendation,

  ROUTER_WIFI6_WPA3: {
    id: "router-wifi6-wpa3",
    badge: "🔒 Seguridad WPA3 + Máximo Alcance",
    title: "TP-Link Archer AX55 / AX53 — Router WiFi 6 Gigabit AX3000 con Seguridad HomeShield WPA3",
    subtitle:
      "Reemplaza o complementa el router básico de tu operadora con 4 antenas de alta potencia, cifrado WPA3 contra intrusos, VPN integrada y red de invitados aislada.",
    features: [
      "Cifrado WPA3 Personal, firewall SPI, filtrado MAC/IP, control de acceso y escaneo de intrusos en tiempo real",
      "4 puertos LAN Gigabit + 1 WAN Gigabit + USB 3.0 y compatibilidad nativa OneMesh con repetidores TP-Link",
      "Tecnología OFDMA y canales de 160 MHz que triplican el ancho de banda y reducen la latencia un 75%",
    ],
    categoryType: "security_router",
    queryUS: "TP-Link Archer AX55 AX3000 WiFi 6 Router Gigabit WPA3 HomeShield",
    queryES: "TP-Link Archer AX55 AX53 Router WiFi 6 AX3000 Gigabit WPA3",
    ctaLabel: "Ver Router WiFi 6 en Amazon",
  } satisfies AmazonProductRecommendation,
} as const;

export interface ContextualAmazonBundle {
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
}

/**
 * Dynamic Brand Detector: When a user reads a review or guide about a specific brand
 * (TP-Link, Netgear, Xiaomi, Mercusys, Asus, Fritz!Repeater, D-Link, Tenda, Macard, Wavlink),
 * builds a tailored #1 product card for that exact brand/model on Amazon.
 */
function detectSpecificBrandProduct(
  slug: string,
  title: string
): AmazonProductRecommendation | null {
  const text = `${slug} ${title}`.toLowerCase();

  if (text.includes("netgear")) {
    return CATALOG.NETGEAR_EX6120_AC1200;
  }
  if (text.includes("xiaomi")) {
    return CATALOG.XIAOMI_EXTENDER_AC1200;
  }
  if (text.includes("ac1900") || text.includes("ac2600") || text.includes("re650") || text.includes("re550")) {
    return CATALOG.TPLINK_RE650_AC2600;
  }
  if (text.includes("ac1200") || text.includes("re305") || text.includes("re330")) {
    return CATALOG.TPLINK_RE330_AC1200;
  }
  if (text.includes("mercusys")) {
    return {
      id: "brand-mercusys-me30",
      badge: "📶 Extensor Mercusys Doble Banda",
      title: "Mercusys ME30 / ME50G AC1200/AC1900 — Repetidor WiFi Doble Banda con Puerto Ethernet",
      subtitle:
        "Alta potencia con 2 antenas externas ajustables, modo Punto de Acceso integrado y excelente relación calidad/precio.",
      features: [
        "Velocidad de doble banda de hasta 1200–1900 Mbps (5 GHz + 2.4 GHz) compatible con cualquier router",
        "Puerto Ethernet integrado para conectar dispositivos por cable o funcionar como Punto de Acceso (AP)",
        "LED multicolor que ayuda a encontrar la ubicación exacta con mejor recepción",
      ],
      categoryType: "repeater_wifi6",
      queryUS: "Mercusys TP-Link AC1200 Dual Band WiFi Range Extender Ethernet",
      queryES: "Mercusys ME30 ME50G AC1200 repetidor amplificador WiFi doble banda",
      ctaLabel: "Ver oferta Mercusys en Amazon",
    };
  }
  if (text.includes("asus")) {
    return {
      id: "brand-asus-rp-ax58",
      badge: "🚀 Ecosistema ASUS AiMesh WiFi 6",
      title: "ASUS RP-AX58 / RP-AC55 — Repetidor y Nodo AiMesh WiFi 6 Doble Banda AX3000",
      subtitle:
        "Compatible con routers de cualquier marca y con tecnología ASUS AiMesh para crear una red mallada de alto rendimiento.",
      features: [
        "Estándar WiFi 6 (802.11ax) con ancho de banda de 160 MHz y velocidades de hasta 3000 Mbps",
        "Puerto Ethernet Gigabit para backhaul por cable o conexión de PC y consolas",
        "Configuración rápida mediante la aplicación móvil ASUS Extender",
      ],
      categoryType: "repeater_wifi6",
      queryUS: "ASUS RP-AX58 AX3000 Dual Band WiFi 6 Range Extender AiMesh",
      queryES: "ASUS RP-AX58 repetidor amplificador WiFi 6 AiMesh doble banda",
      ctaLabel: "Ver modelos ASUS en Amazon",
    };
  }
  if (text.includes("fritz")) {
    return {
      id: "brand-avm-fritz",
      badge: "🇩🇪 Ingeniería Alemana AVM FRITZ!",
      title: "AVM FRITZ!Repeater 1200 AX / 2400 — Repetidor WiFi 6 Mesh con Puerto Gigabit",
      subtitle:
        "Uno de los repetidores más estables del mercado europeo con tecnología Mesh inteligente y puerto LAN Gigabit.",
      features: [
        "WiFi 6 de doble banda (2400 Mbps en 5 GHz + 600 Mbps en 2.4 GHz) compatible con todos los routers",
        "Puerto LAN Gigabit para conectar Smart TV, NAS o crear un puente por cable de red",
        "Cifrado WPA3/WPA2 de máxima seguridad y configuración con un solo botón",
      ],
      categoryType: "repeater_wifi6",
      queryUS: "AVM FRITZ Repeater 1200 AX WiFi 6 Mesh Extender Gigabit",
      queryES: "AVM FRITZ Repeater 1200 AX 2400 repetidor WiFi 6 Mesh Gigabit",
      ctaLabel: "Ver FRITZ!Repeater en Amazon",
    };
  }

  return null;
}

/**
 * Intelligent Contextual Engine for all 823 pages of repetidores.org:
 * Analyzes slug, category, and title to return the 3 highest-converting Amazon products.
 */
export function getContextualAmazonProducts(
  slug: string,
  category: string,
  title: string
): ContextualAmazonBundle {
  const text = `${slug} ${category} ${title}`.toLowerCase();

  // 0. Brand-specific review or comparison
  const brandMatch = detectSpecificBrandProduct(slug, title);
  if (brandMatch) {
    return {
      sectionTitle: "Equipos Oficiales y Alternativas Recomendadas en Amazon",
      sectionSubtitle:
        "Compara precios actualizados, disponibilidad con envío rápido y valoraciones verificadas de usuarios reales:",
      products: [
        brandMatch,
        CATALOG.TPLINK_RE505X_WIFI6,
        CATALOG.TPLINK_DECO_MESH_X50,
      ],
    };
  }

  // 1. Exterior / Garden / Outdoor / Rural / Long Range
  if (
    text.includes("exterior") ||
    text.includes("jardin") ||
    text.includes("terraza") ||
    text.includes("rural") ||
    text.includes("intemperie") ||
    text.includes("piscina")
  ) {
    return {
      sectionTitle: "Mejores Repetidores WiFi para Exteriores y Largo Alcance en Amazon",
      sectionSubtitle:
        "Equipos impermeables IP65 con antenas de alta ganancia y alimentación PoE para jardines, terrazas, parcelas y exteriores:",
      products: [
        CATALOG.WAVLINK_OUTDOOR_IP65,
        CATALOG.TPLINK_RE650_AC2600,
        CATALOG.ETHERNET_CAT8_CABLE,
      ],
    };
  }

  // 2. Thick Walls / Concrete / Slow Speed / Powerline PLC / Basement / Offices
  if (
    text.includes("paredes-gruesas") ||
    text.includes("paredes gruesas") ||
    text.includes("hormigon") ||
    text.includes("ladrillo") ||
    text.includes("sotano") ||
    text.includes("velocidad-baja") ||
    text.includes("velocidad baja") ||
    text.includes("plc") ||
    text.includes("red electrica")
  ) {
    return {
      sectionTitle: "Equipamiento Recomendado para Paredes Gruesas y Cero Pérdida de Velocidad",
      sectionSubtitle:
        "Combina tecnología PLC por red eléctrica, repetidores de 4 antenas MU-MIMO o sistemas Mesh para atravesar muros densos:",
      products: [
        CATALOG.TPLINK_PLC_WPA7617,
        CATALOG.TPLINK_RE650_AC2600,
        CATALOG.TPLINK_DECO_MESH_X50,
      ],
    };
  }

  // 3. Mesh Systems / Large Houses / 2-3 Floors / Dead Zones
  if (
    text.includes("mesh") ||
    text.includes("segundo-piso") ||
    text.includes("segundo piso") ||
    text.includes("varias-plantas") ||
    text.includes("varios pisos") ||
    text.includes("casas-grandes") ||
    text.includes("casas grandes") ||
    text.includes("zonas-muertas")
  ) {
    return {
      sectionTitle: "Sistemas WiFi Mesh y Repetidores para Casas Grandes o Varios Pisos",
      sectionSubtitle:
        "Elimina las zonas muertas en segundas plantas y viviendas amplias con roaming automático y doble banda Gigabit:",
      products: [
        CATALOG.TPLINK_DECO_MESH_X50,
        CATALOG.TPLINK_RE505X_WIFI6,
        CATALOG.TPLINK_PLC_WPA7617,
      ],
    };
  }

  // 4. Ethernet Port / Access Point Mode (AP) / Cable / Gaming / Smart TV / Consoles
  if (
    text.includes("ethernet") ||
    text.includes("cable") ||
    text.includes("punto-de-acceso") ||
    text.includes("punto de acceso") ||
    text.includes("gaming") ||
    text.includes("juegos") ||
    text.includes("latencia") ||
    text.includes("smart-tv") ||
    text.includes("consola")
  ) {
    return {
      sectionTitle: "Repetidores con Puerto Ethernet Gigabit, Modo Punto de Acceso y Cableado",
      sectionSubtitle:
        "Conecta por cable de red o convierte tu repetidor en un Punto de Acceso (AP) de máxima velocidad y mínima latencia:",
      products: [
        CATALOG.TPLINK_RE505X_WIFI6,
        CATALOG.ETHERNET_CAT8_CABLE,
        CATALOG.SWITCH_GIGABIT_5PORT,
      ],
    };
  }

  // 5. USB / Portable / Compact / Travel / Laptop
  if (
    text.includes("usb") ||
    text.includes("portatil") ||
    text.includes("compacto") ||
    text.includes("viaje") ||
    text.includes("hotel")
  ) {
    return {
      sectionTitle: "Repetidores Compactos, Portátiles y Adaptadores WiFi USB en Amazon",
      sectionSubtitle:
        "Soluciones ligeras de bolsillo y receptores USB 3.0 de alta ganancia para llevar tu conexión a cualquier habitación o viaje:",
      products: [
        CATALOG.XIAOMI_EXTENDER_AC1200,
        CATALOG.TPLINK_RE330_AC1200,
        CATALOG.USB_WIFI6_ADAPTER,
      ],
    };
  }

  // 6. Security / WPA3 / Intruders / MAC Filtering / Guest Network
  if (
    category === "seguridad" ||
    text.includes("seguridad") ||
    text.includes("proteger") ||
    text.includes("intrusos") ||
    text.includes("sin-permiso") ||
    text.includes("wpa3") ||
    text.includes("wpa2") ||
    text.includes("contrasena")
  ) {
    return {
      sectionTitle: "Equipos WiFi 6 con Seguridad WPA3, Control de Acceso y Red Blindada",
      sectionSubtitle:
        "Actualiza tu red doméstica con cifrado WPA3 Personal, detección de intrusos en tiempo real y aislamiento de invitados:",
      products: [
        CATALOG.ROUTER_WIFI6_WPA3,
        CATALOG.TPLINK_RE505X_WIFI6,
        CATALOG.TPLINK_DECO_MESH_X50,
      ],
    };
  }

  // 7. Troubleshooting ("Conectado sin acceso a internet", Disconnections, WPS fails, Old Repeaters)
  if (
    category === "problemas-y-soluciones" ||
    text.includes("sin-acceso-a-internet") ||
    text.includes("no-conecta") ||
    text.includes("defectuoso") ||
    text.includes("no-repite") ||
    text.includes("no-aparece") ||
    text.includes("antiguos") ||
    text.includes("desconecta")
  ) {
    return {
      sectionTitle: "¿Tu Repetidor Antiguo Falla o Pierde Internet? Reemplázalo por WiFi 6 Estable",
      sectionSubtitle:
        "Los repetidores antiguos de banda única (2.4 GHz) sufren conflictos de IP y saturación. Estos modelos WiFi 6 y Mesh se autoconfiguran sin caídas:",
      products: [
        CATALOG.TPLINK_RE505X_WIFI6,
        CATALOG.TPLINK_DECO_MESH_X50,
        CATALOG.TPLINK_PLC_WPA7617,
      ],
    };
  }

  // 8. Configuration, WPS vs No WPS, 5 GHz, Antenna Orientation & Placement Tricks
  if (
    category === "configuracion" ||
    category === "trucos" ||
    category === "curiosidades" ||
    text.includes("wps") ||
    text.includes("5-ghz") ||
    text.includes("5 ghz") ||
    text.includes("antenas") ||
    text.includes("lugares") ||
    text.includes("colocar")
  ) {
    return {
      sectionTitle: "Repetidores Doble Banda con Indicador Inteligente de Señal y App Guiada",
      sectionSubtitle:
        "Se configuran en 2 minutos desde el móvil (con o sin WPS), incluyen banda de 5 GHz y LED que indica el enchufe exacto donde colocarlos:",
      products: [
        CATALOG.TPLINK_RE505X_WIFI6,
        CATALOG.TPLINK_RE330_AC1200,
        CATALOG.NETGEAR_EX6120_AC1200,
      ],
    };
  }

  // Default (Home, General Buying Guides, Reviews, History, Uses)
  return {
    sectionTitle: "Los 3 Mejores Repetidores WiFi y Sistemas Mesh Más Vendidos en Amazon",
    sectionSubtitle:
      "Selección oficial verificada por Repetidores.org: máxima cobertura en 2.4 y 5 GHz, puerto Ethernet Gigabit y compatibilidad universal con cualquier router:",
    products: [
      CATALOG.TPLINK_RE505X_WIFI6,
      CATALOG.TPLINK_DECO_MESH_X50,
      CATALOG.TPLINK_RE330_AC1200,
    ],
  };
}
