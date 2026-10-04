# Tasks

## 1. Breakpoint personalizado `3xl`

- [x] 1.1 Agregar `--breakpoint-3xl: 90rem;` al bloque `@theme` de `src/styles/global.css` (junto a los demás tokens custom del proyecto) y verificar con `npm run build` que compila sin errores
- [x] 1.2 Reemplazar `min-[1440px]:text-[6.5rem]` por `3xl:text-[6.5rem]` en `src/components/Hero.astro:18`, `src/components/Contacto.astro:22`, `src/components/Proyectos.astro:22` y `src/components/DisplayTitle.astro:18`, y verificar en el navegador (ventana ≥1440px) que el tamaño de texto grande se sigue activando igual que antes (confirmado con Playwright a 1440px y 1920px: `fontSize:104px` en ambos, antes y después idéntico)

## 2. Conversión de utilidades de espaciado/tamaño (Hero.astro)

- [x] 2.1 En `src/components/Hero.astro:14`, reemplazar `md:min-h-[560px]` por `md:min-h-140` (560÷4=140) y `lg:min-h-[680px]` por `lg:min-h-170` (680÷4=170)
- [x] 2.2 En `src/components/Hero.astro:15`, reemplazar `md:max-w-[50%]` por `md:max-w-1/2` (fracción limpia); dejar `lg:max-w-[54%]` sin tocar (no es una fracción limpia)
- [x] 2.3 En `src/components/Hero.astro:63`, reemplazar `md:max-w-[440px]` por `md:max-w-110` (440÷4=110) y `lg:max-w-[640px]` por `lg:max-w-160` (640÷4=160); dejar `md:w-[46vw]` y `lg:w-[42vw]` sin tocar (unidades `vw`, sin equivalente)
- [x] 2.4 Verificar con `npm run build` y en el navegador que el hero se ve pixel-idéntico antes/después en mobile, tablet y desktop (verificado: CSS generado `calc(var(--spacing) * N)` computa exactamente los mismos px; Playwright confirmó `minHeight`/`maxWidth` idénticos en 390/900/1440/1920px)

## 3. Conversión de utilidades de espaciado/tamaño (resto de componentes)

- [x] 3.1 En `src/components/Proyectos.astro:42`, reemplazar `h-[360px]` por `h-90` (360÷4=90), `sm:h-[460px]` por `sm:h-115` (460÷4=115) y `lg:h-[560px]` por `lg:h-140` (560÷4=140). También se corrigió `min-[1440px]:text-[6.5rem]` → `3xl:text-[6.5rem]` en `Proyectos.astro:22` (faltaba en el plan original de la tarea 1.2, detectado y corregido durante la verificación)
- [x] 3.2 En `src/components/WhatsAppWidget.astro:16`, reemplazar `w-[19rem]` por `w-76` (19÷0.25=76) y `sm:w-[21rem]` por `sm:w-84` (21÷0.25=84)
- [x] 3.3 En `src/components/Header.astro:124` y `:161`, reemplazar `min-h-[52px]` por `min-h-13` (52÷4=13) en ambas apariciones; en `:171`, reemplazar `h-[52px]` por `h-13` y `w-[52px]` por `w-13`
- [x] 3.4 En `src/pages/politica-cookies.astro:44`, reemplazar `min-w-[32rem]` por `min-w-128` (32÷0.25=128)
- [x] 3.5 Verificar con `npm run build` y en el navegador (Proyectos, widget de WhatsApp, header, página de política de cookies) que no hay ningún cambio visual (confirmado: `spiral height:560px`, `waPanel width:336px` en desktop, valores idénticos a los originales)

## 4. Swap a token existente

- [x] 4.1 En `src/components/Contacto.astro:88`, reemplazar `rounded-[2rem]` por `rounded-panel` y verificar visualmente que la tarjeta del formulario de contacto mantiene el mismo radio de esquina (confirmado: `borderRadius:32px` = `--radius-panel:2rem`, idéntico)

## 5. Verificación final

- [x] 5.1 Correr `npm run build` completo y confirmar que termina sin errores ni warnings nuevos (build limpio, sin cachés, 5 páginas generadas sin errores)
- [x] 5.2 Revisar en `npm run dev` las 7 páginas/secciones tocadas (home: hero, proyectos, header, contacto; política de cookies) en mobile y desktop, confirmando que ningún elemento cambió de tamaño, posición o radio respecto a como estaba antes del cambio (verificado con Playwright headless en 4 viewports: 390px, 900px, 1440px, 1920px — todos los valores computados coinciden exactamente con los esperados)
- [x] 5.3 Confirmar que los 46 valores arbitrarios identificados como "no convertibles" en la auditoría siguen intactos (no se tocaron por error) (confirmado: `grep` cuenta exactamente 46 valores arbitrarios restantes en `src/`, igual al conteo de la auditoría)
