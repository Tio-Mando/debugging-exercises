# Motor de Precios de Transporte Compartido

**Tipo**: Error Lógico

## Historia de Usuario

Como pasajero de una app de transporte compartido, necesito que el precio de mi viaje refleje correctamente el multiplicador de alta demanda (surge), para entender cuánto pagaré durante horas pico y no recibir cobros incorrectos.

## Criterios de Aceptación

- La tarifa base, la tarifa por distancia y la tarifa por tiempo se suman para obtener el subtotal
- El multiplicador de surge pricing debe aplicarse sobre el total del viaje
- Sin surge (multiplicador = 1.0), la tarifa debe ser idéntica al subtotal
- Las coordenadas del origen y destino se obtienen desde Nominatim OpenStreetMap

## Problema Reportado

Durante horas de alta demanda con un multiplicador de 2x, los usuarios reportan que el precio de su viaje casi no aumenta respecto al precio normal. Un viaje de 10 km y 15 minutos debería costar $36.50 con surge de 2x, pero el sistema cobra $20.75.

**Ejemplos del problema**:

- Viaje: 10 km, 15 min, surge 2x → se espera $36.50, el sistema retorna $20.75
- Viaje: 5 km, 10 min, surge 2x → se espera $22.00, el sistema retorna $14.50
- Viaje: 8 km, 20 min, surge 3x → se espera $51.30, el sistema retorna $24.10

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar la Solución

```bash
npm test exercises/18-rideshare-pricing
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
