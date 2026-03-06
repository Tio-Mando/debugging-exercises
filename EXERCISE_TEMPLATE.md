# Plantilla de Ejercicio

Usa esta plantilla al crear nuevos ejercicios de depuración. Reemplaza todos los `[placeholders]` con contenido real.

## Estructura de Carpeta

Crear una nueva carpeta:

```
exercises/##-nombre-ejercicio/
```

Ejemplo:

```
exercises/02-error-indexacion-array/
```

**Nota**: Revisa los ejercicios existentes para determinar el siguiente número secuencial.

## **CRÍTICO: Requisitos de Idioma**

1. **TODO el texto en ESPAÑOL**: README, comentarios, descripciones de tests
2. **TODO el código en INGLÉS**: nombres de variables, nombres de funciones, código mismo
3. **NO mezclar idiomas**: Mantén la documentación puramente en español, el código puramente en inglés

## **CRÍTICO: Formato del README**

- **Estilo Scrum**: Historia de usuario + criterios de aceptación + problema reportado
- **SIN pistas**: NO incluir sección de hints - la depuración es 100% trabajo del estudiante
- **Mostrar el problema**: Describir qué debería pasar vs. qué realmente pasa

## Archivos Requeridos

Cada ejercicio debe tener exactamente estos **4 archivos**:

### 1. README.md

````markdown\n# [Nombre del Ejercicio]

**Tipo**: [Error Lógico / Error de Sintaxis / Error de Ejecución / Error Asíncrono]

## 📋 Historia de Usuario

Como [rol de usuario], necesito [funcionalidad] para [beneficio/objetivo].

## 🎯 Criterios de Aceptación

- La funcionalidad debe hacer X correctamente
- La funcionalidad debe hacer Y correctamente
- La funcionalidad debe manejar Z apropiadamente

## 🐛 Problema Reportado

[Descripción clara del problema sin dar pistas de solución]

**Ejemplos del problema**:
- Con entrada X, se espera Y pero se obtiene Z
- Con entrada A, se esperaB pero se obtiene C

## 📂 Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/##-nombre-ejercicio
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: [Principiante / Intermedio / Avanzado]

**Tiempo Estimado**: [10-15 minutos / 15-25 minutos / 25-40 minutos]
````

**Importante**:

- La historia de usuario describe QUÉ debería hacer
- El problema reportado describe QUÉ está mal
- NO se dan pistas de CÓMO solucionarlo

### 2. buggy-code.js

```javascript
/**
 * [Breve descripción de lo que hace este código]
 */

// [Comentarios de contexto si son necesarios]

function [functionName]([parameters]) {
  // [Implementación con bug intencional]

  // Los comentarios deben explicar la INTENCIÓN, no señalar el bug

  return [something];
}

// Exportar para testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { [functionName] };
}

// Opcional: Ejemplo de uso
if (require.main === module) {
  console.log([functionName]([example]));
}
```

**Importante**:

- El bug debe ser realista
- No inmediatamente obvio
- Momento enseñable
- Comentarios en español, código en inglés

### 3. solution.js

```javascript
/**
 * [Misma descripción que buggy-code.js]
 */

// [Mismos comentarios de contexto]

function [functionName]([parameters]) {
  // CORREGIDO: [Explicación de qué estaba mal y cómo se corrigió]

  // [Implementación corregida]

  return [something];
}

// Exportar para testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { [functionName] };
}

// Opcional: Ejemplo de uso
if (require.main === module) {
  console.log([functionName]([example]));
}
```

**Importante**:

- Incluir comentarios "CORREGIDO:"
- Explicar POR QUÉ funciona la corrección

### 4. EXPLANATION.md

````markdown
# Explicación del Error: [Nombre del Ejercicio]

## 🐛 El Error

[Descripción clara de exactamente qué está mal]

**Síntoma**: [Lo que los desarrolladores observarían]

**Ubicación**: [Dónde en el código]

## 🔍 Causa Raíz

[Análisis profundo de POR QUÉ existe este bug]

### Por Qué Ocurre Esto

[Escenarios comunes que llevan a este bug]

## 🕵️ Cómo Identificar Este Bug

1. **[Técnica 1]**: [Descripción]
   - Cómo ayuda: [Explicación]
2. **[Técnica 2]**: [Descripción]
   - Cómo ayuda: [Explicación]

### Depuración con Console.log

```javascript
console.log('[variable]:', [variable]);
// Esto mostraría: [qué revela]
```
````

## 🔧 La Solución

### Antes (Con Error)

```javascript
[fragmento de código con error]
```

### Después (Corregido)

```javascript
[fragmento de código corregido]
```

### Por Qué Esto Funciona

[Explicación de por qué la corrección resuelve el problema]

## 🛡️ Estrategias de Prevención

1. **[Práctica 1]**: [Descripción]
   - Por qué ayuda: [Explicación]

2. **[Práctica 2]**: [Descripción]
   - Por qué ayuda: [Explicación]

## 📚 Puntos Clave

- ✅ [Lección importante 1]
- ✅ [Lección importante 2]
- ✅ [Lección importante 3]

## 🔗 Conceptos Relacionados

[Opcional: Enlaces a docs o ejercicios relacionados]

## 💡 Reflexiona

- [Pregunta que invita a pensar 1]
- [Pregunta que invita a pensar 2]

````

### 5. test.js

```javascript
/**
 * Pruebas para [Nombre del Ejercicio]
 *
 * Por defecto, prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/##-nombre-ejercicio
 */

// IMPORTANTE: Cambiar esta línea para probar tu solución
const { [functionName] } = require('./buggy-code.js');
// const { [functionName] } = require('./solution.js');

describe('[Nombre del Ejercicio] - [Categoría]', () => {
  describe('[Funcionalidad específica]', () => {
    test('debe [comportamiento esperado]', () => {
      expect([functionName]([input])).toBe([expected]);
    });

    test('debe [otro comportamiento]', () => {
      expect([functionName]([input])).toBe([expected]);
    });

    test('debe manejar caso límite - [descripción]', () => {
      expect([functionName]([edgeCase])).toBe([expected]);
    });
  });

  describe('[Otra funcionalidad]', () => {
    test('debe [comportamiento]', () => {
      expect([functionName]([input])).toBe([expected]);
    });

    test('debe lanzar error cuando [condición]', () => {
      expect(() => [functionName]([invalidInput])).toThrow('[mensaje de error]');
    });
  });
});
```

**Importante**:
- Agrupar tests relacionados con `describe()`
- Descripciones claras en español
- Por defecto importar `buggy-code.js`
- Cubrir casos normales, límite y errores
- Usar `toBe()` para valores primitivos, `toEqual()` para objetos/arrays
- Usar `toBeCloseTo()` para números decimales con precisión`

## Checklist Antes de Enviar

Usa este checklist para asegurar completitud:

### Archivos

- [ ] Los 4 archivos creados con nombres exactos
- [ ] Archivos en ubicación correcta: `exercises/##-nombre-ejercicio/`
- [ ] Nombre de carpeta es ##-minúsculas-con-guiones
- [ ] Tag de tipo de bug incluido en README
- [ ] **Todo en español excepto el código**

### Código

- [ ] buggy-code.js contiene bug intencional y realista
- [ ] solution.js corrige el bug con comentarios CORREGIDO
- [ ] Ambos archivos exportan funciones para testing
- [ ] El bug es educativo y no trivial
- [ ] **Código en inglés, comentarios en español**

### Pruebas

- [ ] test.js ejecuta con `node test.js`
- [ ] Las pruebas FALLAN con buggy-code.js
- [ ] Las pruebas PASAN con solution.js
- [ ] Al menos 5 casos de prueba cubriendo diferentes escenarios
- [ ] **Descripciones de pruebas en español**

### Documentación

- [ ] README.md tiene formato Scrum claro (historia, criterios, problema)
- [ ] **SIN sección de hints** - depuración es 100% del estudiante
- [ ] EXPLANATION.md explica el bug completamente
- [ ] Estrategias de prevención son prácticas
- [ ] **Toda documentación en español**

### Calidad

- [ ] Bug es realista (algo que alguien podría escribir)
- [ ] El ejercicio enseña una lección valiosa
- [ ] La documentación es clara y completa
- [ ] El nivel de dificultad es apropiado
- [ ] **Idiomas correctos: español para docs, inglés para código**

## Ejemplo de Inicio Rápido (flujo TDD)

**Objetivo**: Crear un ejercicio simple de error lógico

1. **Número de Ejercicio**: El siguiente disponible es `02-`
2. **Nombre**: `02-suma-calculadora-bug`
3. **Tipo de Bug**: Error Lógico
4. **Bug**: Función suma todos los números excepto el último (error off-by-one)

**Orden TDD obligatorio**:

**Paso 1 — `test.js` primero** (RED: los tests fallarán hasta que exista la solución):
```javascript
const { sumArray } = require('./buggy-code.js');
describe('sumArray', () => {
  test('suma todos los elementos del arreglo', () => {
    expect(sumArray([1, 2, 3])).toBe(6);
  });
});
```

**Paso 2 — `solution.js`** (GREEN: hacer que los tests pasen):
```javascript
function sumArray(numbers) {
  let sum = 0;
  // CORREGIDO: Cambió < numbers.length - 1 a < numbers.length
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}
module.exports = { sumArray };
```

**Paso 3 — `buggy-code.js`** (introducir el bug, verificar que los tests fallen):
```javascript
function sumArray(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length - 1; i++) { // BUG: -1
    sum += numbers[i];
  }
  return sum;
}
module.exports = { sumArray };
```

**Paso 4 — `README.md`**: describir en formato Scrum, sin pistas

**Paso 5 — Actualizar `README.md` principal** y hacer commit:
```bash
git commit -m "feat :sparkles: add suma-calculadora-bug exercise (02)"
```

## Tips para el Éxito

1. **Empezar con la solución**: Escribir código correcto primero, luego introducir el bug
2. **Un bug a la vez**: Enfocarse en una lección de depuración primaria
3. **Contexto del mundo real**: Crear escenarios con los que los desarrolladores se puedan relacionar
4. **Probar exhaustivamente**: Verificar que la versión con bugfalla y la solución pasa
5. **Explicar claramente**: Los estudiantes deben entender el POR QUÉ, no solo el QUÉ
6. **Mantener idiomas separados**: Español para toda documentación, inglés para todo código

## Obtener Ayuda

- Ver `LLM_GUIDE.md` para instrucciones completas para LLMs
- Referenciar ejercicios existentes en `exercises/01-calculator-error/`
- Revisar `STRUCTURE.md` para información detallada de estructura
- Leer `base-prompt.md` para contexto completo del proyecto

---

¡Feliz creación de ejercicios! Recuerda: Cada buen ejercicio de depuración hace que los desarrolladores sean mejores encontrando y corrigiendo bugs en código real.
````
