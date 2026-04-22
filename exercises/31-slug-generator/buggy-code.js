/**
 * Slug Generator
 *
 * Convierte un título arbitrario en un slug URL-friendly.
 * Pasos: normalizar acentos → minúsculas → reemplazar no alfanuméricos
 * por guion → colapsar guiones consecutivos → recortar extremos.
 */

/**
 * Convierte un título en un slug URL-friendly.
 * @param {string} title
 * @returns {string}
 */
function generateSlug(title) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .toLowerCase()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

module.exports = { generateSlug };

console.log(generateSlug('Hola mundo'))