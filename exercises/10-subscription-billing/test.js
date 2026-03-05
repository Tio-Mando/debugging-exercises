/**
 * Pruebas para: Sistema de Gestión de Suscripciones
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/10-subscription-billing
 */

const {
  calculateProration,
  isInGracePeriod,
  calculateCancellationRefund,
  applyDiscounts,
} = require('./buggy-code.js');
// const { calculateProration, isInGracePeriod, calculateCancellationRefund, applyDiscounts } = require('./solution.js');

describe('Sistema de Gestión de Suscripciones - Error Lógico', () => {
  // ─── calculateProration ───────────────────────────────────────────────────

  describe('calculateProration - Cálculo de prorrateo', () => {
    test('debe calcular el prorrateo correcto para un ciclo trimestral (90 días)', () => {
      // 45 de 90 días = 50% de $120 = $60
      expect(calculateProration(120, 45, 90)).toBe(60);
    });

    test('debe calcular el prorrateo correcto para un ciclo anual (365 días)', () => {
      // 73 de 365 días = 20% de $365 = $73
      expect(calculateProration(365, 73, 365)).toBe(73);
    });

    test('debe retornar 0 cuando no se han usado días del período', () => {
      expect(calculateProration(100, 0, 30)).toBe(0);
    });

    test('debe retornar el precio completo cuando se usan todos los días', () => {
      expect(calculateProration(90, 90, 90)).toBe(90);
    });

    test('debe lanzar error si los parámetros son inválidos (precio negativo)', () => {
      expect(() => calculateProration(-10, 5, 30)).toThrow(
        'Parámetros inválidos',
      );
    });

    test('debe lanzar error si los días utilizados superan el total del período', () => {
      expect(() => calculateProration(100, 35, 30)).toThrow(
        'Los días utilizados no pueden exceder',
      );
    });
  });

  // ─── isInGracePeriod ──────────────────────────────────────────────────────

  describe('isInGracePeriod - Período de gracia', () => {
    test('debe retornar true si la suscripción venció hace 3 días (dentro del período de gracia)', () => {
      const expiration = new Date();
      expiration.setDate(expiration.getDate() - 3);
      expect(isInGracePeriod(expiration, 7)).toBe(true);
    });

    test('debe retornar false si la suscripción venció hace 8 días (fuera del período de gracia de 7 días)', () => {
      const expiration = new Date();
      expiration.setDate(expiration.getDate() - 8);
      expect(isInGracePeriod(expiration, 7)).toBe(false);
    });

    test('debe retornar false si la suscripción aún no ha vencido', () => {
      const expiration = new Date();
      expiration.setDate(expiration.getDate() + 5);
      expect(isInGracePeriod(expiration, 7)).toBe(false);
    });
  });

  // ─── calculateCancellationRefund ──────────────────────────────────────────

  describe('calculateCancellationRefund - Reembolso por cancelación', () => {
    test('debe reembolsar los días RESTANTES del período, no los días ya utilizados', () => {
      // Período: 1 enero → 1 abril (90 días / trimestral, $90)
      // Cancelación el 31 enero: 30 días usados, 60 días restantes
      // Reembolso esperado: 90/90 * 60 = $60
      const subscription = {
        price: 90,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-04-01'),
        billingCycle: 'quarterly',
      };
      const cancelDate = new Date('2024-01-31');
      expect(calculateCancellationRefund(subscription, cancelDate)).toBe(60);
    });

    test('debe retornar 0 si la cancelación ocurre después del fin del período', () => {
      const subscription = {
        price: 90,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-04-01'),
        billingCycle: 'quarterly',
      };
      const afterExpiry = new Date('2024-05-01');
      expect(calculateCancellationRefund(subscription, afterExpiry)).toBe(0);
    });

    test('debe calcular el reembolso correctamente para un ciclo mensual', () => {
      // Período: 1 enero → 31 enero (30 días / mensual, $30)
      // Cancelación el 10 enero: 9 días usados, 21 días restantes
      // Reembolso esperado: 30/30 * 21 = $21
      const subscription = {
        price: 30,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31'),
        billingCycle: 'monthly',
      };
      const cancelDate = new Date('2024-01-10');
      expect(calculateCancellationRefund(subscription, cancelDate)).toBe(21);
    });
  });

  // ─── applyDiscounts ───────────────────────────────────────────────────────

  describe('applyDiscounts - Aplicación de descuentos', () => {
    test('debe aplicar descuentos aditivos, no multiplicativos en cadena', () => {
      // 10% + 20% = 30% de descuento total sobre $100 → $70
      // (NO: 100 * 0.90 * 0.80 = $72)
      expect(applyDiscounts(100, [10, 20])).toBe(70);
    });

    test('debe limitar el descuento total al 100% aunque los porcentajes lo superen', () => {
      // 60% + 50% = 110%, se limita a 100% → precio final $0
      expect(applyDiscounts(200, [60, 50])).toBe(0);
    });

    test('debe retornar el precio base si no se aplica ningún descuento', () => {
      expect(applyDiscounts(150, [])).toBe(150);
    });

    test('debe manejar un único descuento correctamente', () => {
      // 25% de descuento sobre $80 → $60
      expect(applyDiscounts(80, [25])).toBe(60);
    });

    test('debe lanzar error si el precio base es negativo', () => {
      expect(() => applyDiscounts(-100, [10])).toThrow(
        'El precio base no puede ser negativo',
      );
    });

    test('debe lanzar error si algún descuento está fuera del rango 0-100', () => {
      expect(() => applyDiscounts(100, [10, 150])).toThrow(
        'Los descuentos deben ser valores entre 0 y 100',
      );
    });
  });
});
