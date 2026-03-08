# Agent Memory: exercise-test-builder

## Project conventions (confirmed)
- Import from `./buggy-code` by default; switch comment points to `./solution`
- All `describe`/`test` strings in Spanish; all code identifiers in English
- Use `.toBeCloseTo(val, decimals)` for all float assertions
- Use `beforeEach` for shared fixture arrays (investments, holdings, etc.)
- Nested `describe` per exported function
- Minimum 20 tests for multi-function exercises (intermediate/advanced)
- Use `.toHaveLength` for array size assertions, `.toContain` for membership

## Patterns that expose bugs effectively
- **Off-by-one / wrong formula**: test a known numeric result (e.g., compoundInterest 1000@5%@1yr = 1050 exactly)
- **Returns total instead of interest**: simpleInterest must assert interest earned, NOT principal+interest
- **Rate=0 edge case**: futureValue with rate=0 must use the linear fallback path
- **Inverse relationship**: presentValue(compoundInterest(x)) === x is a strong consistency test
- **Weighted average**: portfolioReturn — use two holdings with known weights so the bug shows as wrong decimal

## Test file structure for math/finance exercises
1. One `describe` block per exported function
2. 3-5 happy-path tests with known reference values
3. 1-2 edge cases (zero rate, single-element array, equal values)
4. 1-2 throw tests per function that validates inputs
5. Array-manipulation functions (rank, filter): use `beforeEach` fixture + test order, length, and immutability

## Files written
- `exercises/61-investment-calculator/test.js` — 11 describe blocks, 34 tests total
