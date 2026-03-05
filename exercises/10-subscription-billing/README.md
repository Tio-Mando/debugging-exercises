# Sistema de Gestión de Suscripciones

**Tipo**: Error Lógico

## Historia de Usuario

Como administrador de una plataforma SaaS, necesito un módulo de facturación de suscripciones que calcule correctamente los montos prorrateados, los reembolsos por cancelación anticipada y los descuentos aplicados, para garantizar que los usuarios sean cobrados o reembolsados con exactitud.

## Criterios de Aceptación

- `calculateProration` debe calcular el valor diario usando la duración real del ciclo de facturación
- `calculateCancellationRefund` debe reembolsar el valor correspondiente a los días **restantes** del período, no a los días ya consumidos
- `applyDiscounts` debe sumar todos los descuentos y aplicarlos en una sola operación sobre el precio base (comportamiento aditivo)
- Todas las funciones deben manejar correctamente los casos límite: períodos vencidos, sin descuentos, o parámetros inválidos

## Problema Reportado

El equipo de soporte ha recibido reclamos de clientes que:

1. Al cancelar su suscripción trimestral a mitad del período, el monto reembolsado no corresponde a los días que les quedaban, sino a una cantidad diferente e incorrecta.
2. Los clientes con planes anuales o trimestrales reciben facturas prorrateadas con montos que no concuerdan con su precio diario real.
3. Cuando se combinan dos cupones de descuento, el precio final no coincide con aplicar la suma de ambos porcentajes; el descuento efectivo es siempre menor al esperado.

**Ejemplos del problema**:

- Con un plan trimestral de $90 cancelado a los 30 días, se espera un reembolso de $60 (60 días restantes) pero el sistema devuelve un monto incorrecto
- Con un plan anual de $365, prorratear 73 días debería dar $73, pero el sistema calcula un valor diferente
- Con dos descuentos del 10% y 20% sobre $100, se espera pagar $70, pero el sistema cobra $72

## Archivos

- `buggy-code.js` - Código con los errores
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Como Verificar la Solución

```bash
npm test exercises/10-subscription-billing
```

Todas las pruebas deben pasar para considerar los errores corregidos.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas los errores, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 20-35 minutos
