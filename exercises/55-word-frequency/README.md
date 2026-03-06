# Word Frequency & TF-IDF

**Tipo**: Error Lógico

## Historia de Usuario

Como desarrollador de búsqueda de texto, necesito que el cálculo de TF (frecuencia de término) use el total de palabras del documento como denominador para que los valores sean correctos y la suma de todos los TF sea igual a 1.

## Criterios de Aceptación

- `TF(término) = conteo del término / total de palabras en el documento`
- En "the cat sat on the mat" (6 palabras), `TF("the") = 2/6 ≈ 0.333`
- La suma de todos los TF de un documento debe ser igual a 1
- El denominador debe ser el número total de palabras, no el de palabras únicas

## Problema Reportado

El cálculo de TF usa el número de palabras únicas como denominador en lugar del total de palabras. En documentos con palabras repetidas esto infla todos los valores y la suma de TF supera 1.

**Ejemplos del problema**:

- "the cat sat on the mat": 6 palabras totales, 5 únicas
- `TF("the")` reportado: 2/5 = 0.4 (debería ser 2/6 ≈ 0.333)
- Suma de TF reportada: 1.2 (debería ser 1.0)
- Los scores TF-IDF derivados también quedan incorrectos

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar

```bash
npm test exercises/55-word-frequency
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
