**Tipo**: Función | **Dificultad**: Intermedio

## Historia de Usuario

Como miembro de un grupo de viajeros, quiero una herramienta que registre los gastos compartidos y calcule automáticamente cuánto debe cada persona, para poder liquidar las deudas del grupo con el mínimo número de transferencias.

## Criterios de Aceptación

- Se pueden crear gastos indicando descripción, importe, pagador, participantes y categoría.
- El sistema calcula el coste por persona repartiendo el importe en partes iguales entre los participantes.
- Se puede consultar cuánto ha pagado en total cada persona (`getTotalPaid`).
- Se puede consultar cuánto debe en total cada persona sumando su parte en cada gasto (`getTotalOwed`).
- El balance neto de cada persona es la diferencia entre lo pagado y lo que debe (`getNetBalance`). Un balance positivo significa que le deben dinero; negativo, que debe dinero.
- `getAllBalances` devuelve el balance de todos los participantes únicos. La suma de todos los balances debe ser siempre cero.
- `getExpensesByCategory` filtra los gastos por categoría.
- `getPersonHistory` devuelve todos los gastos en los que participa una persona.
- `getHighestSpender` devuelve el nombre de quien más dinero ha pagado.
- `simplifyDebts` calcula el conjunto mínimo de transferencias para saldar todas las deudas.
- `getSummaryReport` genera un informe con el total de gastos, participantes, desglose por categoría y los balances extremos.

## Problema Reportado

El equipo de QA detecta que los balances calculados son incorrectos. Personas que claramente participaron en varios gastos aparecen con un balance de cero o con valores que no corresponden a la realidad. Como consecuencia, `simplifyDebts` no genera las transferencias correctas y el informe del resumen muestra datos erróneos.

## Archivos

| Archivo         | Descripción                                      |
|-----------------|--------------------------------------------------|
| `buggy-code.js` | Implementación con un error que debes corregir   |
| `solution.js`   | Implementación correcta para referencia          |
| `test.js`       | Suite de pruebas Jest (46 tests)                 |

## Cómo Verificar

```bash
# Ejecutar con el código con error (deben fallar varios tests)
npx jest exercises/66-expense-splitter --no-coverage

# Cambiar el import en test.js de './buggy-code' a './solution'
# y volver a ejecutar (deben pasar todos los tests)
npx jest exercises/66-expense-splitter --no-coverage
```

## Nivel de Dificultad

**Intermedio.** El error afecta a una función auxiliar que es utilizada internamente por varias funciones dependientes, por lo que produce fallos en cadena. Identificar la causa raíz requiere entender el flujo de datos entre las funciones y razonar sobre la diferencia entre el rol de pagador y el de participante en un gasto.
