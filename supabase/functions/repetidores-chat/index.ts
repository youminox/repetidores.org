import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-sync-key",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SITE = "https://repetidores.org";
const ALLOWED_MODELS = ["gpt-4o-mini", "gpt-4o"];
const AMAZON_TAG_ES = "repetidores-21";
const AMAZON_TAG_US = "repetidores-20";

export interface ArticleRow {
  slug: string;
  title: string;
  category: string;
  category_name: string;
  excerpt: string | null;
  featured_image: string | null;
  read_time: string | null;
  search_text: string | null;
}

export interface ArticleCard {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  url: string;
  image: string;
  readTime: string;
  excerpt: string;
}

export interface AmazonProductCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  rating: string;
  reviewsCount: string;
  urlES: string;
  urlUS: string;
}

const AMAZON_PRODUCTS: Record<string, AmazonProductCard> = {
  "tplink-re505x-wifi6": {
    id: "tplink-re505x-wifi6",
    badge: "🏆 #1 Repetidor WiFi 6 Más Vendido",
    title: "TP-Link RE505X / RE700X — Repetidor WiFi 6 AX1500/AX3000 Doble Banda + Gigabit",
    subtitle:
      "Doble banda 2.4 y 5 GHz, puerto Ethernet Gigabit, Modo Punto de Acceso (AP) y configuración en 2 min con App Tether.",
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("TP-Link RE505X RE700X repetidor WiFi 6 amplificador senal Gigabit")}&tag=${AMAZON_TAG_ES}`,
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("TP-Link AX1500 AX3000 WiFi 6 Range Extender RE505X Gigabit Ethernet")}&tag=${AMAZON_TAG_US}`,
  },
  "tplink-deco-mesh-x50": {
    id: "tplink-deco-mesh-x50",
    badge: "🏠 #1 Para Casas Grandes y 2–3 Pisos",
    title: "TP-Link Deco X50 / Deco M4 (Pack 2 o 3 Nodos) — Sistema WiFi Mesh Todo el Hogar",
    subtitle:
      "Crea una sola red WiFi en viviendas de 150 a 550 m² y varias plantas con roaming inteligente sin cortes.",
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("TP-Link Deco X50 Deco M4 sistema WiFi Mesh casa completa pack")}&tag=${AMAZON_TAG_ES}`,
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("TP-Link Deco AX3000 X50 M4 Whole Home Mesh WiFi System")}&tag=${AMAZON_TAG_US}`,
  },
  "tplink-plc-wpa7617": {
    id: "tplink-plc-wpa7617",
    badge: "🧱 Solución #1 Contra Paredes Gruesas",
    title: "Kit PLC Powerline WiFi TP-Link TL-WPA7617 AV1000 Gigabit con Enchufe Integrado",
    subtitle:
      "Transmite internet por los cables eléctricos de tu casa ignorando muros de hormigón, forjados y sótanos.",
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("TP-Link TL-WPA7617 Kit PLC Powerline WiFi AV1000 Gigabit enchufe")}&tag=${AMAZON_TAG_ES}`,
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("TP-Link AV1000 Powerline WiFi Extender Starter Kit Gigabit")}&tag=${AMAZON_TAG_US}`,
  },
  "tplink-re330-ac1200": {
    id: "tplink-re330-ac1200",
    badge: " Mejor Calidad/Precio Doble Banda",
    title: "TP-Link RE330 / RE305 AC1200 — Extensor WiFi Doble Banda Compacto",
    subtitle:
      "El superventas económico para pisos y apartamentos: extiende 2.4 y 5 GHz con puerto Ethernet e indicador de señal.",
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("TP-Link RE330 RE305 AC1200 repetidor WiFi doble banda amplificador")}&tag=${AMAZON_TAG_ES}`,
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("TP-Link AC1200 WiFi Extender RE315 RE305 Dual Band Ethernet")}&tag=${AMAZON_TAG_US}`,
  },
  "tplink-re650-ac2600": {
    id: "tplink-re650-ac2600",
    badge: "📡 Máxima Potencia (4 Antenas MU-MIMO)",
    title: "TP-Link RE650 / RE550 AC2600 — Repetidor de Largo Alcance 4 Antenas + Gigabit",
    subtitle:
      "4 antenas externas de alta ganancia con Beamforming y MU-MIMO 4x4 para hogares con muchos dispositivos y 4K.",
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("TP-Link RE650 RE550 AC2600 repetidor WiFi largo alcance 4 antenas")}&tag=${AMAZON_TAG_ES}`,
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("TP-Link AC2600 RE650 AC1900 RE550 WiFi Extender 4 Antennas")}&tag=${AMAZON_TAG_US}`,
  },
  "wavlink-outdoor-ip65": {
    id: "wavlink-outdoor-ip65",
    badge: "🌧️ #1 Repetidor Exterior / Jardín IP65",
    title: "WAVLINK AC1200 / TP-Link EAP225-Outdoor — Repetidor y Punto de Acceso Exterior IP65",
    subtitle:
      "Resistente a lluvia y sol con antenas de 7 dBi y alimentación PoE para jardines, terrazas, piscinas y zonas rurales.",
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("repetidor punto de acceso WiFi exterior impermeable IP65 largo alcance jardin")}&tag=${AMAZON_TAG_ES}`,
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("WAVLINK AC1200 TP-Link EAP225 Outdoor Weatherproof WiFi Extender PoE")}&tag=${AMAZON_TAG_US}`,
  },
  "xiaomi-extender-ac1200": {
    id: "xiaomi-extender-ac1200",
    badge: "💸 Superventas Compacto Xiaomi",
    title: "Xiaomi Mi WiFi Range Extender AC1200 — Repetidor Doble Banda con Puerto Ethernet",
    subtitle:
      "Compacto, económico y con banda de 5 GHz, modo Punto de Acceso y función SmartLink desde la App Mi Home.",
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Xiaomi Mi WiFi Range Extender AC1200 repetidor amplificador doble banda")}&tag=${AMAZON_TAG_ES}`,
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Xiaomi Mi WiFi Range Extender AC1200 Dual Band Ethernet")}&tag=${AMAZON_TAG_US}`,
  },
  "netgear-ex6120-ac1200": {
    id: "netgear-ex6120-ac1200",
    badge: "🛡️ Fiabilidad Netgear con Antenas Orientables",
    title: "NETGEAR EX6120 / Nighthawk WiFi 6 — Repetidor Doble Banda con FastLane",
    subtitle:
      "Antenas externas orientables y tecnología FastLane que dedica una banda al router y otra a tus equipos sin perder velocidad.",
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("NETGEAR EX6120 Nighthawk repetidor extensor rango WiFi doble banda")}&tag=${AMAZON_TAG_ES}`,
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("NETGEAR WiFi Range Extender EX6120 AC1200 Nighthawk")}&tag=${AMAZON_TAG_US}`,
  },
  "ethernet-cat8-cable": {
    id: "ethernet-cat8-cable",
    badge: "⚡ Modo Punto de Acceso (AP) & Gaming",
    title: "Cable Ethernet Cat 8 Blindado S/FTP (40 Gbps) + Switch Gigabit TP-Link 5 Puertos",
    subtitle:
      "Para conectar tu repetidor por cable al router (Modo AP con 0% pérdida de velocidad) o conectar Smart TV, PC y consolas.",
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("cable Ethernet Cat 8 blindado alta velocidad RJ45 red fibra")}&tag=${AMAZON_TAG_ES}`,
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Cat 8 Ethernet Cable High Speed Braided RJ45 LAN Network")}&tag=${AMAZON_TAG_US}`,
  },
  "router-wifi6-wpa3": {
    id: "router-wifi6-wpa3",
    badge: "🔒 Seguridad WPA3 + Máximo Alcance",
    title: "TP-Link Archer AX55 / AX53 — Router WiFi 6 Gigabit AX3000 con Seguridad HomeShield WPA3",
    subtitle:
      "4 antenas de alta ganancia, cifrado WPA3 contra intrusos, filtrado MAC, VPN y compatibilidad nativa OneMesh.",
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("TP-Link Archer AX55 AX53 Router WiFi 6 AX3000 Gigabit WPA3")}&tag=${AMAZON_TAG_ES}`,
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("TP-Link Archer AX55 AX3000 WiFi 6 Router Gigabit WPA3")}&tag=${AMAZON_TAG_US}`,
  },
};

function calculateCostUsd(
  model: string,
  promptTokens: number,
  completionTokens: number
): number {
  if (model.includes("mini")) {
    return Number(
      (promptTokens * 0.00000015 + completionTokens * 0.0000006).toFixed(6)
    );
  }
  return Number(
    (promptTokens * 0.0000025 + completionTokens * 0.00001).toFixed(6)
  );
}

const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOPWORDS = new Set([
  "como",
  "cual",
  "cuales",
  "que",
  "quien",
  "quienes",
  "donde",
  "cuando",
  "por",
  "para",
  "con",
  "sin",
  "una",
  "uno",
  "unos",
  "unas",
  "los",
  "las",
  "del",
  "al",
  "hola",
  "buenas",
  "buenos",
  "dias",
  "tardes",
  "noches",
  "quiero",
  "puedo",
  "saber",
  "dime",
  "favor",
  "recomienda",
  "recomendame",
  "mejor",
  "mejores",
  "sobre",
  "este",
  "esta",
  "estos",
  "estas",
  "mas",
  "muy",
  "hay",
  "tiene",
  "tienen",
  "son",
  "fue",
  "eran",
  "todo",
  "todos",
  "toda",
  "todas",
  "guia",
  "pagina",
  "casa",
  "tengo",
]);

const SYNONYMS: Record<string, string[]> = {
  extensor: ["repetidor", "amplificador", "senal"],
  extensores: ["repetidor", "repetidores", "amplificador"],
  amplificador: ["repetidor", "extensor", "senal"],
  amplificadores: ["repetidor", "repetidores", "senal"],
  malla: ["mesh", "sistemas-mesh"],
  mesh: ["mesh", "sistemas-mesh", "casas-grandes", "varias-plantas"],
  deco: ["mesh", "sistemas-mesh", "tp-link"],
  plc: ["paredes-gruesas", "cable", "ethernet"],
  powerline: ["paredes-gruesas", "cable", "ethernet"],
  piso: ["segundo-piso", "varias-plantas", "casas-grandes"],
  pisos: ["segundo-piso", "varias-plantas", "casas-grandes"],
  planta: ["segundo-piso", "varias-plantas", "casas-grandes"],
  plantas: ["segundo-piso", "varias-plantas", "casas-grandes"],
  muros: ["paredes-gruesas", "senal"],
  paredes: ["paredes-gruesas", "senal"],
  hormigon: ["paredes-gruesas", "senal"],
  antena: ["antenas", "colocar", "lugares"],
  antenas: ["antenas", "colocar", "lugares"],
  ubicar: ["lugares", "colocar", "donde"],
  ubicacion: ["lugares", "colocar", "donde"],
  enchufar: ["lugares", "colocar", "donde"],
  poner: ["lugares", "colocar", "donde"],
  lento: ["velocidad", "baja", "segundo-piso"],
  velocidad: ["velocidad", "baja", "doble-banda", "5-ghz"],
  cortes: ["conectado", "sin-acceso-a-internet", "inestable"],
  internet: ["sin-acceso-a-internet", "conectado", "no-conecta"],
  wps: ["wps", "vincular", "configurar"],
  cable: ["ethernet", "punto-de-acceso", "cable"],
  ethernet: ["ethernet", "punto-de-acceso", "cable"],
  ap: ["punto-de-acceso", "configurar"],
  jardin: ["exteriores", "exterior", "largo-alcance"],
  terraza: ["exteriores", "exterior", "largo-alcance"],
  exterior: ["exteriores", "exterior", "largo-alcance"],
  intrusos: ["permiso", "seguridad", "proteger"],
  vecino: ["permiso", "seguridad", "proteger"],
  hackear: ["seguridad", "proteger", "permiso"],
};

function stemWord(w: string): string {
  if (w.length > 5 && w.endsWith("es")) return w.slice(0, -2);
  if (w.length > 4 && w.endsWith("s")) return w.slice(0, -1);
  return w;
}

function extractTokens(text: string): string[] {
  const raw = norm(text)
    .split(" ")
    .filter((w) => (w.length >= 3 || /^(5|6|24)$/.test(w)) && !STOPWORDS.has(w));
  const expanded: string[] = [];
  for (const w of raw) {
    expanded.push(w);
    if (SYNONYMS[w]) {
      for (const syn of SYNONYMS[w]) expanded.push(syn);
    }
  }
  return Array.from(new Set(expanded));
}

let catalogCache: {
  at: number;
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
} | null = null;

async function loadCatalog(): Promise<{
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
}> {
  if (
    catalogCache &&
    Date.now() - catalogCache.at < 10 * 60 * 1000 &&
    catalogCache.rows.length > 0
  ) {
    return catalogCache;
  }
  const { data } = await supabase
    .from("repetidores_articles")
    .select(
      "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
    )
    .eq("active", true)
    .range(0, 999);

  const rows: ArticleRow[] = [];
  const bySlug = new Map<string, ArticleRow>();
  if (Array.isArray(data)) {
    for (const r of data as ArticleRow[]) {
      if (!bySlug.has(r.slug)) {
        bySlug.set(r.slug, r);
        rows.push(r);
      }
    }
  }
  catalogCache = { at: Date.now(), rows, bySlug };
  return catalogCache;
}

function toArticleCard(r: ArticleRow): ArticleCard {
  const img =
    r.featured_image ||
    "/images/Mejores-lugares-para-poner-un-repetidor-WiFi-en-casa.jpg";
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    categoryName: r.category_name,
    url: `${SITE}/${r.category}/${r.slug}/`,
    image: img.startsWith("http") ? img : `${SITE}${img}`,
    readTime: r.read_time || "5 min",
    excerpt: (r.excerpt || "").slice(0, 145),
  };
}

function searchArticles(
  rows: ArticleRow[],
  userMessage: string,
  historyText: string,
  limit = 16
): ArticleRow[] {
  const primaryTokens = extractTokens(userMessage);
  const contextTokens = extractTokens(historyText).filter(
    (t) => !primaryTokens.includes(t)
  );
  const fullPhrase = norm(userMessage);

  const starterSlugs = [
    "mejores-lugares-para-poner-un-repetidor-wifi-en-casa",
    "comparativa-entre-repetidores-de-senal-y-sistemas-mesh",
    "repetidor-conectado-pero-sin-acceso-a-internet",
    "repetidores-con-doble-banda-ventajas-y-modelos-sugeridos",
    "como-colocar-las-antenas-de-un-repetidor-wifi",
    "configurar-repetidor-en-modo-punto-de-acceso",
    "repetidores-recomendados-para-oficinas-con-paredes-gruesas",
    "como-proteger-tu-red-wifi-con-repetidores",
  ];

  if (primaryTokens.length === 0 && contextTokens.length === 0) {
    const picked: ArticleRow[] = [];
    for (const s of starterSlugs) {
      const f = rows.find((r) => r.slug === s);
      if (f) picked.push(f);
    }
    return picked.length > 0 ? picked : rows.slice(0, 8);
  }

  const scored: Array<{ r: ArticleRow; score: number }> = [];

  for (const r of rows) {
    const titleNorm = norm(r.title);
    const catNorm = norm(`${r.category_name} ${r.category}`);
    const bodyNorm =
      r.search_text || `${titleNorm} ${catNorm} ${norm(r.excerpt || "")}`;

    let score = 0;

    if (fullPhrase.length >= 5 && titleNorm.includes(fullPhrase)) {
      score += 45;
    }

    let matchedPrimary = 0;
    for (const tok of primaryTokens) {
      const stem = stemWord(tok);
      if (
        titleNorm.includes(tok) ||
        (stem.length >= 4 && titleNorm.includes(stem))
      ) {
        score += 16;
        matchedPrimary++;
      } else if (
        catNorm.includes(tok) ||
        (stem.length >= 4 && catNorm.includes(stem))
      ) {
        score += 9;
        matchedPrimary++;
      } else if (
        bodyNorm.includes(tok) ||
        (stem.length >= 4 && bodyNorm.includes(stem))
      ) {
        score += 5;
        matchedPrimary++;
      }
    }

    if (matchedPrimary >= 2) {
      score += matchedPrimary * 8;
    }

    if (starterSlugs.includes(r.slug)) {
      score += 6;
    }

    for (const cTok of contextTokens.slice(-5)) {
      const stem = stemWord(cTok);
      if (
        titleNorm.includes(cTok) ||
        (stem.length >= 4 && titleNorm.includes(stem))
      ) {
        score += 3;
      }
    }

    if (score > 0) {
      scored.push({ r, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.r);
}

const CATEGORIES_OVERVIEW = `
ESTRUCTURA Y CATEGORÍAS OFICIALES DE REPETIDORES.ORG (Fundador y Director Editorial: Charlie Lingán — 809 guías técnicas):
- Guías de Compra y Comparativas (498 guías): ${SITE}/guias/ (mejores repetidores WiFi para casas grandes, 2 pisos, paredes gruesas, doble banda 2.4 y 5 GHz, WiFi 6, comparativa Repetidor vs Sistema Mesh, repetidores con puerto Ethernet, exteriores IP65, USB y portátiles)
- Seguridad y Red Doméstica (91 manuales): ${SITE}/seguridad/ (cómo detectar si alguien usa tu repetidor sin permiso, proteger red con WPA3/WPA2, filtrado MAC, IP estática, desactivar PIN WPS vulnerable)
- Problemas y Soluciones Técnicas (76 guías): ${SITE}/problemas-y-soluciones/ (repetidor conectado pero sin acceso a internet, velocidad baja con el repetidor, no aparece en la lista de redes, no puedo acceder al panel IP, comprobar si está defectuoso)
- Compatibilidad y Configuración (59 tutoriales): ${SITE}/configuracion/ (cómo configurar con y sin botón WPS, conectar a red de 5 GHz, configurar en Modo Punto de Acceso AP por cable, compatibilidad con routers de cualquier operadora)
- Conceptos y Optimización WiFi (30 guías): ${SITE}/curiosidades/ (cómo colocar y orientar las antenas a 90° o 45°, diferencias 2.4 GHz vs 5 GHz, nivel de señal -60 dBm)
- Usos y Aplicaciones por Espacio (30 guías): ${SITE}/usos/ (gaming sin latencia, streaming 4K, teletrabajo, oficinas, jardines, casas de varios pisos)
- Historia de Internet y Redes (14 artículos): ${SITE}/historia/
- Reseñas de Repetidores WiFi (6 análisis a fondo): ${SITE}/resenas/ (TP-Link AC1200, TP-Link AC1900, Netgear N300, Macard, etc.)
- Trucos y Consejos de Instalación (5 guías maestras): ${SITE}/trucos/ (mejores lugares para poner un repetidor WiFi en casa)
- Contacto / Sobre Charlie Lingán: ${SITE}/hola-hablamos/
`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const body =
      req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const mode = body.mode || (req.method === "GET" ? "config" : "chat");

    // 0. Seed / Sync articles endpoint (protected by x-sync-key)
    if (mode === "seed_articles") {
      const syncKey = req.headers.get("x-sync-key") || "";
      if (syncKey !== "rep-sync-2026") {
        return json({ error: "No autorizado" }, 401);
      }
      const rows = Array.isArray(body.articles) ? body.articles : [];
      if (rows.length === 0) {
        return json({ error: "Sin artículos" }, 400);
      }
      const { error } = await supabase
        .from("repetidores_articles")
        .upsert(rows, { onConflict: "slug" });
      if (error) {
        return json({ error: error.message }, 500);
      }
      catalogCache = null;
      return json({ success: true, count: rows.length });
    }

    // 1. Load live config
    const { data: configRow } = await supabase
      .from("repetidores_chat_config")
      .select("*")
      .eq("id", "default")
      .maybeSingle();

    const config = configRow || {
      is_enabled: true,
      ai_model: "gpt-4o-mini",
      temperature: 0.35,
      max_messages_per_session: 25,
      daily_budget_usd: 5.0,
      welcome_message:
        "¡Hola! 👋 Soy tu Asesor Técnico IA de Repetidores.org. Pregúntame qué repetidor WiFi 6, sistema Mesh o PLC comprar en Amazon según tu casa, dónde colocarlo, cómo solucionar el error 'conectado pero sin internet' o cualquier duda sobre nuestras 809 guías.",
      custom_instructions: "",
    };

    const activeModel = ALLOWED_MODELS.includes(config.ai_model)
      ? config.ai_model
      : "gpt-4o-mini";

    if (mode === "config" || req.method === "GET") {
      return json({
        is_enabled: config.is_enabled,
        welcome_message: config.welcome_message,
        ai_model: activeModel,
        max_messages_per_session: config.max_messages_per_session,
      });
    }

    // 2. Track click on an article link or Amazon product card
    if (mode === "track_click") {
      const {
        session_id,
        visitor_id,
        article_slug,
        article_title,
        category,
        target_url,
        page_url,
      } = body;
      if (target_url) {
        await supabase.from("repetidores_chat_clicks").insert({
          session_id: session_id || null,
          visitor_id: String(visitor_id || "anon").slice(0, 80),
          article_slug: article_slug ? String(article_slug).slice(0, 180) : null,
          article_title: article_title
            ? String(article_title).slice(0, 240)
            : null,
          category: category ? String(category).slice(0, 80) : null,
          target_url: String(target_url).slice(0, 500),
          page_url: page_url ? String(page_url).slice(0, 500) : null,
        });

        if (session_id) {
          const { data: sess } = await supabase
            .from("repetidores_chat_sessions")
            .select("clicks_count, clicked_urls")
            .eq("id", session_id)
            .maybeSingle();
          if (sess) {
            const urls = Array.isArray(sess.clicked_urls)
              ? sess.clicked_urls
              : [];
            if (!urls.includes(target_url)) urls.push(target_url);
            await supabase
              .from("repetidores_chat_sessions")
              .update({
                clicks_count: (sess.clicks_count || 0) + 1,
                clicked_urls: urls,
              })
              .eq("id", session_id);
          }
        }
      }
      return json({ success: true });
    }

    // 3. Chat Completion Mode
    if (!config.is_enabled) {
      return json({
        reply: `En este momento el Asesor Técnico IA está en mantenimiento breve. Puedes explorar nuestras 809 guías de repetidores WiFi y redes Mesh en [Repetidores.org](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: [
          "Ver guías de compra",
          "Solucionar fallos de señal",
        ],
        disabled: true,
      });
    }

    const userMessage = String(body.message || "").trim().slice(0, 1000);
    if (!userMessage) {
      return json({ error: "Mensaje vacío" }, 400);
    }

    const visitorId = String(
      body.visitor_id || "rep-" + crypto.randomUUID().slice(0, 8)
    ).slice(0, 80);
    const region = body.region === "US" ? "US" : "ES";
    const storeName = region === "ES" ? "Amazon.es" : "Amazon.com";
    const pageUrl = String(body.page_url || SITE + "/").slice(0, 500);
    const userAgent = String(
      body.user_agent || req.headers.get("user-agent") || ""
    ).slice(0, 300);
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    let sessionId: string | null = body.session_id || null;

    // Check daily budget
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    const { data: todaySessions } = await supabase
      .from("repetidores_chat_sessions")
      .select("estimated_cost_usd")
      .gte("last_message_at", startOfDay.toISOString());

    const spentToday = (todaySessions || []).reduce(
      (acc: number, r: any) => acc + Number(r.estimated_cost_usd || 0),
      0
    );

    if (spentToday >= Number(config.daily_budget_usd || 5)) {
      return json({
        reply: `Has alcanzado el límite de consultas automáticas del día. Puedes usar el buscador principal o explorar todas nuestras categorías en [Repetidores.org](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: [],
      });
    }

    // Load or create session
    let existingSession: any = null;
    if (sessionId) {
      const { data: s } = await supabase
        .from("repetidores_chat_sessions")
        .select("*")
        .eq("id", sessionId)
        .maybeSingle();
      existingSession = s;
    }

    if (
      existingSession &&
      existingSession.messages_count >=
        (config.max_messages_per_session || 25) * 2
    ) {
      return json({
        session_id: existingSession.id,
        reply: `Hemos llegado al máximo de mensajes por conversación. Puedes abrir cualquiera de las guías o productos recomendados o iniciar una nueva consulta en [Repetidores.org](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: [],
      });
    }

    if (!existingSession) {
      const { data: created, error: createErr } = await supabase
        .from("repetidores_chat_sessions")
        .insert({
          visitor_id: visitorId,
          page_url: pageUrl,
          user_agent: userAgent,
          first_user_message: userMessage.slice(0, 250),
          last_user_message: userMessage.slice(0, 250),
          messages_count: 1,
          model_used: activeModel,
        })
        .select("*")
        .single();

      if (!createErr && created) {
        existingSession = created;
        sessionId = created.id;
      }
    }

    if (sessionId) {
      await supabase.from("repetidores_chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage,
      });
    }

    // Search matching articles in our 809-article catalog
    const catalog = await loadCatalog();
    const recentHistoryText = history
      .slice(-3)
      .map((h: any) => h?.content || "")
      .join(" ");
    const candidateRows = searchArticles(
      catalog.rows,
      userMessage,
      recentHistoryText,
      16
    );

    const candidatesPrompt =
      candidateRows.length > 0
        ? candidateRows
            .map(
              (r) =>
                `- SLUG: "${r.slug}" | TÍTULO: "${r.title}" | CATEGORÍA: ${r.category_name} | URL: ${SITE}/${r.category}/${r.slug}/ | RESUMEN: ${(r.excerpt || "").slice(0, 150)}`
            )
            .join("\n")
        : "No se encontraron artículos exactos con esos términos en el índice.";

    const amazonCatalogPrompt = Object.values(AMAZON_PRODUCTS)
      .map(
        (p) =>
          `- PRODUCT_ID: "${p.id}" | ${p.badge} | NOMBRE: "${p.title}" | DETALLE: ${p.subtitle} | URL_${region}: ${region === "ES" ? p.urlES : p.urlUS}`
      )
      .join("\n");

    const systemPrompt = `Eres el Asesor Técnico y Especialista en Conectividad WiFi IA Oficial de Repetidores.org (${SITE}), la enciclopedia técnica en español con 809 guías verificadas sobre repetidores WiFi, extensores de doble banda (2.4 y 5 GHz), sistemas WiFi 6 Mesh, PLC Powerline, configuración WPS/Modo Punto de Acceso (AP), solución de fallos de conexión y seguridad doméstica WPA3 (fundada por Charlie Lingán).

Tu doble misión es:
1. RESPONDER TODAS LAS INQUIETUDES TÉCNICAS Y DE NAVEGACIÓN DEL USUARIO con rigor de ingeniero de redes y lenguaje claro:
   - Dónde colocar el repetidor (regla del punto intermedio con -55 a -65 dBm, lejos de espejos y microondas), cómo orientar las antenas (90° vertical para un piso, 45° o en L para dos pisos), diferencias entre 2.4 GHz (alcance/muros) y 5 GHz (velocidad Gigabit), cómo configurar con o sin botón WPS, Modo Punto de Acceso (AP) por cable Ethernet, cómo solucionar "Conectado pero sin acceso a internet", caída de velocidad, o cómo detectar intrusos y blindar la red con WPA3 y filtrado MAC.
   - Enlazar dentro de tu respuesta a entre 1 y 3 guías de nuestro listado inferior usando Markdown exacto: [Título de la Guía](${SITE}/categoria/slug/) e incluir sus slugs en "recommended_slugs".
2. AYUDAR ACTIVAMENTE AL USUARIO A ELEGIR Y COMPRAR EL EQUIPO IDEAL EN AMAZON (${storeName}):
   - En TODA consulta donde el usuario busque qué repetidor comprar, compare modelos, tenga problemas de cobertura (2 pisos, paredes gruesas, jardín exterior, teletrabajo, gaming) o tenga un repetidor antiguo que falla o pierde internet, recomiéndale el equipo exacto de nuestro CATÁLOGO AMAZON OFICIAL de abajo.
   - Incluye en tu texto un enlace Markdown directo al producto en ${storeName} usando su URL_${region} exacta (ej. [Ver oferta del TP-Link RE505X WiFi 6 en ${storeName}](URL_${region})) y añade entre 1 y 2 IDs de producto exactos en el arreglo "recommended_product_ids" para que el chat muestre la tarjeta de compra con botón directo a Amazon.

REGLAS ESTRICTAS:
- NUNCA inventes URLs ni slugs que no estén en el listado de ARTÍCULOS ENCONTRADOS o en el CATÁLOGO AMAZON OFICIAL.
- El visitante navega actualmente en: ${pageUrl} (Tienda Amazon detectada: ${storeName}).
${config.custom_instructions ? "- INSTRUCCIÓN ADICIONAL DEL ADMINISTRADOR: " + config.custom_instructions : ""}

${CATEGORIES_OVERVIEW}

CATÁLOGO AMAZON OFICIAL DE REPETIDORES.ORG (USA ESTOS PRODUCT_ID Y URL_${region} PARA RECOMENDAR COMPRAS):
${amazonCatalogPrompt}

ARTÍCULOS ENCONTRADOS EN REPETIDORES.ORG PARA ESTA CONSULTA (USA SOLO ESTOS SLUGS Y URLS EXACTAS):
${candidatesPrompt}

FORMATO DE RESPUESTA (JSON ESTRICTO):
Responde ÚNICAMENTE con un objeto JSON válido con estas 4 llaves exactas:
{
  "reply": "Tu respuesta técnica y comercial en español (máximo 3 párrafos cortos o viñetas claras, incluyendo enlaces Markdown a nuestras guías [Título](${SITE}/categoria/slug/) y enlace al producto recomendado en ${storeName})",
  "recommended_slugs": ["slug-exacto-1", "slug-exacto-2"],
  "recommended_product_ids": ["tplink-re505x-wifi6"],
  "suggested_options": [
    "Pregunta corta u opción 1 para seguir conversando",
    "Pregunta corta u opción 2 para seguir conversando",
    "Pregunta corta u opción 3 para seguir conversando"
  ]
}`;

    const chatMessages: any[] = [{ role: "system", content: systemPrompt }];
    for (const h of history) {
      if (
        h &&
        (h.role === "user" || h.role === "assistant") &&
        typeof h.content === "string"
      ) {
        chatMessages.push({ role: h.role, content: h.content.slice(0, 1200) });
      }
    }
    chatMessages.push({ role: "user", content: userMessage });

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: activeModel,
          messages: chatMessages,
          temperature: Number(config.temperature) || 0.35,
          max_tokens: 900,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      console.error("OpenAI error:", errText);
      throw new Error("OpenAI status " + openaiRes.status);
    }

    const openaiData = await openaiRes.json();
    const rawContent = openaiData.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      parsed = {
        reply: rawContent,
        recommended_slugs: candidateRows.slice(0, 2).map((r) => r.slug),
        recommended_product_ids: ["tplink-re505x-wifi6"],
        suggested_options: [
          "¿Qué repetidor WiFi 6 comprar?",
          "¿Mejor sistema Mesh para 2 pisos?",
          "Solucionar conectado sin internet",
        ],
      };
    }

    const slugs: string[] = Array.isArray(parsed.recommended_slugs)
      ? parsed.recommended_slugs.slice(0, 3)
      : [];
    const recommendedArticles: ArticleCard[] = slugs
      .map((s) => catalog.bySlug.get(s))
      .filter((r): r is ArticleRow => Boolean(r))
      .map(toArticleCard);

    const productIds: string[] = Array.isArray(parsed.recommended_product_ids)
      ? parsed.recommended_product_ids.slice(0, 2)
      : ["tplink-re505x-wifi6"];
    const recommendedProducts: AmazonProductCard[] = productIds
      .map((id) => AMAZON_PRODUCTS[id])
      .filter((p): p is AmazonProductCard => Boolean(p));

    const suggestedOptions: string[] = Array.isArray(parsed.suggested_options)
      ? parsed.suggested_options
          .slice(0, 3)
          .map((s: unknown) => String(s).slice(0, 72))
      : [];

    const replyText: string =
      parsed.reply ||
      `Te recomiendo explorar nuestras guías de repetidores WiFi y sistemas Mesh en [Repetidores.org](${SITE}/).`;

    const promptTokens = openaiData.usage?.prompt_tokens || 0;
    const completionTokens = openaiData.usage?.completion_tokens || 0;
    const totalTokens =
      openaiData.usage?.total_tokens || promptTokens + completionTokens;
    const costUsd = calculateCostUsd(
      activeModel,
      promptTokens,
      completionTokens
    );

    if (sessionId && existingSession) {
      await supabase.from("repetidores_chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: replyText,
        recommended_articles: recommendedArticles,
        suggested_options: suggestedOptions,
        model: activeModel,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        cost_usd: costUsd,
      });

      const prevRecs: string[] = Array.isArray(
        existingSession.recommended_articles
      )
        ? existingSession.recommended_articles
        : [];
      for (const ra of recommendedArticles) {
        if (!prevRecs.includes(ra.title)) prevRecs.push(ra.title);
      }
      for (const rp of recommendedProducts) {
        const label = `[Amazon] ${rp.title}`;
        if (!prevRecs.includes(label)) prevRecs.push(label);
      }

      await supabase
        .from("repetidores_chat_sessions")
        .update({
          last_user_message: userMessage.slice(0, 250),
          messages_count: (existingSession.messages_count || 1) + 2,
          recommended_articles: prevRecs.slice(0, 30),
          prompt_tokens: (existingSession.prompt_tokens || 0) + promptTokens,
          completion_tokens:
            (existingSession.completion_tokens || 0) + completionTokens,
          total_tokens: (existingSession.total_tokens || 0) + totalTokens,
          estimated_cost_usd: Number(
            (Number(existingSession.estimated_cost_usd || 0) + costUsd).toFixed(
              6
            )
          ),
          model_used: activeModel,
          last_message_at: new Date().toISOString(),
        })
        .eq("id", sessionId);
    }

    await supabase.from("token_usage").insert({
      source: "repetidores.org",
      content_type: "ai_chat",
      model: activeModel,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
      images_generated: 0,
      estimated_cost_usd: costUsd,
      slug: sessionId || visitorId,
    });

    return json({
      session_id: sessionId,
      reply: replyText,
      recommended_articles: recommendedArticles,
      recommended_products: recommendedProducts,
      suggested_options: suggestedOptions,
      model: activeModel,
    });
  } catch (err: any) {
    console.error("repetidores-chat error:", err);
    return json(
      {
        error: err.message || "Error interno",
        reply: `Tuvimos un inconveniente momentáneo al procesar tu consulta. Puedes explorar nuestras 809 guías de repetidores WiFi y redes Mesh en [Repetidores.org](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Intentar de nuevo"],
      },
      500
    );
  }
});
