const {
  MORSE_CODE,
  encodeChar,
  decodeChar,
  encodeText,
  decodeText,
  validateText,
  getMorseStats,
  sortWordsByMorseLength,
  filterEncodableWords,
  getMostComplexWord,
  compareMorseComplexity,
  getTopNWords,
} = require('./buggy-code');
// Para verificar la solución, cambia la línea anterior a:
// } = require('./solution');

// ---------------------------------------------------------------------------
// Datos de referencia usados a lo largo de todos los tests
// ---------------------------------------------------------------------------

// SOS en morse: S = ...  O = ---  S = ...
// Puntos: 9  Guiones: 3
const SOS_ENCODED = '... --- ...';

// Frase de prueba multi-palabra
const HELLO_WORLD_ENCODED = '.... . .-.. .-.. --- / .-- --- .-. .-.. -..';

describe('Traductor de código Morse', () => {

  // -------------------------------------------------------------------------
  describe('MORSE_CODE (constante exportada)', () => {
    test('debe exportar un objeto con las 26 letras del alfabeto', () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      letters.forEach((letter) => {
        expect(MORSE_CODE).toHaveProperty(letter);
        expect(typeof MORSE_CODE[letter]).toBe('string');
        expect(MORSE_CODE[letter].length).toBeGreaterThan(0);
      });
    });

    test('debe contener los 10 dígitos del 0 al 9', () => {
      const digits = '0123456789'.split('');
      digits.forEach((digit) => {
        expect(MORSE_CODE).toHaveProperty(digit);
        expect(typeof MORSE_CODE[digit]).toBe('string');
      });
    });

    test('debe tener los valores correctos para letras clave', () => {
      expect(MORSE_CODE['A']).toBe('.-');
      expect(MORSE_CODE['E']).toBe('.');
      expect(MORSE_CODE['S']).toBe('...');
      expect(MORSE_CODE['O']).toBe('---');
      expect(MORSE_CODE['T']).toBe('-');
      expect(MORSE_CODE['M']).toBe('--');
    });

    test('debe tener los valores correctos para dígitos clave', () => {
      expect(MORSE_CODE['0']).toBe('-----');
      expect(MORSE_CODE['1']).toBe('.----');
      expect(MORSE_CODE['5']).toBe('.....');
      expect(MORSE_CODE['9']).toBe('----.');
    });
  });

  // -------------------------------------------------------------------------
  describe('encodeChar(char)', () => {
    test('debe codificar letras mayúsculas individuales correctamente', () => {
      expect(encodeChar('A')).toBe('.-');
      expect(encodeChar('B')).toBe('-...');
      expect(encodeChar('S')).toBe('...');
      expect(encodeChar('O')).toBe('---');
      expect(encodeChar('Z')).toBe('--..');
    });

    test('debe codificar dígitos individuales correctamente', () => {
      expect(encodeChar('0')).toBe('-----');
      expect(encodeChar('3')).toBe('...--');
      expect(encodeChar('7')).toBe('--...');
    });

    test('debe lanzar un error cuando el carácter no es codificable', () => {
      expect(() => encodeChar('!')).toThrow();
      expect(() => encodeChar('@')).toThrow();
      expect(() => encodeChar(' ')).toThrow();
      expect(() => encodeChar('')).toThrow();
    });

    test('debe lanzar un error para letras minúsculas (encodeChar no convierte automáticamente)', () => {
      expect(() => encodeChar('a')).toThrow();
      expect(() => encodeChar('z')).toThrow();
    });
  });

  // -------------------------------------------------------------------------
  describe('decodeChar(morseChar)', () => {
    test('debe decodificar secuencias morse conocidas a su letra correcta', () => {
      expect(decodeChar('.-')).toBe('A');
      expect(decodeChar('-...')).toBe('B');
      expect(decodeChar('...')).toBe('S');
      expect(decodeChar('---')).toBe('O');
      expect(decodeChar('.')).toBe('E');
      expect(decodeChar('-')).toBe('T');
    });

    test('debe decodificar secuencias morse de dígitos correctamente', () => {
      expect(decodeChar('-----')).toBe('0');
      expect(decodeChar('.----')).toBe('1');
      expect(decodeChar('----.')).toBe('9');
    });

    test('debe lanzar un error cuando la secuencia morse no existe', () => {
      expect(() => decodeChar('......')).toThrow();
      expect(() => decodeChar('abc')).toThrow();
      expect(() => decodeChar('')).toThrow();
    });
  });

  // -------------------------------------------------------------------------
  describe('encodeText(text)', () => {
    test('debe codificar una sola palabra en mayúsculas correctamente', () => {
      expect(encodeText('SOS')).toBe(SOS_ENCODED);
      expect(encodeText('HELLO')).toBe('.... . .-.. .-.. ---');
    });

    test('debe ser insensible a mayúsculas y minúsculas', () => {
      expect(encodeText('sos')).toBe(SOS_ENCODED);
      expect(encodeText('Hello')).toBe('.... . .-.. .-.. ---');
      expect(encodeText('Hello World')).toBe(HELLO_WORLD_ENCODED);
    });

    test('debe separar palabras con " / " y letras con un espacio', () => {
      const result = encodeText('HELLO WORLD');
      expect(result).toBe(HELLO_WORLD_ENCODED);
      // Verificar que el separador de palabras sea exactamente ' / '
      expect(result).toContain(' / ');
    });

    test('debe codificar texto con múltiples palabras correctamente', () => {
      const result = encodeText('SOS SOS');
      expect(result).toBe(`${SOS_ENCODED} / ${SOS_ENCODED}`);
    });

    test('debe lanzar un error si el texto contiene caracteres no codificables', () => {
      expect(() => encodeText('HELLO!')).toThrow();
      expect(() => encodeText('TEST@123')).toThrow();
    });

    test('debe codificar texto que contiene dígitos correctamente', () => {
      const result = encodeText('A1');
      expect(result).toBe('.- .----');
    });
  });

  // -------------------------------------------------------------------------
  describe('decodeText(morse)', () => {
    test('debe decodificar una cadena morse de una sola palabra', () => {
      expect(decodeText(SOS_ENCODED)).toBe('SOS');
      expect(decodeText('.... . .-.. .-.. ---')).toBe('HELLO');
    });

    test('debe decodificar texto morse de múltiples palabras separadas por " / "', () => {
      expect(decodeText(HELLO_WORLD_ENCODED)).toBe('HELLO WORLD');
    });

    test('debe decodificar de vuelta a mayúsculas', () => {
      const encoded = encodeText('test');
      const decoded = decodeText(encoded);
      expect(decoded).toBe('TEST');
    });

    test('debe decodificar un viaje de ida y vuelta correctamente', () => {
      const original = 'MORSE CODE';
      const encoded = encodeText(original);
      const decoded = decodeText(encoded);
      expect(decoded).toBe(original);
    });
  });

  // -------------------------------------------------------------------------
  describe('validateText(text)', () => {
    test('debe retornar valid: true e invalidChars vacío para texto completamente válido', () => {
      const result = validateText('HELLO WORLD');
      expect(result.valid).toBe(true);
      expect(result.invalidChars).toEqual([]);
    });

    test('debe retornar valid: false con los caracteres inválidos cuando existen', () => {
      const result = validateText('HELLO!');
      expect(result.valid).toBe(false);
      expect(result.invalidChars).toContain('!');
    });

    test('debe tratar los espacios como válidos y no incluirlos en invalidChars', () => {
      const result = validateText('HELLO WORLD');
      expect(result.invalidChars).not.toContain(' ');
      expect(result.valid).toBe(true);
    });

    test('debe detectar múltiples caracteres inválidos distintos', () => {
      const result = validateText('HI! HOW?');
      expect(result.valid).toBe(false);
      expect(result.invalidChars).toContain('!');
      expect(result.invalidChars).toContain('?');
    });

    test('debe ser insensible a mayúsculas al validar', () => {
      const resultLower = validateText('hello world');
      const resultUpper = validateText('HELLO WORLD');
      expect(resultLower.valid).toBe(resultUpper.valid);
      expect(resultLower.invalidChars).toEqual(resultUpper.invalidChars);
    });
  });

  // -------------------------------------------------------------------------
  describe('getMorseStats(text)', () => {
    test('debe contar puntos y guiones correctamente para "SOS"', () => {
      // S=... O=--- S=...  → 6 puntos, 3 guiones
      const stats = getMorseStats('SOS');
      expect(stats.dots).toBe(6);
      expect(stats.dashes).toBe(3);
    });

    test('debe contar letras y palabras correctamente', () => {
      const stats = getMorseStats('SOS');
      expect(stats.letters).toBe(3);
      expect(stats.words).toBe(1);
    });

    test('debe identificar la palabra más larga y más corta para texto de una sola palabra', () => {
      const stats = getMorseStats('SOS');
      expect(stats.longestWord).toBe('SOS');
      expect(stats.shortestWord).toBe('SOS');
    });

    test('debe identificar palabras más larga y más corta en texto multi-palabra', () => {
      // "I" → ..  (2 símbolos)  "HELLO" → .... . .-.. .-.. --- (13 símbolos)
      const stats = getMorseStats('I HELLO');
      expect(stats.words).toBe(2);
      expect(stats.letters).toBe(6);
      expect(stats.longestWord).toBe('HELLO');
      expect(stats.shortestWord).toBe('I');
    });

    test('debe retornar un objeto con todas las propiedades requeridas', () => {
      const stats = getMorseStats('TEST');
      expect(stats).toHaveProperty('dots');
      expect(stats).toHaveProperty('dashes');
      expect(stats).toHaveProperty('letters');
      expect(stats).toHaveProperty('words');
      expect(stats).toHaveProperty('longestWord');
      expect(stats).toHaveProperty('shortestWord');
    });
  });

  // -------------------------------------------------------------------------
  describe('sortWordsByMorseLength(words)', () => {
    test('debe ordenar palabras por longitud morse de forma descendente', () => {
      // S=... (3), E=. (1), M=-- (2)
      const result = sortWordsByMorseLength(['S', 'E', 'M']);
      expect(result[0]).toBe('S');
      expect(result[1]).toBe('M');
      expect(result[2]).toBe('E');
    });

    test('debe colocar palabras no codificables al final', () => {
      const result = sortWordsByMorseLength(['HI', 'HELLO!', 'OK']);
      const lastWord = result[result.length - 1];
      expect(lastWord).toBe('HELLO!');
    });

    test('debe retornar el mismo arreglo si solo hay una palabra', () => {
      const result = sortWordsByMorseLength(['SOS']);
      expect(result).toHaveLength(1);
      expect(result[0]).toBe('SOS');
    });

    test('debe mantener el orden correcto con palabras de distinta longitud morse', () => {
      // MORSE=-- --- .-. ... . (11 sym), HI=.... .. (6 sym), IT=.. - (3 sym)
      const result = sortWordsByMorseLength(['IT', 'MORSE', 'HI']);
      expect(result[0]).toBe('MORSE');
      expect(result[1]).toBe('HI');
      expect(result[2]).toBe('IT');
    });
  });

  // -------------------------------------------------------------------------
  describe('filterEncodableWords(words)', () => {
    test('debe retornar solo las palabras que son completamente codificables', () => {
      const result = filterEncodableWords(['HELLO', 'WORLD!', 'TEST', '123?']);
      expect(result).toEqual(['HELLO', 'TEST']);
    });

    test('debe retornar un arreglo vacío si ninguna palabra es codificable', () => {
      const result = filterEncodableWords(['!!!', '@@@', '???']);
      expect(result).toEqual([]);
    });

    test('debe retornar todas las palabras si todas son codificables', () => {
      const result = filterEncodableWords(['SOS', 'HELLO', 'WORLD']);
      expect(result).toEqual(['SOS', 'HELLO', 'WORLD']);
    });

    test('debe aceptar palabras con dígitos como codificables', () => {
      const result = filterEncodableWords(['ABC', '123', 'XYZ!']);
      expect(result).toContain('ABC');
      expect(result).toContain('123');
      expect(result).not.toContain('XYZ!');
    });
  });

  // -------------------------------------------------------------------------
  describe('getMostComplexWord(words)', () => {
    test('debe retornar la palabra con más símbolos morse totales', () => {
      // S=... (3), HELLO=.... . .-.. .-.. --- (13 sym), E=. (1)
      const result = getMostComplexWord(['S', 'HELLO', 'E']);
      expect(result).toBe('HELLO');
    });

    test('debe retornar la primera en caso de empate', () => {
      // M=-- (2), IT=.. - (sin espacios, pero símbolos reales: 3), aquí
      // lo que importa: empate exacto de símbolos totales
      // S=... (3)  y  M+=--. que no existe; usar E=. (1) vs T=- (1) → empate
      const result = getMostComplexWord(['E', 'T']);
      // Ambas tienen 1 símbolo; debe retornar la primera
      expect(result).toBe('E');
    });

    test('debe funcionar con un solo elemento en el arreglo', () => {
      expect(getMostComplexWord(['SOS'])).toBe('SOS');
    });
  });

  // -------------------------------------------------------------------------
  describe('compareMorseComplexity(text1, text2)', () => {
    test('debe identificar el texto con más símbolos morse como ganador', () => {
      // "HELLO" tiene más símbolos que "HI"
      const result = compareMorseComplexity('HELLO', 'HI');
      expect(result.winner).toBe('HELLO');
      expect(result.loser).toBe('HI');
      expect(result.difference).toBeGreaterThan(0);
    });

    test('debe retornar winner y loser como null y difference 0 cuando son iguales', () => {
      // "E" y "T" tienen exactamente 1 símbolo cada una
      const result = compareMorseComplexity('E', 'T');
      expect(result.winner).toBeNull();
      expect(result.loser).toBeNull();
      expect(result.difference).toBe(0);
    });

    test('debe calcular la diferencia correcta entre dos textos', () => {
      // "SOS" = 9 símbolos (... --- ...), "E" = 1 símbolo (.)
      const result = compareMorseComplexity('SOS', 'E');
      expect(result.winner).toBe('SOS');
      expect(result.difference).toBe(8);
    });

    test('debe retornar un objeto con las propiedades winner, loser y difference', () => {
      const result = compareMorseComplexity('A', 'B');
      expect(result).toHaveProperty('winner');
      expect(result).toHaveProperty('loser');
      expect(result).toHaveProperty('difference');
    });
  });

  // -------------------------------------------------------------------------
  describe('getTopNWords(text, n)', () => {
    test('debe retornar las N palabras codificables con mayor longitud morse', () => {
      // "I HELLO WORLD TEST" → ordenadas por longitud morse desc → top 2
      const result = getTopNWords('I HELLO WORLD TEST', 2);
      expect(result).toHaveLength(2);
      // HELLO (13 sym) y WORLD (13 sym) deberían ser los más largos
      expect(result).toContain('HELLO');
      expect(result).toContain('WORLD');
    });

    test('debe ignorar palabras con caracteres no codificables', () => {
      const result = getTopNWords('HELLO WORLD! TEST', 2);
      expect(result).not.toContain('WORLD!');
    });

    test('debe retornar menos de N si hay menos palabras codificables', () => {
      const result = getTopNWords('HI', 5);
      expect(result.length).toBeLessThanOrEqual(5);
      expect(result).toContain('HI');
    });

    test('debe retornar las palabras como strings en el arreglo', () => {
      const result = getTopNWords('SOS HELLO', 2);
      result.forEach((word) => {
        expect(typeof word).toBe('string');
      });
    });

    test('debe respetar el orden descendente por longitud morse', () => {
      // E (1 sym) < S (3 sym) < HELLO (13 sym)
      const result = getTopNWords('E S HELLO', 3);
      expect(result[0]).toBe('HELLO');
      expect(result[result.length - 1]).toBe('E');
    });
  });

});
