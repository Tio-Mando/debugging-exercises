# Agent Memory — Exercise README Writer

## Format Overrides (User-Confirmed)

The user provides a specific README format that OVERRIDES the default format in the system prompt. Always follow the user's instructions exactly when they specify heading structure. Key differences confirmed in practice:

- Section headings use emojis: `## 📋 Historia de Usuario`, `## 🎯 Criterios de Aceptación`, `## 🐛 Problema Reportado`, `## 📂 Archivos`, `## ✅ Cómo Verificar la Solución`, `## ⚙️ Nivel de Dificultad`
- The "Archivos" section lists only 3 files with this exact format:
  - `buggy-code.js` - Código con el error
  - `test.js` - Pruebas para validar la solución (Jest)
  - `solution.js` - Solución de referencia (para comparar después)
- "Cómo Verificar" uses a single bash block + a plain-text note (not a second code block for switching imports)
- The note text is: "Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución."

## Difficulty Level Numbering

- 01–09: Principiante
- 10–19: Intermedio
- 20–29: Avanzado
- 30+: Use judgment based on actual bug complexity — the user confirmed exercises 39+ can be Intermedio or Avanzado depending on difficulty

## solution.js Comment Convention

Fix comments in solution.js use the format `// CORREGIDO: [explanation]` and appear on the line above or inline with the corrected code.

## Workflow

1. Read `solution.js` first — it contains `// CORREGIDO:` comments that identify the exact bug and the fix
2. Read `buggy-code.js` if additional context is needed to describe symptoms accurately
3. The "Problema Reportado" section must describe observable symptoms only — never the root cause, never mention specific line numbers, array indices, or operator names

## Confirmed Patterns in buggy-code.js Files

- Logical Errors in algorithms often involve off-by-one index conditions (e.g., `% 2 === 0` vs `% 2 === 1`) that produce results visually indistinguishable from correct code
- The bug is always exactly one primary error per exercise
