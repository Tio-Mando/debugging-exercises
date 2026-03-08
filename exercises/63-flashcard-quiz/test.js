const { FlashcardDeck } = require('./buggy-code');
// Para verificar la solución, cambia require('./buggy-code') a require('./solution')

// ---------------------------------------------------------------------------
// Creación de mazos y tarjetas
// ---------------------------------------------------------------------------
describe('FlashcardDeck - creación y configuración básica', () => {
  test('debe crear un mazo vacío con nombre', () => {
    const deck = new FlashcardDeck('Capitales del Mundo');
    expect(deck.getName()).toBe('Capitales del Mundo');
    expect(deck.size()).toBe(0);
  });

  test('debe agregar tarjetas al mazo', () => {
    const deck = new FlashcardDeck('Historia');
    deck.addCard('¿En qué año comenzó la Segunda Guerra Mundial?', '1939', 'Historia');
    deck.addCard('¿Quién fue el primer presidente de EE.UU.?', 'George Washington', 'Política');
    expect(deck.size()).toBe(2);
  });

  test('debe lanzar error si pregunta o respuesta están vacías al agregar tarjeta', () => {
    const deck = new FlashcardDeck('Prueba');
    expect(() => deck.addCard('', 'respuesta', 'cat')).toThrow();
    expect(() => deck.addCard('pregunta', '', 'cat')).toThrow();
    expect(() => deck.addCard('', '', 'cat')).toThrow();
  });

  test('debe asignar id único y estado inicial correcto a cada tarjeta', () => {
    const deck = new FlashcardDeck('Ciencias');
    deck.addCard('¿Cuál es la fórmula del agua?', 'H2O', 'Química');
    const cards = deck.getAllCards();
    expect(cards[0].id).toBeDefined();
    expect(cards[0].attempts).toBe(0);
    expect(cards[0].correct).toBe(0);
    expect(cards[0].category).toBe('Química');
  });

  test('debe lanzar error al agregar tarjeta duplicada (misma pregunta)', () => {
    const deck = new FlashcardDeck('Test');
    deck.addCard('¿Capital de Francia?', 'París', 'Geografía');
    expect(() =>
      deck.addCard('¿Capital de Francia?', 'París', 'Geografía')
    ).toThrow();
  });
});

// ---------------------------------------------------------------------------
// Marcar tarjetas como correctas o incorrectas
// ---------------------------------------------------------------------------
describe('FlashcardDeck - marcar respuestas', () => {
  let deck;

  beforeEach(() => {
    deck = new FlashcardDeck('Matemáticas');
    deck.addCard('¿Cuánto es 2 + 2?', '4', 'Aritmética');
    deck.addCard('¿Cuánto es 10 / 2?', '5', 'Aritmética');
    deck.addCard('¿Cuánto es 3 * 3?', '9', 'Multiplicación');
  });

  test('debe incrementar attempts y correct al marcar como correcto', () => {
    const cards = deck.getAllCards();
    deck.markCorrect(cards[0].id);
    const updated = deck.getAllCards().find((c) => c.id === cards[0].id);
    expect(updated.attempts).toBe(1);
    expect(updated.correct).toBe(1);
  });

  test('debe incrementar attempts pero NO correct al marcar como incorrecto', () => {
    const cards = deck.getAllCards();
    deck.markIncorrect(cards[1].id);
    const updated = deck.getAllCards().find((c) => c.id === cards[1].id);
    expect(updated.attempts).toBe(1);
    expect(updated.correct).toBe(0);
  });

  test('debe acumular múltiples intentos en la misma tarjeta', () => {
    const cards = deck.getAllCards();
    const id = cards[2].id;
    deck.markCorrect(id);
    deck.markCorrect(id);
    deck.markIncorrect(id);
    const updated = deck.getAllCards().find((c) => c.id === id);
    expect(updated.attempts).toBe(3);
    expect(updated.correct).toBe(2);
  });

  test('debe lanzar error si el id de tarjeta no existe', () => {
    expect(() => deck.markCorrect('id-inexistente')).toThrow();
    expect(() => deck.markIncorrect('id-inexistente')).toThrow();
  });
});

// ---------------------------------------------------------------------------
// Tasa de éxito por tarjeta
// ---------------------------------------------------------------------------
describe('FlashcardDeck - getSuccessRate', () => {
  let deck;

  beforeEach(() => {
    deck = new FlashcardDeck('Geografía');
    deck.addCard('¿Capital de Alemania?', 'Berlín', 'Europa');
    deck.addCard('¿Capital de Japón?', 'Tokio', 'Asia');
  });

  test('debe retornar 0 cuando la tarjeta no ha sido intentada', () => {
    const cards = deck.getAllCards();
    expect(deck.getSuccessRate(cards[0].id)).toBe(0);
  });

  test('debe retornar 1 cuando todas las respuestas son correctas', () => {
    const id = deck.getAllCards()[0].id;
    deck.markCorrect(id);
    deck.markCorrect(id);
    expect(deck.getSuccessRate(id)).toBe(1);
  });

  test('debe retornar 0.5 cuando la mitad de los intentos son correctos', () => {
    const id = deck.getAllCards()[1].id;
    deck.markCorrect(id);
    deck.markIncorrect(id);
    expect(deck.getSuccessRate(id)).toBe(0.5);
  });

  test('debe retornar la fracción exacta de aciertos sobre intentos', () => {
    const id = deck.getAllCards()[0].id;
    deck.markCorrect(id);
    deck.markCorrect(id);
    deck.markIncorrect(id);
    // 2 / 3 ≈ 0.6667
    expect(deck.getSuccessRate(id)).toBeCloseTo(2 / 3, 5);
  });

  test('debe lanzar error si el id no existe', () => {
    expect(() => deck.getSuccessRate('no-existe')).toThrow();
  });
});

// ---------------------------------------------------------------------------
// Tarjetas débiles (bajo éxito)
// ---------------------------------------------------------------------------
describe('FlashcardDeck - getWeakCards', () => {
  let deck;

  beforeEach(() => {
    deck = new FlashcardDeck('Química');
    deck.addCard('¿Símbolo del Oro?', 'Au', 'Metales');
    deck.addCard('¿Símbolo del Hierro?', 'Fe', 'Metales');
    deck.addCard('¿Símbolo del Sodio?', 'Na', 'Metales');
    deck.addCard('¿Símbolo del Potasio?', 'K', 'Metales');
  });

  test('debe retornar tarjetas con tasa de éxito menor al umbral', () => {
    const cards = deck.getAllCards();
    // Tarjeta 0: 1/3 ≈ 0.33 → débil si threshold >= 0.5
    deck.markCorrect(cards[0].id);
    deck.markIncorrect(cards[0].id);
    deck.markIncorrect(cards[0].id);
    // Tarjeta 1: 2/2 = 1.0 → NO débil
    deck.markCorrect(cards[1].id);
    deck.markCorrect(cards[1].id);
    // Tarjeta 2: 0/2 = 0 → débil
    deck.markIncorrect(cards[2].id);
    deck.markIncorrect(cards[2].id);
    // Tarjeta 3: sin intentos → NO incluida (attempts === 0)

    const weak = deck.getWeakCards(0.5);
    const weakIds = weak.map((c) => c.id);
    expect(weakIds).toContain(cards[0].id);
    expect(weakIds).toContain(cards[2].id);
    expect(weakIds).not.toContain(cards[1].id);
    expect(weakIds).not.toContain(cards[3].id);
  });

  test('debe retornar arreglo vacío si todas las tarjetas superan el umbral', () => {
    const cards = deck.getAllCards();
    deck.markCorrect(cards[0].id);
    deck.markCorrect(cards[1].id);
    expect(deck.getWeakCards(0.5)).toHaveLength(0);
  });

  test('debe excluir tarjetas sin intentos de la lista de débiles', () => {
    const weak = deck.getWeakCards(0.5);
    expect(weak).toHaveLength(0);
  });

  test('debe usar umbral por defecto de 0.5 cuando no se pasa argumento', () => {
    const cards = deck.getAllCards();
    deck.markIncorrect(cards[0].id);
    deck.markIncorrect(cards[0].id);
    // 0/2 = 0 < 0.5 → débil
    const weak = deck.getWeakCards();
    expect(weak.some((c) => c.id === cards[0].id)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Estadísticas por categoría
// ---------------------------------------------------------------------------
describe('FlashcardDeck - getCategoryStats', () => {
  let deck;

  beforeEach(() => {
    deck = new FlashcardDeck('Mixto');
    deck.addCard('¿Capital de Francia?', 'París', 'Geografía');
    deck.addCard('¿Capital de España?', 'Madrid', 'Geografía');
    deck.addCard('¿Fórmula del agua?', 'H2O', 'Química');
  });

  test('debe retornar el total de tarjetas por categoría', () => {
    const stats = deck.getCategoryStats();
    expect(stats['Geografía'].total).toBe(2);
    expect(stats['Química'].total).toBe(1);
  });

  test('debe contar los intentos totales de cada categoría', () => {
    const cards = deck.getAllCards();
    deck.markCorrect(cards[0].id); // Geografía
    deck.markIncorrect(cards[0].id); // Geografía
    deck.markCorrect(cards[2].id); // Química

    const stats = deck.getCategoryStats();
    expect(stats['Geografía'].totalAttempts).toBe(2);
    expect(stats['Química'].totalAttempts).toBe(1);
  });

  test('debe calcular la tasa de éxito promedio por categoría', () => {
    const cards = deck.getAllCards();
    // Geografía: tarjeta 0 → 2/3; tarjeta 1 → 1/1 = 1
    // promedio = (2/3 + 1) / 2 = (0.6667 + 1) / 2 ≈ 0.8333
    deck.markCorrect(cards[0].id);
    deck.markCorrect(cards[0].id);
    deck.markIncorrect(cards[0].id);
    deck.markCorrect(cards[1].id);

    const stats = deck.getCategoryStats();
    expect(stats['Geografía'].averageSuccessRate).toBeCloseTo(5 / 6, 4);
  });

  test('debe retornar averageSuccessRate de 0 cuando ninguna tarjeta en la categoría tiene intentos', () => {
    const stats = deck.getCategoryStats();
    expect(stats['Geografía'].averageSuccessRate).toBe(0);
    expect(stats['Química'].averageSuccessRate).toBe(0);
  });

  test('debe retornar objeto vacío si el mazo no tiene tarjetas', () => {
    const empty = new FlashcardDeck('Vacío');
    expect(deck.getCategoryStats()).not.toEqual({});
    expect(empty.getCategoryStats()).toEqual({});
  });
});

// ---------------------------------------------------------------------------
// Reiniciar mazo
// ---------------------------------------------------------------------------
describe('FlashcardDeck - reset', () => {
  test('debe reiniciar attempts y correct de todas las tarjetas a cero', () => {
    const deck = new FlashcardDeck('Reset Test');
    deck.addCard('Pregunta 1', 'Resp 1', 'Cat A');
    deck.addCard('Pregunta 2', 'Resp 2', 'Cat B');
    const cards = deck.getAllCards();
    deck.markCorrect(cards[0].id);
    deck.markIncorrect(cards[1].id);

    deck.reset();

    deck.getAllCards().forEach((card) => {
      expect(card.attempts).toBe(0);
      expect(card.correct).toBe(0);
    });
  });

  test('debe conservar las tarjetas después del reset', () => {
    const deck = new FlashcardDeck('Reset Test');
    deck.addCard('Pregunta 1', 'Resp 1', 'Cat A');
    deck.addCard('Pregunta 2', 'Resp 2', 'Cat B');
    deck.reset();
    expect(deck.size()).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// Barajar tarjetas
// ---------------------------------------------------------------------------
describe('FlashcardDeck - shuffle', () => {
  test('debe conservar todas las tarjetas después de barajar', () => {
    const deck = new FlashcardDeck('Barajar');
    for (let i = 1; i <= 10; i++) {
      deck.addCard(`Pregunta ${i}`, `Respuesta ${i}`, 'Cat');
    }
    deck.shuffle();
    expect(deck.size()).toBe(10);
  });

  test('debe retornar el mismo conjunto de ids tras barajar', () => {
    const deck = new FlashcardDeck('Barajar');
    for (let i = 1; i <= 6; i++) {
      deck.addCard(`Pregunta ${i}`, `Respuesta ${i}`, 'Cat');
    }
    const idsBefore = deck.getAllCards().map((c) => c.id).sort();
    deck.shuffle();
    const idsAfter = deck.getAllCards().map((c) => c.id).sort();
    expect(idsAfter).toEqual(idsBefore);
  });
});

// ---------------------------------------------------------------------------
// Tarjetas pendientes de repaso
// ---------------------------------------------------------------------------
describe('FlashcardDeck - getDueCards', () => {
  let deck;

  beforeEach(() => {
    deck = new FlashcardDeck('Repaso');
    deck.addCard('¿Capital de Italia?', 'Roma', 'Geografía');
    deck.addCard('¿Capital de Brasil?', 'Brasilia', 'Geografía');
    deck.addCard('¿Capital de Canadá?', 'Ottawa', 'Geografía');
    deck.addCard('¿Capital de Australia?', 'Canberra', 'Geografía');
  });

  test('debe incluir todas las tarjetas sin intentos como pendientes', () => {
    const due = deck.getDueCards();
    expect(due).toHaveLength(4);
  });

  test('debe excluir tarjetas con tasa de éxito >= 0.8 y al menos un intento', () => {
    const cards = deck.getAllCards();
    // Tarjeta 0: 4/5 = 0.8 → dominada → excluida
    for (let i = 0; i < 4; i++) deck.markCorrect(cards[0].id);
    deck.markIncorrect(cards[0].id);

    const due = deck.getDueCards();
    const dueIds = due.map((c) => c.id);
    expect(dueIds).not.toContain(cards[0].id);
  });

  test('debe incluir tarjetas con tasa de éxito < 0.8', () => {
    const cards = deck.getAllCards();
    // Tarjeta 1: 3/5 = 0.6 → NO dominada → incluida
    for (let i = 0; i < 3; i++) deck.markCorrect(cards[1].id);
    deck.markIncorrect(cards[1].id);
    deck.markIncorrect(cards[1].id);

    const due = deck.getDueCards();
    const dueIds = due.map((c) => c.id);
    expect(dueIds).toContain(cards[1].id);
  });

  test('debe retornar arreglo vacío si todas las tarjetas están dominadas', () => {
    const cards = deck.getAllCards();
    cards.forEach((card) => {
      for (let i = 0; i < 5; i++) deck.markCorrect(card.id);
    });
    expect(deck.getDueCards()).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Estadísticas globales del mazo
// ---------------------------------------------------------------------------
describe('FlashcardDeck - getStats', () => {
  test('debe retornar conteo total de tarjetas, intentos totales y tasa global de éxito', () => {
    const deck = new FlashcardDeck('Stats');
    deck.addCard('P1', 'R1', 'A');
    deck.addCard('P2', 'R2', 'A');
    deck.addCard('P3', 'R3', 'B');
    const cards = deck.getAllCards();
    deck.markCorrect(cards[0].id); // 1/1
    deck.markCorrect(cards[1].id);
    deck.markIncorrect(cards[1].id); // 1/2
    // cards[2]: sin intentos

    const stats = deck.getStats();
    expect(stats.totalCards).toBe(3);
    expect(stats.totalAttempts).toBe(3);
    // correct global = 2, attempts = 3 → 2/3
    expect(stats.globalSuccessRate).toBeCloseTo(2 / 3, 4);
  });

  test('debe retornar globalSuccessRate de 0 cuando no hay intentos', () => {
    const deck = new FlashcardDeck('Sin intentos');
    deck.addCard('P1', 'R1', 'Cat');
    const stats = deck.getStats();
    expect(stats.globalSuccessRate).toBe(0);
    expect(stats.totalAttempts).toBe(0);
  });

  test('debe incluir el número de tarjetas dominadas (éxito >= 0.8 con al menos un intento)', () => {
    const deck = new FlashcardDeck('Dominadas');
    deck.addCard('P1', 'R1', 'X');
    deck.addCard('P2', 'R2', 'X');
    const cards = deck.getAllCards();
    // Tarjeta 0 dominada: 4/5 = 0.8
    for (let i = 0; i < 4; i++) deck.markCorrect(cards[0].id);
    deck.markIncorrect(cards[0].id);
    // Tarjeta 1 no dominada
    deck.markIncorrect(cards[1].id);

    const stats = deck.getStats();
    expect(stats.masteredCards).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// Eliminar tarjeta
// ---------------------------------------------------------------------------
describe('FlashcardDeck - removeCard', () => {
  test('debe eliminar la tarjeta con el id dado', () => {
    const deck = new FlashcardDeck('Eliminar');
    deck.addCard('P1', 'R1', 'Cat');
    deck.addCard('P2', 'R2', 'Cat');
    const id = deck.getAllCards()[0].id;
    deck.removeCard(id);
    expect(deck.size()).toBe(1);
    expect(deck.getAllCards().find((c) => c.id === id)).toBeUndefined();
  });

  test('debe lanzar error si el id no existe', () => {
    const deck = new FlashcardDeck('Eliminar');
    deck.addCard('P1', 'R1', 'Cat');
    expect(() => deck.removeCard('id-falso')).toThrow();
  });
});

// ---------------------------------------------------------------------------
// Buscar tarjetas por categoría
// ---------------------------------------------------------------------------
describe('FlashcardDeck - getCardsByCategory', () => {
  test('debe retornar solo las tarjetas de la categoría indicada', () => {
    const deck = new FlashcardDeck('Categorías');
    deck.addCard('P1', 'R1', 'Ciencia');
    deck.addCard('P2', 'R2', 'Arte');
    deck.addCard('P3', 'R3', 'Ciencia');
    const result = deck.getCardsByCategory('Ciencia');
    expect(result).toHaveLength(2);
    expect(result.every((c) => c.category === 'Ciencia')).toBe(true);
  });

  test('debe retornar arreglo vacío si ninguna tarjeta pertenece a la categoría', () => {
    const deck = new FlashcardDeck('Sin categoría');
    deck.addCard('P1', 'R1', 'Arte');
    expect(deck.getCardsByCategory('Ciencia')).toHaveLength(0);
  });
});
