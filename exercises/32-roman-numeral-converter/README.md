# Ejercicio 32 - Roman Numeral Converter

**Tipo:** Error Lógico

## Historia de Usuario

Como desarrollador de una aplicación educativa de historia romana, necesito un módulo que convierta números enteros a numerales romanos y viceversa, respetando las reglas de sustracción del sistema romano.

## Criterios de Aceptación

- `toRoman(num)` convierte enteros del 1 al 3999 a su representación en numeral romano.
- Las reglas de sustracción se aplican correctamente: 4 → `IV`, 9 → `IX`, 40 → `XL`, 90 → `XC`, 400 → `CD`, 900 → `CM`.
- `fromRoman(roman)` convierte numerales romanos de vuelta a enteros.
- Números compuestos como 1994 producen `MCMXCIV`.

## Problema Reportado

El sistema reporta que los numerales romanos que contienen reglas de sustracción son incorrectos. Por ejemplo, 4 produce `IIII` en lugar de `IV`, y 1994 produce `MDCCCCLXXXXIIII` en lugar de `MCMXCIV`.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `buggy-code.js` | Código con el bug a corregir |
| `solution.js` | Solución correcta con comentario `// CORREGIDO:` |
| `test.js` | Pruebas Jest (importa `buggy-code.js` por defecto) |

## Cómo Verificar

```bash
# Ver los errores
npm test exercises/32-roman-numeral-converter

# Verificar tu solución
# Cambia el import en test.js a solution.js y ejecuta de nuevo
npm test exercises/32-roman-numeral-converter
```

## Nivel de Dificultad

**Intermedio** — Requiere entender por qué un algoritmo greedy necesita iterar los valores de mayor a menor y cómo el orden de una tabla de datos afecta el resultado del algoritmo.
