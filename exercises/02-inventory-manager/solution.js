/**
 * Módulo de gestión de inventario para una tienda
 *
 * Permite agregar productos, consultar precios, aplicar descuentos
 * y calcular el valor total del inventario.
 */

/**
 * Agrega un nuevo producto al inventario.
 * Lanza un error si ya existe un producto con el mismo ID.
 *
 * @param {Object[]} inventory - Lista actual de productos
 * @param {Object} product - Producto a agregar ({ id, name, price, quantity })
 * @returns {Object[]} Inventario actualizado
 */
function addProduct(inventory, product) {
  // CORREGIDO: Se validó que 'product' no sea null/undefined antes de acceder a sus propiedades
  if (!product || typeof product !== 'object') {
    throw new Error('El producto debe ser un objeto válido');
  }
  if (product.id === undefined || product.id === null) {
    throw new Error('El producto debe tener un ID válido');
  }
  if (typeof product.price !== 'number' || product.price < 0) {
    throw new Error('El precio del producto debe ser un número positivo');
  }

  const exists = inventory.some((item) => item.id === product.id);
  if (exists) {
    throw new Error(`Ya existe un producto con el ID ${product.id}`);
  }

  return [...inventory, product];
}

/**
 * Obtiene el precio de un producto por su ID.
 * Lanza un error si el producto no se encuentra.
 *
 * @param {Object[]} inventory - Lista de productos
 * @param {*} productId - ID del producto a buscar
 * @returns {number} Precio del producto
 */
function getProductPrice(inventory, productId) {
  // CORREGIDO: Se verificó que el producto exista antes de acceder a product.price
  // Antes de la corrección, si el producto no existía se devolvía undefined.price (TypeError)
  const product = inventory.find((item) => item.id === productId);
  if (!product) {
    throw new Error(
      `Producto con ID ${productId} no encontrado en el inventario`,
    );
  }
  return product.price;
}

/**
 * Aplica un descuento porcentual al precio de un producto.
 * El descuento debe ser un valor entre 0 y 1 (ej: 0.2 = 20%).
 *
 * @param {number} price - Precio original
 * @param {number} discount - Descuento entre 0 y 1
 * @returns {number} Precio con descuento aplicado
 */
function applyDiscount(price, discount) {
  // CORREGIDO: Se validó que el descuento esté en el rango [0, 1]
  // Un descuento > 1 producía un precio final negativo, lo cual es inválido
  if (typeof price !== 'number' || price < 0) {
    throw new Error('El precio debe ser un número positivo');
  }
  if (typeof discount !== 'number' || discount < 0 || discount > 1) {
    throw new Error('El descuento debe ser un número entre 0 y 1');
  }
  return price * (1 - discount);
}

/**
 * Calcula el valor total del inventario (precio × cantidad de cada producto).
 *
 * @param {Object[]} inventory - Lista de productos
 * @returns {number} Valor total del inventario
 */
function getTotalValue(inventory) {
  // CORREGIDO: Se validó que inventory sea un array antes de llamar a .reduce()
  // Pasar null o undefined lanzaba TypeError: Cannot read properties of undefined
  if (!Array.isArray(inventory)) {
    throw new Error('El inventario debe ser un array');
  }
  if (inventory.length === 0) {
    return 0;
  }
  return inventory.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}

// Exportar para testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    addProduct,
    getProductPrice,
    applyDiscount,
    getTotalValue,
  };
}

// Ejemplo de uso
if (require.main === module) {
  let inventory = [];
  inventory = addProduct(inventory, {
    id: 1,
    name: 'Laptop',
    price: 1200,
    quantity: 5,
  });
  inventory = addProduct(inventory, {
    id: 2,
    name: 'Mouse',
    price: 25,
    quantity: 50,
  });

  console.log('Precio Laptop:', getProductPrice(inventory, 1));
  console.log('Precio Mouse con 20% descuento:', applyDiscount(25, 0.2));
  console.log('Valor total del inventario:', getTotalValue(inventory));
}
