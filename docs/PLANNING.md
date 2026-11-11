# Plan de desarrollo — JornalCheck

Guía para construir el MVP **fase por fase**. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por tarea** (usá los títulos de abajo) y un milestone por fase en GitHub.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Pull request al cerrar la fase** con la lista de criterios de salida marcada.
5. **Primero la lógica pura y sus pruebas** (en `src/lib/`), después la pantalla que la usa.
6. **Probá en el teléfono** al terminar cada tarea de pantalla, no solo al final de la fase.

### Definición de «terminado» (vale para toda tarea y fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos, de carga y de error resueltos, con textos en español.
- [ ] Los datos persisten al reiniciar la app.
- [ ] La regla de negocio correspondiente tiene prueba o verificación manual anotada.
- [ ] CHANGELOG actualizado al cerrar la fase.

## Calendario sugerido

| Fase | Nombre | Días | Acumulado |
|---|---|---|---|
| 1 | Estructura base y navegación | 2 | 2 |
| 2 | Obras y trabajadores | 3 | 5 |
| 3 | Asistencia diaria | 4 | 9 |
| 4 | Adelantos y planilla semanal | 4 | 13 |
| 5 | PDF y exportación CSV | 3 | 16 |

Total: **16 días** (~4 semanas). Si una fase se pasa del doble de lo estimado, recortá alcance dentro de la fase en lugar de saltar a la siguiente.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción. La estructura ya viene en el repositorio.

**Tareas**

- [ ] **F1-T1** `npm install` y `npx expo start`: la app abre en Expo Go.
- [ ] **F1-T2** Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque (verificar en el teléfono).
- [ ] **F1-T3** Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] **F1-T4** Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] **F1-T5** Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] **F1-T6** Confirmar que el CI de GitHub Actions pasa en verde.

**Criterio de salida:** la app abre, navega entre secciones vacías y no da errores; lint, tipos y tests en verde.

---

## Fase 2 — Obras y trabajadores

**Estimación:** 3 días. **Rama sugerida:** `fase-2-obras-y-trabajadores`.

**Objetivo:** Gestionar obras y trabajadores.

**Historias que se completan:** HU-01 (Registrar obras y trabajadores).

**Tareas**

- [ ] **F2-T1** Consultas de obras y trabajadores con tipos.
- [ ] **F2-T2** Pantallas Obras y Trabajadores con estado vacío.
- [ ] **F2-T3** Formularios con validación de jornal y nombre.
- [ ] **F2-T4** Baja lógica de trabajadores para no perder el historial.
- [ ] **F2-T5** Pruebas de validación.
- [ ] **F2-T6** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F2-T7** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F2-T8** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-01 — no hay trabajadores → abro la sección Trabajadores → veo un estado vacío con «Agregar trabajador».
- [ ] HU-01 — el formulario de trabajador → dejo el jornal vacío → no guarda y pide un jornal mayor a 0.

**Criterio de salida:**

- [ ] Puedo cargar 2 obras y 10 trabajadores y ver todo tras reiniciar.
- [ ] Definición de «terminado» cumplida.

---

## Fase 3 — Asistencia diaria

**Estimación:** 4 días. **Rama sugerida:** `fase-3-asistencia-diaria`.

**Objetivo:** Marcar asistencia diaria rápida.

**Historias que se completan:** HU-02 (Marcar asistencia diaria).

**Tareas**

- [ ] **F3-T1** Tabla asistencias con clave única (trabajador, fecha) y reemplazo al volver a marcar.
- [ ] **F3-T2** Pantalla de asistencia con «marcar todos presentes» y cambio por toque.
- [ ] **F3-T3** Selector de fecha con acceso rápido a ayer y hoy.
- [ ] **F3-T4** Campo de horas extra por persona.
- [ ] **F3-T5** Función pura que convierte estado + horas en días pagados, con pruebas.
- [ ] **F3-T6** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F3-T7** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F3-T8** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-02 — una obra con 10 trabajadores → abro la asistencia de hoy → veo a los 10 con «presente» sugerido que puedo cambiar con un toque.
- [ ] HU-02 — ya marqué a Juan hoy → lo vuelvo a marcar → se reemplaza la marca anterior sin duplicarse.

**Criterio de salida:**

- [ ] Marcar a 10 personas toma menos de 30 segundos.
- [ ] Marcar dos veces el mismo día no duplica.
- [ ] Definición de «terminado» cumplida.

---

## Fase 4 — Adelantos y planilla semanal

**Estimación:** 4 días. **Rama sugerida:** `fase-4-adelantos-y-planilla-semanal`.

**Objetivo:** Adelantos y planilla semanal.

**Historias que se completan:** HU-03 (Registrar adelantos y descuentos), HU-04 (Planilla semanal).

**Tareas**

- [ ] **F4-T1** Pantalla Adelantos con alta de adelanto o descuento y nota.
- [ ] **F4-T2** Función pura de planilla: días, extras, adelantos, neto y arrastre de saldo, con pruebas.
- [ ] **F4-T3** Pantalla Planilla semanal con selector de semana (lunes a domingo).
- [ ] **F4-T4** Cierre de planilla que la vuelve de solo lectura.
- [ ] **F4-T5** Ajustes: factor de horas extra y día de inicio de semana.
- [ ] **F4-T6** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F4-T7** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F4-T8** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-03 — un trabajador → registro un adelanto de 100 Bs → aparece en su historial con la fecha y se resta de su pago semanal.
- [ ] HU-04 — una semana con asistencia y adelantos → abro la planilla → veo por trabajador: días, extras, adelantos y neto.
- [ ] HU-04 — un trabajador con adelantos mayores a lo ganado → abro la planilla → su neto aparece en 0 y el saldo se arrastra a la semana siguiente.

**Criterio de salida:**

- [ ] La planilla coincide con una cuenta manual de 3 casos de prueba.
- [ ] Una planilla cerrada no se puede editar.
- [ ] Definición de «terminado» cumplida.

---

## Fase 5 — PDF y exportación CSV

**Estimación:** 3 días. **Rama sugerida:** `fase-5-pdf-y-exportacion-csv`.

**Objetivo:** Exportar la planilla en PDF y CSV.

**Historias que se completan:** HU-05 (Exportar la planilla).

**Tareas**

- [ ] **F5-T1** Plantilla HTML de la planilla para expo-print.
- [ ] **F5-T2** Compartir con expo-sharing.
- [ ] **F5-T3** Exportación CSV con separador compatible con Excel en español (;) y BOM UTF-8.
- [ ] **F5-T4** Pruebas del generador CSV (comillas, comas, acentos).
- [ ] **F5-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F5-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F5-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-05 — una planilla cerrada → toco «Compartir PDF» → se genera un PDF con el detalle y se abre el menú de compartir.
- [ ] HU-05 — una planilla cerrada → toco «Exportar CSV» → se genera un archivo con una fila por trabajador.

**Criterio de salida:**

- [ ] El PDF y el CSV abren bien en un teléfono real.
- [ ] Definición de «terminado» cumplida.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar todas las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] Revisar textos, íconos y nombre de la app en `app.json`.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio, sin Expo Go y en modo avión.
- [ ] Publicar el release v1.0.0 con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.

## Plantilla de issue

Copiá esto al crear cada issue:

```
Título: [F2-T1] <descripción de la tarea>
Fase: N — <nombre>
Historia: HU-XX
Criterios:
- [ ] ...
Notas técnicas: ...
```

---

## Cronograma día por día

Guía para no perder el hilo: cada día tiene tareas concretas. Si un día se atrasa, mové la tarea al siguiente, no la saltees.

### Fase 1 — Estructura base y navegación

- **Día 1** (día 1 de la fase): `F1-T1` Instalar dependencias y abrir la app en Expo Go; `F1-T2` Verificar creación y migración de la base; `F1-T3` Definir la navegación principal.
- **Día 2** (día 2 de la fase): `F1-T4` Aplicar tema y componente Pantalla; `F1-T5` Pantalla de inicio con accesos; `F1-T6` Confirmar CI en verde.

### Fase 2 — Obras y trabajadores

- **Día 3** (día 1 de la fase): `F2-T1` Consultas de obras y trabajadores con tipos.; `F2-T2` Pantallas Obras y Trabajadores con estado vacío.; `F2-T3` Formularios con validación de jornal y nombre..
- **Día 4** (día 2 de la fase): `F2-T4` Baja lógica de trabajadores para no perder el historial.; `F2-T5` Pruebas de validación.; `F2-T6` Validaciones, estados vacíos y mensajes en español.
- **Día 5** (día 3 de la fase): `F2-T7` Pruebas automáticas y verificación manual de criterios; `F2-T8` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 3 — Asistencia diaria

- **Día 6** (día 1 de la fase): `F3-T1` Tabla asistencias con clave única (trabajador, fecha) y reemplazo al volver a marcar.; `F3-T2` Pantalla de asistencia con «marcar todos presentes» y cambio por toque..
- **Día 7** (día 2 de la fase): `F3-T3` Selector de fecha con acceso rápido a ayer y hoy.; `F3-T4` Campo de horas extra por persona..
- **Día 8** (día 3 de la fase): `F3-T5` Función pura que convierte estado + horas en días pagados, con pruebas.; `F3-T6` Validaciones, estados vacíos y mensajes en español.
- **Día 9** (día 4 de la fase): `F3-T7` Pruebas automáticas y verificación manual de criterios; `F3-T8` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 4 — Adelantos y planilla semanal

- **Día 10** (día 1 de la fase): `F4-T1` Pantalla Adelantos con alta de adelanto o descuento y nota.; `F4-T2` Función pura de planilla: días, extras, adelantos, neto y arrastre de saldo, con pruebas..
- **Día 11** (día 2 de la fase): `F4-T3` Pantalla Planilla semanal con selector de semana (lunes a domingo).; `F4-T4` Cierre de planilla que la vuelve de solo lectura..
- **Día 12** (día 3 de la fase): `F4-T5` Ajustes: factor de horas extra y día de inicio de semana.; `F4-T6` Validaciones, estados vacíos y mensajes en español.
- **Día 13** (día 4 de la fase): `F4-T7` Pruebas automáticas y verificación manual de criterios; `F4-T8` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 5 — PDF y exportación CSV

- **Día 14** (día 1 de la fase): `F5-T1` Plantilla HTML de la planilla para expo-print.; `F5-T2` Compartir con expo-sharing.; `F5-T3` Exportación CSV con separador compatible con Excel en español (;) y BOM UTF-8..
- **Día 15** (día 2 de la fase): `F5-T4` Pruebas del generador CSV (comillas, comas, acentos).; `F5-T5` Validaciones, estados vacíos y mensajes en español; `F5-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 16** (día 3 de la fase): `F5-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

## Rutina diaria

1. Empezá releyendo la tarea del día en [BACKLOG.md](BACKLOG.md) y su regla o historia en [SPEC.md](SPEC.md).
2. Escribí primero la prueba de la lógica, después el código.
3. Probá en el teléfono antes de hacer commit.
4. Cerrá el día con un commit, el issue marcado y una línea en el CHANGELOG si corresponde.

## Qué hacer si te trabás

- Más de 2 horas sin avanzar: simplificá la tarea al caso mínimo y anotá lo que quedó fuera como issue `mejora`.
- Duda de alcance: la respuesta está en la sección 2 del [SPEC](SPEC.md); si no está, no entra al MVP.
- Duda de datos o validaciones: [DATOS.md](DATOS.md).
- Duda de pantallas: [PANTALLAS.md](PANTALLAS.md).
- Duda de cómo probar: [PRUEBAS.md](PRUEBAS.md).
