**Tipo**: Función | **Dificultad**: Intermedio

## Historia de Usuario

Como desarrollador de herramientas de procesamiento de lenguaje,
quiero una utilidad que detecte y agrupe anagramas en listas de palabras,
para poder analizar familias léxicas y estadísticas de vocabulario.

## Criterios de Aceptación

- `sortLetters(word)` retorna las letras de una palabra ordenadas alfabéticamente en minúsculas, independientemente de las mayúsculas de la entrada.
- `areAnagrams(wordA, wordB)` retorna `true` si dos palabras son anagramas entre sí (insensible a mayúsculas), y `false` en caso contrario.
- `groupAnagrams(words)` agrupa una lista de palabras en familias de anagramas; cada familia es un arreglo de palabras que son anagramas entre sí.
- `findAnagramsOf(targetWord, wordList)` retorna todas las palabras de la lista que son anagramas de la palabra objetivo, excluyendo la palabra objetivo misma.
- `getLargestAnagramGroup(words)` retorna el grupo de anagramas más grande de la lista; en caso de empate, retorna el primero encontrado.
- `filterWordsWithMinAnagrams(words, minAnagrams)` retorna solo las palabras que tienen al menos `minAnagrams` anagramas dentro de la misma lista (la palabra no cuenta como su propio anagrama).
- `findWordsWithNoAnagrams(words)` retorna las palabras que no tienen ningún anagrama en la lista.
- `getAnagramStats(words)` retorna un objeto con `totalGroups`, `largestGroupSize` y `averageGroupSize`.
- Todas las funciones manejan listas vacías retornando un valor vacío apropiado.

## Problema Reportado

> "El módulo de filtrado de anagramas no se comporta correctamente.
> Al pedir palabras con al menos 2 anagramas, algunas palabras que deberían aparecer no se incluyen en el resultado.
> Además, al pasar el umbral mínimo en cero para obtener todas las palabras, el resultado omite algunas de ellas."

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `buggy-code.js` | Código con el error que debes encontrar y corregir |
| `solution.js` | Implementación correcta con comentario `// CORREGIDO:` |
| `test.js` | Suite de pruebas Jest; importa `buggy-code.js` por defecto |

## Cómo Verificar

```bash
# Ejecutar las pruebas (deben FALLAR con buggy-code.js)
npx jest exercises/68-anagram-finder --no-coverage

# Una vez corregido el error, cambia el require en test.js a './solution'
# y vuelve a ejecutar para confirmar que todas las pruebas pasan
```

## Nivel de Dificultad

**Intermedio** — El error es sutil: afecta una condición de comparación en una sola función, pero provoca fallos en múltiples casos de prueba con distintos valores de umbral. Requiere entender cómo se cuenta el número de anagramas de una palabra dentro de su propio grupo.
