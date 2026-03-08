# Tabla de Clasificación de Liga Deportiva

**Tipo**: Error Lógico

## 📋 Historia de Usuario

Como administrador de una liga de fútbol, necesito un sistema que registre los resultados de los partidos, calcule la tabla de clasificación con puntos y diferencia de goles, y permita consultar estadísticas como equipos más goleadores, enfrentamientos directos y zona de descenso.

## 🎯 Criterios de Aceptación

- El sistema debe registrar un partido guardando una entrada para el equipo local y otra para el visitante, con sus respectivos goles anotados y recibidos.
- La tabla de clasificación debe ordenarse por puntos (desc), diferencia de goles (desc) y goles marcados (desc).
- Los goles anotados y recibidos de cada equipo deben reflejar únicamente sus propios goles, no los del rival.
- El sistema debe poder listar los N equipos más goleadores.
- El sistema debe retornar el historial de partidos de un equipo específico.
- El sistema debe identificar correctamente los equipos en zona de descenso.

## 🐛 Problema Reportado

Al registrar un partido, los datos del equipo visitante quedan incorrectos. Los goles anotados y los goles recibidos del equipo visitante se almacenan invertidos, usando los valores del equipo local en ambos campos.

**Ejemplos del problema**:

- En un partido `Barcelona 3 - 1 Madrid`, la entry de Madrid queda con `goalsFor: 3` y `goalsAgainst: 1`, cuando debería ser `goalsFor: 1` y `goalsAgainst: 3`.
- La tabla de clasificación devuelve diferencias de goles incorrectas para todos los equipos visitantes.
- Al consultar el historial de un equipo visitante, sus goles anotados y recibidos aparecen intercambiados.

## 📂 Archivos

- `buggy-code.js` - Código con los errores
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/67-sports-league-table
```

Todas las pruebas deben pasar para considerar los errores corregidos.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto.
Cuando corrijas los errores, cambia la línea de importación en `test.js` a `solution.js`
para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-15 minutos
