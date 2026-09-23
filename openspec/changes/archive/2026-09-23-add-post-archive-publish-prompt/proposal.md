# Proposal

## Why

Tras archivar un cambio con `/opsx:archive`, casi siempre queremos publicarlo (commit, push y zip). Automatizarlo sin preguntar es arriesgado (podría subir cosas no deseadas). Queremos que, al terminar el archivado, el flujo pregunte una vez si se ejecutan esas acciones y solo las corra si el usuario confirma.

## What Changes

- Definir el comportamiento post-archivado: después de un `/opsx:archive` exitoso, preguntar al usuario (una sola confirmación) si desea ejecutar commit, push y zip.
- Si confirma: ejecutar en orden commit → push → zip (con `npm run build` previo para un `dist/` fresco).
- Si declina: terminar sin ejecutar nada.
- La regla operativa se implementa en `openspec/config.yaml` bajo `operations.archive.guidance`, que el skill de archive lee y aplica.

## Capabilities

### New Capabilities
- `archive-publish-workflow`: Comportamiento del flujo de archivado de OpenSpec en este proyecto respecto a la publicación (commit/push/zip) tras archivar un cambio.

### Modified Capabilities
<!-- Ninguna. -->

## Impact

- `openspec/config.yaml`: entrada `operations.archive.guidance` con la regla de preguntar-y-luego-ejecutar.
- Afecta al flujo del comando `/opsx:archive` (skill `openspec-archive-change`), que consume `operationGuidance`.
- Sin cambios en el código de la aplicación.
