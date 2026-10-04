# Verificación de Text Loop

La cinta está implementada en el cierre de Inicio con «Papelería creativa ✦ Hecha para recordar». Su contenedor es transparente y mantiene la unión rosa → celeste → celeste con Quiénes somos. El título y la imagen conservan las mismas dimensiones y posiciones de la referencia en los cinco anchos.

## Comprobaciones ejecutadas

- `npm run build`: aprobado; cinco páginas estáticas generadas.
- `npm ls gsap`: GSAP 3.15.0, sin dependencias ausentes.
- Comprobación aislada de `TextLoop.tsx` con TypeScript, `--noEmit --strict --jsx react-jsx --moduleResolution bundler`: aprobada, sin diagnósticos.
- `node /private/tmp/universo-text-loop-extra.mjs no-button`: aprobado sobre el build servido por `npm run preview`; ausencia del botón y de su espacio reservado, consola sin errores.
- `node /private/tmp/universo-text-loop-extra.mjs`: aprobado; glifos dentro del viewport SVG, enlace del ciclo y fallback ante medición fallida.
- `openspec validate add-hero-text-loop --type change --strict --json --no-interactive`: aprobado, sin observaciones.

| Ancho | Alto de la cinta | Texto visible | Desborde de la cinta | Imagen respecto de referencia |
| --- | --- | --- | --- | --- |
| 320 px | 160 px | 24 px | Ninguno | Idéntica |
| 375 px | 160 px | 24 px | Ninguno | Idéntica |
| 768 px | 200 px | 24 px | Ninguno | Idéntica |
| 1024 px | 200 px | 24,576 px | Ninguno | Idéntica |
| 1440 px | 200 px | 34 px | Ninguno | Idéntica |

El texto tinta sobre la cinta lila tiene contraste 6,99:1. Se conserva espacio de fondo visible alrededor de la onda y 32 px debajo del componente. El viewport de la onda ocupa toda la banda: 160 px en móvil y 200 px desde 768 px. No hay botón de pausa ni espacio reservado para ese control. El margen superior es 24 px. Estos valores mantienen las alturas iniciales del diseño sin escalar los glifos con el SVG.

Se comprobaron ausencia del botón, avance real, pausa temporal con puntero, interacción táctil sin hover persistente, movimiento reducido al cargar y durante la visita y pausa fuera de pantalla. El árbol accesible anuncia el mensaje una sola vez y no contiene controles. Sin JavaScript o con la medición SVG fallida, el mensaje completo permanece visible.

Un ciclo completo de móvil se observó sin saltos: al reiniciar, el avance entre frames fue 1,02 unidades en 16,6 ms, consistente con 60 unidades por segundo. Los glifos visibles mantienen margen vertical en los cinco anchos. Los enlaces de proyectos y WhatsApp y la instancia existente de Infinite Spiral permanecen presentes.

## Evidencia visual

Las capturas y los datos de medición están en `/private/tmp/universo-text-loop-qa/`:

- `before-320.png`, `before-375.png`, `before-768.png`, `before-1024.png`, `before-1440.png`: referencia previa a editar el hero.
- `after-320.png`, `after-375.png`, `after-768.png`, `after-1024.png`, `after-1440.png`: build integrado con movimiento reducido.
- `without-control-320.png`, `without-control-375.png`, `without-control-768.png`, `without-control-1024.png`, `without-control-1440.png`: versión actual sin botón.
- `paused-1440.png`, `touch-375.png`, `no-javascript-375.png`: referencias de estados antes de retirar el botón.
- `before.json`, `after.json`, `extra.json`, `accessibility.txt`: mediciones y resultados de las comprobaciones.
- `without-control.json`: mediciones, árbol accesible y comprobaciones de la versión actual sin botón.

## Hallazgo previo pendiente de decisión

La página ya presentaba scroll horizontal a 1024 px antes de este cambio. La inspección identifica el texto «Santiago, Región Metropolitana.» de `Footer.astro`, marcado con `whitespace-nowrap`; alcanza aproximadamente 1066 px. La cinta no introduce desborde y todos los demás anchos comprobados permanecen dentro de su viewport.

Se solicitó elegir entre permitir que esa línea del footer envuelva o conservar el comportamiento anterior y registrar la limitación. No se ha modificado el footer. Las tareas 3.3 y 4.2 permanecen pendientes de esa decisión para no declarar completa una comprobación de ausencia de scroll global.

## Unidad de trabajo y reversión

La unidad entregable incluye `Hero.astro`, `TextLoop.tsx`, `TextLoop.css`, `TextLoop.LICENSE.md`, la dependencia GSAP y esta evidencia. Para revertir, retirar la isla Text Loop, recuperar el wrapper y la referencia de parallax anteriores del hero y eliminar los tres archivos del componente; retirar GSAP de los manifiestos si ningún otro módulo lo utiliza. El resto de las secciones, las specs principales y los archivos anteriores de OpenSpec no se modificaron.
