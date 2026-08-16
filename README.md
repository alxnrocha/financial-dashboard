# Finora — Dashboard Financiero Corporativo

[![CI Pipeline](https://github.com/alxnrocha/financial-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/alxnrocha/financial-dashboard/actions)
[![Demo GitHub Pages](https://img.shields.io/badge/Demo-GitHub_Pages-22c55e?style=for-the-badge&logo=github&logoColor=white)](https://alxnrocha.github.io/financial-dashboard/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

**Finora** es una SPA de gestión financiera B2B para equipos directivos que necesitan consultar flujo de caja, centros de coste, previsiones, presupuestos y resultados operativos desde una única vista analítica.

- 🌐 **Demo en Vivo (GitHub Pages):** [https://alxnrocha.github.io/financial-dashboard/](https://alxnrocha.github.io/financial-dashboard/)
- 📦 **Repositorio GitHub:** [https://github.com/alxnrocha/financial-dashboard](https://github.com/alxnrocha/financial-dashboard)

---

## ✨ Características Principales

### 🚀 Experiencia de Usuario & Frontend

- **Visión ejecutiva:** saldo disponible, entradas, salidas, beneficio neto y meses de autonomía.
- **Proyección de flujo de caja:** gráfico interactivo con periodos de tres meses, seis meses y un año.
- **Distribución por centros de coste:** desglose visual de Marketing, I+D, Operaciones, Ventas y G&A.
- **Tabla de transacciones:** búsqueda, filtros, estados de pago y acciones de exportación.
- **Diseño responsive:** experiencia adaptada a escritorio, tablet y dispositivos inferiores a 520px.

### 📊 Dominio Financiero

- Agregaciones por periodo para ingresos, gastos y beneficio operativo.
- Comparativa prevista frente a realizada por categoría.
- Modelo preparado para cuentas, categorías, centros de coste, transacciones y presupuestos.

---

## 🏛️ Estructura del Proyecto

```text
financial-dashboard/
├── .github/workflows/ci.yml       # Pipeline CI de lint, tests y build
├── docs/screenshots/               # Capturas reales del dashboard
├── database/                       # Modelo teórico MySQL 8.4
├── src/
│   ├── components/                 # Layout, UI y módulos financieros
│   ├── data/                       # Fixtures y datos mock-first
│   ├── pages/                      # Vistas principales del dashboard
│   ├── store/                      # Estado global Zustand
│   ├── types/                      # Tipos del dominio financiero
│   ├── utils/                      # Cálculos y agregaciones financieras
│   ├── App.tsx                     # Shell de la aplicación
│   └── styles.css                  # Tokens y estilos responsive
├── index.html                      # Entrada HTML
└── package.json                    # Scripts y dependencias
```

---

## ⚡ Guía de Inicio Rápido

### 1. Clonar e Instalar

```bash
git clone https://github.com/alxnrocha/financial-dashboard.git
cd financial-dashboard
npm install
```

### 2. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

---

## 🧪 Calidad de Código y Pruebas Automatizadas

```bash
# Ejecutar las pruebas unitarias
npm test

# Ejecutar el análisis estático
npm run lint

# Compilar para producción
npm run build
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo [LICENSE](./LICENSE) para más detalles.

**Autor:** [Alexandre Rocha](https://github.com/alxnrocha)
