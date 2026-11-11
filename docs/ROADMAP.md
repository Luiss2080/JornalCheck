# Roadmap de JornalCheck

> Que el maestro de obra cierre la planilla semanal sin cuaderno y sin discusiones sobre los días trabajados.

Ruta de desarrollo del MVP, fase por fase. Cada fase termina con algo que se puede **usar y probar en un teléfono**. Trabajá una fase a la vez y no pases a la siguiente hasta cumplir su criterio de salida.

## Resumen

- **Objetivo del MVP:** Control de jornales de obreros: asistencia, horas, adelantos y planilla semanal en PDF.
- **Usuario:** Maestro de obra, contratista o albañil con 3 a 25 trabajadores a jornal diario en una o varias obras, que paga cada semana.
- **Duración estimada:** ~16 días de trabajo efectivo (~4 semanas a ritmo tranquilo).
- **Costo:** $0 (sin servidores, sin suscripciones, todo offline en SQLite).

## Línea de tiempo

| Fase | Nombre | Objetivo | Días | Semana acumulada |
|---|---|---|---|---|
| 1 | Estructura base y navegación | Verificar la base y dejar la navegación y el tema listos. | 2 | 1 |
| 2 | Obras y trabajadores | Gestionar obras y trabajadores. | 3 | 1 |
| 3 | Asistencia diaria | Marcar asistencia diaria rápida. | 4 | 2 |
| 4 | Adelantos y planilla semanal | Adelantos y planilla semanal. | 4 | 3 |
| 5 | PDF y exportación CSV | Exportar la planilla en PDF y CSV. | 3 | 4 |

## Hitos

### Hito 1 — Estructura base y navegación

**Demo:** La app abre en Expo Go, navega entre secciones vacías y el CI pasa en verde.

### Hito 2 — Obras y trabajadores

**Demo:** Puedo cargar 2 obras y 10 trabajadores y ver todo tras reiniciar.

### Hito 3 — Asistencia diaria

**Demo:** Marcar a 10 personas toma menos de 30 segundos. Marcar dos veces el mismo día no duplica.

### Hito 4 — Adelantos y planilla semanal

**Demo:** La planilla coincide con una cuenta manual de 3 casos de prueba. Una planilla cerrada no se puede editar.

### Hito 5 — PDF y exportación CSV

**Demo:** El PDF y el CSV abren bien en un teléfono real.

## Detalle por fase

### Fase 1 — Estructura base y navegación

- **Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.
- **Historias cubiertas:** ninguna (infraestructura).
- **Depende de:** nada.
- **Criterio de salida:** la app abre, navega y el CI está en verde.

### Fase 2 — Obras y trabajadores

- **Objetivo:** Gestionar obras y trabajadores.
- **Historias cubiertas:** HU-01 Registrar obras y trabajadores
- **Depende de:** fase 1.
- **Duración:** 3 días.
- **Criterio de salida:**
  - Puedo cargar 2 obras y 10 trabajadores y ver todo tras reiniciar.

### Fase 3 — Asistencia diaria

- **Objetivo:** Marcar asistencia diaria rápida.
- **Historias cubiertas:** HU-02 Marcar asistencia diaria
- **Depende de:** fase 2.
- **Duración:** 4 días.
- **Criterio de salida:**
  - Marcar a 10 personas toma menos de 30 segundos.
  - Marcar dos veces el mismo día no duplica.

### Fase 4 — Adelantos y planilla semanal

- **Objetivo:** Adelantos y planilla semanal.
- **Historias cubiertas:** HU-03 Registrar adelantos y descuentos; HU-04 Planilla semanal
- **Depende de:** fase 3.
- **Duración:** 4 días.
- **Criterio de salida:**
  - La planilla coincide con una cuenta manual de 3 casos de prueba.
  - Una planilla cerrada no se puede editar.

### Fase 5 — PDF y exportación CSV

- **Objetivo:** Exportar la planilla en PDF y CSV.
- **Historias cubiertas:** HU-05 Exportar la planilla
- **Depende de:** fase 4.
- **Duración:** 3 días.
- **Criterio de salida:**
  - El PDF y el CSV abren bien en un teléfono real.

## Estado

- [ ] **Fase 1:** Estructura base y navegación
- [ ] **Fase 2:** Obras y trabajadores
- [ ] **Fase 3:** Asistencia diaria
- [ ] **Fase 4:** Adelantos y planilla semanal
- [ ] **Fase 5:** PDF y exportación CSV

## Dependencias y supuestos

- Un teléfono Android real para probar (Expo Go) y, al final, para instalar el APK.
- Node.js 20+ y la app Expo Go.
- Todo lo demás (cuentas, nube, pagos) queda fuera del MVP.

## Después del MVP (v1.1 en adelante)

- [ ] Modo oscuro.
- [ ] Búsqueda y filtros avanzados en las listas.
- [ ] Estadísticas y gráficos simples en la pantalla de inicio.
- [ ] Publicación en Google Play (cuenta de desarrollador, pago único de USD 25).
- [ ] Respaldo y restauración de la base de datos.
- [ ] Sincronización opcional entre dispositivos (solo si hay demanda real).

## Cómo usar este documento

1. [SPEC.md](SPEC.md) define **qué** debe hacer la app (historias, reglas, pantallas, datos).
2. [PLANNING.md](PLANNING.md) define **cómo** construirla fase por fase (tareas, pruebas, issues).
3. Al cerrar una fase: marcá el estado acá, actualizá el [CHANGELOG](../CHANGELOG.md) y fusioná la rama a `main`.

## Trazabilidad: historias por fase

| Historia | Fase | Entrega |
|---|---|---|
| HU-01 Registrar obras y trabajadores | 2 | Obras y trabajadores |
| HU-02 Marcar asistencia diaria | 3 | Asistencia diaria |
| HU-03 Registrar adelantos y descuentos | 4 | Adelantos y planilla semanal |
| HU-04 Planilla semanal | 4 | Adelantos y planilla semanal |
| HU-05 Exportar la planilla | 5 | PDF y exportación CSV |

## Indicadores de avance

| Indicador | Cómo se mide | Meta |
|---|---|---|
| Avance de tareas | Issues cerrados / 37 | 100 % al lanzar |
| Historias aceptadas | Casos CP- marcados ✔ / 9 | 100 % |
| Reglas cubiertas | RN con prueba / 8 | 100 % |
| Ritmo | Días reales vs estimados por fase | Desvío menor al 50 % |
| Calidad | Errores abiertos al cierre de fase | 0 críticos |

## Revisión de fin de fase

Antes de pasar a la siguiente fase respondé por escrito (5 minutos):

1. ¿Se cumplieron todos los criterios de salida?
2. ¿Cuántos días tomó realmente frente a lo estimado?
3. ¿Qué se recortó o se dejó para después?
4. ¿Hay algo que cambie el SPEC? Actualizalo antes de seguir.

## Documentos de apoyo

- [DATOS.md](DATOS.md): campos, validaciones, consultas y migraciones.
- [PANTALLAS.md](PANTALLAS.md): ruta, estados y bosquejo de cada pantalla.
- [PRUEBAS.md](PRUEBAS.md): casos de prueba por regla, historia y borde.
- [BACKLOG.md](BACKLOG.md): issues listos para GitHub con milestones y etiquetas.
