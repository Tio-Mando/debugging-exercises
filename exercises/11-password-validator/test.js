/**
 * Pruebas para: Validador de Contraseñas
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/11-password-validator
 */

const {
  checkLength,
  checkComplexity,
  calculateStrength,
  validatePassword,
} = require('./buggy-code.js');
// const { checkLength, checkComplexity, calculateStrength, validatePassword } = require('./solution.js');

describe('Validador de Contraseñas - Error Lógico', () => {
  // ─── checkLength ─────────────────────────────────────────────────────────

  describe('checkLength - Validación de longitud', () => {
    test('debe aceptar una contraseña con exactamente la longitud mínima (8 caracteres)', () => {
      expect(checkLength('Pass123!')).toBe(true);
    });

    test('debe aceptar una contraseña con exactamente la longitud máxima (20 caracteres)', () => {
      expect(checkLength('MiPasswordSeguro123!')).toBe(true);
    });

    test('debe aceptar una contraseña dentro del rango permitido', () => {
      expect(checkLength('Password1')).toBe(true);
    });

    test('debe rechazar una contraseña más corta que el mínimo', () => {
      expect(checkLength('Hi1!')).toBe(false);
    });

    test('debe rechazar una contraseña más larga que el máximo', () => {
      expect(checkLength('EstoEsDemasiadoLargo123!!')).toBe(false);
    });

    test('debe respetar longitudes mínima y máxima personalizadas', () => {
      expect(checkLength('abcd', 4, 8)).toBe(true);
      expect(checkLength('abc', 4, 8)).toBe(false);
      expect(checkLength('abcdefghi', 4, 8)).toBe(false);
    });
  });

  // ─── checkComplexity ─────────────────────────────────────────────────────

  describe('checkComplexity - Validación de complejidad', () => {
    test('debe detectar correctamente letras MAYÚSCULAS en una contraseña solo con mayúsculas', () => {
      const result = checkComplexity('HELLO123!');
      expect(result.hasUppercase).toBe(true);
      expect(result.hasLowercase).toBe(false);
    });

    test('debe detectar correctamente letras minúsculas y NO mayúsculas en contraseña solo minúsculas', () => {
      const result = checkComplexity('hello123!');
      expect(result.hasUppercase).toBe(false);
      expect(result.hasLowercase).toBe(true);
    });

    test('debe detectar todos los criterios en una contraseña completa', () => {
      const result = checkComplexity('Hello123!');
      expect(result.hasUppercase).toBe(true);
      expect(result.hasLowercase).toBe(true);
      expect(result.hasNumber).toBe(true);
      expect(result.hasSpecial).toBe(true);
    });

    test('debe retornar false en todos los criterios para una cadena vacía', () => {
      const result = checkComplexity('');
      expect(result.hasUppercase).toBe(false);
      expect(result.hasLowercase).toBe(false);
      expect(result.hasNumber).toBe(false);
      expect(result.hasSpecial).toBe(false);
    });
  });

  // ─── calculateStrength ───────────────────────────────────────────────────

  describe('calculateStrength - Cálculo de fortaleza', () => {
    test('debe retornar 5 para una contraseña que cumple todos los criterios', () => {
      // longitud ok + mayúscula + minúscula + número + especial = 5
      expect(calculateStrength('Hello123!')).toBe(5);
    });

    test('debe retornar 1 para una contraseña que solo tiene minúsculas y longitud válida', () => {
      // longitud ok (9 chars) + minúscula = 2, pero sin los demás
      // 'helloword' → longitud✓ + minúscula✓ = 2
      expect(calculateStrength('helloword')).toBe(2);
    });

    test('debe retornar 0 para una cadena vacía (no cumple ningún criterio)', () => {
      expect(calculateStrength('')).toBe(0);
    });

    test('debe retornar 4 para contraseña sin caracteres especiales pero con todo lo demás', () => {
      expect(calculateStrength('Hello12345')).toBe(4);
    });
  });

  // ─── validatePassword ────────────────────────────────────────────────────

  describe('validatePassword - Validación completa', () => {
    test('debe retornar isValid:true y strength:5 para una contraseña perfecta', () => {
      const result = validatePassword('Hello123!');
      expect(result.isValid).toBe(true);
      expect(result.strength).toBe(5);
    });

    test('debe retornar isValid:false para una contraseña sin mayúsculas', () => {
      const result = validatePassword('hello123!');
      expect(result.isValid).toBe(false);
      expect(result.details.hasUppercase).toBe(false);
    });

    test('debe retornar isValid:false para una contraseña en el límite inferior exacto si no cumple complejidad', () => {
      // 'aaaaaaaa' tiene exactamente 8 chars pero no cumple complejidad
      const result = validatePassword('aaaaaaaa');
      expect(result.isValid).toBe(false);
    });

    test('debe lanzar error si la contraseña no es una cadena de texto', () => {
      expect(() => validatePassword(12345)).toThrow(
        'La contraseña debe ser una cadena de texto',
      );
    });
  });
});
