# Plan de desarrollo — JornalCheck

Guía para construir el MVP fase por fase. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por fase** con las tareas de abajo como checklist.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Cierre de fase:** lint, tipos y tests en verde, probar en el teléfono, actualizar [ROADMAP.md](ROADMAP.md) y el [CHANGELOG](../CHANGELOG.md), y fusionar a `main`.

### Definición de «terminado» (vale para toda fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos y mensajes de error en español.
- [ ] Los datos persisten al reiniciar la app.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.

**Tareas**

- [ ] `npm install` y `npx expo start` abren la app en Expo Go.
- [ ] Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque.
- [ ] Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] Confirmar que el CI de GitHub Actions pasa en verde.

**Cierre:** la app abre, navega entre secciones vacías y no da errores.

---

## Fase 2 — Obras y trabajadores

**Estimación:** 4 días.

**Objetivo:** obras y trabajadores con jornal diario.

**Tareas**

- [ ] Consultas de `obras` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Consultas de `trabajadores` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: obras y trabajadores con jornal diario.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Obras y trabajadores con jornal diario: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 3 — Asistencia diaria

**Estimación:** 4 días.

**Objetivo:** asistencia diaria por obra (presente, falta, medio día, horas extra).

**Tareas**

- [ ] Consultas de `asistencias` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: asistencia diaria por obra (presente, falta, medio día, horas extra).
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Asistencia diaria por obra (presente, falta, medio día, horas extra): funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 4 — Adelantos y planilla semanal

**Estimación:** 3 días.

**Objetivo:** adelantos y descuentos por trabajador; planilla semanal con total a pagar por persona.

**Tareas**

- [ ] Consultas de `adelantos` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Consultas de `planillas` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: adelantos y descuentos por trabajador.
- [ ] Pantalla(s) y formulario(s) para: planilla semanal con total a pagar por persona.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Adelantos y descuentos por trabajador: funciona sin internet y persiste al reiniciar.
- [ ] Planilla semanal con total a pagar por persona: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 5 — PDF y exportación CSV

**Estimación:** 3 días.

**Objetivo:** exportación de la planilla en PDF y CSV.

**Tareas**

- [ ] Pantalla(s) y formulario(s) para: exportación de la planilla en PDF y CSV.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Exportación de la planilla en PDF y CSV: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio.
- [ ] Publicar el release con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.
