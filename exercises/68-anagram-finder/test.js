const {
  sortLetters,
  areAnagrams,
  groupAnagrams,
  findAnagramsOf,
  getLargestAnagramGroup,
  filterWordsWithMinAnagrams,
  findWordsWithNoAnagrams,
  getAnagramStats,
} = require('./buggy-code');
// Para verificar la solución, cambia require('./buggy-code') a require('./solution')

// ---------------------------------------------------------------------------
// sortLetters
// ---------------------------------------------------------------------------
describe('sortLetters', () => {
  test('debe retornar las letras de una palabra en orden alfabético', () => {
    expect(sortLetters('amor')).toBe('amor');
    expect(sortLetters('roma')).toBe('amor');
    expect(sortLetters('mora')).toBe('amor');
  });

  test('debe ser insensible a mayúsculas (normalizar a minúsculas)', () => {
    expect(sortLetters('Amor')).toBe('amor');
    expect(sortLetters('ROMA')).toBe('amor');
  });

  test('debe retornar string vacío para entrada vacía', () => {
    expect(sortLetters('')).toBe('');
  });

  test('debe manejar palabras de una sola letra', () => {
    expect(sortLetters('a')).toBe('a');
    expect(sortLetters('Z')).toBe('z');
  });
});

// ---------------------------------------------------------------------------
// areAnagrams
// ---------------------------------------------------------------------------
describe('areAnagrams', () => {
  test('debe retornar true para dos anagramas válidos', () => {
    expect(areAnagrams('listen', 'silent')).toBe(true);
    expect(areAnagrams('amor', 'roma')).toBe(true);
    expect(areAnagrams('triangle', 'integral')).toBe(true);
  });

  test('debe ser insensible a mayúsculas', () => {
    expect(areAnagrams('Listen', 'Silent')).toBe(true);
    expect(areAnagrams('AMOR', 'roma')).toBe(true);
  });

  test('debe retornar false para palabras que no son anagramas', () => {
    expect(areAnagrams('hello', 'world')).toBe(false);
    expect(areAnagrams('cat', 'dog')).toBe(false);
  });

  test('debe retornar false para palabras de distinta longitud', () => {
    expect(areAnagrams('abc', 'abcd')).toBe(false);
  });

  test('debe retornar true para la misma palabra consigo misma', () => {
    expect(areAnagrams('listen', 'listen')).toBe(true);
  });

  test('debe retornar false para palabras vacías con palabras no vacías', () => {
    expect(areAnagrams('', 'a')).toBe(false);
    expect(areAnagrams('a', '')).toBe(false);
  });

  test('debe retornar true para dos strings vacíos', () => {
    expect(areAnagrams('', '')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// groupAnagrams
// ---------------------------------------------------------------------------
describe('groupAnagrams', () => {
  test('debe agrupar palabras en familias de anagramas', () => {
    const words = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    const result = groupAnagrams(words);
    expect(result).toHaveLength(3);

    const sortedGroups = result.map((g) => g.slice().sort()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
    expect(sortedGroups).toContainEqual(['ate', 'eat', 'tea']);
    expect(sortedGroups).toContainEqual(['nat', 'tan']);
    expect(sortedGroups).toContainEqual(['bat']);
  });

  test('debe retornar grupos donde cada grupo tiene solo anagramas entre sí', () => {
    const words = ['listen', 'silent', 'enlist', 'hello', 'world'];
    const result = groupAnagrams(words);
    const listenGroup = result.find((g) => g.includes('listen'));
    expect(listenGroup).toBeDefined();
    expect(listenGroup).toContain('silent');
    expect(listenGroup).toContain('enlist');
    expect(listenGroup).toHaveLength(3);
  });

  test('debe retornar un grupo por palabra cuando ninguna es anagrama de otra', () => {
    const words = ['cat', 'dog', 'bird'];
    const result = groupAnagrams(words);
    expect(result).toHaveLength(3);
    result.forEach((group) => expect(group).toHaveLength(1));
  });

  test('debe retornar un solo grupo cuando todas las palabras son anagramas', () => {
    const words = ['abc', 'bca', 'cab'];
    const result = groupAnagrams(words);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(3);
  });

  test('debe retornar arreglo vacío para entrada vacía', () => {
    expect(groupAnagrams([])).toEqual([]);
  });

  test('debe manejar palabras con distintas mayúsculas correctamente', () => {
    const words = ['Amor', 'roma', 'MORA'];
    const result = groupAnagrams(words);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(3);
  });
});

// ---------------------------------------------------------------------------
// findAnagramsOf
// ---------------------------------------------------------------------------
describe('findAnagramsOf', () => {
  const wordList = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat', 'silent', 'listen'];

  test('debe retornar todas las palabras de la lista que son anagramas de la palabra dada', () => {
    const result = findAnagramsOf('eat', wordList);
    expect(result).toContain('tea');
    expect(result).toContain('ate');
    expect(result).not.toContain('tan');
    expect(result).not.toContain('bat');
  });

  test('debe excluir la palabra dada si aparece en la lista', () => {
    const result = findAnagramsOf('eat', ['eat', 'tea', 'ate']);
    expect(result).not.toContain('eat');
    expect(result).toContain('tea');
    expect(result).toContain('ate');
  });

  test('debe retornar arreglo vacío si no hay anagramas en la lista', () => {
    const result = findAnagramsOf('xyz', wordList);
    expect(result).toEqual([]);
  });

  test('debe ser insensible a mayúsculas al buscar', () => {
    const result = findAnagramsOf('Listen', ['silent', 'ENLIST', 'hello']);
    expect(result).toContain('silent');
    expect(result).toContain('ENLIST');
    expect(result).not.toContain('hello');
  });

  test('debe retornar arreglo vacío cuando la lista está vacía', () => {
    expect(findAnagramsOf('eat', [])).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// getLargestAnagramGroup
// ---------------------------------------------------------------------------
describe('getLargestAnagramGroup', () => {
  test('debe retornar el grupo con más palabras', () => {
    const words = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    const result = getLargestAnagramGroup(words);
    expect(result).toHaveLength(3);
    expect(result).toContain('eat');
    expect(result).toContain('tea');
    expect(result).toContain('ate');
  });

  test('debe retornar uno de los grupos más grandes cuando hay empate', () => {
    const words = ['abc', 'bca', 'xyz', 'zyx'];
    const result = getLargestAnagramGroup(words);
    expect(result).toHaveLength(2);
  });

  test('debe retornar el único grupo cuando todos son únicos', () => {
    const words = ['cat', 'dog'];
    const result = getLargestAnagramGroup(words);
    expect(result).toHaveLength(1);
  });

  test('debe retornar arreglo vacío cuando la entrada está vacía', () => {
    expect(getLargestAnagramGroup([])).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// filterWordsWithMinAnagrams
// ---------------------------------------------------------------------------
describe('filterWordsWithMinAnagrams', () => {
  const words = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat', 'listen', 'silent', 'enlist'];

  test('debe retornar solo palabras que tienen al menos N anagramas en la lista', () => {
    // 'eat', 'tea', 'ate' tienen 2 anagramas cada una
    // 'listen', 'silent', 'enlist' tienen 2 anagramas cada una
    // 'tan', 'nat' tienen 1 anagrama cada una
    // 'bat' tiene 0 anagramas
    const result = filterWordsWithMinAnagrams(words, 2);
    expect(result).toContain('eat');
    expect(result).toContain('tea');
    expect(result).toContain('ate');
    expect(result).toContain('listen');
    expect(result).toContain('silent');
    expect(result).toContain('enlist');
    expect(result).not.toContain('tan');
    expect(result).not.toContain('nat');
    expect(result).not.toContain('bat');
  });

  test('debe retornar todas las palabras cuando minAnagrams es 0', () => {
    const result = filterWordsWithMinAnagrams(words, 0);
    expect(result).toHaveLength(words.length);
  });

  test('debe retornar arreglo vacío cuando ninguna palabra tiene suficientes anagramas', () => {
    const result = filterWordsWithMinAnagrams(words, 10);
    expect(result).toEqual([]);
  });

  test('debe retornar arreglo vacío para lista vacía', () => {
    expect(filterWordsWithMinAnagrams([], 1)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// findWordsWithNoAnagrams
// ---------------------------------------------------------------------------
describe('findWordsWithNoAnagrams', () => {
  test('debe retornar palabras que no tienen ningún anagrama en la lista', () => {
    const words = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    const result = findWordsWithNoAnagrams(words);
    expect(result).toEqual(['bat']);
  });

  test('debe retornar todas las palabras si ninguna es anagrama de otra', () => {
    const words = ['cat', 'dog', 'bird'];
    const result = findWordsWithNoAnagrams(words);
    expect(result).toHaveLength(3);
  });

  test('debe retornar arreglo vacío si todas las palabras tienen anagramas', () => {
    const words = ['eat', 'tea', 'ate'];
    const result = findWordsWithNoAnagrams(words);
    expect(result).toEqual([]);
  });

  test('debe retornar arreglo vacío para lista vacía', () => {
    expect(findWordsWithNoAnagrams([])).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// getAnagramStats
// ---------------------------------------------------------------------------
describe('getAnagramStats', () => {
  test('debe retornar estadísticas correctas para una lista mixta', () => {
    // eat/tea/ate → grupo de 3
    // tan/nat     → grupo de 2
    // bat         → grupo de 1
    const words = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    const stats = getAnagramStats(words);

    expect(stats.totalGroups).toBe(3);
    expect(stats.largestGroupSize).toBe(3);
    expect(stats.averageGroupSize).toBeCloseTo(2, 4); // (3+2+1)/3 = 2
  });

  test('debe retornar stats correctas cuando todos los grupos son de tamaño 1', () => {
    const words = ['cat', 'dog', 'bird'];
    const stats = getAnagramStats(words);

    expect(stats.totalGroups).toBe(3);
    expect(stats.largestGroupSize).toBe(1);
    expect(stats.averageGroupSize).toBeCloseTo(1, 4);
  });

  test('debe retornar stats correctas cuando hay un solo grupo grande', () => {
    const words = ['abc', 'bca', 'cab'];
    const stats = getAnagramStats(words);

    expect(stats.totalGroups).toBe(1);
    expect(stats.largestGroupSize).toBe(3);
    expect(stats.averageGroupSize).toBeCloseTo(3, 4);
  });

  test('debe retornar stats en cero para lista vacía', () => {
    const stats = getAnagramStats([]);
    expect(stats.totalGroups).toBe(0);
    expect(stats.largestGroupSize).toBe(0);
    expect(stats.averageGroupSize).toBe(0);
  });

  test('debe retornar stats correctas para lista de una sola palabra', () => {
    const stats = getAnagramStats(['hello']);
    expect(stats.totalGroups).toBe(1);
    expect(stats.largestGroupSize).toBe(1);
    expect(stats.averageGroupSize).toBeCloseTo(1, 4);
  });
});
