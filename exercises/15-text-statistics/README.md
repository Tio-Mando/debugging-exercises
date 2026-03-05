# Estadísticas de Texto

**Tipo**: Error Lógico

## Historia de Usuario

Como desarrollador de una herramienta de análisis de contenido, necesito un módulo que procese textos y calcule métricas de legibilidad para ayudar a escritores a mejorar la calidad de sus artículos.

## Criterios de Aceptación

- `countWords` debe contar correctamente las palabras ignorando espacios múltiples entre ellas
- `getAverageWordLength` debe dividir la longitud total entre el número de palabras, no entre el número de oraciones
- `getMostFrequentWord` debe tratar mayúsculas y minúsculas como la misma palabra (case-insensitive)
- Todas las funciones deben retornar `0` o `null` para textos vacíos o solo con espacios

## Problema Reportado

El módulo produce métricas incorrectas que confunden a los usuarios de la herramienta.

**Ejemplos del problema**:

- El texto `"hola   mundo"` (con espacios múltiples) retorna `4` palabras en lugar de `2`
- Para `"El gato come"`, la longitud promedio de palabra retorna `10` en lugar de `3.33`
- En el texto `"El gato come. El perro come. El gato duerme."`, la palabra más frecuente retorna `"El"` en lugar de `"el"`, y `"El"` y `"el"` se cuentan como palabras distintas

## Archivos

- `buggy-code.js` - Código con los errores
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Como Verificar la Solución

```bash
npm test exercises/15-text-statistics
```

Todas las pruebas deben pasar para considerar los errores corregidos.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas los errores, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
