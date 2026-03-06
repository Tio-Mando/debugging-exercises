# Scrabble Scorer

**Tipo**: Error Lógico

## Historia de Usuario

Como jugador de Scrabble, necesito que el sistema calcule correctamente el puntaje de cada palabra considerando las casillas especiales del tablero, para que el marcador refleje el puntaje real de cada jugada.

## Criterios de Aceptación

- Las casillas DL (doble letra) y TL (triple letra) deben multiplicar solo esa letra
- Las casillas DW (doble palabra) y TW (triple palabra) deben multiplicar el total de la palabra
- Los multiplicadores de palabra deben aplicarse **después** de los multiplicadores de letra
- Múltiples casillas DW deben multiplicarse entre sí (DW+DW = puntaje x4)

## Problema Reportado

Cuando una jugada combina una casilla de letra especial (DL o TL) con una casilla de palabra especial (DW o TW), el puntaje calculado es incorrecto.

**Ejemplos del problema**:

- Palabra CAT con DL en la C y DW en la T debería dar `(3×2 + 1 + 1) × 2 = 16`, pero el sistema retorna `13`
- El error solo aparece cuando se combinan multiplicadores de letra y de palabra en la misma jugada

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar

```bash
npm test exercises/42-scrabble-scorer
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
