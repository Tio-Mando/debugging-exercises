# Ejercicio 30 - Email Extractor

**Tipo:** Error Lógico

## Historia de Usuario

Como desarrollador de un sistema de notificaciones, necesito un módulo que extraiga y valide direcciones de email desde texto libre —como el cuerpo de un correo o un documento— para poder enviar copias automáticas a todos los destinatarios mencionados.

## Criterios de Aceptación

- `isValidEmail(email)` devuelve `true` si la cadena tiene formato de email válido, sin importar mayúsculas.
- `extractEmails(text)` extrae todos los emails presentes en el texto, los normaliza a minúsculas y elimina duplicados.
- Los emails escritos con mayúsculas (`Admin@Empresa.COM`) deben extraerse igual que los escritos en minúsculas.
- No deben aparecer duplicados aunque el mismo email aparezca en distintas capitalizaciones.

## Problema Reportado

El equipo de marketing reporta que al procesar correos enviados por clientes que usan Outlook (el cual escribe los emails con la primera letra en mayúscula), el extractor devuelve un arreglo vacío en lugar de los emails esperados.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `buggy-code.js` | Código con el bug a corregir |
| `solution.js` | Solución correcta con comentario `// CORREGIDO:` |
| `test.js` | Pruebas Jest (importa `buggy-code.js` por defecto) |

## Cómo Verificar

```bash
# Ver los errores
npm test exercises/30-email-extractor

# Verificar tu solución
# Cambia el import en test.js a solution.js y ejecuta de nuevo
npm test exercises/30-email-extractor
```

## Nivel de Dificultad

**Intermedio** — Requiere conocer los flags de las expresiones regulares y entender por qué un regex sin el flag correcto falla silenciosamente devolviendo un arreglo vacío.
