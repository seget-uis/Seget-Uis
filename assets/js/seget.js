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

/* Divisor de estratos cortado por una falla: el bloque izquierdo queda 10 px más abajo
   (en la portada baja animado una vez; ver .bloque-izq en el CSS). */
function estratosSVG(fondo = "var(--arena)", invertido = false) {
  const capas = `<rect y="16" width="1440" height="11" fill="#D4A73E"/><rect y="27" width="1440" height="11" fill="#984821"/><rect y="38" width="1440" height="30" fill="#2C3A1F"/>`;
  return `<svg class="estratos${invertido ? " estratos--invertido" : ""}" viewBox="0 0 1440 54" preserveAspectRatio="none" aria-hidden="true">
    <defs><clipPath id="estr-izq"><path d="M0 0H600L592 54H0Z"/></clipPath><clipPath id="estr-der"><path d="M600 0H1440V54H592Z"/></clipPath></defs>
    <rect width="1440" height="54" fill="${fondo}"/>
    <g clip-path="url(#estr-der)">${capas}</g>
    <g clip-path="url(#estr-izq)"><g class="bloque-izq">${capas}</g></g>
    <path d="M600 0L592 54" stroke="#984821" stroke-width="2"/>
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

/* ---------- Ruta de navegación (reemplaza la etiqueta roja sobre el título) ---------- */
function rutaPagina(p) {
  for (const m of MENU) {
    if (m.id === p && (!m.hijos || m.href)) return [m];
    const h = (m.hijos || []).find((x) => x.id === p && !x.href.includes("#"));
    if (h) return [m, h];
  }
  return [];
}
/* ¿Quiénes somos?: cada bloque se anima una sola vez al entrar en pantalla.
   Con movimiento reducido no se añade la clase y todo aparece quieto. */
function animarNosotros() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("cn-anim");
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("cn-visto"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".cn-lineas, .cn-citas, .cn-unete").forEach((s) => io.observe(s));
  document.querySelectorAll(".cn-temas li").forEach((li, i) => li.style.setProperty("--i", i));
}

function dibujarMigas(extra) {
  const p = document.body.dataset.pagina;
  let nav = $(".cabecera .migas, .cn-apertura .migas");
  const etiqueta = $(".cabecera .etiqueta");
  if (!nav && !etiqueta) return;
  if (!nav) {
    nav = document.createElement("nav");
    nav.className = "migas";
    nav.setAttribute("aria-label", "Ruta de navegación");
    etiqueta.replaceWith(nav);
  }
  const pasos = [{ texto: "Inicio", href: "index.html" }];
  rutaPagina(p).forEach((m) => pasos.push({ texto: m.texto, href: m.href }));
  if (p === "404") pasos.push({ texto: "Página no encontrada" });
  if (extra) pasos.push({ texto: extra });
  nav.innerHTML = `<ol>${pasos.map((x, i) => i === pasos.length - 1
    ? `<li><span aria-current="page">${esc(x.texto)}</span></li>`
    : `<li>${x.href ? `<a href="${esc(x.href)}">${esc(x.texto)}</a>` : esc(x.texto)}</li>`).join("")}</ol>`;
}

/* ---------- Actividades ---------- */
/* Cambio de filtro: la lista actual se desvanece rápido y las tarjetas nuevas entran
   con una pequeña subida, escalonada solo en las primeras. Si se pulsa otro filtro a mitad
   del cambio, gana el último. Con movimiento reducido el cambio es inmediato. */
let turnoTransicion = 0;
function transicion(cont, render) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !cont.animate) { render(); return; }
  const turno = ++turnoTransicion;
  cont.getAnimations({ subtree: true }).forEach((a) => a.cancel());
  const salida = cont.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, easing: "ease-in", fill: "forwards" });
  salida.finished.then(() => {
    if (turno !== turnoTransicion) return;
    render();
    salida.cancel();
    [...cont.children].forEach((el, i) => {
      el.animate(
        [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }],
        { duration: 320, delay: Math.min(i, 5) * 40, easing: "cubic-bezier(.23, 1, .32, 1)", fill: "backwards" }
      );
    });
  }).catch(() => {});
}

// Etiqueta de la ficha: el estado de una tesis usa la misma etiqueta que su tarjeta
function chipCategoria(c) {
  if (c === "En desarrollo") return '<span class="chip chip--desarrollo">En desarrollo</span>';
  if (c === "Terminada") return '<span class="chip chip--terminada">Terminada</span>';
  return `<span class="chip" data-cat="${esc(c)}">${esc(c)}</span>`;
}

// conTipo: el tipo de actividad solo se nombra en la ficha cuando la lista mezcla tipos (la tarjeta no lleva etiqueta)
function tarjetaActividad(a, conTipo = true) {
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
      <h3>${esc(a.titulo)}</h3>
      <div class="actividad-meta">${esc(a.fecha)}${a.lugar ? " · " + esc(a.lugar) : ""}</div>
    </div>`;
  b.addEventListener("click", () => abrirDetalle(a, 0, conTipo));
  return b;
}

let dialogo;
function abrirDetalle(a, inicio = 0, conTipo = true) {
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
    <div class="dt-cuerpo${imgs.length ? " dt-cuerpo--fotos" : ""}">
      ${imgs.length ? `<div class="dt-fotos detalle-galeria">
        <img class="dt-foto" src="${esc(imgs[i])}" alt="Foto de la actividad ${esc(a.titulo)}">
        ${imgs.length > 1 ? `<button class="nav-foto prev" aria-label="Foto anterior">‹</button>
        <button class="nav-foto next" aria-label="Foto siguiente">›</button>
        <span class="indice">${i + 1} / ${imgs.length}</span>` : ""}
      </div>` : ""}
      <div class="dt-lado">
        <p class="fp-dato">${conTipo && a.categoria ? esc(a.categoria) + " · " : ""}${esc(a.fecha)}</p>
        <h2>${esc(a.titulo)}</h2>
        ${a.lugar || a.instructor ? `<p class="dt-donde">${[a.lugar ? esc(a.lugar) : "", a.instructor ? "A cargo de " + esc(a.instructor) : ""].filter(Boolean).join("<br>")}</p>` : ""}
        <div class="detalle-texto">
          ${(a.descripcion || []).map((p) => `<p>${esc(p)}</p>`).join("")}
          ${(a.videos || []).length ? `<div class="rejilla rejilla--2 mt-2">${a.videos.map(videoHTML).join("")}</div>` : ""}
          ${a.enlace ? `<p class="mt-2"><a class="enlace-flecha" href="${esc(a.enlace)}" target="_blank" rel="noopener">Más información</a></p>` : ""}
        </div>
        ${imgs.length > 1 ? `<div class="dt-miniaturas">${imgs.map((src, n) => `<button type="button" data-n="${n}" aria-label="Ver la foto ${n + 1} de ${imgs.length}" aria-current="${n === i}"><img src="${esc(src)}" alt=""></button>`).join("")}</div>` : ""}
      </div>
      <div class="dt-resto"></div>
    </div>`;
  $(".cerrar", dialogo).addEventListener("click", () => dialogo.close());
  const mostrar = (d, abs) => {
    i = abs != null ? abs : (i + d + imgs.length) % imgs.length;
    dialogo.querySelectorAll(".detalle-galeria img").forEach((im) => { im.src = imgs[i]; });
    const foto = $(".dt-foto", dialogo);
    if (foto && foto.animate && !quietoMov()) foto.animate([{ opacity: .35, transform: "scale(.985)" }, { opacity: 1, transform: "none" }], { duration: 220, easing: "cubic-bezier(.23, 1, .32, 1)" });
    $(".indice", dialogo).textContent = `${i + 1} / ${imgs.length}`;
    dialogo.querySelectorAll(".dt-miniaturas button").forEach((x, n) => x.setAttribute("aria-current", String(n === i)));
  };
  if (imgs.length > 1) {
    $(".prev", dialogo).addEventListener("click", () => mostrar(-1));
    $(".next", dialogo).addEventListener("click", () => mostrar(1));
    dialogo.querySelectorAll(".dt-miniaturas button").forEach((x) => x.addEventListener("click", () => mostrar(0, +x.dataset.n)));
    dialogo.onkeydown = (e) => { if (e.key === "ArrowLeft") mostrar(-1); if (e.key === "ArrowRight") mostrar(1); };
  } else dialogo.onkeydown = null;
  // El marco toma la forma de la primera foto (entre cuadrada y 4:3), así casi no se recorta
  const marco = $(".dt-fotos", dialogo);
  if (marco) {
    const ajustar = (im) => { if (im.naturalWidth) { marco.style.aspectRatio = String(Math.min(4 / 3, Math.max(1, im.naturalWidth / im.naturalHeight))); repartirTexto(); } };
    const primera = $(".dt-foto", marco);
    if (primera.complete) ajustar(primera); else primera.addEventListener("load", () => ajustar(primera), { once: true });
  }
  dialogo.classList.toggle("dt-anim", !quietoMov());
  dialogo.showModal();
  dialogo.scrollTop = 0;
  repartirTexto();
}

const quietoMov = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Si el texto es mucho más alto que la foto, los últimos párrafos pasan debajo, a dos columnas,
// para que la foto y el texto queden parejos y no sobre espacio a ningún lado.
function repartirTexto() {
  const fotos = $(".dt-fotos", dialogo), lado = $(".dt-lado", dialogo), resto = $(".dt-resto", dialogo);
  if (!fotos || !resto || !window.matchMedia("(min-width: 861px)").matches) return;
  const texto = $(".detalle-texto", lado);
  const enlace = $(":scope > .mt-2", texto);
  [...resto.children].forEach((p) => (enlace ? enlace.before(p) : texto.append(p)));
  resto.hidden = false;
  const alto = fotos.offsetHeight * 1.05;
  const ps = [...texto.querySelectorAll(":scope > p:not(.mt-2)")];
  while (lado.offsetHeight > alto && ps.length > 1) resto.prepend(ps.pop());
  resto.hidden = !resto.children.length;
}

// Visor de fotos: solo la foto grande, con flechas, contador y teclado
let visor;
function abrirVisor(fotos, inicio = 0) {
  if (!fotos.length) return;
  if (!visor) {
    visor = document.createElement("dialog");
    visor.className = "visor";
    visor.setAttribute("aria-label", "Visor de fotos");
    document.body.append(visor);
    visor.addEventListener("click", (e) => { if (e.target === visor || e.target.classList.contains("visor-marco")) visor.close(); });
  }
  let i = inicio;
  const varias = fotos.length > 1;
  visor.innerHTML = `
    <button class="cerrar" aria-label="Cerrar">×</button>
    <div class="visor-marco"><img class="visor-foto" alt=""></div>
    ${varias ? `<button class="nav-foto prev" aria-label="Foto anterior">‹</button>
    <button class="nav-foto next" aria-label="Foto siguiente">›</button>
    <span class="visor-indice" aria-live="polite"></span>` : ""}`;
  const foto = $(".visor-foto", visor);
  const mostrar = (d) => {
    i = (i + d + fotos.length) % fotos.length;
    foto.src = fotos[i].src; foto.alt = fotos[i].alt || "";
    if (varias) $(".visor-indice", visor).textContent = `${i + 1} / ${fotos.length}`;
    if (d && foto.animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) foto.animate([{ opacity: .35, transform: `translateX(${d * 12}px)` }, { opacity: 1, transform: "none" }], { duration: 240, easing: "cubic-bezier(.23, 1, .32, 1)" });
  };
  $(".cerrar", visor).addEventListener("click", () => visor.close());
  if (varias) {
    $(".prev", visor).addEventListener("click", () => mostrar(-1));
    $(".next", visor).addEventListener("click", () => mostrar(1));
    visor.onkeydown = (e) => { if (e.key === "ArrowLeft") mostrar(-1); if (e.key === "ArrowRight") mostrar(1); };
  } else visor.onkeydown = null;
  mostrar(0);
  visor.showModal();
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
/* ---------- Qué hacemos (portada) ----------
   Al tocar una sección se muestran sus fotos (data/que-hacemos.json), que cambian
   solas cada 4 s. Hay botón de pausa, y con "reducir movimiento" no cambian solas. */
async function queHacemos() {
  const raiz = $("#que-hacemos");
  if (!raiz) return;
  const datos = await cargar("data/que-hacemos.json");
  const secciones = (datos && datos.secciones) || [];
  const items = [...raiz.querySelectorAll(".qh-lista li")];
  const panel = $(".qh-panel", raiz);
  if (!secciones.length || !panel) { if (panel) panel.hidden = true; return; }
  const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pausa = document.createElement("button");
  pausa.type = "button";
  pausa.className = "qh-pausa";
  panel.append(pausa);
  let s = 0, k = 0, imgs = [], reloj = null, pausado = quieto;

  function rotular() {
    pausa.textContent = pausado ? "▶ Reanudar fotos" : "❚❚ Pausar fotos";
    pausa.setAttribute("aria-pressed", String(pausado));
    raiz.classList.toggle("pausado", pausado);
  }
  function programar() {
    clearTimeout(reloj);
    if (!pausado && imgs.length > 1) reloj = setTimeout(() => { k = (k + 1) % imgs.length; mostrar(); }, 4000);
  }
  function mostrar() {
    imgs.forEach((im, n) => im.classList.toggle("visible", n === k));
    const p = $(".qh-puntos", items[s]);
    if (p) p.innerHTML = imgs.length > 1 ? imgs.map((_, n) => `<i class="${n < k ? "visto" : n === k ? "actual" : ""}"></i>`).join("") : "";
    programar();
  }
  function elegir(n) {
    items.forEach((li, i) => {
      li.classList.toggle("activa", i === n);
      $("button", li).setAttribute("aria-expanded", String(i === n));
      const p = $(".qh-puntos", li); if (p && i !== n) p.innerHTML = "";
    });
    s = n; k = 0;
    panel.querySelectorAll("img").forEach((x) => x.remove());
    imgs = ((secciones[n] || {}).fotos || []).map((f) => {
      const im = new Image();
      im.src = f.src; im.alt = f.alt || ""; im.decoding = "async";
      panel.prepend(im);
      return im;
    });
    pausa.hidden = imgs.length < 2;
    mostrar();
  }
  items.forEach((li, n) => $("button", li).addEventListener("click", () => elegir(n)));
  pausa.addEventListener("click", () => { pausado = !pausado; rotular(); mostrar(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) clearTimeout(reloj); else programar(); });
  rotular();
  elegir(0);
}

async function paginaInicio() {
  const [acts, equipo, noticias] = await Promise.all([
    cargar("data/actividades.json"), cargar("data/integrantes.json"), cargar("data/noticias.json"),
  ]);
  if (acts) {
    const lista = ordenar(acts);
    const cont = $("#ultimas");
    // La charla, el taller y la salida de campo más recientes: se actualiza solo al añadir una actividad nueva
    ["Charla", "Taller", "Salida de campo"]
      .map((c) => lista.find((a) => a.categoria === c))
      .filter(Boolean)
      .forEach((a) => cont.append(tarjetaActividad(a)));
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
      transicion(cont, pintar);
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
    dibujarMigas(fijo ? TIPOS_ACTIVIDAD[estado.cat].plural : "");
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
    transicion(cont, pintar);
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
    const mixto = estado.cat === "Todas" && new Set(vis.map((a) => a.categoria)).size > 1;
    vis.forEach((a) => cont.append(tarjetaActividad(a, mixto)));
  }
  aplicarModo();
  pintar();
  entradaLista(cont);
}

// Al llegar a la página (desde Inicio o el menú): el título y el texto suben y las tarjetas entran
// una tras otra. Solo la primera vez; los filtros ya tienen su propia transición.
function entradaLista(cont) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !cont.animate) return;
  const curva = "cubic-bezier(.23, 1, .32, 1)";
  [$(".cabecera .migas"), $(".cabecera h1"), $(".cabecera .lead"), $(".filtros-grupo")].filter(Boolean).forEach((el, i) => {
    el.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], { duration: 560, delay: i * 70, easing: curva, fill: "backwards" });
  });
  [...cont.children].forEach((el, i) => {
    el.animate([{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "none" }], { duration: 620, delay: 220 + Math.min(i, 8) * 60, easing: curva, fill: "backwards" });
  });
}

/* ---------- Equipo: tarjeta con foto; al tocarla se abre la ficha ---------- */
function fotoMiembro(m) {
  return m.foto
    ? `<div class="miembro-foto"><img src="${esc(m.foto)}" alt="Foto de ${esc(m.nombre)}" loading="lazy"></div>`
    : `<div class="miembro-foto"><span class="iniciales" aria-hidden="true">${esc(iniciales(m.nombre))}</span></div>`;
}
const rolMiembro = (m) => [m.cargo, (m.periodos || []).map(String).join(" · ")].filter(Boolean).join(" · ");

function tarjetaIntegrante(m, i) {
  return `<button type="button" class="miembro" data-i="${i}" aria-haspopup="dialog">
    ${fotoMiembro(m)}
    <div class="miembro-texto"><h3>${esc(m.nombre)}</h3><span class="rol">${esc(rolMiembro(m))}</span></div>
  </button>`;
}

let fichaMiembro;
function abrirMiembro(m) {
  if (!fichaMiembro) {
    fichaMiembro = document.createElement("dialog");
    fichaMiembro.className = "ficha-miembro";
    fichaMiembro.setAttribute("aria-labelledby", "ficha-nombre");
    document.body.append(fichaMiembro);
    fichaMiembro.addEventListener("click", (e) => { if (e.target === fichaMiembro) fichaMiembro.close(); });
  }
  const enlaces = [
    m.email ? `<a href="mailto:${esc(m.email)}">Correo</a>` : "",
    m.linkedin ? `<a href="${esc(m.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : "",
    m.cvlac ? `<a href="${esc(m.cvlac)}" target="_blank" rel="noopener">CvLAC</a>` : "",
  ].join("");
  fichaMiembro.innerHTML = `<div class="ficha-cuerpo">
    ${fotoMiembro(m)}
    <div class="ficha-texto">
      <button type="button" class="ficha-cerrar" aria-label="Cerrar">×</button>
      <h2 id="ficha-nombre">${esc(m.nombre)}</h2>
      <span class="rol">${esc(rolMiembro(m))}</span>
      ${m.descripcion ? `<p>${esc(m.descripcion)}</p>` : `<p class="pendiente">Descripción próximamente.</p>`}
      ${enlaces ? `<div class="ficha-enlaces">${enlaces}</div>` : ""}
    </div>
  </div>`;
  $(".ficha-cerrar", fichaMiembro).addEventListener("click", () => fichaMiembro.close());
  fichaMiembro.showModal();
}

async function paginaIntegrantes() {
  const datos = await cargar("data/integrantes.json");
  const cont = $("#equipo");
  if (!datos) { cont.innerHTML = '<p class="vacio">No se pudo cargar el equipo.</p>'; return; }
  const hoy = String(datos.periodoActual);
  const todos = datos.integrantes || [];
  const actuales = todos.filter((m) => (m.periodos || []).map(String).includes(hoy));
  const anteriores = todos.filter((m) => !actuales.includes(m));
  const docentes = datos.docentes || [];
  const fichas = [...docentes, ...actuales];
  const grupo = (titulo, html, clase = "integrantes") => `<h2 class="grupo-titulo">${titulo}</h2><div class="${clase}">${html}</div>`;
  const anterior = (m) => {
    const cargo = m.cargo && m.cargo !== "Integrante" ? `${esc(m.cargo)} · ` : "";
    return `<li><b>${esc(m.nombre)}</b><span>${cargo}${(m.periodos || []).map(esc).join(" · ")}</span></li>`;
  };
  cont.innerHTML = [
    docentes.length ? grupo(docentes.length > 1 ? "Docentes" : "Docente", docentes.map((m, i) => tarjetaIntegrante(m, i)).join("")) : "",
    grupo("Miembros actuales", actuales.map((m, i) => tarjetaIntegrante(m, docentes.length + i)).join("") || '<p class="vacio">Pronto publicaremos el equipo de este año.</p>'),
    anteriores.length ? `<h2 class="grupo-titulo">Antiguos miembros</h2><ul class="antiguos">${anteriores.map(anterior).join("")}</ul>` : "",
  ].join("");
  cont.addEventListener("click", (e) => {
    const b = e.target.closest(".miembro");
    if (b) abrirMiembro(fichas[Number(b.dataset.i)]);
  });
}

/* ---------- Proyectos: una fila por proyecto (texto y cuatro fotos); al tocarla se abre su ficha completa ---------- */
let fichaProyecto;
function abrirProyecto(p, rel) {
  if (!fichaProyecto) {
    fichaProyecto = document.createElement("dialog");
    fichaProyecto.className = "ficha-proyecto";
    fichaProyecto.setAttribute("aria-labelledby", "fp-titulo");
    document.body.append(fichaProyecto);
    fichaProyecto.addEventListener("click", (e) => { if (e.target === fichaProyecto) fichaProyecto.close(); });
    fichaProyecto.addEventListener("close", () => { if (location.hash) history.replaceState(null, "", location.pathname); });
  }
  const { fotos, acts } = rel;
  fichaProyecto.innerHTML = `
    <button type="button" class="ficha-cerrar" aria-label="Cerrar">×</button>
    <div class="fp-cuerpo">
      <p class="fp-dato">${esc(p.anio)} · ${esc(p.lugar)}</p>
      <h2 id="fp-titulo">${esc(p.titulo)}</h2>
      <p class="lead">${esc(p.resumen)}</p>
      <div class="fp-columnas">
        <div class="fp-texto">${(p.descripcion || []).map((t) => `<p>${esc(t)}</p>`).join("")}</div>
        ${acts.length ? `<div><h3 class="fp-sub fp-sub--arriba">Actividades del proyecto</h3><ul class="fp-actividades">${acts.map((a, k) => `<li><button type="button" data-a="${k}"><span>${esc(a.titulo)}</span><small>${esc(a.fecha)}</small></button></li>`).join("")}</ul></div>` : ""}
      </div>
      ${fotos.length ? `<h3 class="fp-sub">Fotos</h3><div class="fp-fotos">${fotos.map((f, k) => `<button type="button" data-f="${k}" aria-label="Ampliar foto ${k + 1}"><img src="${esc(f.src)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}
      ${(p.videos || []).length ? `<h3 class="fp-sub">Videos</h3><div class="fp-videos">${p.videos.map(videoHTML).join("")}</div>` : ""}
    </div>`;
  $(".ficha-cerrar", fichaProyecto).addEventListener("click", () => fichaProyecto.close());
  fichaProyecto.querySelectorAll("[data-f]").forEach((b) => b.addEventListener("click", () => { const f = fotos[b.dataset.f]; abrirVisor(fotos.map((x) => ({ src: x.src, alt: `Foto de ${x.a.titulo}` })), +b.dataset.f); }));
  fichaProyecto.querySelectorAll("[data-a]").forEach((b) => b.addEventListener("click", () => abrirDetalle(acts[b.dataset.a], 0, false)));
  if (!fichaProyecto.open) fichaProyecto.showModal();
  fichaProyecto.scrollTop = 0;
  // El contenido entra por partes al abrir; las fotos y los videos, cuando se llega a ellos
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    const abierta = performance.now();
    fichaProyecto.classList.add("fp-anim");
    fichaProyecto.querySelectorAll(".fp-fotos button").forEach((el, i) => el.style.setProperty("--i", Math.min(i, 8)));
    const io = new IntersectionObserver((entradas) => entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      // Si ya se ve al abrir, espera a que entren el título y el texto
      if (performance.now() - abierta < 400) e.target.style.setProperty("--base", "380ms");
      e.target.classList.add("fp-visto"); io.unobserve(e.target);
    }), { root: fichaProyecto, threshold: 0.15 });
    fichaProyecto.querySelectorAll(".fp-fotos, .fp-videos").forEach((el) => io.observe(el));
  }
  history.replaceState(null, "", "#" + p.id);
}

async function paginaProyectos() {
  const [proys, acts] = await Promise.all([cargar("data/proyectos.json"), cargar("data/actividades.json")]);
  const cont = $("#lista-proyectos");
  if (!proys) { cont.innerHTML = '<p class="vacio">No se pudieron cargar los proyectos.</p>'; return; }
  const datos = proys.map((p) => {
    const rel = (acts || []).filter((a) => a.proyecto === p.id);
    return { p, acts: rel, fotos: rel.flatMap((a) => (a.imagenes || []).map((src, i) => ({ a, src, i }))) };
  });
  const cuenta = (n, uno, varios) => (n ? `${n} ${n === 1 ? uno : varios}` : "");
  cont.innerHTML = datos.map(({ p, acts: rel, fotos }, k) => {
    const portada = fotos.find((f) => f.src === p.portada);
    const cuatro = [portada, ...fotos.filter((f) => f !== portada)].filter(Boolean).slice(0, 4);
    return `
    <article class="py-portada" id="${esc(p.id)}">
      <button type="button" class="py-boton" data-k="${k}" aria-label="Ver el proyecto ${esc(p.titulo)}">
        <div class="py-panel">
          <p class="py-dato">${esc(p.anio)} · ${esc(p.lugar)}</p>
          <h2>${esc(p.titulo)}</h2>
          <p class="py-resumen">${esc(p.resumen)}</p>
          <p class="py-pie"><span>${[cuenta(fotos.length, "foto", "fotos"), cuenta((p.videos || []).length, "video", "videos"), cuenta(rel.length, "actividad", "actividades")].filter(Boolean).join(" · ")}</span><span class="py-ver">Ver proyecto</span></p>
        </div>
        <div class="py-fotos" data-n="${cuatro.length}">${cuatro.map((f) => `<span><img src="${esc(f.src)}" alt="" loading="lazy"></span>`).join("")}</div>
      </button>
    </article>`;
  }).join("");
  cont.querySelectorAll(".py-boton").forEach((b) => b.addEventListener("click", () => { const d = datos[b.dataset.k]; abrirProyecto(d.p, d); }));
  // Cada fila se anima una sola vez al entrar en pantalla (nada con movimiento reducido)
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    document.documentElement.classList.add("py-anim");
    const io = new IntersectionObserver((entradas) => entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("py-visto"); io.unobserve(e.target); }
    }), { threshold: 0.25 });
    cont.querySelectorAll(".py-portada").forEach((el) => io.observe(el));
  }
  rotarFotosProyectos(cont, datos);
  // proyectos.html#id abre directamente la ficha de ese proyecto
  const desdeHash = datos.find((d) => "#" + d.p.id === location.hash);
  if (desdeHash) abrirProyecto(desdeHash.p, desdeHash);
}

// Las cuatro fotos de cada proyecto cambian solas, una casilla a la vez, con un fundido.
// Se detienen al pasar el cursor o con el botón de pausa, y no se mueven con movimiento reducido.
function rotarFotosProyectos(cont, datos) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const filas = [...cont.querySelectorAll(".py-portada")].map((art, k) => {
    const casillas = [...art.querySelectorAll(".py-fotos span")];
    const vistas = casillas.map((c) => c.querySelector("img").getAttribute("src"));
    const resto = datos[k].fotos.map((f) => f.src).filter((src) => !vistas.includes(src));
    return { art, casillas, vistas, resto, paso: 0, visible: false, encima: false };
  }).filter((f) => f.resto.length && f.casillas.length === 4);
  if (!filas.length) return;

  const barra = document.createElement("div");
  barra.className = "py-controles";
  const pausa = document.createElement("button");
  pausa.type = "button";
  pausa.className = "qh-pausa py-pausa";
  barra.append(pausa);
  cont.prepend(barra);
  let pausado = false, reloj = null, turno = 0;
  const ORDEN = [0, 3, 1, 2]; // en diagonal, para que el cambio se reparta por la hoja

  function rotular() {
    pausa.textContent = pausado ? "▶ Reanudar fotos" : "❚❚ Pausar fotos";
    pausa.setAttribute("aria-pressed", String(pausado));
  }
  function cambiar(f) {
    const n = ORDEN[f.paso % 4];
    f.paso++;
    const casilla = f.casillas[n];
    const nueva = f.resto.shift();
    f.resto.push(f.vistas[n]);
    f.vistas[n] = nueva;
    const im = new Image();
    im.alt = ""; im.decoding = "async"; im.className = "py-entra";
    im.onload = () => {
      casilla.append(im);
      requestAnimationFrame(() => requestAnimationFrame(() => im.classList.add("py-lista")));
      setTimeout(() => { [...casilla.querySelectorAll("img")].slice(0, -1).forEach((x) => x.remove()); im.classList.remove("py-entra", "py-lista"); }, 900);
    };
    im.src = nueva;
  }
  function programar() {
    clearTimeout(reloj);
    if (pausado || document.hidden) return;
    reloj = setTimeout(() => {
      const activas = filas.filter((f) => f.visible && !f.encima);
      if (activas.length) cambiar(activas[turno++ % activas.length]);
      programar();
    }, 2600);
  }
  const io = new IntersectionObserver((entradas) => entradas.forEach((e) => {
    const f = filas.find((x) => x.art === e.target);
    if (f) f.visible = e.isIntersecting;
  }), { threshold: 0.4 });
  filas.forEach((f) => {
    io.observe(f.art);
    f.art.addEventListener("mouseenter", () => { f.encima = true; });
    f.art.addEventListener("mouseleave", () => { f.encima = false; });
  });
  pausa.addEventListener("click", () => { pausado = !pausado; rotular(); programar(); });
  document.addEventListener("visibilitychange", programar);
  rotular();
  programar();
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

const autoresDe = (t) => (t.autores || []).filter(Boolean);
const pesoArchivo = { "assets/docs/material/geoeducacion-cepita.pdf": "16 MB", "assets/docs/material/fotogrametria-modelamiento-3d.pdf": "7 MB" };

// Pósters: la lámina completa en vertical, con su título entero debajo.
// Tesis y artículos: una entrada de registro, con el año al margen como en un índice.
function tarjetaMaterial(t) {
  const b = document.createElement("button");
  b.type = "button";
  const autores = autoresDe(t).join(", ");
  const anio = `${enDesarrollo(t) ? "Desde " : ""}${esc(t.anio)}`;
  if (t.tipo === "Póster") {
    b.className = "mt-lamina";
    b.innerHTML = `
      <span class="mt-lamina-hoja">${t.imagen ? `<img src="${esc(t.imagen)}" alt="" loading="lazy">` : `<span class="sin-foto">${ICONOS.documento}</span>`}</span>
      <span class="mt-lamina-dato">${anio}${t.evento ? " · " + esc(t.evento) : ""}</span>
      <span class="mt-lamina-titulo">${esc(t.titulo)}</span>
      ${autores ? `<span class="mt-autores">${esc(autores)}</span>` : ""}
      ${t.ejemplo ? '<span class="chip">Ejemplo</span>' : ""}`;
  } else {
    b.className = "mt-entrada";
    b.innerHTML = `
      <span class="mt-entrada-anio">${esc(t.anio)}</span>
      <span class="mt-entrada-cuerpo">
        ${chipsMaterial(t)}
        <span class="mt-entrada-titulo">${esc(t.titulo)}</span>
        ${autores ? `<span class="mt-autores">${esc(autores)}</span>` : ""}
        <span class="mt-entrada-meta">${[t.director ? "Dirige " + esc(t.director) : "", t.evento ? esc(t.evento) : ""].filter(Boolean).join(" · ")}</span>
      </span>
      <span class="mt-entrada-ver" aria-hidden="true">→</span>`;
  }
  b.addEventListener("click", () => abrirMaterial(t));
  return b;
}

// Ficha del trabajo, con la misma composición que la de los proyectos
let fichaMaterial;
function abrirMaterial(t) {
  if (!fichaMaterial) {
    fichaMaterial = document.createElement("dialog");
    fichaMaterial.className = "ficha-proyecto ficha-material";
    fichaMaterial.setAttribute("aria-labelledby", "fm-titulo");
    document.body.append(fichaMaterial);
    fichaMaterial.addEventListener("click", (e) => { if (e.target === fichaMaterial) fichaMaterial.close(); });
  }
  const autores = autoresDe(t);
  const filas = [
    [autores.length > 1 ? "Autores" : "Autoría", autores.join(", ")],
    ["Dirige", t.director], ["Codirige", t.codirector],
    [t.tipo === "Artículo" ? "Revista" : t.tipo === "Póster" ? "Evento" : "Programa", t.evento],
    ["Lugar", t.lugar],
  ].filter(([, v]) => v);
  const accion = t.archivo ? `<a class="boton" href="${esc(t.archivo)}" target="_blank" rel="noopener">${t.tipo === "Póster" ? "Ver el póster en PDF" : t.tipo === "Tesis" ? "Descargar la tesis" : "Leer el artículo"}</a>${pesoArchivo[t.archivo] ? `<small class="fm-peso">${pesoArchivo[t.archivo]}</small>` : ""}` : "";
  const enlace = t.enlace ? `<a class="enlace-flecha" href="${esc(t.enlace)}" target="_blank" rel="noopener">Más información</a>` : "";
  fichaMaterial.innerHTML = `
    <button class="ficha-cerrar" aria-label="Cerrar">×</button>
    <div class="fm-cuerpo${t.imagen ? " fm-cuerpo--lamina" : ""}">
      ${t.imagen ? `<a class="fm-lamina" href="${esc(t.archivo || t.imagen)}" target="_blank" rel="noopener"><img src="${esc(t.imagen)}" alt="Póster: ${esc(t.titulo)}"></a>` : ""}
      <div class="fm-texto">
        <p class="fp-dato">${esc(t.tipo)} · ${enDesarrollo(t) ? "En desarrollo desde " : ""}${esc(t.anio)}</p>
        <h2 id="fm-titulo">${esc(t.titulo)}</h2>
        ${chipsMaterial(t)}
        ${t.resumen ? `<p class="lead">${esc(t.resumen)}</p>` : ""}
        <dl class="fm-datos">${filas.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
        ${accion || enlace ? `<p class="fm-acciones">${accion}${enlace}</p>` : ""}
      </div>
    </div>`;
  $(".ficha-cerrar", fichaMaterial).addEventListener("click", () => fichaMaterial.close());
  fichaMaterial.classList.toggle("fm-anim", !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  fichaMaterial.showModal();
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
    transicion(cont, pintar);
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
    transicion(cont, pintar);
  });
  filtroAnio.addEventListener("click", (e) => {
    const b = e.target.closest(".filtro");
    if (!b) return;
    estado.anio = b.dataset.v;
    filtroAnio.querySelectorAll(".filtro").forEach((x) => x.setAttribute("aria-pressed", x === b));
    transicion(cont, pintar);
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
    cont.className = estado.tipo === "Póster" ? "mt-laminas" : "mt-registro";
    if (!vis.length) { cont.innerHTML = `<p class="vacio">Todavía no hay ${info.vacio}.</p>`; return; }
    vis.forEach((t) => cont.append(tarjetaMaterial(t)));
  }
  pintarFase();
  pintarAnios();
  pintar();
  // Primera carga: las láminas se posan una a una y el registro se escribe de arriba abajo
  if (!quietoMov() && "IntersectionObserver" in window) {
    cont.classList.add("mt-entra");
    [...cont.children].forEach((el, i) => el.style.setProperty("--i", Math.min(i, 6)));
    const io = new IntersectionObserver((entradas) => entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("mt-visto"); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    [...cont.children].forEach((el) => io.observe(el));
    // Al cambiar de pestaña lo nuevo entra con transicion(), sin esperar al observador
    const marcar = () => cont.classList.remove("mt-entra");
    $("#filtro-tipo").addEventListener("click", marcar, { once: true });
    $("#filtro-anio-material").addEventListener("click", marcar, { once: true });
  }
}

/* ---------- Microinteracciones ---------- */
// Sombra de la barra superior al bajar por la página
function sombraHeader() {
  const h = $(".header");
  if (!h) return;
  const revisar = () => h.classList.toggle("con-sombra", window.scrollY > 8);
  window.addEventListener("scroll", revisar, { passive: true });
  revisar();
}
// Marco que se desliza hasta el año o filtro elegido
function indicadorFiltros() {
  document.querySelectorAll(".filtros").forEach((raiz) => {
    const ind = document.createElement("span");
    ind.className = "filtro-indicador sin-transicion";
    ind.setAttribute("aria-hidden", "true");
    let primera = true;
    const mover = () => {
      const b = raiz.querySelector('.filtro[aria-pressed="true"]');
      if (!ind.isConnected) raiz.prepend(ind);
      raiz.classList.toggle("con-indicador", !!b);
      ind.hidden = !b;
      if (!b || !b.offsetWidth) return;
      ind.style.width = b.offsetWidth + "px";
      ind.style.height = b.offsetHeight + "px";
      ind.style.transform = `translate(${b.offsetLeft}px, ${b.offsetTop}px)`;
      if (primera) { primera = false; requestAnimationFrame(() => ind.classList.remove("sin-transicion")); }
    };
    new MutationObserver(() => requestAnimationFrame(mover))
      .observe(raiz, { subtree: true, childList: true, attributes: true, attributeFilter: ["aria-pressed", "hidden"] });
    window.addEventListener("resize", () => { ind.classList.add("sin-transicion"); mover(); requestAnimationFrame(() => ind.classList.remove("sin-transicion")); });
    mover();
  });
}

/* ---------- Arranque ---------- */
document.addEventListener("DOMContentLoaded", () => {
  dibujarHeader();
  dibujarFooter();
  document.querySelectorAll("[data-estratos]").forEach((n) => {
    n.outerHTML = estratosSVG(n.dataset.estratos || "var(--arena)", n.hasAttribute("data-invertido"));
  });
  const p = document.body.dataset.pagina;
  if (p === "inicio") { paginaInicio(); queHacemos(); }
  if (p === "nosotros") animarNosotros();
  dibujarMigas();
  sombraHeader();
  indicadorFiltros();
  if (p === "actividades" || p === "stands") paginaActividades();
  if (p === "integrantes") paginaIntegrantes();
  if (p === "proyectos") paginaProyectos();
  if (p === "material") paginaMaterial();
});
