# Sistema de Evaluación del Mercado Inmobiliario

**Tipo**: Error Lógico

## Historia de Usuario

Como compradora de vivienda, necesito que la plataforma inmobiliaria me muestre el precio mediano del mercado, para entender el precio típico de las propiedades en la zona sin que los valores extremos distorsionen el análisis.

## Criterios de Aceptación

- `getMedianPrice()` debe retornar el valor central de los precios ordenados de menor a mayor
- Con cantidad impar de listados, la mediana es el valor central
- Con cantidad par de listados, la mediana es el promedio de los dos valores centrales
- Los listados de propiedades se obtienen desde JSONPlaceholder API

## Problema Reportado

El precio mediano que muestra el sistema varía según el orden en que se agregan las propiedades al sistema, no según los valores reales de los precios. Con 5 propiedades de precios $100K, $200K, $300K, $400K y $500K (ingresadas en distinto orden), el sistema reporta mediana de $100K en lugar de $300K.

**Ejemplos del problema**:

- Precios [500K, 200K, 100K, 300K, 400K] → se espera mediana 300K, el sistema retorna 100K
- Precios [400K, 100K, 300K, 200K] → se espera mediana 250K, el sistema retorna 300K
- Precios [1000K, 50K, 750K] → se espera mediana 750K, el sistema retorna 50K

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar la Solución

```bash
npm test exercises/26-real-estate-evaluator
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-15 minutos
