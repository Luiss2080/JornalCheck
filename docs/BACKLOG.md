# Backlog de issues — JornalCheck

> Lista lista para pasar a GitHub Issues, con milestones, etiquetas, estimaciones y trazabilidad a las historias. Se puede crear todo de una vez con [crear-issues.sh](crear-issues.sh).

## 1. Milestones

| Milestone | Fase | Días | Tareas | Horas est. |
|---|---|---|---|---|
| Fase 1 — Estructura base y navegación | 1 | 2 | 6 | 12 |
| Fase 2 — Obras y trabajadores | 2 | 3 | 8 | 20 |
| Fase 3 — Asistencia diaria | 3 | 4 | 8 | 24 |
| Fase 4 — Adelantos y planilla semanal | 4 | 4 | 8 | 24 |
| Fase 5 — PDF y exportación CSV | 5 | 3 | 7 | 17.5 |

Total: **37 tareas**, ~98 horas (16 días a 6 horas efectivas).

## 2. Etiquetas

| Etiqueta | Uso |
|---|---|
| ui | Pantallas y componentes |
| datos | Tablas, consultas y migraciones |
| lógica | Reglas de negocio y cálculos |
| pruebas | Pruebas automáticas y manuales |
| integración | Cámara, notificaciones, PDF, compartir |
| tarea | Otras tareas |
| bug | Errores |
| mejora | Ideas para v1.1+ |

## 3. Issues del MVP

### Fase 1 — Estructura base y navegación

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F1-T1` | Instalar dependencias y abrir la app en Expo Go | — | tarea | Alta | 2 |
| `F1-T2` | Verificar creación y migración de la base | — | datos | Alta | 2 |
| `F1-T3` | Definir la navegación principal | — | ui | Alta | 2 |
| `F1-T4` | Aplicar tema y componente Pantalla | — | ui | Alta | 2 |
| `F1-T5` | Pantalla de inicio con accesos | — | ui | Alta | 2 |
| `F1-T6` | Confirmar CI en verde | — | tarea | Alta | 2 |

### Fase 2 — Obras y trabajadores

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F2-T1` | Consultas de obras y trabajadores con tipos. | HU-01 | datos | Alta | 2.5 |
| `F2-T2` | Pantallas Obras y Trabajadores con estado vacío. | HU-01 | ui | Alta | 2.5 |
| `F2-T3` | Formularios con validación de jornal y nombre. | HU-01 | ui, lógica | Alta | 2.5 |
| `F2-T4` | Baja lógica de trabajadores para no perder el historial. | HU-01 | lógica | Alta | 2.5 |
| `F2-T5` | Pruebas de validación. | HU-01 | lógica, pruebas | Alta | 2.5 |
| `F2-T6` | Validaciones, estados vacíos y mensajes en español | HU-01 | lógica | Alta | 2.5 |
| `F2-T7` | Pruebas automáticas y verificación manual de criterios | HU-01 | pruebas | Alta | 2.5 |
| `F2-T8` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-01 | pruebas | Alta | 2.5 |

### Fase 3 — Asistencia diaria

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F3-T1` | Tabla asistencias con clave única (trabajador, fecha) y reemplazo al volver a marcar. | HU-02 | datos | Alta | 3 |
| `F3-T2` | Pantalla de asistencia con «marcar todos presentes» y cambio por toque. | HU-02 | ui | Alta | 3 |
| `F3-T3` | Selector de fecha con acceso rápido a ayer y hoy. | HU-02 | tarea | Alta | 3 |
| `F3-T4` | Campo de horas extra por persona. | HU-02 | tarea | Alta | 3 |
| `F3-T5` | Función pura que convierte estado + horas en días pagados, con pruebas. | HU-02 | lógica, pruebas | Alta | 3 |
| `F3-T6` | Validaciones, estados vacíos y mensajes en español | HU-02 | lógica | Alta | 3 |
| `F3-T7` | Pruebas automáticas y verificación manual de criterios | HU-02 | pruebas | Alta | 3 |
| `F3-T8` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-02 | pruebas | Alta | 3 |

### Fase 4 — Adelantos y planilla semanal

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F4-T1` | Pantalla Adelantos con alta de adelanto o descuento y nota. | HU-03, HU-04 | ui | Media | 3 |
| `F4-T2` | Función pura de planilla: días, extras, adelantos, neto y arrastre de saldo, con pruebas. | HU-03, HU-04 | lógica, pruebas | Media | 3 |
| `F4-T3` | Pantalla Planilla semanal con selector de semana (lunes a domingo). | HU-03, HU-04 | ui | Media | 3 |
| `F4-T4` | Cierre de planilla que la vuelve de solo lectura. | HU-03, HU-04 | tarea | Media | 3 |
| `F4-T5` | Ajustes: factor de horas extra y día de inicio de semana. | HU-03, HU-04 | tarea | Media | 3 |
| `F4-T6` | Validaciones, estados vacíos y mensajes en español | HU-03, HU-04 | lógica | Media | 3 |
| `F4-T7` | Pruebas automáticas y verificación manual de criterios | HU-03, HU-04 | pruebas | Media | 3 |
| `F4-T8` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-03, HU-04 | pruebas | Media | 3 |

### Fase 5 — PDF y exportación CSV

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F5-T1` | Plantilla HTML de la planilla para expo-print. | HU-05 | tarea | Media | 2.5 |
| `F5-T2` | Compartir con expo-sharing. | HU-05 | integración | Media | 2.5 |
| `F5-T3` | Exportación CSV con separador compatible con Excel en español (;) y BOM UTF-8. | HU-05 | integración | Media | 2.5 |
| `F5-T4` | Pruebas del generador CSV (comillas, comas, acentos). | HU-05 | pruebas, integración | Media | 2.5 |
| `F5-T5` | Validaciones, estados vacíos y mensajes en español | HU-05 | lógica | Media | 2.5 |
| `F5-T6` | Pruebas automáticas y verificación manual de criterios | HU-05 | pruebas | Media | 2.5 |
| `F5-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-05 | pruebas | Media | 2.5 |

## 4. Orden recomendado de ataque

1. Terminá cada fase completa antes de abrir la siguiente; dentro de la fase, de arriba hacia abajo.
2. Las tareas `lógica` y `datos` van antes que las `ui` que las usan.
3. Cada issue se cierra con un commit o PR que lo mencione (`Cierra #N`).
4. Nada de abrir issues de v1.1 hasta tener el APK de la v1.0.0.

## 5. Ideas para después del MVP

| Idea | Esfuerzo | Valor |
|---|---|---|
| Modo oscuro | Bajo | Medio |
| Búsqueda y filtros avanzados | Medio | Alto |
| Estadísticas y gráficos simples en inicio | Medio | Medio |
| Respaldo y restauración de la base | Medio | Alto |
| Publicación en Google Play | Bajo | Alto |
| Sincronización opcional entre dispositivos | Alto | Depende de demanda |
