# Sistema de Seguimiento Nutricional de Recetas

**Tipo**: Error Lógico

## Historia de Usuario

Como usuario que controla su alimentación, necesito que la app calcule correctamente las calorías por porción de cada receta, para planificar mis comidas según mis metas calóricas diarias.

## Criterios de Aceptación

- `getCaloriesPerServing()` debe retornar el total de calorías dividido entre el número de porciones (`servings`)
- Agregar más ingredientes a una receta no debe cambiar la cantidad de porciones
- La información nutricional de los ingredientes se obtiene desde Open Food Facts API
- `MealPlan.getTotalDailyCalories()` debe sumar correctamente todas las recetas del día

## Problema Reportado

Los usuarios reportan que las calorías por porción cambian al agregar ingredientes. Una receta de smoothie con 210 calorías totales y 3 porciones debería mostrar 70 cal/porción, pero el sistema muestra 105. Además, al agregar un tercer ingrediente al mismo smoothie, el valor cambia sin que se modifiquen las porciones.

**Ejemplos del problema**:

- Receta con 210 cal totales, 3 porciones, 2 ingredientes → se espera 70 cal/porción, el sistema retorna 105
- Sopa con 200 cal totales, 4 porciones, 1 ingrediente → se espera 50 cal/porción, el sistema retorna 200
- Postre con 1307 cal totales, 1 porción, 5 ingredientes → se espera 1307 cal/porción, el sistema retorna 261

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar la Solución

```bash
npm test exercises/20-recipe-nutrition
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-15 minutos
