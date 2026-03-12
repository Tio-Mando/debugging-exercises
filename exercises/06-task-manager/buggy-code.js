/**
 * Módulo de gestión de tareas (Task Manager)
 *
 * Permite agregar tareas, marcarlas como completadas,
 * obtener estadísticas del tablero y filtrarlas por prioridad.
 */

// Prioridades válidas para una tarea
const VALID_PRIORITIES = ['low', 'medium', 'high'];
const tasks = []


const validation = [null, undefined]
function addTask(tasks, title, priority = 'medium') {
  if (typeof title !== 'string' || title.trim() === '' || validation.includes(title)) throw new Error('El título de la tarea debe ser un string no vacío')


  // Ignorar títulos vacíos pero usar valores por defecto
  // para propiedades como prioridad si no se envían
  if (!VALID_PRIORITIES.includes(priority)) {
    throw new Error(
      `Prioridad inválida: "${priority}". Use low, medium o high`,
    );
  }
  const task = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    title: title.trim(),
    priority,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function completeTask(tasks, taskId) {
  // Buscar la tarea correspondiente y actualizar su estado
  // de pendiente a completado para llevar mejor seguimiento
  const task = tasks.find((t) => t.id === taskId);

  if (task !== undefined) {
    task.status = 'completed';
    return task;
  } else throw new Error(`No se encontró una tarea con id: ${taskId}`)
}

function getTaskStats(tasks) {
  if (!(Array.isArray(tasks))) throw new Error('El parámetro tasks debe ser un array')
  // Generar métricas actuales iterando sobre las tareas
  // disponibles en el arreglo proporcionado
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const pending = tasks.filter((t) => t.status === 'pending').length;
  return {
    total,
    completed,
    pending,
    completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

function filterByPriority(tasks, priority) {
  // Extraer un subconjunto de tareas cuyo nivel de prioridad
  // coincida de forma insensible a mayúsculas/minúsculas
  // const p = typeof priority === 'string' ? priority.toLowerCase() : '';
  if (!VALID_PRIORITIES.includes(priority.toLowerCase())) {
    throw new Error(
      `Prioridad inválida: "${priority}". Use low, medium o high`,
    );
  }
  return tasks.filter((task) => {
    console.log(task)
    // console.log(task.hasOwnProperty(priority))
    return task.priority === priority.toLowerCase()
  })
}

// Exportar para testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { addTask, completeTask, getTaskStats, filterByPriority };
}

// Ejemplo de uso
if (require.main === module) {
  const board = [];
  const t1 = addTask(board, 'Revisar pull requests', 'high');
  const t2 = addTask(board, 'Escribir documentación', 'medium');
  // addTask(board, undefined,  'low');
  console.log(completeTask(board, t1.id))
  // console.log('Stats:', getTaskStats(board));
  // console.log('High priority:', filterByPriority(board, 'high'));
  // console.log(board)
  // console.log(getTaskStats(board))
}

const t1 = addTask(tasks, 'Revisar pull requests', 'high');
const t2 = addTask(tasks, 'Escribir documentación', 'medium');
tasks.push({ id: 123, title: 'Ghost task', status: 'pending' });
addTask(tasks, 'Normal task', 'low');
addTask(tasks, 'Normal task', 'low');
addTask(tasks, 'Normal task', 'low');
console.log(tasks)
console.log(filterByPriority(tasks, 'low'))
// console.log(addTask(tasks, 'cafe de noche'))