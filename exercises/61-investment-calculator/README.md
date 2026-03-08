# 🔍 Ejercicio 61: Calculadora de Inversiones

**Tipo**: Depuración | **Área**: Finanzas / Algoritmos numéricos | **Dificultad**: ⭐⭐⭐ Avanzado

## 📖 Historia de Usuario

Como desarrollador de una plataforma de análisis financiero, quiero contar con un conjunto de funciones que calculen interés compuesto, valor futuro, valor presente, ROI, CAGR, retorno ajustado por inflación y rendimiento de portafolio, para que los usuarios puedan evaluar y comparar sus inversiones con resultados precisos.

## ✅ Criterios de Aceptación

- [ ] `compoundInterest` retorna el monto total acumulado aplicando la fórmula de capitalización compuesta correctamente para cualquier frecuencia de capitalización.
- [ ] `simpleInterest` retorna únicamente el interés ganado (no el monto total) según la fórmula de interés simple.
- [ ] `futureValue` calcula el valor futuro de una inversión considerando pagos periódicos opcionales, incluyendo el caso especial cuando la tasa es cero.
- [ ] `presentValue` retorna el valor presente de un monto futuro descontado a la tasa y período indicados, siendo el inverso de `compoundInterest`.
- [ ] `ruleOf72` estima correctamente los años necesarios para duplicar una inversión dividiendo 72 entre la tasa porcentual anual.
- [ ] `roi` calcula el retorno sobre la inversión como porcentaje, incluyendo resultados negativos (pérdidas).
- [ ] `annualizedReturn` calcula el CAGR de una inversión a partir del valor inicial, el valor final y el número de años.
- [ ] `inflationAdjustedReturn` aplica la ecuación de Fisher para obtener el retorno real descontando el efecto de la inflación.
- [ ] `portfolioReturn` calcula el retorno ponderado de un portafolio de activos según el valor relativo de cada uno.
- [ ] `rankInvestments` ordena inversiones de mayor a menor ROI sin mutar el arreglo original.
- [ ] `filterByMinROI` filtra inversiones que igualan o superan el umbral mínimo de ROI indicado.
- [ ] Todas las funciones lanzan errores descriptivos ante entradas inválidas.

## 🐛 Problema Reportado

El equipo de QA reporta que los cálculos del módulo de inversiones producen resultados incorrectos en ciertos escenarios. Al ejecutar la suite de pruebas, múltiples tests fallan con valores que se desvían de los resultados esperados, lo que sugiere que alguna de las fórmulas financieras no está implementada correctamente.

El comportamiento erróneo es consistente: para los mismos parámetros de entrada, la función afectada retorna siempre el mismo valor incorrecto. Por ejemplo, al solicitar el cálculo con entradas que deberían producir un resultado documentado en la especificación, el sistema devuelve una cifra diferente que no coincide con ningún caso de uso válido conocido.

Se descarta un error de redondeo o de tipo de dato, ya que la magnitud de la diferencia entre el valor esperado y el valor obtenido es sistemática. El bug impacta indirectamente en otros componentes del módulo que dependen de la función afectada para calcular rankings y filtros de inversiones.

## 📁 Archivos

| Archivo | Descripción |
|---------|-------------|
| `buggy-code.js` | Código con el bug a corregir |
| `solution.js` | Solución de referencia |
| `test.js` | Suite de pruebas Jest |

## 🚀 Cómo Verificar

```bash
npm test exercises/61-investment-calculator

# Para verificar tu solución, edita test.js y cambia:
# require('./buggy-code') → require('./solution')
```

## 📊 Nivel de Dificultad

⭐⭐⭐ Avanzado — El error reside en una fórmula financiera estándar cuya implementación incorrecta luce plausible a simple vista, requiriendo conocimiento del dominio para distinguirla de la versión correcta.
