# Tasks

## 1. Regla operativa en config

- [x] 1.1 En `openspec/config.yaml`, añadir bajo `operations.archive.guidance` la regla de que tras archivar se PREGUNTE (una sola confirmación) si ejecutar commit, push y zip. Verificar: el YAML parsea y contiene la entrada.
- [x] 1.2 Añadir la guía de ejecución al confirmar (commit → push → zip con build previo) y el manejo de "declinar" y de fallo de una acción. Verificar: las entradas están presentes en `operations.archive.guidance`.

## 2. Verificación

- [ ] 2.1 Confirmar que el skill de `/opsx:archive` lee `operationGuidance` y que, en el próximo archivado, aparece la pregunta antes de ejecutar cualquier acción. Verificar: al archivar un cambio se muestra la pregunta y nada se ejecuta sin confirmar.
