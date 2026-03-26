/**
 * Pruebas para: Gestión de Carrito de Compras
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/09-ecommerce-cart-manager
 */

const {
  createCart,
  addItem,
  removeItem,
  applyCoupon,
  calculateTotals,
} = require('./buggy-code.js');
// const { createCart, addItem, removeItem, applyCoupon, calculateTotals } = require('./solution.js');

describe('Gestión de Carrito de Compras - Error Lógico y de Ejecución', () => {
  let cart;
  const laptop = { id: 'P001', name: 'Laptop', price: 1000, stock: 5 };
  const mouse = { id: 'P002', name: 'Mouse', price: 20, stock: 10 };

  beforeEach(() => {
    cart = createCart();
  });

  describe('addItem - Agregar productos', () => {
    test('debe calcular el subtotal correctamente al agregar productos', () => {
      cart = addItem(cart, laptop, 1);
      cart = addItem(cart, mouse, 2);
      expect(cart.subtotal).toBe(1040);
      expect(cart.items).toHaveLength(2);
    });

    test('debe lanzar error si se intenta agregar más cantidad que la disponible en stock al inicio', () => {
      expect(() => addItem(cart, laptop, 10)).toThrow('Stock insuficiente');
    });

    test('debe validar el stock de forma acumulativa al incrementar cantidad de un producto existente', () => {
      cart = addItem(cart, laptop, 3);
      // El stock total es 5. Tuvimos 3, intentar añadir 3 más debería fallar.
      expect(() => addItem(cart, laptop, 3)).toThrow('Stock insuficiente');
    });
  });

  describe('removeItem - Eliminar productos', () => {
    test('debe eliminar un producto existente y recalcular el total', () => {
      cart = addItem(cart, laptop, 1);
      cart = addItem(cart, mouse, 1);
      cart = removeItem(cart, 'P001');
      expect(cart.items).toHaveLength(1);
      expect(cart.subtotal).toBe(20);
    });

    test('debe lanzar un error descriptivo si se intenta eliminar un producto inexistente', () => {
      expect(() => removeItem(cart, 'NON-EXISTENT')).toThrow(
        'El producto no se encuentra en el carrito',
      );
    });
  });

  describe('applyCoupon - Cupones de descuento', () => {
    // test('debe aplicar un descuento porcentual correctamente', () => {
    //   cart = addItem(cart, laptop, 1); // 1000
    //   const futureDate = new Date();
    //   futureDate.setFullYear(futureDate.getFullYear() + 1);

    //   cart = applyCoupon(cart, {
    //     id: 'OFF10',
    //     type: 'PERCENT',
    //     value: 10,
    //     expiry: futureDate.toISOString(),
    //   });
    //   expect(cart.discount).toBe(100);
    // });

    test('debe lanzar error de cupón expirado con fechas pasadas', () => {
      const pastCoupon = {
        id: 'EXPIRED',
        type: 'FIXED',
        value: 50,
        expiry: '2020-01-01T00:00:00.000Z',
      };
      expect(() => applyCoupon(cart, pastCoupon)).toThrow(
        'El cupón ha expirado',
      );
    });

    test('debe soportar la comparación de expiración en formatos no-ISO (como formato local)', () => {
      // Usar un string de fecha distinto al ISO generado por toISOString()
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 2);
      const localeDateStr = futureDate.toLocaleString(); // no es ISO

      cart = addItem(cart, mouse, 1);
      expect(() =>
        applyCoupon(cart, {
          id: 'FUTURE',
          type: 'FIXED',
          value: 5,
          expiry: localeDateStr,
        }),
      ).not.toThrow();
    });
  });

  describe('calculateTotals - Impuestos y Precisión', () => {
    // test('debe calcular el IVA (16%) basándose estrictamente en el precio DESPUÉS del descuento', () => {
    //   cart = addItem(cart, laptop, 1); // 1000
    //   const futureDate = new Date(
    //     new Date().setFullYear(new Date().getFullYear() + 1),
    //   );

    //   cart = applyCoupon(cart, {
    //     id: 'OFF500',
    //     type: 'FIXED',
    //     value: 500,
    //     expiry: futureDate.toISOString(),
    //   });

    //   // Subtotal: 1000. Descuento: 500 => Subtotal con descuento: 500.
    //   // IVA (16% de 500): 80. Total Final: 580.
    //   expect(cart.tax).toBe(80);
    //   expect(cart.total).toBe(580);
    // });

    test('debe redondear correctamente a 2 decimales y evitar resultados raros por flotantes', () => {
      const cheapItem = { id: 'P99', name: 'Cheap', price: 10.1, stock: 100 };
      cart = addItem(cart, cheapItem, 1); // 10.1
      cart = addItem(cart, cheapItem, 2); // + 20.2 => subtotal 30.3

      // En JS puro: 10.1 + 20.2 = 30.299999999999997
      // El tax (16% de 30.3) es 4.848 => 4.85
      // Total debe ser 35.15
      expect(cart.subtotal).toBe(30.3);
      expect(cart.total).toBe(35.15);
    });
  });
});
