# Calculadora de Rutas de Entrega

**Tipo**: Error Lógico

## Historia de Usuario

Como gerente de logística, necesito que el sistema calcule la distancia total real de cada ruta de entrega incluyendo el regreso al depósito, para estimar correctamente el consumo de combustible y el tiempo de cada conductor.

## Criterios de Aceptación

- `calculateRouteDistance()` debe incluir todos los tramos: depósito → parada1 → parada2 → ... → depósito
- La ruta siempre termina en el depósito donde inició
- Con una sola parada, la distancia total es la ida más el regreso (el doble del tramo)
- Las coordenadas de las direcciones se obtienen desde Nominatim OpenStreetMap

## Problema Reportado

Los conductores reportan que el tiempo de sus rutas es casi el doble de lo estimado por el sistema. El cálculo de combustible tampoco cuadra al final del día. Una ruta con una sola parada debería calcular la distancia de ida y vuelta, pero el sistema solo calcula el tramo de ida.

**Ejemplos del problema**:

- Ruta de 1 parada a 100 km del depósito → se espera distancia total 200 km, el sistema retorna 100 km
- Ruta depósito(0,0) → parada(0,3) → depósito(0,0) → se espera ≈ 666 km, el sistema retorna ≈ 333 km
- Ruta con 2 paradas omite el último tramo de regreso al depósito

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar la Solución

```bash
npm test exercises/27-delivery-route
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
