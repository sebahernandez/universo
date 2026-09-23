# Tasks

## 1. Añadir el ícono a la caja de contacto

- [x] 1.1 En `src/pages/preguntas-frecuentes.astro`, convertir el `<div>` de la caja "¿No resolvimos tu duda?" (línea ~60) en un contenedor con posicionamiento relativo para poder anclar el ícono. Verificar: el layout de la caja se mantiene igual visualmente salvo por el ícono.
- [x] 1.2 Insertar un `<img>` con `src="https://res.cloudinary.com/v5ovpy2d/image/upload/v1790198860/interrogacion-icon.webp"`, `alt=""`, `aria-hidden="true"`, `loading="lazy"`, y posicionado en la esquina superior derecha de la caja (por ejemplo `absolute top-4 right-4` con un ancho fijo). Verificar: al abrir `/preguntas-frecuentes` el ícono aparece en la esquina superior derecha.
- [x] 1.3 Ajustar el espaciado del contenido para que el ícono no se superponga al título ni a los botones, incluida la vista en pantallas angostas. Verificar: en anchos de móvil y escritorio el texto y botones permanecen legibles y sin solaparse con el ícono.

## 2. Verificación

- [x] 2.1 Ejecutar el build del sitio (`npm run build`) y confirmar que compila sin errores. Verificar: build exitoso.
- [x] 2.2 Confirmar con un lector de pantalla o inspección del DOM que el ícono no se anuncia como contenido (alt vacío / aria-hidden). Verificar: el ícono queda excluido del árbol de accesibilidad.
