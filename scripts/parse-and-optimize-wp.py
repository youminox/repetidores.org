import xml.etree.ElementTree as ET
import json
import os
import re
import html
from collections import Counter

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
XML_PATH = os.path.join(ROOT_DIR, "repetidores.WordPress.2026-11-04.xml")
DATA_DIR = os.path.join(ROOT_DIR, "data")
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")

os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)

CATEGORY_DESCRIPTIONS = {
    "guias": "Comparativas técnicas, análisis de cobertura y guías de compra para elegir el mejor repetidor WiFi de doble banda, largo alcance, WiFi 6 o sistema Mesh según tu hogar u oficina.",
    "seguridad": "Manuales paso a paso de seguridad en redes inalámbricas: cómo proteger tu repetidor WiFi contra intrusos, configurar cifrado WPA3/WPA2, filtrado MAC, IP estática y control de acceso.",
    "problemas-y-soluciones": "Diagnóstico y solución definitiva a los fallos más frecuentes en repetidores WiFi: conectado pero sin acceso a internet, desconexiones constantes, caída de velocidad, fallos de WPS y luces de error.",
    "configuracion": "Guías prácticas paso a paso para configurar cualquier repetidor WiFi desde el navegador o por botón WPS, vincular con banda de 5 GHz, modo Punto de Acceso (AP) y compatibilidad entre marcas.",
    "curiosidades": "Conceptos fundamentales sobre redes inalámbricas: cómo orientar las antenas de un repetidor WiFi, diferencias entre bandas de 2.4 GHz y 5 GHz, tipos de extensores y optimización de señal.",
    "usos": "Aplicaciones prácticas de los repetidores WiFi en casas de varios pisos, apartamentos, oficinas, gaming de baja latencia, streaming 4K, jardines exteriores, negocios y zonas rurales.",
    "historia": "La evolución de las telecomunicaciones, la creación de Internet, el desarrollo de las redes inalámbricas WiFi y el impacto del Internet de las Cosas (IoT) en la conectividad moderna.",
    "resenas": "Análisis técnicos a fondo de los modelos más destacados de repetidores y extensores de rango WiFi: pruebas de cobertura real, velocidad en Mbps, puertos Ethernet y facilidad de instalación.",
    "trucos": "Consejos de expertos y trucos de ubicación estratégica para multiplicar el alcance de tu repetidor WiFi, eliminar zonas muertas y evitar interferencias electromagnéticas en casa.",
}

CATEGORY_NAMES_CLEAN = {
    "guias": "Guías de Compra y Comparativas",
    "seguridad": "Seguridad y Red Doméstica",
    "problemas-y-soluciones": "Problemas y Soluciones Técnicas",
    "configuracion": "Compatibilidad y Configuración",
    "curiosidades": "Conceptos y Optimización WiFi",
    "usos": "Usos y Aplicaciones por Espacio",
    "historia": "Historia de Internet y Redes",
    "resenas": "Reseñas de Repetidores WiFi",
    "trucos": "Trucos y Consejos de Instalación",
}

TOP_SEO_SLUGS = {
    "como-aumentar-la-senal-de-un-repetidor",
    "como-colocar-las-antenas-de-un-repetidor-wifi",
    "como-deben-ir-las-antenas-de-un-repetidor-wifi",
    "donde-colocar-tu-repetidor-wifi-para-mejor-senal",
    "mejores-lugares-para-poner-un-repetidor-wifi-en-casa",
    "comparativa-entre-repetidores-de-senal-y-sistemas-mesh",
    "diferencias-clave-entre-router-repetidor-y-amplificador-wi-fi",
    "mejores-repetidores-wi-fi-para-casas-grandes-con-varias-plantas",
    "que-repetidor-wi-fi-comprar-si-tu-internet-es-lento-en-el-segundo-piso",
    "repetidores-recomendados-para-oficinas-con-paredes-gruesas",
    "comparativa-de-repetidores-con-puerto-ethernet-para-conectar-por-cable",
    "repetidores-con-doble-banda-ventajas-y-modelos-sugeridos",
    "mi-repetidor-no-conecta-a-internet-que-hacer",
    "repetidor-conectado-pero-sin-acceso-a-internet",
    "tengo-buena-senal-pero-no-hay-internet-con-el-repetidor",
    "mi-repetidor-no-aparece-en-la-lista-de-redes",
    "la-velocidad-baja-mucho-cuando-uso-el-repetidor",
    "no-puedo-acceder-al-panel-del-repetidor-como-arreglarlo",
    "como-configurar-un-repetidor-con-tu-router-principal",
    "configurar-repetidor-en-modo-punto-de-acceso",
    "conectar-repetidor-a-una-red-de-5-ghz-paso-a-paso",
    "como-usar-wps-para-vincular-repetidor-y-router",
    "como-proteger-tu-red-wifi-con-repetidores",
    "como-detectar-si-alguien-usa-tu-repetidor-sin-permiso",
    "tp-link-ac1200-el-repetidor-de-wifi-ideal-para-mejorar-tu-conexion-en-el-hogar",
    "mejora-tu-conexion-con-el-tp-link-extensor-wifi-ac1900-el-mejor-repetidor-de-wifi-para-tu-hogar",
}


def clean_evergreen_title(raw_title: str) -> str:
    if not raw_title:
        return ""
    t = html.unescape(raw_title).strip()

    # 1. Strip trailing AI explanations like "Este título está optimizado para SEO..."
    t = re.sub(
        r"\s*Este\s+t[ií]tulo\s+est[áa]\s+optimizado\s+para\s+SEO.*$",
        "",
        t,
        flags=re.I,
    )

    # 2. Strip leading AI prompt prefixes like 'Título SEO sugerido: "', '¡Claro! Aquí tienes un título SEO optimizado para tu post: "'
    t = re.sub(
        r"^(?:¡?claro[,!]?\s*)?(?:aqu[ií]\s+tienes\s+[^:\"]+?:\s*)?(?:t[ií]tulo\s+seo(?:\s+sugerido|\s+optimizado)?\s*:\s*)?",
        "",
        t,
        flags=re.I,
    )
    t = re.sub(r"^.*?(?:t[ií]tulo\s+seo[^:]*:\s*)", "", t, flags=re.I)

    # 3. Clean "Guía Completa SEO" -> "Guía Completa"
    t = re.sub(r"\bGu[ií]a\s+Completa\s+SEO\b", "Guía Completa", t, flags=re.I)

    # 4. Strip surrounding quotes or stray quotes/backticks
    t = t.strip("`\"'“”‘’ ")
    t = t.replace('"', "").replace("“", "").replace("”", "").replace("`", "").replace("'", "")

    # 5. Replace all year references (2020-2029) with Evergreen phrasing
    t = re.sub(r"Gu[ií]a\s+Completa\s+20\d\d\b", "Guía Completa y Actualizada", t, flags=re.I)
    t = re.sub(r"Gu[ií]a\s+de\s+Compra\s+20\d\d\b", "Guía de Compra Actualizada", t, flags=re.I)
    t = re.sub(r"-\s*Gu[ií]a\s+20\d\d\b", "— Guía Completa", t, flags=re.I)
    t = re.sub(r"Gu[ií]a\s+20\d\d\b", "Guía Completa", t, flags=re.I)
    t = re.sub(r"\s+en\s+20\d\d\?", " Hoy en Día?", t, flags=re.I)
    t = re.sub(r"\s+en\s+20\d\d\b", "", t, flags=re.I)
    t = re.sub(r"\s+del?\s+20\d\d\b", "", t, flags=re.I)
    t = re.sub(r"\s+20\d\d\b", "", t)
    t = re.sub(r"\b20\d\d\b", "", t)

    t = re.sub(r"\s{2,}", " ", t).strip(" -–—:;,")
    return t


def make_text_evergreen(text_segment: str) -> str:
    """Remove outdated year mentions (2020-2025) from visible text while keeping grammar natural."""
    s = text_segment
    s = re.sub(r"Gu[ií]a\s+Completa\s+20\d\d\b", "Guía Completa", s, flags=re.I)
    s = re.sub(r"Gu[ií]a\s+de\s+Compra\s+20\d\d\b", "Guía de Compra", s, flags=re.I)
    s = re.sub(r"Gu[ií]a\s+20\d\d\b", "Guía Completa", s, flags=re.I)
    s = re.sub(r"\bEn\s+el\s+a[ñn]o\s+20\d\d\s*,?", "En la actualidad,", s)
    s = re.sub(r"\ben\s+el\s+a[ñn]o\s+20\d\d\b", "en la actualidad", s, flags=re.I)
    s = re.sub(r"\bEn\s+20\d\d\s*,", "En la actualidad,", s)
    s = re.sub(r"\ben\s+20\d\d\s*\?", "hoy en día?", s, flags=re.I)
    s = re.sub(r"\ben\s+20\d\d\b", "en la actualidad", s, flags=re.I)
    s = re.sub(r"\bpara\s+20\d\d\b", "para la actualidad", s, flags=re.I)
    s = re.sub(r"\bdel\s+20\d\d\b", "actual", s, flags=re.I)
    s = re.sub(r"\bde\s+20\d\d\b", "actual", s, flags=re.I)
    s = re.sub(r"\b202[0-5]\b", "", s)
    s = re.sub(r"\s{2,}", " ", s)
    s = re.sub(r"\s+([,.;:?!])", r"\1", s)
    return s


def apply_evergreen_outside_tags(html_str: str) -> str:
    """Apply evergreen year removal only to text nodes outside HTML tags (<...>) so URLs in src/href stay intact."""
    parts = re.split(r"(<[^>]+>)", html_str)
    for i in range(0, len(parts), 2):
        if parts[i]:
            parts[i] = make_text_evergreen(parts[i])
    return "".join(parts)


def extract_aib_related_links(raw_html: str):
    """Extract internal links from [aib_post_related url='...' title='...'] and clean their titles."""
    links = []
    seen_urls = set()
    for m in re.finditer(r"\[aib_post_related([^\]]*)\]", raw_html, flags=re.I):
        attrs = m.group(1)
        url_m = re.search(r"url=['\"]([^'\"]+)['\"]", attrs)
        title_m = re.search(r"title=['\"]([^'\"]+)['\"]", attrs)
        if url_m and title_m:
            u = url_m.group(1).strip()
            t = clean_evergreen_title(title_m.group(1))
            if not u.startswith("/"):
                u = "/" + u
            if not u.endswith("/"):
                u = u + "/"
            if u not in seen_urls and t:
                seen_urls.add(u)
                links.append({"url": u, "title": t})
    return links


def extract_orbital_amazon_products(raw_html: str):
    """Extract custom-links from wp:orbital/cluster for backup before removing them."""
    products = []
    for m in re.finditer(r"<!--\s*wp:orbital/cluster\s+(\{.*?\})\s*/?-->", raw_html, flags=re.S):
        try:
            data = json.loads(m.group(1))
            if data.get("display") == "custom-links" and "settings" in data:
                settings = json.loads(data["settings"])
                for key, item in settings.items():
                    if isinstance(item, dict) and item.get("link"):
                        products.append(
                            {
                                "heading": item.get("heading", ""),
                                "link": item.get("link", ""),
                                "urlThumbnail": item.get("urlThumbnail", ""),
                                "button": item.get("button", "Ver Oferta"),
                            }
                        )
        except Exception:
            pass
    return products


def clean_content(slug: str, raw_html: str) -> str:
    if not raw_html:
        return ""

    h = raw_html

    # 1. Remove all WordPress block comments (including wp:orbital/cluster with Amazon links)
    h = re.sub(r"<!--\s*/?wp:[^>]*-->", "", h)

    # 2. Remove broken <div id='video-container'> blocks (802 posts)
    h = re.sub(
        r"<div\s+id=['\"]video-container['\"][\s\S]*?</noscript>\s*</div>",
        "",
        h,
        flags=re.I,
    )
    h = re.sub(
        r"<div\s+id=['\"]video-container['\"][\s\S]*?</div>\s*</div>",
        "",
        h,
        flags=re.I,
    )

    # 3. Remove [aib_post_related ...] and other shortcodes
    h = re.sub(r"\[aib_post_related[^\]]*\]", "", h, flags=re.I)
    h = re.sub(r"\[insertar[^\]]*\]", "", h, flags=re.I)
    h = re.sub(r"\[caption[^\]]*\](.*?)\[/caption\]", r"\1", h, flags=re.S | re.I)
    h = re.sub(r"\[gallery[^\]]*\]", "", h, flags=re.I)
    h = re.sub(r"\[embed\](.*?)\[/embed\]", r"\1", h, flags=re.S | re.I)

    # 4. Convert leftover **bold** markdown to <strong> (found in 185 posts)
    h = re.sub(r"\*\*([^*<>]+)\*\*", r"<strong>\1</strong>", h)

    # 5. Normalize internal repetidores.org URLs (strip domain and ensure trailing slash)
    h = re.sub(
        r"https?://(?:www\.)?repetidores\.org/([a-z0-9-_]+/[a-z0-9-_]+)/?(?=['\"\s>])",
        r"/\1/",
        h,
        flags=re.I,
    )

    # 6. Apply Evergreen transformation to all visible text outside HTML tags
    h = apply_evergreen_outside_tags(h)

    # 7. Remove empty paragraphs and excessive line breaks
    h = re.sub(r"<p>\s*(?:&nbsp;|\s|<br\s*/?>)*\s*</p>", "", h, flags=re.I)
    h = re.sub(r"(\s*<br\s*/?>\s*){2,}", "<br />", h, flags=re.I)
    h = re.sub(r"\n{3,}", "\n\n", h)

    return h.strip()


def generate_clean_excerpt(content_html: str, max_length: int = 158) -> str:
    if not content_html:
        return ""
    paragraphs = re.findall(r"<p[^>]*>(.*?)</p>", content_html, flags=re.I | re.S)
    text_source = " ".join(paragraphs[:3]) if paragraphs else content_html
    text = re.sub(r"<[^>]*>", " ", text_source)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= max_length:
        return text
    truncated = text[:max_length]
    last_space = truncated.rfind(" ")
    if last_space > max_length * 0.6:
        truncated = truncated[:last_space]
    return truncated.rstrip(".,;: ") + "..."


def calculate_read_time(content_html: str) -> str:
    text = re.sub(r"<[^>]*>", " ", content_html)
    words = len(text.split())
    minutes = max(4, round(words / 200))
    return f"{minutes} min"


def main():
    print("📖 Parsing WordPress XML:", XML_PATH)
    tree = ET.parse(XML_PATH)
    root = tree.getroot()
    channel = root.find("channel")

    ns = {
        "wp": "http://wordpress.org/export/1.2/",
        "content": "http://purl.org/rss/1.0/modules/content/",
        "excerpt": "http://purl.org/rss/1.0/modules/excerpt/",
        "dc": "http://purl.org/dc/elements/1.1/",
    }

    # 1. Extract categories
    categories = []
    cat_by_slug = {}
    for cat_el in channel.findall("wp:category", namespaces=ns):
        cid = int(cat_el.findtext("wp:term_id", default="0", namespaces=ns))
        slug = (cat_el.findtext("wp:category_nicename", default="", namespaces=ns) or "").strip()
        raw_name = (cat_el.findtext("wp:cat_name", default="", namespaces=ns) or "").strip()
        parent = (cat_el.findtext("wp:category_parent", default="", namespaces=ns) or "").strip()
        desc = CATEGORY_DESCRIPTIONS.get(slug) or (
            cat_el.findtext("wp:category_description", default="", namespaces=ns) or ""
        ).strip()
        clean_name = CATEGORY_NAMES_CLEAN.get(slug, raw_name)
        cat_obj = {
            "id": cid,
            "slug": slug,
            "name": clean_name,
            "parent": parent,
            "description": desc,
            "count": 0,
        }
        categories.append(cat_obj)
        cat_by_slug[slug] = cat_obj

    # 2. First pass: collect attachments and ads.txt
    attachments = {}
    image_urls = set()
    ads_txt_content = "google.com, pub-1070738569472471, DIRECT, f08c47fec0942fa0\n"

    for item in channel.findall("item"):
        pt = item.findtext("wp:post_type", default="", namespaces=ns)
        if pt == "attachment":
            pid = int(item.findtext("wp:post_id", default="0", namespaces=ns))
            url = (item.findtext("wp:attachment_url", default="", namespaces=ns) or "").strip()
            if url:
                attachments[pid] = url
                image_urls.add(url)
        elif pt == "adstxt":
            c = (item.findtext("content:encoded", default="", namespaces=ns) or "").strip()
            if c:
                ads_txt_content = c + "\n"

    with open(os.path.join(PUBLIC_DIR, "ads.txt"), "w", encoding="utf-8") as f:
        f.write(ads_txt_content)

    # Ensure Charlie Lingan author photo & site logos are included
    image_urls.add("https://repetidores.org/wp-content/uploads/2024/08/charlie-lingan-4.jpg")
    image_urls.add("https://repetidores.org/wp-content/uploads/2024/06/cropped-LOGO-WORDPRESS-9.png")
    image_urls.add("https://repetidores.org/wp-content/uploads/2024/06/cropped-Cocogoose-7.png")

    # 3. Second pass: collect posts, pages, and backup Amazon products
    posts = []
    pages = []
    amazon_backup = {}
    seen_titles = Counter()

    for item in channel.findall("item"):
        pt = item.findtext("wp:post_type", default="", namespaces=ns)
        st = item.findtext("wp:status", default="", namespaces=ns)
        if pt not in ("post", "page") or st != "publish":
            continue

        pid = int(item.findtext("wp:post_id", default="0", namespaces=ns))
        raw_title = item.findtext("title", default="") or ""
        slug = (item.findtext("wp:post_name", default="", namespaces=ns) or "").strip()
        date_str = (item.findtext("wp:post_date", default="", namespaces=ns) or "").strip()
        mod_str = (item.findtext("wp:post_modified", default="", namespaces=ns) or "").strip()
        raw_content = item.findtext("content:encoded", default="", namespaces=ns) or ""

        # Backup any orbital Amazon products before stripping them
        amz_prods = extract_orbital_amazon_products(raw_content)
        if amz_prods:
            amazon_backup[slug] = amz_prods
            for prod in amz_prods:
                if prod.get("urlThumbnail"):
                    image_urls.add(prod["urlThumbnail"])

        # Extract inline aib_post_related links
        inline_related = extract_aib_related_links(raw_content)

        # Extract categories
        post_cats = []
        for c in item.findall("category"):
            if c.attrib.get("domain") == "category":
                c_slug = c.attrib.get("nicename", "").strip()
                c_name = CATEGORY_NAMES_CLEAN.get(c_slug, (c.text or "").strip())
                if c_slug:
                    post_cats.append({"slug": c_slug, "name": c_name})

        primary_cat = post_cats[0] if post_cats else {"slug": "guias", "name": "Guías de Compra y Comparativas"}

        # Featured image ID
        thumb_id = None
        for meta in item.findall("wp:postmeta", namespaces=ns):
            if meta.findtext("wp:meta_key", default="", namespaces=ns) == "_thumbnail_id":
                val = meta.findtext("wp:meta_value", default="", namespaces=ns)
                if val and val.isdigit():
                    thumb_id = int(val)
                break

        featured_url = attachments.get(thumb_id, "") if thumb_id else ""
        if not featured_url and pt == "post":
            # Fallback image for the 1 post without a thumbnail (como-extender-red-wifi-sin-cambiar-el-ssid-en-repetidores-portatiles)
            featured_url = "https://repetidores.org/wp-content/uploads/2025/12/como-extender-red-WiFi-sin-cambiar-el-SSID-en-repetidores-con-doble-banda.jpg"
        if featured_url:
            image_urls.add(featured_url)

        # Extract any inline wp-content image URLs
        for m in re.finditer(
            r"https?://(?:www\.)?repetidores\.org/wp-content/uploads/[^\s\"'<>]+\.(?:jpg|jpeg|png|webp|gif)",
            raw_content,
            flags=re.I,
        ):
            image_urls.add(m.group(0).replace("http://", "https://").replace("//www.", "//"))

        cleaned_html = clean_content(slug, raw_content)
        cleaned_title = clean_evergreen_title(raw_title) if pt == "post" else (raw_title or slug)

        if pt == "post":
            seen_titles[cleaned_title.lower()] += 1
            if seen_titles[cleaned_title.lower()] > 1:
                cleaned_title = f"{cleaned_title} — Guía Práctica"

        excerpt = generate_clean_excerpt(cleaned_html)
        read_time = calculate_read_time(cleaned_html)
        is_top_seo = slug in TOP_SEO_SLUGS

        record = {
            "id": pid,
            "title": cleaned_title,
            "slug": slug,
            "category": primary_cat["slug"],
            "categoryName": primary_cat["name"],
            "categories": post_cats,
            "date": date_str,
            "modified": mod_str or date_str,
            "readTime": read_time,
            "content": cleaned_html,
            "excerpt": excerpt,
            "featuredImageId": thumb_id,
            "featuredImageUrl": featured_url,
            "inlineRelated": inline_related[:4],
            "isTopSeo": is_top_seo,
            "type": pt,
            "status": st,
        }

        if pt == "page":
            pages.append(record)
        else:
            posts.append(record)

    # Sort posts: newest first
    posts.sort(key=lambda x: x["date"], reverse=True)

    # Count categories
    for c in categories:
        c["count"] = 0
    for p in posts:
        matched_slugs = {p["category"]} | {c["slug"] for c in p["categories"]}
        for s in matched_slugs:
            if s in cat_by_slug:
                cat_by_slug[s]["count"] += 1

    active_categories = [c for c in categories if c["count"] > 0]
    active_categories.sort(key=lambda x: x["count"], reverse=True)

    # Save JSON files
    with open(os.path.join(DATA_DIR, "posts.json"), "w", encoding="utf-8") as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    with open(os.path.join(DATA_DIR, "pages.json"), "w", encoding="utf-8") as f:
        json.dump(pages, f, ensure_ascii=False, indent=2)

    with open(os.path.join(DATA_DIR, "categories.json"), "w", encoding="utf-8") as f:
        json.dump(active_categories, f, ensure_ascii=False, indent=2)

    with open(os.path.join(DATA_DIR, "image-urls.json"), "w", encoding="utf-8") as f:
        json.dump(sorted(image_urls), f, ensure_ascii=False, indent=2)

    with open(os.path.join(DATA_DIR, "amazon-products-backup.json"), "w", encoding="utf-8") as f:
        json.dump(amazon_backup, f, ensure_ascii=False, indent=2)

    # Save lightweight search-index.json in public/
    search_index = [
        {
            "t": p["title"],
            "s": p["slug"],
            "c": p["category"],
            "n": p["categoryName"],
            "r": p["readTime"],
        }
        for p in posts
    ]
    with open(os.path.join(PUBLIC_DIR, "search-index.json"), "w", encoding="utf-8") as f:
        json.dump(search_index, f, ensure_ascii=False)

    # Strict Evergreen & Quality Audits
    remaining_amz = sum(1 for p in posts if "amzn.to" in p["content"])
    remaining_vid = sum(1 for p in posts if "video-container" in p["content"])
    remaining_aib = sum(1 for p in posts if "[aib_post_related" in p["content"])
    remaining_ai_titles = sum(
        1 for p in posts if re.search(r"t[ií]tulo\s*seo|claro.*t[ií]tulo|optimizado\s+para\s+seo", p["title"], re.I)
    )
    remaining_title_years = sum(
        1 for p in posts if re.search(r"\b202[0-5]\b", p["title"])
    )
    remaining_content_years = 0
    for p in posts:
        plain_text = re.sub(r"<[^>]+>", " ", p["content"])
        if re.search(r"\b202[0-5]\b", plain_text):
            remaining_content_years += 1

    top_seo_count = sum(1 for p in posts if p["isTopSeo"])

    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print(f"✅ Published unique posts processed:   {len(posts)}")
    print(f"✅ Top SEO priority posts flagged:     {top_seo_count}")
    print(f"✅ Published pages processed:          {len(pages)}")
    print(f"✅ Active categories:                  {len(active_categories)}")
    print(f"✅ Unique image URLs to download:      {len(image_urls)}")
    print(f"✅ Search index items generated:       {len(search_index)}")
    print(f"✅ Amazon links left in HTML:          {remaining_amz} (Backed up {len(amazon_backup)} clusters)")
    print(f"✅ Broken video containers left:       {remaining_vid}")
    print(f"✅ Raw [aib_post_related] left:        {remaining_aib}")
    print(f"✅ AI prompt leaks in titles left:     {remaining_ai_titles}")
    print(f"✅ Outdated years in titles left:      {remaining_title_years}")
    print(f"✅ Outdated years in content left:     {remaining_content_years}")
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")


if __name__ == "__main__":
    main()
