/**
 * Pruebas para Scrabble Scorer
 * Ejecutar con: npm test exercises/42-scrabble-scorer
 */

const {
  getLetterValue,
  scoreWord,
  scorePlacement,
  getBestWord,
  getLeaderboard,
} = require('./buggy-code.js');

describe('Scrabble Scorer', () => {
  describe('getLetterValue - valor base de letras', () => {
    test('debe retornar 1 para letras comunes (A, E, I, O, U)', () => {
      expect(getLetterValue('A')).toBe(1);
      expect(getLetterValue('E')).toBe(1);
    });

    test('debe retornar 3 para B, C, M, P', () => {
      expect(getLetterValue('B')).toBe(3);
      expect(getLetterValue('C')).toBe(3);
    });

    test('debe retornar 10 para Q y Z', () => {
      expect(getLetterValue('Q')).toBe(10);
      expect(getLetterValue('Z')).toBe(10);
    });

    test('debe ser insensible a mayúsculas/minúsculas', () => {
      expect(getLetterValue('a')).toBe(1);
      expect(getLetterValue('q')).toBe(10);
    });
  });

  describe('scoreWord - puntaje de palabra sin casillas especiales', () => {
    test('debe calcular el puntaje de CAT correctamente (3+1+1=5)', () => {
      expect(scoreWord('CAT')).toBe(5);
    });

    test('debe calcular el puntaje de QUIZ correctamente (10+1+1+10=22)', () => {
      expect(scoreWord('QUIZ')).toBe(22);
    });

    test('debe ser insensible a mayúsculas', () => {
      expect(scoreWord('cat')).toBe(5);
    });
  });

  describe('scorePlacement - puntaje con casillas especiales', () => {
    test('DL (doble letra) debe duplicar solo esa letra y sumar el resto normalmente', () => {
      // CAT con DL en posición 0 (C vale 3*2=6, A=1, T=1 → 8)
      const squares = [{ pos: 0, type: 'DL' }, { pos: 1, type: null }, { pos: 2, type: null }];
      expect(scorePlacement('CAT', squares)).toBe(8);
    });

    test('TL (triple letra) debe triplicar solo esa letra', () => {
      // CAT con TL en posición 0 (C vale 3*3=9, A=1, T=1 → 11)
      const squares = [{ pos: 0, type: 'TL' }, { pos: 1, type: null }, { pos: 2, type: null }];
      expect(scorePlacement('CAT', squares)).toBe(11);
    });

    test('DW (doble palabra) debe multiplicar el total de la palabra por 2 DESPUÉS de aplicar multiplicadores de letra', () => {
      // CAT con DL en pos 0 y DW: (C*2 + A + T) * 2 = (6+1+1)*2 = 16
      const squares = [
        { pos: 0, type: 'DL' },
        { pos: 1, type: null },
        { pos: 2, type: 'DW' },
      ];
      expect(scorePlacement('CAT', squares)).toBe(16);
    });

    test('TW (triple palabra) debe multiplicar el total por 3 DESPUÉS de letras', () => {
      // CAT sin modificadores de letra con TW: (3+1+1)*3 = 15
      const squares = [
        { pos: 0, type: null },
        { pos: 1, type: null },
        { pos: 2, type: 'TW' },
      ];
      expect(scorePlacement('CAT', squares)).toBe(15);
    });

    test('múltiples DW deben multiplicarse entre sí (DW+DW = x4)', () => {
      // A (1) con DW en pos 0 y DW en pos 1 en una palabra de dos letras: (A+T)*4 = (1+1)*4 = 8
      const squares = [
        { pos: 0, type: 'DW' },
        { pos: 1, type: 'DW' },
      ];
      expect(scorePlacement('AT', squares)).toBe(8);
    });

    test('sin casillas especiales debe coincidir con scoreWord', () => {
      const squares = [
        { pos: 0, type: null },
        { pos: 1, type: null },
        { pos: 2, type: null },
      ];
      expect(scorePlacement('CAT', squares)).toBe(scoreWord('CAT'));
    });
  });

  describe('getBestWord - mejor palabra de la mano', () => {
    test('debe retornar la palabra con mayor puntaje', () => {
      const words = ['CAT', 'QUIZ', 'AT', 'ME'];
      const best = getBestWord(words);
      expect(best.word).toBe('QUIZ');
      expect(best.score).toBe(22);
    });

    test('debe manejar una sola palabra', () => {
      const best = getBestWord(['HELLO']);
      expect(best.word).toBe('HELLO');
    });
  });

  describe('getLeaderboard - tabla de posiciones', () => {
    test('debe ordenar jugadores por puntaje total descendente', () => {
      const players = [
        { name: 'Ana', scores: [15, 20, 10] },
        { name: 'Luis', scores: [30, 5] },
        { name: 'Eva', scores: [25, 25] },
      ];
      const board = getLeaderboard(players);
      expect(board[0].name).toBe('Eva');
      expect(board[0].total).toBe(50);
      expect(board[1].name).toBe('Ana');
      expect(board[2].name).toBe('Luis');
    });

    test('debe incluir la posición (rank) de cada jugador', () => {
      const players = [
        { name: 'A', scores: [10] },
        { name: 'B', scores: [20] },
      ];
      const board = getLeaderboard(players);
      expect(board[0].rank).toBe(1);
      expect(board[1].rank).toBe(2);
    });
  });
});
