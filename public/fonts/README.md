# Fuentes locales

Estado actual y nombres que el sitio referencia (ver `src/styles/global.css` y
el `preload` en `src/layouts/Layout.astro`):

| Archivo                  | Uso                                          | Estado       |
| ------------------------ | -------------------------------------------- | ------------ |
| `lemonilla.woff2`        | Display: título manuscrito del Hero (peso 400)| ✅ instalada |
| `fredoka-var.woff2`      | Títulos de sección (variable 300–700, latin) | ✅ instalada |
| `nunito-sans-var.woff2`  | Cuerpo/subtítulos/tarjetas (variable 400–700)| ✅ instalada |

- **Display = Lemonilla** (entregada por el cliente, un solo peso).
- **Títulos de sección = Fredoka** (variable, self-hosted, licencia OFL): redondeada y
  legible, contrasta con la manuscrita del Hero y combina con Nunito Sans.
- **Cuerpo = Nunito Sans** (variable, self-hosted desde Google Fonts, licencia OFL).
  Se eligió por parecido al diseño: sans humanista, 'a' de doble piso, 'g' de un
  solo piso y terminaciones rectas. Si consigues la sans original del diseño,
  reemplaza `nunito-sans-var.woff2` y ajusta el `@font-face` en `src/styles/global.css`.

## Convertir .otf/.ttf a .woff2

```bash
# con fonttools (pip install fonttools brotli)
fonttools ttLib.woff2 compress -o crafter-display.woff2 Display.otf
```

Si cambian los nombres reales, actualiza las rutas en `global.css` y el `preload`.
Mientras no existan, el sitio usa las fuentes de respaldo definidas en el tema.
