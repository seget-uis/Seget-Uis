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

## noticias.json

Enlaces de publicaciones de Instagram, las más recientes primero (se muestran 3 en la portada).
Si la lista está vacía, la portada muestra un botón hacia @seget.uis.
