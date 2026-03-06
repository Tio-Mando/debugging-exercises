# Calculadora de GPA Universitario

**Tipo**: Error Lógico

## Historia de Usuario

Como estudiante universitario, necesito que el sistema calcule mi GPA (promedio de calificaciones) de forma correcta, ponderando cada nota por los créditos de la materia, para obtener una medición precisa de mi rendimiento académico.

## Criterios de Aceptación

- `calculateGPA()` debe ponderar cada nota (gradePoints) por los créditos (creditHours) de la materia
- Una materia de 4 créditos debe tener cuatro veces más peso que una de 1 crédito
- `getAcademicStatus()` debe reflejar el estado correcto basado en el GPA ponderado
- Los datos de los estudiantes se obtienen desde JSONPlaceholder API

## Problema Reportado

Los estudiantes reportan que su GPA aparece inflado cuando reprueban materias de muchos créditos. Una alumna con 4.0 en una materia de 1 crédito y 2.0 en una materia de 3 créditos debería tener GPA 2.5, pero el sistema reporta 3.0 y le asigna el estado "Bueno" en lugar de "Aprobado".

**Ejemplos del problema**:

- Materia de 1 crédito con 4.0 y materia de 3 créditos con 2.0 → se espera GPA 2.5, el sistema retorna 3.0
- Materia de 4 créditos con 4.0 y materia de 1 crédito con 1.0 → se espera GPA 3.4, el sistema retorna 2.5
- Materia de 4 créditos con 1.0 y materia de 1 crédito con 3.0 → se espera GPA 1.4, el sistema retorna 2.0

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar la Solución

```bash
npm test exercises/19-university-grades
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
