/**
 * Email Extractor
 *
 * Módulo para validar y extraer direcciones de email desde texto libre.
 */

const EMAIL_PATTERN = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

/**
 * Verifica si una cadena es un email válido.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const pattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/i;
  return pattern.test(email);
}

console.log(isValidEmail('usuario@ejemplo.com'))
/**
 * Extrae todos los emails únicos de un texto, normalizados a minúsculas.
 * @param {string} text
 * @returns {string[]}
 */
function extractEmails(text) {
  const matches = text.match(EMAIL_PATTERN) ?? [];
  const normalized = matches.map(email => email.toLowerCase());
  return [...new Set(normalized)];
}


const text = 'Escribe a Admin@Empresa.COM para más información.';
console.log(extractEmails(text))
module.exports = { extractEmails, isValidEmail };
