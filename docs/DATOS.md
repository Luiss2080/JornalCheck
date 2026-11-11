# Modelo de datos — JornalCheck

> Diseño detallado de la base SQLite: campos, validaciones, consultas y migraciones. Complementa la sección 6 de [SPEC.md](SPEC.md).

## 1. Convenciones

- Base local `SQLite` con `expo-sqlite`; versión del esquema en `PRAGMA user_version`.
- Claves primarias `INTEGER AUTOINCREMENT` llamadas `id`.
- Fechas como texto ISO `AAAA-MM-DD` (y `AAAA-MM-DDTHH:MM` cuando hay hora). Nunca se guardan textos como «hoy».
- Montos como `REAL` en bolivianos; se redondean a 2 decimales al guardar y se formatean al mostrar.
- Booleanos como `INTEGER` 0/1.
- Los textos se guardan sin espacios sobrantes (`trim()`).
- Todas las consultas usan parámetros (`?`), nunca concatenan texto del usuario.
- Las claves foráneas se activan con `PRAGMA foreign_keys = ON` al abrir la base.

## 2. Relaciones

| Campo | Apunta a | Comportamiento |
|---|---|---|
| `asistencias.trabajador_id` | `trabajadores` | Al borrar el padre se borran los hijos |
| `asistencias.obra_id` | `obras` | Sin borrado en cascada |
| `adelantos.trabajador_id` | `trabajadores` | Al borrar el padre se borran los hijos |

```
obras  ──<  asistencias
trabajadores  ──<  asistencias, adelantos
asistencias
adelantos
planillas
```

## 3. Detalle por tabla

### 3.1 `obras`

Cada obra o frente de trabajo.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `direccion` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí direccion» |

**Consultas base** (en `src/db/obras.ts`):

```ts
listar(): Promise<Obra[]>            // SELECT * FROM obras ORDER BY id DESC
obtener(id: number): Promise<Obra | null>   // SELECT * FROM obras WHERE id = ?
crear(datos: NuevoObra): Promise<number>   // INSERT INTO obras (nombre, direccion) VALUES (?, ?)
actualizar(id: number, datos: NuevoObra): Promise<void>   // UPDATE obras SET nombre = ?, direccion = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM obras WHERE id = ?
```

### 3.2 `trabajadores`

Personal con su jornal diario y la obra asignada.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `telefono` | TEXT → `string \| null` | Teléfono | Opcional; Solo dígitos, 7 a 15 caracteres (se ignoran espacios y guiones) | «Teléfono no válido» |
| `jornal_diario` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales | «Ingresá un monto mayor a 0» |

**Consultas base** (en `src/db/trabajadores.ts`):

```ts
listar(): Promise<Trabajador[]>            // SELECT * FROM trabajadores ORDER BY id DESC
obtener(id: number): Promise<Trabajador | null>   // SELECT * FROM trabajadores WHERE id = ?
crear(datos: NuevoTrabajador): Promise<number>   // INSERT INTO trabajadores (nombre, telefono, jornal_diario) VALUES (?, ?, ?)
actualizar(id: number, datos: NuevoTrabajador): Promise<void>   // UPDATE trabajadores SET nombre = ?, telefono = ?, jornal_diario = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM trabajadores WHERE id = ?
```

### 3.3 `asistencias`

Una fila por trabajador por día con su estado.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `trabajador_id` | INTEGER → `number` | Selector de trabajadores | Obligatorio; Debe existir en `trabajadores` | «Elegí un registro» |
| `obra_id` | INTEGER → `number \| null` | Selector de obras | Opcional; Debe existir en `obras` | «Elegí un registro» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `horas` | REAL → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales; Valor inicial `8` | «Ingresá un número válido» |
| `estado` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `presente`, `falta`, `medio_dia`; Valor inicial `presente` | «Elegí una opción» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_asistencias_trabajador_id ON asistencias(trabajador_id);
CREATE INDEX IF NOT EXISTS idx_asistencias_obra_id ON asistencias(obra_id);
CREATE INDEX IF NOT EXISTS idx_asistencias_fecha ON asistencias(fecha);
CREATE INDEX IF NOT EXISTS idx_asistencias_estado ON asistencias(estado);
```

**Consultas base** (en `src/db/asistencias.ts`):

```ts
listar(): Promise<Asistencia[]>            // SELECT * FROM asistencias ORDER BY id DESC
obtener(id: number): Promise<Asistencia | null>   // SELECT * FROM asistencias WHERE id = ?
crear(datos: NuevoAsistencia): Promise<number>   // INSERT INTO asistencias (trabajador_id, obra_id, fecha, horas, estado) VALUES (?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoAsistencia): Promise<void>   // UPDATE asistencias SET trabajador_id = ?, obra_id = ?, fecha = ?, horas = ?, estado = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM asistencias WHERE id = ?
listarPorTrabajador(trabajador_id: number): Promise<Asistencia[]>   // WHERE trabajador_id = ?
listarPorObra(obra_id: number): Promise<Asistencia[]>   // WHERE obra_id = ?
```

### 3.4 `adelantos`

Dinero adelantado o descontado a un trabajador.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `trabajador_id` | INTEGER → `number` | Selector de trabajadores | Obligatorio; Debe existir en `trabajadores` | «Elegí un registro» |
| `monto` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales | «Ingresá un monto mayor a 0» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `nota` | TEXT → `string \| null` | Texto largo | Opcional; Hasta 280 caracteres | «Máximo 280 caracteres» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_adelantos_trabajador_id ON adelantos(trabajador_id);
CREATE INDEX IF NOT EXISTS idx_adelantos_fecha ON adelantos(fecha);
```

**Consultas base** (en `src/db/adelantos.ts`):

```ts
listar(): Promise<Adelanto[]>            // SELECT * FROM adelantos ORDER BY id DESC
obtener(id: number): Promise<Adelanto | null>   // SELECT * FROM adelantos WHERE id = ?
crear(datos: NuevoAdelanto): Promise<number>   // INSERT INTO adelantos (trabajador_id, monto, fecha, nota) VALUES (?, ?, ?, ?)
actualizar(id: number, datos: NuevoAdelanto): Promise<void>   // UPDATE adelantos SET trabajador_id = ?, monto = ?, fecha = ?, nota = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM adelantos WHERE id = ?
listarPorTrabajador(trabajador_id: number): Promise<Adelanto[]>   // WHERE trabajador_id = ?
```

### 3.5 `planillas`

Cierres semanales con el total pagado.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `desde` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `hasta` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `total` | REAL → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales | «Ingresá un número válido» |

**Consultas base** (en `src/db/planillas.ts`):

```ts
listar(): Promise<Planilla[]>            // SELECT * FROM planillas ORDER BY id DESC
obtener(id: number): Promise<Planilla | null>   // SELECT * FROM planillas WHERE id = ?
crear(datos: NuevoPlanilla): Promise<number>   // INSERT INTO planillas (desde, hasta, total) VALUES (?, ?, ?)
actualizar(id: number, datos: NuevoPlanilla): Promise<void>   // UPDATE planillas SET desde = ?, hasta = ?, total = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM planillas WHERE id = ?
```

## 4. Tipos TypeScript

Copiar a `src/db/tipos.ts`:

```ts
export interface Obra {
  id: number;
  nombre: string;
  direccion: string | null;
}
export type NuevoObra = Omit<Obra, 'id'>;

export interface Trabajador {
  id: number;
  nombre: string;
  telefono: string | null;
  jornal_diario: number;
}
export type NuevoTrabajador = Omit<Trabajador, 'id'>;

export interface Asistencia {
  id: number;
  trabajador_id: number;
  obra_id: number | null;
  fecha: string;
  horas: number;
  estado: string;
}
export type NuevoAsistencia = Omit<Asistencia, 'id'>;

export interface Adelanto {
  id: number;
  trabajador_id: number;
  monto: number;
  fecha: string;
  nota: string | null;
}
export type NuevoAdelanto = Omit<Adelanto, 'id'>;

export interface Planilla {
  id: number;
  desde: string;
  hasta: string;
  total: number;
}
export type NuevoPlanilla = Omit<Planilla, 'id'>;

```

## 5. Valores permitidos (enumeraciones)

SQLite no tiene tipo enumerado: se valida en la capa de datos y se muestra con la etiqueta de la tabla.

**`asistencias.estado`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `presente` | Presente |
| `falta` | Falta |
| `medio_dia` | Medio dia |

```ts
export const ASISTENCIAS_ESTADO = ['presente', 'falta', 'medio_dia'] as const;
```

## 6. Migraciones

Migración 1 = esquema inicial (ya en `src/db/schema.ts`). Cada cambio posterior es una migración nueva al final de la lista; nunca se edita una ya publicada.

| Versión | Fase | Motivo |
|---|---|---|
| 2 | 4 | Factor de horas extra y día de inicio de semana. |

**Migración 2** (fase 4)

```sql
CREATE TABLE ajustes (clave TEXT PRIMARY KEY, valor TEXT NOT NULL);
```

## 7. Esquema inicial completo

```sql
CREATE TABLE obras (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, direccion TEXT);
CREATE TABLE trabajadores (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, telefono TEXT, jornal_diario REAL NOT NULL);
CREATE TABLE asistencias (id INTEGER PRIMARY KEY AUTOINCREMENT, trabajador_id INTEGER NOT NULL REFERENCES trabajadores(id) ON DELETE CASCADE, obra_id INTEGER REFERENCES obras(id) ON DELETE SET NULL, fecha TEXT NOT NULL, horas REAL NOT NULL DEFAULT 8, estado TEXT NOT NULL DEFAULT 'presente');
CREATE TABLE adelantos (id INTEGER PRIMARY KEY AUTOINCREMENT, trabajador_id INTEGER NOT NULL REFERENCES trabajadores(id) ON DELETE CASCADE, monto REAL NOT NULL, fecha TEXT NOT NULL, nota TEXT);
CREATE TABLE planillas (id INTEGER PRIMARY KEY AUTOINCREMENT, desde TEXT NOT NULL, hasta TEXT NOT NULL, total REAL NOT NULL);
```

## 8. Reglas de integridad que NO delega a la base

- **RN-01** El jornal diario es un monto por trabajador y se paga completo por día «presente».
- **RN-02** Medio día paga el 50% del jornal; falta paga 0.
- **RN-03** Las horas extra se pagan como (jornal ÷ 8) × 1,5 por hora, salvo que el usuario configure otro factor en Ajustes.
- **RN-04** Solo puede haber una asistencia por trabajador por día; volver a marcar la reemplaza.
- **RN-05** Pago neto semanal = suma de días pagados + horas extra − adelantos y descuentos de la semana.
- **RN-06** Si el neto es negativo, queda un saldo a favor de la obra que se arrastra a la semana siguiente.
- **RN-07** Una planilla cerrada no se edita; si hay un error se registra un ajuste en la semana siguiente.
- **RN-08** Los descuentos se registran en la misma tabla adelantos, con la nota «descuento»; ambos restan del pago semanal.

Estas reglas se implementan en `src/lib/` como funciones puras y se prueban de forma automática (ver [PRUEBAS.md](PRUEBAS.md)).
