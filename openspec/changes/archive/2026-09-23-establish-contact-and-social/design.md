# Design

## Context

Ver `proposal.md` — Why. Estado actual observado:

- `src/data/site.ts` centraliza `email`, `whatsapp`/`whatsappDisplay`, `instagram`/`instagramHandle`, `facebook`/`facebookHandle`, `web3formsKey` y un objeto `address` (calle en Talagante). Exporta `whatsappLink` (deep link `wa.me` con mensaje pre-cargado).
- `Contacto.astro`: tarjetas IG/FB/WhatsApp + formulario Web3Forms (`action=api.web3forms.com`, `redirect` a `/gracias`, honeypot `botcheck`, marca `sessionStorage['uc:form-enviado']` en submit).
- `Footer.astro`: bloque "Síguenos" (IG/FB vía `SocialIcon`), email `mailto` y `<address>` que dice "Santiago, Región Metropolitana. Tienda online. Universo Crafter SpA."
- `WhatsAppWidget.astro`: FAB flotante + panel con CTA a `whatsappLink`, cierra con Escape/clic-fuera, `aria-expanded`.
- `Layout.astro`: JSON-LD `@type: Store` con `telephone: +<whatsapp>`, `email`, `sameAs: [instagram, facebook]` y `address` (PostalAddress con la calle de Talagante).

**Inconsistencia central:** footer = tienda online (sin calle); `site.address` + JSON-LD = dirección física en Talagante.

## Goals / Non-Goals

**Goals:**
- Documentar el comportamiento de contacto/redes como spec de referencia.
- Alinear la ubicación al modelo **tienda online** en datos y schema, dejando footer ↔ schema consistentes.

**Non-Goals:**
- Rediseñar la UI del contacto, el formulario o el widget.
- Cambiar de proveedor de formularios ni agregar nuevas redes (salvo que se pida aparte).

## Decisions

- **Fuente de verdad en `site.ts`.** Se mantiene y se ajusta `address` para el modelo online: conservar `locality: 'Santiago'` / `region: 'Región Metropolitana'` y **quitar `street`** (o dejarlo vacío), reemplazando `display` por "Santiago, Región Metropolitana · Tienda online".
  - *Alternativa descartada:* mantener la calle de Talagante y cambiar el footer para mostrarla — el usuario definió que el negocio es tienda online sin dirección pública.
- **JSON-LD de tienda online.** En `Layout.astro`, construir la `address` como `PostalAddress` **sin `streetAddress`** (solo `addressLocality: 'Santiago'`, `addressRegion`, `addressCountry`), manteniendo `email`, `telephone` (WhatsApp) y `sameAs`. Evaluar `@type` (`Store` vs `Organization`/`OnlineStore`) para no sugerir un local físico; decisión concreta al implementar según impacto en Rich Results.
  - *Riesgo SEO:* quitar la calle reduce señales de SEO local, pero es coherente con un negocio sin local público y evita NAP contradictorio (peor para confianza/rich results).
- **Comportamiento observable ya correcto** (enlaces externos con `target="_blank" rel="noopener"`, honeypot, redirect a `/gracias`, guard por `sessionStorage`) se **codifica** en la spec sin cambiar código.
- **Valores sociales confirmados por el usuario:**
  - Facebook: `https://www.facebook.com/universocrafterpenaflor/` (corrige el actual `universocrafter`).
  - Instagram: `https://www.instagram.com/universocrafter/` (sin cambios; el enlace `share.google/...` que compartió el usuario redirige a este mismo perfil).
  - Revisar si el `facebookHandle` debe cambiar; "Universo Crafter" como texto visible sigue siendo válido.

## Risks / Trade-offs

- [Quitar `streetAddress` del schema baja señales de SEO local] → Aceptado: el negocio es tienda online; un NAP inconsistente es peor. Se conserva `areaServed: Chile` y ubicación regional.
- [Otros consumidores de `site.address.street`] → Verificar en el apply que ningún componente dependa de `street` antes de vaciarlo (búsqueda `grep address.street`).

## Open Questions

- `@type` final del JSON-LD (mantener `Store` sin calle vs `OnlineStore`/`Organization`). No cambia la spec ni el desglose de tareas; se decide al implementar validando con Rich Results Test.
