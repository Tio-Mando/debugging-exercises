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
  // Sumar precios por cantidad de cada producto
  return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
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
  let modifyCupon = couponCode.toUpperCase()

  // Buscar descuento. Comparar con los códigos disponibles.
  const discount = coupons[modifyCupon] || 0;

  return total * (1 - discount);
}

/**
 * Calcula el impuesto sobre un monto dado.
 * @param {number} amount - Monto base
 * @param {number} taxRate - Tasa de impuesto (ej. 21 para 21%)
 * @returns {number} El monto del impuesto
 */
function calculateTax(amount, taxRate) {
  // Calcular el monto del impuesto sumando la tasa al monto original
  return amount * (taxRate / 100);
}

/**
 * Determina el costo de envío basado en el peso y el estado de membresía.
 * @param {number} weight - Peso en kg
 * @param {boolean} isPremium - Si el usuario es miembro premium
 * @returns {number} Costo de envío
 */
function getShippingFee(weight, isPremium) {
  // Envío gratis para premium
  if (isPremium) return 0;

  // Si pesa 10kg o más cuesta 25, si pesa menos cuesta 10
  if (weight >= 10) return 25;
  return 10;
}

/**
 * Agrega un producto al carrito o incrementa su cantidad si ya existe.
 * @param {Object[]} cart - El carrito actual
 * @param {Object} newItem - El producto a agregar
 * @returns {Object[]} El carrito actualizado (sin mutar el original)
 */
function addItem(cart, newItem) {

  const existingItemIndex = cart.findIndex((item) => item.id === newItem.id);
  let newCart = [...cart]
  if (existingItemIndex !== -1) {
    // Si ya existe, actualizar la cantidad/
    // cart[existingItemIndex].quantity += newItem.quantity;
    newCart[existingItemIndex] = {
      ...newCart[existingItemIndex],
      quantity: newCart[existingItemIndex].quantity + newItem.quantity
    }
    return newCart;
  } else return [...newCart, newItem];


}

/**
 * Elimina un producto del carrito por su ID.
 * @param {Object[]} cart - El carrito actual
 * @param {number} itemId - ID del producto a eliminar
 * @returns {Object[]} El carrito filtrado
 */
function removeItem(cart, itemId) {

  let newCart = [...cart]
  const index = newCart.findIndex((item) => item.id === itemId);
  // Eliminar el producto del carrito

  if (index !== -1) newCart.splice(index, 1)
    else return null

  return newCart
}

/**
 * Formatea un resumen simple del pedido.
 * @param {Object} order - Objeto pedido ({ total, itemsCount })
 * @returns {string} Resumen formateado
 */
function formatOrderSummary(order) {
  // Retornar un string con la cantidad y el total
  return `Pedido: ${(order.itemsCount)} productos - Total: $${order.total.toFixed(2)}`;
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


// console.log(formatOrderSummary({
//   total: 5,
//   itemsCount: 25
// }))

// const items = [
//   { price: 10, quantity: 2 },
//   { price: 5, quantity: 3 },
// ];
// console.log(calculateSubtotal(items))
// console.log(applyCoupon(100, 'WELCOME20'))
// console.log(calculateTax(100, 25))
// console.log(getShippingFee(6, false))


// const order = { itemsCount: 3, total: 45.5 }
// console.log(formatOrderSummary(order))


// const cart = [{ id: 1, name: 'A', quantity: 1 }];
// const newItem = { id: 1, name: 'A', quantity: 1 };



// console.log('////////////////////////')
// console.log(cart)
// console.log(addItem(cart, newItem))
// console.log(cart)
// console.log('////////////////////////')