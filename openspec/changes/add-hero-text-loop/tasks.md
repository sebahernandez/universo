# Tasks

## 1. Referencia visual y dependencia

- [x] 1.1 Capturar la unión actual de Inicio y Quiénes somos y la composición de la imagen a 320, 375, 768, 1024 y 1440 px, antes de editar el hero. Verificar: guardar las capturas con sus dimensiones como referencia de comparación.
- [x] 1.2 Instalar GSAP como dependencia directa, actualizando `package.json` y `package-lock.json`. Verificar: `npm ls gsap` resuelve una única versión compatible sin dependencias ausentes.

## 2. Componente Text Loop

- [x] 2.1 Crear `src/components/reactbits/TextLoop.tsx` y `TextLoop.css` a partir de la variante oficial TypeScript + CSS, con onda, repetición continua y mediciones tras cargar fuentes. Documentar origen, licencia y adaptaciones junto al componente. Verificar: los archivos contienen la referencia y los avisos correspondientes; los accesos a SVG, fuentes y navegador solo ocurren en cliente.
- [x] 2.2 Adaptar el viewport, la trayectoria y los tamaños con observación del contenedor para reservar una banda contenida sin deformación. Verificar: la geometría mantiene margen para texto y trazo, el tamaño visible previsto es de al menos 16 px a 320 px y la configuración usa la sans y los colores del diseño.
- [x] 2.3 Añadir fallback visible desde servidor, cambio al SVG únicamente tras medición válida y mensaje accesible único. Verificar: el render inicial contiene la frase completa, conserva el espacio reservado y mantiene el fallback ante medición fallida; las copias SVG no se anuncian y no existe una región de anuncios continuos.
- [x] 2.4 Implementar pausa temporal con puntero, cambios de movimiento reducido y pausa por visibilidad, manteniendo sus estados independientes y limpiando recursos, sin botón de pausa. Verificar: revisar transiciones de cada estado y cleanup de tween, observadores y listeners; la reanudación conserva el desplazamiento y no anula la preferencia del sistema.

## 3. Integración en Inicio y conservación del fundido

- [x] 3.1 Separar en `Hero.astro` la región principal de contenido e imagen mediante un wrapper relativo de ancho completo; mantener la imagen de escritorio centrada respecto de esa región y el flujo móvil. Verificar: comparar con las capturas de referencia, conservando fuente, carga prioritaria, ancla, parallax y alineación derecha de la imagen.
- [x] 3.2 Insertar una única isla Text Loop con `client:load` después de la región principal y dentro de Inicio, con «Papelería creativa ✦ Hecha para recordar». Usar wrapper transparente, trazo pastel y espacio de fondo visible alrededor y debajo. Verificar: inspeccionar el fundido rosa → celeste y el límite celeste → celeste; no añadir sección de fondo plano ni alterar `.section-blend`, el orden de secciones o el degradado de los títulos.
- [ ] 3.3 Ajustar espacio y geometría a 320, 375, 768, 1024 y 1440 px. Verificar: texto visible de al menos 16 px, contraste de 4.5:1, tildes completas, ausencia de scroll horizontal y de superposiciones con imagen, botones o Quiénes somos; guardar capturas comparables a las referencias.
- [x] 3.4 Recorrer la cinta con puntero y emulación táctil; activar movimiento reducido antes de cargar y durante la visita; revisar el árbol accesible y recargar con JavaScript deshabilitado. Verificar: ausencia del botón y de su espacio reservado, pausa temporal sin saltos, preferencia respetada, mensaje anunciado una sola vez y fallback legible con enlaces y fundido conservados.

## 4. Verificación integral

- [x] 4.1 Ejecutar `npm run build` y revisar la home mediante `npm run preview`. Verificar: build sin errores, texto fallback completo en `dist/index.html` y ausencia de errores de hidratación o SVG en la consola del navegador.
- [ ] 4.2 Comparar la unión de Inicio y Quiénes somos en carga inicial, animación, pausa y movimiento reducido; comprobar enlaces, títulos y galería existentes. Verificar: todas las condiciones de `specs/hero-text-loop/spec.md` se cumplen, el fondo no muestra costuras ni bloques rectangulares nuevos y quedan documentados los resultados con capturas y cualquier ajuste de los valores iniciales del diseño.
