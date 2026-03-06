# Seguimiento de Portafolio de Criptomonedas

**Tipo**: Error Lógico

## Historia de Usuario

Como inversor de criptomonedas, necesito un sistema que registre mis compras y calcule el costo promedio por unidad de cada activo, para entender cuánto me cuesta en promedio cada moneda y evaluar si estoy en ganancia o pérdida.

## Criterios de Aceptación

- El sistema debe registrar múltiples transacciones de compra por activo
- `getAverageCost()` debe retornar el costo promedio ponderado por unidad (total invertido / total unidades)
- `getProfitLoss(currentPrice)` debe calcular correctamente la ganancia o pérdida
- `Portfolio.getSummary(prices)` debe mostrar un resumen correcto de todos los activos
- Los precios actuales se obtienen en tiempo real desde CoinGecko API

## Problema Reportado

Un inversor compró Bitcoin en dos momentos distintos: primero 1 unidad a $100 y luego 3 unidades a $200. El sistema reporta un costo promedio de $350 por unidad, pero el inversor calcula manualmente que debería ser $175 por unidad.

**Ejemplos del problema**:

- Compra 1: 1 unidad a $100 y Compra 2: 3 unidades a $200 → se espera costo promedio de $175, pero el sistema retorna $350
- Compra 1: 2 unidades a $50 y Compra 2: 2 unidades a $150 → se espera costo promedio de $100, pero el sistema retorna $100 en este caso particular (pista: depende de los datos)
- Compra de 9 unidades a $40000 y 1 unidad a $60000 → se espera $42000, pero el sistema retorna $50000

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar la Solución

```bash
npm test exercises/17-crypto-portfolio-tracker
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
