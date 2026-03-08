# Rastreador de Hábitos

**Tipo**: Error Lógico

## 📋 Historia de Usuario

Como usuario que desea mejorar su disciplina diaria, necesito un sistema que registre mis hábitos, calcule rachas de cumplimiento y genere estadísticas de progreso para saber cuán constante soy con mis rutinas.

## 🎯 Criterios de Aceptación

- El sistema debe registrar hábitos con frecuencia diaria o semanal y categoría.
- El sistema debe registrar cumplimientos y calcular la racha actual correctamente.
- El sistema debe calcular la racha más larga histórica de cualquier hábito.
- El sistema debe calcular la tasa de cumplimiento en un período dado de forma precisa.
- El sistema debe identificar hábitos vencidos según la frecuencia del hábito.
- El sistema debe generar un resumen global con el mejor hábito, el peor y la tasa promedio.

## 🐛 Problema Reportado

El sistema de seguimiento de hábitos devuelve tasas de cumplimiento incorrectas. Al calcular el porcentaje de días completados en un período, el resultado siempre sale más alto de lo esperado, como si se estuviese dividiendo entre un número menor al real.

**Ejemplos del problema**:

- Un período de 7 días donde se completaron 7 días debería dar `100%`, pero el sistema devuelve un valor mayor (aprox. `116.67%`).
- Un período de 5 días donde se completaron 3 días debería dar `60%`, pero el sistema entrega aprox. `75%`.
- Al calcular el resumen global (`getStatsSummary`), la tasa promedio heredada es también incorrecta por el mismo error.

## 📂 Archivos

- `buggy-code.js` - Código con los errores
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/64-habit-tracker
```

Todas las pruebas deben pasar para considerar los errores corregidos.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto.
Cuando corrijas los errores, cambia la línea de importación en `test.js` a `solution.js`
para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
