ccd# Sistema de Venta de Tickets para Eventos

**Tipo**: Error Lógico

## Historia de Usuario

Como coordinadora de eventos corporativos, necesito que el sistema aplique el descuento de grupo cuando compro exactamente el mínimo de tickets requerido, para aprovechar la tarifa grupal al organizar asistencia de mi equipo.

## Criterios de Aceptación

- El descuento de grupo del 15% debe aplicarse cuando se compran `GROUP_MIN` tickets o más
- Comprar exactamente `GROUP_MIN` tickets debe activar el descuento
- El descuento early bird del 10% aplica con 30 o más días de anticipación
- Se aplica el mejor descuento disponible (no se acumulan)
- El catálogo de eventos se obtiene desde JSONPlaceholder API

## Problema Reportado

Una empresa que compra exactamente 10 tickets (el mínimo establecido para descuento grupal) no recibe el 15% de descuento. Solo los grupos que compran 11 tickets o más obtienen el beneficio, lo que contradice la política de descuentos definida.

**Ejemplos del problema**:

- Compra de exactamente 10 tickets a $100 c/u → se espera total $850 (15% off), el sistema cobra $1000
- Compra de 10 tickets a $80 c/u → se espera descuento de $120, el sistema aplica $0 de descuento
- Con 9 tickets no debe aplicar descuento → correcto en ambos casos

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar la Solución

```bash
npm test exercises/21-event-ticketing
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-15 minutos
