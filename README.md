# Repetidores.org — Portal Técnico de Repetidores WiFi, Redes Mesh y Cobertura

Migración completa desde WordPress hacia **Next.js (App Router + SSG)** desplegado en **GitHub (`youminox/repetidores.org`) + Vercel (`info@youminox.com`)**.

## Características Principales
- **809 Artículos Técnicos y Comparativas (`/:category/:slug/`)**: Preservación 100% de las URLs originales con `trailingSlash: true` y redirecciones 301 permanentes.
- **9 Categorías Especializadas (`/:category/`)**: Desbloqueo de los 729 artículos que estaban huérfanos en WordPress (`/guias/`, `/seguridad/`, `/problemas-y-soluciones/`, `/configuracion/`, `/curiosidades/`, `/usos/`, `/historia/`, `/resenas/`, `/trucos/`).
- **Home de Alta Retención**:
  - Buscador instantáneo (`HeroSearch.tsx`) sobre las 809 guías.
  - Herramienta interactiva de Diagnóstico WiFi y Selector de Repetidor Ideal (`WifiCoverageAdvisor.tsx`).
  - Explorador interactivo por categorías (`BlogExplorerClient.tsx`).
- **Diseño Editorial `dinamica.pe` en Artículos**: Layout a 2 columnas con Sidebar Sticky, Tabla de Contenidos automática (TOC), enlazado interno contextual (`[aib_post_related]` convertidos en enlaces reales), JSON-LD (`BlogPosting`, `FAQPage`, `BreadcrumbList`) y caja de autor E-E-A-T (**Charlie Lingán**).
- **Monetización Google AdSense (`ca-pub-1070738569472471`)**: Archivo `/public/ads.txt` verificado y bloques `AdBanner` estratégicos sin CLS.
- **813 Imágenes Optimizadas Localmente**: Servidas desde `/public/images/`.
