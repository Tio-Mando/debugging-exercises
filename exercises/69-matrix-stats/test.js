/**
 * Pruebas para: Matrix Stats
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/69-matrix-stats
 */

const {
  rowSums,
  rowAverages,
  rowMins,
  rowMaxs,
  colSums,
  colAverages,
  colMins,
  colMaxs,
  diagonalSum,
  transpose,
  flatten,
  findCells,
  normalize,
  overallStats,
  rowWithHighestSum,
  colWithHighestSum,
  countAbove,
  countBelow,
} = require('./buggy-code');
// } = require('./solution');

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const matrix2 = [
  [10, 20, 30],
  [40, 50, 60],
];

const asymmetric = [
  [3, 1, 4, 1],
  [5, 9, 2, 6],
  [5, 3, 5, 8],
];

describe('Matrix Stats - Calculadora de Estadísticas de Matrices', () => {
  describe('rowSums - sumas por fila', () => {
    test('suma correcta de cada fila en matriz 3x3', () => {
      expect(rowSums(matrix)).toEqual([6, 15, 24]);
    });

    test('suma correcta de cada fila en matriz 2x3', () => {
      expect(rowSums(matrix2)).toEqual([60, 150]);
    });

    test('suma de fila con valores negativos', () => {
      expect(rowSums([[-1, -2, -3]])).toEqual([-6]);
    });
  });

  describe('rowAverages - promedios por fila', () => {
    test('promedio correcto de cada fila en matriz 3x3', () => {
      expect(rowAverages(matrix)).toEqual([2, 5, 8]);
    });

    test('promedio correcto en matriz asimétrica', () => {
      const result = rowAverages(asymmetric);
      expect(result[0]).toBeCloseTo(2.25);
      expect(result[1]).toBeCloseTo(5.5);
      expect(result[2]).toBeCloseTo(5.25);
    });
  });

  describe('rowMins y rowMaxs - mínimos y máximos por fila', () => {
    test('mínimo de cada fila en matriz 3x3', () => {
      expect(rowMins(matrix)).toEqual([1, 4, 7]);
    });

    test('máximo de cada fila en matriz 3x3', () => {
      expect(rowMaxs(matrix)).toEqual([3, 6, 9]);
    });

    test('mínimos en matriz asimétrica', () => {
      expect(rowMins(asymmetric)).toEqual([1, 2, 3]);
    });

    test('máximos en matriz asimétrica', () => {
      expect(rowMaxs(asymmetric)).toEqual([4, 9, 8]);
    });
  });

  describe('colSums - sumas por columna', () => {
    test('suma correcta de cada columna en matriz 3x3', () => {
      expect(colSums(matrix)).toEqual([12, 15, 18]);
    });

    test('suma correcta de cada columna en matriz 2x3', () => {
      expect(colSums(matrix2)).toEqual([50, 70, 90]);
    });
  });

  describe('colAverages - promedios por columna', () => {
    test('promedio correcto de cada columna en matriz 3x3', () => {
      expect(colAverages(matrix)).toEqual([4, 5, 6]);
    });

    test('promedio correcto en matriz 2x3', () => {
      expect(colAverages(matrix2)).toEqual([25, 35, 45]);
    });
  });

  describe('colMins y colMaxs - mínimos y máximos por columna', () => {
    test('mínimo de cada columna en matriz 3x3', () => {
      expect(colMins(matrix)).toEqual([1, 2, 3]);
    });

    test('máximo de cada columna en matriz 3x3', () => {
      expect(colMaxs(matrix)).toEqual([7, 8, 9]);
    });

    test('mínimos de columnas en matriz asimétrica', () => {
      expect(colMins(asymmetric)).toEqual([3, 1, 2, 1]);
    });

    test('máximos de columnas en matriz asimétrica', () => {
      expect(colMaxs(asymmetric)).toEqual([5, 9, 5, 8]);
    });
  });

  describe('diagonalSum - suma de la diagonal principal', () => {
    test('suma diagonal de matriz 3x3', () => {
      expect(diagonalSum(matrix)).toBe(15); // 1 + 5 + 9
    });

    test('suma diagonal de matriz 1x1', () => {
      expect(diagonalSum([[42]])).toBe(42);
    });

    test('suma diagonal de otra matriz 3x3', () => {
      expect(diagonalSum([[2, 0, 0], [0, 3, 0], [0, 0, 4]])).toBe(9);
    });
  });

  describe('transpose - transposición de la matriz', () => {
    test('transpuesta de matriz 3x3', () => {
      expect(transpose(matrix)).toEqual([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ]);
    });

    test('transpuesta de matriz 2x3 produce matriz 3x2', () => {
      expect(transpose(matrix2)).toEqual([
        [10, 40],
        [20, 50],
        [30, 60],
      ]);
    });
  });

  describe('flatten - aplanar la matriz a un arreglo 1D', () => {
    test('aplanar matriz 3x3 en orden fila por fila', () => {
      expect(flatten(matrix)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test('aplanar matriz 2x3', () => {
      expect(flatten(matrix2)).toEqual([10, 20, 30, 40, 50, 60]);
    });
  });

  describe('findCells - encontrar celdas que cumplen una condición', () => {
    test('encontrar celdas mayores a 5 en matriz 3x3', () => {
      const result = findCells(matrix, v => v > 5);
      expect(result).toEqual([
        { row: 1, col: 2, value: 6 },
        { row: 2, col: 0, value: 7 },
        { row: 2, col: 1, value: 8 },
        { row: 2, col: 2, value: 9 },
      ]);
    });

    test('encontrar celdas pares en matriz 3x3', () => {
      const result = findCells(matrix, v => v % 2 === 0);
      expect(result).toEqual([
        { row: 0, col: 1, value: 2 },
        { row: 1, col: 0, value: 4 },
        { row: 1, col: 2, value: 6 },
        { row: 2, col: 1, value: 8 },
      ]);
    });
  });

  describe('normalize - normalizar valores al rango 0-1', () => {
    test('normalizar matriz 3x3 con valores del 1 al 9', () => {
      const result = normalize(matrix);
      expect(result[0][0]).toBeCloseTo(0);      // mínimo
      expect(result[2][2]).toBeCloseTo(1);      // máximo
      expect(result[1][1]).toBeCloseTo(0.5);    // valor medio (5)
    });

    test('la forma de la matriz normalizada se preserva', () => {
      const result = normalize(matrix);
      expect(result).toHaveLength(3);
      result.forEach(row => expect(row).toHaveLength(3));
    });

    test('todos los valores normalizados están entre 0 y 1', () => {
      const result = normalize(asymmetric);
      result.forEach(row =>
        row.forEach(v => {
          expect(v).toBeGreaterThanOrEqual(0);
          expect(v).toBeLessThanOrEqual(1);
        })
      );
    });
  });

  describe('overallStats - estadísticas globales', () => {
    test('estadísticas globales correctas en matriz 3x3', () => {
      const stats = overallStats(matrix);
      expect(stats.min).toBe(1);
      expect(stats.max).toBe(9);
      expect(stats.mean).toBe(5);
      expect(stats.median).toBe(5);
    });

    test('estadísticas globales en matriz 2x3', () => {
      const stats = overallStats(matrix2);
      expect(stats.min).toBe(10);
      expect(stats.max).toBe(60);
      expect(stats.mean).toBe(35);
      expect(stats.median).toBe(35);
    });
  });

  describe('rowWithHighestSum y colWithHighestSum', () => {
    test('fila con mayor suma en matriz 3x3 es la fila 2', () => {
      expect(rowWithHighestSum(matrix)).toBe(2);
    });

    test('columna con mayor suma en matriz 3x3 es la columna 2', () => {
      expect(colWithHighestSum(matrix)).toBe(2);
    });

    test('fila con mayor suma en matriz 2x3 es la fila 1', () => {
      expect(rowWithHighestSum(matrix2)).toBe(1);
    });

    test('columna con mayor suma en matriz asimétrica', () => {
      // col sums: [13, 13, 11, 15] → columna 3
      expect(colWithHighestSum(asymmetric)).toBe(3);
    });
  });

  describe('countAbove y countBelow - conteo por umbral', () => {
    test('contar valores por encima de 5 en matriz 3x3', () => {
      expect(countAbove(matrix, 5)).toBe(4); // 6, 7, 8, 9
    });

    test('contar valores por debajo de 5 en matriz 3x3', () => {
      expect(countBelow(matrix, 5)).toBe(4); // 1, 2, 3, 4
    });

    test('contar valores por encima de 30 en matriz 2x3', () => {
      expect(countAbove(matrix2, 30)).toBe(3); // 40, 50, 60
    });

    test('contar valores por debajo de 20 en matriz 2x3', () => {
      expect(countBelow(matrix2, 20)).toBe(1); // 10
    });
  });
});
