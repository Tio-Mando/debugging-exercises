# Motor de Recomendación de Libros

**Tipo**: Error Lógico

## Historia de Usuario

Como lectora ávida, necesito que el sistema me recomiende libros según mis temas de interés, ordenados por qué tan bien cubren mis preferencias, para descubrir lecturas relevantes y no perder tiempo en libros que no me interesan.

## Criterios de Aceptación

- El score de relevancia debe medir cuántos de los intereses del usuario cubre el libro
- Un libro que coincide con los 3 intereses del usuario debe tener score 1.0
- Un libro que coincide con 1 de 3 intereses debe tener score 0.33, sin importar cuántos temas tenga en total
- Los libros se obtienen por temática desde Open Library API sin API key

## Problema Reportado

El sistema recomienda primero libros con muy pocos temas sobre libros que cubren más intereses del usuario. Un libro con solo el tema "ficción" aparece con score 100% y se muestra antes que un libro con 5 temas que incluye los 3 intereses del usuario (ficción, misterio, thriller), el cual aparece con score 60%.

**Ejemplos del problema**:

- Libro con temas `['fiction']`, usuario interesa en `['fiction', 'mystery', 'thriller']` → se espera score 0.33, el sistema retorna 1.0
- Libro con temas `['fiction', 'mystery', 'thriller', 'crime', 'suspense']`, mismos intereses → se espera score 1.0, el sistema retorna 0.6
- El libro con 1 tema aparece primero que el libro con 3 coincidencias

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar la Solución

```bash
npm test exercises/25-book-recommender
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
