**Tipo**: Clase | **Dificultad**: Intermedio

## Historia de Usuario

Como usuario de una aplicación de gestión de contactos, quiero poder agregar, eliminar, buscar y organizar mis contactos para mantener mi agenda personal ordenada y accesible.

## Criterios de Aceptación

- Se puede agregar un contacto con nombre, teléfono, correo electrónico y etiquetas opcionales.
- Se puede eliminar un contacto por nombre exacto; retorna `true` si se eliminó, `false` si no existía.
- Se puede buscar contactos por nombre (búsqueda parcial, sin distinción de mayúsculas).
- Se puede buscar un contacto por número de teléfono exacto; retorna el objeto del contacto o `null`.
- Los contactos se pueden agrupar por la primera letra de su nombre.
- Se puede filtrar contactos por etiqueta.
- Se puede obtener la lista de contactos ordenada alfabéticamente (sin mutar la lista interna).
- Se pueden obtener estadísticas: total de contactos, número de grupos, etiquetas únicas, letra más popular y promedio de etiquetas por contacto.
- Se puede verificar si un contacto existe por nombre exacto.
- Se pueden obtener todas las etiquetas únicas de la agenda.
- Se puede actualizar parcialmente un contacto existente; retorna `true` si se actualizó, `false` si no existía.

## Problema Reportado

El equipo de QA reportó que la función de búsqueda por teléfono no devuelve el resultado esperado. En algunos tests automatizados, los campos del contacto obtenido (`email`, `tags`) no son accesibles como se esperaría de un objeto único, lo que provoca que las aserciones fallen con valores `undefined`.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `buggy-code.js` | Implementación con el error a corregir |
| `solution.js` | Implementación correcta |
| `test.js` | Suite de pruebas Jest |

## Cómo Verificar

```bash
# Ejecutar pruebas con el código con errores (deben fallar)
npx jest exercises/62-contact-book --no-coverage

# Cambiar el require en test.js a './solution' y volver a ejecutar
npx jest exercises/62-contact-book --no-coverage
```

## Nivel de Dificultad

**Intermedio** — El error radica en el uso de un método de arreglo incorrecto dentro de un método de búsqueda. Ambas opciones parecen igualmente válidas a primera vista, pero producen tipos de retorno distintos que afectan a todas las operaciones que dependen del resultado de esa búsqueda.
