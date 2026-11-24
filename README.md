# Página web del SEGET

Sitio del **Semillero de Geología Estructural y Tectónica (SEGET)** de la Escuela de Geología de la UIS.
Es un sitio estático (HTML, CSS y JavaScript, sin compilar) pensado para publicarse con **GitHub Pages**.

## Estructura

```
index.html          Inicio
nosotros.html       Quiénes somos y cómo unirse
integrantes.html    Equipo por año (se llena desde data/integrantes.json)
actividades.html    Charlas, talleres, salidas… con filtros (data/actividades.json)
proyectos.html      Proyectos de extensión (data/proyectos.json)
material.html       Material científico: pósters, tesis y artículos (data/material.json)
data/               TODO el contenido editable (.json). Ver data/LEEME.md
assets/css/seget.css   Colores y estilos (los colores están al inicio, en :root)
assets/js/seget.js     Menú, pie de página y lógica. Correo, Instagram y YouTube están arriba en SEGET = {...}
assets/img/            Logo, fotos de actividades e integrantes
```

## Ver la página en el computador

Los datos se cargan con JavaScript, así que **no abra los .html con doble clic**. Use la extensión
*Live Server* de VS Code (clic derecho en `index.html` › *Open with Live Server*) o, desde la carpeta:

```
python3 -m http.server 8000
```

y abra http://localhost:8000.

## Publicar con GitHub Pages

En el repositorio: *Settings › Pages › Build and deployment › Deploy from a branch*, rama `main`, carpeta `/ (root)`.
Todas las rutas son relativas, así que funciona tanto en `seget-uis.github.io` como en `seget-uis.github.io/seget-uis/`.
Si quieren la dirección corta `https://seget-uis.github.io/`, el repositorio debe llamarse `seget-uis.github.io`.

## Pendientes

- Reemplazar `assets/img/logo-seget.svg` por el logo oficial (puede ser `.png`; cambie la ruta en `assets/js/seget.js`).
- Fotos, descripciones y LinkedIn de cada integrante en `data/integrantes.json`.
- Enlaces de publicaciones de Instagram en `data/noticias.json` y el canal de YouTube en `assets/js/seget.js`.
- Fechas exactas de las actividades de 2025 (en el acta no aparecen).
