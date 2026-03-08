const ContactBook = require('./buggy-code');
// Para verificar la solución, cambia require('./buggy-code') a require('./solution')

// ---------------------------------------------------------------------------
// Constructor y estado inicial
// ---------------------------------------------------------------------------
describe('ContactBook - constructor y estado inicial', () => {
  test('debe crear una agenda vacía sin contactos', () => {
    const book = new ContactBook();
    expect(book.getAll()).toEqual([]);
  });

  test('debe reportar cero contactos en una agenda vacía', () => {
    const book = new ContactBook();
    expect(book.count()).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// addContact
// ---------------------------------------------------------------------------
describe('addContact', () => {
  test('debe agregar un contacto con los campos correctos', () => {
    const book = new ContactBook();
    book.addContact({ name: 'Ana García', phone: '555-1001', email: 'ana@mail.com', tags: ['amigo'] });
    const all = book.getAll();
    expect(all).toHaveLength(1);
    expect(all[0].name).toBe('Ana García');
    expect(all[0].phone).toBe('555-1001');
  });

  test('debe lanzar error si el nombre está ausente o vacío', () => {
    const book = new ContactBook();
    expect(() => book.addContact({ phone: '555-0000', email: 'x@x.com', tags: [] })).toThrow();
    expect(() => book.addContact({ name: '', phone: '555-0000', email: 'x@x.com', tags: [] })).toThrow();
  });

  test('debe lanzar error si el teléfono está ausente o vacío', () => {
    const book = new ContactBook();
    expect(() => book.addContact({ name: 'Pedro', email: 'p@mail.com', tags: [] })).toThrow();
    expect(() => book.addContact({ name: 'Pedro', phone: '', email: 'p@mail.com', tags: [] })).toThrow();
  });

  test('debe asignar tags vacío por defecto si no se proporciona', () => {
    const book = new ContactBook();
    book.addContact({ name: 'Luis', phone: '555-2002', email: 'luis@mail.com' });
    expect(book.getAll()[0].tags).toEqual([]);
  });

  test('debe incrementar el contador al agregar contactos', () => {
    const book = new ContactBook();
    book.addContact({ name: 'Ana', phone: '555-1001', email: 'ana@mail.com', tags: [] });
    book.addContact({ name: 'Bob', phone: '555-1002', email: 'bob@mail.com', tags: [] });
    expect(book.count()).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// removeContact
// ---------------------------------------------------------------------------
describe('removeContact', () => {
  let book;

  beforeEach(() => {
    book = new ContactBook();
    book.addContact({ name: 'Ana García', phone: '555-1001', email: 'ana@mail.com', tags: ['amigo'] });
    book.addContact({ name: 'Bob Torres', phone: '555-1002', email: 'bob@mail.com', tags: ['trabajo'] });
    book.addContact({ name: 'Clara Díaz', phone: '555-1003', email: 'clara@mail.com', tags: ['familia'] });
  });

  test('debe eliminar el contacto por nombre exacto', () => {
    book.removeContact('Bob Torres');
    expect(book.count()).toBe(2);
    expect(book.getAll().map((c) => c.name)).not.toContain('Bob Torres');
  });

  test('debe retornar true al eliminar un contacto existente', () => {
    const result = book.removeContact('Ana García');
    expect(result).toBe(true);
  });

  test('debe retornar false al intentar eliminar un contacto inexistente', () => {
    const result = book.removeContact('Fantasma');
    expect(result).toBe(false);
  });

  test('debe no modificar la lista si el contacto no existe', () => {
    book.removeContact('Nadie');
    expect(book.count()).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// findByName
// ---------------------------------------------------------------------------
describe('findByName', () => {
  let book;

  beforeEach(() => {
    book = new ContactBook();
    book.addContact({ name: 'Ana García', phone: '555-1001', email: 'ana@mail.com', tags: [] });
    book.addContact({ name: 'Anastasia Pérez', phone: '555-1004', email: 'anastasia@mail.com', tags: [] });
    book.addContact({ name: 'Bob Torres', phone: '555-1002', email: 'bob@mail.com', tags: [] });
  });

  test('debe encontrar contactos cuyo nombre contiene la cadena de búsqueda (sin importar mayúsculas)', () => {
    const results = book.findByName('ana');
    expect(results).toHaveLength(2);
    const names = results.map((c) => c.name);
    expect(names).toContain('Ana García');
    expect(names).toContain('Anastasia Pérez');
  });

  test('debe retornar un arreglo vacío si no hay coincidencias', () => {
    const results = book.findByName('xyz');
    expect(results).toHaveLength(0);
  });

  test('debe encontrar al contacto con nombre exacto', () => {
    const results = book.findByName('Bob Torres');
    expect(results).toHaveLength(1);
    expect(results[0].phone).toBe('555-1002');
  });
});

// ---------------------------------------------------------------------------
// findByPhone
// ---------------------------------------------------------------------------
describe('findByPhone', () => {
  let book;

  beforeEach(() => {
    book = new ContactBook();
    book.addContact({ name: 'Ana García', phone: '555-1001', email: 'ana@mail.com', tags: [] });
    book.addContact({ name: 'Bob Torres', phone: '555-1002', email: 'bob@mail.com', tags: [] });
  });

  test('debe encontrar un contacto por número de teléfono exacto', () => {
    const contact = book.findByPhone('555-1001');
    expect(contact).not.toBeNull();
    expect(contact.name).toBe('Ana García');
  });

  test('debe retornar null si el teléfono no existe', () => {
    const contact = book.findByPhone('000-0000');
    expect(contact).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// groupByFirstLetter
// ---------------------------------------------------------------------------
describe('groupByFirstLetter', () => {
  let book;

  beforeEach(() => {
    book = new ContactBook();
    book.addContact({ name: 'Ana García', phone: '555-1001', email: 'ana@mail.com', tags: [] });
    book.addContact({ name: 'Anastasia Pérez', phone: '555-1004', email: 'a2@mail.com', tags: [] });
    book.addContact({ name: 'Bob Torres', phone: '555-1002', email: 'bob@mail.com', tags: [] });
    book.addContact({ name: 'Clara Díaz', phone: '555-1003', email: 'clara@mail.com', tags: [] });
  });

  test('debe agrupar correctamente los contactos por la primera letra del nombre', () => {
    const groups = book.groupByFirstLetter();
    expect(groups['A']).toHaveLength(2);
    expect(groups['B']).toHaveLength(1);
    expect(groups['C']).toHaveLength(1);
  });

  test('debe usar letras mayúsculas como claves del objeto', () => {
    const groups = book.groupByFirstLetter();
    const keys = Object.keys(groups);
    keys.forEach((key) => expect(key).toBe(key.toUpperCase()));
  });

  test('debe retornar un objeto vacío cuando la agenda no tiene contactos', () => {
    const emptyBook = new ContactBook();
    expect(emptyBook.groupByFirstLetter()).toEqual({});
  });
});

// ---------------------------------------------------------------------------
// getByTag
// ---------------------------------------------------------------------------
describe('getByTag', () => {
  let book;

  beforeEach(() => {
    book = new ContactBook();
    book.addContact({ name: 'Ana García', phone: '555-1001', email: 'ana@mail.com', tags: ['amigo', 'trabajo'] });
    book.addContact({ name: 'Bob Torres', phone: '555-1002', email: 'bob@mail.com', tags: ['trabajo'] });
    book.addContact({ name: 'Clara Díaz', phone: '555-1003', email: 'clara@mail.com', tags: ['familia'] });
  });

  test('debe retornar todos los contactos que tienen la etiqueta especificada', () => {
    const results = book.getByTag('trabajo');
    expect(results).toHaveLength(2);
    const names = results.map((c) => c.name);
    expect(names).toContain('Ana García');
    expect(names).toContain('Bob Torres');
  });

  test('debe retornar un arreglo vacío si ningún contacto tiene la etiqueta', () => {
    const results = book.getByTag('vip');
    expect(results).toHaveLength(0);
  });

  test('debe retornar solo los contactos con esa etiqueta exacta', () => {
    const results = book.getByTag('familia');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Clara Díaz');
  });
});

// ---------------------------------------------------------------------------
// getSortedAlphabetically
// ---------------------------------------------------------------------------
describe('getSortedAlphabetically', () => {
  let book;

  beforeEach(() => {
    book = new ContactBook();
    book.addContact({ name: 'Clara Díaz', phone: '555-1003', email: 'c@mail.com', tags: [] });
    book.addContact({ name: 'Ana García', phone: '555-1001', email: 'a@mail.com', tags: [] });
    book.addContact({ name: 'Bob Torres', phone: '555-1002', email: 'b@mail.com', tags: [] });
  });

  test('debe retornar los contactos en orden alfabético por nombre', () => {
    const sorted = book.getSortedAlphabetically();
    expect(sorted[0].name).toBe('Ana García');
    expect(sorted[1].name).toBe('Bob Torres');
    expect(sorted[2].name).toBe('Clara Díaz');
  });

  test('debe no mutar la lista interna de contactos', () => {
    const before = book.getAll()[0].name;
    book.getSortedAlphabetically();
    expect(book.getAll()[0].name).toBe(before);
  });

  test('debe retornar un arreglo vacío si no hay contactos', () => {
    const emptyBook = new ContactBook();
    expect(emptyBook.getSortedAlphabetically()).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// getStatistics
// ---------------------------------------------------------------------------
describe('getStatistics', () => {
  let book;

  beforeEach(() => {
    book = new ContactBook();
    book.addContact({ name: 'Ana García', phone: '555-1001', email: 'a@mail.com', tags: ['amigo', 'trabajo'] });
    book.addContact({ name: 'Bob Torres', phone: '555-1002', email: 'b@mail.com', tags: ['trabajo'] });
    book.addContact({ name: 'Clara Díaz', phone: '555-1003', email: 'c@mail.com', tags: ['familia'] });
    book.addContact({ name: 'Ana Ruiz', phone: '555-1004', email: 'ar@mail.com', tags: ['amigo'] });
  });

  test('debe retornar el total de contactos correcto', () => {
    const stats = book.getStatistics();
    expect(stats.total).toBe(4);
  });

  test('debe retornar el número de grupos (letras iniciales únicas)', () => {
    const stats = book.getStatistics();
    // A: Ana García, Ana Ruiz → 2; B: Bob Torres → 1; C: Clara Díaz → 1
    expect(stats.groupCount).toBe(3);
  });

  test('debe retornar todas las etiquetas únicas presentes en la agenda', () => {
    const stats = book.getStatistics();
    expect(stats.uniqueTags.sort()).toEqual(['amigo', 'familia', 'trabajo'].sort());
  });

  test('debe retornar la letra con más contactos', () => {
    const stats = book.getStatistics();
    expect(stats.mostPopularLetter).toBe('A');
  });

  test('debe retornar el promedio de etiquetas por contacto', () => {
    // Ana García: 2, Bob Torres: 1, Clara Díaz: 1, Ana Ruiz: 1 → total 5 / 4 = 1.25
    const stats = book.getStatistics();
    expect(stats.avgTagsPerContact).toBeCloseTo(1.25, 2);
  });
});

// ---------------------------------------------------------------------------
// hasContact
// ---------------------------------------------------------------------------
describe('hasContact', () => {
  let book;

  beforeEach(() => {
    book = new ContactBook();
    book.addContact({ name: 'Ana García', phone: '555-1001', email: 'a@mail.com', tags: [] });
  });

  test('debe retornar true si el contacto existe por nombre exacto', () => {
    expect(book.hasContact('Ana García')).toBe(true);
  });

  test('debe retornar false si el contacto no existe', () => {
    expect(book.hasContact('Inexistente')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// getAllTags
// ---------------------------------------------------------------------------
describe('getAllTags', () => {
  test('debe retornar todas las etiquetas únicas de todos los contactos', () => {
    const book = new ContactBook();
    book.addContact({ name: 'Ana', phone: '555-1001', email: 'a@mail.com', tags: ['amigo', 'trabajo'] });
    book.addContact({ name: 'Bob', phone: '555-1002', email: 'b@mail.com', tags: ['trabajo', 'cliente'] });
    const tags = book.getAllTags();
    expect(tags.sort()).toEqual(['amigo', 'cliente', 'trabajo'].sort());
  });

  test('debe retornar un arreglo vacío si no hay contactos', () => {
    const book = new ContactBook();
    expect(book.getAllTags()).toEqual([]);
  });

  test('debe no incluir etiquetas duplicadas', () => {
    const book = new ContactBook();
    book.addContact({ name: 'X', phone: '111', email: 'x@x.com', tags: ['vip'] });
    book.addContact({ name: 'Y', phone: '222', email: 'y@y.com', tags: ['vip'] });
    const tags = book.getAllTags();
    expect(tags).toHaveLength(1);
    expect(tags[0]).toBe('vip');
  });
});

// ---------------------------------------------------------------------------
// updateContact
// ---------------------------------------------------------------------------
describe('updateContact', () => {
  let book;

  beforeEach(() => {
    book = new ContactBook();
    book.addContact({ name: 'Ana García', phone: '555-1001', email: 'ana@mail.com', tags: ['amigo'] });
  });

  test('debe actualizar los campos del contacto indicado', () => {
    book.updateContact('Ana García', { phone: '555-9999', email: 'nuevo@mail.com' });
    const contact = book.findByPhone('555-9999');
    expect(contact).not.toBeNull();
    expect(contact.email).toBe('nuevo@mail.com');
  });

  test('debe retornar true al actualizar un contacto existente', () => {
    const result = book.updateContact('Ana García', { phone: '555-8888' });
    expect(result).toBe(true);
  });

  test('debe retornar false al intentar actualizar un contacto inexistente', () => {
    const result = book.updateContact('Nadie', { phone: '555-0000' });
    expect(result).toBe(false);
  });

  test('debe preservar los campos no actualizados', () => {
    book.updateContact('Ana García', { phone: '555-7777' });
    const contact = book.findByPhone('555-7777');
    expect(contact.email).toBe('ana@mail.com');
    expect(contact.tags).toEqual(['amigo']);
  });
});
