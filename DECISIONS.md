# Registro de Decisiones de Arquitectura (ADR) — Finora

## ADR 001: SPA React con datos mock-first

- **Contexto:** La primera entrega debe validar el dominio financiero y la experiencia visual sin depender de una API externa.
- **Decisión:** Construir una SPA React con fixtures tipados y separar los datos mock de la lógica de presentación.
- **Estado:** Aceptado e implementado parcialmente en la Issue #1.

## ADR 002: Estado global con Zustand

- **Contexto:** Los filtros, el periodo de análisis y los datos agregados deben ser accesibles por diferentes módulos del dashboard.
- **Decisión:** Usar Zustand 5 con stores por dominio y selectores pequeños, evitando prop drilling.
- **Estado:** Aceptado; implementación prevista para las Issues #2–#8.

## ADR 003: Visualización con Recharts

- **Contexto:** El dashboard requiere gráficos de flujo de caja y distribución de costes que respondan a filtros de periodo.
- **Decisión:** Usar Recharts 3 con datos agregados en funciones puras y componentes de visualización desacoplados.
- **Estado:** Aceptado e implementado inicialmente en la Issue #1.

## ADR 004: Modelo SQL teórico independiente

- **Contexto:** El blueprint define MySQL 8.4, pero la primera versión del producto es una SPA mock-first.
- **Decisión:** Documentar el esquema relacional en `database/` y posponer la conexión real hasta que exista una API definida.
- **Estado:** Aceptado; implementación prevista en la fase de datos.

## ADR 005: Calidad como parte del producto

- **Contexto:** Los cálculos de margen, beneficio, previsión y variación pueden producir errores silenciosos.
- **Decisión:** Mantener las reglas financieras en funciones puras y cubrirlas con Vitest antes de la release.
- **Estado:** Aceptado; implementación prevista en la Issue #9.
