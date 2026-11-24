# Cómo editar el contenido

Todo el contenido está en estos archivos `.json`. Reglas básicas:

1. Antes de editar, `git pull`.
2. Texto entre comillas dobles `"..."`, bloques separados por coma, **sin coma después del último bloque**.
3. Nombres de fotos sin espacios ni tildes: `nombre-apellido.jpg`.
4. Si una sección queda vacía en la página, casi siempre es una coma o comilla mal puesta.

## actividades.json

Copie un bloque al inicio de la lista:

```json
{
  "titulo": "Charla: nombre de la charla",
  "categoria": "Charla",
  "fecha": "28 de agosto de 2026",
  "fechaFin": "2026-08-28",
  "lugar": "Salón 314 JBV, UIS",
  "instructor": "Nombre de quien la dio",
  "descripcion": ["Primer párrafo.", "Segundo párrafo (opcional)."],
  "imagenes": ["assets/img/actividades/2026/nombre-foto.jpg"],
  "videos": [],
  "proyecto": "",
  "enlace": ""
}
```

- `categoria`: Charla, Taller, Curso, Salida de campo, Stand o Apropiación social (los filtros se crean solos).
- `fechaFin` (año-mes-día) ordena la lista y define el año del filtro.
- `videos`: el código de YouTube (lo que va después de `youtu.be/` o `watch?v=`).
- `proyecto`: `cepita-2026` o `los-santos-2025` para que las fotos salgan también en la página de Proyectos.
- Fotos: guárdelas en `assets/img/actividades/AÑO/`, idealmente de máximo 1400 px de ancho.
- **No suba fotos de listas de asistencia** (tienen datos personales).
- Solo actividades públicas; las reuniones de junta no van.

## integrantes.json

Cada año es un `periodo` con grupos. El que tiene `"actual": true` se muestra primero.

```json
{
  "nombre": "Nombre Apellido",
  "cargo": "Integrante",
  "programa": "Geología",
  "foto": "assets/img/integrantes/nombre-apellido.jpg",
  "descripcion": "Biografía corta (una o dos frases).",
  "linkedin": "https://www.linkedin.com/in/usuario/",
  "email": "",
  "cvlac": ""
}
```

Si `foto` está vacía se muestran las iniciales; si `linkedin`, `email` o `cvlac` están vacíos, el botón no aparece.
Use fotos cuadradas. Al empezar un año nuevo, copie el periodo, cambie el año y ponga `"actual": false` en el anterior.

## proyectos.json

Un bloque por proyecto de extensión. `id` es el mismo valor que se pone en `proyecto` de cada actividad.

## material.json

Pósters, tesis y artículos del semillero (página **Material científico**). Copie un bloque al inicio de la lista:

```json
{
  "titulo": "Título del póster",
  "tipo": "Póster",
  "anio": "2026",
  "autores": ["Nombre Apellido", "Nombre Apellido"],
  "director": "",
  "evento": "Nombre del evento, o \"Trabajo de grado, Escuela de Geología UIS\" para una tesis",
  "lugar": "Ciudad",
  "resumen": "Resumen corto (dos o tres frases).",
  "imagen": "assets/img/material/nombre-del-poster.jpg",
  "archivo": "assets/docs/material/nombre-del-poster.pdf",
  "enlace": ""
}
```

- `tipo`: escriba exactamente `Póster`, `Tesis` o `Artículo`. La página tiene una pestaña para cada uno y muestra solo los de la pestaña elegida.
- `anio`: los botones de año se crean solos con los años de la pestaña elegida (aparecen cuando hay trabajos de dos años o más).
- `imagen`: foto o vista previa del póster o de la portada. Guárdela en `assets/img/material/`. Si está vacía se muestra un ícono de documento.
- `archivo`: el PDF. Guárdelo en `assets/docs/material/` o pegue un enlace de Google Drive. Si está vacío, no aparece el botón de descarga.
- `enlace`: opcional, por ejemplo el DOI del artículo o el repositorio de la UIS.
- `director`: solo para tesis.
- Los bloques que tienen `"ejemplo": true` **no se muestran** en la página. Sirven de plantilla; para verlos abra `material.html?ejemplos`. Bórrelos cuando agregue trabajos reales.
- Mientras no haya trabajos reales, la página muestra "Muy pronto".
- Para enlazar directo a una pestaña use `material.html#posters`, `material.html#tesis` o `material.html#articulos`.

## eventos.json

Aviso de **próximo evento** en la portada (debajo de la foto principal). Copie un bloque en la lista:

```json
{
  "titulo": "Charla: título de la charla",
  "tipo": "Charla",
  "fecha": "2027-02-18",
  "hora": "4:00 p. m.",
  "lugar": "Salón 314, edificio JBV, UIS",
  "ponente": "Nombre del ponente",
  "descripcion": "Una o dos frases sobre el evento.",
  "imagen": "assets/img/eventos/flyer-charla.jpg",
  "enlace": "https://www.instagram.com/p/...",
  "textoEnlace": "Ver en Instagram"
}
```

- `fecha`: año-mes-día. La portada muestra el evento más cercano que todavía no haya pasado, con un aviso de cuántos días faltan. Al día siguiente de la fecha deja de mostrarse solo.
- Si no hay eventos próximos, la sección no aparece.
- `imagen`: el flyer que se publica en Instagram (cuadrado). Guárdelo en `assets/img/eventos/`.
- `enlace`: opcional, por ejemplo la publicación de Instagram o el formulario de inscripción. `textoEnlace` es el texto del botón.
- `hora`, `lugar`, `ponente` y `descripcion` son opcionales: si están vacíos no se muestran.
- Los bloques con `"ejemplo": true` no se muestran; para verlos abra `index.html?ejemplos`.

## noticias.json

Enlaces de publicaciones de Instagram, las más recientes primero (se muestran 3 en la portada).
Si la lista está vacía, la portada muestra un botón hacia @seget.uis.
