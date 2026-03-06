# Dashboard de Análisis de Redes Sociales

**Tipo**: Error Lógico

## Historia de Usuario

Como creador de contenido, necesito que el dashboard calcule correctamente mi tasa de engagement, para comparar mi rendimiento con otros creadores y entender qué porcentaje de mi audiencia interactúa con mis publicaciones.

## Criterios de Aceptación

- `getEngagementRate()` debe calcular `(total_likes + total_comentarios) / seguidores`
- El resultado debe ser un número entre 0 y 1 (o mayor que 1 si hay más interacciones que seguidores)
- Un creador con más seguidores pero las mismas interacciones debe tener un engagement menor
- Los datos de posts, comentarios y usuarios se obtienen desde JSONPlaceholder API

## Problema Reportado

Los creadores con pocas publicaciones muestran tasas de engagement astronómicas (números como 130 o 500), mientras que creadores con muchas publicaciones muestran tasas normales. La métrica debería ser un porcentaje relativo a la audiencia, no un número absoluto que crece con las interacciones totales.

**Ejemplos del problema**:

- 600 likes + 50 comentarios con 1,000 seguidores y 5 posts → se espera engagement 0.65 (65%), el sistema retorna 130
- 1 like + 0 comentarios con 2 seguidores y 1 post → se espera 0.5, el sistema retorna 1
- 650 interacciones con 650 seguidores → se espera engagement 1.0, el sistema retorna 130

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar la Solución

```bash
npm test exercises/24-social-analytics
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-15 minutos
