const {
  createExpense,
  addExpense,
  getTotalPaid,
  getTotalOwed,
  getNetBalance,
  getAllBalances,
  getExpensesByCategory,
  getPersonHistory,
  getHighestSpender,
  simplifyDebts,
  getSummaryReport,
} = require('./buggy-code');
// Para verificar la solución, cambia require('./buggy-code') a require('./solution')

// ---------------------------------------------------------------------------
// Datos de prueba compartidos
// ---------------------------------------------------------------------------

function buildScenario() {
  let expenses = [];

  // Ana paga 90€ por cena compartida entre Ana, Luis y Marta
  expenses = addExpense(expenses, createExpense('Cena', 90, 'Ana', ['Ana', 'Luis', 'Marta'], 'comida'));
  // Luis paga 60€ por taxi compartido entre Luis y Marta
  expenses = addExpense(expenses, createExpense('Taxi', 60, 'Luis', ['Luis', 'Marta'], 'transporte'));
  // Marta paga 30€ por café solo para ella
  expenses = addExpense(expenses, createExpense('Café', 30, 'Marta', ['Marta'], 'comida'));
  // Ana paga 120€ por hotel entre los tres
  expenses = addExpense(expenses, createExpense('Hotel', 120, 'Ana', ['Ana', 'Luis', 'Marta'], 'alojamiento'));

  return expenses;
}

// ---------------------------------------------------------------------------
// createExpense
// ---------------------------------------------------------------------------
describe('createExpense', () => {
  test('debe crear un objeto de gasto con todas las propiedades requeridas', () => {
    const expense = createExpense('Cena', 90, 'Ana', ['Ana', 'Luis', 'Marta'], 'comida');
    expect(expense).toHaveProperty('description', 'Cena');
    expect(expense).toHaveProperty('amount', 90);
    expect(expense).toHaveProperty('payer', 'Ana');
    expect(expense).toHaveProperty('participants');
    expect(expense).toHaveProperty('category', 'comida');
  });

  test('debe incluir todos los participantes correctamente', () => {
    const expense = createExpense('Viaje', 150, 'Luis', ['Luis', 'Marta'], 'transporte');
    expect(expense.participants).toEqual(['Luis', 'Marta']);
    expect(expense.participants).toHaveLength(2);
  });

  test('debe calcular el coste por persona correctamente (split equitativo)', () => {
    const expense = createExpense('Cena', 90, 'Ana', ['Ana', 'Luis', 'Marta'], 'comida');
    // 90 / 3 = 30 por persona
    expect(expense.perPersonCost).toBeCloseTo(30, 4);
  });

  test('debe calcular correctamente el coste cuando hay un solo participante', () => {
    const expense = createExpense('Café', 30, 'Marta', ['Marta'], 'comida');
    expect(expense.perPersonCost).toBeCloseTo(30, 4);
  });

  test('debe lanzar error si el monto es cero o negativo', () => {
    expect(() => createExpense('Test', 0, 'Ana', ['Ana'], 'comida')).toThrow();
    expect(() => createExpense('Test', -10, 'Ana', ['Ana'], 'comida')).toThrow();
  });

  test('debe lanzar error si la lista de participantes está vacía', () => {
    expect(() => createExpense('Test', 50, 'Ana', [], 'comida')).toThrow();
  });

  test('debe lanzar error si el pagador no está en la lista de participantes', () => {
    expect(() => createExpense('Test', 50, 'Carlos', ['Ana', 'Luis'], 'comida')).toThrow();
  });
});

// ---------------------------------------------------------------------------
// addExpense
// ---------------------------------------------------------------------------
describe('addExpense', () => {
  test('debe retornar un nuevo arreglo con el gasto añadido', () => {
    const expenses = [];
    const expense = createExpense('Cena', 90, 'Ana', ['Ana', 'Luis'], 'comida');
    const result = addExpense(expenses, expense);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(expense);
  });

  test('debe no mutar el arreglo original', () => {
    const expenses = [];
    const expense = createExpense('Cena', 90, 'Ana', ['Ana', 'Luis'], 'comida');
    addExpense(expenses, expense);
    expect(expenses).toHaveLength(0);
  });

  test('debe acumular múltiples gastos correctamente', () => {
    let expenses = [];
    expenses = addExpense(expenses, createExpense('Cena', 90, 'Ana', ['Ana', 'Luis'], 'comida'));
    expenses = addExpense(expenses, createExpense('Taxi', 40, 'Luis', ['Ana', 'Luis'], 'transporte'));
    expect(expenses).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// getTotalPaid
// ---------------------------------------------------------------------------
describe('getTotalPaid', () => {
  test('debe retornar el total pagado por una persona concreta', () => {
    const expenses = buildScenario();
    // Ana pagó 90 (Cena) + 120 (Hotel) = 210
    expect(getTotalPaid(expenses, 'Ana')).toBeCloseTo(210, 4);
  });

  test('debe retornar el total pagado por Luis', () => {
    const expenses = buildScenario();
    // Luis pagó 60 (Taxi)
    expect(getTotalPaid(expenses, 'Luis')).toBeCloseTo(60, 4);
  });

  test('debe retornar 0 cuando la persona no ha pagado ningún gasto', () => {
    const expenses = buildScenario();
    // Marta pagó solo el Café (30) → devuelve 30
    expect(getTotalPaid(expenses, 'Pedro')).toBeCloseTo(0, 4);
  });

  test('debe retornar 0 cuando el arreglo de gastos está vacío', () => {
    expect(getTotalPaid([], 'Ana')).toBeCloseTo(0, 4);
  });
});

// ---------------------------------------------------------------------------
// getTotalOwed
// ---------------------------------------------------------------------------
describe('getTotalOwed', () => {
  test('debe retornar el total que debe una persona entre todos los gastos', () => {
    const expenses = buildScenario();
    // Luis participa en: Cena (30) + Taxi (30) + Hotel (40) = 100
    expect(getTotalOwed(expenses, 'Luis')).toBeCloseTo(100, 4);
  });

  test('debe retornar el total que debe Ana', () => {
    const expenses = buildScenario();
    // Ana participa en: Cena (30) + Hotel (40) = 70
    expect(getTotalOwed(expenses, 'Ana')).toBeCloseTo(70, 4);
  });

  test('debe retornar el total que debe Marta', () => {
    const expenses = buildScenario();
    // Marta participa en: Cena (30) + Taxi (30) + Café (30) + Hotel (40) = 130
    expect(getTotalOwed(expenses, 'Marta')).toBeCloseTo(130, 4);
  });

  test('debe retornar 0 para alguien que no participa en ningún gasto', () => {
    const expenses = buildScenario();
    expect(getTotalOwed(expenses, 'Pedro')).toBeCloseTo(0, 4);
  });
});

// ---------------------------------------------------------------------------
// getNetBalance
// ---------------------------------------------------------------------------
describe('getNetBalance', () => {
  test('debe retornar balance positivo cuando la persona pagó más de lo que debe', () => {
    const expenses = buildScenario();
    // Ana: pagó 210, debe 70 → balance = 210 - 70 = +140
    expect(getNetBalance(expenses, 'Ana')).toBeCloseTo(140, 4);
  });

  test('debe retornar balance negativo cuando la persona debe más de lo que pagó', () => {
    const expenses = buildScenario();
    // Luis: pagó 60, debe 100 → balance = 60 - 100 = -40
    expect(getNetBalance(expenses, 'Luis')).toBeCloseTo(-40, 4);
  });

  test('debe retornar balance negativo para Marta', () => {
    const expenses = buildScenario();
    // Marta: pagó 30, debe 130 → balance = 30 - 130 = -100
    expect(getNetBalance(expenses, 'Marta')).toBeCloseTo(-100, 4);
  });

  test('debe retornar 0 cuando la persona pagó exactamente lo que debe', () => {
    let expenses = [];
    // Pedro paga 60, comparte entre Pedro y María (30 c/u)
    // María paga 60, comparte entre Pedro y María (30 c/u)
    expenses = addExpense(expenses, createExpense('Cena', 60, 'Pedro', ['Pedro', 'María'], 'comida'));
    expenses = addExpense(expenses, createExpense('Taxi', 60, 'María', ['Pedro', 'María'], 'transporte'));
    expect(getNetBalance(expenses, 'Pedro')).toBeCloseTo(0, 4);
    expect(getNetBalance(expenses, 'María')).toBeCloseTo(0, 4);
  });
});

// ---------------------------------------------------------------------------
// getAllBalances
// ---------------------------------------------------------------------------
describe('getAllBalances', () => {
  test('debe retornar el balance de todos los participantes únicos', () => {
    const expenses = buildScenario();
    const balances = getAllBalances(expenses);
    expect(balances).toHaveLength(3);
  });

  test('debe incluir a Ana, Luis y Marta con sus balances correctos', () => {
    const expenses = buildScenario();
    const balances = getAllBalances(expenses);
    const ana = balances.find((b) => b.person === 'Ana');
    const luis = balances.find((b) => b.person === 'Luis');
    const marta = balances.find((b) => b.person === 'Marta');

    expect(ana.balance).toBeCloseTo(140, 4);
    expect(luis.balance).toBeCloseTo(-40, 4);
    expect(marta.balance).toBeCloseTo(-100, 4);
  });

  test('la suma de todos los balances debe ser cero (dinero conservado)', () => {
    const expenses = buildScenario();
    const balances = getAllBalances(expenses);
    const total = balances.reduce((sum, b) => sum + b.balance, 0);
    expect(total).toBeCloseTo(0, 4);
  });

  test('debe retornar arreglo vacío cuando no hay gastos', () => {
    const balances = getAllBalances([]);
    expect(balances).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// getExpensesByCategory
// ---------------------------------------------------------------------------
describe('getExpensesByCategory', () => {
  test('debe retornar solo los gastos de la categoría indicada', () => {
    const expenses = buildScenario();
    const foodExpenses = getExpensesByCategory(expenses, 'comida');
    // Cena (90) + Café (30)
    expect(foodExpenses).toHaveLength(2);
  });

  test('debe retornar los gastos de alojamiento', () => {
    const expenses = buildScenario();
    const lodging = getExpensesByCategory(expenses, 'alojamiento');
    expect(lodging).toHaveLength(1);
    expect(lodging[0].description).toBe('Hotel');
  });

  test('debe retornar arreglo vacío para una categoría inexistente', () => {
    const expenses = buildScenario();
    const result = getExpensesByCategory(expenses, 'entretenimiento');
    expect(result).toHaveLength(0);
  });

  test('debe retornar todos los gastos que coinciden incluyendo montos correctos', () => {
    const expenses = buildScenario();
    const foodExpenses = getExpensesByCategory(expenses, 'comida');
    const totalFood = foodExpenses.reduce((sum, e) => sum + e.amount, 0);
    // 90 + 30 = 120
    expect(totalFood).toBeCloseTo(120, 4);
  });
});

// ---------------------------------------------------------------------------
// getPersonHistory
// ---------------------------------------------------------------------------
describe('getPersonHistory', () => {
  test('debe retornar todos los gastos en los que participa una persona', () => {
    const expenses = buildScenario();
    // Ana participa en: Cena, Hotel
    const history = getPersonHistory(expenses, 'Ana');
    expect(history).toHaveLength(2);
  });

  test('debe retornar todos los gastos en los que participa Marta', () => {
    const expenses = buildScenario();
    // Marta participa en: Cena, Taxi, Café, Hotel
    const history = getPersonHistory(expenses, 'Marta');
    expect(history).toHaveLength(4);
  });

  test('debe retornar arreglo vacío para alguien que no participa en ningún gasto', () => {
    const expenses = buildScenario();
    const history = getPersonHistory(expenses, 'Pedro');
    expect(history).toHaveLength(0);
  });

  test('cada elemento del historial debe ser un gasto completo con todas sus propiedades', () => {
    const expenses = buildScenario();
    const history = getPersonHistory(expenses, 'Luis');
    history.forEach((e) => {
      expect(e).toHaveProperty('description');
      expect(e).toHaveProperty('amount');
      expect(e).toHaveProperty('payer');
      expect(e).toHaveProperty('participants');
      expect(e).toHaveProperty('category');
    });
  });
});

// ---------------------------------------------------------------------------
// getHighestSpender
// ---------------------------------------------------------------------------
describe('getHighestSpender', () => {
  test('debe retornar el nombre de quien más ha pagado', () => {
    const expenses = buildScenario();
    // Ana pagó 210, Luis pagó 60, Marta pagó 30
    expect(getHighestSpender(expenses)).toBe('Ana');
  });

  test('debe funcionar con un único gasto', () => {
    const expenses = [createExpense('Cena', 90, 'Luis', ['Luis', 'Marta'], 'comida')];
    expect(getHighestSpender(expenses)).toBe('Luis');
  });

  test('debe lanzar error cuando no hay gastos', () => {
    expect(() => getHighestSpender([])).toThrow();
  });
});

// ---------------------------------------------------------------------------
// simplifyDebts
// ---------------------------------------------------------------------------
describe('simplifyDebts', () => {
  test('debe retornar transacciones que liquidan las deudas netas', () => {
    const expenses = buildScenario();
    const transactions = simplifyDebts(expenses);
    // Las transacciones deben cubrir todas las deudas netas
    expect(transactions.length).toBeGreaterThan(0);
  });

  test('cada transacción debe tener from, to y amount', () => {
    const expenses = buildScenario();
    const transactions = simplifyDebts(expenses);
    transactions.forEach((t) => {
      expect(t).toHaveProperty('from');
      expect(t).toHaveProperty('to');
      expect(t).toHaveProperty('amount');
      expect(t.amount).toBeGreaterThan(0);
    });
  });

  test('después de aplicar las transacciones todos los balances deben quedar en cero', () => {
    const expenses = buildScenario();
    const transactions = simplifyDebts(expenses);
    const balances = getAllBalances(expenses);

    // Simular la aplicación de las transacciones
    const settled = balances.map((b) => ({ ...b }));
    transactions.forEach((t) => {
      const payer = settled.find((b) => b.person === t.from);
      const receiver = settled.find((b) => b.person === t.to);
      if (payer) payer.balance += t.amount;
      if (receiver) receiver.balance -= t.amount;
    });

    settled.forEach((b) => {
      expect(b.balance).toBeCloseTo(0, 4);
    });
  });

  test('debe retornar arreglo vacío cuando todos los balances son cero', () => {
    let expenses = [];
    expenses = addExpense(expenses, createExpense('Cena', 60, 'Pedro', ['Pedro', 'María'], 'comida'));
    expenses = addExpense(expenses, createExpense('Taxi', 60, 'María', ['Pedro', 'María'], 'transporte'));
    const transactions = simplifyDebts(expenses);
    expect(transactions).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// getSummaryReport
// ---------------------------------------------------------------------------
describe('getSummaryReport', () => {
  test('debe retornar un objeto con totalExpenses correcto', () => {
    const expenses = buildScenario();
    // 90 + 60 + 30 + 120 = 300
    const report = getSummaryReport(expenses);
    expect(report.totalExpenses).toBeCloseTo(300, 4);
  });

  test('debe retornar el número correcto de participantes únicos', () => {
    const expenses = buildScenario();
    const report = getSummaryReport(expenses);
    expect(report.participantCount).toBe(3);
  });

  test('debe incluir el desglose por categoría', () => {
    const expenses = buildScenario();
    const report = getSummaryReport(expenses);
    expect(report.byCategory).toHaveProperty('comida');
    expect(report.byCategory).toHaveProperty('transporte');
    expect(report.byCategory).toHaveProperty('alojamiento');
    expect(report.byCategory.comida).toBeCloseTo(120, 4);
    expect(report.byCategory.transporte).toBeCloseTo(60, 4);
    expect(report.byCategory.alojamiento).toBeCloseTo(120, 4);
  });

  test('debe retornar el balance más alto y el más bajo', () => {
    const expenses = buildScenario();
    const report = getSummaryReport(expenses);
    expect(report.highestBalance.person).toBe('Ana');
    expect(report.highestBalance.balance).toBeCloseTo(140, 4);
    expect(report.lowestBalance.person).toBe('Marta');
    expect(report.lowestBalance.balance).toBeCloseTo(-100, 4);
  });

  test('debe lanzar error cuando no hay gastos', () => {
    expect(() => getSummaryReport([])).toThrow();
  });
});
