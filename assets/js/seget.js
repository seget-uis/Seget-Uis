/* =========================================================
   SEGET · lógica del sitio
   - Dibuja el menú y el pie de página en todas las páginas.
   - Carga el contenido desde la carpeta data/ (archivos .json).
   No es necesario tocar este archivo para cambiar contenido:
   edite los .json de data/ (vea data/LEEME.md).
   ========================================================= */

const SEGET = {
  instagram: "https://www.instagram.com/seget.uis/",
  correo: "seget.uis@gmail.com",
  youtube: "https://www.youtube.com/@SEGETUIS",
  linkedin: "https://www.linkedin.com/company/semillero-de-investigaci%C3%B3n-en-geolog%C3%ADa-estructural-y-tect%C3%B3nica/",
  telefono: "", // Por ejemplo "+57 (607) 634 4000"; si está vacío no se muestra
  direccion: "Edificio Jorge Bautista Vesga (JBV), Universidad Industrial de Santander, Carrera 27 Calle 9, Bucaramanga, Santander",
  mapa: "https://maps.google.com/maps?q=Edificio%20Jorge%20Bautista%20Vesga%20UIS%20Bucaramanga&z=16&output=embed",
};

const MENU = [
  { href: "index.html", texto: "Inicio", id: "inicio" },
  {
    texto: "Conócenos",
    hijos: [
      { href: "nosotros.html", texto: "¿Quiénes somos?", id: "nosotros", desc: "El semillero, qué estudiamos y por qué", icono: "roca" },
      { href: "integrantes.html", texto: "Nuestro equipo", id: "integrantes", desc: "Docentes e integrantes", icono: "grupo" },
    ],
  },
  {
    texto: "Actividades", href: "actividades.html", id: "actividades",
    hijos: [
      { href: "actividades.html#charlas", texto: "Charlas", id: "actividades", icono: "charla" },
      { href: "actividades.html#talleres", texto: "Talleres", id: "actividades", icono: "taller" },
      { href: "actividades.html#cursos", texto: "Cursos", id: "actividades", icono: "curso" },
      { href: "actividades.html#salidas", texto: "Salidas de campo", id: "actividades", icono: "brujula" },
    ],
  },
  {
    texto: "Divulgación",
    hijos: [
      { href: "proyectos.html", texto: "Proyectos de extensión", id: "proyectos", icono: "grupo" },
      { href: "stands.html", texto: "Stands y ferias", id: "stands", icono: "stand" },
    ],
  },
  { href: "material.html", texto: "Material científico", id: "material" },
];

const ICONOS = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  correo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15.1V8.9l5.4 3.1-5.4 3.1Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11Z"/></svg>',
  cvlac: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
  roca: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 18 7 8l5 3 4-5 5 12z"/><path d="M3 18h18M8.5 13.5l3 1.5 3.5-3"/></svg>',
  calendario: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  reloj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  lugar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  persona: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  grupo: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="8" r="3.2"/><circle cx="5.5" cy="9.5" r="2.4"/><circle cx="18.5" cy="9.5" r="2.4"/><path d="M12 12.6c3.3 0 6 1.9 6 4.4V19H6v-2c0-2.5 2.7-4.4 6-4.4ZM5.5 13.4c.5 0 1 .05 1.4.15A5.6 5.6 0 0 0 4.6 17v2H1.5v-1.6c0-2.2 1.8-4 4-4ZM18.5 13.4c2.2 0 4 1.8 4 4V19h-3.1v-2a5.6 5.6 0 0 0-2.3-3.45c.45-.1.9-.15 1.4-.15Z"/></svg>',
  charla: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/></svg>',
  taller: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5Z"/></svg>',
  curso: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 7l10-4 10 4-10 4L2 7Z"/><path d="M6 9v5c0 1.7 2.7 3 6 3s6-1.3 6-3V9"/></svg>',
  brujula: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></svg>',
  stand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 10 5 4h14l2 6M3 10h18M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 13v8M19 13v8M5 21h14"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  documento: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
};

/* ---------- Utilidades ---------- */
const $ = (sel, raiz = document) => raiz.querySelector(sel);
const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const anio = (a) => (a.fechaFin || "").slice(0, 4);
const iniciales = (n) => n.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();

async function cargar(ruta) {
  try {
    const r = await fetch(ruta, { cache: "no-cache" });
    if (!r.ok) throw new Error(r.status);
    return await r.json();
  } catch (e) {
    console.error("No se pudo cargar", ruta, e);
    return null;
  }
}

/* Divisor de estratos con un pequeño salto de falla */
function estratosSVG(fondo = "var(--arena)", invertido = false) {
  return `<svg class="estratos${invertido ? " estratos--invertido" : ""}" viewBox="0 0 1200 46" preserveAspectRatio="none" aria-hidden="true">
    <rect width="1200" height="46" fill="${fondo}"/>
    <path d="M0 14 H640 L668 22 H1200 V46 H0Z" fill="#e2a72e"/>
    <path d="M0 24 H640 L668 32 H1200 V46 H0Z" fill="#9c8f4e"/>
    <path d="M0 33 H640 L668 41 H1200 V46 H0Z" fill="#1f3b2a"/>
    <path d="M630 4 L680 46" stroke="#c4472b" stroke-width="3"/>
  </svg>`;
}

/* ---------- Menú y pie ---------- */
function dibujarHeader() {
  const actual = document.body.dataset.pagina;
  const h = document.createElement("header");
  h.className = "header";
  h.innerHTML = `
    <div class="contenedor">
      <a class="marca" href="index.html" aria-label="SEGET, inicio">
        <img src="assets/img/logo-seget.png" alt="" width="48" height="45">
        <span><strong>SEGET</strong><small>Geología Estructural y Tectónica · UIS</small></span>
      </a>
      <button class="menu-boton" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav">${ICONOS.menu}</button>
      <nav class="nav" id="nav" aria-label="Principal">
        ${MENU.map((m) => m.hijos ? `
          <div class="nav-grupo">
            <button type="button" class="nav-desplegar${m.hijos.some((x) => x.id === actual) ? " activo" : ""}" aria-expanded="false">${m.texto} ${ICONOS.chevron}</button>
            <div class="nav-panel">
              ${m.hijos.map((x) => `<a href="${x.href}"${x.id === actual && !x.href.includes("#") ? ' aria-current="page"' : ""}>
                <span class="nav-icono">${ICONOS[x.icono] || ""}</span>
                <span><b>${x.texto}</b>${x.desc ? `<small>${x.desc}</small>` : ""}</span>
              </a>`).join("")}
            </div>
          </div>` : `<a href="${m.href}"${m.id === actual ? ' aria-current="page"' : ""}>${m.texto}</a>`).join("")}
      </nav>
    </div>`;
  document.body.prepend(h);
  const boton = $(".menu-boton", h);
  const nav = $(".nav", h);
  boton.addEventListener("click", () => {
    const abierto = nav.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", abierto);
  });
  // Menú desplegable "Conócenos": se abre al pasar el mouse (CSS) o al tocar el botón
  h.querySelectorAll(".nav-grupo").forEach((g) => {
    const b = $(".nav-desplegar", g);
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      const abierto = g.classList.toggle("abierto");
      b.setAttribute("aria-expanded", abierto);
    });
  });
  document.addEventListener("click", (e) => {
    h.querySelectorAll(".nav-grupo.abierto").forEach((g) => {
      if (!g.contains(e.target)) { g.classList.remove("abierto"); $(".nav-desplegar", g).setAttribute("aria-expanded", "false"); }
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") h.querySelectorAll(".nav-grupo.abierto").forEach((g) => { g.classList.remove("abierto"); $(".nav-desplegar", g).setAttribute("aria-expanded", "false"); });
  });
}

function dibujarFooter() {
  const f = document.createElement("footer");
  f.className = "footer";
  const red = (url, nombre, icono) => url ? `<a href="${url}" target="_blank" rel="noopener" aria-label="${nombre}">${icono}</a>` : "";
  const redes = [
    red(SEGET.instagram, "Instagram", ICONOS.instagram),
    red(SEGET.linkedin, "LinkedIn", ICONOS.linkedin),
    red(SEGET.youtube, "YouTube", ICONOS.youtube),
  ].join("");
  const flecha = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';
  const telefono = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z"/></svg>';
  f.innerHTML = `
    <div class="contenedor">
      <div class="footer-rejilla">
        <div class="footer-marca">
          <a class="marca" href="index.html">
            <img class="logo-fondo" src="assets/img/logo-seget.png" alt="" width="48" height="45">
            <span><strong>SEGET · UIS</strong><small>Semillero de Geología Estructural y Tectónica</small></span>
          </a>
          <p>Estudio, investigación y divulgación de la geología estructural y la tectónica.</p>
          <div class="redes">${redes}</div>
        </div>
        <div>
          <h4>Navegación</h4>
          <ul class="footer-nav">${MENU.flatMap((m) => (m.hijos && !m.href ? m.hijos : [m])).map((m) => `<li><a href="${m.href}">${flecha}${m.texto}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul class="footer-contacto">
            <li>${ICONOS.lugar}<span>${SEGET.direccion}</span></li>
            ${SEGET.telefono ? `<li>${telefono}<a href="tel:${SEGET.telefono.replace(/[^+\d]/g, "")}">${SEGET.telefono}</a></li>` : ""}
            <li>${ICONOS.correo}<a href="mailto:${SEGET.correo}">${SEGET.correo}</a></li>
          </ul>
        </div>
        <div>
          <h4>Encuéntranos</h4>
          <div class="footer-mapa">
            <iframe src="${SEGET.mapa}" title="Mapa: Edificio Jorge Bautista Vesga, UIS" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
      <div class="footer-legal">
        <span>© ${new Date().getFullYear()} SEGET · Universidad Industrial de Santander</span>
        <span>Hecho por integrantes del semillero</span>
      </div>
    </div>`;
  document.body.append(f);
}

/* ---------- Actividades ---------- */
function tarjetaActividad(a) {
  const foto = a.imagenes && a.imagenes[0];
  const n = (a.imagenes || []).length;
  const b = document.createElement("button");
  b.type = "button";
  b.className = "actividad";
  b.innerHTML = `
    <div class="actividad-foto">
      ${foto ? `<img src="${esc(foto)}" alt="" loading="lazy">` : `<div class="sin-foto">${ICONOS.roca}</div>`}
      ${n > 1 ? `<span class="conteo">${n} fotos</span>` : ""}
    </div>
    <div class="actividad-cuerpo">
      <span class="chip" data-cat="${esc(a.categoria)}">${esc(a.categoria)}</span>
      <h3>${esc(a.titulo)}</h3>
      <div class="actividad-meta">${esc(a.fecha)}${a.lugar ? " · " + esc(a.lugar) : ""}</div>
    </div>`;
  b.addEventListener("click", () => abrirDetalle(a));
  return b;
}

let dialogo;
function abrirDetalle(a, inicio = 0) {
  if (!dialogo) {
    dialogo = document.createElement("dialog");
    dialogo.className = "detalle";
    document.body.append(dialogo);
    dialogo.addEventListener("click", (e) => { if (e.target === dialogo) dialogo.close(); });
  }
  const imgs = a.imagenes || [];
  let i = inicio;
  dialogo.innerHTML = `
    <button class="cerrar" aria-label="Cerrar">×</button>
    ${imgs.length ? `<div class="detalle-galeria">
      <img src="${esc(imgs[i])}" alt="Foto de la actividad ${esc(a.titulo)}">
      ${imgs.length > 1 ? `<button class="nav-foto prev" aria-label="Foto anterior">‹</button>
      <button class="nav-foto next" aria-label="Foto siguiente">›</button>
      <span class="indice">${i + 1} / ${imgs.length}</span>` : ""}
    </div>` : ""}
    <div class="detalle-texto">
      <span class="chip" data-cat="${esc(a.categoria)}">${esc(a.categoria)}</span>
      <h2>${esc(a.titulo)}</h2>
      <div class="detalle-datos">
        <span><b>Fecha:</b> ${esc(a.fecha)}</span>
        ${a.lugar ? `<span><b>Lugar:</b> ${esc(a.lugar)}</span>` : ""}
        ${a.instructor ? `<span><b>A cargo de:</b> ${esc(a.instructor)}</span>` : ""}
      </div>
      ${(a.descripcion || []).map((p) => `<p>${esc(p)}</p>`).join("")}
      ${(a.videos || []).length ? `<div class="rejilla rejilla--2 mt-2">${a.videos.map(videoHTML).join("")}</div>` : ""}
      ${a.enlace ? `<p class="mt-2"><a class="enlace-flecha" href="${esc(a.enlace)}" target="_blank" rel="noopener">Más información</a></p>` : ""}
    </div>`;
  $(".cerrar", dialogo).addEventListener("click", () => dialogo.close());
  const mostrar = (d) => {
    i = (i + d + imgs.length) % imgs.length;
    $(".detalle-galeria img", dialogo).src = imgs[i];
    $(".indice", dialogo).textContent = `${i + 1} / ${imgs.length}`;
  };
  if (imgs.length > 1) {
    $(".prev", dialogo).addEventListener("click", () => mostrar(-1));
    $(".next", dialogo).addEventListener("click", () => mostrar(1));
    dialogo.onkeydown = (e) => { if (e.key === "ArrowLeft") mostrar(-1); if (e.key === "ArrowRight") mostrar(1); };
  } else dialogo.onkeydown = null;
  dialogo.showModal();
  dialogo.scrollTop = 0;
}

function videoHTML(id) {
  // Muestra la miniatura y solo carga YouTube al hacer clic (más liviano)
  return `<button type="button" class="video" data-video="${esc(id)}" aria-label="Reproducir video">
    <img src="https://i.ytimg.com/vi/${esc(id)}/hqdefault.jpg" alt="" loading="lazy">
    <span class="play" aria-hidden="true"></span>
  </button>`;
}
document.addEventListener("click", (e) => {
  const v = e.target.closest("button.video[data-video]");
  if (!v) return;
  const marco = document.createElement("div");
  marco.className = "video";
  marco.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.dataset.video)}?autoplay=1" title="Video del SEGET" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  v.replaceWith(marco);
});

const ordenar = (lista) => [...lista].sort((x, y) => (y.fechaFin || "").localeCompare(x.fechaFin || ""));

/* ---------- Páginas ---------- */
async function paginaInicio() {
  const [acts, equipo, noticias] = await Promise.all([
    cargar("data/actividades.json"), cargar("data/integrantes.json"), cargar("data/noticias.json"),
  ]);
  if (acts) {
    const lista = ordenar(acts);
    const cont = $("#ultimas");
    lista.slice(0, 3).forEach((a) => cont.append(tarjetaActividad(a)));
    const salidas = acts.filter((a) => a.categoria === "Salida de campo" || a.categoria === "Apropiación social").length;
    $("#c-actividades").textContent = acts.length;
    $("#c-salidas").textContent = salidas;
  }
  if (equipo) {
    const hoy = String(equipo.periodoActual);
    const actuales = (equipo.integrantes || []).filter((m) => (m.periodos || []).map(String).includes(hoy));
    $("#c-integrantes").textContent = actuales.length + (equipo.docentes || []).length;
  }
  dibujarInstagram(noticias);
  dibujarProximoEvento();
}

/* ---------- Próximo evento (portada) ----------
   Sale de data/eventos.json. Se muestra el evento más cercano cuya fecha no haya pasado;
   si no hay ninguno, la sección queda oculta. */
async function dibujarProximoEvento() {
  const cont = $("#proximo-evento");
  if (!cont) return;
  const eventos = await cargar("data/eventos.json");
  if (!Array.isArray(eventos)) return;
  const verEjemplos = new URLSearchParams(location.search).has("ejemplos");
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const diaDe = (f) => { const [a, m, d] = String(f).split("-").map(Number); return new Date(a, (m || 1) - 1, d || 1); };
  const e = eventos
    .filter((x) => x.fecha && (verEjemplos || !x.ejemplo) && diaDe(x.fecha) >= hoy)
    .sort((x, y) => String(x.fecha).localeCompare(String(y.fecha)))[0];
  if (!e) return;
  const dia = diaDe(e.fecha);
  const faltan = Math.round((dia - hoy) / 86400000);
  const cuando = faltan === 0 ? "Hoy" : faltan === 1 ? "Mañana" : `Faltan ${faltan} días`;
  let fechaTexto = dia.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  fechaTexto = fechaTexto.charAt(0).toUpperCase() + fechaTexto.slice(1);
  const dato = (icono, texto) => texto ? `<li>${ICONOS[icono]}<span>${esc(texto)}</span></li>` : "";
  const enlace = e.enlace ? `<a class="boton" href="${esc(e.enlace)}" target="_blank" rel="noopener">${/instagram\.com/.test(e.enlace) ? ICONOS.instagram.replace("<svg", '<svg width="18" height="18"') + " " : ""}${esc(e.textoEnlace || "Más información")}</a>` : "";
  cont.innerHTML = `
    <div class="contenedor">
      <article class="evento">
        ${e.imagen ? `<a class="evento-flyer" href="${esc(e.imagen)}" target="_blank" rel="noopener" aria-label="Ver el flyer completo"><img src="${esc(e.imagen)}" alt="Flyer: ${esc(e.titulo)}" loading="lazy"></a>` : ""}
        <div class="evento-cuerpo">
          <div class="evento-arriba">
            <span class="etiqueta">Próximo evento</span>
            <span class="evento-cuenta">${cuando}</span>
          </div>
          ${e.tipo ? `<span class="chip" data-cat="${esc(e.tipo)}">${esc(e.tipo)}${e.ejemplo ? " · ejemplo" : ""}</span>` : ""}
          <h2>${esc(e.titulo)}</h2>
          <ul class="evento-datos">
            ${dato("calendario", fechaTexto)}${dato("reloj", e.hora)}${dato("lugar", e.lugar)}${dato("persona", e.ponente)}
          </ul>
          ${e.descripcion ? `<p>${esc(e.descripcion)}</p>` : ""}
          ${enlace ? `<div class="hero-acciones">${enlace}</div>` : ""}
        </div>
      </article>
    </div>`;
  cont.hidden = false;
}

function dibujarInstagram(noticias) {
  const cont = $("#instagram");
  if (!cont) return;
  const posts = (noticias && noticias.instagram) || [];
  if (!posts.length) {
    cont.innerHTML = `<div class="instagram-vacio">
      <div><h3>Síguenos en Instagram</h3><p>Allí publicamos cada charla, taller y salida de campo.</p></div>
      <a class="boton" href="${SEGET.instagram}" target="_blank" rel="noopener">${ICONOS.instagram.replace("<svg", '<svg width="18" height="18"')} @seget.uis</a>
    </div>`;
    return;
  }
  cont.innerHTML = `<div class="instagram-rejilla">${posts.slice(0, 3).map((u) =>
    `<blockquote class="instagram-media" data-instgrm-permalink="${esc(u)}" data-instgrm-version="14"><a href="${esc(u)}">Ver en Instagram</a></blockquote>`).join("")}</div>`;
  const s = document.createElement("script");
  s.src = "https://www.instagram.com/embed.js";
  s.async = true;
  document.body.append(s);
}

// Tipos que muestra cada página: actividades.html muestra formación; stands.html, los stands
const TIPOS_ACTIVIDAD = {
  Charla: { plural: "Charlas", hash: "charlas", lead: "Las charlas que ha organizado el semillero." },
  Taller: { plural: "Talleres", hash: "talleres", lead: "Talleres prácticos de brújula, proyecciones, cortes geológicos y software." },
  Curso: { plural: "Cursos", hash: "cursos", lead: "Los cursos que ha organizado el semillero." },
  "Salida de campo": { plural: "Salidas de campo", hash: "salidas", lead: "Salidas para ver y medir la geología en el terreno." },
  Stand: { plural: "Stands", hash: "stands" },
};

async function paginaActividades() {
  const acts = await cargar("data/actividades.json");
  const cont = $("#lista-actividades");
  if (!acts) { cont.innerHTML = '<p class="vacio">No se pudieron cargar las actividades.</p>'; return; }
  const permitidas = (cont.dataset.categorias || "").split(",").map((x) => x.trim()).filter(Boolean);
  const lista = ordenar(acts).filter((a) => !permitidas.length || permitidas.includes(a.categoria));
  const presentes = new Set(lista.map((a) => a.categoria));
  const cats = ["Todas", ...(permitidas.length ? permitidas : [...presentes]).filter((c) => presentes.has(c))];
  const anios = ["Todos", ...new Set(lista.map(anio))];
  const desdeHash = () => Object.keys(TIPOS_ACTIVIDAD).find((c) => "#" + TIPOS_ACTIVIDAD[c].hash === location.hash && cats.includes(c)) || "Todas";
  const estado = { cat: desdeHash(), anio: "Todos" };
  const texto = (v) => (TIPOS_ACTIVIDAD[v] && cats.length > 2 ? TIPOS_ACTIVIDAD[v].plural : v);

  const botones = (raiz, valores, clave, etiqueta = (v) => v) => {
    raiz.hidden = valores.length < 3;
    raiz.innerHTML = valores.map((v) => `<button type="button" class="filtro" aria-pressed="${v === estado[clave]}" data-v="${esc(v)}">${esc(etiqueta(v))}</button>`).join("");
    raiz.addEventListener("click", (e) => {
      const b = e.target.closest(".filtro");
      if (!b) return;
      estado[clave] = b.dataset.v;
      raiz.querySelectorAll(".filtro").forEach((x) => x.setAttribute("aria-pressed", x === b));
      if (clave === "cat") aplicarModo();
      pintar();
    });
  };
  botones($("#filtro-cat"), cats, "cat", texto);
  botones($("#filtro-anio"), anios, "anio");
  // Al entrar desde el menú (por ejemplo actividades.html#charlas) la página muestra solo ese tipo:
  // cambia el título y se ocultan los botones de tipo; los años se calculan solo con ese tipo.
  const cabecera = { h1: $(".cabecera h1"), lead: $(".cabecera .lead") };
  const original = { h1: cabecera.h1 && cabecera.h1.textContent, lead: cabecera.lead && cabecera.lead.textContent, titulo: document.title };
  function aplicarModo() {
    const fijo = estado.cat !== "Todas" && location.hash;
    $("#filtro-cat").hidden = !!fijo || cats.length < 3;
    if (cabecera.h1) cabecera.h1.textContent = fijo ? TIPOS_ACTIVIDAD[estado.cat].plural : original.h1;
    if (cabecera.lead) cabecera.lead.textContent = fijo && TIPOS_ACTIVIDAD[estado.cat].lead ? TIPOS_ACTIVIDAD[estado.cat].lead + " Toca una para ver sus fotos." : original.lead;
    document.title = fijo ? `${TIPOS_ACTIVIDAD[estado.cat].plural} · SEGET UIS` : original.titulo;
    const base = lista.filter((a) => estado.cat === "Todas" || a.categoria === estado.cat);
    const ans = ["Todos", ...new Set(base.map(anio))];
    if (!ans.includes(estado.anio)) estado.anio = "Todos";
    const fa = $("#filtro-anio");
    fa.hidden = ans.length < 3;
    fa.innerHTML = ans.map((v) => `<button type="button" class="filtro" aria-pressed="${v === estado.anio}" data-v="${esc(v)}">${esc(v)}</button>`).join("");
  }
  // Si se elige otra opción del menú estando ya en la página
  window.addEventListener("hashchange", () => {
    estado.cat = desdeHash();
    estado.anio = "Todos";
    $("#filtro-cat").querySelectorAll(".filtro").forEach((x) => x.setAttribute("aria-pressed", x.dataset.v === estado.cat));
    aplicarModo();
    pintar();
    window.scrollTo({ top: 0 });
  });

  function pintar() {
    const vis = lista.filter((a) => (estado.cat === "Todas" || a.categoria === estado.cat) && (estado.anio === "Todos" || anio(a) === estado.anio));
    cont.innerHTML = "";
    const t = TIPOS_ACTIVIDAD[estado.cat];
    const uno = t && location.hash ? estado.cat.toLowerCase() : "actividad";
    const varios = t && location.hash ? t.plural.toLowerCase() : "actividades";
    $("#total-actividades").textContent = `${vis.length} ${vis.length === 1 ? uno : varios}`;
    if (!vis.length) { cont.innerHTML = '<p class="vacio">No hay actividades con ese filtro.</p>'; return; }
    vis.forEach((a) => cont.append(tarjetaActividad(a)));
  }
  aplicarModo();
  pintar();
}

function tarjetaIntegrante(m, compacto) {
  const foto = m.foto
    ? `<img class="foto" src="${esc(m.foto)}" alt="Foto de ${esc(m.nombre)}" loading="lazy">`
    : `<div class="foto foto--vacia" aria-hidden="true">${esc(iniciales(m.nombre))}</div>`;
  if (compacto) return `<div class="integrante">${foto}<div><h3>${esc(m.nombre)}</h3></div></div>`;
  const enlaces = [
    m.linkedin ? `<a href="${esc(m.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn de ${esc(m.nombre)}">${ICONOS.linkedin}</a>` : "",
    m.email ? `<a href="mailto:${esc(m.email)}" aria-label="Correo de ${esc(m.nombre)}">${ICONOS.correo}</a>` : "",
    m.cvlac ? `<a href="${esc(m.cvlac)}" target="_blank" rel="noopener" aria-label="CvLAC de ${esc(m.nombre)}">${ICONOS.cvlac}</a>` : "",
  ].join("");
  return `<article class="integrante">
    ${foto}
    <h3>${esc(m.nombre)}</h3>
    <div class="cargo">${esc(m.cargo)}</div>
    ${m.descripcion ? `<p>${esc(m.descripcion)}</p>` : `<p class="pendiente">Descripción próximamente.</p>`}
    ${enlaces ? `<div class="enlaces">${enlaces}</div>` : ""}
  </article>`;
}

async function paginaIntegrantes() {
  const datos = await cargar("data/integrantes.json");
  const cont = $("#equipo");
  if (!datos) { cont.innerHTML = '<p class="vacio">No se pudo cargar el equipo.</p>'; return; }
  const hoy = String(datos.periodoActual);
  const todos = datos.integrantes || [];
  const actuales = todos.filter((m) => (m.periodos || []).map(String).includes(hoy));
  const anteriores = todos.filter((m) => !actuales.includes(m));
  const grupo = (titulo, html, clase = "") => `<h2 class="grupo-titulo">${titulo}</h2><div class="integrantes${clase}">${html}</div>`;
  const anterior = (m) => {
    const foto = m.foto
      ? `<img class="foto" src="${esc(m.foto)}" alt="Foto de ${esc(m.nombre)}" loading="lazy">`
      : `<div class="foto foto--vacia" aria-hidden="true">${esc(iniciales(m.nombre))}</div>`;
    const cargo = m.cargo && m.cargo !== "Integrante" ? `${esc(m.cargo)} · ` : "";
    return `<div class="integrante">${foto}<div><h3>${esc(m.nombre)}</h3><span class="periodo-integrante">${cargo}${(m.periodos || []).map(esc).join(", ")}</span></div></div>`;
  };
  cont.innerHTML = [
    (datos.docentes || []).length ? grupo(datos.docentes.length > 1 ? "Docentes" : "Docente", datos.docentes.map((m) => tarjetaIntegrante(m)).join("")) : "",
    grupo("Miembros actuales", actuales.map((m) => tarjetaIntegrante(m)).join("") || '<p class="vacio">Pronto publicaremos el equipo de este año.</p>'),
    anteriores.length ? grupo("Antiguos miembros", anteriores.map(anterior).join(""), " integrantes--compacto") : "",
  ].join("");
}

async function paginaProyectos() {
  const [proys, acts] = await Promise.all([cargar("data/proyectos.json"), cargar("data/actividades.json")]);
  const cont = $("#lista-proyectos");
  if (!proys) { cont.innerHTML = '<p class="vacio">No se pudieron cargar los proyectos.</p>'; return; }
  cont.innerHTML = "";
  proys.forEach((p) => {
    const relacionadas = (acts || []).filter((a) => a.proyecto === p.id);
    const fotos = relacionadas.flatMap((a) => (a.imagenes || []).map((src, i) => ({ a, src, i }))).slice(0, 8);
    const bloque = document.createElement("section");
    bloque.className = "proyecto-bloque";
    bloque.id = p.id;
    const el = document.createElement("article");
    el.className = "proyecto";
    bloque.append(el);
    el.innerHTML = `
      <div class="proyecto-portada"><img src="${esc(p.portada)}" alt="" loading="lazy"></div>
      <div>
        <span class="etiqueta">Proyecto ${esc(p.anio)}</span>
        <h2>${esc(p.titulo)}</h2>
        <p class="lead">${esc(p.resumen)}</p>
        <dl class="ficha">
          <dt>Modalidad</dt><dd>${esc(p.modalidad)}</dd>
          <dt>Lugar</dt><dd>${esc(p.lugar)}</dd>
          ${(p.aliados || []).length ? `<dt>Aliados</dt><dd>${p.aliados.map(esc).join(", ")}</dd>` : ""}
        </dl>
        ${(p.descripcion || []).map((t) => `<p>${esc(t)}</p>`).join("")}
        ${fotos.length ? `<div class="mini-galeria">${fotos.map((f, k) => `<button type="button" data-k="${k}" aria-label="Ver foto"><img src="${esc(f.src)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}
      </div>`;
    el.querySelectorAll(".mini-galeria button").forEach((b) => {
      const f = fotos[b.dataset.k];
      b.addEventListener("click", () => abrirDetalle(f.a, f.i));
    });
    if ((p.videos || []).length) {
      const v = document.createElement("div");
      v.className = "rejilla rejilla--2 mt-3";
      v.innerHTML = p.videos.map(videoHTML).join("");
      bloque.append(v);
    }
    cont.append(bloque);
  });
}

/* ---------- Material científico (pósters, tesis y artículos) ---------- */
const TIPOS_MATERIAL = [
  { tipo: "Póster", texto: "Pósters", hash: "posters", uno: "póster", varios: "pósters", vacio: "pósters publicados" },
  { tipo: "Tesis", texto: "Tesis", hash: "tesis", uno: "tesis", varios: "tesis", vacio: "tesis publicadas" },
  { tipo: "Artículo", texto: "Artículos", hash: "articulos", uno: "artículo", varios: "artículos", vacio: "artículos publicados" },
];

const enDesarrollo = (t) => String(t.estado || "").toLowerCase() === "en desarrollo";
// La pestaña ya dice el tipo, así que la tarjeta no lo repite: en las tesis solo va el estado.
const estadoTesis = (t) => (t.tipo === "Tesis" ? (enDesarrollo(t) ? "En desarrollo" : "Terminada") : "");
function chipsMaterial(t) {
  const est = estadoTesis(t);
  const chips = [
    est ? `<span class="chip ${est === "En desarrollo" ? "chip--desarrollo" : "chip--terminada"}">${est}</span>` : "",
    t.ejemplo ? '<span class="chip">Ejemplo</span>' : "",
  ].join("");
  return chips ? `<div class="chips">${chips}</div>` : "";
}

function tarjetaMaterial(t) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "actividad material";
  const autores = (t.autores || []).filter(Boolean).join(", ");
  b.innerHTML = `
    <div class="actividad-foto material-foto">
      ${t.imagen ? `<img src="${esc(t.imagen)}" alt="" loading="lazy">` : `<div class="sin-foto">${ICONOS.documento}</div>`}
    </div>
    <div class="actividad-cuerpo">
      ${chipsMaterial(t)}
      <h3>${esc(t.titulo)}</h3>
      ${autores ? `<div class="actividad-meta">${esc(autores)}</div>` : ""}
      <div class="actividad-meta">${enDesarrollo(t) ? "Desde " : ""}${esc(t.anio)}${t.evento ? " · " + esc(t.evento) : ""}</div>
    </div>`;
  b.addEventListener("click", () => abrirMaterial(t));
  return b;
}

function abrirMaterial(t) {
  const datos = {
    titulo: t.titulo,
    categoria: estadoTesis(t) || t.tipo,
    fecha: enDesarrollo(t) ? `En desarrollo desde ${t.anio}` : t.anio,
    lugar: [t.evento, t.lugar].filter(Boolean).join(", "),
    instructor: (t.autores || []).filter(Boolean).join(", "),
    descripcion: t.resumen ? [t.resumen] : [],
    imagenes: t.imagen ? [t.imagen] : [],
    enlace: t.enlace || "",
  };
  abrirDetalle(datos);
  const texto = $(".detalle-texto", dialogo);
  const etiqueta = $(".detalle-datos span:last-child b", dialogo);
  if (etiqueta && datos.instructor) etiqueta.textContent = (t.autores || []).filter(Boolean).length > 1 ? "Autores:" : "Autor:";
  // Director y codirector van en líneas aparte de los autores
  const lista = $(".detalle-datos", dialogo);
  [["Director:", t.director], ["Codirector:", t.codirector]].forEach(([r, v]) => {
    if (lista && v) lista.insertAdjacentHTML("beforeend", `<span><b>${r}</b> ${esc(v)}</span>`);
  });
  if (t.archivo && texto) {
    const p = document.createElement("p");
    p.className = "mt-2";
    p.innerHTML = `<a class="boton" href="${esc(t.archivo)}" target="_blank" rel="noopener">${t.tipo === "Póster" ? "Ver el póster" : t.tipo === "Tesis" ? "Descargar la tesis" : "Leer el artículo"}</a>`;
    texto.append(p);
  }
}

async function paginaMaterial() {
  const todos = await cargar("data/material.json");
  const cont = $("#lista-material");
  if (!todos) { cont.innerHTML = '<p class="vacio">No se pudo cargar el material.</p>'; return; }
  // Los bloques con "ejemplo": true solo se ven abriendo la página con ?ejemplos al final de la dirección
  const verEjemplos = new URLSearchParams(location.search).has("ejemplos");
  const lista = todos
    .filter((t) => (verEjemplos || !t.ejemplo) && TIPOS_MATERIAL.some((x) => x.tipo === t.tipo))
    .sort((x, y) => (enDesarrollo(y) - enDesarrollo(x)) || String(y.anio || "").localeCompare(String(x.anio || "")));
  if (!lista.length) {
    $(".filtros-grupo").hidden = true;
    cont.classList.remove("rejilla", "rejilla--3");
    cont.innerHTML = `<div class="instagram-vacio">
      <div><h3>Muy pronto</h3><p>Estamos reuniendo los pósters, las tesis y los artículos para publicarlos aquí.</p></div>
      <a class="boton" href="mailto:${SEGET.correo}">${ICONOS.correo.replace("<svg", '<svg width="18" height="18"')} Escríbenos</a>
    </div>`;
    return;
  }
  const inicial = TIPOS_MATERIAL.find((x) => "#" + x.hash === location.hash) || TIPOS_MATERIAL[0];
  const estado = { tipo: inicial.tipo, anio: "Todos", fase: "Todas" };
  // Filtro de estado (terminadas / en desarrollo): solo en la pestaña de tesis y si hay alguna en desarrollo
  const filtroFase = document.createElement("div");
  filtroFase.className = "filtros"; filtroFase.setAttribute("role", "group"); filtroFase.setAttribute("aria-label", "Estado de la tesis");
  $("#filtro-anio-material").before(filtroFase);
  filtroFase.addEventListener("click", (e) => {
    const b = e.target.closest(".filtro");
    if (!b) return;
    estado.fase = b.dataset.v;
    estado.anio = "Todos";
    filtroFase.querySelectorAll(".filtro").forEach((x) => x.setAttribute("aria-pressed", x === b));
    pintarAnios();
    pintar();
  });
  const enFase = (t) => estado.tipo !== "Tesis" || estado.fase === "Todas" || (estado.fase === "En desarrollo") === enDesarrollo(t);
  function pintarFase() {
    const tesis = lista.filter((t) => t.tipo === "Tesis");
    filtroFase.hidden = estado.tipo !== "Tesis" || !tesis.some(enDesarrollo) || tesis.every(enDesarrollo);
    filtroFase.innerHTML = ["Todas", "Terminadas", "En desarrollo"].map((v) => `<button type="button" class="filtro" aria-pressed="${v === estado.fase}" data-v="${v}">${v}</button>`).join("");
  }
  const pestanas = $("#filtro-tipo");
  const filtroAnio = $("#filtro-anio-material");
  pestanas.innerHTML = TIPOS_MATERIAL.map((x) => `<button type="button" class="pestana" aria-pressed="${x.tipo === estado.tipo}" data-v="${esc(x.tipo)}">${esc(x.texto)}</button>`).join("");
  pestanas.addEventListener("click", (e) => {
    const b = e.target.closest(".pestana");
    if (!b || b.dataset.v === estado.tipo) return;
    estado.tipo = b.dataset.v;
    estado.anio = "Todos";
    estado.fase = "Todas";
    pestanas.querySelectorAll(".pestana").forEach((x) => x.setAttribute("aria-pressed", x === b));
    history.replaceState(null, "", "#" + TIPOS_MATERIAL.find((x) => x.tipo === estado.tipo).hash);
    pintarFase();
    pintarAnios();
    pintar();
  });
  filtroAnio.addEventListener("click", (e) => {
    const b = e.target.closest(".filtro");
    if (!b) return;
    estado.anio = b.dataset.v;
    filtroAnio.querySelectorAll(".filtro").forEach((x) => x.setAttribute("aria-pressed", x === b));
    pintar();
  });
  // Los años salen solo de los trabajos del tipo elegido
  function pintarAnios() {
    const anios = [...new Set(lista.filter((t) => t.tipo === estado.tipo && enFase(t)).map((t) => String(t.anio || "")).filter(Boolean))];
    filtroAnio.hidden = anios.length < 2;
    filtroAnio.innerHTML = ["Todos", ...anios].map((v) => `<button type="button" class="filtro" aria-pressed="${v === estado.anio}" data-v="${esc(v)}">${v === "Todos" ? "Todos los años" : esc(v)}</button>`).join("");
  }
  function pintar() {
    const info = TIPOS_MATERIAL.find((x) => x.tipo === estado.tipo);
    const vis = lista.filter((t) => t.tipo === estado.tipo && enFase(t) && (estado.anio === "Todos" || String(t.anio) === estado.anio));
    cont.innerHTML = "";
    $("#total-material").textContent = `${vis.length} ${vis.length === 1 ? info.uno : info.varios}`;
    if (!vis.length) { cont.innerHTML = `<p class="vacio">Todavía no hay ${info.vacio}.</p>`; return; }
    vis.forEach((t) => cont.append(tarjetaMaterial(t)));
  }
  pintarFase();
  pintarAnios();
  pintar();
}

/* ---------- Arranque ---------- */
document.addEventListener("DOMContentLoaded", () => {
  dibujarHeader();
  dibujarFooter();
  document.querySelectorAll("[data-estratos]").forEach((n) => {
    n.outerHTML = estratosSVG(n.dataset.estratos || "var(--arena)", n.hasAttribute("data-invertido"));
  });
  const p = document.body.dataset.pagina;
  if (p === "inicio") paginaInicio();
  if (p === "actividades" || p === "stands") paginaActividades();
  if (p === "integrantes") paginaIntegrantes();
  if (p === "proyectos") paginaProyectos();
  if (p === "material") paginaMaterial();
});
