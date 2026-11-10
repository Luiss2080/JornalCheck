<div align="center">

<img src="docs/assets/logo.svg" alt="JornalCheck" width="96" height="96">

# JornalCheck

**Control de jornales de obreros: asistencia, horas, adelantos y planilla semanal en PDF.** Pensado para constructores y maestros de obra, offline.

[🚀 Características](#-características) · [🧰 Stack](#-stack) · [📂 Estructura](#-estructura) · [🔧 Configuración](#-configuración) · [🧪 Pruebas](#-pruebas) · [🤝 Contribuir](#-contribuir) · [📄 Licencia](#-licencia)

</div>

---

## 🚀 Características

- Obras y trabajadores con jornal diario.
- Asistencia diaria por obra (presente, falta, medio día, horas extra).
- Adelantos y descuentos por trabajador.
- Planilla semanal con total a pagar por persona.
- Exportación de la planilla en PDF y CSV.

> Sin servidores, sin suscripciones y sin servicios de pago: todos los datos viven en el dispositivo (SQLite).

## 🧰 Stack

| Capa | Tecnología |
|---|---|
| App | React Native + Expo (TypeScript) |
| Datos | SQLite local (expo-sqlite) |
| Navegación | Expo Router |
| PDF | Generación de PDF (expo-print) |
| Compartir | Hoja de compartir del sistema (expo-sharing), WhatsApp incluido |
| Distribución | APK / EAS Build local |

### Modelo de datos

- `obras` (id, nombre, direccion)
- `trabajadores` (id, nombre, telefono, jornal_diario)
- `asistencias` (id, trabajador_id, obra_id, fecha, horas, estado)
- `adelantos` (id, trabajador_id, monto, fecha, nota)
- `planillas` (id, desde, hasta, total)

El detalle de cada tabla y la política de migraciones están en [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md).

## 🗺️ Roadmap

1. Estructura base y navegación
2. Obras y trabajadores
3. Asistencia diaria
4. Adelantos y planilla semanal
5. PDF y exportación CSV

## 📂 Estructura

```
JornalCheck/
├── app/            # Pantallas y rutas (Expo Router)
├── src/
│   ├── db/         # Esquema, migraciones y consultas SQLite
│   ├── components/ # Componentes reutilizables
│   └── lib/        # Utilidades (formato, CSV)
├── docs/assets/    # Logo y recursos del README
└── .github/        # Plantillas, CI y Dependabot
```

## 🔧 Configuración

**Requisitos:** Node.js 20+ y la app Expo Go (o un emulador).

```bash
git clone https://github.com/Luiss2080/JornalCheck.git
cd JornalCheck
npm install
npx expo start
```

Escaneá el QR con Expo Go para abrir la app en tu teléfono. La base local se crea sola en el primer arranque.

El repositorio está en fase inicial: la estructura, la base de datos y la documentación están listas y la app se construye siguiendo el roadmap.

## 🧪 Pruebas

```bash
npm test
npm run lint
npx tsc --noEmit
```

## 🤝 Contribuir

Leé la [guía de contribución](CONTRIBUTING.md) y el [código de conducta](CODE_OF_CONDUCT.md). Para reportar vulnerabilidades consultá la [política de seguridad](SECURITY.md); para dudas, [SUPPORT.md](SUPPORT.md).

## 📄 Licencia

Distribuido bajo licencia MIT. Consultá [LICENSE](LICENSE).

---

<div align="center">

Hecho por [Luiss2080](https://github.com/Luiss2080)

</div>
