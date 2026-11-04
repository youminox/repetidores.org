import Link from "next/link";
import { getAllCategories, SITE_NAME } from "@/lib/data";

export default function Footer() {
  const categories = getAllCategories();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-slate-950 font-black">
                WiFi
              </div>
              <span className="text-xl font-extrabold text-white">
                Repetidores<span className="text-sky-400">.org</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Enciclopedia técnica en español sobre repetidores WiFi, extensores
              de rango de doble banda, redes Mesh y puntos de acceso:
              comparativas de compra, configuración paso a paso, seguridad
              doméstica y solución definitiva a caídas de señal.
            </p>
            <div className="pt-1">
              <Link
                href="/hola-hablamos/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300"
              >
                Dirección editorial: Charlie Lingán →
              </Link>
            </div>
          </div>

          {/* Column 2: All Categories Part 1 */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Categorías Principales
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}/`}
                    className="text-slate-400 hover:text-sky-400 transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-semibold text-slate-400">
                      {cat.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: All Categories Part 2 */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Optimización y Aplicaciones
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {categories.slice(5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}/`}
                    className="text-slate-400 hover:text-sky-400 transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-semibold text-slate-400">
                      {cat.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Essential Pillar Guides & Legal */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Guías Esenciales & Legal
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link
                  href="/guias/comparativa-entre-repetidores-de-senal-y-sistemas-mesh/"
                  className="hover:text-sky-400 transition-colors font-semibold text-sky-300"
                >
                  ★ Repetidores WiFi vs Sistemas Mesh
                </Link>
              </li>
              <li>
                <Link
                  href="/problemas-y-soluciones/repetidor-conectado-pero-sin-acceso-a-internet/"
                  className="hover:text-sky-400 transition-colors"
                >
                  Repetidor Conectado pero Sin Internet
                </Link>
              </li>
              <li>
                <Link
                  href="/curiosidades/como-colocar-las-antenas-de-un-repetidor-wifi/"
                  className="hover:text-sky-400 transition-colors"
                >
                  Cómo Orientar las Antenas del Repetidor
                </Link>
              </li>
              <li>
                <Link
                  href="/configuracion/configurar-repetidor-en-modo-punto-de-acceso/"
                  className="hover:text-sky-400 transition-colors"
                >
                  Configurar Modo Punto de Acceso (AP)
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <Link
                  href="/hola-hablamos/"
                  className="hover:text-white transition-colors"
                >
                  Sobre Nosotros / Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-privacidad/"
                  className="hover:text-white transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/aviso-legal/"
                  className="hover:text-white transition-colors"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-cookies/"
                  className="hover:text-white transition-colors"
                >
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {SITE_NAME}. Todos los derechos reservados. Guías técnicas de
            conectividad y comparativas verificadas.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/sitemap.xml" className="hover:text-slate-300">
              Mapa del Sitio (XML)
            </Link>
            <span>·</span>
            <Link href="/hola-hablamos/" className="hover:text-slate-300">
              Charlie Lingán
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
