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

## Creating a New Exercise (TDD Workflow)

1. Check existing exercises to determine the next sequential number
2. Create folder `exercises/##-exercise-name/` (lowercase, hyphens)
3. **TDD order** — create files in this sequence:
   1. `test.js` first — define all expected behaviors (RED: tests will fail)
   2. `solution.js` — correct implementation that makes all tests pass (GREEN)
   3. `buggy-code.js` — copy of solution with one intentional bug introduced; verify tests now fail
   4. `README.md` — Scrum-format description
4. README format: `**Tipo**` tag → `## Historia de Usuario` → `## Criterios de Aceptación` → `## Problema Reportado` → `## Archivos` → `## Cómo Verificar` → `## Nivel de Dificultad`. **No hints section.**
5. Add the exercise to the main `README.md` under `## 📋 Current Exercises`
6. **Commit** the completed exercise with message: `feat :sparkles: add [name] exercise (##)`

## Bug Design Rules

- One primary bug per exercise
- Realistic (something a developer might actually write)
- Not trivially obvious, not obscure
- Bug types: Logical Error, Runtime Error, Async Error, Syntax Error
- **No spoilers in `buggy-code.js`**: no comments that reveal, describe, or hint at the bug (e.g. `// Bug:`, `// wrong`, `// Con el bug:`, `// Operandos intercambiados`, or any comment explaining what the mistake is). Students must find the error themselves. Comments that describe normal logic are fine; comments that explain why the code is wrong are not.

## Exercise Numbering

- 01–09: Beginner
- 10–19: Intermediate
- 20–29: Advanced

## QA Checklist Before Committing

- Tests **fail** with `buggy-code.js`, **pass** with `solution.js`
- README has no hints
- `buggy-code.js` has no comments that describe or point to the bug
- All documentation in Spanish, all code in English
- Main `README.md` updated with new exercise entry
- One commit per exercise: `feat :sparkles: add [name] exercise (##)`
