// Trae las 3 publicaciones más recientes de @seget.uis y las guarda en data/noticias.json.
// Lo ejecuta .github/workflows/instagram.yml. Necesita el secreto IG_TOKEN
// (token de larga duración de la API de Instagram con inicio de sesión de Instagram).
import { readFile, writeFile } from "node:fs/promises";

const token = process.env.IG_TOKEN;
if (!token) {
  console.log("No hay IG_TOKEN: no se actualiza Instagram.");
  process.exit(0);
}

// Renueva el token para que no venza (dura 60 días y se puede renovar si tiene más de 24 horas).
await fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`).catch(() => {});

const r = await fetch(`https://graph.instagram.com/me/media?fields=permalink,timestamp&limit=3&access_token=${token}`);
if (!r.ok) {
  console.error("Instagram respondió", r.status, await r.text());
  process.exit(1);
}
const { data = [] } = await r.json();
const enlaces = data.map((p) => p.permalink).filter(Boolean).slice(0, 3);
if (!enlaces.length) {
  console.log("Instagram no devolvió publicaciones; se deja el archivo como está.");
  process.exit(0);
}

const ruta = "data/noticias.json";
const actual = JSON.parse(await readFile(ruta, "utf8"));
if (JSON.stringify(actual.instagram) === JSON.stringify(enlaces)) {
  console.log("Sin publicaciones nuevas.");
  process.exit(0);
}
actual.instagram = enlaces;
await writeFile(ruta, JSON.stringify(actual, null, 2) + "\n");
console.log("Actualizado:", enlaces.join(", "));
