# Optimizador de Lista de Compras

**Tipo**: Error Lógico

## 📋 Historia de Usuario

Como consumidor que desea hacer compras eficientes, necesito un sistema que gestione mi lista de artículos con prioridades, me indique qué puedo comprar dentro de mi presupuesto y me dé estadísticas sobre mis gastos por categoría.

## 🎯 Criterios de Aceptación

- El sistema debe agregar artículos con nombre, cantidad, precio unitario, categoría y prioridad (`high`, `medium`, `low`).
- El sistema debe ordenar los artículos primero por prioridad (`high` primero, `low` último) y luego alfabéticamente por categoría.
- El sistema debe seleccionar artículos dentro de un presupuesto en orden de prioridad (greedy: primero los de mayor prioridad).
- El sistema debe agrupar artículos por categoría y calcular el costo total correctamente.
- El sistema debe encontrar los N artículos más costosos y los artículos por encima o debajo de un umbral de precio.
- El sistema debe generar estadísticas globales de la lista.

## 🐛 Problema Reportado

El ordenamiento de artículos por prioridad está invertido. Al solicitar la lista ordenada por prioridad, los artículos de prioridad `low` aparecen primero y los de `high` aparecen al final, cuando debería ser exactamente al revés.

**Ejemplos del problema**:

- Con artículos de prioridad `high`, `medium` y `low`, el orden devuelto es `low → medium → high` en vez de `high → medium → low`.
- Al usar `getItemsWithinBudget`, los artículos de baja prioridad se seleccionan primero, dejando fuera artículos urgentes de alta prioridad.
- Con presupuesto limitado, un artículo `low` de $5 se incluye antes que un artículo `high` de $10, gastando el presupuesto en lo menos urgente.

## 📂 Archivos

- `buggy-code.js` - Código con los errores
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/70-shopping-list-optimizer
```

Todas las pruebas deben pasar para considerar los errores corregidos.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto.
Cuando corrijas los errores, cambia la línea de importación en `test.js` a `solution.js`
para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
