# Plan de pruebas — JornalCheck

> Qué probar, cuándo y cómo. Cada historia y cada regla de negocio tiene casos concretos. Complementa a [SPEC.md](SPEC.md).

## 1. Estrategia

| Nivel | Herramienta | Qué cubre | Cuándo |
|---|---|---|---|
| Unitarias | jest-expo (`npm test`) | Lógica pura de `src/lib/` (cálculos, validaciones, formatos) | En cada commit (CI) |
| Manuales por historia | Teléfono con Expo Go | Criterios de aceptación de SPEC (casos CP-) | Al cerrar cada tarea de pantalla |
| Regresión por fase | Teléfono real | Lo ya terminado sigue andando | Al cerrar cada fase |
| Aceptación final | APK en teléfono limpio, modo avión | Criterios de lanzamiento | Antes de v1.0.0 |

Meta de cobertura: **100 % de las reglas de negocio** con prueba automática o caso manual, y **100 % de los criterios de aceptación** ejecutados al menos una vez en un teléfono real.

## 2. Pruebas unitarias por regla de negocio

Crear un archivo `src/lib/<tema>.test.ts` por tema. Una prueba por regla como mínimo; agregar los bordes de la sección 4.

| ID | Regla | Tipo de prueba | Casos mínimos |
|---|---|---|---|
| RN-01 | El jornal diario es un monto por trabajador y se paga completo por día «presente». | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-02 | Medio día paga el 50% del jornal; falta paga 0. | Unitaria (fechas) | Hoy, mañana, fin de mes, año bisiesto |
| RN-03 | Las horas extra se pagan como (jornal ÷ 8) × 1,5 por hora, salvo que el usuario configure otro factor en Ajustes. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-04 | Solo puede haber una asistencia por trabajador por día; volver a marcar la reemplaza. | Unitaria (fechas) | Hoy, mañana, fin de mes, año bisiesto |
| RN-05 | Pago neto semanal = suma de días pagados + horas extra − adelantos y descuentos de la semana. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-06 | Si el neto es negativo, queda un saldo a favor de la obra que se arrastra a la semana siguiente. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-07 | Una planilla cerrada no se edita; si hay un error se registra un ajuste en la semana siguiente. | Unitaria (fechas) | Hoy, mañana, fin de mes, año bisiesto |
| RN-08 | Los descuentos se registran en la misma tabla adelantos, con la nota «descuento»; ambos restan del pago semanal. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |

## 3. Casos manuales por historia

Formato: ejecutar en el teléfono, marcar ✔ o ✘ y anotar la fecha. Si falla, abrir un issue con el ID del caso.

### HU-01 — Registrar obras y trabajadores (fase 2)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-01-1 | no hay trabajadores | abro la sección Trabajadores | veo un estado vacío con «Agregar trabajador» | ☐ |
| CP-01-2 | el formulario de trabajador | dejo el jornal vacío | no guarda y pide un jornal mayor a 0 | ☐ |

Casos transversales: **CP-01-T1** modo avión · **CP-01-T2** cerrar y reabrir la app (persistencia) · **CP-01-T3** texto del sistema en tamaño grande.

### HU-02 — Marcar asistencia diaria (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-02-1 | una obra con 10 trabajadores | abro la asistencia de hoy | veo a los 10 con «presente» sugerido que puedo cambiar con un toque | ☐ |
| CP-02-2 | ya marqué a Juan hoy | lo vuelvo a marcar | se reemplaza la marca anterior sin duplicarse | ☐ |

Casos transversales: **CP-02-T1** modo avión · **CP-02-T2** cerrar y reabrir la app (persistencia) · **CP-02-T3** texto del sistema en tamaño grande.

### HU-03 — Registrar adelantos y descuentos (fase 4)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-03-1 | un trabajador | registro un adelanto de 100 Bs | aparece en su historial con la fecha y se resta de su pago semanal | ☐ |

Casos transversales: **CP-03-T1** modo avión · **CP-03-T2** cerrar y reabrir la app (persistencia) · **CP-03-T3** texto del sistema en tamaño grande.

### HU-04 — Planilla semanal (fase 4)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-04-1 | una semana con asistencia y adelantos | abro la planilla | veo por trabajador: días, extras, adelantos y neto | ☐ |
| CP-04-2 | un trabajador con adelantos mayores a lo ganado | abro la planilla | su neto aparece en 0 y el saldo se arrastra a la semana siguiente | ☐ |

Casos transversales: **CP-04-T1** modo avión · **CP-04-T2** cerrar y reabrir la app (persistencia) · **CP-04-T3** texto del sistema en tamaño grande.

### HU-05 — Exportar la planilla (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-05-1 | una planilla cerrada | toco «Compartir PDF» | se genera un PDF con el detalle y se abre el menú de compartir | ☐ |
| CP-05-2 | una planilla cerrada | toco «Exportar CSV» | se genera un archivo con una fila por trabajador | ☐ |

Casos transversales: **CP-05-T1** modo avión · **CP-05-T2** cerrar y reabrir la app (persistencia) · **CP-05-T3** texto del sistema en tamaño grande.

## 4. Casos borde

| ID | Caso | Resultado esperado | Resultado |
|---|---|---|---|
| CB-01 | Un trabajador cambia de obra a mitad de semana: la asistencia queda ligada a la obra del día marcado. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-02 | Cambio de jornal: aplica desde la fecha del cambio, no retroactivo. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-03 | Semana que cruza de mes: la planilla se agrupa por semana, no por mes. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-04 | Trabajador dado de baja con adelantos pendientes: aparece en la planilla hasta saldarse. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |

## 5. Pruebas de datos y migraciones

| ID | Prueba | Esperado |
|---|---|---|
| CD-01 | Primer arranque en teléfono limpio | La base se crea con todas las tablas y `user_version` queda en 1 |
| CD-02 | Actualizar de una versión anterior con datos cargados | Las migraciones nuevas se aplican y no se pierde ningún registro |
| CD-03 | Borrar un registro padre | Los hijos se borran o se bloquea con mensaje, según el esquema |
| CD-04 | Intentar guardar con campos obligatorios vacíos | No se inserta nada y se marcan los campos |
| CD-05 | Cargar 1.000 registros de prueba | Las listas siguen fluidas (scroll sin trabas) y abren en menos de 2 s |

## 6. Regresión al cerrar cada fase

**Fase 1 — Estructura base y navegación**

- [ ] La app abre y navega sin errores

**Fase 2 — Obras y trabajadores**

- [ ] Puedo cargar 2 obras y 10 trabajadores y ver todo tras reiniciar.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 3 — Asistencia diaria**

- [ ] Marcar a 10 personas toma menos de 30 segundos.
- [ ] Marcar dos veces el mismo día no duplica.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 4 — Adelantos y planilla semanal**

- [ ] La planilla coincide con una cuenta manual de 3 casos de prueba.
- [ ] Una planilla cerrada no se puede editar.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 5 — PDF y exportación CSV**

- [ ] El PDF y el CSV abren bien en un teléfono real.
- [ ] Los criterios de las fases anteriores siguen funcionando

## 7. Matriz de dispositivos

| Dispositivo | Android | Qué se verifica |
|---|---|---|
| Gama baja (2–3 GB de RAM) | 8–10 | Fluidez de listas, tiempo de arranque |
| Gama media | 11–13 | Flujo completo y APK |
| Pantalla pequeña (5") | cualquiera | Que nada quede cortado ni oculto por el teclado |
| Texto del sistema grande | cualquiera | Que los formularios sigan siendo usables |

## 8. Lista de verificación para el lanzamiento (v1.0.0)

- [ ] Todas las historias ejecutadas en teléfono real (casos CP-)
- [ ] Todos los casos borde (CB-) ejecutados
- [ ] Pruebas de datos (CD-) ejecutadas
- [ ] APK instalado en un teléfono limpio sin Expo Go
- [ ] Probado en modo avión durante todo el flujo principal
- [ ] Rotación de pantalla no pierde datos del formulario
- [ ] Permisos solicitados solo cuando se necesitan y con explicación
- [ ] Sin errores en la consola durante un recorrido completo
- [ ] README con capturas y CHANGELOG al día

## 9. Informe de errores

```
Título: [Bug] <qué pasó>
ID de caso: CP-XX-X
Pasos: 1... 2... 3...
Esperado: ...
Obtenido: ...
Dispositivo / Android: ...
Captura o video: ...
```
