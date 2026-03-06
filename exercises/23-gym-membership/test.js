/**
 * Pruebas para: Sistema de Gestión de Membresías de Gimnasio
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/23-gym-membership
 */

// IMPORTANTE: Cambiar esta línea para probar tu solución
const { Member, Membership, WorkoutLog } = require('./buggy-code.js');
// const { Member, Membership, WorkoutLog } = require('./solution.js');

// Extrae año, mes (1-12) y día de un objeto Date usando valores locales
function dateComponents(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

describe('Sistema de Gestión de Membresías de Gimnasio', () => {
  let member;

  beforeEach(() => {
    member = new Member('M001', 'Valentina', '2024-01-01');
  });

  describe('Membership.getExpiryDate - Fecha de vencimiento de la membresía', () => {
    test('1 mes desde el 1 de enero debe vencer el 1 de febrero', () => {
      const membership = new Membership(member, 'Básico', 30, 1, '2024-01-01');
      const expiry = dateComponents(membership.getExpiryDate());
      expect(expiry.year).toBe(2024);
      expect(expiry.month).toBe(2);
      expect(expiry.day).toBe(1);
    });

    test('1 mes desde el 1 de febrero (año bisiesto) debe vencer el 1 de marzo, no el 2', () => {
      // Febrero 2024 tiene 29 días. Sumar 30 días da 2 de marzo (bug), sumar 1 mes da 1 de marzo (correcto)
      const membership = new Membership(member, 'Básico', 30, 1, '2024-02-01');
      const expiry = dateComponents(membership.getExpiryDate());
      expect(expiry.year).toBe(2024);
      expect(expiry.month).toBe(3);
      expect(expiry.day).toBe(1);
    });

    test('3 meses desde el 1 de noviembre debe vencer el 1 de febrero del año siguiente', () => {
      // 90 días desde nov 1 = enero 30 (bug), 3 meses = feb 1 (correcto)
      const membership = new Membership(member, 'Trimestral', 80, 3, '2024-11-01');
      const expiry = dateComponents(membership.getExpiryDate());
      expect(expiry.year).toBe(2025);
      expect(expiry.month).toBe(2);
      expect(expiry.day).toBe(1);
    });

    test('6 meses desde el 15 de junio debe vencer el 15 de diciembre', () => {
      // 180 días desde jun 15 = dic 12 (bug), 6 meses = dic 15 (correcto)
      const membership = new Membership(member, 'Semestral', 200, 6, '2024-06-15');
      const expiry = dateComponents(membership.getExpiryDate());
      expect(expiry.year).toBe(2024);
      expect(expiry.month).toBe(12);
      expect(expiry.day).toBe(15);
    });

    test('12 meses desde el 1 de enero debe vencer el 1 de enero del año siguiente', () => {
      // 360 días desde ene 1 = dic 26 (bug), 12 meses = ene 1 del siguiente año (correcto)
      const membership = new Membership(member, 'Anual', 500, 12, '2024-01-01');
      const expiry = dateComponents(membership.getExpiryDate());
      expect(expiry.year).toBe(2025);
      expect(expiry.month).toBe(1);
      expect(expiry.day).toBe(1);
    });

    test('1 mes desde el 1 de marzo debe vencer el 1 de abril', () => {
      // Marzo tiene 31 días, 31 días da 1 de abril, 1 mes también da 1 de abril → coinciden
      const membership = new Membership(member, 'Básico', 30, 1, '2024-03-01');
      const expiry = dateComponents(membership.getExpiryDate());
      expect(expiry.year).toBe(2024);
      expect(expiry.month).toBe(4);
      expect(expiry.day).toBe(1);
    });
  });

  describe('Membership.getTotalCost - Costo total de la membresía', () => {
    test('debe multiplicar la cuota mensual por la duración en meses', () => {
      const membership = new Membership(member, 'Premium', 80, 6, '2024-01-01');
      expect(membership.getTotalCost()).toBe(480);
    });

    test('debe calcular el costo de un plan anual', () => {
      const membership = new Membership(member, 'Anual', 60, 12, '2024-01-01');
      expect(membership.getTotalCost()).toBe(720);
    });
  });

  describe('WorkoutLog - Registro de sesiones de entrenamiento', () => {
    test('debe contar las sesiones del mes correcto', () => {
      const log = new WorkoutLog(member);
      log.logSession('2024-03-05', 'cardio', 45);
      log.logSession('2024-03-12', 'fuerza', 60);
      log.logSession('2024-04-01', 'yoga', 30);
      // Marzo = mes 2 (0-indexed)
      expect(log.getMonthlySessionCount(2024, 2)).toBe(2);
    });

    test('debe calcular el total de minutos entrenados', () => {
      const log = new WorkoutLog(member);
      log.logSession('2024-03-01', 'cardio', 30);
      log.logSession('2024-03-02', 'fuerza', 45);
      log.logSession('2024-03-03', 'yoga', 60);
      expect(log.getTotalMinutes()).toBe(135);
    });
  });
});
