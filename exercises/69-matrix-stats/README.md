**Tipo**: Función | **Dificultad**: Intermedio

## Historia de Usuario

Como analista de datos, quiero una librería de funciones que calcule estadísticas completas sobre matrices numéricas 2D, de modo que pueda obtener sumas, promedios, mínimos y máximos por fila y columna, transponer la matriz, normalizarla, encontrar celdas según criterios personalizados y obtener estadísticas globales sin necesidad de herramientas externas.

## Criterios de Aceptación

- `rowSums(matrix)` devuelve un arreglo con la suma de cada fila.
- `rowAverages(matrix)` devuelve un arreglo con el promedio de cada fila.
- `rowMins(matrix)` devuelve un arreglo con el mínimo de cada fila.
- `rowMaxs(matrix)` devuelve un arreglo con el máximo de cada fila.
- `colSums(matrix)` devuelve un arreglo con la suma de cada columna.
- `colAverages(matrix)` devuelve un arreglo con el promedio de cada columna.
- `colMins(matrix)` devuelve un arreglo con el mínimo de cada columna.
- `colMaxs(matrix)` devuelve un arreglo con el máximo de cada columna.
- `diagonalSum(matrix)` devuelve la suma de la diagonal principal.
- `transpose(matrix)` devuelve la matriz transpuesta.
- `flatten(matrix)` devuelve todos los valores en un arreglo 1D, fila por fila.
- `findCells(matrix, predicate)` devuelve objetos `{ row, col, value }` de las celdas que cumplen la condición.
- `normalize(matrix)` escala todos los valores al rango [0, 1].
- `overallStats(matrix)` devuelve `{ min, max, mean, median }` globales.
- `rowWithHighestSum(matrix)` devuelve el índice de la fila con mayor suma.
- `colWithHighestSum(matrix)` devuelve el índice de la columna con mayor suma.
- `countAbove(matrix, threshold)` cuenta los valores estrictamente mayores al umbral.
- `countBelow(matrix, threshold)` cuenta los valores estrictamente menores al umbral.

## Problema Reportado

El equipo de análisis detectó que los resultados de las operaciones sobre columnas son incorrectos. En particular, las sumas de columnas producen el mismo valor para todas las columnas, lo que hace que la identificación de la columna con mayor suma también falle. Las operaciones sobre filas y las estadísticas globales funcionan correctamente.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `buggy-code.js` | Implementación con el error que debes encontrar y corregir |
| `solution.js` | Implementación correcta con el comentario `// CORREGIDO:` |
| `test.js` | Suite de pruebas Jest con 39 casos |

## Cómo Verificar

```bash
# Ver los errores con el código defectuoso
npm test exercises/69-matrix-stats

# Cambiar el import en test.js a solution.js y volver a ejecutar
npm test exercises/69-matrix-stats
```

## Nivel de Dificultad

**Intermedio** — La función con el error es corta y se parece a las demás funciones de la misma familia. El fallo es difícil de detectar a simple vista porque la estructura del código es correcta; solo un valor concreto dentro de un `reduce` está mal.
