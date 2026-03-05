# Gestión de Carrito de Compras (E-Commerce)

**Tipo**: Error Lógico / Error de Ejecución

## 📋 Historia de Usuario

Como cliente de la tienda online, necesito un carrito de compras interactivo donde pueda añadir productos, visualizar el descuento de mis cupones promocionales de manera clara, y conocer exactamente el total que se me cobrará (incluyendo impuestos del 16%), sin sufrir bloqueos al remover productos de mi lista.

## 🎯 Criterios de Aceptación

- La funcionalidad debe permitir **añadir** productos (`addItem`) verificando previamente de forma exhaustiva la disponibilidad de stock acumulada, rechazando sumas que exceden el límite provisto.
- La funcionalidad debe garantizar la **remoción** ininterrumpida de productos (`removeItem`). Si un identificador no se encuentra presente, debe indicarse debidamente en vez de detener abruptamente el entorno ("crash").
- Se deben poder aplicar cupones promocionales mediante `applyCoupon` corroborando la vigencia. Las validaciones de fechas deben ser lo suficientemente precisas e independientes del formato local aportado.
- La función `calculateTotals` es la gema central del sistema: debe considerar el IVA aplicado rigurosamente **al subtotal posterior al descuento**, y en todos los casos ofrecer seguridad ante la inexactitud decimal inherente al entorno (`Floating-Point Arithmetic Error`).

## 🐛 Problema Reportado

Nuestros analistas han identificado pérdidas monetarias de clientes VIP, junto a picos masivos de errores en la consola del servidor durante días festivos (CyberMonday).

**Ejemplos del problema**:

- Clientes reclaman cobros excedentes de impuestos. El IVA es calculado desde el subtotal bruto y luego se descuenta el cupón, afectando negativamente la cuenta del cliente.
- Múltiples incidencias en JS con `TypeError: Cannot read properties of undefined (reading 'name')` al intentar eliminar algún ítem.
- Si el cliente tenía 5 productos limitados en su carrito e intenta presionar "+1", el sistema lo deja proceder ignorando el stock total de 5, vendiendo productos fantasmas.
- Fallos en cuentas: Un artículo de $10.1 con IVA del 16% es reportado en el recibo como un infinito de cifras decimales (`11.716000000000001` en lugar de `11.72`), lo que ocasiona que las pasarelas de cobro rechacen los pagos.

## 📂 Archivos

- `buggy-code.js` - Código con bugs lógicos y de ejecución flotante.
- `test.js` - Pruebas para validar la solución.
- `solution.js` - Referencia corregida.

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/09-ecommerce-cart-manager
```

## ⚙️ Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 20-30 minutos
