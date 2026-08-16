# BLUEPRINT: Dashboard Financiero Corporativo

## 1. Visión General y Propósito

**Finora** es una SPA de gestión financiera B2B para analizar liquidez, flujo de caja, centros de coste, previsiones, presupuestos y resultados operativos. El objetivo es ofrecer una visión ejecutiva clara con datos mock-first, cálculos financieros testeables y una arquitectura preparada para un modelo MySQL 8.4.

## 2. Decisiones Técnicas y Diferenciales

1. **Frontend:** React 19 + TypeScript + Vite 8 + Tailwind CSS v4.
2. **Estado:** Zustand 5 con selectores enfocados para datos de dashboard y filtros.
3. **Visualización:** Recharts 3 para gráficos compuestos de flujo y distribución.
4. **Tablas:** TanStack Table v8 para ordenamiento, subfilas y paginación.
5. **Fechas y calidad:** date-fns v4, Vitest, React Testing Library, Oxlint, Prettier y Husky.
6. **Modelo de datos:** MySQL 8.4 documentado en `database/`, sin conexión real en la primera fase.

## 3. Modelo Financiero

- `accounts`: cuentas corrientes, ahorro e inversión.
- `cost_centers`: centros de coste y códigos internos.
- `categories`: categorías de ingresos y gastos.
- `transactions`: movimientos, estado, método de pago y fecha.
- `budgets`: presupuesto mensual por categoría.

## 4. Milestones y Desglose de Issues

### 🏗️ Milestone 1 — Project Foundation (1/3)

- [x] **Issue #1:** `Set up initial project structure`
- [ ] **Issue #13:** `Configure domain selectors and financial store`
- [ ] **Issue #14:** `Implement account and category management views`

### ⚙️ Milestone 2 — Core Features (0/9)

- [ ] **Issue #2:** `Model financial domain data and mock fixtures`
- [ ] **Issue #3:** `Build executive metrics overview`
- [ ] **Issue #4:** `Implement cash flow projection chart`
- [ ] **Issue #5:** `Implement cost center breakdown`
- [ ] **Issue #6:** `Implement financial transactions table`
- [ ] **Issue #7:** `Build management income statement report`
- [ ] **Issue #8:** `Add budget versus actual analysis`
- [ ] **Issue #15:** `Add cash flow aggregation and forecast rules`
- [ ] **Issue #16:** `Implement dashboard navigation and view state`

### 🧪 Milestone 3 — Interactions and Quality (0/4)

- [ ] **Issue #9:** `Add financial rules test suite`
- [ ] **Issue #10:** `Audit accessibility and responsive behavior`
- [ ] **Issue #17:** `Add period filters and interaction states`
- [ ] **Issue #18:** `Add CI coverage and test reporting`

### 🚀 Milestone 4 — Documentation and Release (0/2)

- [ ] **Issue #11:** `Prepare documentation and release`
- [ ] **Issue #19:** `Publish screenshots and production release`

## 5. Interfaces Clave

- Visión general ejecutiva.
- Proyección de flujo de caja de 30 días.
- DRE gerencial interactivo.
- Comparativa de presupuesto frente a realizado.
- Tabla analítica de transacciones.
