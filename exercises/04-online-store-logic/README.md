# Lógica de Tienda Online

**Tipo**: Error Lógico / Error de Ejecución

## 📋 Historia de Usuario

Como desarrollador web de una plataforma de E-commerce, necesito implementar las funciones principales del motor de ventas para gestionar carritos de compra, aplicar descuentos, calcular impuestos y determinar costos de envío, asegurando que la experiencia del cliente sea precisa y libre de errores.

## 🎯 Criterios de Aceptación

- **Subtotal**: Debe sumar correctamente el precio por la cantidad de todos los productos. Debe manejar carritos vacíos devolviendo 0.
- **Cupones**: Debe aplicar descuentos basados en códigos (`SUMMER10` para 10%, `WELCOME20` para 20%). Debe ser insensible a mayúsculas/minúsculas.
- **Impuestos**: Debe calcular el monto exacto del impuesto basado en un porcentaje.
- **Envío**: El envío es gratis para miembros Premium. Para usuarios normales, cuesta $25 si el peso es igual o mayor a 10kg, y $10 si es menor.
- **Carrito**:
  - `addItem`: Debe añadir nuevos productos o incrementar la cantidad si ya existen. **Importante**: No debe modificar el array original (inmutabilidad).
  - `removeItem`: Debe eliminar un producto por ID sin modificar el array original.
- **Resumen**: Debe mostrar un mensaje formateado con el total incluyendo siempre dos decimales (ej. $10.00).

## 🐛 Problema Reportado

Varios clientes y administradores han reportado errores graves en el flujo de compra:

1. Al vaciar el carrito, el sistema a veces se bloquea o lanza errores.
2. Los cupones de descuento no funcionan si el cliente los escribe en minúsculas.
3. El cálculo de impuestos está sumando montos extraños en lugar de calcular el porcentaje.
4. Se está cobrando la tarifa de envío barata a paquetes que pesan exactamente 10kg.
5. Los productos se duplican en el carrito en lugar de sumarse, o peor, el carrito original cambia de forma inesperada.
6. Al eliminar un producto, el carrito se corrompe o devuelve datos inválidos.
7. Los precios en el resumen final no muestran los centavos correctamente.

**Ejemplos del problema**:

- `calculateTax(100, 21)` devuelve `100.21` en lugar de `21`.
- `addItem` modifica el array que se le pasa por parámetro, causando errores en otras partes de la app.
- El resumen muestra `$45.5` cuando debería mostrar `$45.50`.

## 📂 Archivos

- `buggy-code.js` - Lógica con los 7 errores de implementación.
- `test.js` - Pruebas para validar cada función.
- `solution.js` - Solución de referencia.

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/04-online-store-logic
```

## ⚙️ Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 20-30 minutos
