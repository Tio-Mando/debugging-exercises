# Sistema de Subastas

**Tipo**: Error Lógico

## 📋 Historia de Usuario

Como organizador de subastas en línea, necesito un sistema que registre artículos con precio inicial y de reserva, acepte pujas competitivas, cierre subastas y determine si un artículo fue vendido o no alcanzó el precio mínimo esperado.

## 🎯 Criterios de Aceptación

- El sistema debe aceptar solo pujas que superen estrictamente la puja más alta actual o el precio inicial si no hay pujas.
- Al cerrar una subasta, el artículo debe marcarse como vendido si la puja más alta alcanza **o iguala** el precio de reserva.
- El sistema debe registrar el historial de subastas cerradas con el ganador y el precio final.
- El sistema debe calcular estadísticas por postor: total de pujas, artículos ganados y total gastado.
- El sistema debe retornar los mejores postores ordenados por total gastado.
- El sistema debe calcular el total recaudado por todos los artículos vendidos.

## 🐛 Problema Reportado

El sistema de subastas no vende correctamente los artículos cuya puja más alta es exactamente igual al precio de reserva. En esos casos, el artículo debería quedar como vendido, pero el sistema lo reporta como no vendido.

**Ejemplos del problema**:

- Un artículo con precio de reserva `$500` recibe una puja de `$500`. Se espera `sold: true`, pero el sistema devuelve `sold: false`.
- Al calcular el total recaudado, los artículos adjudicados exactamente al precio de reserva no se contabilizan.
- Al consultar estadísticas de un postor que ganó un artículo exactamente al precio de reserva, `itemsWon` aparece como `0` en vez de `1`.

## 📂 Archivos

- `buggy-code.js` - Código con los errores
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/65-auction-system
```

Todas las pruebas deben pasar para considerar los errores corregidos.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto.
Cuando corrijas los errores, cambia la línea de importación en `test.js` a `solution.js`
para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-15 minutos
