const ShoppingListOptimizer = require('./buggy-code');
// Para verificar la solución, cambia require('./buggy-code') a require('./solution')

// ---------------------------------------------------------------------------
// Constructor y estado inicial
// ---------------------------------------------------------------------------
describe('ShoppingListOptimizer - constructor y estado inicial', () => {
  test('debe crear una lista vacía sin artículos', () => {
    const list = new ShoppingListOptimizer();
    expect(list.getAll()).toEqual([]);
  });

  test('debe reportar cero artículos en una lista vacía', () => {
    const list = new ShoppingListOptimizer();
    expect(list.count()).toBe(0);
  });

  test('debe calcular costo total de cero en una lista vacía', () => {
    const list = new ShoppingListOptimizer();
    expect(list.getTotalCost()).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// addItem
// ---------------------------------------------------------------------------
describe('addItem', () => {
  test('debe agregar un artículo con todos sus campos correctamente', () => {
    const list = new ShoppingListOptimizer();
    list.addItem({ name: 'Leche', quantity: 2, unitPrice: 1.5, category: 'lácteos', priority: 'high' });
    const all = list.getAll();
    expect(all).toHaveLength(1);
    expect(all[0].name).toBe('Leche');
    expect(all[0].quantity).toBe(2);
    expect(all[0].unitPrice).toBe(1.5);
    expect(all[0].category).toBe('lácteos');
    expect(all[0].priority).toBe('high');
  });

  test('debe lanzar error si el nombre está ausente o vacío', () => {
    const list = new ShoppingListOptimizer();
    expect(() => list.addItem({ quantity: 1, unitPrice: 2, category: 'frutas', priority: 'high' })).toThrow();
    expect(() => list.addItem({ name: '', quantity: 1, unitPrice: 2, category: 'frutas', priority: 'high' })).toThrow();
  });

  test('debe lanzar error si la cantidad es menor o igual a cero', () => {
    const list = new ShoppingListOptimizer();
    expect(() => list.addItem({ name: 'Pan', quantity: 0, unitPrice: 1, category: 'panadería', priority: 'low' })).toThrow();
    expect(() => list.addItem({ name: 'Pan', quantity: -1, unitPrice: 1, category: 'panadería', priority: 'low' })).toThrow();
  });

  test('debe lanzar error si el precio unitario es negativo', () => {
    const list = new ShoppingListOptimizer();
    expect(() => list.addItem({ name: 'Pan', quantity: 1, unitPrice: -5, category: 'panadería', priority: 'low' })).toThrow();
  });

  test('debe lanzar error si la prioridad no es high, medium o low', () => {
    const list = new ShoppingListOptimizer();
    expect(() => list.addItem({ name: 'Pan', quantity: 1, unitPrice: 1, category: 'panadería', priority: 'urgent' })).toThrow();
  });

  test('debe usar medium como prioridad por defecto si no se proporciona', () => {
    const list = new ShoppingListOptimizer();
    list.addItem({ name: 'Arroz', quantity: 1, unitPrice: 2, category: 'granos' });
    expect(list.getAll()[0].priority).toBe('medium');
  });

  test('debe incrementar el contador al agregar artículos', () => {
    const list = new ShoppingListOptimizer();
    list.addItem({ name: 'Leche', quantity: 1, unitPrice: 1.5, category: 'lácteos', priority: 'high' });
    list.addItem({ name: 'Pan', quantity: 2, unitPrice: 0.8, category: 'panadería', priority: 'low' });
    expect(list.count()).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// removeItem
// ---------------------------------------------------------------------------
describe('removeItem', () => {
  let list;

  beforeEach(() => {
    list = new ShoppingListOptimizer();
    list.addItem({ name: 'Leche', quantity: 2, unitPrice: 1.5, category: 'lácteos', priority: 'high' });
    list.addItem({ name: 'Pan', quantity: 1, unitPrice: 0.8, category: 'panadería', priority: 'medium' });
    list.addItem({ name: 'Manzanas', quantity: 6, unitPrice: 0.3, category: 'frutas', priority: 'low' });
  });

  test('debe eliminar el artículo por nombre exacto', () => {
    list.removeItem('Pan');
    expect(list.count()).toBe(2);
    expect(list.getAll().map((i) => i.name)).not.toContain('Pan');
  });

  test('debe retornar true al eliminar un artículo existente', () => {
    expect(list.removeItem('Leche')).toBe(true);
  });

  test('debe retornar false al intentar eliminar un artículo inexistente', () => {
    expect(list.removeItem('Queso')).toBe(false);
  });

  test('debe no modificar la lista si el artículo no existe', () => {
    list.removeItem('Fantasma');
    expect(list.count()).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// updateItem
// ---------------------------------------------------------------------------
describe('updateItem', () => {
  let list;

  beforeEach(() => {
    list = new ShoppingListOptimizer();
    list.addItem({ name: 'Leche', quantity: 2, unitPrice: 1.5, category: 'lácteos', priority: 'high' });
  });

  test('debe actualizar los campos del artículo indicado', () => {
    list.updateItem('Leche', { quantity: 4, unitPrice: 1.8 });
    const item = list.getAll()[0];
    expect(item.quantity).toBe(4);
    expect(item.unitPrice).toBe(1.8);
  });

  test('debe retornar true al actualizar un artículo existente', () => {
    expect(list.updateItem('Leche', { quantity: 3 })).toBe(true);
  });

  test('debe retornar false al intentar actualizar un artículo inexistente', () => {
    expect(list.updateItem('Queso', { quantity: 1 })).toBe(false);
  });

  test('debe preservar los campos no actualizados', () => {
    list.updateItem('Leche', { quantity: 5 });
    const item = list.getAll()[0];
    expect(item.unitPrice).toBe(1.5);
    expect(item.category).toBe('lácteos');
    expect(item.priority).toBe('high');
  });
});

// ---------------------------------------------------------------------------
// getTotalCost
// ---------------------------------------------------------------------------
describe('getTotalCost', () => {
  test('debe calcular el costo total correctamente (quantity * unitPrice por artículo)', () => {
    const list = new ShoppingListOptimizer();
    list.addItem({ name: 'Leche', quantity: 2, unitPrice: 1.5, category: 'lácteos', priority: 'high' });
    list.addItem({ name: 'Pan', quantity: 3, unitPrice: 0.8, category: 'panadería', priority: 'medium' });
    // 2 * 1.5 + 3 * 0.8 = 3 + 2.4 = 5.4
    expect(list.getTotalCost()).toBeCloseTo(5.4, 2);
  });

  test('debe retornar 0 si la lista está vacía', () => {
    const list = new ShoppingListOptimizer();
    expect(list.getTotalCost()).toBe(0);
  });

  test('debe recalcular el total correctamente tras actualizar un artículo', () => {
    const list = new ShoppingListOptimizer();
    list.addItem({ name: 'Leche', quantity: 2, unitPrice: 1.5, category: 'lácteos', priority: 'high' });
    list.updateItem('Leche', { quantity: 4 });
    // 4 * 1.5 = 6
    expect(list.getTotalCost()).toBeCloseTo(6, 2);
  });
});

// ---------------------------------------------------------------------------
// groupByCategory
// ---------------------------------------------------------------------------
describe('groupByCategory', () => {
  let list;

  beforeEach(() => {
    list = new ShoppingListOptimizer();
    list.addItem({ name: 'Leche', quantity: 1, unitPrice: 1.5, category: 'lácteos', priority: 'high' });
    list.addItem({ name: 'Yogur', quantity: 2, unitPrice: 0.9, category: 'lácteos', priority: 'medium' });
    list.addItem({ name: 'Pan', quantity: 1, unitPrice: 0.8, category: 'panadería', priority: 'low' });
    list.addItem({ name: 'Manzanas', quantity: 6, unitPrice: 0.3, category: 'frutas', priority: 'medium' });
  });

  test('debe agrupar los artículos correctamente por categoría', () => {
    const groups = list.groupByCategory();
    expect(groups['lácteos']).toHaveLength(2);
    expect(groups['panadería']).toHaveLength(1);
    expect(groups['frutas']).toHaveLength(1);
  });

  test('debe retornar un objeto vacío cuando la lista está vacía', () => {
    const emptyList = new ShoppingListOptimizer();
    expect(emptyList.groupByCategory()).toEqual({});
  });

  test('cada grupo debe contener los artículos correctos', () => {
    const groups = list.groupByCategory();
    const names = groups['lácteos'].map((i) => i.name);
    expect(names).toContain('Leche');
    expect(names).toContain('Yogur');
  });
});

// ---------------------------------------------------------------------------
// getSortedByPriorityThenCategory
// ---------------------------------------------------------------------------
describe('getSortedByPriorityThenCategory', () => {
  let list;

  beforeEach(() => {
    list = new ShoppingListOptimizer();
    list.addItem({ name: 'Queso', quantity: 1, unitPrice: 3.0, category: 'lácteos', priority: 'medium' });
    list.addItem({ name: 'Leche', quantity: 2, unitPrice: 1.5, category: 'lácteos', priority: 'high' });
    list.addItem({ name: 'Pan', quantity: 1, unitPrice: 0.8, category: 'panadería', priority: 'low' });
    list.addItem({ name: 'Manzanas', quantity: 4, unitPrice: 0.3, category: 'frutas', priority: 'medium' });
    list.addItem({ name: 'Pollo', quantity: 1, unitPrice: 5.0, category: 'carnes', priority: 'high' });
  });

  test('los artículos high priority deben aparecer primero', () => {
    const sorted = list.getSortedByPriorityThenCategory();
    expect(sorted[0].priority).toBe('high');
    expect(sorted[1].priority).toBe('high');
  });

  test('los artículos medium priority deben aparecer después de los high', () => {
    const sorted = list.getSortedByPriorityThenCategory();
    const priorities = sorted.map((i) => i.priority);
    const firstMedium = priorities.indexOf('medium');
    const lastHigh = priorities.lastIndexOf('high');
    expect(firstMedium).toBeGreaterThan(lastHigh);
  });

  test('los artículos low priority deben aparecer al final', () => {
    const sorted = list.getSortedByPriorityThenCategory();
    expect(sorted[sorted.length - 1].priority).toBe('low');
  });

  test('dentro del mismo nivel de prioridad, los artículos deben estar ordenados por categoría', () => {
    const sorted = list.getSortedByPriorityThenCategory();
    const highItems = sorted.filter((i) => i.priority === 'high');
    // carnes < lácteos alfabéticamente
    expect(highItems[0].category).toBe('carnes');
    expect(highItems[1].category).toBe('lácteos');
  });

  test('debe no mutar la lista interna de artículos', () => {
    const before = list.getAll()[0].name;
    list.getSortedByPriorityThenCategory();
    expect(list.getAll()[0].name).toBe(before);
  });
});

// ---------------------------------------------------------------------------
// getItemsWithinBudget
// ---------------------------------------------------------------------------
describe('getItemsWithinBudget', () => {
  let list;

  beforeEach(() => {
    list = new ShoppingListOptimizer();
    // high priority: Leche 3.0, Pollo 5.0
    // medium priority: Queso 3.0, Manzanas 1.2
    // low priority: Pan 0.8
    list.addItem({ name: 'Leche', quantity: 2, unitPrice: 1.5, category: 'lácteos', priority: 'high' });
    list.addItem({ name: 'Pollo', quantity: 1, unitPrice: 5.0, category: 'carnes', priority: 'high' });
    list.addItem({ name: 'Queso', quantity: 1, unitPrice: 3.0, category: 'lácteos', priority: 'medium' });
    list.addItem({ name: 'Manzanas', quantity: 4, unitPrice: 0.3, category: 'frutas', priority: 'medium' });
    list.addItem({ name: 'Pan', quantity: 1, unitPrice: 0.8, category: 'panadería', priority: 'low' });
  });

  test('debe retornar artículos en orden de prioridad hasta agotar el presupuesto', () => {
    // Presupuesto 9: Leche(3)+Pollo(5)=8, Queso(3) excede, Manzanas(1.2)=9.2 excede también...
    // Leche(3)+Pollo(5)+Manzanas(1.2)=9.2 excede → Leche(3)+Pollo(5)=8, luego Queso no entra (3), Manzanas(1.2) sí → total 9.2 excede
    // Con budget 9: Leche(3) + Pollo(5) = 8, Queso(3) → 11 no; Manzanas(1.2) → 9.2 no; Pan(0.8) → 8.8 sí
    const result = list.getItemsWithinBudget(9);
    const names = result.map((i) => i.name);
    expect(names).toContain('Leche');
    expect(names).toContain('Pollo');
    expect(names).toContain('Pan');
    expect(names).not.toContain('Queso');
    expect(names).not.toContain('Manzanas');
  });

  test('debe retornar lista vacía si el presupuesto es 0', () => {
    expect(list.getItemsWithinBudget(0)).toEqual([]);
  });

  test('debe retornar todos los artículos si el presupuesto es suficiente', () => {
    const result = list.getItemsWithinBudget(1000);
    expect(result).toHaveLength(5);
  });

  test('debe respetar el orden de prioridad al seleccionar artículos', () => {
    // Presupuesto 4: Leche(3) entra, Pollo(5) no; Queso(3) no (3+3=6>4); Manzanas(1.2) sí (3+1.2=4.2>4 no)
    // Leche(3) → 3; Pan(0.8) → 3.8; Manzanas(1.2) → 5 no
    const result = list.getItemsWithinBudget(3.5);
    const names = result.map((i) => i.name);
    expect(names).toContain('Leche');
    expect(result.length).toBeGreaterThanOrEqual(1);
    // Un artículo de alta prioridad debe estar incluido
    expect(result.some((i) => i.priority === 'high')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// getItemsByCategory
// ---------------------------------------------------------------------------
describe('getItemsByCategory', () => {
  let list;

  beforeEach(() => {
    list = new ShoppingListOptimizer();
    list.addItem({ name: 'Leche', quantity: 2, unitPrice: 1.5, category: 'lácteos', priority: 'high' });
    list.addItem({ name: 'Yogur', quantity: 1, unitPrice: 0.9, category: 'lácteos', priority: 'medium' });
    list.addItem({ name: 'Pan', quantity: 1, unitPrice: 0.8, category: 'panadería', priority: 'low' });
  });

  test('debe retornar todos los artículos de la categoría especificada', () => {
    const items = list.getItemsByCategory('lácteos');
    expect(items).toHaveLength(2);
    expect(items.map((i) => i.name)).toContain('Leche');
    expect(items.map((i) => i.name)).toContain('Yogur');
  });

  test('debe retornar un arreglo vacío si la categoría no existe', () => {
    expect(list.getItemsByCategory('carnes')).toEqual([]);
  });

  test('debe ser sensible a mayúsculas en el nombre de la categoría', () => {
    const items = list.getItemsByCategory('Lácteos');
    expect(items).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// getMostExpensiveItems
// ---------------------------------------------------------------------------
describe('getMostExpensiveItems', () => {
  let list;

  beforeEach(() => {
    list = new ShoppingListOptimizer();
    list.addItem({ name: 'Pollo', quantity: 1, unitPrice: 5.0, category: 'carnes', priority: 'high' });
    list.addItem({ name: 'Queso', quantity: 1, unitPrice: 3.0, category: 'lácteos', priority: 'medium' });
    list.addItem({ name: 'Leche', quantity: 2, unitPrice: 1.5, category: 'lácteos', priority: 'high' });
    list.addItem({ name: 'Pan', quantity: 1, unitPrice: 0.8, category: 'panadería', priority: 'low' });
    list.addItem({ name: 'Manzanas', quantity: 6, unitPrice: 0.3, category: 'frutas', priority: 'medium' });
  });

  test('debe retornar los N artículos más costosos (por costo total: quantity * unitPrice)', () => {
    // Costos: Pollo=5, Queso=3, Leche=3, Pan=0.8, Manzanas=1.8
    const top3 = list.getMostExpensiveItems(3);
    expect(top3).toHaveLength(3);
    const names = top3.map((i) => i.name);
    expect(names).toContain('Pollo');
    expect(names).toContain('Queso');
    expect(names).toContain('Leche');
  });

  test('el primero debe ser el más costoso', () => {
    const top = list.getMostExpensiveItems(1);
    expect(top[0].name).toBe('Pollo');
  });

  test('debe retornar todos los artículos si N es mayor que el total', () => {
    const all = list.getMostExpensiveItems(100);
    expect(all).toHaveLength(5);
  });

  test('debe retornar un arreglo vacío si N es 0', () => {
    expect(list.getMostExpensiveItems(0)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// getItemsBelowPrice / getItemsAbovePrice
// ---------------------------------------------------------------------------
describe('getItemsBelowPrice', () => {
  let list;

  beforeEach(() => {
    list = new ShoppingListOptimizer();
    list.addItem({ name: 'Pollo', quantity: 1, unitPrice: 5.0, category: 'carnes', priority: 'high' });
    list.addItem({ name: 'Leche', quantity: 2, unitPrice: 1.5, category: 'lácteos', priority: 'high' });
    list.addItem({ name: 'Pan', quantity: 1, unitPrice: 0.8, category: 'panadería', priority: 'low' });
  });

  test('debe retornar artículos cuyo precio unitario es estrictamente menor al umbral', () => {
    const cheap = list.getItemsBelowPrice(2.0);
    expect(cheap).toHaveLength(2);
    const names = cheap.map((i) => i.name);
    expect(names).toContain('Leche');
    expect(names).toContain('Pan');
  });

  test('debe excluir artículos cuyo precio es igual al umbral', () => {
    const result = list.getItemsBelowPrice(1.5);
    expect(result.map((i) => i.name)).not.toContain('Leche');
  });

  test('debe retornar un arreglo vacío si ningún artículo está por debajo del umbral', () => {
    expect(list.getItemsBelowPrice(0.1)).toEqual([]);
  });
});

describe('getItemsAbovePrice', () => {
  let list;

  beforeEach(() => {
    list = new ShoppingListOptimizer();
    list.addItem({ name: 'Pollo', quantity: 1, unitPrice: 5.0, category: 'carnes', priority: 'high' });
    list.addItem({ name: 'Leche', quantity: 2, unitPrice: 1.5, category: 'lácteos', priority: 'high' });
    list.addItem({ name: 'Pan', quantity: 1, unitPrice: 0.8, category: 'panadería', priority: 'low' });
  });

  test('debe retornar artículos cuyo precio unitario es estrictamente mayor al umbral', () => {
    const expensive = list.getItemsAbovePrice(1.0);
    expect(expensive).toHaveLength(2);
    const names = expensive.map((i) => i.name);
    expect(names).toContain('Pollo');
    expect(names).toContain('Leche');
  });

  test('debe excluir artículos cuyo precio es igual al umbral', () => {
    const result = list.getItemsAbovePrice(5.0);
    expect(result.map((i) => i.name)).not.toContain('Pollo');
  });

  test('debe retornar un arreglo vacío si ningún artículo está por encima del umbral', () => {
    expect(list.getItemsAbovePrice(100)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// getSummaryStats
// ---------------------------------------------------------------------------
describe('getSummaryStats', () => {
  let list;

  beforeEach(() => {
    list = new ShoppingListOptimizer();
    list.addItem({ name: 'Pollo', quantity: 1, unitPrice: 5.0, category: 'carnes', priority: 'high' });
    list.addItem({ name: 'Leche', quantity: 2, unitPrice: 1.5, category: 'lácteos', priority: 'high' });
    list.addItem({ name: 'Queso', quantity: 1, unitPrice: 3.0, category: 'lácteos', priority: 'medium' });
    list.addItem({ name: 'Pan', quantity: 1, unitPrice: 0.8, category: 'panadería', priority: 'low' });
    list.addItem({ name: 'Manzanas', quantity: 6, unitPrice: 0.3, category: 'frutas', priority: 'medium' });
  });

  test('debe retornar el número total de artículos', () => {
    expect(list.getSummaryStats().totalItems).toBe(5);
  });

  test('debe retornar el costo total correcto', () => {
    // Pollo=5, Leche=3, Queso=3, Pan=0.8, Manzanas=1.8 → 13.6
    expect(list.getSummaryStats().totalCost).toBeCloseTo(13.6, 2);
  });

  test('debe retornar el número de categorías distintas', () => {
    expect(list.getSummaryStats().categoryCount).toBe(4);
  });

  test('debe retornar el nombre del artículo más caro (por unitPrice)', () => {
    expect(list.getSummaryStats().mostExpensiveItem).toBe('Pollo');
  });

  test('debe retornar el promedio de precio unitario de todos los artículos', () => {
    // (5+1.5+3+0.8+0.3) / 5 = 10.6 / 5 = 2.12
    expect(list.getSummaryStats().avgUnitPrice).toBeCloseTo(2.12, 2);
  });

  test('debe retornar el conteo de artículos por prioridad', () => {
    const stats = list.getSummaryStats();
    expect(stats.priorityBreakdown.high).toBe(2);
    expect(stats.priorityBreakdown.medium).toBe(2);
    expect(stats.priorityBreakdown.low).toBe(1);
  });

  test('debe retornar estadísticas correctas en una lista vacía', () => {
    const emptyList = new ShoppingListOptimizer();
    const stats = emptyList.getSummaryStats();
    expect(stats.totalItems).toBe(0);
    expect(stats.totalCost).toBe(0);
    expect(stats.categoryCount).toBe(0);
    expect(stats.mostExpensiveItem).toBeNull();
    expect(stats.avgUnitPrice).toBe(0);
    expect(stats.priorityBreakdown).toEqual({ high: 0, medium: 0, low: 0 });
  });
});
