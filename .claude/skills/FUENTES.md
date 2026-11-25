# Origen de las skills de diseño

Copiadas tal cual de sus repositorios oficiales (2026-11-25) para que las sesiones de Claude Code en la nube puedan usarlas. No forman parte de la web publicada.

| Carpeta | Repositorio | Commit | Licencia |
|---|---|---|---|
| `emil-design-eng`, `animate`, `review-animations` y el resto de skills de Emil | https://github.com/emilkowalski/skills | 64eb3de | MIT |
| `impeccable` (+ `.claude/agents/impeccable-*`) | https://github.com/pbakaus/impeccable | 9e460a8 | Apache-2.0 |
| `design-taste-frontend` | https://github.com/Leonxlnx/taste-skill | d1a2bb4 | MIT |

Notas:
- Impeccable trae hooks que ejecutan su motor tras cada edición. **No se han añadido**: el motor es un binario que se descarga de GitHub Releases (verificado con `engine-checksums.txt`) y solo se ejecuta cuando se invoca la skill o `impeccable detect`.
- La telemetría anónima de Impeccable está desactivada con `IMPECCABLE_NO_TELEMETRY=1` en `.claude/settings.json`.
- Para actualizar, vuelve a copiar la carpeta desde el repositorio original.
