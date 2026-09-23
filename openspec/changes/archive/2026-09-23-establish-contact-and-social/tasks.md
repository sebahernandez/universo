# Tasks

## 1. Fuente de verdad (site.ts) al modelo tienda online

- [x] 1.1 En `src/data/site.ts`, ajustar `address` al modelo tienda online: quitar/vaciar `street`, mantener `locality: 'Santiago'` y `region: 'Región Metropolitana'`, y actualizar `display` a "Santiago, Región Metropolitana · Tienda online". Verificar que compila y que los tipos siguen válidos.
- [x] 1.2 Buscar consumidores de `site.address.street` (`grep -rn "address.street" src/`) y confirmar que ninguno rompe al vaciarlo; ajustar si hace falta.
- [x] 1.3 En `src/data/site.ts`, corregir `facebook` a `https://www.facebook.com/universocrafterpenaflor/`. Dejar `instagram` en `https://www.instagram.com/universocrafter` (ya correcto). Verificar que footer, tarjetas de contacto y `sameAs` del schema toman los valores actualizados.

## 2. Schema SEO sin dirección física contradictoria

- [x] 2.1 En `src/layouts/Layout.astro`, construir la `PostalAddress` del JSON-LD **sin `streetAddress`** (solo `addressLocality`, `addressRegion`, `addressCountry`), conservando `email`, `telephone` (WhatsApp), `sameAs` y `areaServed: Chile`. Decidir el `@type` (Store sin calle u OnlineStore) y validar con Rich Results Test.
- [x] 2.2 Verificar que la ubicación del footer (`Footer.astro`) y la del schema quedan consistentes (tienda online, Santiago/RM), sin contradicción de dirección.

## 3. Verificación del comportamiento de contacto/redes (documentado)

- [x] 3.1 Confirmar que los enlaces sociales (footer y tarjetas de contacto) y el WhatsApp abren en pestaña nueva con `rel="noopener"`, y que `whatsappLink` lleva el mensaje pre-cargado.
- [x] 3.2 Confirmar el flujo del formulario: campos requeridos (nombre, email, mensaje), honeypot presente, `redirect` a `/gracias` y marca de sesión (`uc:form-enviado`) que autoriza `/gracias`.
- [x] 3.3 Ejecutar `npm run build` y validar el JSON-LD resultante (por ejemplo pegando el `<script type="application/ld+json">` en el Rich Results Test) sin errores.
