/**
 * Pruebas para: Gestor de Inventario de Tienda
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/02-inventory-manager
 */

// IMPORTANTE: Cambiar esta línea para probar tu solución
const {
  addProduct,
  getProductPrice,
  applyDiscount,
  getTotalValue,
} = require('./buggy-code.js');
// const { addProduct, getProductPrice, applyDiscount, getTotalValue } = require('./solution.js');

// ─── Datos de prueba compartidos ────────────────────────────────────────────

const sampleInventory = [
  { id: 1, name: 'Laptop', price: 1200, quantity: 5 },
  { id: 2, name: 'Mouse', price: 25, quantity: 50 },
  { id: 3, name: 'Teclado', price: 75, quantity: 30 },
];

// ─── Tests ────────────────────────────────────────────────────────────────

describe('Gestor de Inventario - Módulo de tienda', () => {
  // ── addProduct ──────────────────────────────────────────────────────────
  describe('addProduct - Agregar producto al inventario', () => {
    test('debe agregar un producto válido y retornar el inventario actualizado', () => {
      const inventory = [];
      const result = addProduct(inventory, {
        id: 10,
        name: 'Monitor',
        price: 300,
        quantity: 8,
      });
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Monitor');
    });

    test('debe conservar los productos existentes al agregar uno nuevo', () => {
      const result = addProduct(sampleInventory, {
        id: 99,
        name: 'Audífonos',
        price: 50,
        quantity: 20,
      });
      expect(result).toHaveLength(4);
    });

    test('debe lanzar error si ya existe un producto con el mismo ID', () => {
      expect(() =>
        addProduct(sampleInventory, {
          id: 1,
          name: 'Duplicado',
          price: 10,
          quantity: 1,
        }),
      ).toThrow('Ya existe un producto con el ID 1');
    });

    test('debe lanzar error si el producto es null', () => {
      expect(() => addProduct(sampleInventory, null)).toThrow(
        'El producto debe ser un objeto válido',
      );
    });

    test('debe lanzar error si el producto no tiene ID', () => {
      expect(() =>
        addProduct(sampleInventory, { name: 'Sin ID', price: 10, quantity: 1 }),
      ).toThrow('El producto debe tener un ID válido');
    });

    test('debe lanzar error si el precio es negativo', () => {
      expect(() =>
        addProduct(sampleInventory, {
          id: 50,
          name: 'Inválido',
          price: -5,
          quantity: 1,
        }),
      ).toThrow('El precio del producto debe ser un número positivo');
    });

    test('debe no mutar el inventario original', () => {
      const original = [...sampleInventory];
      addProduct(sampleInventory, {
        id: 77,
        name: 'Nuevo',
        price: 100,
        quantity: 2,
      });
      expect(sampleInventory).toHaveLength(original.length);
    });
  });

  // ── getProductPrice ─────────────────────────────────────────────────────
  describe('getProductPrice - Obtener precio por ID', () => {
    test('debe retornar el precio correcto de un producto existente', () => {
      expect(getProductPrice(sampleInventory, 1)).toBe(1200);
    });

    test('debe retornar el precio de un producto con precio bajo', () => {
      expect(getProductPrice(sampleInventory, 2)).toBe(25);
    });

    test('debe lanzar error cuando el producto no existe en el inventario', () => {
      expect(() => getProductPrice(sampleInventory, 999)).toThrow(
        'Producto con ID 999 no encontrado en el inventario',
      );
    });

    test('debe lanzar error cuando el inventario está vacío', () => {
      expect(() => getProductPrice([], 1)).toThrow(
        'Producto con ID 1 no encontrado en el inventario',
      );
    });

    test('debe encontrar un producto cuyo ID es string', () => {
      const inv = [{ id: 'abc', name: 'Especial', price: 999, quantity: 1 }];
      expect(getProductPrice(inv, 'abc')).toBe(999);
    });
  });

  // ── applyDiscount ───────────────────────────────────────────────────────
  describe('applyDiscount - Aplicar descuento al precio', () => {
    test('debe aplicar un descuento del 20% correctamente', () => {
      expect(applyDiscount(100, 0.2)).toBe(80);
    });

    test('debe aplicar un descuento del 50% correctamente', () => {
      expect(applyDiscount(200, 0.5)).toBe(100);
    });

    test('debe retornar el precio original con descuento del 0%', () => {
      expect(applyDiscount(150, 0)).toBe(150);
    });

    test('debe retornar 0 con descuento del 100%', () => {
      expect(applyDiscount(100, 1)).toBe(0);
    });

    test('debe lanzar error cuando el descuento es mayor a 1', () => {
      expect(() => applyDiscount(100, 1.5)).toThrow(
        'El descuento debe ser un número entre 0 y 1',
      );
    });

    test('debe lanzar error cuando el descuento es negativo', () => {
      expect(() => applyDiscount(100, -0.1)).toThrow(
        'El descuento debe ser un número entre 0 y 1',
      );
    });

    test('debe lanzar error cuando el precio es negativo', () => {
      expect(() => applyDiscount(-50, 0.1)).toThrow(
        'El precio debe ser un número positivo',
      );
    });

    test('debe calcular correctamente con precios decimales', () => {
      expect(applyDiscount(99.99, 0.1)).toBeCloseTo(89.99);
    });
  });

  // ── getTotalValue ────────────────────────────────────────────────────────
  describe('getTotalValue - Calcular valor total del inventario', () => {
    test('debe calcular el valor total del inventario correctamente', () => {
      // (1200 × 5) + (25 × 50) + (75 × 30) = 6000 + 1250 + 2250 = 9500
      expect(getTotalValue(sampleInventory)).toBe(9500);
    });

    test('debe retornar 0 para un inventario vacío', () => {
      expect(getTotalValue([])).toBe(0);
    });

    test('debe calcular correctamente con un solo producto', () => {
      const inv = [{ id: 1, name: 'Tablet', price: 500, quantity: 3 }];
      expect(getTotalValue(inv)).toBe(1500);
    });

    test('debe lanzar error cuando el inventario no es un array', () => {
      expect(() => getTotalValue(null)).toThrow(
        'El inventario debe ser un array',
      );
    });

    test('debe lanzar error cuando se pasa undefined', () => {
      expect(() => getTotalValue(undefined)).toThrow(
        'El inventario debe ser un array',
      );
    });

    test('debe manejar productos con cantidad de 0', () => {
      const inv = [{ id: 1, name: 'Agotado', price: 100, quantity: 0 }];
      expect(getTotalValue(inv)).toBe(0);
    });
  });
});
