# Especificación del MVP — JornalCheck

> Documento vivo. Si una decisión cambia, se actualiza acá primero y después en el código.

## 1. Resumen

**Propuesta de valor:** Que el maestro de obra cierre la planilla semanal sin cuaderno y sin discusiones sobre los días trabajados.

**Problema:** La asistencia, los adelantos y la planilla se llevan en un cuaderno; al final de la semana hay que sumar a mano y los errores terminan en reclamos de los trabajadores.

**Cómo se resuelve hoy:** Cuaderno de asistencia y calculadora.

**Usuario objetivo:** Maestro de obra, contratista o albañil con 3 a 25 trabajadores a jornal diario en una o varias obras, que paga cada semana.

**Métricas de éxito del MVP:**

- Marcar la asistencia de toda la cuadrilla del día en menos de 30 segundos.
- Generar la planilla semanal con total a pagar por persona en un toque.
- Compartir la planilla en PDF antes de pagar.

## 2. Alcance del MVP

### Incluido

- Obras y trabajadores con jornal diario.
- Asistencia diaria por obra (presente, falta, medio día, horas extra).
- Adelantos y descuentos por trabajador.
- Planilla semanal con total a pagar por persona.
- Exportación de la planilla en PDF y CSV.

### Fuera del MVP

- Cuentas de usuario, inicio de sesión y multiusuario.
- Servidor propio, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago o con costo recurrente.

## 3. Reglas de negocio

Reglas que el código **debe** cumplir. Cada una se cubre con pruebas automáticas cuando es lógica pura.

- **RN-01** El jornal diario es un monto por trabajador y se paga completo por día «presente».
- **RN-02** Medio día paga el 50% del jornal; falta paga 0.
- **RN-03** Las horas extra se pagan como (jornal ÷ 8) × 1,5 por hora, salvo que el usuario configure otro factor en Ajustes.
- **RN-04** Solo puede haber una asistencia por trabajador por día; volver a marcar la reemplaza.
- **RN-05** Pago neto semanal = suma de días pagados + horas extra − adelantos y descuentos de la semana.
- **RN-06** Si el neto es negativo, queda un saldo a favor de la obra que se arrastra a la semana siguiente.
- **RN-07** Una planilla cerrada no se edita; si hay un error se registra un ajuste en la semana siguiente.
- **RN-08** Los descuentos se registran en la misma tabla adelantos, con la nota «descuento»; ambos restan del pago semanal.

## 4. Historias de usuario y criterios de aceptación

Formato: **Dado** un contexto, **Cuando** el usuario hace algo, **Entonces** pasa algo verificable.

### HU-01 — Registrar obras y trabajadores

**Como** maestro de obra **quiero** cargar mis obras y mi personal con su jornal **para** tener la cuadrilla lista para marcar asistencia.

**Fase:** 2 — Obras y trabajadores

**Criterios de aceptación:**

1. **Dado:** no hay trabajadores. **Cuando:** abro la sección Trabajadores. **Entonces:** veo un estado vacío con «Agregar trabajador».
2. **Dado:** el formulario de trabajador. **Cuando:** dejo el jornal vacío. **Entonces:** no guarda y pide un jornal mayor a 0.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-02 — Marcar asistencia diaria

**Como** maestro de obra **quiero** marcar presente, falta, medio día u horas extra de todos **para** no olvidar a nadie al pagar.

**Fase:** 3 — Asistencia diaria

**Criterios de aceptación:**

1. **Dado:** una obra con 10 trabajadores. **Cuando:** abro la asistencia de hoy. **Entonces:** veo a los 10 con «presente» sugerido que puedo cambiar con un toque.
2. **Dado:** ya marqué a Juan hoy. **Cuando:** lo vuelvo a marcar. **Entonces:** se reemplaza la marca anterior sin duplicarse.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-03 — Registrar adelantos y descuentos

**Como** maestro de obra **quiero** anotar adelantos y descuentos por trabajador **para** descontarlos solos en la planilla.

**Fase:** 4 — Adelantos y planilla semanal

**Criterios de aceptación:**

1. **Dado:** un trabajador. **Cuando:** registro un adelanto de 100 Bs. **Entonces:** aparece en su historial con la fecha y se resta de su pago semanal.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-04 — Planilla semanal

**Como** maestro de obra **quiero** ver el total a pagar por persona de la semana **para** pagar rápido y sin errores.

**Fase:** 4 — Adelantos y planilla semanal

**Criterios de aceptación:**

1. **Dado:** una semana con asistencia y adelantos. **Cuando:** abro la planilla. **Entonces:** veo por trabajador: días, extras, adelantos y neto.
2. **Dado:** un trabajador con adelantos mayores a lo ganado. **Cuando:** abro la planilla. **Entonces:** su neto aparece en 0 y el saldo se arrastra a la semana siguiente.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-05 — Exportar la planilla

**Como** maestro de obra **quiero** compartir la planilla en PDF y CSV **para** tener constancia y pasar los datos al contador.

**Fase:** 5 — PDF y exportación CSV

**Criterios de aceptación:**

1. **Dado:** una planilla cerrada. **Cuando:** toco «Compartir PDF». **Entonces:** se genera un PDF con el detalle y se abre el menú de compartir.
2. **Dado:** una planilla cerrada. **Cuando:** toco «Exportar CSV». **Entonces:** se genera un archivo con una fila por trabajador.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

## 5. Pantallas y navegación

| Pantalla | Qué muestra | Acciones principales |
|---|---|---|
| Inicio | Obras activas, trabajadores presentes hoy y total adelantado de la semana | Marcar asistencia de hoy, abrir planilla |
| Obras | Lista de obras con cantidad de trabajadores | Crear, editar, archivar |
| Trabajadores | Lista con jornal y obra asignada | Crear, editar, dar de baja |
| Asistencia diaria | Lista de la obra con selector de estado por persona y horas extra | Cambiar fecha, marcar todos presentes, guardar |
| Adelantos | Historial por trabajador con monto, fecha y nota | Agregar adelanto o descuento |
| Planilla semanal | Tabla por trabajador: días, extras, adelantos, neto; total general | Cerrar planilla, compartir PDF, exportar CSV |

**Navegación:** la pantalla de inicio es el punto de partida; desde ahí se llega a cada sección con un toque y se vuelve con el botón atrás. Las acciones frecuentes (nuevo registro) están siempre a la vista. La navegación se implementa con Expo Router (rutas por archivo en `app/`).

## 6. Modelo de datos

Base SQLite local versionada con `PRAGMA user_version`. Las fechas se guardan como texto ISO 8601 y los montos como números reales (en bolivianos).

### `obras`

Cada obra o frente de trabajo.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `nombre` | TEXT | Obligatorio |
| `direccion` | TEXT | Opcional |

### `trabajadores`

Personal con su jornal diario y la obra asignada.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `nombre` | TEXT | Obligatorio |
| `telefono` | TEXT | Opcional |
| `jornal_diario` | REAL | Obligatorio |

### `asistencias`

Una fila por trabajador por día con su estado.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `trabajador_id` | INTEGER | Obligatorio; Referencia a trabajadores (se borra en cascada) |
| `obra_id` | INTEGER | Referencia a obras |
| `fecha` | TEXT | Obligatorio |
| `horas` | REAL | Obligatorio; Por defecto 8 |
| `estado` | TEXT | Obligatorio; Por defecto “presente” |

### `adelantos`

Dinero adelantado o descontado a un trabajador.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `trabajador_id` | INTEGER | Obligatorio; Referencia a trabajadores (se borra en cascada) |
| `monto` | REAL | Obligatorio |
| `fecha` | TEXT | Obligatorio |
| `nota` | TEXT | Opcional |

### `planillas`

Cierres semanales con el total pagado.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `desde` | TEXT | Obligatorio |
| `hasta` | TEXT | Obligatorio |
| `total` | REAL | Obligatorio |

Detalle de la política de migraciones: nunca editar una migración publicada; agregar una nueva al final de la lista en `src/db/schema.ts`.

## 7. Casos borde a contemplar

- Un trabajador cambia de obra a mitad de semana: la asistencia queda ligada a la obra del día marcado.
- Cambio de jornal: aplica desde la fecha del cambio, no retroactivo.
- Semana que cruza de mes: la planilla se agrupa por semana, no por mes.
- Trabajador dado de baja con adelantos pendientes: aparece en la planilla hasta saldarse.

## 8. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos; las listas responden de inmediato con cientos de registros (consultas con índices y listas virtualizadas).
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Accesibilidad básica:** contraste suficiente, etiquetas de accesibilidad en botones y tamaño de texto que respeta el ajuste del sistema.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).
- **Compatibilidad:** Android 8 o superior (probado con Expo Go y con el APK).

### Capacidades de Expo que usa

| Paquete | Para qué | Permiso |
|---|---|---|
| `expo-print` | Generar PDF desde HTML | — |
| `expo-sharing` | Compartir PDF, CSV o respaldos con otras apps | — |

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Reclamos por errores de cálculo | Reglas de pago explícitas, funciones puras con pruebas y PDF como constancia. |
| Pérdida del celular | Exportación CSV semanal y respaldo en v1.1. |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| El alcance crece | Todo lo que no esté en la sección 2 va a «Después del MVP» en el [ROADMAP](ROADMAP.md) |

## 10. Criterios para lanzar el MVP (v1.0.0)

- [ ] Todas las historias de la sección 4 cumplen sus criterios de aceptación.
- [ ] Todas las reglas de negocio de la sección 3 tienen pruebas o verificación manual.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk` e instalado en un teléfono limpio.
- [ ] README con capturas de pantalla y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado con el APK adjunto.

## 11. Glosario

| Término | Significado en JornalCheck |
|---|---|
| `obras` | Cada obra o frente de trabajo. |
| `trabajadores` | Personal con su jornal diario y la obra asignada. |
| `asistencias` | Una fila por trabajador por día con su estado. |
| `adelantos` | Dinero adelantado o descontado a un trabajador. |
| `planillas` | Cierres semanales con el total pagado. |
| `asistencias.estado` | Valores: presente, falta, medio_dia |

## 12. Mensajes estándar

| Situación | Mensaje |
|---|---|
| Campo obligatorio vacío | Completá este campo |
| Número inválido | Ingresá un número válido |
| Monto cero o negativo | El monto debe ser mayor a 0 |
| Fecha inválida | Fecha no válida |
| Guardado correcto | Guardado |
| Error al guardar | No se pudo guardar. Intentá de nuevo |
| Confirmar borrado | ¿Borrar «{nombre}»? No se puede deshacer |
| Lista vacía | Todavía no hay nada acá. Tocá «+» para empezar |

## 13. Trazabilidad

| Historia | Fase | Casos de prueba |
|---|---|---|
| HU-01 Registrar obras y trabajadores | 2 | CP-01-1, CP-01-2 |
| HU-02 Marcar asistencia diaria | 3 | CP-02-1, CP-02-2 |
| HU-03 Registrar adelantos y descuentos | 4 | CP-03-1 |
| HU-04 Planilla semanal | 4 | CP-04-1, CP-04-2 |
| HU-05 Exportar la planilla | 5 | CP-05-1, CP-05-2 |

## 14. Documentos relacionados

- [DATOS.md](DATOS.md) · [PANTALLAS.md](PANTALLAS.md) · [PRUEBAS.md](PRUEBAS.md) · [BACKLOG.md](BACKLOG.md) · [ROADMAP.md](ROADMAP.md) · [PLANNING.md](PLANNING.md)
