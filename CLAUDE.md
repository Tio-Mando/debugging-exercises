# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run all tests
npm test

# Run tests for a specific exercise
npm test exercises/01-calculator-error

# Run tests in watch mode
npm test -- --watch
```

## Architecture

This is a JavaScript debugging exercises project for education. Each exercise lives in `exercises/##-exercise-name/` and contains exactly **4 files**:

| File | Purpose |
|------|---------|
| `README.md` | Exercise description in Scrum format (Spanish) |
| `buggy-code.js` | Intentionally broken code students must fix |
| `solution.js` | Corrected version with `// CORREGIDO:` comments |
| `test.js` | Jest tests — imports `buggy-code.js` by default |

Tests use Jest (`describe`/`test`/`expect`). The test file imports `buggy-code.js` by default; students switch the import to `solution.js` to verify their fix.

## Language Rules (Critical)

- **Documentation** (README, comments, test descriptions): **Spanish**
- **Code** (variable names, function names, logic): **English**
- `solution.js` fix comments use the format: `// CORREGIDO: [explanation]`

## Creating a New Exercise

1. Check existing exercises to determine the next sequential number
2. Create folder `exercises/##-exercise-name/` (lowercase, hyphens)
3. Create `solution.js` first (correct code), then `buggy-code.js` (introduce one bug), then `test.js` (fails with buggy, passes with solution), then `README.md`
4. README format: `**Tipo**` tag → `## Historia de Usuario` → `## Criterios de Aceptación` → `## Problema Reportado` → `## Archivos` → `## Cómo Verificar` → `## Nivel de Dificultad`. **No hints section.**
5. Add the exercise to the main `README.md` under `## 📋 Current Exercises`

## Bug Design Rules

- One primary bug per exercise
- Realistic (something a developer might actually write)
- Not trivially obvious, not obscure
- Bug types: Logical Error, Runtime Error, Async Error, Syntax Error

## Exercise Numbering

- 01–09: Beginner
- 10–19: Intermediate
- 20–29: Advanced

## QA Checklist Before Committing

- Tests **fail** with `buggy-code.js`, **pass** with `solution.js`
- README has no hints
- All documentation in Spanish, all code in English
- Main `README.md` updated with new exercise entry
