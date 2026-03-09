/**
 * Módulo de autenticación de usuarios
 *
 * Funciones para gestionar el registro y la validación de credenciales
 * utilizando la API externa JSONPlaceholder para la búsqueda de usuarios.
 */

const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Busca un usuario por su correo electrónico usando la API externa.
 *
 * @param {string} email - Correo del usuario a buscar
 * @returns {Promise<Object|null>} El usuario encontrado o null
 */
async function findUserByEmail(email) {
  // Simular una búsqueda en la API externa
  // INTENTO: Obtener los datos y retornar el primer usuario encontrado
  const response = await fetch(`${API_URL}?email=${email}`);
  // console.log(response)
  const users = await response.json();

  return users.length > 0 ? users[0] : null;
}

/**
 * Registra un nuevo usuario.
 * Nota: JSONPlaceholder no persiste los datos enviados vía POST.
 *
 * @param {Object} userData - Datos del nuevo usuario ({ email, name })
 * @returns {Promise<Object>} El usuario registrado
 */
async function registerUser(userData) {
  // Comprobar si el usuario ya existe antes de registrarlo
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser !== null) {
    throw new Error('El correo electrónico ya está registrado');
  }

  // Simular operación de guardado vía POST
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const newUser = await response.json();
  return newUser;
}

/**
 * Valida las credenciales de un usuario.
 *
 * @param {string} email - Correo proporcionado
 * @param {string} password - Contraseña proporcionada (simulada)
 * @returns {Promise<Object|null>} El usuario si es válido, null en caso contrario
 */
async function authenticateUser(email, password) {
  // Buscar al usuario por su email
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  // Simulación de validación de contraseña
  const isMatch = new Promise((resolve) => {
    setTimeout(() => {
      // Usamos el username como password para la simulación
      resolve(user.username === password);
    }, 50);
  });

  isMatch.then(a => console.log(a))
  // Si las contraseñas coinciden (isMatch es verdadero), retornamos el usuario
  if (await isMatch) {
    return user;
  }

  return null;
}


// findUserByEmail('Shanna@melissa.tv').then(a => console.log(a))
// registerUser({
//   id: 2,
//   name: 'Ervin Howell',
//   username: 'Antonette',
//   email: 'aaaaaaa@melissa.tv',
//   address: {
//     street: 'Victor Plains',
//     suite: 'Suite 879',
//     city: 'Wisokyburgh',
//     zipcode: '90566-7771',
//     geo: { lat: '-43.9509', lng: '-34.4618' }
//   },
//   phone: '010-692-6593 x09125',
//   website: 'anastasia.net',
//   company: {
//     name: 'Deckow-Crist',
//     catchPhrase: 'Proactive didactic contingency',
//     bs: 'synergize scalable supply-chains'
//   }
// }).then(a => console.log(a))

authenticateUser('Shanna@melissa.tv', 'anecdota').then(a => console.log(a, ' ultima parte '))

// Exportar para pruebas
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    findUserByEmail,
    registerUser,
    authenticateUser,
  };
}
