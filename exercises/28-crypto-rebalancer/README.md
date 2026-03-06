# Rebalanceador Automático de Portafolio de Criptomonedas

**Tipo**: Error Lógico

## Historia de Usuario

Como inversor en criptomonedas, necesito que el sistema genere un plan de rebalanceo que respete los porcentajes objetivo de cada activo en mi portafolio, para mantener mi estrategia de inversión y no terminar con una distribución uniforme que no refleja mis metas.

## Criterios de Aceptación

- El valor objetivo de cada activo debe ser `(targetPercentage / 100) * totalPortfolioValue`
- Un activo con objetivo del 70% en un portafolio de $10,000 debe tener valor objetivo de $7,000
- El plan debe indicar comprar, vender o mantener cada activo según la diferencia con el objetivo
- Los precios actuales se obtienen en tiempo real desde CoinGecko API

## Problema Reportado

El sistema ignora los porcentajes objetivo configurados para cada activo. En un portafolio con BTC al 70% objetivo y ETH al 30% objetivo, el sistema recomienda igual distribución (50%-50%) para ambos, sin importar los pesos definidos. El plan de rebalanceo no tiene efecto en la composición real del portafolio.

**Ejemplos del problema**:

- BTC objetivo 70%, ETH objetivo 30%, total $10,000 → se espera BTC target $7,000 y ETH target $3,000, el sistema calcula $5,000 para cada uno
- Portafolio de 3 activos (60%/30%/10%), total $3,000 → se espera targets $1,800/$900/$300, el sistema calcula $1,000 para cada uno
- Un portafolio desbalanceado 70/30 aparece como "no necesita rebalanceo" cuando sí lo necesita

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar la Solución

```bash
npm test exercises/28-crypto-rebalancer
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
