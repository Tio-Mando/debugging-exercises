/**
 * Log Parser
 *
 * Módulo para parsear líneas de log con formato estándar:
 * [LEVEL] TIMESTAMP - message
 */

const LOG_PATTERN = /^\[(\w+)\]\s(\S+)\s-\s(.+)$/;

/**
 * Parsea una línea de log y extrae sus componentes.
 * @param {string} line
 * @returns {{ level: string, timestamp: string, message: string } | null}
 */
function parseLogLine(line) {
  const match = line.match(LOG_PATTERN);
  console.log(line, 'line')
  console.log(match, 'locura')
  if (!match) return null;

  const [, level, timestamp, message ] = match;
  return { level, timestamp, message};
}

/**
 * Filtra líneas de log por nivel y devuelve los objetos parseados.
 * @param {string[]} lines
 * @param {string} level
 * @returns {Array<{ level: string, timestamp: string, message: string }>}
 */
function filterByLevel(lines, level) {
  return lines
    .map(parseLogLine)
    .filter(log => log !== null && log.level === level.toUpperCase());
}

/**
 * Cuenta cuántas líneas hay por cada nivel de log.
 * @param {string[]} lines
 * @returns {Record<string, number>}
 */
function countByLevel(lines) {
  return lines.reduce((acc, line) => {
    const log = parseLogLine(line);
    if (!log) return acc;
    acc[log.level] = (acc[log.level] || 0) + 1;
    return acc;
  }, {});
}


const SAMPLE_LOGS = [
  '[ERROR] 2024-01-15T10:30:00 - Connection timeout',
  '[INFO] 2024-01-15T10:31:00 - Server started',
  '[WARN] 2024-01-15T10:32:00 - High memory usage',
  '[ERROR] 2024-01-15T10:33:00 - Database unreachable',
  '[INFO] 2024-01-15T10:34:00 - Request processed',
];

// console.log(countByLevel(SAMPLE_LOGS))
console.log(parseLogLine('[ERROR] 2024-01-15T10:30:00 - Connection timeout'))
module.exports = { parseLogLine, filterByLevel, countByLevel };
