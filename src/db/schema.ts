// Cada elemento es una migración. Para cambiar el esquema, AGREGÁ uno nuevo al final;
// nunca edites uno ya publicado.
export const MIGRACIONES: string[] = [
  `CREATE TABLE obras (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, direccion TEXT);
CREATE TABLE trabajadores (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, telefono TEXT, jornal_diario REAL NOT NULL);
CREATE TABLE asistencias (id INTEGER PRIMARY KEY AUTOINCREMENT, trabajador_id INTEGER NOT NULL REFERENCES trabajadores(id) ON DELETE CASCADE, obra_id INTEGER REFERENCES obras(id) ON DELETE SET NULL, fecha TEXT NOT NULL, horas REAL NOT NULL DEFAULT 8, estado TEXT NOT NULL DEFAULT 'presente');
CREATE TABLE adelantos (id INTEGER PRIMARY KEY AUTOINCREMENT, trabajador_id INTEGER NOT NULL REFERENCES trabajadores(id) ON DELETE CASCADE, monto REAL NOT NULL, fecha TEXT NOT NULL, nota TEXT);
CREATE TABLE planillas (id INTEGER PRIMARY KEY AUTOINCREMENT, desde TEXT NOT NULL, hasta TEXT NOT NULL, total REAL NOT NULL);`,
];

export const TABLAS = ['obras', 'trabajadores', 'asistencias', 'adelantos', 'planillas'] as const;
