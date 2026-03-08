/**
 * Habit Tracker
 *
 * Sistema de seguimiento de hábitos diarios y semanales.
 * Permite registrar cumplimientos, calcular rachas, tasas de
 * cumplimiento, hábitos vencidos y un resumen de estadísticas.
 */

// ─── Utilidades de fecha ─────────────────────────────────────────────────────

/**
 * Convierte una cadena 'YYYY-MM-DD' a un objeto Date (medianoche UTC).
 */
function parseDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

/**
 * Devuelve la diferencia en días entre dos fechas (b - a).
 */
function diffDays(dateStrA, dateStrB) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((parseDate(dateStrB) - parseDate(dateStrA)) / msPerDay);
}

/**
 * Devuelve el número de semana ISO de una fecha 'YYYY-MM-DD'.
 * Dos fechas con la misma clave año-semana pertenecen a la misma semana.
 */
function getWeekKey(dateStr) {
  const d = parseDate(dateStr);
  // Ajustar al jueves de la semana para calcular semana ISO
  const thursday = new Date(d);
  thursday.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil(((thursday - yearStart) / 86400000 + 1) / 7);
  return `${thursday.getUTCFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

/**
 * Genera una lista de fechas 'YYYY-MM-DD' entre start y end (inclusivo).
 */
function dateRange(startStr, endStr) {
  const dates = [];
  const start = parseDate(startStr);
  const end = parseDate(endStr);
  const msPerDay = 1000 * 60 * 60 * 24;
  for (let d = new Date(start); d <= end; d = new Date(d.getTime() + msPerDay)) {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    dates.push(`${y}-${m}-${day}`);
  }
  return dates;
}

/**
 * Dado un conjunto de fechas de cumplimiento y una frecuencia,
 * devuelve una lista de "unidades" únicas cumplidas (días o claves de semana).
 */
function getCompletionUnits(completions, frequency) {
  if (frequency === 'daily') {
    return [...new Set(completions)].sort();
  }
  // weekly: agrupar por semana ISO
  const weeks = completions.map(getWeekKey);
  return [...new Set(weeks)].sort();
}

// ─── Clase principal ─────────────────────────────────────────────────────────

class HabitTracker {
  constructor() {
    /** @type {Map<string, {name:string, frequency:string, category:string, completions:string[]}>} */
    this.habits = new Map();
  }

  // ── Gestión de hábitos ─────────────────────────────────────────────────────

  addHabit(name, frequency, category) {
    if (!['daily', 'weekly'].includes(frequency)) {
      throw new Error(`Frecuencia inválida: "${frequency}". Use "daily" o "weekly".`);
    }
    if (this.habits.has(name)) {
      throw new Error(`El hábito "${name}" ya existe.`);
    }
    this.habits.set(name, {
      name,
      frequency,
      category,
      completions: [],
    });
    return this;
  }

  getHabit(name) {
    const habit = this.habits.get(name);
    if (!habit) throw new Error(`Hábito "${name}" no encontrado.`);
    return habit;
  }

  removeHabit(name) {
    if (!this.habits.has(name)) throw new Error(`Hábito "${name}" no encontrado.`);
    this.habits.delete(name);
    return this;
  }

  // ── Registro de cumplimientos ──────────────────────────────────────────────

  logCompletion(name, dateStr) {
    const habit = this.getHabit(name);
    if (!habit.completions.includes(dateStr)) {
      habit.completions.push(dateStr);
      habit.completions.sort();
    }
    return this;
  }

  // ── Rachas ─────────────────────────────────────────────────────────────────

  /**
   * Calcula la racha actual a partir de 'today'.
   * Para hábitos diarios: cuenta días consecutivos hacia atrás.
   * Para hábitos semanales: cuenta semanas consecutivas hacia atrás.
   *
   * CORREGIDO: La racha actual parte desde 'today' y retrocede. Un hábito
   * diario sigue activo si se cumplió hoy o ayer. Para semanas, la
   * semana actual también se cuenta si fue cumplida.
   */
  getCurrentStreak(name, today) {
    const habit = this.getHabit(name);
    if (habit.completions.length === 0) return 0;

    const units = getCompletionUnits(habit.completions, habit.frequency);
    const unitSet = new Set(units);

    if (habit.frequency === 'daily') {
      // La racha es válida si se cumplió hoy o ayer
      const todayCompleted = unitSet.has(today);
      const yesterday = dateRange(today, today)[0]; // placeholder
      const msPerDay = 1000 * 60 * 60 * 24;
      const yesterdayDate = new Date(parseDate(today).getTime() - msPerDay);
      const yy = yesterdayDate.getUTCFullYear();
      const ym = String(yesterdayDate.getUTCMonth() + 1).padStart(2, '0');
      const yd = String(yesterdayDate.getUTCDate()).padStart(2, '0');
      const yesterdayStr = `${yy}-${ym}-${yd}`;

      if (!todayCompleted && !unitSet.has(yesterdayStr)) return 0;

      // Contar hacia atrás desde el último día completado ≤ today
      const startDay = todayCompleted ? today : yesterdayStr;
      let streak = 0;
      let current = startDay;
      while (unitSet.has(current)) {
        streak++;
        const prev = new Date(parseDate(current).getTime() - msPerDay);
        const py = prev.getUTCFullYear();
        const pm = String(prev.getUTCMonth() + 1).padStart(2, '0');
        const pd = String(prev.getUTCDate()).padStart(2, '0');
        current = `${py}-${pm}-${pd}`;
      }
      return streak;
    }

    // weekly
    const todayWeek = getWeekKey(today);
    const sortedWeeks = [...units].sort();
    const lastWeek = sortedWeeks[sortedWeeks.length - 1];

    // La racha es válida si se completó la semana actual o la anterior
    const weekIndex = sortedWeeks.indexOf(todayWeek);
    const prevWeekDate = new Date(parseDate(today).getTime() - 7 * 24 * 60 * 60 * 1000);
    const prevWeekKey = getWeekKey(
      `${prevWeekDate.getUTCFullYear()}-${String(prevWeekDate.getUTCMonth() + 1).padStart(2, '0')}-${String(prevWeekDate.getUTCDate()).padStart(2, '0')}`
    );

    const activeWeek = unitSet.has(todayWeek)
      ? todayWeek
      : unitSet.has(prevWeekKey)
      ? prevWeekKey
      : null;

    if (!activeWeek) return 0;

    // Contar semanas consecutivas hacia atrás desde activeWeek
    let streak = 0;
    let idx = sortedWeeks.indexOf(activeWeek);
    while (idx >= 0) {
      if (idx === sortedWeeks.indexOf(activeWeek) - streak) {
        // comprobar que la semana anterior es exactamente la previa
      }
      // Verificar consecutividad comparando con la semana previa esperada
      if (streak === 0) {
        streak = 1;
        idx--;
      } else {
        // La semana en idx debe ser exactamente 1 semana antes de la siguiente
        const currentWeek = sortedWeeks[idx + 1];
        const candidateWeek = sortedWeeks[idx];
        const currentDate = parseDate(`${currentWeek.split('-W')[0]}-01-01`);
        // Usar la diferencia de índices en sortedWeeks para determinar consecutividad
        // Dos semanas son consecutivas si su diferencia en clave es 1
        if (!areConsecutiveWeeks(candidateWeek, currentWeek)) break;
        streak++;
        idx--;
      }
    }
    return streak;
  }

  /**
   * Calcula la racha más larga histórica de un hábito.
   */
  getLongestStreak(name) {
    const habit = this.getHabit(name);
    if (habit.completions.length === 0) return 0;

    const units = getCompletionUnits(habit.completions, habit.frequency);
    if (units.length === 0) return 0;

    let longest = 1;
    let current = 1;

    for (let i = 1; i < units.length; i++) {
      const consecutive =
        habit.frequency === 'daily'
          ? diffDays(units[i - 1], units[i]) === 1
          : areConsecutiveWeeks(units[i - 1], units[i]);

      if (consecutive) {
        current++;
        if (current > longest) longest = current;
      } else {
        current = 1;
      }
    }

    return longest;
  }

  // ── Tasa de cumplimiento ───────────────────────────────────────────────────

  /**
   * Calcula el porcentaje de cumplimiento entre startStr y endStr (inclusivo).
   * Para diarios: cumplimientos / días totales * 100
   * Para semanales: semanas cumplidas / semanas totales * 100
   *
   * CORREGIDO: Para calcular las semanas del período se usa un set de claves
   * semanales a partir del rango de fechas, no una división entera de días.
   */
  getCompletionRate(name, startStr, endStr) {
    const habit = this.getHabit(name);

    if (habit.frequency === 'daily') {
      const allDays = dateRange(startStr, endStr);
      const totalDays = allDays.length;
      if (totalDays === 0) return 0;
      const completed = habit.completions.filter(d => d >= startStr && d <= endStr).length;
      return Math.round((completed / totalDays) * 10000) / 100;
    }

    // weekly
    const allDays = dateRange(startStr, endStr);
    const periodWeeks = [...new Set(allDays.map(getWeekKey))];
    const totalWeeks = periodWeeks.length;
    if (totalWeeks === 0) return 0;

    const completedWeeks = new Set(
      habit.completions
        .filter(d => d >= startStr && d <= endStr)
        .map(getWeekKey)
    );
    return Math.round((completedWeeks.size / totalWeeks) * 10000) / 100;
  }

  // ── Filtros ────────────────────────────────────────────────────────────────

  getHabitsByCategory(category) {
    return [...this.habits.values()].filter(h => h.category === category);
  }

  /**
   * Retorna los hábitos que no han sido cumplidos en el período esperado
   * a partir de 'today'.
   * - Diario: vencido si el último cumplimiento fue hace 2+ días.
   * - Semanal: vencido si el último cumplimiento fue hace 8+ días.
   */
  getOverdueHabits(today) {
    return [...this.habits.values()].filter(habit => {
      if (habit.completions.length === 0) return true;

      const sorted = [...habit.completions].sort();
      const last = sorted[sorted.length - 1];
      const daysSince = diffDays(last, today);

      if (habit.frequency === 'daily') {
        // Vencido si no fue cumplido hoy (0) ni ayer (1)
        return daysSince >= 2;
      } else {
        // Vencido si no fue cumplido en los últimos 7 días
        return daysSince >= 8;
      }
    });
  }

  // ── Resumen de estadísticas ────────────────────────────────────────────────

  /**
   * Retorna un objeto con:
   *   - bestHabit: nombre del hábito con mayor tasa de cumplimiento en el período
   *   - worstHabit: nombre del hábito con menor tasa de cumplimiento
   *   - overallRate: promedio de las tasas de todos los hábitos
   */
  getStatsSummary(startStr, endStr) {
    const habits = [...this.habits.values()];

    const rates = habits.map(h => ({
      name: h.name,
      rate: this.getCompletionRate(h.name, startStr, endStr),
    }));

    const sorted = [...rates].sort((a, b) => b.rate - a.rate);

    const bestHabit = sorted[0].name;
    const worstHabit = sorted[sorted.length - 1].name;
    const overallRate =
      Math.round(
        (rates.reduce((sum, r) => sum + r.rate, 0) / rates.length) * 100
      ) / 100;

    return { bestHabit, worstHabit, overallRate };
  }

  // ── Listados ───────────────────────────────────────────────────────────────

  getAllHabits() {
    return [...this.habits.values()];
  }

  getHabitSummary(name, today) {
    const habit = this.getHabit(name);
    return {
      name: habit.name,
      frequency: habit.frequency,
      category: habit.category,
      totalCompletions: habit.completions.length,
      currentStreak: this.getCurrentStreak(name, today),
      longestStreak: this.getLongestStreak(name),
    };
  }
}

// ─── Helper para consecutividad de semanas ────────────────────────────────────

/**
 * Determina si weekB es exactamente la semana siguiente a weekA.
 * Las claves tienen formato 'YYYY-Www'.
 */
function areConsecutiveWeeks(weekA, weekB) {
  const [yearA, wA] = weekA.split('-W').map(Number);
  const [yearB, wB] = weekB.split('-W').map(Number);

  if (yearA === yearB) return wB - wA === 1;
  if (yearB === yearA + 1) {
    // La semana A es la última del año A y B es la semana 1
    const lastWeekOfYearA = getLastISOWeek(yearA);
    return wA === lastWeekOfYearA && wB === 1;
  }
  return false;
}

/**
 * Devuelve el número de la última semana ISO de un año.
 */
function getLastISOWeek(year) {
  // El 28 de diciembre siempre está en la última semana ISO del año
  return Number(getWeekKey(`${year}-12-28`).split('-W')[1]);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HabitTracker };
}
