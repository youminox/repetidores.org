"use client";

import { useState } from "react";
import Link from "next/link";

const ADVISOR_PROFILES = [
  {
    id: "casa-grande",
    badge: "Casas de 2 o Más Plantas & Paredes Gruesas",
    title: "Cobertura Total en Casas Grandes y Segundo Piso",
    tech: "Repetidor Doble Banda AC1900/AX3000 o Red WiFi Mesh",
    band: "Banda Dual Simultánea (2.4 GHz Largo Alcance + 5 GHz Alta Velocidad)",
    summary:
      "Para viviendas de varios niveles o muros de concreto/ladrillo, necesitas un repetidor con antenas externas de alta ganancia (con Beamforming) o un sistema de nodos Mesh que mantenga un único nombre de red (SSID) sin cortes al caminar por la casa.",
    pros: [
      "Penetración superior en muros gruesos y losas entre primer y segundo piso",
      "Tecnología MU-MIMO para conectar más de 25 dispositivos simultáneos",
      "Puerto Gigabit Ethernet para usar en modo Punto de Acceso (AP) por cable",
    ],
    guides: [
      {
        title: "Los Mejores Repetidores WiFi para Casas Grandes de Varias Plantas",
        href: "/guias/mejores-repetidores-wi-fi-para-casas-grandes-con-varias-plantas/",
      },
      {
        title: "Comparativa Exhaustiva: Repetidores de Señal vs Sistemas Mesh",
        href: "/guias/comparativa-entre-repetidores-de-senal-y-sistemas-mesh/",
      },
      {
        title: "¿Qué Repetidor Comprar si tu Internet es Lento en el Segundo Piso?",
        href: "/guias/que-repetidor-wi-fi-comprar-si-tu-internet-es-lento-en-el-segundo-piso/",
      },
    ],
  },
  {
    id: "gaming-streaming",
    badge: "Gaming Competitivo & Streaming 4K",
    title: "Mínima Latencia (Ping Estable) y Máxima Velocidad",
    tech: "Extensor Doble Banda 5 GHz con Puerto Gigabit Ethernet",
    band: "Prioridad en Banda 5 GHz (867 Mbps – 2400 Mbps) + Conexión por Cable",
    summary:
      "Si juegas en consola/PC o reproduces contenido 4K sin buffering, evita los repetidores simples de 2.4 GHz. Elige un extensor AC1200/AC1900 o WiFi 6 con puerto Ethernet integrado para conectar tu consola o Smart TV directamente por cable LAN al repetidor.",
    pros: [
      "Elimina picos de lag y pérdida de paquetes en partidas online",
      "Banda de 5 GHz libre de interferencias de microondas y Bluetooth",
      "Puerto Ethernet dedicado para PS5, Xbox, PC Gamer o Smart TV 4K",
    ],
    guides: [
      {
        title: "Mejores Repetidores de Wi-Fi para Juegos en Línea: Optimiza tu Conexión",
        href: "/usos/repetidores-de-wi-fi-para-juegos-en-linea/",
      },
      {
        title: "¿Qué Tipo de Repetidor es Mejor para Streaming sin Cortes?",
        href: "/guias/que-tipo-de-repetidor-es-mejor-para-streaming-sin-cortes/",
      },
      {
        title: "Comparativa de Repetidores con Puerto Ethernet para Conectar por Cable",
        href: "/guias/comparativa-de-repetidores-con-puerto-ethernet-para-conectar-por-cable/",
      },
    ],
  },
  {
    id: "oficina-teletrabajo",
    badge: "Oficinas, Teletrabajo & Videollamadas",
    title: "Videollamadas Estables en Zoom/Teams y Alta Densidad",
    tech: "Repetidor Empresarial / Modo Punto de Acceso con Seguridad WPA3",
    band: "Balanceo Automático de Carga 2.4 GHz + 5 GHz",
    summary:
      "En oficinas y estudios de teletrabajo donde la conexión no puede caerse a mitad de una reunión, la clave es la estabilidad de subida (upload), el aislamiento de red de invitados y la ubicación equidistante entre el router principal y los puestos de trabajo.",
    pros: [
      "Estabilidad continua en videollamadas HD sin congelamiento de audio/video",
      "Seguridad avanzada con listas de control de acceso (MAC) y red de visitas",
      "Fácil administración desde navegador web o aplicación móvil",
    ],
    guides: [
      {
        title: "Los Mejores Repetidores Recomendados para Oficinas con Paredes Gruesas",
        href: "/guias/repetidores-recomendados-para-oficinas-con-paredes-gruesas/",
      },
      {
        title: "Guía Completa para Configurar un Repetidor en Modo Punto de Acceso",
        href: "/configuracion/configurar-repetidor-en-modo-punto-de-acceso/",
      },
      {
        title: "Cómo Proteger tu Red WiFi con Repetidores: Maximizar Seguridad",
        href: "/seguridad/como-proteger-tu-red-wifi-con-repetidores/",
      },
    ],
  },
  {
    id: "apartamento-hogar",
    badge: "Apartamentos, Estudiantes & Presupuesto",
    title: "Instalación Rápida Enchufable y Excelente Calidad-Precio",
    tech: "Repetidor Compacto de Pared (Wall-Plug) con Botón WPS",
    band: "Doble Banda AC750 / AC1200 Compacto",
    summary:
      "Para eliminar zonas muertas en habitaciones al fondo de un apartamento o conectar cámaras inteligentes y dispositivos IoT sin gastar de más, un repetidor compacto de enchufe directo se instala en menos de 2 minutos presionando el botón WPS.",
    pros: [
      "Diseño discreto enchufable directamente a la toma eléctrica sin cables",
      "Indicador LED inteligente que te avisa si está demasiado lejos del router",
      "Excelente relación calidad-precio en marcas líderes como TP-Link y Netgear",
    ],
    guides: [
      {
        title: "Los 5 Repetidores Wi-Fi Más Fáciles de Instalar para Principiantes",
        href: "/guias/repetidores-wi-fi-mas-faciles-de-instalar-para-principiantes/",
      },
      {
        title: "Reseña: TP-Link AC1200 — El Repetidor Ideal para el Hogar",
        href: "/resenas/tp-link-ac1200-el-repetidor-de-wifi-ideal-para-mejorar-tu-conexion-en-el-hogar/",
      },
      {
        title: "Dónde Colocar tu Repetidor WiFi para una Señal Óptima",
        href: "/trucos/donde-colocar-tu-repetidor-wifi-para-mejor-senal/",
      },
    ],
  },
];

const DIAGNOSTIC_ISSUES = [
  {
    id: "sin-internet",
    symptom: "⚠️ Repetidor conectado (buena señal WiFi) pero dice 'Sin acceso a Internet'",
    cause:
      "Conflicto de direcciones IP (DHCP) entre el router principal y el repetidor, cambio reciente de contraseña/canal en el router principal o pérdida de enlace en la banda troncal.",
    fix: [
      "Desenchufa el repetidor 30 segundos y reinicia el router principal para renovar la tabla de asignación DHCP.",
      "Verifica que el repetidor esté ubicado a medio camino (donde aún lleguen al menos 3 barras reales del router original).",
      "Si el fallo persiste, asigna una IP estática o desactiva el servidor DHCP secundario dentro del panel del repetidor.",
    ],
    mainGuide: {
      title: "Repetidor Conectado pero Sin Acceso a Internet: Soluciones Prácticas",
      href: "/problemas-y-soluciones/repetidor-conectado-pero-sin-acceso-a-internet/",
    },
    extraGuide: {
      title: "¿Por Qué Tengo Buena Señal Pero No Hay Internet con el Repetidor?",
      href: "/problemas-y-soluciones/tengo-buena-senal-pero-no-hay-internet-con-el-repetidor/",
    },
  },
  {
    id: "velocidad-lenta",
    symptom: "🐢 La velocidad de Internet cae a la mitad al conectarme al repetidor",
    cause:
      "Los repetidores de banda simple usan el mismo canal de 2.4 GHz para recibir y transmitir al mismo tiempo (Half-Duplex), o el equipo está colocado demasiado lejos del router principal.",
    fix: [
      "Vincula tu repetidor a la banda de 5 GHz del router o activa el modo 'High Speed / Cross-Band' en el panel de control.",
      "Coloca las antenas externas en posición vertical (90°) en pisos de una planta, o ligeramente inclinadas (45°) si envías señal al segundo piso.",
      "Si tienes cable de red cerca, cambia el repetidor a 'Modo Punto de Acceso (AP)' para recuperar el 100% de la velocidad contratada.",
    ],
    mainGuide: {
      title: "Soluciones Efectivas Cuando la Velocidad Baja Mucho al Usar el Repetidor",
      href: "/problemas-y-soluciones/la-velocidad-baja-mucho-cuando-uso-el-repetidor/",
    },
    extraGuide: {
      title: "Guía Definitiva: Cómo Colocar las Antenas de un Repetidor WiFi",
      href: "/curiosidades/como-colocar-las-antenas-de-un-repetidor-wifi/",
    },
  },
  {
    id: "no-aparece-red",
    symptom: "🔍 Mi repetidor no aparece en la lista de redes WiFi o no vincula por WPS",
    cause:
      "El botón WPS está deshabilitado por seguridad en el router de tu operadora, la red de 5 GHz usa un canal DFS no compatible, o el repetidor tiene guardada una configuración anterior.",
    fix: [
      "Mantén presionado el botón físico 'Reset' del repetidor con un clip durante 8–10 segundos hasta que parpadeen todos los LEDs.",
      "En lugar del botón WPS, configura el repetidor desde el navegador entrando a 192.168.0.254 o tplinkrepeater.net.",
      "En el router principal, fija el canal de 5 GHz entre el canal 36 y el 48 para garantizar compatibilidad universal.",
    ],
    mainGuide: {
      title: "¿Qué Hacer si Mi Repetidor No Aparece en la Lista de Redes?",
      href: "/problemas-y-soluciones/mi-repetidor-no-aparece-en-la-lista-de-redes/",
    },
    extraGuide: {
      title: "Cómo Configurar un Repetidor WiFi desde el Navegador en 5 Pasos",
      href: "/configuracion/como-configurar-repetidor-wifi-desde-el-navegador/",
    },
  },
  {
    id: "panel-acceso",
    symptom: "🔐 No puedo entrar al panel de configuración (192.168.1.254 / navegador)",
    cause:
      "Una vez que el repetidor se une al router principal, el router le asigna una nueva dirección IP local dinámica distinta a la que viene impresa en la etiqueta trasera.",
    fix: [
      "Asegúrate de estar conectado a la red WiFi del repetidor (y desactiva los datos móviles 4G/5G de tu teléfono).",
      "Revisa la lista de dispositivos conectados en tu router principal o usa la app oficial para ver la nueva IP asignada.",
      "Conecta una laptop por cable Ethernet directo al repetidor para entrar sin depender de la señal inalámbrica.",
    ],
    mainGuide: {
      title: "Solución Rápida: ¿No Puedo Acceder al Panel del Repetidor?",
      href: "/problemas-y-soluciones/no-puedo-acceder-al-panel-del-repetidor-como-arreglarlo/",
    },
    extraGuide: {
      title: "Pasos para Configurar un Repetidor sin Aplicación Oficial",
      href: "/configuracion/pasos-para-configurar-repetidor-sin-aplicacion-oficial/",
    },
  },
  {
    id: "intrusos-seguridad",
    symptom: "🛡️ Sospecho que extraños se conectan a mi repetidor y saturan la red",
    cause:
      "Contraseñas débiles heredadas, botón WPS activo permanentemente o cifrado antiguo WPA/TKIP que permite accesos no autorizados en edificios y zonas compartidas.",
    fix: [
      "Activa el cifrado WPA2-PSK (AES) o WPA3 en el panel del repetidor y desactiva la función WPS tras terminar la instalación.",
      "Revisa la tabla de clientes conectados en tiempo real y bloquea las direcciones MAC desconocidas.",
      "Unifica el SSID con tu red principal o cambia periódicamente la clave de la red extendida.",
    ],
    mainGuide: {
      title: "Cómo Detectar si Alguien Usa tu Repetidor Sin Permiso",
      href: "/seguridad/como-detectar-si-alguien-usa-tu-repetidor-sin-permiso/",
    },
    extraGuide: {
      title: "Cómo Bloquear Dispositivos Desconocidos desde el Repetidor Paso a Paso",
      href: "/seguridad/como-bloquear-dispositivos-desconocidos-desde-el-repetidor/",
    },
  },
];

export default function WifiCoverageAdvisor() {
  const [mode, setMode] = useState<"advisor" | "diagnostic">("diagnostic");
  const [selectedProfile, setSelectedProfile] = useState(0);
  const [selectedIssue, setSelectedIssue] = useState(0);

  const activeProfile = ADVISOR_PROFILES[selectedProfile];
  const activeIssue = DIAGNOSTIC_ISSUES[selectedIssue];

  return (
    <div
      id="asesor-wifi"
      className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg"
    >
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-primary-dark">
            📡 Herramienta Interactiva Gratuita
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
            Centro de Diagnóstico WiFi y Selector de Repetidor Ideal
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Resuelve al instante cortes de señal y errores de conexión, o
            descubre qué repetidor o sistema Mesh necesitas según tu espacio.
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 self-start">
          <button
            type="button"
            onClick={() => setMode("diagnostic")}
            className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-extrabold transition cursor-pointer ${
              mode === "diagnostic"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🛠️ Solucionar Fallo de Mi Repetidor
          </button>
          <button
            type="button"
            onClick={() => setMode("advisor")}
            className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-extrabold transition cursor-pointer ${
              mode === "advisor"
                ? "bg-primary text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🎯 Elegir Repetidor Según Mi Casa
          </button>
        </div>
      </div>

      {/* MODE 1: DIAGNOSTIC TROUBLESHOOTER */}
      {mode === "diagnostic" ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-2.5">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              1. Selecciona el problema que presenta tu red WiFi:
            </p>
            {DIAGNOSTIC_ISSUES.map((issue, idx) => (
              <button
                key={issue.id}
                type="button"
                onClick={() => setSelectedIssue(idx)}
                className={`w-full text-left rounded-2xl border p-4 transition cursor-pointer ${
                  selectedIssue === idx
                    ? "border-primary bg-sky-50/80 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <p
                  className={`text-sm font-extrabold ${
                    selectedIssue === idx ? "text-primary-dark" : "text-slate-800"
                  }`}
                >
                  {issue.symptom}
                </p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-extrabold text-orange-800">
                Diagnóstico de Red Inmediato
              </span>
              <h3 className="mt-3 text-xl font-extrabold text-slate-900">
                {activeIssue.symptom}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-900">Causa técnica:</strong>{" "}
                {activeIssue.cause}
              </p>

              <div className="mt-5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-primary-dark mb-2.5">
                  Pasos de solución verificados:
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {activeIssue.fix.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-slate-200 grid gap-3 sm:grid-cols-2">
              <Link
                href={activeIssue.mainGuide.href}
                className="flex flex-col justify-between rounded-xl bg-primary p-4 text-white transition hover:bg-primary-dark shadow-xs"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-200">
                  ★ Manual Paso a Paso
                </span>
                <span className="mt-1 text-xs sm:text-sm font-extrabold leading-snug">
                  {activeIssue.mainGuide.title} →
                </span>
              </Link>
              <Link
                href={activeIssue.extraGuide.href}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 text-slate-900 transition hover:border-primary hover:text-primary"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Guía Complementaria
                </span>
                <span className="mt-1 text-xs sm:text-sm font-bold leading-snug">
                  {activeIssue.extraGuide.title} →
                </span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* MODE 2: WIFI COVERAGE ADVISOR */
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-2.5">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              1. ¿Dónde necesitas ampliar tu cobertura WiFi?
            </p>
            {ADVISOR_PROFILES.map((prof, idx) => (
              <button
                key={prof.id}
                type="button"
                onClick={() => setSelectedProfile(idx)}
                className={`w-full text-left rounded-2xl border p-4 transition cursor-pointer ${
                  selectedProfile === idx
                    ? "border-primary bg-sky-50/80 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span className="text-[11px] font-extrabold uppercase text-primary">
                  {prof.badge}
                </span>
                <p className="mt-0.5 text-sm font-extrabold text-slate-900">
                  {prof.title}
                </p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-extrabold text-primary-dark">
                  Equipo: {activeProfile.tech}
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800">
                  Frecuencia: {activeProfile.band}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-extrabold text-slate-900">
                {activeProfile.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {activeProfile.summary}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {activeProfile.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-emerald-600 font-extrabold">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">
                Comparativas y Guías Recomendadas para tu Caso:
              </p>
              <div className="space-y-2">
                {activeProfile.guides.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 hover:border-primary hover:text-primary transition"
                  >
                    <span>{g.title}</span>
                    <span className="text-primary font-extrabold">Ver →</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
