// Prueba la web en un navegador real (Chromium con Playwright).
//
// Uso, desde la raíz del repositorio:
//   node pruebas/navegador.mjs                 todas las páginas, escritorio y móvil
//   node pruebas/navegador.mjs index.html      solo algunas páginas
//
// Qué hace:
//   1. Sirve la carpeta del repositorio en un puerto local (no hace falta Python ni Live Server).
//   2. Lee el menú de la portada y visita cada página y cada sección del menú (p. ej. actividades.html#charlas).
//   3. En escritorio (1440 × 900) y móvil (390 × 844) recorre la página de arriba abajo,
//      toma una captura de pantalla completa y anota:
//        - errores de consola y excepciones de JavaScript,
//        - recursos que no cargan (404, imágenes rotas),
//        - desbordamiento horizontal (contenido más ancho que la pantalla).
//   4. Guarda capturas e informe en pruebas/resultados/ (no se sube a git) y termina con
//      código 1 si encontró problemas.
//
// En la nube de Claude Code, Playwright y Chromium ya vienen instalados. En otro equipo:
//   npm i -D playwright && npx playwright install chromium

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  console.error('No encuentro Playwright. Instálalo con: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SALIDA = path.join(RAIZ, 'pruebas', 'resultados');
const VISTAS = [
  { nombre: 'escritorio', viewport: { width: 1440, height: 900 } },
  { nombre: 'movil', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
];
// Lo que viene de fuera (Instagram, YouTube, Google Maps, fuentes…) puede estar bloqueado por la red
// de la nube: se anota aparte y no cuenta como fallo. Solo cuenta lo que sirve el propio sitio.
const LOCAL = /^http:\/\/127\.0\.0\.1:\d+\//;
const externo = (url) => !!url && !LOCAL.test(url);

const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.gif': 'image/gif', '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.mp4': 'video/mp4' };

function servir() {
  const servidor = http.createServer((req, res) => {
    let ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (ruta.endsWith('/')) ruta += 'index.html';
    const archivo = path.join(RAIZ, path.normalize(ruta));
    if (!archivo.startsWith(RAIZ) || !fs.existsSync(archivo) || fs.statSync(archivo).isDirectory()) {
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
      return fs.createReadStream(path.join(RAIZ, '404.html')).pipe(res);
    }
    res.writeHead(200, { 'content-type': TIPOS[path.extname(archivo).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(archivo).pipe(res);
  });
  return new Promise((ok) => servidor.listen(0, '127.0.0.1', () => ok(servidor)));
}

async function recorrer(page) {
  // Baja poco a poco para disparar animaciones de entrada y carga diferida, y vuelve arriba.
  await page.evaluate(async () => {
    const paso = Math.max(200, Math.floor(innerHeight * 0.6));
    for (let y = 0; y < document.documentElement.scrollHeight; y += paso) {
      scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 120));
    }
    scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(400);
}

async function revisar(browser, base, ruta, vista) {
  const contexto = await browser.newContext({ ...vista, reducedMotion: 'no-preference' });
  const page = await contexto.newPage();
  const r = { ruta, vista: vista.nombre, consola: [], js: [], recursos: [], externos: [], imagenes: [], desborde: null };
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    const texto = m.text();
    const url = m.location()?.url || '';
    (externo(url) || /ERR_TUNNEL|ERR_NAME|ERR_PROXY/.test(texto) ? r.externos : r.consola).push(texto);
  });
  page.on('pageerror', (e) => r.js.push(String(e.message || e)));
  page.on('requestfailed', (q) => (externo(q.url()) ? r.externos : r.recursos).push(`${q.url()} (${q.failure()?.errorText})`));
  page.on('response', (s) => { if (s.status() >= 400 && !externo(s.url())) r.recursos.push(`${s.status()} ${s.url()}`); });

  await page.goto(base + ruta, { waitUntil: 'networkidle', timeout: 30000 }).catch((e) => r.js.push(`No carga: ${e.message}`));
  await recorrer(page);
  r.titulo = await page.title();
  r.imagenes = await page.evaluate(() => [...document.images]
    .filter((i) => i.complete && i.naturalWidth === 0 && i.src.startsWith(location.origin)).map((i) => i.currentSrc || i.src));
  r.desborde = await page.evaluate(() => {
    const ancho = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth <= ancho + 1) return null;
    const culpables = [...document.querySelectorAll('body *')]
      .filter((el) => { const b = el.getBoundingClientRect(); return b.width && b.right > ancho + 1 && getComputedStyle(el).position !== 'fixed'; })
      .slice(0, 5).map((el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''));
    return { scrollWidth: document.documentElement.scrollWidth, ancho, culpables };
  });
  const nombre = ruta.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'index';
  r.captura = path.join('pruebas', 'resultados', `${nombre}-${vista.nombre}.png`);
  // Primera pantalla tal como la ve el visitante, y la página completa (en la completa los
  // elementos fijos, como una cabecera pegajosa, pueden salir en una posición intermedia).
  await page.screenshot({ path: path.join(RAIZ, r.captura.replace(/\.png$/, '-pantalla.png')) });
  await page.screenshot({ path: path.join(RAIZ, r.captura), fullPage: true });
  await contexto.close();
  r.problemas = r.consola.length + r.js.length + r.recursos.length + r.imagenes.length + (r.desborde ? 1 : 0);
  return r;
}

async function paginasDelMenu(browser, base) {
  const page = await browser.newPage();
  await page.goto(base + 'index.html', { waitUntil: 'networkidle' });
  const enlaces = await page.evaluate(() => [...document.querySelectorAll('a[href]')]
    .map((a) => a.getAttribute('href')).filter((h) => /^[\w-]+\.html(#[\w-]+)?$/.test(h)));
  await page.close();
  const html = fs.readdirSync(RAIZ).filter((f) => f.endsWith('.html'));
  return [...new Set([...html, ...enlaces])].sort();
}

const servidor = await servir();
const base = `http://127.0.0.1:${servidor.address().port}/`;
const browser = await chromium.launch();
fs.mkdirSync(SALIDA, { recursive: true });

const pedidas = process.argv.slice(2);
const rutas = pedidas.length ? pedidas : await paginasDelMenu(browser, base);
const resultados = [];
for (const ruta of rutas) for (const vista of VISTAS) {
  const r = await revisar(browser, base, ruta, vista);
  resultados.push(r);
  const estado = r.problemas ? `✗ ${r.problemas} problema(s)` : '✓';
  console.log(`${estado.padEnd(16)} ${vista.nombre.padEnd(10)} ${ruta}`);
  for (const e of r.js) console.log(`    JS: ${e}`);
  for (const e of r.consola) console.log(`    consola: ${e}`);
  for (const e of r.recursos) console.log(`    recurso: ${e}`);
  for (const e of r.imagenes) console.log(`    imagen rota: ${e}`);
  if (r.desborde) console.log(`    desborde horizontal: ${r.desborde.scrollWidth}px en ${r.desborde.ancho}px · ${r.desborde.culpables.join(', ')}`);
}
await browser.close();
servidor.close();

fs.writeFileSync(path.join(SALIDA, 'informe.json'), JSON.stringify(resultados, null, 2));
const externos = [...new Set(resultados.flatMap((r) => r.externos))];
if (externos.length) console.log(`\nAviso: ${externos.length} recurso(s) externo(s) no cargaron (normal si la red los bloquea, p. ej. Instagram).`);
const total = resultados.reduce((n, r) => n + r.problemas, 0);
console.log(`\n${resultados.length} revisiones, ${total} problema(s). Capturas e informe en pruebas/resultados/`);
process.exit(total ? 1 : 0);
