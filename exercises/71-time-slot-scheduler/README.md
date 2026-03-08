# Programador de Franjas Horarias

**Tipo**: Error Lógico

## 📋 Historia de Usuario

Como administrador de un centro de trabajo o coworking, necesito un sistema que gestione la reserva de salas por franjas horarias, detecte conflictos de horario, permita reservar y cancelar turnos, y muestre estadísticas de ocupación por día y sala.

## 🎯 Criterios de Aceptación

- El sistema debe crear franjas horarias con día, hora de inicio, hora de fin y sala.
- El sistema debe detectar solapamientos correctamente: dos franjas se solapan solo si sus intervalos se intersectan; franjas contiguas (una termina justo donde empieza la otra) **no** se solapan.
- El sistema debe impedir agregar una franja que solape con una ya existente en la misma sala y día.
- El sistema debe permitir reservar, cancelar y consultar franjas por cliente o por día.
- El sistema debe calcular el porcentaje de ocupación y el total de minutos reservados por día.
- El sistema debe identificar el día y la hora con más reservas activas.

## 🐛 Problema Reportado

El sistema rechaza incorrectamente franjas horarias que son simplemente contiguas, tratándolas como si estuvieran solapadas. Esto impide registrar turnos que se suceden uno detrás del otro sin ningún hueco ni superposición real.

**Ejemplos del problema**:

- Intentar agregar la franja `09:00–10:00` después de que ya existe `08:00–09:00` en la misma sala lanza un error de conflicto, cuando en realidad no se solapan.
- En una sala con turno de `600–660` minutos, agregar `660–720` debería funcionar sin error, pero el sistema lo rechaza.
- Como consecuencia, resulta imposible dividir el horario de una sala en turnos consecutivos sin huecos entre ellos.

## 📂 Archivos

- `buggy-code.js` - Código con los errores
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/71-time-slot-scheduler
```

Todas las pruebas deben pasar para considerar los errores corregidos.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto.
Cuando corrijas los errores, cambia la línea de importación en `test.js` a `solution.js`
para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
