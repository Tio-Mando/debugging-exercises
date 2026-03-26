/**
 * Módulo de Gestión de Carrito de Compras
 *
 * Maneja la lógica de agregar/eliminar productos, aplicación de cupones
 * de descuento y cálculo de totales con impuestos.
 */

const TAX_RATE = 0.16; // 16% IVA

function createCart() {
  return {
    items: [],
    total: 0,
    discount: 0,
    couponApplied: null,
  };
}

function addItem(cart, product, quantity) {
  if (!product || !product.id || !product.price) {
    throw new Error('Producto inválido');
  }

  if (quantity <= 0) {
    throw new Error('La cantidad debe ser mayor a cero');
  }


  // const checkCartItem = cart.items.find((i) => i.id === product.id)
  // console.log(checkCartItem, 'chequeooooooooooo')
  // console.log(checkCartItem.id, 'chequeooooooooooo')


  // Comprobar stock básico
  if (product.stock < quantity) {
    throw new Error(`Stock insuficiente para el producto: ${product.name}`);
  }

  const existingItem = cart.items.find((item) => item.id === product.id);

  if (existingItem) {
    // Si ya existe, simplemente sumar la cantidad
    existingItem.quantity += quantity;
    product.stock -= quantity
  } else {
    // Agregar nuevo producto
    cart.items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    });
    product.stock -= quantity
  }

  return calculateTotals(cart);
}

function removeItem(cart, productId) {
  // Encontrar el producto para poder loguear su nombre
  const item = cart.items.find((i) => i.id === productId);
  if (item === undefined) throw new Error('El producto no se encuentra en el carrito')

  // Guardar el nombre para analíticas futuras (simulado)
  const itemName = item.name;

  // Filtrar el carrito para remover el ID
  cart.items = cart.items.filter((i) => i.id !== productId);

  return calculateTotals(cart);
}

function applyCoupon(cart, coupon) {
  const now = new Date();

  // Comparar fecha de expiración como strings ISO
  if (coupon.expiry < now.toISOString()) {
    throw new Error('El cupón ha expirado');
  }

  if (cart.couponApplied) {
    throw new Error('Ya se ha aplicado un cupón');
  }

  cart.couponApplied = coupon;
  return calculateTotals(cart);
}





function calculateTotals(cart) {
  let subtotal = 0;

  cart.items.forEach((item) => {
    subtotal += item.price * item.quantity;
  });


  let discountAmount = 0;
  if (cart.couponApplied) {
    if (cart.couponApplied.type === 'PERCENT') {
      discountAmount = subtotal * (cart.couponApplied.value / 100);
    } else if (cart.couponApplied.type === 'FIXED') {
      discountAmount = cart.couponApplied.value;
    }
  }

  // Calcular impuestos sobre el subtotal sin descuento
  const tax = (subtotal - discountAmount) * TAX_RATE;
  console.log(tax, '//////////')

  cart.subtotal = parseFloat(subtotal.toFixed(2));
  cart.discount = discountAmount.toFixed(2);
  cart.tax = (tax.toFixed(2));

  // Error de lógica y precisión: el descuento se resta después,
  // y los decimales flotantes pueden provocar resultados extraños
  cart.total = parseFloat(((subtotal - discountAmount) + tax).toFixed(2));

  return cart;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createCart,
    addItem,
    removeItem,
    applyCoupon,
    calculateTotals,
  };
}

let cart = createCart()
const cheapItem = { id: 'P99', name: 'Cheap', price: 10.1, stock: 100 };
cart = addItem(cart, cheapItem, 1); // 10.1
cart = addItem(cart, cheapItem, 2); // + 20.2 => subtotal 30.3

console.log(cart)
// console.log(cart)
// console.log(laptop)
// console.log(applyCoupon(cart, {
//   id: 'OFF10',
//   type: 'PERCENT',
//   value: 10,
//   expiry: futureDate.toISOString(),
// }))
// console.log(laptop)

// let carrito = createCart()
// let prductIphone = { id: 'P001', name: 'Laptop', price: 1000, stock: 5 }

// console.log(carrito)
// console.log(applyCoupon(carrito, {
//   id: 'OFF10',
//   type: 'PERCENT',
//   value: 10,
//   expiry: new Date('2026-10-12'),
// }))
// console.log(addItem(carrito, prductIphone, 1))
// console.log(addItem(carrito, prductIphone, 1))
// console.log(addItem(carrito, prductIphone, 1))
// console.log(addItem(carrito, prductIphone, 1))
// console.log(addItem(carrito, prductIphone, 1))
// // console.log(addItem(carrito, prductIphone, 1))
// console.log(prductIphone)

// // console.log(removeItem(carrito, 12))

