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
  youtube: "", // Pegue aquí el enlace del canal de YouTube cuando lo tengan
};

const MENU = [
  { href: "index.html", texto: "Inicio", id: "inicio" },
  { href: "nosotros.html", texto: "Nosotros", id: "nosotros" },
  { href: "integrantes.html", texto: "Integrantes", id: "integrantes" },
  { href: "actividades.html", texto: "Actividades", id: "actividades" },
  { href: "proyectos.html", texto: "Proyectos", id: "proyectos" },
];

const ICONOS = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  correo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15.1V8.9l5.4 3.1-5.4 3.1Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11Z"/></svg>',
  cvlac: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
  roca: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 18 7 8l5 3 4-5 5 12z"/><path d="M3 18h18M8.5 13.5l3 1.5 3.5-3"/></svg>',
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

/* Divisor de estratos con un pequeño salto de falla (colores en seget.css) */
function estratosSVG(invertido = false) {
  return `<svg class="estratos${invertido ? " estratos--invertido" : ""}" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
    <rect class="e-fondo" width="1200" height="40"/>
    <path class="e-ocre" d="M0 10 H640 L668 18 H1200 V40 H0Z"/>
    <path class="e-oliva" d="M0 20 H640 L668 28 H1200 V40 H0Z"/>
    <path class="e-tinta" d="M0 29 H640 L668 37 H1200 V40 H0Z"/>
    <path class="e-falla" d="M630 2 L680 40" stroke-width="3" fill="none"/>
  </svg>`;
}

/* ---------- Menú y pie ---------- */
function dibujarHeader() {
  const actual = document.body.dataset.pagina;
  const h = document.createElement("header");
  h.className = "header";
  h.innerHTML = `
    <div class="container"><div class="header-barra">
      <a class="marca" href="index.html" aria-label="SEGET, inicio">
        <img src="assets/img/logo-seget.svg" alt="" width="40" height="40">
        <strong>SEGET</strong>
      </a>
      <button type="button" class="menu-boton" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav">${ICONOS.menu}</button>
      <nav class="nav" id="nav" aria-label="Principal">
        ${MENU.map((m) => `<a href="${m.href}"${m.id === actual ? ' aria-current="page"' : ""}>${m.texto}</a>`).join("")}
      </nav>
    </div></div>`;
  document.body.prepend(h);
  const boton = $(".menu-boton", h);
  const nav = $(".nav", h);
  boton.addEventListener("click", () => {
    const abierto = nav.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", abierto);
  });
}

function dibujarFooter() {
  const f = document.createElement("footer");
  f.className = "footer";
  const redes = [
    `<a href="${SEGET.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONOS.instagram}</a>`,
    `<a href="mailto:${SEGET.correo}" aria-label="Correo">${ICONOS.correo}</a>`,
    SEGET.youtube ? `<a href="${SEGET.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${ICONOS.youtube}</a>` : "",
  ].join("");
  f.innerHTML = `
    <div class="container">
      <p class="footer-frase">Nos reunimos cada semana en la Escuela de Geología de la UIS.</p>
      <div class="footer-rejilla">
        <div class="footer-marca">
          <a class="marca" href="index.html" aria-label="SEGET, inicio">
            <img src="assets/img/logo-seget.svg" alt="" width="40" height="40">
            <strong>SEGET</strong>
          </a>
          <p>Escuela de Geología, Universidad Industrial de Santander. Adscrito al Grupo de Investigación en Geología Básica y Aplicada (GIGBA).</p>
          <div class="redes">${redes}</div>
        </div>
        <div class="footer-col">
          <h2>Páginas</h2>
          <ul>${MENU.map((m) => `<li><a href="${m.href}">${m.texto}</a></li>`).join("")}</ul>
        </div>
        <div class="footer-col">
          <h2>Escríbenos</h2>
          <ul>
            <li><a href="mailto:${SEGET.correo}">${SEGET.correo}</a></li>
            <li><a href="${SEGET.instagram}" target="_blank" rel="noopener">@seget.uis</a></li>
            <li>Bucaramanga, Santander, Colombia</li>
          </ul>
        </div>
      </div>
      <div class="footer-legal">
        <span>© ${new Date().getFullYear()} SEGET, UIS</span>
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
      <div class="actividad-meta"><span>${esc(a.fecha)}</span>${a.lugar ? `<span>${esc(a.lugar)}</span>` : ""}</div>
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
    <button type="button" class="cerrar" aria-label="Cerrar">×</button>
    ${imgs.length ? `<div class="detalle-galeria">
      <img src="${esc(imgs[i])}" alt="Foto de la actividad ${esc(a.titulo)}">
      ${imgs.length > 1 ? `<button type="button" class="nav-foto prev" aria-label="Foto anterior">‹</button>
      <button type="button" class="nav-foto next" aria-label="Foto siguiente">›</button>
      <span class="indice">${i + 1} / ${imgs.length}</span>` : ""}
    </div>` : ""}
    <div class="detalle-texto">
      <span class="chip" data-cat="${esc(a.categoria)}">${esc(a.categoria)}</span>
      <h2>${esc(a.titulo)}</h2>
      <dl class="detalle-datos">
        <dt>Fecha</dt><dd>${esc(a.fecha)}</dd>
        ${a.lugar ? `<dt>Lugar</dt><dd>${esc(a.lugar)}</dd>` : ""}
        ${a.instructor ? `<dt>A cargo de</dt><dd>${esc(a.instructor)}</dd>` : ""}
      </dl>
      ${(a.descripcion || []).map((p) => `<p>${esc(p)}</p>`).join("")}
      ${(a.videos || []).length ? `<div class="videos">${a.videos.map(videoHTML).join("")}</div>` : ""}
      ${a.enlace ? `<p><a class="enlace" href="${esc(a.enlace)}" target="_blank" rel="noopener">Más información</a></p>` : ""}
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
    <img src="https://i.ytimg.com/vi/${esc(id)}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()">
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
    const actual = equipo.periodos.find((p) => p.actual) || equipo.periodos[0];
    $("#c-integrantes").textContent = actual.grupos.reduce((s, g) => s + g.miembros.length, 0);
  }
  dibujarInstagram(noticias);
}

function dibujarInstagram(noticias) {
  const cont = $("#instagram");
  if (!cont) return;
  const posts = (noticias && noticias.instagram) || [];
  if (!posts.length) {
    cont.innerHTML = `<div class="instagram-vacio">
      <div><h3>Síguenos en Instagram</h3><p>Allí publicamos cada charla, taller y salida de campo.</p></div>
      <a class="boton boton--primario" href="${SEGET.instagram}" target="_blank" rel="noopener">${ICONOS.instagram.replace("<svg", '<svg width="20" height="20"')} @seget.uis</a>
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

async function paginaActividades() {
  const acts = await cargar("data/actividades.json");
  const cont = $("#lista-actividades");
  if (!acts) { cont.innerHTML = '<p class="vacio">No se pudieron cargar las actividades.</p>'; return; }
  const lista = ordenar(acts);
  const cats = ["Todas", ...new Set(lista.map((a) => a.categoria))];
  const anios = ["Todos", ...new Set(lista.map(anio))];
  const estado = { cat: "Todas", anio: "Todos" };

  const botones = (raiz, valores, clave) => {
    raiz.innerHTML = valores.map((v) => `<button type="button" class="filtro" aria-pressed="${v === estado[clave]}" data-v="${esc(v)}">${esc(v)}</button>`).join("");
    raiz.addEventListener("click", (e) => {
      const b = e.target.closest(".filtro");
      if (!b) return;
      estado[clave] = b.dataset.v;
      raiz.querySelectorAll(".filtro").forEach((x) => x.setAttribute("aria-pressed", x === b));
      pintar();
    });
  };
  botones($("#filtro-cat"), cats, "cat");
  botones($("#filtro-anio"), anios, "anio");

  function pintar() {
    const vis = lista.filter((a) => (estado.cat === "Todas" || a.categoria === estado.cat) && (estado.anio === "Todos" || anio(a) === estado.anio));
    cont.innerHTML = "";
    if (!vis.length) { cont.innerHTML = '<p class="vacio">No hay actividades con ese filtro.</p>'; return; }
    vis.forEach((a) => cont.append(tarjetaActividad(a)));
    $("#total-actividades").textContent = `${vis.length} ${vis.length === 1 ? "actividad" : "actividades"}`;
  }
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
  const sel = $("#periodos");
  let actual = (datos.periodos.find((p) => p.actual) || datos.periodos[0]).periodo;
  sel.innerHTML = datos.periodos.map((p) => `<button type="button" class="filtro" data-v="${esc(p.periodo)}" aria-pressed="${p.periodo === actual}">${esc(p.periodo)}${p.actual ? " (actual)" : ""}</button>`).join("");
  sel.addEventListener("click", (e) => {
    const b = e.target.closest(".filtro");
    if (!b) return;
    actual = b.dataset.v;
    sel.querySelectorAll(".filtro").forEach((x) => x.setAttribute("aria-pressed", x === b));
    pintar();
  });
  function pintar() {
    const p = datos.periodos.find((x) => x.periodo === actual);
    const compacto = !p.actual;
    cont.innerHTML = p.grupos.map((g) => `
      <h2 class="grupo-titulo">${esc(g.nombre)}</h2>
      <div class="integrantes${compacto && g.miembros.length > 3 ? " integrantes--compacto" : ""}">
        ${g.miembros.map((m) => tarjetaIntegrante(m, compacto && g.miembros.length > 3)).join("")}
      </div>`).join("");
  }
  pintar();
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
      <div class="proyecto-portada"><img src="${esc(p.portada)}" alt="" loading="lazy" width="1080" height="1350"></div>
      <div class="proyecto-texto">
        <h2>${esc(p.titulo)}</h2>
        <p class="lead">${esc(p.resumen)}</p>
        <dl class="ficha">
          <dt>Año</dt><dd class="num">${esc(p.anio)}</dd>
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
      v.className = "videos";
      v.innerHTML = p.videos.map(videoHTML).join("");
      bloque.append(v);
    }
    cont.append(bloque);
  });
}

/* ---------- Arranque ---------- */
document.addEventListener("DOMContentLoaded", () => {
  dibujarHeader();
  dibujarFooter();
  document.querySelectorAll("[data-estratos]").forEach((n) => {
    n.outerHTML = estratosSVG(n.hasAttribute("data-invertido"));
  });
  const p = document.body.dataset.pagina;
  if (p === "inicio") paginaInicio();
  if (p === "actividades") paginaActividades();
  if (p === "integrantes") paginaIntegrantes();
  if (p === "proyectos") paginaProyectos();
});
