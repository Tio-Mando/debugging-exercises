const {
  compoundInterest,
  simpleInterest,
  futureValue,
  presentValue,
  ruleOf72,
  roi,
  annualizedReturn,
  inflationAdjustedReturn,
  portfolioReturn,
  rankInvestments,
  filterByMinROI,
} = require('./buggy-code');
// Para verificar la solución, cambia require('./buggy-code') a require('./solution')

// ---------------------------------------------------------------------------
// compoundInterest
// ---------------------------------------------------------------------------
describe('compoundInterest', () => {
  test('debe calcular el monto final con capitalización anual simple', () => {
    // 1000 * (1 + 0.05/1)^(1*1) = 1050
    const result = compoundInterest(1000, 0.05, 1, 1);
    expect(result).toBeCloseTo(1050, 4);
  });

  test('debe calcular el monto final con capitalización mensual', () => {
    // 1000 * (1 + 0.12/12)^(12*1) = 1126.8250...
    const result = compoundInterest(1000, 0.12, 12, 1);
    expect(result).toBeCloseTo(1126.825, 2);
  });

  test('debe calcular el monto final con capitalización diaria durante varios años', () => {
    // 5000 * (1 + 0.06/365)^(365*3) ≈ 5985.9983
    const result = compoundInterest(5000, 0.06, 365, 3);
    expect(result).toBeCloseTo(5985.9983, 2);
  });

  test('debe lanzar error cuando el principal es cero o negativo', () => {
    expect(() => compoundInterest(0, 0.05, 12, 1)).toThrow();
    expect(() => compoundInterest(-500, 0.05, 12, 1)).toThrow();
  });

  test('debe lanzar error cuando la tasa es negativa', () => {
    expect(() => compoundInterest(1000, -0.05, 12, 1)).toThrow();
  });

  test('debe lanzar error cuando n o t son cero o negativos', () => {
    expect(() => compoundInterest(1000, 0.05, 0, 1)).toThrow();
    expect(() => compoundInterest(1000, 0.05, 12, 0)).toThrow();
  });
});

// ---------------------------------------------------------------------------
// simpleInterest
// ---------------------------------------------------------------------------
describe('simpleInterest', () => {
  test('debe retornar solo el interés ganado, no el monto total', () => {
    // 1000 * 0.05 * 3 = 150 (NOT 1150)
    const result = simpleInterest(1000, 0.05, 3);
    expect(result).toBeCloseTo(150, 4);
  });

  test('debe calcular correctamente el interés para un año', () => {
    // 2000 * 0.08 * 1 = 160
    const result = simpleInterest(2000, 0.08, 1);
    expect(result).toBeCloseTo(160, 4);
  });

  test('debe calcular correctamente el interés para múltiples años', () => {
    // 500 * 0.1 * 5 = 250
    const result = simpleInterest(500, 0.1, 5);
    expect(result).toBeCloseTo(250, 4);
  });

  test('debe lanzar error cuando el principal es cero o negativo', () => {
    expect(() => simpleInterest(0, 0.05, 2)).toThrow();
    expect(() => simpleInterest(-100, 0.05, 2)).toThrow();
  });
});

// ---------------------------------------------------------------------------
// futureValue
// ---------------------------------------------------------------------------
describe('futureValue', () => {
  test('debe calcular el valor futuro sin pagos periódicos', () => {
    // 1000 * (1.07)^5 + 0 * [...] = 1402.5517...
    const result = futureValue(1000, 0.07, 5, 0);
    expect(result).toBeCloseTo(1402.5517, 3);
  });

  test('debe calcular el valor futuro con pagos periódicos positivos', () => {
    // 0 * (1.05)^10 + 1000 * [((1.05)^10 - 1) / 0.05]
    // = 1000 * 12.5779... = 12577.89...
    const result = futureValue(0, 0.05, 10, 1000);
    expect(result).toBeCloseTo(12577.89, 1);
  });

  test('debe calcular el valor futuro correctamente cuando rate es 0', () => {
    // FV = 1000 + 200 * 5 = 2000
    const result = futureValue(1000, 0, 5, 200);
    expect(result).toBeCloseTo(2000, 4);
  });

  test('debe lanzar error cuando years es cero o negativo', () => {
    expect(() => futureValue(1000, 0.05, 0, 0)).toThrow();
    expect(() => futureValue(1000, 0.05, -1, 0)).toThrow();
  });

  test('debe lanzar error cuando el principal es negativo', () => {
    expect(() => futureValue(-500, 0.05, 5, 0)).toThrow();
  });
});

// ---------------------------------------------------------------------------
// presentValue
// ---------------------------------------------------------------------------
describe('presentValue', () => {
  test('debe calcular el valor presente correctamente', () => {
    // PV = 1000 / (1.05)^5 = 783.5261...
    const result = presentValue(1000, 0.05, 5);
    expect(result).toBeCloseTo(783.5262, 3);
  });

  test('debe ser el inverso de compoundInterest', () => {
    // Si compoundInterest(500, 0.08, 1, 10) = futureAmount,
    // entonces presentValue(futureAmount, 0.08, 10) ≈ 500
    const futureAmount = compoundInterest(500, 0.08, 1, 10);
    const result = presentValue(futureAmount, 0.08, 10);
    expect(result).toBeCloseTo(500, 4);
  });

  test('debe lanzar error cuando futureAmount es cero o negativo', () => {
    expect(() => presentValue(0, 0.05, 5)).toThrow();
    expect(() => presentValue(-1000, 0.05, 5)).toThrow();
  });

  test('debe lanzar error cuando years es cero o negativo', () => {
    expect(() => presentValue(1000, 0.05, 0)).toThrow();
  });
});

// ---------------------------------------------------------------------------
// ruleOf72
// ---------------------------------------------------------------------------
describe('ruleOf72', () => {
  test('debe retornar 12 cuando la tasa anual es 6%', () => {
    const result = ruleOf72(6);
    expect(result).toBeCloseTo(12, 4);
  });

  test('debe retornar 9 cuando la tasa anual es 8%', () => {
    const result = ruleOf72(8);
    expect(result).toBeCloseTo(9, 4);
  });

  test('debe retornar 7.2 cuando la tasa anual es 10%', () => {
    const result = ruleOf72(10);
    expect(result).toBeCloseTo(7.2, 4);
  });

  test('debe lanzar error cuando la tasa es cero o negativa', () => {
    expect(() => ruleOf72(0)).toThrow();
    expect(() => ruleOf72(-5)).toThrow();
  });
});

// ---------------------------------------------------------------------------
// roi
// ---------------------------------------------------------------------------
describe('roi', () => {
  test('debe calcular el ROI positivo correctamente', () => {
    // (1500 - 1000) / 1000 * 100 = 50%
    const result = roi(1000, 1500);
    expect(result).toBeCloseTo(50, 4);
  });

  test('debe calcular el ROI negativo correctamente (pérdida)', () => {
    // (800 - 1000) / 1000 * 100 = -20%
    const result = roi(1000, 800);
    expect(result).toBeCloseTo(-20, 4);
  });

  test('debe retornar 0 cuando el valor final es igual al inicial', () => {
    const result = roi(1000, 1000);
    expect(result).toBeCloseTo(0, 4);
  });

  test('debe lanzar error cuando la inversión inicial es cero o negativa', () => {
    expect(() => roi(0, 1500)).toThrow();
    expect(() => roi(-100, 1500)).toThrow();
  });
});

// ---------------------------------------------------------------------------
// annualizedReturn
// ---------------------------------------------------------------------------
describe('annualizedReturn', () => {
  test('debe calcular el CAGR cuando el valor se duplica en 10 años', () => {
    // (200/100)^(1/10) - 1 ≈ 0.07177
    const result = annualizedReturn(100, 200, 10);
    expect(result).toBeCloseTo(0.07177, 4);
  });

  test('debe calcular el CAGR para un período de 5 años', () => {
    // (1610.51/1000)^(1/5) - 1 ≈ 0.10 (10%)
    const result = annualizedReturn(1000, 1610.51, 5);
    expect(result).toBeCloseTo(0.1, 3);
  });

  test('debe lanzar error cuando initialValue es cero o negativo', () => {
    expect(() => annualizedReturn(0, 200, 10)).toThrow();
    expect(() => annualizedReturn(-50, 200, 10)).toThrow();
  });

  test('debe lanzar error cuando years es cero o negativo', () => {
    expect(() => annualizedReturn(100, 200, 0)).toThrow();
  });
});

// ---------------------------------------------------------------------------
// inflationAdjustedReturn
// ---------------------------------------------------------------------------
describe('inflationAdjustedReturn', () => {
  test('debe calcular el retorno real usando la ecuación de Fisher', () => {
    // (1 + 0.08) / (1 + 0.03) - 1 ≈ 0.04854
    const result = inflationAdjustedReturn(0.08, 0.03);
    expect(result).toBeCloseTo(0.04854, 4);
  });

  test('debe retornar el retorno real cuando la inflación es cero', () => {
    // (1 + 0.07) / (1 + 0) - 1 = 0.07
    const result = inflationAdjustedReturn(0.07, 0);
    expect(result).toBeCloseTo(0.07, 4);
  });

  test('debe lanzar error cuando inflationRate es -1 (división por cero)', () => {
    expect(() => inflationAdjustedReturn(0.08, -1)).toThrow();
  });
});

// ---------------------------------------------------------------------------
// portfolioReturn
// ---------------------------------------------------------------------------
describe('portfolioReturn', () => {
  test('debe calcular el retorno ponderado de un portafolio', () => {
    const holdings = [
      { value: 6000, annualReturn: 0.10 },
      { value: 4000, annualReturn: 0.05 },
    ];
    // weighted = (6000*0.10 + 4000*0.05) / 10000 = (600 + 200) / 10000 = 0.08
    const result = portfolioReturn(holdings);
    expect(result).toBeCloseTo(0.08, 4);
  });

  test('debe calcular el retorno ponderado cuando los activos tienen pesos distintos', () => {
    const holdings = [
      { value: 9000, annualReturn: 0.12 },
      { value: 1000, annualReturn: 0.03 },
    ];
    // weighted = (9000*0.12 + 1000*0.03) / 10000 = (1080 + 30) / 10000 = 0.111
    const result = portfolioReturn(holdings);
    expect(result).toBeCloseTo(0.111, 4);
  });

  test('debe retornar el único retorno cuando el portafolio tiene un solo activo', () => {
    const holdings = [{ value: 5000, annualReturn: 0.07 }];
    const result = portfolioReturn(holdings);
    expect(result).toBeCloseTo(0.07, 4);
  });

  test('debe lanzar error cuando el portafolio está vacío', () => {
    expect(() => portfolioReturn([])).toThrow();
  });

  test('debe lanzar error cuando algún value es cero o negativo', () => {
    const holdings = [
      { value: 0, annualReturn: 0.10 },
      { value: 4000, annualReturn: 0.05 },
    ];
    expect(() => portfolioReturn(holdings)).toThrow();
  });
});

// ---------------------------------------------------------------------------
// rankInvestments
// ---------------------------------------------------------------------------
describe('rankInvestments', () => {
  let investments;

  beforeEach(() => {
    investments = [
      { name: 'Bono A', initialValue: 1000, finalValue: 1100 },  // ROI 10%
      { name: 'Accion B', initialValue: 1000, finalValue: 1500 }, // ROI 50%
      { name: 'Fondo C', initialValue: 1000, finalValue: 900 },   // ROI -10%
    ];
  });

  test('debe ordenar inversiones de mayor a menor ROI', () => {
    const result = rankInvestments(investments);
    expect(result[0].name).toBe('Accion B');
    expect(result[1].name).toBe('Bono A');
    expect(result[2].name).toBe('Fondo C');
  });

  test('debe retornar un arreglo del mismo tamaño que el original', () => {
    const result = rankInvestments(investments);
    expect(result).toHaveLength(3);
  });

  test('debe no mutar el arreglo original', () => {
    const originalFirst = investments[0].name;
    rankInvestments(investments);
    expect(investments[0].name).toBe(originalFirst);
  });
});

// ---------------------------------------------------------------------------
// filterByMinROI
// ---------------------------------------------------------------------------
describe('filterByMinROI', () => {
  let investments;

  beforeEach(() => {
    investments = [
      { name: 'Bono A', initialValue: 1000, finalValue: 1100 },  // ROI 10%
      { name: 'Accion B', initialValue: 1000, finalValue: 1500 }, // ROI 50%
      { name: 'Fondo C', initialValue: 1000, finalValue: 900 },   // ROI -10%
      { name: 'ETF D', initialValue: 2000, finalValue: 2400 },    // ROI 20%
    ];
  });

  test('debe incluir inversiones que superan el umbral mínimo de ROI', () => {
    const result = filterByMinROI(investments, 15);
    expect(result).toHaveLength(2);
    const names = result.map((inv) => inv.name);
    expect(names).toContain('Accion B');
    expect(names).toContain('ETF D');
  });

  test('debe incluir inversiones que igualan exactamente el umbral (inclusive)', () => {
    const result = filterByMinROI(investments, 10);
    expect(result).toHaveLength(3);
  });

  test('debe retornar arreglo vacío cuando ninguna inversión cumple el umbral', () => {
    const result = filterByMinROI(investments, 100);
    expect(result).toHaveLength(0);
  });

  test('debe retornar todas las inversiones cuando el umbral es muy bajo', () => {
    const result = filterByMinROI(investments, -100);
    expect(result).toHaveLength(4);
  });
});
