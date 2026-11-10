# Especificación del MVP — JornalCheck

## 1. Resumen

Control de jornales de obreros: asistencia, horas, adelantos y planilla semanal en PDF.

**Usuario objetivo:** constructores y maestros de obra.

**Problema que resuelve:** hoy estas tareas se llevan en cuaderno o en el chat de WhatsApp, con errores y sin historial. JornalCheck las ordena en una app simple que funciona sin internet.

**Propuesta de valor:** registrar en segundos, consultar al instante y compartir el resultado, sin cuentas, sin servidores y sin costo.

## 2. Alcance del MVP

### Incluido

- Obras y trabajadores con jornal diario.
- Asistencia diaria por obra (presente, falta, medio día, horas extra).
- Adelantos y descuentos por trabajador.
- Planilla semanal con total a pagar por persona.
- Exportación de la planilla en PDF y CSV.

### Fuera del MVP

- Cuentas de usuario, inicio de sesión y multiusuario.
- Servidor, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago.

## 3. Historias de usuario y criterios de aceptación

### HU-01 — Obras y trabajadores con jornal diario

**Como** usuario (constructores y maestros de obra), **quiero** obras y trabajadores con jornal diario, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-02 — Asistencia diaria por obra (presente, falta, medio día, horas extra)

**Como** usuario (constructores y maestros de obra), **quiero** asistencia diaria por obra (presente, falta, medio día, horas extra), **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-03 — Adelantos y descuentos por trabajador

**Como** usuario (constructores y maestros de obra), **quiero** adelantos y descuentos por trabajador, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-04 — Planilla semanal con total a pagar por persona

**Como** usuario (constructores y maestros de obra), **quiero** planilla semanal con total a pagar por persona, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-05 — Exportación de la planilla en PDF y CSV

**Como** usuario (constructores y maestros de obra), **quiero** exportación de la planilla en PDF y CSV, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

## 4. Pantallas

| Pantalla | Propósito |
|---|---|
| Inicio | Resumen y accesos directos a lo más usado |
| Lista de obras | Ver, buscar y abrir cada registro |
| Formulario de obras | Crear y editar con validaciones |
| Lista de trabajadores | Ver, buscar y abrir cada registro |
| Formulario de trabajadores | Crear y editar con validaciones |
| Lista de asistencias | Ver, buscar y abrir cada registro |
| Formulario de asistencias | Crear y editar con validaciones |
| Lista de adelantos | Ver, buscar y abrir cada registro |
| Formulario de adelantos | Crear y editar con validaciones |
| Lista de planillas | Ver, buscar y abrir cada registro |
| Formulario de planillas | Crear y editar con validaciones |
| Ajustes | Datos del usuario, moneda y exportación |

## 5. Modelo de datos

- **obras**: id, nombre, direccion
- **trabajadores**: id, nombre, telefono, jornal_diario
- **asistencias**: id, trabajador_id, obra_id, fecha, horas, estado
- **adelantos**: id, trabajador_id, monto, fecha, nota
- **planillas**: id, desde, hasta, total

El SQL completo y la política de migraciones están en [ARQUITECTURA.md](ARQUITECTURA.md).

## 6. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos y las listas responden de inmediato con cientos de registros.
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).

## 7. Riesgos y decisiones

| Riesgo | Mitigación |
|---|---|
| Perder el celular y los datos | Respaldo exportable (CSV o archivo de base) en la versión 1.1 |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| Alcance que crece | Todo lo que no esté en la sección 2 va a «Después del MVP» |

## 8. Criterios para lanzar el MVP

- [ ] Todas las historias de la sección 3 cumplen sus criterios.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk`.
- [ ] README con capturas y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado.
