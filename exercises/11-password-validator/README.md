# Validador de Contraseñas

**Tipo**: Error Lógico

## Historia de Usuario

Como administrador de una plataforma web, necesito un módulo que valide contraseñas de usuario para garantizar que cumplan con los estándares mínimos de seguridad antes de ser aceptadas.

## Criterios de Aceptación

- `checkLength` debe aceptar contraseñas con exactamente la longitud mínima y máxima permitida (valores límite incluidos)
- `checkComplexity` debe detectar correctamente la presencia o ausencia de letras mayúsculas, minúsculas, números y caracteres especiales
- `calculateStrength` debe retornar una puntuación entre 0 y 5, donde 5 significa que se cumplen todos los criterios
- `validatePassword` debe retornar `isValid: true` únicamente cuando la contraseña cumple longitud y todos los criterios de complejidad

## Problema Reportado

El equipo de QA detectó que el módulo de validación produce resultados incorrectos en múltiples escenarios que deberían funcionar correctamente.

**Ejemplos del problema**:

- Una contraseña de exactamente 8 caracteres como `Pass123!` es rechazada por `checkLength`, cuando debería ser aceptada
- Una contraseña solo con mayúsculas como `HELLO123!` reporta `hasUppercase: false`, cuando debería ser `true`
- Una contraseña que cumple todos los criterios retorna `strength: 6` en lugar del máximo esperado de `5`

## Archivos

- `buggy-code.js` - Código con los errores
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Como Verificar la Solución

```bash
npm test exercises/11-password-validator
```

Todas las pruebas deben pasar para considerar los errores corregidos.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas los errores, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-20 minutos
