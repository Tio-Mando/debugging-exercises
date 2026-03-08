**Tipo**: Clase | **Dificultad**: Intermedio

## Historia de Usuario

Como estudiante que desea aprender con tarjetas de memoria, quiero un sistema
de mazos de flashcards que registre mi rendimiento por tarjeta y me ayude a
identificar qué conceptos necesito repasar, para poder enfocar mi tiempo de
estudio en los temas donde tengo más dificultades.

## Criterios de Aceptación

- Se pueden crear mazos con nombre y agregar tarjetas (pregunta, respuesta, categoría).
- Se lanza error si la pregunta o la respuesta están vacías, o si la pregunta ya existe en el mazo.
- Se puede marcar una tarjeta como correcta (`markCorrect`) o incorrecta (`markIncorrect`), actualizando sus contadores de intentos y aciertos.
- `getSuccessRate(id)` retorna el cociente `correct / attempts` de la tarjeta (0 si no ha sido intentada).
- `getWeakCards(threshold)` retorna las tarjetas con tasa de éxito menor al umbral (por defecto 0.5), excluyendo las que no han sido intentadas.
- `getDueCards()` retorna las tarjetas que aún no están "dominadas" (tasa de éxito < 0.8 o sin intentos).
- `getCategoryStats()` retorna un objeto con estadísticas por categoría: total de tarjetas, total de intentos y promedio de tasa de éxito de las tarjetas de esa categoría.
- `getStats()` retorna estadísticas globales: total de tarjetas, total de intentos, tasa de éxito global y número de tarjetas dominadas.
- `reset()` reinicia los contadores de todas las tarjetas sin eliminarlas.
- `shuffle()` baraja el orden de las tarjetas aleatoriamente.
- `removeCard(id)` elimina la tarjeta indicada; lanza error si el id no existe.
- `getCardsByCategory(category)` retorna solo las tarjetas de la categoría indicada.

## Problema Reportado

El equipo de QA reporta que las estadísticas de rendimiento del sistema son
incorrectas. Específicamente:

- `getSuccessRate` siempre retorna 0, incluso después de marcar respuestas correctas.
- `getWeakCards` clasifica como débiles tarjetas que deberían tener una tasa de éxito alta.
- `getCategoryStats` muestra `averageSuccessRate` de 0 para todas las categorías.
- `getStats` reporta `globalSuccessRate` de 0 y `masteredCards` de 0 aunque algunas tarjetas estén dominadas.

Los tests de creación de tarjetas, eliminación y búsqueda por categoría sí pasan correctamente.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `buggy-code.js` | Implementación con el error que debes encontrar y corregir |
| `solution.js` | Implementación correcta con el comentario `// CORREGIDO:` |
| `test.js` | Suite de pruebas Jest con 38 casos de prueba |

## Cómo Verificar

```bash
# Ejecutar los tests (deben fallar con buggy-code.js)
npx jest exercises/63-flashcard-quiz --no-coverage

# Para verificar tu solución, cambia el import en test.js:
# require('./buggy-code') → require('./solution')
npx jest exercises/63-flashcard-quiz --no-coverage
```

## Nivel de Dificultad

**Intermedio** — El error afecta al registro de aciertos, lo que hace que todos
los cálculos de rendimiento fallen en cascada. La causa raíz es un único cambio
sutil en uno de los métodos de la clase.
