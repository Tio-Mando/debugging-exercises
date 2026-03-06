# Ejercicio 37 - Poker Hand Ranker

**Tipo:** Error Lógico

## Historia de Usuario

Como desarrollador de un juego de póker en línea, necesito un módulo que clasifique manos de 5 cartas correctamente para determinar el ganador de cada ronda.

## Criterios de Aceptación

- `rankHand(hand)` recibe un arreglo de 5 cartas (cada carta es una cadena como `"7H"`, `"KS"`) y devuelve el nombre del ranking.
- Rankings soportados: `high_card`, `one_pair`, `two_pair`, `three_of_a_kind`, `full_house`, `four_of_a_kind`.
- Un **full house** requiere exactamente un trío y un par al mismo tiempo.
- Un **trío** (sin par adicional) no debe clasificarse como full house.

## Problema Reportado

Los jugadores reportan que cualquier mano con tres cartas iguales aparece como "full house", incluso cuando no tiene un par adicional. Esto entrega puntuaciones incorrectas y arruina las partidas.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `buggy-code.js` | Código con el bug a corregir |
| `solution.js` | Solución correcta con comentario `// CORREGIDO:` |
| `test.js` | Pruebas Jest (importa `buggy-code.js` por defecto) |

## Cómo Verificar

```bash
# Ver los errores
npm test exercises/37-poker-hand-ranker

# Verificar tu solución
# Cambia el import en test.js a solution.js y ejecuta de nuevo
npm test exercises/37-poker-hand-ranker
```

## Nivel de Dificultad

**Intermedio** — Requiere identificar que una condición con `||` lógico es incorrecta cuando la lógica del dominio exige que ambas condiciones sean verdaderas simultáneamente (`&&`).
