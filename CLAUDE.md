# Instrucciones para Claude: web del SEGET

Sitio estático del Semillero de Geología Estructural y Tectónica (UIS), publicado con GitHub Pages.
HTML, CSS y JavaScript sin compilar. La estructura está en `README.md`, y el contenido editable en `data/*.json` (ver `data/LEEME.md`).

Todo el trabajo se hace desde GitHub y las sesiones de Claude Code en la nube. No hay que instalar nada en el computador del responsable.

## Reglas del proyecto

1. **Dirección de arte primero, con Taste.** Antes de programar cualquier cambio visual, usa la skill `design-taste-frontend` para proponer la dirección de arte: paleta, tipografía, ritmo de secciones, fotografía y momentos de animación. Preséntala con capturas o bocetos y una explicación breve.
2. **Esperar aprobación antes de tocar el diseño.** No modifiques el diseño (HTML, CSS, imágenes, animaciones) hasta que el responsable apruebe la propuesta por escrito. Corregir un error evidente que no cambia el aspecto, como un enlace roto o un error de consola, no necesita aprobación, pero se informa.
3. **Animaciones y microinteracciones con Emil Design Engineering.** Usa `emil-design-eng`, y según el caso `animate`, `review-animations`, `choreograph` o `animation-performance`. Respeta siempre `prefers-reduced-motion`.
4. **Auditar con Impeccable.** Usa la skill `impeccable` para auditar y eliminar patrones de diseño genéricos de IA. El detector se ejecuta así: `.claude/skills/impeccable/scripts/impeccable detect <archivo.html>`.
5. **Conservar lo que existe.** Mantén las funcionalidades y la arquitectura actuales: páginas, rutas relativas, carga de datos desde `data/*.json`, menú y pie generados en `assets/js/seget.js`, filtros y fichas de detalle. No reconstruyas desde cero ni elimines funciones sin aprobación expresa.
6. **Prioridades:** calidad visual, accesibilidad (contraste WCAG AA, foco visible, textos alternativos, navegación con teclado) y diseño adaptable (responsive).
7. **Trabajo en ramas y Pull Requests.** Nunca se hace push a `main`. Cada cambio va en su rama con una PR, y se fusiona solo cuando el responsable lo pide.
8. **Sin secretos.** No subas tokens, contraseñas ni credenciales al repositorio.
9. **Idioma:** la web, los mensajes de commit y los informes van en español.

## Flujo de trabajo para un cambio de diseño

1. Revisar el estado actual con las pruebas de navegador (abajo) y con `impeccable detect`.
2. Proponer la dirección o el cambio usando Taste, con capturas, y **esperar la aprobación**.
3. Implementar en una rama. Animaciones con las skills de Emil.
4. Volver a pasar las pruebas de navegador y la auditoría de Impeccable. Corregir y repetir hasta que no queden problemas.
5. Abrir la PR con capturas de escritorio y móvil del antes y el después.

## Pruebas en navegador real

En la nube de Claude Code, Playwright y Chromium ya vienen instalados, así que no hace falta instalar nada.

```
node pruebas/navegador.mjs                    # todas las páginas y secciones del menú
node pruebas/navegador.mjs index.html         # solo algunas páginas
```

El script sirve el sitio en local y recorre todas las páginas y secciones del menú en **escritorio (1440 × 900)** y **móvil (390 × 844)**. En cada una baja hasta el final para activar animaciones y carga diferida, y luego:

- guarda una captura de la primera pantalla (`*-pantalla.png`) y otra de la página completa en `pruebas/resultados/`, carpeta que no se sube a git;
- informa de errores de consola, excepciones de JavaScript, archivos que no cargan, imágenes rotas y desbordamiento horizontal;
- termina con código 1 si hay problemas. El detalle queda en `pruebas/resultados/informe.json`.

Para mirar una captura, ábrela con la herramienta de lectura de imágenes. Instagram, YouTube y Google Maps suelen estar bloqueados por la red de la nube. El script los anota como aviso, no como fallo.

También está registrado **Playwright MCP** en `.mcp.json`, para navegar de forma interactiva (clics, formularios, menús). Usa el Chromium de la nube (`/opt/pw-browsers/chromium`). Para usarlo, sirve el sitio con `python3 -m http.server 8000` y abre `http://localhost:8000`.

## Skills instaladas

Están en `.claude/skills/`. El origen, la versión y la licencia de cada una están en `.claude/skills/FUENTES.md`.

- `design-taste-frontend` (Taste): dirección de arte y criterio visual.
- `emil-design-eng` y las demás skills de Emil Kowalski: animación, microinteracciones y pulido.
- `impeccable`: auditoría, crítica y pulido de diseño, con sus subagentes en `.claude/agents/`. La telemetría anónima de Impeccable está desactivada en `.claude/settings.json`.
