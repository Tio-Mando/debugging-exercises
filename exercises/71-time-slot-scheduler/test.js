/**
 * Pruebas para: Sistema de Reserva de Franjas Horarias
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/71-time-slot-scheduler
 */

// IMPORTANTE: Cambiar esta línea para probar tu solución
const { TimeSlot, Scheduler } = require('./buggy-code');
// const { TimeSlot, Scheduler } = require('./solution');

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/**
 * Devuelve minutos desde medianoche: toMinutes(9, 30) → 570
 */
function toMinutes(hour, minute = 0) {
  return hour * 60 + minute;
}

// ─────────────────────────────────────────────
// TimeSlot — Clase de franja horaria
// ─────────────────────────────────────────────

describe('Sistema de Reserva de Franjas Horarias', () => {
  describe('TimeSlot - Constructor y propiedades', () => {
    test('debe crear una franja horaria con los datos correctos', () => {
      const slot = new TimeSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      expect(slot.day).toBe('lunes');
      expect(slot.start).toBe(540);
      expect(slot.end).toBe(600);
      expect(slot.room).toBe('Sala A');
      expect(slot.clientName).toBeNull();
      expect(slot.isBooked).toBe(false);
    });

    test('debe lanzar error si el inicio es mayor o igual al fin', () => {
      expect(() => new TimeSlot('lunes', toMinutes(10), toMinutes(9), 'Sala A')).toThrow();
      expect(() => new TimeSlot('lunes', toMinutes(10), toMinutes(10), 'Sala A')).toThrow();
    });

    test('debe lanzar error si los tiempos están fuera del rango del día (0–1440)', () => {
      expect(() => new TimeSlot('lunes', -10, toMinutes(10), 'Sala A')).toThrow();
      expect(() => new TimeSlot('lunes', toMinutes(9), 1500, 'Sala A')).toThrow();
    });
  });

  describe('TimeSlot - getDuration()', () => {
    test('debe retornar la duración correcta en minutos', () => {
      const slot = new TimeSlot('martes', toMinutes(8), toMinutes(9, 30), 'Sala B');
      expect(slot.getDuration()).toBe(90);
    });

    test('debe retornar 60 para una franja de una hora exacta', () => {
      const slot = new TimeSlot('miércoles', toMinutes(14), toMinutes(15), 'Sala C');
      expect(slot.getDuration()).toBe(60);
    });
  });

  describe('TimeSlot - overlaps()', () => {
    test('debe detectar solapamiento cuando una franja comienza dentro de otra', () => {
      const slotA = new TimeSlot('lunes', toMinutes(9), toMinutes(11), 'Sala A');
      const slotB = new TimeSlot('lunes', toMinutes(10), toMinutes(12), 'Sala A');
      expect(slotA.overlaps(slotB)).toBe(true);
    });

    test('debe detectar solapamiento cuando una franja está completamente dentro de otra', () => {
      const slotA = new TimeSlot('lunes', toMinutes(9), toMinutes(12), 'Sala A');
      const slotB = new TimeSlot('lunes', toMinutes(10), toMinutes(11), 'Sala A');
      expect(slotA.overlaps(slotB)).toBe(true);
    });

    test('NO debe detectar solapamiento cuando las franjas son contiguas (una termina donde empieza la otra)', () => {
      const slotA = new TimeSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      const slotB = new TimeSlot('lunes', toMinutes(10), toMinutes(11), 'Sala A');
      expect(slotA.overlaps(slotB)).toBe(false);
    });

    test('NO debe detectar solapamiento en días distintos aunque los tiempos se crucen', () => {
      const slotA = new TimeSlot('lunes', toMinutes(9), toMinutes(11), 'Sala A');
      const slotB = new TimeSlot('martes', toMinutes(10), toMinutes(12), 'Sala A');
      expect(slotA.overlaps(slotB)).toBe(false);
    });

    test('NO debe detectar solapamiento en salas distintas del mismo día', () => {
      const slotA = new TimeSlot('lunes', toMinutes(9), toMinutes(11), 'Sala A');
      const slotB = new TimeSlot('lunes', toMinutes(10), toMinutes(12), 'Sala B');
      expect(slotA.overlaps(slotB)).toBe(false);
    });
  });

  // ─────────────────────────────────────────────
  // Scheduler — Constructor y addSlot
  // ─────────────────────────────────────────────

  describe('Scheduler - addSlot() y getSlotsForDay()', () => {
    test('debe agregar franjas y recuperarlas por día', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      scheduler.addSlot('lunes', toMinutes(10), toMinutes(11), 'Sala A');
      scheduler.addSlot('martes', toMinutes(9), toMinutes(10), 'Sala B');
      const lunesSlots = scheduler.getSlotsForDay('lunes');
      expect(lunesSlots).toHaveLength(2);
    });

    test('debe retornar array vacío si no hay franjas para ese día', () => {
      const scheduler = new Scheduler();
      expect(scheduler.getSlotsForDay('domingo')).toEqual([]);
    });

    test('debe lanzar error al intentar agregar una franja que solapa con otra existente', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(11), 'Sala A');
      expect(() => scheduler.addSlot('lunes', toMinutes(10), toMinutes(12), 'Sala A')).toThrow();
    });

    test('debe permitir agregar franjas contiguas sin error', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      expect(() => scheduler.addSlot('lunes', toMinutes(10), toMinutes(11), 'Sala A')).not.toThrow();
    });
  });

  // ─────────────────────────────────────────────
  // Scheduler — bookSlot y cancelBooking
  // ─────────────────────────────────────────────

  describe('Scheduler - bookSlot()', () => {
    test('debe reservar una franja disponible para un cliente', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      const slot = scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A', 'Dr. García');
      expect(slot.isBooked).toBe(true);
      expect(slot.clientName).toBe('Dr. García');
    });

    test('debe lanzar error al intentar reservar una franja ya reservada', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A', 'Dr. García');
      expect(() =>
        scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A', 'Dr. López')
      ).toThrow();
    });

    test('debe lanzar error si la franja no existe', () => {
      const scheduler = new Scheduler();
      expect(() =>
        scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A', 'Cliente X')
      ).toThrow();
    });
  });

  describe('Scheduler - cancelBooking()', () => {
    test('debe cancelar una reserva existente y dejar la franja disponible', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A', 'Dr. García');
      scheduler.cancelBooking('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      const slot = scheduler.getSlotsForDay('lunes')[0];
      expect(slot.isBooked).toBe(false);
      expect(slot.clientName).toBeNull();
    });

    test('debe lanzar error al cancelar una franja que no está reservada', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      expect(() =>
        scheduler.cancelBooking('lunes', toMinutes(9), toMinutes(10), 'Sala A')
      ).toThrow();
    });
  });

  // ─────────────────────────────────────────────
  // Scheduler — getAvailableSlots
  // ─────────────────────────────────────────────

  describe('Scheduler - getAvailableSlots()', () => {
    test('debe retornar solo las franjas no reservadas de un día', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      scheduler.addSlot('lunes', toMinutes(10), toMinutes(11), 'Sala A');
      scheduler.addSlot('lunes', toMinutes(11), toMinutes(12), 'Sala A');
      scheduler.bookSlot('lunes', toMinutes(10), toMinutes(11), 'Sala A', 'Cliente X');
      const available = scheduler.getAvailableSlots('lunes');
      expect(available).toHaveLength(2);
      expect(available.every(s => !s.isBooked)).toBe(true);
    });

    test('debe retornar todas las franjas si ninguna está reservada', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('martes', toMinutes(8), toMinutes(9), 'Sala B');
      scheduler.addSlot('martes', toMinutes(9), toMinutes(10), 'Sala B');
      expect(scheduler.getAvailableSlots('martes')).toHaveLength(2);
    });
  });

  // ─────────────────────────────────────────────
  // Scheduler — getBookingsByClient
  // ─────────────────────────────────────────────

  describe('Scheduler - getBookingsByClient()', () => {
    test('debe retornar todas las reservas de un cliente específico', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      scheduler.addSlot('martes', toMinutes(14), toMinutes(15), 'Sala B');
      scheduler.addSlot('miércoles', toMinutes(11), toMinutes(12), 'Sala A');
      scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A', 'Ana');
      scheduler.bookSlot('martes', toMinutes(14), toMinutes(15), 'Sala B', 'Ana');
      scheduler.bookSlot('miércoles', toMinutes(11), toMinutes(12), 'Sala A', 'Pedro');
      const anas = scheduler.getBookingsByClient('Ana');
      expect(anas).toHaveLength(2);
      expect(anas.every(s => s.clientName === 'Ana')).toBe(true);
    });

    test('debe retornar array vacío si el cliente no tiene reservas', () => {
      const scheduler = new Scheduler();
      expect(scheduler.getBookingsByClient('Juan')).toEqual([]);
    });
  });

  // ─────────────────────────────────────────────
  // Scheduler — getBusiestDay
  // ─────────────────────────────────────────────

  describe('Scheduler - getBusiestDay()', () => {
    test('debe retornar el día con más reservas', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      scheduler.addSlot('lunes', toMinutes(10), toMinutes(11), 'Sala A');
      scheduler.addSlot('martes', toMinutes(9), toMinutes(10), 'Sala A');
      scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A', 'Ana');
      scheduler.bookSlot('lunes', toMinutes(10), toMinutes(11), 'Sala A', 'Pedro');
      scheduler.bookSlot('martes', toMinutes(9), toMinutes(10), 'Sala A', 'Luis');
      expect(scheduler.getBusiestDay()).toBe('lunes');
    });

    test('debe retornar null si no hay ninguna reserva', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      expect(scheduler.getBusiestDay()).toBeNull();
    });
  });

  // ─────────────────────────────────────────────
  // Scheduler — getBusiestHour
  // ─────────────────────────────────────────────

  describe('Scheduler - getBusiestHour()', () => {
    test('debe retornar la hora (número entero) con más reservas iniciadas', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala B');
      scheduler.addSlot('martes', toMinutes(14), toMinutes(15), 'Sala A');
      scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A', 'Ana');
      scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala B', 'Pedro');
      scheduler.bookSlot('martes', toMinutes(14), toMinutes(15), 'Sala A', 'Luis');
      expect(scheduler.getBusiestHour()).toBe(9);
    });

    test('debe retornar null si no hay ninguna reserva', () => {
      const scheduler = new Scheduler();
      expect(scheduler.getBusiestHour()).toBeNull();
    });
  });

  // ─────────────────────────────────────────────
  // Scheduler — findNextAvailableSlot
  // ─────────────────────────────────────────────

  describe('Scheduler - findNextAvailableSlot()', () => {
    test('debe retornar la siguiente franja disponible después de un tiempo dado en el mismo día', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      scheduler.addSlot('lunes', toMinutes(10), toMinutes(11), 'Sala A');
      scheduler.addSlot('lunes', toMinutes(11), toMinutes(12), 'Sala A');
      scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A', 'Ana');
      scheduler.bookSlot('lunes', toMinutes(10), toMinutes(11), 'Sala A', 'Pedro');
      const next = scheduler.findNextAvailableSlot('lunes', toMinutes(9, 30));
      expect(next).not.toBeNull();
      expect(next.start).toBe(toMinutes(11));
    });

    test('debe retornar null si no hay franjas disponibles después del tiempo dado', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A', 'Ana');
      expect(scheduler.findNextAvailableSlot('lunes', toMinutes(10))).toBeNull();
    });

    test('debe incluir la franja que inicia exactamente en el tiempo dado', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(10), toMinutes(11), 'Sala A');
      const next = scheduler.findNextAvailableSlot('lunes', toMinutes(10));
      expect(next).not.toBeNull();
      expect(next.start).toBe(toMinutes(10));
    });
  });

  // ─────────────────────────────────────────────
  // Scheduler — getUtilizationRate
  // ─────────────────────────────────────────────

  describe('Scheduler - getUtilizationRate()', () => {
    test('debe retornar el porcentaje de franjas reservadas sobre el total por día', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      scheduler.addSlot('lunes', toMinutes(10), toMinutes(11), 'Sala A');
      scheduler.addSlot('lunes', toMinutes(11), toMinutes(12), 'Sala A');
      scheduler.addSlot('lunes', toMinutes(12), toMinutes(13), 'Sala A');
      scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A', 'Ana');
      scheduler.bookSlot('lunes', toMinutes(10), toMinutes(11), 'Sala A', 'Pedro');
      expect(scheduler.getUtilizationRate('lunes')).toBeCloseTo(50);
    });

    test('debe retornar 0 si no hay franjas reservadas en ese día', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('martes', toMinutes(9), toMinutes(10), 'Sala A');
      expect(scheduler.getUtilizationRate('martes')).toBe(0);
    });

    test('debe retornar 100 si todas las franjas del día están reservadas', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('miércoles', toMinutes(9), toMinutes(10), 'Sala A');
      scheduler.addSlot('miércoles', toMinutes(10), toMinutes(11), 'Sala A');
      scheduler.bookSlot('miércoles', toMinutes(9), toMinutes(10), 'Sala A', 'Ana');
      scheduler.bookSlot('miércoles', toMinutes(10), toMinutes(11), 'Sala A', 'Pedro');
      expect(scheduler.getUtilizationRate('miércoles')).toBe(100);
    });

    test('debe retornar 0 si no hay franjas para ese día', () => {
      const scheduler = new Scheduler();
      expect(scheduler.getUtilizationRate('viernes')).toBe(0);
    });
  });

  // ─────────────────────────────────────────────
  // Scheduler — getTotalBookedMinutes
  // ─────────────────────────────────────────────

  describe('Scheduler - getTotalBookedMinutes()', () => {
    test('debe sumar los minutos de todas las franjas reservadas en un día', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');       // 60 min
      scheduler.addSlot('lunes', toMinutes(10), toMinutes(11, 30), 'Sala A');  // 90 min
      scheduler.addSlot('lunes', toMinutes(13), toMinutes(14), 'Sala A');      // 60 min (libre)
      scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A', 'Ana');
      scheduler.bookSlot('lunes', toMinutes(10), toMinutes(11, 30), 'Sala A', 'Pedro');
      expect(scheduler.getTotalBookedMinutes('lunes')).toBe(150);
    });

    test('debe retornar 0 si no hay franjas reservadas', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      expect(scheduler.getTotalBookedMinutes('lunes')).toBe(0);
    });
  });

  // ─────────────────────────────────────────────
  // Integración — flujo completo
  // ─────────────────────────────────────────────

  describe('Flujo completo de integración', () => {
    test('debe manejar múltiples salas y días sin interferencias', () => {
      const scheduler = new Scheduler();
      // Sala A y Sala B pueden tener el mismo horario en el mismo día
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A');
      scheduler.addSlot('lunes', toMinutes(9), toMinutes(10), 'Sala B');
      scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala A', 'Dr. García');
      scheduler.bookSlot('lunes', toMinutes(9), toMinutes(10), 'Sala B', 'Dr. Pérez');
      expect(scheduler.getAvailableSlots('lunes')).toHaveLength(0);
      expect(scheduler.getBookingsByClient('Dr. García')).toHaveLength(1);
      expect(scheduler.getBookingsByClient('Dr. Pérez')).toHaveLength(1);
    });

    test('debe recalcular disponibilidad tras cancelar una reserva', () => {
      const scheduler = new Scheduler();
      scheduler.addSlot('viernes', toMinutes(15), toMinutes(16), 'Sala C');
      scheduler.bookSlot('viernes', toMinutes(15), toMinutes(16), 'Sala C', 'Ana');
      expect(scheduler.getAvailableSlots('viernes')).toHaveLength(0);
      scheduler.cancelBooking('viernes', toMinutes(15), toMinutes(16), 'Sala C');
      expect(scheduler.getAvailableSlots('viernes')).toHaveLength(1);
    });
  });
});
