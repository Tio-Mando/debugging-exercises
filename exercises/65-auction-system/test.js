const { AuctionHouse } = require('./buggy-code');
// Para verificar la solución, cambia require('./buggy-code') a require('./solution')

// ---------------------------------------------------------------------------
// Constructor y estado inicial
// ---------------------------------------------------------------------------
describe('AuctionHouse - estado inicial', () => {
  test('debe inicializar con nombre y sin artículos', () => {
    const house = new AuctionHouse('Casa de Subastas Central');
    expect(house.name).toBe('Casa de Subastas Central');
    expect(house.getItems()).toHaveLength(0);
  });

  test('debe inicializar con historial de subastas vacío', () => {
    const house = new AuctionHouse('Subasta Online');
    expect(house.getHistory()).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// addItem
// ---------------------------------------------------------------------------
describe('AuctionHouse - addItem', () => {
  let house;

  beforeEach(() => {
    house = new AuctionHouse('Galería de Arte');
  });

  test('debe agregar un artículo con precio inicial y precio de reserva', () => {
    house.addItem('Pintura Renacentista', 500, 1200);
    const items = house.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe('Pintura Renacentista');
    expect(items[0].startingPrice).toBe(500);
    expect(items[0].reservePrice).toBe(1200);
  });

  test('debe asignar un id único a cada artículo', () => {
    house.addItem('Cuadro A', 100, 300);
    house.addItem('Escultura B', 200, 600);
    const items = house.getItems();
    expect(items[0].id).not.toBe(items[1].id);
  });

  test('debe inicializar el artículo como abierto (open: true)', () => {
    house.addItem('Reloj Antiguo', 150, 400);
    const items = house.getItems();
    expect(items[0].open).toBe(true);
  });

  test('debe inicializar el artículo sin pujas', () => {
    house.addItem('Joyería Victoriana', 300, 800);
    const items = house.getItems();
    expect(items[0].bids).toHaveLength(0);
  });

  test('debe lanzar error si el precio inicial es menor o igual a cero', () => {
    expect(() => house.addItem('Florero', 0, 200)).toThrow();
    expect(() => house.addItem('Florero', -50, 200)).toThrow();
  });

  test('debe lanzar error si el precio de reserva es menor que el precio inicial', () => {
    expect(() => house.addItem('Tapiz', 500, 400)).toThrow();
  });

  test('debe permitir precio de reserva igual al precio inicial', () => {
    expect(() => house.addItem('Jarrón', 300, 300)).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// placeBid
// ---------------------------------------------------------------------------
describe('AuctionHouse - placeBid', () => {
  let house;
  let itemId;

  beforeEach(() => {
    house = new AuctionHouse('Subasta Inmobiliaria');
    itemId = house.addItem('Villa Mediterránea', 100000, 250000);
  });

  test('debe aceptar una puja que supere el precio inicial cuando no hay pujas previas', () => {
    expect(() => house.placeBid(itemId, 'Alice', 110000)).not.toThrow();
  });

  test('debe aceptar una puja que supere la puja más alta actual', () => {
    house.placeBid(itemId, 'Alice', 110000);
    expect(() => house.placeBid(itemId, 'Bob', 125000)).not.toThrow();
  });

  test('debe lanzar error si la puja es menor o igual a la puja más alta actual', () => {
    house.placeBid(itemId, 'Alice', 110000);
    expect(() => house.placeBid(itemId, 'Bob', 110000)).toThrow();
    expect(() => house.placeBid(itemId, 'Bob', 90000)).toThrow();
  });

  test('debe lanzar error si la puja es menor al precio inicial cuando no hay pujas', () => {
    expect(() => house.placeBid(itemId, 'Carlos', 80000)).toThrow();
  });

  test('debe lanzar error si se puja en un artículo cerrado', () => {
    house.placeBid(itemId, 'Alice', 110000);
    house.closeAuction(itemId);
    expect(() => house.placeBid(itemId, 'Bob', 200000)).toThrow();
  });

  test('debe lanzar error si el artículo no existe', () => {
    expect(() => house.placeBid(9999, 'Alice', 110000)).toThrow();
  });

  test('debe registrar la puja con el nombre del postor y el monto', () => {
    house.placeBid(itemId, 'Diana', 115000);
    const winner = house.getCurrentWinner(itemId);
    expect(winner.bidder).toBe('Diana');
    expect(winner.amount).toBe(115000);
  });

  test('debe retornar el id de la puja registrada', () => {
    const bidId = house.placeBid(itemId, 'Eva', 120000);
    expect(bidId).toBeDefined();
    expect(typeof bidId).toBe('number');
  });
});

// ---------------------------------------------------------------------------
// getCurrentWinner
// ---------------------------------------------------------------------------
describe('AuctionHouse - getCurrentWinner', () => {
  let house;
  let itemId;

  beforeEach(() => {
    house = new AuctionHouse('Subasta Clásica');
    itemId = house.addItem('Automóvil Vintage', 5000, 15000);
  });

  test('debe retornar null cuando no hay pujas', () => {
    expect(house.getCurrentWinner(itemId)).toBeNull();
  });

  test('debe retornar el postor con la puja más alta', () => {
    house.placeBid(itemId, 'Ana', 6000);
    house.placeBid(itemId, 'Bruno', 8000);
    house.placeBid(itemId, 'Clara', 9500);
    house.placeBid(itemId, 'Bruno', 11000);
    const winner = house.getCurrentWinner(itemId);
    expect(winner.bidder).toBe('Bruno');
    expect(winner.amount).toBe(11000);
  });

  test('debe lanzar error si el artículo no existe', () => {
    expect(() => house.getCurrentWinner(9999)).toThrow();
  });
});

// ---------------------------------------------------------------------------
// closeAuction
// ---------------------------------------------------------------------------
describe('AuctionHouse - closeAuction', () => {
  let house;
  let itemId;

  beforeEach(() => {
    house = new AuctionHouse('Gran Subasta');
    itemId = house.addItem('Escultura Griega', 2000, 5000);
  });

  test('debe marcar el artículo como cerrado (open: false)', () => {
    house.closeAuction(itemId);
    const item = house.getItems().find((i) => i.id === itemId);
    expect(item.open).toBe(false);
  });

  test('debe retornar sold: true cuando la puja más alta alcanza el precio de reserva', () => {
    house.placeBid(itemId, 'Luis', 5000);
    const result = house.closeAuction(itemId);
    expect(result.sold).toBe(true);
    expect(result.finalPrice).toBe(5000);
    expect(result.winner).toBe('Luis');
  });

  test('debe retornar sold: false cuando la puja más alta no alcanza el precio de reserva', () => {
    house.placeBid(itemId, 'María', 3500);
    const result = house.closeAuction(itemId);
    expect(result.sold).toBe(false);
  });

  test('debe retornar sold: false cuando no hay pujas', () => {
    const result = house.closeAuction(itemId);
    expect(result.sold).toBe(false);
    expect(result.winner).toBeNull();
  });

  test('debe agregar el resultado al historial de subastas', () => {
    house.placeBid(itemId, 'Pedro', 6000);
    house.closeAuction(itemId);
    const history = house.getHistory();
    expect(history).toHaveLength(1);
    expect(history[0].itemId).toBe(itemId);
  });

  test('debe lanzar error si se intenta cerrar un artículo ya cerrado', () => {
    house.closeAuction(itemId);
    expect(() => house.closeAuction(itemId)).toThrow();
  });

  test('debe lanzar error si el artículo no existe', () => {
    expect(() => house.closeAuction(9999)).toThrow();
  });
});

// ---------------------------------------------------------------------------
// getHistory
// ---------------------------------------------------------------------------
describe('AuctionHouse - getHistory', () => {
  let house;

  beforeEach(() => {
    house = new AuctionHouse('Subasta Histórica');
  });

  test('debe registrar múltiples cierres en el historial en orden cronológico', () => {
    const id1 = house.addItem('Mesa Antigua', 300, 700);
    const id2 = house.addItem('Silla Luis XV', 150, 400);
    house.placeBid(id1, 'Ana', 800);
    house.placeBid(id2, 'Bert', 500);
    house.closeAuction(id1);
    house.closeAuction(id2);
    const history = house.getHistory();
    expect(history).toHaveLength(2);
    expect(history[0].itemId).toBe(id1);
    expect(history[1].itemId).toBe(id2);
  });

  test('debe incluir el nombre del artículo en el historial', () => {
    const id = house.addItem('Lámpara Tiffany', 400, 900);
    house.placeBid(id, 'Raul', 1000);
    house.closeAuction(id);
    const history = house.getHistory();
    expect(history[0].itemName).toBe('Lámpara Tiffany');
  });
});

// ---------------------------------------------------------------------------
// getBidderStats
// ---------------------------------------------------------------------------
describe('AuctionHouse - getBidderStats', () => {
  let house;

  beforeEach(() => {
    house = new AuctionHouse('Subasta Premium');
  });

  test('debe retornar estadísticas correctas para un postor que ganó una subasta', () => {
    const id1 = house.addItem('Piano de Cola', 3000, 7000);
    const id2 = house.addItem('Violín Stradivarius', 10000, 20000);
    house.placeBid(id1, 'Sofía', 7500);
    house.placeBid(id2, 'Sofía', 12000);
    house.placeBid(id2, 'Otro', 15000);
    house.closeAuction(id1);
    house.closeAuction(id2);
    const stats = house.getBidderStats('Sofía');
    expect(stats.totalBids).toBe(2);
    expect(stats.itemsWon).toBe(1);
    expect(stats.totalSpent).toBe(7500);
  });

  test('debe contar todas las pujas incluyendo las perdidas', () => {
    const id = house.addItem('Cuadro Impresionista', 1000, 3000);
    house.placeBid(id, 'Jorge', 1500);
    house.placeBid(id, 'Jorge', 2000);
    house.placeBid(id, 'Otro', 3500);
    house.closeAuction(id);
    const stats = house.getBidderStats('Jorge');
    expect(stats.totalBids).toBe(2);
    expect(stats.itemsWon).toBe(0);
    expect(stats.totalSpent).toBe(0);
  });

  test('debe retornar ceros para un postor que no existe', () => {
    const stats = house.getBidderStats('Fantasma');
    expect(stats.totalBids).toBe(0);
    expect(stats.itemsWon).toBe(0);
    expect(stats.totalSpent).toBe(0);
  });

  test('debe contar correctamente items ganados y dinero gastado cuando el postor gana varias subastas', () => {
    const id1 = house.addItem('Alfombra Persa', 500, 1000);
    const id2 = house.addItem('Vasija Ming', 800, 2000);
    house.placeBid(id1, 'Elena', 1200);
    house.placeBid(id2, 'Elena', 2500);
    house.closeAuction(id1);
    house.closeAuction(id2);
    const stats = house.getBidderStats('Elena');
    expect(stats.itemsWon).toBe(2);
    expect(stats.totalSpent).toBe(3700);
  });
});

// ---------------------------------------------------------------------------
// getTopBidders
// ---------------------------------------------------------------------------
describe('AuctionHouse - getTopBidders', () => {
  let house;

  beforeEach(() => {
    house = new AuctionHouse('Subasta de Coleccionistas');
    const id1 = house.addItem('Moneda Romana', 200, 500);
    const id2 = house.addItem('Sello Postal Raro', 100, 300);
    const id3 = house.addItem('Libro Incunable', 1000, 2500);
    house.placeBid(id1, 'Tomás', 600);
    house.placeBid(id2, 'Tomás', 200);
    house.placeBid(id2, 'Luisa', 350);
    house.placeBid(id3, 'Luisa', 3000);
    house.closeAuction(id1);
    house.closeAuction(id2);
    house.closeAuction(id3);
  });

  test('debe retornar los postores ordenados por dinero gastado (descendente)', () => {
    const top = house.getTopBidders();
    expect(top[0].bidder).toBe('Luisa');
    expect(top[1].bidder).toBe('Tomás');
  });

  test('debe incluir la cantidad de items ganados por cada postor', () => {
    const top = house.getTopBidders();
    const luisa = top.find((b) => b.bidder === 'Luisa');
    const tomas = top.find((b) => b.bidder === 'Tomás');
    expect(luisa.itemsWon).toBe(2);
    expect(tomas.itemsWon).toBe(1);
  });

  test('debe respetar el límite de resultados cuando se especifica', () => {
    const top = house.getTopBidders(1);
    expect(top).toHaveLength(1);
    expect(top[0].bidder).toBe('Luisa');
  });

  test('debe retornar todos los postores cuando el límite supera al total', () => {
    const top = house.getTopBidders(10);
    expect(top).toHaveLength(2);
  });

  test('debe retornar arreglo vacío cuando no hay historial de subastas', () => {
    const emptyHouse = new AuctionHouse('Vacía');
    expect(emptyHouse.getTopBidders()).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// getOpenItems / getClosedItems
// ---------------------------------------------------------------------------
describe('AuctionHouse - getOpenItems y getClosedItems', () => {
  let house;

  beforeEach(() => {
    house = new AuctionHouse('Subasta Mixta');
  });

  test('debe separar correctamente artículos abiertos y cerrados', () => {
    const id1 = house.addItem('Bronce Romano', 800, 2000);
    const id2 = house.addItem('Mármol Griego', 600, 1500);
    const id3 = house.addItem('Fresco Medieval', 400, 1000);
    house.placeBid(id1, 'Alex', 2100);
    house.closeAuction(id1);
    const open = house.getOpenItems();
    const closed = house.getClosedItems();
    expect(open).toHaveLength(2);
    expect(closed).toHaveLength(1);
    expect(open.every((i) => i.open)).toBe(true);
    expect(closed.every((i) => !i.open)).toBe(true);
  });

  test('getOpenItems debe incluir solo artículos aún en subasta', () => {
    const id1 = house.addItem('Tapiz Flamenco', 300, 800);
    house.addItem('Cerámica China', 200, 600);
    house.closeAuction(id1);
    const open = house.getOpenItems();
    const names = open.map((i) => i.name);
    expect(names).not.toContain('Tapiz Flamenco');
    expect(names).toContain('Cerámica China');
  });
});

// ---------------------------------------------------------------------------
// getSoldItemsSummary
// ---------------------------------------------------------------------------
describe('AuctionHouse - getSoldItemsSummary', () => {
  let house;

  beforeEach(() => {
    house = new AuctionHouse('Subasta Final');
  });

  test('debe retornar solo los artículos vendidos con sus datos', () => {
    const id1 = house.addItem('Armadura Medieval', 5000, 12000);
    const id2 = house.addItem('Daga Renacentista', 800, 2000);
    const id3 = house.addItem('Escudo Vikingo', 1200, 3000);
    house.placeBid(id1, 'Felix', 14000);
    house.placeBid(id2, 'Gala', 2500);
    house.closeAuction(id1);
    house.closeAuction(id2);
    house.closeAuction(id3);
    const summary = house.getSoldItemsSummary();
    expect(summary).toHaveLength(2);
    const names = summary.map((s) => s.itemName);
    expect(names).toContain('Armadura Medieval');
    expect(names).toContain('Daga Renacentista');
  });

  test('debe incluir el precio final y el ganador en el resumen', () => {
    const id = house.addItem('Collar de Perlas', 2000, 5000);
    house.placeBid(id, 'Helena', 6000);
    house.closeAuction(id);
    const summary = house.getSoldItemsSummary();
    expect(summary[0].finalPrice).toBe(6000);
    expect(summary[0].winner).toBe('Helena');
  });

  test('debe retornar arreglo vacío cuando ningún artículo fue vendido', () => {
    const id = house.addItem('Objeto Raro', 500, 1000);
    house.closeAuction(id);
    const summary = house.getSoldItemsSummary();
    expect(summary).toHaveLength(0);
  });

  test('debe calcular el total recaudado correctamente', () => {
    const id1 = house.addItem('Pieza A', 100, 200);
    const id2 = house.addItem('Pieza B', 300, 600);
    house.placeBid(id1, 'Ivan', 250);
    house.placeBid(id2, 'Julia', 700);
    house.closeAuction(id1);
    house.closeAuction(id2);
    const total = house.getTotalRevenue();
    expect(total).toBe(950);
  });
});
