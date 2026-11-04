import postsData from "../../data/posts.json";
import pagesData from "../../data/pages.json";
import categoriesData from "../../data/categories.json";

export const SITE_NAME = "Repetidores.org";
export const SITE_URL = "https://repetidores.org";
export const SITE_DESCRIPTION =
  "Portal técnico especializado en repetidores WiFi, extensores de señal y redes Mesh: comparativas de compra, configuración paso a paso, solución de fallos de conexión y seguridad en el hogar.";
export const ADSENSE_CLIENT = "ca-pub-1070738569472471";
export const GA_ID = "G-E5YPKY0JLN";

export interface PostCategory {
  slug: string;
  name: string;
}

export interface InlineRelatedLink {
  url: string;
  title: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  category: string;
  categoryName: string;
  categories: PostCategory[];
  date: string;
  modified: string;
  readTime: string;
  content: string;
  excerpt: string;
  featuredImageId: number | null;
  featuredImageUrl: string;
  inlineRelated?: InlineRelatedLink[];
  isTopSeo?: boolean;
  type: string;
  status: string;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  parent: string;
  description: string;
  count: number;
}

const posts: Post[] = postsData as Post[];
const pages: Post[] = pagesData as Post[];
const categories: Category[] = categoriesData as Category[];

const postBySlugMap = new Map<string, Post>();
for (const p of posts) {
  postBySlugMap.set(p.slug, p);
}

const categoryBySlugMap = new Map<string, Category>();
for (const c of categories) {
  categoryBySlugMap.set(c.slug, c);
}

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return postBySlugMap.get(slug);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categoryBySlugMap.get(slug);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return posts.filter(
    (p) =>
      p.category === categorySlug ||
      p.categories.some((c) => c.slug === categorySlug)
  );
}

export function getTopSeoPosts(limit = 12): Post[] {
  const topPosts = posts.filter((p) => p.isTopSeo);
  return topPosts.slice(0, limit);
}

const PRIORITY_BUYING_AND_REVIEW_SLUGS = [
  "mejores-repetidores-wi-fi-para-casas-grandes-con-varias-plantas",
  "comparativa-entre-repetidores-de-senal-y-sistemas-mesh",
  "que-repetidor-wi-fi-comprar-si-tu-internet-es-lento-en-el-segundo-piso",
  "diferencias-clave-entre-router-repetidor-y-amplificador-wi-fi",
  "comparativa-de-repetidores-con-puerto-ethernet-para-conectar-por-cable",
  "repetidores-con-doble-banda-ventajas-y-modelos-sugeridos",
  "tp-link-ac1200-el-repetidor-de-wifi-ideal-para-mejorar-tu-conexion-en-el-hogar",
  "mejora-tu-conexion-con-el-tp-link-extensor-wifi-ac1900-el-mejor-repetidor-de-wifi-para-tu-hogar",
  "mejora-tu-conexion-con-el-repetidor-de-wifi-netgear-n300-la-solucion-ideal-para-tu-hogar",
  "amplifica-tu-conexion-repetidor-de-wifi-macard-el-mejor-extensor-de-senal-para-el-hogar",
  "repetidores-recomendados-para-oficinas-con-paredes-gruesas",
  "mejores-marcas-de-repetidores-wi-fi-segun-usuarios-domesticos",
];

export function getFeaturedBuyingGuides(limit = 6): Post[] {
  const result: Post[] = [];
  for (const slug of PRIORITY_BUYING_AND_REVIEW_SLUGS) {
    const found = postBySlugMap.get(slug);
    if (found) {
      result.push(found);
    }
    if (result.length >= limit) break;
  }
  if (result.length < limit) {
    for (const p of posts) {
      if (
        (p.category === "guias" || p.category === "resenas") &&
        !result.some((r) => r.id === p.id)
      ) {
        result.push(p);
        if (result.length >= limit) break;
      }
    }
  }
  return result;
}

const PRIORITY_TROUBLESHOOTING_SLUGS = [
  "repetidor-conectado-pero-sin-acceso-a-internet",
  "mi-repetidor-no-conecta-a-internet-que-hacer",
  "tengo-buena-senal-pero-no-hay-internet-con-el-repetidor",
  "mi-repetidor-no-aparece-en-la-lista-de-redes",
  "la-velocidad-baja-mucho-cuando-uso-el-repetidor",
  "no-puedo-acceder-al-panel-del-repetidor-como-arreglarlo",
  "como-colocar-las-antenas-de-un-repetidor-wifi",
  "donde-colocar-tu-repetidor-wifi-para-mejor-senal",
  "como-configurar-un-repetidor-con-tu-router-principal",
];

export function getTroubleshootingGuides(limit = 6): Post[] {
  const result: Post[] = [];
  for (const slug of PRIORITY_TROUBLESHOOTING_SLUGS) {
    const found = postBySlugMap.get(slug);
    if (found) {
      result.push(found);
    }
    if (result.length >= limit) break;
  }
  return result;
}

export function getRecentPosts(limit = 24): Post[] {
  return posts.slice(0, limit);
}

export function getRelatedPosts(currentPost: Post, limit = 4): Post[] {
  const sameCategory = posts.filter(
    (p) => p.id !== currentPost.id && p.category === currentPost.category
  );
  const topInCat = sameCategory.filter((p) => p.isTopSeo);
  const regularInCat = sameCategory.filter((p) => !p.isTopSeo);
  const combined = [...topInCat, ...regularInCat];
  if (combined.length >= limit) {
    const result: Post[] = [];
    if (topInCat.length > 0) {
      result.push(topInCat[currentPost.id % topInCat.length]);
    }
    const startIdx = currentPost.id % Math.max(1, regularInCat.length);
    for (let i = 0; i < regularInCat.length && result.length < limit; i++) {
      const candidate = regularInCat[(startIdx + i) % regularInCat.length];
      if (!result.some((r) => r.id === candidate.id)) {
        result.push(candidate);
      }
    }
    return result.slice(0, limit);
  }
  return combined.slice(0, limit);
}

export function getContextualRelatedPosts(currentPost: Post, limit = 3): Post[] {
  const result: Post[] = [];

  // 1. First use extracted [aib_post_related] internal links if they match valid posts
  if (currentPost.inlineRelated && currentPost.inlineRelated.length > 0) {
    for (const item of currentPost.inlineRelated) {
      const parts = item.url.replace(/^\/|\/$/g, "").split("/");
      const targetSlug = parts[parts.length - 1];
      const targetPost = postBySlugMap.get(targetSlug);
      if (
        targetPost &&
        targetPost.id !== currentPost.id &&
        !result.some((r) => r.id === targetPost.id)
      ) {
        result.push(targetPost);
      }
      if (result.length >= limit) return result;
    }
  }

  // 2. Fallback to same category posts with deterministic offset so every post gets rich internal links
  const sameCat = posts.filter(
    (p) => p.id !== currentPost.id && p.category === currentPost.category
  );
  if (sameCat.length > 0) {
    const offset = (currentPost.id * 7) % sameCat.length;
    for (let i = 0; i < sameCat.length && result.length < limit; i++) {
      const candidate = sameCat[(offset + i) % sameCat.length];
      if (!result.some((r) => r.id === candidate.id)) {
        result.push(candidate);
      }
    }
  }

  return result;
}

export function getPageBySlug(slug: string): Post | undefined {
  return pages.find((p) => p.slug === slug);
}

export function getPostUrl(post: Post): string {
  return `/${post.category}/${post.slug}/`;
}

export function getImageUrl(url: string): string {
  if (!url) {
    return "/images/Como-aumentar-la-senal-de-un-repetidor.jpg";
  }
  if (url.startsWith("/images/")) {
    return url;
  }
  const filename = url.split("/").pop()?.split("?")[0] || "";
  return `/images/${filename}`;
}

export function generateExcerpt(html: string, maxLength = 158): string {
  if (!html) return SITE_DESCRIPTION;
  const plain = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLength) return plain;
  const cut = plain.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:]+$/, "") + "...";
}
