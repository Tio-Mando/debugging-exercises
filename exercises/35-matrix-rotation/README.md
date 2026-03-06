# Ejercicio 35 - Matrix Rotation

**Tipo:** Error Lógico

## Historia de Usuario

Como desarrollador de un editor de imágenes, necesito una función que rote una matriz NxN 90° en sentido horario para implementar la función de rotación de imágenes representadas como matrices de píxeles.

## Criterios de Aceptación

- `rotateMatrix(matrix)` devuelve una nueva matriz rotada 90° en sentido horario.
- Una matriz `[[1,2],[3,4]]` rotada debe producir `[[3,1],[4,2]]`.
- Cuatro rotaciones consecutivas de 90° deben devolver la matriz original.
- La función no debe mutar la matriz original.

## Problema Reportado

El equipo de QA reporta que las imágenes se rotan en sentido antihorario en lugar de horario. La prueba de las cuatro rotaciones no vuelve al estado original como se esperaría si la rotación fuera correcta.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `buggy-code.js` | Código con el bug a corregir |
| `solution.js` | Solución correcta con comentario `// CORREGIDO:` |
| `test.js` | Pruebas Jest (importa `buggy-code.js` por defecto) |

## Cómo Verificar

```bash
# Ver los errores
npm test exercises/35-matrix-rotation

# Verificar tu solución
# Cambia el import en test.js a solution.js y ejecuta de nuevo
npm test exercises/35-matrix-rotation
```

## Nivel de Dificultad

**Intermedio** — Requiere entender que la rotación horaria de una matriz se logra primero transponiendo y luego invirtiendo filas, y que invertir el orden de las dos operaciones produce el efecto contrario.
