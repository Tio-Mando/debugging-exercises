# Discount Engine

**Tipo**: Error Lógico

## Historia de Usuario

Como desarrollador de e-commerce, necesito que el motor de descuentos aplique correctamente los descuentos apilados para que el precio final refleje cada descuento aplicado sobre el precio ya reducido, no sobre el precio original.

## Criterios de Aceptación

- Apilar 10% y 20% sobre $100 debe dar $72: primero $100→$90, luego $90→$72
- El resultado de aplicar descuentos secuencialmente debe ser mayor al de sumar las tasas y aplicarlas una sola vez
- Un único descuento del 25% sobre $200 debe dar $150
- Sin descuentos, el precio no debe cambiar

## Problema Reportado

El sistema aplica los descuentos apilados sumando todas las tasas y aplicándolas de una sola vez al precio original, en lugar de aplicar cada descuento secuencialmente sobre el precio resultante.

**Ejemplos del problema**:

- $100 con 10% + 20% → reporta $70 en lugar de $72 (sobreestima el descuento)
- $100 con 15% + 5% → reporta $80 en lugar de $80.75
- El error favorece al cliente más de lo correcto, generando pérdidas en márgenes

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar

```bash
npm test exercises/53-discount-engine
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-15 minutos
