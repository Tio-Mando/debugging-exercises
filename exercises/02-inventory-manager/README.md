# Gestor de Inventario de Tienda

**Tipo**: Error de Ejecución

## 📋 Historia de Usuario

Como administrador de una tienda, necesito un módulo de gestión de inventario que me permita agregar productos, consultar precios, aplicar descuentos y calcular el valor total del stock, para mantener un control preciso y confiable de mis existencias.

## 🎯 Criterios de Aceptación

- El módulo debe agregar productos al inventario validando que no existan duplicados
- El módulo debe retornar el precio de un producto dado su ID, o lanzar un error si no existe
- El módulo debe aplicar descuentos porcentuales válidos (entre 0% y 100%) sin producir precios negativos
- El módulo debe calcular el valor total del inventario multiplicando precio por cantidad de cada producto
- El módulo debe lanzar errores descriptivos ante entradas inválidas o inesperadas

## 🐛 Problema Reportado

El módulo presenta varios fallos al ejecutarse en producción. Los errores aparecen de forma intermitente y son difíciles de reproducir porque dependen de los datos de entrada.

**Ejemplos del problema**:

- Al consultar el precio de un producto con un ID que no existe, la aplicación lanza un `TypeError: Cannot read properties of undefined (reading 'price')` en lugar de un error descriptivo
- Al aplicar un descuento de `1.5` (150%), el precio resultante es negativo, lo cual no tiene sentido en un contexto comercial
- Al llamar a `getTotalValue(null)` o `getTotalValue(undefined)`, la aplicación lanza un `TypeError: Cannot read properties of null (reading 'length')` en lugar de un error claro

## 📂 Archivos

- `buggy-code.js` - Código con los errores
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/02-inventory-manager
```

Todas las pruebas deben pasar para considerar los errores corregidos.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas los errores, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
