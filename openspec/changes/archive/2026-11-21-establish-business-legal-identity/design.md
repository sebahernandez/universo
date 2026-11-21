# Design

## Context

Ver `proposal.md` (Why) para la motivación. Estado observado en el código:

- `src/data/site.ts` es la fuente única de identidad y contacto (`name`, `email`, `address`, `whatsapp`, redes), pero no contiene razón social ni RUT.
- `src/components/Footer.astro` ya muestra "Universo Crafter SpA." y "RUT: 78.519.223-0", escritos como texto literal dentro del `<address>`.
- `src/pages/terminos-condiciones.astro` (sección "1. Quiénes somos") escribe "Universo Crafter SpA" como literal y muestra `RUT: [PLACEHOLDER: RUT de la empresa]`.
- `src/pages/politica-cookies.astro` no identifica a ninguna persona jurídica; solo menciona la marca "Universo Crafter".
- `src/layouts/Layout.astro` genera un JSON-LD `OnlineStore` con `name`, `address`, `sameAs`, etc., sin `legalName` ni `taxID`.
- El proyecto no tiene suite de tests; la verificación existente es `npm run build` más inspección del HTML generado en `dist/`.

## Goals / Non-Goals

**Goals:**

- Un único lugar donde vive el RUT y la razón social, consumido por footer, páginas legales y JSON-LD.
- Formato visible uniforme: `RUT: 78.519.223-0`.

**Non-Goals:**

- Resolver los demás marcadores `[PLACEHOLDER]` de los términos.
- Cambiar el diseño visual de las páginas legales o del footer.
- Validar o calcular el dígito verificador del RUT en código.

## Decisions

### 1. Bloque `legal` dentro de `site`

Agregar a `site` en `src/data/site.ts`:

```ts
legal: {
  razonSocial: 'Universo Crafter SpA',
  rut: '78.519.223-0',
},
```

El RUT se guarda ya formateado (con puntos y guion), que es como se muestra en todos los usos. La etiqueta "RUT:" la pone cada plantilla.

- Alternativa descartada: un módulo nuevo `src/data/legal.ts`. El spec `contact-and-social` ya establece `site.ts` como fuente única de identidad; dos campos no justifican otro archivo.
- Alternativa descartada: guardar el RUT sin formato y formatearlo con una función. No hay ningún uso que necesite el valor sin formato.

### 2. Términos y condiciones: reemplazo en la sección existente

En "1. Quiénes somos", sustituir el literal "Universo Crafter SpA" por `{site.legal.razonSocial}` y el marcador por `RUT: {site.legal.rut}`. No se agregan secciones nuevas. La meta `description` del `Layout` también menciona "Universo Crafter SpA" y pasa a interpolar `site.legal.razonSocial`.

### 3. Política de cookies: nueva sección "Responsable del sitio"

Agregar una sección al inicio del cuerpo (antes de "¿Qué son las cookies?"), con el mismo marcado y clases que las demás secciones, indicando razón social, RUT, ubicación (`site.address.locality`, `site.address.region`, Chile) y correo (`site.email`).

- Alternativa descartada: añadir los datos a la sección "Contacto" del final. Un documento legal identifica al responsable al comienzo, y es coherente con la sección 1 de los términos.

### 4. Footer: mismos datos, desde `site`

Sustituir los dos literales del `<address>` por `{site.legal.razonSocial}` y `RUT: {site.legal.rut}`, sin tocar el marcado ni las clases. El resultado visible no cambia.

### 5. JSON-LD: `legalName` y `taxID`

Agregar `legalName: site.legal.razonSocial` y `taxID: site.legal.rut` al objeto `jsonLd` de `Layout.astro`. Ambas son propiedades de `Organization` en schema.org, de la que hereda `OnlineStore`.

### 6. Fecha de "Última actualización"

Las dos páginas legales cambian de contenido, por lo que su constante `actualizado` pasa a `noviembre de 2026`.

## Risks / Trade-offs

- [El RUT queda como dato público también en el JSON-LD] → Ya es público en el footer de todas las páginas; el schema solo lo repite.
- [Quedan otros `[PLACEHOLDER]` visibles en los términos] → Fuera de alcance por falta de datos; se registra en la propuesta para un cambio posterior.
- [Sin tests automatizados, una regresión de texto podría pasar inadvertida] → Las tareas verifican con `rg` sobre `src/` y sobre el HTML generado en `dist/`.
