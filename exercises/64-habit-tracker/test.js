/**
 * Pruebas para Habit Tracker
 * Ejecutar con: npm test exercises/64-habit-tracker
 */

const { HabitTracker } = require('./buggy-code');

describe('Habit Tracker', () => {
  let tracker;

  beforeEach(() => {
    tracker = new HabitTracker();
    // Hábito diario de ejercicio (categoría salud)
    tracker.addHabit('exercise', 'daily', 'health');
    // Hábito diario de meditación (categoría bienestar)
    tracker.addHabit('meditation', 'daily', 'wellness');
    // Hábito semanal de lectura (categoría educación)
    tracker.addHabit('reading', 'weekly', 'education');
  });

  // ─── addHabit ───────────────────────────────────────────────────────────────

  describe('addHabit - agregar hábito', () => {
    test('debe agregar un hábito con los datos correctos', () => {
      const habit = tracker.getHabit('exercise');
      expect(habit.name).toBe('exercise');
      expect(habit.frequency).toBe('daily');
      expect(habit.category).toBe('health');
      expect(Array.isArray(habit.completions)).toBe(true);
      expect(habit.completions.length).toBe(0);
    });

    test('debe lanzar error al agregar un hábito duplicado', () => {
      expect(() => tracker.addHabit('exercise', 'daily', 'health')).toThrow();
    });

    test('debe lanzar error con frecuencia inválida', () => {
      expect(() => tracker.addHabit('yoga', 'monthly', 'health')).toThrow();
    });

    test('debe aceptar frecuencia daily y weekly', () => {
      expect(() => tracker.addHabit('yoga', 'daily', 'health')).not.toThrow();
      expect(() => tracker.addHabit('swim', 'weekly', 'health')).not.toThrow();
    });
  });

  // ─── logCompletion ──────────────────────────────────────────────────────────

  describe('logCompletion - registrar cumplimiento', () => {
    test('debe registrar una fecha de cumplimiento', () => {
      tracker.logCompletion('exercise', '2025-01-01');
      const habit = tracker.getHabit('exercise');
      expect(habit.completions).toContain('2025-01-01');
    });

    test('no debe registrar la misma fecha dos veces', () => {
      tracker.logCompletion('exercise', '2025-01-01');
      tracker.logCompletion('exercise', '2025-01-01');
      const habit = tracker.getHabit('exercise');
      expect(habit.completions.filter(d => d === '2025-01-01').length).toBe(1);
    });

    test('debe lanzar error si el hábito no existe', () => {
      expect(() => tracker.logCompletion('nonexistent', '2025-01-01')).toThrow();
    });
  });

  // ─── getCurrentStreak ───────────────────────────────────────────────────────

  describe('getCurrentStreak - racha actual', () => {
    test('racha de 0 si no hay cumplimientos', () => {
      expect(tracker.getCurrentStreak('exercise', '2025-01-10')).toBe(0);
    });

    test('racha de 1 si solo hay cumplimiento hoy', () => {
      tracker.logCompletion('exercise', '2025-01-10');
      expect(tracker.getCurrentStreak('exercise', '2025-01-10')).toBe(1);
    });

    test('racha de 3 días consecutivos', () => {
      tracker.logCompletion('exercise', '2025-01-08');
      tracker.logCompletion('exercise', '2025-01-09');
      tracker.logCompletion('exercise', '2025-01-10');
      expect(tracker.getCurrentStreak('exercise', '2025-01-10')).toBe(3);
    });

    test('racha se rompe si falta un día', () => {
      tracker.logCompletion('exercise', '2025-01-07');
      tracker.logCompletion('exercise', '2025-01-09');
      tracker.logCompletion('exercise', '2025-01-10');
      // Falta el 2025-01-08 → racha actual es 2 (09 y 10)
      expect(tracker.getCurrentStreak('exercise', '2025-01-10')).toBe(2);
    });

    test('racha semanal: 2 semanas consecutivas', () => {
      // Hábito semanal: semana del 29-dic al 04-ene y semana del 05 al 11-ene
      tracker.logCompletion('reading', '2024-12-30');
      tracker.logCompletion('reading', '2025-01-07');
      // Hoy es lunes 13 enero (dentro de semana del 12 al 18)
      expect(tracker.getCurrentStreak('reading', '2025-01-13')).toBe(2);
    });

    test('racha semanal: se rompe si falta una semana', () => {
      tracker.logCompletion('reading', '2024-12-23');
      // Saltamos la semana del 30 dic
      tracker.logCompletion('reading', '2025-01-07');
      expect(tracker.getCurrentStreak('reading', '2025-01-13')).toBe(1);
    });
  });

  // ─── getLongestStreak ───────────────────────────────────────────────────────

  describe('getLongestStreak - racha más larga', () => {
    test('debe retornar 0 si no hay cumplimientos', () => {
      expect(tracker.getLongestStreak('exercise')).toBe(0);
    });

    test('debe calcular la racha más larga histórica', () => {
      // Racha 1: 3 días
      tracker.logCompletion('exercise', '2025-01-01');
      tracker.logCompletion('exercise', '2025-01-02');
      tracker.logCompletion('exercise', '2025-01-03');
      // Pausa
      // Racha 2: 5 días
      tracker.logCompletion('exercise', '2025-01-10');
      tracker.logCompletion('exercise', '2025-01-11');
      tracker.logCompletion('exercise', '2025-01-12');
      tracker.logCompletion('exercise', '2025-01-13');
      tracker.logCompletion('exercise', '2025-01-14');
      expect(tracker.getLongestStreak('exercise')).toBe(5);
    });

    test('la racha más larga no debe ser menor a la racha actual', () => {
      tracker.logCompletion('exercise', '2025-01-08');
      tracker.logCompletion('exercise', '2025-01-09');
      tracker.logCompletion('exercise', '2025-01-10');
      const longest = tracker.getLongestStreak('exercise');
      const current = tracker.getCurrentStreak('exercise', '2025-01-10');
      expect(longest).toBeGreaterThanOrEqual(current);
    });
  });

  // ─── getCompletionRate ──────────────────────────────────────────────────────

  describe('getCompletionRate - tasa de cumplimiento', () => {
    test('debe retornar 0 si no hay cumplimientos en el período', () => {
      const rate = tracker.getCompletionRate('exercise', '2025-01-01', '2025-01-07');
      expect(rate).toBe(0);
    });

    test('tasa del 100% si cumplió todos los días del período', () => {
      tracker.logCompletion('exercise', '2025-01-01');
      tracker.logCompletion('exercise', '2025-01-02');
      tracker.logCompletion('exercise', '2025-01-03');
      tracker.logCompletion('exercise', '2025-01-04');
      tracker.logCompletion('exercise', '2025-01-05');
      tracker.logCompletion('exercise', '2025-01-06');
      tracker.logCompletion('exercise', '2025-01-07');
      const rate = tracker.getCompletionRate('exercise', '2025-01-01', '2025-01-07');
      expect(rate).toBe(100);
    });

    test('tasa del 50% si cumplió la mitad de los días', () => {
      // 7 días en el período, 3 o 4 cumplidos
      tracker.logCompletion('exercise', '2025-01-01');
      tracker.logCompletion('exercise', '2025-01-03');
      tracker.logCompletion('exercise', '2025-01-05');
      tracker.logCompletion('exercise', '2025-01-07');
      // 4 de 8 días (incluye inicio y fin)
      const rate = tracker.getCompletionRate('exercise', '2025-01-01', '2025-01-08');
      expect(rate).toBe(50);
    });

    test('tasa semanal: 2 de 4 semanas completadas → 50%', () => {
      // 4 semanas ISO: W06 (03-09 feb), W07 (10-16), W08 (17-23), W09 (24 feb - 02 mar)
      // Se completa la W06 y la W08 → 2/4 = 50%
      tracker.logCompletion('reading', '2025-02-05');
      tracker.logCompletion('reading', '2025-02-19');
      const rate = tracker.getCompletionRate('reading', '2025-02-03', '2025-03-02');
      expect(rate).toBe(50);
    });
  });

  // ─── getHabitsByCategory ────────────────────────────────────────────────────

  describe('getHabitsByCategory - hábitos por categoría', () => {
    test('debe retornar solo los hábitos de la categoría indicada', () => {
      const healthHabits = tracker.getHabitsByCategory('health');
      expect(healthHabits.every(h => h.category === 'health')).toBe(true);
      expect(healthHabits.some(h => h.name === 'exercise')).toBe(true);
    });

    test('debe retornar arreglo vacío si no hay hábitos de esa categoría', () => {
      const result = tracker.getHabitsByCategory('sports');
      expect(result).toEqual([]);
    });

    test('debe retornar múltiples hábitos de la misma categoría', () => {
      tracker.addHabit('running', 'daily', 'health');
      const healthHabits = tracker.getHabitsByCategory('health');
      expect(healthHabits.length).toBe(2);
    });
  });

  // ─── getOverdueHabits ───────────────────────────────────────────────────────

  describe('getOverdueHabits - hábitos vencidos', () => {
    test('hábito diario vencido: no cumplido ayer ni hoy', () => {
      // Solo tiene cumplimiento hace 3 días
      tracker.logCompletion('exercise', '2025-01-07');
      const overdue = tracker.getOverdueHabits('2025-01-10');
      expect(overdue.some(h => h.name === 'exercise')).toBe(true);
    });

    test('hábito diario NO vencido si se cumplió hoy', () => {
      tracker.logCompletion('exercise', '2025-01-10');
      const overdue = tracker.getOverdueHabits('2025-01-10');
      expect(overdue.some(h => h.name === 'exercise')).toBe(false);
    });

    test('hábito diario NO vencido si se cumplió ayer', () => {
      tracker.logCompletion('exercise', '2025-01-09');
      const overdue = tracker.getOverdueHabits('2025-01-10');
      expect(overdue.some(h => h.name === 'exercise')).toBe(false);
    });

    test('hábito semanal vencido si lleva más de 7 días sin cumplir', () => {
      tracker.logCompletion('reading', '2025-01-01');
      // Hoy es el 15, han pasado 14 días → vencido
      const overdue = tracker.getOverdueHabits('2025-01-15');
      expect(overdue.some(h => h.name === 'reading')).toBe(true);
    });

    test('hábito semanal NO vencido si fue cumplido hace 5 días', () => {
      tracker.logCompletion('reading', '2025-01-05');
      const overdue = tracker.getOverdueHabits('2025-01-10');
      expect(overdue.some(h => h.name === 'reading')).toBe(false);
    });
  });

  // ─── getStatsSummary ────────────────────────────────────────────────────────

  describe('getStatsSummary - resumen de estadísticas', () => {
    test('debe incluir bestHabit, worstHabit y overallRate', () => {
      // Cargar datos para que los cálculos sean significativos
      tracker.logCompletion('exercise', '2025-01-01');
      tracker.logCompletion('exercise', '2025-01-02');
      tracker.logCompletion('exercise', '2025-01-03');
      tracker.logCompletion('meditation', '2025-01-01');

      const summary = tracker.getStatsSummary('2025-01-01', '2025-01-03');
      expect(summary).toHaveProperty('bestHabit');
      expect(summary).toHaveProperty('worstHabit');
      expect(summary).toHaveProperty('overallRate');
    });

    test('bestHabit debe ser el hábito con mayor tasa de cumplimiento', () => {
      // exercise: 3/3 días, meditation: 1/3, reading: 0
      tracker.logCompletion('exercise', '2025-01-01');
      tracker.logCompletion('exercise', '2025-01-02');
      tracker.logCompletion('exercise', '2025-01-03');
      tracker.logCompletion('meditation', '2025-01-01');

      const summary = tracker.getStatsSummary('2025-01-01', '2025-01-03');
      expect(summary.bestHabit).toBe('exercise');
    });

    test('worstHabit debe ser el hábito con menor tasa de cumplimiento', () => {
      tracker.logCompletion('exercise', '2025-01-01');
      tracker.logCompletion('exercise', '2025-01-02');
      tracker.logCompletion('exercise', '2025-01-03');
      tracker.logCompletion('meditation', '2025-01-01');

      const summary = tracker.getStatsSummary('2025-01-01', '2025-01-03');
      // reading: 0% en ese período diario (no tiene completions en esas fechas)
      expect(summary.worstHabit).toBe('reading');
    });

    test('overallRate debe ser el promedio de las tasas de todos los hábitos', () => {
      // exercise: 3/3 = 100%, meditation: 1/3 ≈ 33.33%, reading: 0/3 = 0%
      tracker.logCompletion('exercise', '2025-01-01');
      tracker.logCompletion('exercise', '2025-01-02');
      tracker.logCompletion('exercise', '2025-01-03');
      tracker.logCompletion('meditation', '2025-01-01');

      const summary = tracker.getStatsSummary('2025-01-01', '2025-01-03');
      // Promedio: (100 + 33.33 + 0) / 3 ≈ 44.44
      expect(summary.overallRate).toBeCloseTo(44.44, 1);
    });
  });
});
