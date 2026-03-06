# Sistema de Nómina de Recursos Humanos

**Tipo**: Error Lógico

## Historia de Usuario

Como director de recursos humanos, necesito que el sistema calcule correctamente el salario mensual de cada empleado a partir de su contrato anual, para procesar la nómina de manera precisa y evitar pagos incorrectos.

## Criterios de Aceptación

- `calculateMonthlyGross()` debe retornar el salario anual dividido entre 12 meses
- `calculateTaxAmount()` debe calcular el impuesto sobre el salario mensual correcto
- `calculateNetSalary()` debe retornar el bruto mensual menos los impuestos
- La información del país del empleado se consulta en REST Countries API

## Problema Reportado

Los empleados reportan que su salario mensual es aproximadamente 4 veces menor de lo esperado. Una empleada con contrato de $60,000 anuales recibe el pago de $1,153.85 en lugar de los $5,000 que le corresponden.

**Ejemplos del problema**:

- Salario anual $60,000 → se espera mensual $5,000.00, el sistema calcula $1,153.85
- Salario anual $120,000 → se espera mensual $10,000.00, el sistema calcula $2,307.69
- Salario anual $36,000 → se espera mensual $3,000.00, el sistema calcula $692.31

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar la Solución

```bash
npm test exercises/22-hr-payroll
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-15 minutos
