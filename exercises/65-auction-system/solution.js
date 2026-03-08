/**
 * auction-system.js
 *
 * Sistema de subastas que gestiona artículos, pujas y resultados.
 * Permite agregar artículos con precio inicial y de reserva, registrar pujas,
 * cerrar subastas, consultar ganadores y obtener estadísticas por postor.
 */

class AuctionHouse {
  /**
   * Crea una nueva casa de subastas.
   * @param {string} name - Nombre de la casa de subastas
   */
  constructor(name) {
    this.name = name;
    this._items = [];
    this._history = [];
    this._nextItemId = 1;
    this._nextBidId = 1;
  }

  // ---------------------------------------------------------------------------
  // addItem
  // ---------------------------------------------------------------------------

  /**
   * Agrega un nuevo artículo a la subasta.
   *
   * @param {string} name          - Nombre del artículo
   * @param {number} startingPrice - Precio inicial mínimo para la primera puja (debe ser > 0)
   * @param {number} reservePrice  - Precio mínimo para que el artículo se considere vendido (>= startingPrice)
   * @returns {number} id del artículo recién agregado
   */
  addItem(name, startingPrice, reservePrice) {
    if (startingPrice <= 0) {
      throw new Error('El precio inicial debe ser mayor que cero.');
    }
    if (reservePrice < startingPrice) {
      throw new Error(
        'El precio de reserva no puede ser menor que el precio inicial.'
      );
    }

    const item = {
      id: this._nextItemId++,
      name,
      startingPrice,
      reservePrice,
      open: true,
      bids: [],
    };

    this._items.push(item);
    return item.id;
  }

  // ---------------------------------------------------------------------------
  // placeBid
  // ---------------------------------------------------------------------------

  /**
   * Registra una puja para un artículo.
   * La puja debe superar la puja más alta actual o, si no hay pujas, el precio inicial.
   *
   * @param {number} itemId  - Id del artículo
   * @param {string} bidder  - Nombre del postor
   * @param {number} amount  - Monto de la puja
   * @returns {number} id de la puja registrada
   */
  placeBid(itemId, bidder, amount) {
    const item = this._findItemOrThrow(itemId);

    if (!item.open) {
      throw new Error(`El artículo "${item.name}" ya no está en subasta.`);
    }

    // CORREGIDO: la puja debe ser estrictamente mayor al umbral mínimo (startingPrice o
    // puja más alta actual), no mayor o igual. Usar > garantiza que cada puja supera
    // efectivamente a la anterior.
    const currentHighest =
      item.bids.length === 0
        ? item.startingPrice
        : Math.max(...item.bids.map((b) => b.amount));

    if (amount <= currentHighest) {
      throw new Error(
        `La puja de ${amount} no supera el mínimo actual de ${currentHighest}.`
      );
    }

    const bid = {
      id: this._nextBidId++,
      bidder,
      amount,
    };

    item.bids.push(bid);
    return bid.id;
  }

  // ---------------------------------------------------------------------------
  // getCurrentWinner
  // ---------------------------------------------------------------------------

  /**
   * Retorna la puja más alta actual para un artículo, o null si no hay pujas.
   *
   * @param {number} itemId - Id del artículo
   * @returns {{ bidder: string, amount: number } | null}
   */
  getCurrentWinner(itemId) {
    const item = this._findItemOrThrow(itemId);

    if (item.bids.length === 0) {
      return null;
    }

    // Encontrar la puja con el monto más alto usando reduce
    const topBid = item.bids.reduce(
      (best, bid) => (bid.amount > best.amount ? bid : best),
      item.bids[0]
    );

    return { bidder: topBid.bidder, amount: topBid.amount };
  }

  // ---------------------------------------------------------------------------
  // closeAuction
  // ---------------------------------------------------------------------------

  /**
   * Cierra la subasta para un artículo y determina si fue vendido.
   * El artículo se vende si la puja más alta >= precio de reserva.
   *
   * @param {number} itemId - Id del artículo
   * @returns {{ itemId: number, itemName: string, sold: boolean, finalPrice: number|null, winner: string|null }}
   */
  closeAuction(itemId) {
    const item = this._findItemOrThrow(itemId);

    if (!item.open) {
      throw new Error(`El artículo "${item.name}" ya está cerrado.`);
    }

    item.open = false;

    const topWinner = this.getCurrentWinner(itemId);
    // Vendido si hay una puja y supera o iguala el precio de reserva
    const sold = topWinner !== null && topWinner.amount >= item.reservePrice;

    const result = {
      itemId: item.id,
      itemName: item.name,
      sold,
      finalPrice: sold ? topWinner.amount : null,
      winner: sold ? topWinner.bidder : null,
    };

    this._history.push(result);
    return result;
  }

  // ---------------------------------------------------------------------------
  // getHistory
  // ---------------------------------------------------------------------------

  /**
   * Retorna el historial completo de subastas cerradas en orden cronológico.
   *
   * @returns {Array} Copia del historial
   */
  getHistory() {
    return [...this._history];
  }

  // ---------------------------------------------------------------------------
  // getItems
  // ---------------------------------------------------------------------------

  /**
   * Retorna todos los artículos registrados (abiertos y cerrados).
   *
   * @returns {Array}
   */
  getItems() {
    return [...this._items];
  }

  // ---------------------------------------------------------------------------
  // getOpenItems
  // ---------------------------------------------------------------------------

  /**
   * Retorna solo los artículos cuya subasta sigue abierta.
   *
   * @returns {Array}
   */
  getOpenItems() {
    return this._items.filter((item) => item.open);
  }

  // ---------------------------------------------------------------------------
  // getClosedItems
  // ---------------------------------------------------------------------------

  /**
   * Retorna solo los artículos cuya subasta ya fue cerrada.
   *
   * @returns {Array}
   */
  getClosedItems() {
    return this._items.filter((item) => !item.open);
  }

  // ---------------------------------------------------------------------------
  // getBidderStats
  // ---------------------------------------------------------------------------

  /**
   * Calcula las estadísticas de un postor: total de pujas realizadas,
   * artículos ganados y total gastado (solo en artículos ganados y vendidos).
   *
   * @param {string} bidder - Nombre del postor
   * @returns {{ totalBids: number, itemsWon: number, totalSpent: number }}
   */
  getBidderStats(bidder) {
    // Contar pujas realizadas en todos los artículos
    const totalBids = this._items.reduce((count, item) => {
      const bidderBids = item.bids.filter((b) => b.bidder === bidder);
      return count + bidderBids.length;
    }, 0);

    // Buscar artículos donde este postor ganó (cerrados y vendidos)
    const wonAuctions = this._history.filter(
      (record) => record.sold && record.winner === bidder
    );

    const itemsWon = wonAuctions.length;

    // Total gastado = suma de los precios finales de las subastas ganadas
    const totalSpent = wonAuctions.reduce(
      (sum, record) => sum + record.finalPrice,
      0
    );

    return { totalBids, itemsWon, totalSpent };
  }

  // ---------------------------------------------------------------------------
  // getTopBidders
  // ---------------------------------------------------------------------------

  /**
   * Retorna los mejores postores ordenados por total gastado (descendente).
   * Solo considera postores que ganaron al menos una subasta.
   *
   * @param {number} [limit] - Número máximo de resultados (si se omite, retorna todos)
   * @returns {Array<{ bidder: string, itemsWon: number, totalSpent: number }>}
   */
  getTopBidders(limit) {
    // Recopilar todos los ganadores únicos del historial
    const winners = this._history
      .filter((record) => record.sold)
      .map((record) => record.winner);

    const uniqueBidders = [...new Set(winners)];

    // Calcular estadísticas para cada ganador único
    const bidderStats = uniqueBidders
      .map((bidder) => {
        const stats = this.getBidderStats(bidder);
        return {
          bidder,
          itemsWon: stats.itemsWon,
          totalSpent: stats.totalSpent,
        };
      })
      // Ordenar por total gastado de mayor a menor
      .sort((a, b) => b.totalSpent - a.totalSpent);

    // Aplicar límite si se especificó
    if (limit !== undefined) {
      return bidderStats.slice(0, limit);
    }

    return bidderStats;
  }

  // ---------------------------------------------------------------------------
  // getSoldItemsSummary
  // ---------------------------------------------------------------------------

  /**
   * Retorna un resumen de todos los artículos que fueron vendidos.
   *
   * @returns {Array<{ itemId: number, itemName: string, finalPrice: number, winner: string }>}
   */
  getSoldItemsSummary() {
    return this._history
      .filter((record) => record.sold)
      .map((record) => ({
        itemId: record.itemId,
        itemName: record.itemName,
        finalPrice: record.finalPrice,
        winner: record.winner,
      }));
  }

  // ---------------------------------------------------------------------------
  // getTotalRevenue
  // ---------------------------------------------------------------------------

  /**
   * Calcula el total recaudado por la casa de subastas (suma de precios finales vendidos).
   *
   * @returns {number}
   */
  getTotalRevenue() {
    return this._history
      .filter((record) => record.sold)
      .reduce((sum, record) => sum + record.finalPrice, 0);
  }

  // ---------------------------------------------------------------------------
  // Método privado auxiliar
  // ---------------------------------------------------------------------------

  /**
   * Busca un artículo por id y lanza error si no existe.
   * @param {number} itemId
   * @returns {object}
   */
  _findItemOrThrow(itemId) {
    const item = this._items.find((i) => i.id === itemId);
    if (!item) {
      throw new Error(`No se encontró el artículo con id ${itemId}.`);
    }
    return item;
  }
}

// ---------------------------------------------------------------------------
// Exportaciones
// ---------------------------------------------------------------------------

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AuctionHouse };
}
