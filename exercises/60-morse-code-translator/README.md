# 🔍 Ejercicio 60: Traductor de Código Morse

**Tipo**: Depuración | **Área**: Algoritmos de codificación / Manipulación de strings | **Dificultad**: ⭐⭐⭐⭐ Avanzado

## 📖 Historia de Usuario

Como desarrollador de sistemas de comunicación, quiero contar con un módulo completo de traducción entre texto plano y código Morse, para poder codificar mensajes, decodificarlos, validar entradas y obtener estadísticas detalladas de la codificación.

## ✅ Criterios de Aceptación

- [ ] `MORSE_CODE` exporta correctamente las 26 letras del alfabeto (A–Z) y los 10 dígitos (0–9) con sus secuencias morse exactas
- [ ] `encodeChar` codifica un carácter en mayúscula a su secuencia morse y lanza un error para caracteres no válidos
- [ ] `decodeChar` convierte una secuencia morse al carácter alfanumérico correspondiente y lanza un error para secuencias desconocidas
- [ ] `encodeText` convierte texto completo a morse separando letras con `' '` y palabras con `' / '`, siendo insensible a mayúsculas/minúsculas
- [ ] `decodeText` reconstruye el texto original en mayúsculas a partir de una cadena morse, separando palabras por `' / '`
- [ ] `validateText` devuelve `{ valid, invalidChars }` identificando únicamente los caracteres no codificables (los espacios se consideran válidos)
- [ ] `getMorseStats` retorna un objeto con `dots`, `dashes`, `letters`, `words`, `longestWord` y `shortestWord` calculados correctamente
- [ ] `sortWordsByMorseLength` ordena palabras de mayor a menor longitud morse y coloca las no codificables al final
- [ ] `filterEncodableWords` devuelve únicamente las palabras cuyos caracteres son todos codificables en Morse
- [ ] `getMostComplexWord` retorna la palabra con mayor número de símbolos morse; en empate, devuelve la primera encontrada
- [ ] `compareMorseComplexity` retorna `{ winner, loser, difference }` comparando el total de símbolos morse de dos textos
- [ ] `getTopNWords` extrae las N palabras codificables con mayor longitud morse de un texto, en orden descendente

## 🐛 Problema Reportado

El equipo de QA reporta que la suite de pruebas del módulo `morse-code-translator` presenta múltiples fallos simultáneos al ejecutarse contra `buggy-code.js`. Los errores no se concentran en una única función, sino que afectan a varias partes del sistema de forma independiente.

Se observa que algunas funciones de codificación y decodificación retornan resultados incorrectos para entradas que deberían manejarse sin problemas. Adicionalmente, ciertas funciones de análisis estadístico producen valores numéricos o identificadores de palabras que no coinciden con los esperados por los tests. Las funciones de filtrado y ordenamiento también presentan comportamientos anómalos en escenarios de uso estándar.

Dado que el módulo tiene múltiples defectos distribuidos a lo largo de sus más de 400 líneas de código, se recomienda revisar cuidadosamente cada función de forma individual antes de asumir que una corrección en un área soluciona los fallos en otra.

## 📁 Archivos

| Archivo | Descripción |
|---------|-------------|
| `buggy-code.js` | Código con bugs a corregir |
| `solution.js` | Solución de referencia |
| `test.js` | Suite de pruebas Jest |

## 🚀 Cómo Verificar

```bash
# Ejecutar tests (deben fallar con buggy-code.js)
npm test exercises/60-morse-code-translator

# Para verificar tu solución, edita test.js y cambia:
# require('./buggy-code') → require('./solution')
```

## 📊 Nivel de Dificultad

⭐⭐⭐⭐ Avanzado — El ejercicio distribuye múltiples defectos independientes a lo largo de un sistema de varias funciones interconectadas, lo que exige analizar cada componente de forma aislada y comprender con precisión las convenciones de separación morse para detectar todos los errores.
