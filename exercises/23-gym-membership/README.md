# Sistema de Gestión de Membresías de Gimnasio

**Tipo**: Error Lógico

## Historia de Usuario

Como socio de un gimnasio, necesito que el sistema registre correctamente la fecha de vencimiento de mi membresía mensual, para saber exactamente cuándo debo renovarla y no perder acceso inesperadamente.

## Criterios de Aceptación

- Una membresía de 1 mes iniciada el 1 de febrero debe vencer el 1 de marzo
- Una membresía de 3 meses debe vencer exactamente 3 meses calendario después del inicio
- `isActive()` debe reflejar el estado correcto en base a la fecha de vencimiento real
- El clima para recomendar sesiones al aire libre se consulta desde Open-Meteo API

## Problema Reportado

Los socios reportan que sus membresías vencen en fechas incorrectas. Una membresía de 1 mes iniciada el 1 de febrero aparece como vencida el 2 de marzo en lugar del 1 de marzo. Las membresías anuales vencen el 26 de diciembre del mismo año en lugar del 1 de enero del año siguiente.

**Ejemplos del problema**:

- 1 mes desde el 1 de febrero de 2024 → se espera vencimiento el 1 de marzo, el sistema retorna el 2 de marzo
- 3 meses desde el 1 de noviembre → se espera el 1 de febrero del año siguiente, el sistema retorna el 30 de enero
- 12 meses desde el 1 de enero → se espera el 1 de enero del año siguiente, el sistema retorna el 26 de diciembre

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar la Solución

```bash
npm test exercises/23-gym-membership
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
