# Spec Delta

## Purpose

Define cómo se comporta el flujo de archivado de OpenSpec en este proyecto respecto a la publicación (commit, push y zip) inmediatamente después de archivar un cambio.

## ADDED Requirements

### Requirement: Preguntar por la publicación tras archivar

Después de que `/opsx:archive` archive un cambio con éxito (incluida la sincronización de specs cuando aplique), el flujo SHALL preguntar al usuario, en una sola confirmación, si desea ejecutar las tres acciones de publicación: commit, push y zip. El flujo NO SHALL ejecutar ninguna de esas acciones sin confirmación explícita del usuario.

#### Scenario: Se pregunta al terminar el archivado

- **WHEN** un cambio se archiva correctamente mediante `/opsx:archive`
- **THEN** se muestra al usuario una única pregunta ofreciendo ejecutar commit, push y zip

#### Scenario: El usuario declina

- **WHEN** el usuario responde que no a esa pregunta
- **THEN** el flujo termina sin ejecutar commit, push ni zip

### Requirement: Ejecutar las acciones al confirmar

Si el usuario confirma, el flujo SHALL ejecutar las acciones en este orden: (1) commit de los cambios con un mensaje que describa el cambio archivado; (2) push a la rama principal; (3) generación del zip desplegable del sitio, construyendo antes el sitio para partir de una salida fresca. Si alguna acción falla, el flujo SHALL detenerse y reportar el error sin continuar con las siguientes, dejando constancia de que el archivado ya se completó.

#### Scenario: El usuario confirma y todo procede

- **WHEN** el usuario confirma la publicación
- **THEN** se ejecutan, en orden, el commit, el push y la generación del zip (con build previo)

#### Scenario: Una acción falla

- **WHEN** el usuario confirma la publicación y una de las acciones (commit, push o zip) falla
- **THEN** el flujo se detiene, reporta el error y no ejecuta las acciones posteriores, indicando que el archivado ya quedó hecho
