---
name: create-exercise
description: Crea nuevos ejercicios de depuración JavaScript para el proyecto de debugging-exercises. Úsalo cuando el usuario pida crear, agregar o generar un nuevo ejercicio de debugging. El skill garantiza que se sigan todos los estándares del proyecto (idiomas, estructura, formato Scrum, tests con Jest, etc.).
---

# Skill: Create Debugging Exercise

This skill guides you step by step to create a new JavaScript debugging exercise that meets **all** project standards.

---

## ⚠️ CRITICAL RULES (Read first)

### Language requirements

| Content                                | Required language        |
| -------------------------------------- | ------------------------ |
| `README.md` (all text)                 | **Spanish**              |
| Comments inside `.js` files            | **Spanish**              |
| Test descriptions (`describe`, `test`) | **Spanish**              |
| Code (variables, functions, logic)     | **English**              |
| File and folder names                  | **English** (kebab-case) |

> **NEVER mix languages**: documentation purely in Spanish, code purely in English.

### Required files (exactly 4)

```
exercises/##-exercise-name/
├── README.md        ← Always uppercase
├── buggy-code.js    ← Always lowercase
├── solution.js      ← Always lowercase
└── test.js          ← Always lowercase
```

> **No EXPLANATION.md** — this file is not part of the project standard.

### README format

- **Scrum-style**: Historia de Usuario + Criterios de Aceptación + Problema Reportado
- **NO hints section** — debugging is 100% the student's responsibility
- **NO solution clues** — describe what is wrong, not how to fix it

---

## Step 1: Determine exercise number, type, and difficulty

### 1.1 — Exercise number

Check existing exercises and use the **next sequential number**:

```bash
ls exercises/
# e.g. if 01-calculator-error exists → next is 02-
```

Format: `##-short-descriptive-name` (2–4 words after the number, lowercase, hyphens)

**Good names:** `02-array-filter-bug`, `03-promise-chain-issue`, `04-object-null-access`
**Bad names:** `Exercise2`, `02-CalculatorBug`, `2-calc`, `02-the-bug-where-results-are-wrong`

### 1.2 — Bug type

If the user **does not specify** a bug type, decide based on which type would best complement existing exercises (avoid repeating the same type consecutively). Use one of:

| Tag                  | When to use                          |
| -------------------- | ------------------------------------ |
| `Error Lógico`       | Code runs but produces wrong results |
| `Error de Sintaxis`  | Code cannot be parsed                |
| `Error de Ejecución` | Code crashes at runtime              |
| `Error Asíncrono`    | Issues with Promises / async-await   |

### 1.3 — Difficulty

Difficulty is **independent of the exercise number**. Assign it based on complexity of the scenario and how subtle the bugs are:

| Level            | Characteristics                                                         |
| ---------------- | ----------------------------------------------------------------------- |
| **Principiante** | One clear symptom, straightforward scenario, ~10–15 min                 |
| **Intermedio**   | Multiple interacting bugs, requires systematic debugging, ~15–25 min    |
| **Avanzado**     | Subtle bugs, complex logic or async, requires deep analysis, ~25–40 min |

---

## Step 2: Design the exercise

### 2.1 — Exercise structure

Each exercise should have:

- **Multiple functions** covering a realistic feature or module
- **Multiple bugs** spread across those functions (not all in one place)
- A **realistic scenario** (e-commerce, grade calculator, user auth, task manager, etc.)
- A **coherent theme** — all functions should belong to the same domain problem

### 2.2 — Bug quality criteria

Each bug must be:

1. **Realistic** — something a developer might actually write by accident
2. **Educational** — teaches a specific, transferable lesson
3. **Non-trivial** — requires actual analysis, not immediately obvious
4. **Non-obscure** — doesn't require esoteric JavaScript knowledge
5. **Spread across functions** — bugs should affect different parts of the module

### 2.3 — Bug examples by type

**Error Lógico (Logical Error):**

- `i < array.length - 1` instead of `i < array.length` (off-by-one)
- `>` instead of `>=` to include boundary value
- Wrong formula: summing instead of averaging
- `=` (assignment) inside an `if` instead of `===`
- Wrong variable used in return (e.g., returning `sum` instead of `average`)

**Error de Sintaxis (Syntax Error):**

- Missing closing `}` or `)` on a function
- Invalid declaration: `const function foo()`
- Extra or missing comma in an object literal

**Error de Ejecución (Runtime Error):**

- `user.address.street` when `address` can be `undefined`
- Calling `.map()` on something that might not be an array
- Division by zero without validation
- Accessing `array[array.length]` instead of `array[array.length - 1]`

**Error Asíncrono (Async Error):**

- `const data = fetchData()` without `await` → returns an unresolved Promise
- Promise without `.catch()` → unhandled rejection
- Dependent async operations not properly sequenced
- `async` function called without `await` by the caller

---

## Step 3: Create the files (in this order)

> **Mandatory order**: `solution.js` → `buggy-code.js` → `test.js` → `README.md`

---

### 3.1 — `solution.js`

Write the **correct implementation first**. This is the source of truth.

**Template:**

```javascript
/**
 * [Brief description of what this module does]
 *
 * [Additional context if needed]
 */

// [Context comment in Spanish if applicable]

function functionOne(param) {
  // CORREGIDO: [Explanation of what was wrong and how it was fixed]
  const result = /* correct implementation */;
  return result;
}

function functionTwo(param) {
  // CORREGIDO: [Explanation of what was wrong and how it was fixed]
  return /* correct implementation */;
}

function functionThree(items) {
  // CORREGIDO: [Explanation of what was wrong and how it was fixed]
  return items./* correct method/logic */;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { functionOne, functionTwo, functionThree };
}

// Optional: example usage
if (require.main === module) {
  console.log(functionOne(/* example */));
}
```

**`// CORREGIDO:` comment format:**

```javascript
// CORREGIDO: Cambió `<` a `<=` para incluir el elemento del límite superior
// CORREGIDO: Se dividió entre `numbers.length` (no entre `numbers.length - 1`) para obtener el promedio correcto
```

**Checklist `solution.js`:**

- [ ] All bugs fixed
- [ ] Every fix has a `// CORREGIDO: [explanation]` comment
- [ ] Code in English, comments in Spanish
- [ ] Exports all functions via `module.exports`
- [ ] Same structure as `buggy-code.js` for easy comparison

---

### 3.2 — `buggy-code.js`

Introduce bugs into the correct code from `solution.js`. **Do not copy-paste and add random bugs** — deliberately craft bugs that feel like natural developer mistakes.

**Template:**

```javascript
/**
 * [Same description as solution.js]
 *
 * [Same additional context]
 */

// [Same context comment in Spanish]

function functionOne(param) {
  // [Comment explaining INTENT — not pointing to the bug]
  const result = /* implementation with intentional bug */;
  return result;
}

function functionTwo(param) {
  // [Comment explaining INTENT]
  return /* implementation with intentional bug */;
}

function functionThree(items) {
  // [Comment explaining INTENT]
  return items./* wrong method/logic */;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { functionOne, functionTwo, functionThree };
}

// Optional: example usage
if (require.main === module) {
  console.log(functionOne(/* example */));
}
```

**Rules for `buggy-code.js`:**

- Comments explain the **intention** of the code, NOT the bug
- **Never** add comments like `// BUG here`, `// Error intencional`, `// This is wrong`
- Bugs should be spread across **different functions**
- Ideal size: 30–150 lines

**Checklist `buggy-code.js`:**

- [ ] Contains multiple bugs across multiple functions
- [ ] Each bug is realistic and educational
- [ ] Comments explain intent, NOT the bug
- [ ] Code in English, comments in Spanish
- [ ] Exports all functions via `module.exports`
- [ ] Can be run with Node.js (for logical/runtime errors)

---

### 3.3 — `test.js`

Use the **Jest framework** (`describe`, `test`, `expect`). Write **as many tests as needed** for complete coverage of all functions, all normal cases, all edge cases, and all error conditions.

**Tests must:**

- **FAIL** with `buggy-code.js` (imports this by default)
- **PASS** with `solution.js`

**Template:**

```javascript
/**
 * Pruebas para: [Exercise Name]
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/##-exercise-name
 */

// IMPORTANTE: Cambiar esta línea para probar tu solución
const { functionOne, functionTwo, functionThree } = require('./buggy-code.js');
// const { functionOne, functionTwo, functionThree } = require('./solution.js');

describe('[Exercise Name] - [Category]', () => {
  // --- functionOne ---
  describe('[functionOne] - [what it does]', () => {
    test('debe [expected behavior with normal input 1]', () => {
      expect(functionOne(input1)).toBe(expected1);
    });

    test('debe [expected behavior with normal input 2]', () => {
      expect(functionOne(input2)).toBe(expected2);
    });

    test('debe manejar [edge case: empty / zero / boundary]', () => {
      expect(functionOne(edgeCase)).toBe(expectedEdge);
    });

    test('debe lanzar error cuando [invalid condition]', () => {
      expect(() => functionOne(invalidInput)).toThrow('[error message]');
    });
  });

  // --- functionTwo ---
  describe('[functionTwo] - [what it does]', () => {
    test('debe [expected behavior 1]', () => {
      expect(functionTwo(input1)).toBe(expected1);
    });

    test('debe [expected behavior 2]', () => {
      expect(functionTwo(input2)).toBe(expected2);
    });

    test('debe manejar [edge case]', () => {
      expect(functionTwo(edgeCase)).toBe(expectedEdge);
    });
  });

  // --- functionThree ---
  describe('[functionThree] - [what it does]', () => {
    test('debe [expected behavior with array]', () => {
      expect(functionThree(inputArray)).toEqual(expectedArray);
    });

    test('debe manejar array vacío', () => {
      expect(functionThree([])).toEqual([]);
    });

    test('debe manejar [another edge case]', () => {
      expect(functionThree(edgeCase)).toEqual(expectedEdge);
    });
  });
});
```

**Key Jest matchers:**

```javascript
// Primitive values (numbers, strings, booleans)
expect(result).toBe(5);

// Objects and arrays (deep equality)
expect(result).toEqual([1, 2, 3]);

// Floating point precision
expect(result).toBeCloseTo(0.3);

// Errors
expect(() => fn(badInput)).toThrow('error message');
expect(() => fn(badInput)).toThrow(TypeError);

// Null / undefined / defined
expect(result).toBeNull();
expect(result).toBeUndefined();
expect(result).toBeDefined();

// Truthy / falsy
expect(result).toBeTruthy();
expect(result).toBeFalsy();

// Comparisons
expect(result).toBeGreaterThan(10);
expect(result).toBeLessThanOrEqual(100);
```

**Test quality rules:**

- Each `describe` block covers **one function**
- Each `test` is **independent** (no shared mutable state between tests)
- Test descriptions clearly state expected behavior **in Spanish**
- Cover: normal inputs, boundary values, empty/null inputs, error conditions

**Checklist `test.js`:**

- [ ] Uses Jest (`describe`, `test`, `expect`) — NOT a custom test runner
- [ ] Imports `buggy-code.js` by default (active line)
- [ ] `solution.js` import is commented out
- [ ] Each function has its own `describe` block
- [ ] Covers normal cases, edge cases, and error conditions for each function
- [ ] Tests are independent of each other
- [ ] Descriptions in Spanish
- [ ] **FAILS** with `buggy-code.js`, **PASSES** with `solution.js`

---

### 3.4 — `README.md`

````markdown
# [Exercise Name in Spanish]

**Tipo**: [Error Lógico / Error de Sintaxis / Error de Ejecución / Error Asíncrono]

## 📋 Historia de Usuario

Como [user role], necesito [functionality] para [benefit/goal].

## 🎯 Criterios de Aceptación

- La funcionalidad debe [do X] correctamente
- La funcionalidad debe [do Y] correctamente
- La funcionalidad debe manejar [Z] apropiadamente
- [Additional criteria per function/behavior]

## 🐛 Problema Reportado

[Clear description of the incorrect behavior observed. No solution hints.]

**Ejemplos del problema**:

- Con entrada `X`, se espera `Y` pero se obtiene `Z`
- Con entrada `A`, se espera `B` pero se obtiene `C`
- [One example per bug symptom]

## 📂 Archivos

- `buggy-code.js` - Código con los errores
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/##-exercise-name
```

Todas las pruebas deben pasar para considerar los errores corregidos.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto.
Cuando corrijas los errores, cambia la línea de importación en `test.js` a `solution.js`
para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: [Principiante / Intermedio / Avanzado]

**Tiempo Estimado**: [10-15 minutos / 15-25 minutos / 25-40 minutos]
````

**Checklist `README.md`:**

- [ ] All text in Spanish
- [ ] `**Tipo**:` tag present
- [ ] User story with role, functionality, and benefit
- [ ] Acceptance criteria — one per relevant behavior
- [ ] Problem description with input → wrong output examples (one per bug symptom)
- [ ] **NO hints section**
- [ ] Lists the 3 other files (not itself)
- [ ] Correct `npm test` command with actual path
- [ ] Difficulty and estimated time included

---

## Step 4: Validate with automated tests

After creating all files, run the tests in both modes:

```bash
# 1. Run with buggy-code.js (default) — should FAIL
npm test exercises/##-exercise-name
# Expected: some tests fail with wrong values shown
```

Then **temporarily** change the import in `test.js` to `solution.js`:

```javascript
// const { ... } = require('./buggy-code.js');   ← comment out
const { ... } = require('./solution.js');         ← activate
```

```bash
# 2. Run with solution.js — should PASS ALL
npm test exercises/##-exercise-name
# Expected: all tests pass
```

Then **revert** `test.js` back to importing `buggy-code.js` before finishing.

```bash
# 3. Final check — buggy fails again (correct final state)
npm test exercises/##-exercise-name
```

---

## Step 5: Update the main README

Add the new exercise to the **"📋 Current Exercises"** section in the root `README.md`:

```markdown
## 📋 Current Exercises

1. ✅ **01-calculator-error** - Error Lógico: Bug en cálculo matemático (Principiante)
2. ✅ **02-exercise-name** - [Tipo]: [Brief description] ([Difficulty])
```

---

## Full final checklist

### Structure

- [ ] Folder at `exercises/##-name-in-lowercase-with-hyphens/`
- [ ] Exactly 4 files with exact names: `README.md`, `buggy-code.js`, `solution.js`, `test.js`
- [ ] Number is next sequential after existing exercises

### Languages

- [ ] All documentation text in Spanish
- [ ] All code (variables, functions) in English
- [ ] Code comments in Spanish
- [ ] Test descriptions in Spanish
- [ ] No language mixing

### `buggy-code.js`

- [ ] Multiple bugs across multiple functions
- [ ] Each bug is realistic and educational
- [ ] Comments explain intent, do NOT point to the bug
- [ ] Exports all functions via `module.exports`

### `solution.js`

- [ ] All bugs fixed
- [ ] Every fix has a `// CORREGIDO: [explanation]` comment
- [ ] Same structure as `buggy-code.js`
- [ ] Exports all functions via `module.exports`

### `test.js`

- [ ] Uses Jest (`describe`, `test`, `expect`)
- [ ] Imports `buggy-code.js` by default (active)
- [ ] `solution.js` import is commented out
- [ ] Each function has its own `describe` block
- [ ] Full coverage: normal, edge, and error cases
- [ ] **FAILS** with `buggy-code.js`
- [ ] **PASSES** with `solution.js`
- [ ] Descriptions in Spanish

### `README.md`

- [ ] All text in Spanish
- [ ] `**Tipo**:` tag present
- [ ] Scrum format: Historia + Criterios + Problema
- [ ] **NO hints section**
- [ ] Examples showing wrong output per bug symptom
- [ ] Difficulty and time estimate included

### Educational quality

- [ ] Each bug teaches a valuable lesson
- [ ] Scenario is realistic and relatable
- [ ] Documentation is sufficient for independent student work
- [ ] Root `README.md` was updated with the new exercise

---

## End-to-end example

The following is a complete, real example of a **multi-function, multi-bug** exercise.

### Scenario: `02-student-grades-processor`

**Bug type**: Error Lógico | **Difficulty**: Intermedio

**The module** processes student grade records: calculate average, find highest grade, filter passing students.

**The bugs:**

1. `calculateAverage` — divides by `grades.length - 1` instead of `grades.length` (off-by-one in denominator)
2. `findHighest` — uses `<` instead of `>` in the comparison, returning the lowest grade instead of the highest
3. `filterPassing` — uses `> 60` instead of `>= 60`, excluding students with exactly 60 (boundary error)

---

**`solution.js` (correct):**

```javascript
/**
 * Módulo de procesamiento de calificaciones estudiantiles
 *
 * Funciones para calcular estadísticas y filtrar estudiantes
 * basadas en sus calificaciones.
 */

function calculateAverage(grades) {
  // CORREGIDO: Se dividió entre grades.length (no grades.length - 1)
  // para incluir todas las calificaciones en el promedio
  if (grades.length === 0)
    throw new Error('El array de calificaciones no puede estar vacío');
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return sum / grades.length;
}

function findHighest(grades) {
  // CORREGIDO: Cambió `<` a `>` para encontrar el valor máximo, no el mínimo
  if (grades.length === 0)
    throw new Error('El array de calificaciones no puede estar vacío');
  let highest = grades[0];
  for (let i = 1; i < grades.length; i++) {
    if (grades[i] > highest) {
      highest = grades[i];
    }
  }
  return highest;
}

function filterPassing(students, passingGrade = 60) {
  // CORREGIDO: Cambió `> passingGrade` a `>= passingGrade`
  // para incluir estudiantes con exactamente la nota mínima aprobatoria
  return students.filter((student) => student.grade >= passingGrade);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateAverage, findHighest, filterPassing };
}
```

---

**`buggy-code.js` (with bugs):**

```javascript
/**
 * Módulo de procesamiento de calificaciones estudiantiles
 *
 * Funciones para calcular estadísticas y filtrar estudiantes
 * basadas en sus calificaciones.
 */

function calculateAverage(grades) {
  // Calcular el promedio sumando todas las calificaciones y dividiendo
  if (grades.length === 0)
    throw new Error('El array de calificaciones no puede estar vacío');
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return sum / (grades.length - 1);
}

function findHighest(grades) {
  // Encontrar la calificación más alta en el array
  if (grades.length === 0)
    throw new Error('El array de calificaciones no puede estar vacío');
  let highest = grades[0];
  for (let i = 1; i < grades.length; i++) {
    if (grades[i] < highest) {
      highest = grades[i];
    }
  }
  return highest;
}

function filterPassing(students, passingGrade = 60) {
  // Filtrar solo los estudiantes que aprobaron el curso
  return students.filter((student) => student.grade > passingGrade);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateAverage, findHighest, filterPassing };
}
```

---

**`test.js`:**

```javascript
/**
 * Pruebas para: Procesador de Calificaciones Estudiantiles
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/02-student-grades-processor
 */

const {
  calculateAverage,
  findHighest,
  filterPassing,
} = require('./buggy-code.js');
// const { calculateAverage, findHighest, filterPassing } = require('./solution.js');

describe('Procesador de Calificaciones Estudiantiles', () => {
  describe('calculateAverage - Cálculo de promedio', () => {
    test('debe calcular el promedio de tres calificaciones correctamente', () => {
      expect(calculateAverage([10, 20, 30])).toBe(20);
    });

    test('debe calcular el promedio de cuatro calificaciones correctamente', () => {
      expect(calculateAverage([5, 10, 15, 20])).toBe(12.5);
    });

    test('debe calcular el promedio de una sola calificación', () => {
      expect(calculateAverage([100])).toBe(100);
    });

    test('debe calcular correctamente con calificaciones perfectas', () => {
      expect(calculateAverage([100, 100, 100])).toBe(100);
    });

    test('debe manejar calificaciones de cero', () => {
      expect(calculateAverage([0, 0, 0])).toBe(0);
    });

    test('debe lanzar error cuando el array está vacío', () => {
      expect(() => calculateAverage([])).toThrow(
        'El array de calificaciones no puede estar vacío',
      );
    });
  });

  describe('findHighest - Búsqueda de calificación más alta', () => {
    test('debe encontrar la calificación más alta en un array', () => {
      expect(findHighest([70, 95, 80, 60])).toBe(95);
    });

    test('debe retornar el único elemento si solo hay uno', () => {
      expect(findHighest([85])).toBe(85);
    });

    test('debe manejar cuando todos los valores son iguales', () => {
      expect(findHighest([75, 75, 75])).toBe(75);
    });

    test('debe encontrar correctamente el máximo cuando está al inicio', () => {
      expect(findHighest([100, 50, 70])).toBe(100);
    });

    test('debe encontrar correctamente el máximo cuando está al final', () => {
      expect(findHighest([50, 70, 100])).toBe(100);
    });

    test('debe lanzar error cuando el array está vacío', () => {
      expect(() => findHighest([])).toThrow(
        'El array de calificaciones no puede estar vacío',
      );
    });
  });

  describe('filterPassing - Filtro de estudiantes aprobados', () => {
    const students = [
      { name: 'Ana', grade: 75 },
      { name: 'Bob', grade: 55 },
      { name: 'Carlos', grade: 60 },
      { name: 'Diana', grade: 90 },
    ];

    test('debe incluir estudiantes con calificación mayor a la mínima aprobatoria', () => {
      const result = filterPassing(students);
      expect(result.map((s) => s.name)).toContain('Ana');
      expect(result.map((s) => s.name)).toContain('Diana');
    });

    test('debe incluir estudiantes con exactamente la calificación mínima (60)', () => {
      const result = filterPassing(students);
      expect(result.map((s) => s.name)).toContain('Carlos');
    });

    test('debe excluir estudiantes con calificación menor a la mínima', () => {
      const result = filterPassing(students);
      expect(result.map((s) => s.name)).not.toContain('Bob');
    });

    test('debe retornar array vacío si ningún estudiante aprueba', () => {
      const failing = [
        { name: 'X', grade: 30 },
        { name: 'Y', grade: 45 },
      ];
      expect(filterPassing(failing)).toEqual([]);
    });

    test('debe respetar un umbral aprobatorio personalizado', () => {
      const result = filterPassing(students, 70);
      expect(result.map((s) => s.name)).toContain('Ana');
      expect(result.map((s) => s.name)).toContain('Diana');
      expect(result.map((s) => s.name)).not.toContain('Carlos');
    });

    test('debe retornar todos si todos aprueban', () => {
      const allPass = [
        { name: 'A', grade: 80 },
        { name: 'B', grade: 90 },
      ];
      expect(filterPassing(allPass)).toHaveLength(2);
    });
  });
});
```

---

**`README.md`:**

````markdown
# Procesador de Calificaciones Estudiantiles

**Tipo**: Error Lógico

## 📋 Historia de Usuario

Como docente universitario, necesito un módulo que procese las calificaciones de mis estudiantes para obtener el promedio, identificar la nota más alta y filtrar quiénes aprobaron el curso.

## 🎯 Criterios de Aceptación

- El módulo debe calcular el promedio de calificaciones correctamente
- El módulo debe identificar la calificación más alta del grupo
- El módulo debe filtrar correctamente los estudiantes aprobados, incluyendo a quienes obtuvieron exactamente la nota mínima aprobatoria
- El módulo debe lanzar un error descriptivo cuando recibe un array vacío

## 🐛 Problema Reportado

El módulo presenta comportamientos incorrectos en varias de sus funciones. Los docentes han reportado que los resultados no coinciden con los cálculos manuales.

**Ejemplos del problema**:

- Al calcular el promedio de `[10, 20, 30]`, se espera `20` pero se obtiene `30`
- Al buscar la nota más alta en `[70, 95, 80, 60]`, se espera `95` pero se obtiene `60`
- Al filtrar estudiantes con nota mínima de `60`, un estudiante con exactamente `60` no aparece en los aprobados

## 📂 Archivos

- `buggy-code.js` - Código con los errores
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/02-student-grades-processor
```

Todas las pruebas deben pasar para considerar los errores corregidos.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto.
Cuando corrijas los errores, cambia la línea de importación en `test.js` a `solution.js`
para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
````

---

## Reference: project documentation

| File                             | Purpose                                      |
| -------------------------------- | -------------------------------------------- |
| `LLM_GUIDE.md`                   | Full guide with principles and workflows     |
| `EXERCISE_TEMPLATE.md`           | File-by-file template with placeholders      |
| `STRUCTURE.md`                   | Naming conventions and folder organization   |
| `TESTING.md`                     | Jest usage guide and matchers reference      |
| `base-prompt.md`                 | Project context and educational philosophy   |
| `exercises/01-calculator-error/` | Canonical single-function reference exercise |
