# Pantallas y flujos — JornalCheck

> Guía de interfaz para construir cada pantalla: ruta, contenido, estados y bosquejo. Complementa la sección 5 de [SPEC.md](SPEC.md).

## 1. Mapa de rutas

| Pantalla | Archivo (Expo Router) | Tipo |
|---|---|---|
| Inicio | `app/index.tsx` | Inicio |
| Obras | `app/obras.tsx` | Lista / vista |
| Trabajadores | `app/trabajadores.tsx` | Lista / vista |
| Asistencia diaria | `app/asistencia-diaria.tsx` | Lista / vista |
| Adelantos | `app/adelantos.tsx` | Lista / vista |
| Planilla semanal | `app/planilla-semanal.tsx` | Lista / vista |

**Convenciones de interfaz**

- Una acción principal por pantalla, en un botón grande abajo o en un botón flotante.
- Los formularios se abren como pantalla completa, validan al enviar y muestran el error junto al campo.
- Toda lista tiene estado vacío con una frase y un botón que lleva a la acción.
- Las acciones que borran piden confirmación explícita con el nombre del registro.
- El botón atrás nunca pierde datos sin avisar: si el formulario tiene cambios, se pregunta antes de salir.
- Textos en español de Bolivia (voseo opcional, siempre claros); montos como `Bs 1.250,00`.

## 2. Detalle por pantalla

### 2.1 Inicio

- **Archivo:** `app/index.tsx`
- **Qué muestra:** Obras activas, trabajadores presentes hoy y total adelantado de la semana
- **Acciones:** Marcar asistencia de hoy, abrir planilla

**Bosquejo**

```
┌──────────────────────────────┐
│ JornalCheck                  │
├──────────────────────────────┤
│ [ Resumen y alertas ]        │
│                              │
│  ▸ Obras                    │
│  ▸ Trabajadores             │
│  ▸ Asistencia diaria        │
│  ▸ Adelantos                │
│                              │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Obras activas, trabajadores presentes hoy y total adelantado de la semana |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.2 Obras

- **Archivo:** `app/obras.tsx`
- **Qué muestra:** Lista de obras con cantidad de trabajadores
- **Acciones:** Crear, editar, archivar
- **Historias relacionadas:** HU-01, HU-03 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Obras                       │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay obras. Tocá «Crear» para empezar. |
| Con datos | Lista de obras con cantidad de trabajadores |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.3 Trabajadores

- **Archivo:** `app/trabajadores.tsx`
- **Qué muestra:** Lista con jornal y obra asignada
- **Acciones:** Crear, editar, dar de baja
- **Historias relacionadas:** HU-01, HU-03 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Trabajadores                │
├──────────────────────────────┤
│ nombre · jornal_diario       │
│ nombre · jornal_diario       │
│ nombre · jornal_diario       │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay trabajadores. Tocá «Crear» para empezar. |
| Con datos | Lista con jornal y obra asignada |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.4 Asistencia diaria

- **Archivo:** `app/asistencia-diaria.tsx`
- **Qué muestra:** Lista de la obra con selector de estado por persona y horas extra
- **Acciones:** Cambiar fecha, marcar todos presentes, guardar
- **Historias relacionadas:** HU-01, HU-02, HU-04 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Asistencia diaria           │
├──────────────────────────────┤
│ fecha · trabajador_id        │
│ fecha · trabajador_id        │
│ fecha · trabajador_id        │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay asistencias. Tocá «Cambiar fecha» para empezar. |
| Con datos | Lista de la obra con selector de estado por persona y horas extra |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.5 Adelantos

- **Archivo:** `app/adelantos.tsx`
- **Qué muestra:** Historial por trabajador con monto, fecha y nota
- **Acciones:** Agregar adelanto o descuento
- **Historias relacionadas:** HU-01, HU-03 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Adelantos                   │
├──────────────────────────────┤
│ fecha · trabajador_id        │
│ fecha · trabajador_id        │
│ fecha · trabajador_id        │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay adelantos. Tocá «Agregar adelanto o descuento» para empezar. |
| Con datos | Historial por trabajador con monto, fecha y nota |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.6 Planilla semanal

- **Archivo:** `app/planilla-semanal.tsx`
- **Qué muestra:** Tabla por trabajador: días, extras, adelantos, neto; total general
- **Acciones:** Cerrar planilla, compartir PDF, exportar CSV
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-04, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Planilla semanal            │
├──────────────────────────────┤
│ desde · total                │
│ desde · total                │
│ desde · total                │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay planillas. Tocá «Cerrar planilla» para empezar. |
| Con datos | Tabla por trabajador: días, extras, adelantos, neto; total general |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

## 3. Flujos principales

**HU-01 — Registrar obras y trabajadores**

```
abro la sección Trabajadores  →  veo un estado vacío con «Agregar trabajador»
```

**HU-02 — Marcar asistencia diaria**

```
abro la asistencia de hoy  →  veo a los 10 con «presente» sugerido que puedo cambiar con un toque
```

**HU-03 — Registrar adelantos y descuentos**

```
registro un adelanto de 100 Bs  →  aparece en su historial con la fecha y se resta de su pago semanal
```

**HU-04 — Planilla semanal**

```
abro la planilla  →  veo por trabajador: días, extras, adelantos y neto
```

**HU-05 — Exportar la planilla**

```
toco «Compartir PDF»  →  se genera un PDF con el detalle y se abre el menú de compartir
```
