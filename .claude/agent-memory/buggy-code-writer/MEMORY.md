# Buggy Code Writer - Agent Memory

## Bug Patterns Used (avoid repeating in same concept area)

- **ex-59 (luhn-validator)**: Logical error — `positionFromRight % 2 === 0` instead of `=== 1` in Luhn algorithm. Duplicates digits at wrong positions (even instead of odd from right), breaking all valid card number checks.

## General Patterns

- Off-by-one / parity flip (`=== 0` vs `=== 1`) is a strong intermediate/advanced logical bug: realistic, not obviously wrong at a glance, causes broad test failures.
- For algorithm exercises, flipping a comparison operator in a loop condition is a reliable bug type.
- Always verify exports match solution.js exactly — tests import buggy-code.js directly.
- Remove all `// CORREGIDO:` comments from buggy-code.js; any new comments must be in Spanish.
