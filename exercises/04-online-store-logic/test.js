/**
 * Pruebas para: Lógica de Tienda Online
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/04-online-store-logic
 */

// IMPORTANTE: Cambiar esta línea para probar tu solución
const {
  calculateSubtotal,
  applyCoupon,
  calculateTax,
  getShippingFee,
  addItem,
  removeItem,
  formatOrderSummary,
} = require('./buggy-code.js');
// const {
//   calculateSubtotal,
//   applyCoupon,
//   calculateTax,
//   getShippingFee,
//   addItem,
//   removeItem,
//   formatOrderSummary,
// } = require('./solution.js');

describe('Lógica de Tienda Online', () => {
  describe('calculateSubtotal - Cálculo de subtotal', () => {
    test('debe calcular el subtotal correctamente para varios productos', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
      ];
      expect(calculateSubtotal(items)).toBe(35);
    });

    test('debe retornar 0 para un carrito vacío', () => {
      expect(calculateSubtotal([])).toBe(0);
    });
  });

  describe('applyCoupon - Aplicación de cupones', () => {
    test('debe aplicar un cupón de 10% correctamente', () => {
      expect(applyCoupon(100, 'SUMMER10')).toBe(90);
    });

    test('debe ser insensible a mayúsculas/minúsculas', () => {
      expect(applyCoupon(100, 'summer10')).toBe(90);
    });

    test('debe retornar el total original si el cupón no existe', () => {
      expect(applyCoupon(100, 'INVALID')).toBe(100);
    });
  });

  describe('calculateTax - Cálculo de impuestos', () => {
    test('debe calcular el monto del impuesto correctamente (ej. 21%)', () => {
      expect(calculateTax(100, 21)).toBe(21);
      expect(calculateTax(50, 10)).toBe(5);
    });
  });

  describe('getShippingFee - Cálculo de envío', () => {
    test('debe ser gratis (0) para usuarios Premium', () => {
      expect(getShippingFee(20, true)).toBe(0);
    });

    test('debe costar 25 para pesos de 10kg o más', () => {
      expect(getShippingFee(10, false)).toBe(25);
      expect(getShippingFee(15, false)).toBe(25);
    });

    test('debe costar 10 para pesos menores a 10kg', () => {
      expect(getShippingFee(5, false)).toBe(10);
      expect(getShippingFee(9.9, false)).toBe(10);
    });
  });

  describe('addItem - Gestión del carrito', () => {
    test('debe agregar un nuevo producto al carrito', () => {
      const cart = [{ id: 1, name: 'A', quantity: 1 }];
      const newItem = { id: 2, name: 'B', quantity: 1 };
      const result = addItem(cart, newItem);
      expect(result).toHaveLength(2);
      expect(result[1].id).toBe(2);
    });

    test('debe incrementar la cantidad si el producto ya existe', () => {
      const cart = [{ id: 1, name: 'A', quantity: 1 }];
      const newItem = { id: 1, name: 'A', quantity: 2 };
      const result = addItem(cart, newItem);
      expect(result[0].quantity).toBe(3);
    });

    test('NO debe mutar el array original del carrito', () => {
      const cart = [{ id: 1, name: 'A', quantity: 1 }];
      const newItem = { id: 1, name: 'A', quantity: 1 };
      addItem(cart, newItem);
      expect(cart[0].quantity).toBe(1);
    });
  });

  describe('removeItem - Eliminación de productos', () => {
    test('debe eliminar un producto por ID', () => {
      const cart = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
      ];
      const result = removeItem(cart, 1);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(2);
    });

    test('NO debe mutar el array original', () => {
      const cart = [{ id: 1, name: 'A' }];
      removeItem(cart, 1);
      expect(cart).toHaveLength(1);
    });
  });

  describe('formatOrderSummary - Formateo de resumen', () => {
    test('debe formatear el resumen con dos decimales', () => {
      const order = { itemsCount: 3, total: 45.5 };
      expect(formatOrderSummary(order)).toBe(
        'Pedido: 3 productos - Total: $45.50',
      );
    });

    test('debe manejar totales enteros correctamente', () => {
      const order = { itemsCount: 1, total: 10 };
      expect(formatOrderSummary(order)).toBe(
        'Pedido: 1 productos - Total: $10.00',
      );
    });
  });
});
