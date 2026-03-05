/**
 * Módulo de lógica fundamental para una tienda de comercio electrónico.
 *
 * Contiene funciones para gestionar el carrito, impuestos, envíos y descuentos.
 */

/**
 * Calcula el subtotal de los productos en el carrito.
 * @param {Object[]} items - Lista de productos ({ price, quantity })
 * @returns {number} Subtotal calculado
 */
function calculateSubtotal(items) {
  // CORREGIDO: Se añadió el valor inicial 0 al reduce para manejar carritos vacíos
  // y asegurar que la suma comience correctamente.
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

/**
 * Aplica un cupón de descuento al total.
 * @param {number} total - Monto total
 * @param {string} couponCode - Código del cupón
 * @returns {number} Total con descuento aplicado
 */
function applyCoupon(total, couponCode) {
  const coupons = {
    SUMMER10: 0.1,
    WELCOME20: 0.2,
  };

  // CORREGIDO: Se usó .toUpperCase() para que la comparación no sea sensible a mayúsculas
  const code = couponCode ? couponCode.toUpperCase() : '';
  const discount = coupons[code] || 0;

  return total * (1 - discount);
}

/**
 * Calcula el impuesto sobre un monto dado.
 * @param {number} amount - Monto base
 * @param {number} taxRate - Tasa de impuesto (ej. 21 para 21%)
 * @returns {number} El monto del impuesto
 */
function calculateTax(amount, taxRate) {
  // CORREGIDO: Se cambió la fórmula para calcular el porcentaje correctamente: (amount * taxRate) / 100
  return (amount * taxRate) / 100;
}

/**
 * Determina el costo de envío basado en el peso y el estado de membresía.
 * @param {number} weight - Peso en kg
 * @param {boolean} isPremium - Si el usuario es miembro premium
 * @returns {number} Costo de envío
 */
function getShippingFee(weight, isPremium) {
  if (isPremium) return 0;

  // CORREGIDO: Se cambió > a >= para que el límite de 10kg incluya la tarifa mayor
  // y se aseguró que el peso sea un número positivo.
  if (weight >= 10) return 25;
  if (weight > 0) return 10;
  return 0;
}

/**
 * Agrega un producto al carrito o incrementa su cantidad si ya existe.
 * @param {Object[]} cart - El carrito actual
 * @param {Object} newItem - El producto a agregar
 * @returns {Object[]} El carrito actualizado (sin mutar el original)
 */
function addItem(cart, newItem) {
  const existingItemIndex = cart.findIndex((item) => item.id === newItem.id);

  if (existingItemIndex > -1) {
    // CORREGIDO: Se realiza una copia profunda para no mutar el array original (principio de inmutabilidad)
    const newCart = [...cart];
    newCart[existingItemIndex] = {
      ...newCart[existingItemIndex],
      quantity: newCart[existingItemIndex].quantity + newItem.quantity,
    };
    return newCart;
  }

  return [...cart, newItem];
}

/**
 * Elimina un producto del carrito por su ID.
 * @param {Object[]} cart - El carrito actual
 * @param {number} itemId - ID del producto a eliminar
 * @returns {Object[]} El carrito filtrado
 */
function removeItem(cart, itemId) {
  // CORREGIDO: Se usó .filter() para retornar un nuevo array sin el elemento,
  // en lugar de .splice() que muta el original y retorna el elemento eliminado.
  return cart.filter((item) => item.id !== itemId);
}

/**
 * Formatea un resumen simple del pedido.
 * @param {Object} order - Objeto pedido ({ total, itemsCount })
 * @returns {string} Resumen formateado
 */
function formatOrderSummary(order) {
  // CORREGIDO: Se usó .toFixed(2) para asegurar que siempre haya dos decimales en el precio
  return `Pedido: ${order.itemsCount} productos - Total: $${order.total.toFixed(2)}`;
}

// Exportar funciones
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateSubtotal,
    applyCoupon,
    calculateTax,
    getShippingFee,
    addItem,
    removeItem,
    formatOrderSummary,
  };
}
