const {
  recordMatch,
  getStandings,
  getTopTeams,
  getTeamHistory,
  getHeadToHead,
  getTopScorers,
  getRelegationZone,
} = require('./buggy-code');
// Para verificar la solución, cambia require('./buggy-code') a require('./solution')

// ---------------------------------------------------------------------------
// Datos de prueba compartidos
// ---------------------------------------------------------------------------

function buildLeague() {
  const league = [];

  // Jornada 1
  recordMatch(league, 'Real Madrid',   'Barcelona',    3, 1); // Madrid gana
  recordMatch(league, 'Atletico',      'Sevilla',      1, 1); // empate
  recordMatch(league, 'Valencia',      'Villarreal',   0, 2); // Villarreal gana
  recordMatch(league, 'Athletic',      'Betis',        2, 0); // Athletic gana

  // Jornada 2
  recordMatch(league, 'Barcelona',     'Atletico',     2, 0); // Barcelona gana
  recordMatch(league, 'Sevilla',       'Real Madrid',  1, 2); // Madrid gana
  recordMatch(league, 'Villarreal',    'Athletic',     1, 1); // empate
  recordMatch(league, 'Betis',         'Valencia',     3, 1); // Betis gana

  // Jornada 3
  recordMatch(league, 'Real Madrid',   'Villarreal',   4, 0); // Madrid gana
  recordMatch(league, 'Athletic',      'Barcelona',    0, 1); // Barcelona gana
  recordMatch(league, 'Atletico',      'Betis',        2, 2); // empate
  recordMatch(league, 'Valencia',      'Sevilla',      1, 3); // Sevilla gana

  return league;
}

// ---------------------------------------------------------------------------
// recordMatch
// ---------------------------------------------------------------------------

describe('recordMatch', () => {
  test('debe agregar exactamente dos entradas al historial (una por equipo)', () => {
    const league = [];
    recordMatch(league, 'Real Madrid', 'Barcelona', 2, 1);
    expect(league).toHaveLength(2);
  });

  test('la entrada del equipo local debe registrar correctamente la victoria', () => {
    const league = [];
    recordMatch(league, 'Real Madrid', 'Barcelona', 3, 0);
    const home = league.find((e) => e.team === 'Real Madrid');
    expect(home.goalsFor).toBe(3);
    expect(home.goalsAgainst).toBe(0);
    expect(home.result).toBe('win');
  });

  test('la entrada del equipo visitante debe registrar correctamente la derrota', () => {
    const league = [];
    recordMatch(league, 'Real Madrid', 'Barcelona', 3, 0);
    const away = league.find((e) => e.team === 'Barcelona');
    expect(away.goalsFor).toBe(0);
    expect(away.goalsAgainst).toBe(3);
    expect(away.result).toBe('loss');
  });

  test('debe registrar un empate para ambos equipos', () => {
    const league = [];
    recordMatch(league, 'Atletico', 'Sevilla', 1, 1);
    const atletico = league.find((e) => e.team === 'Atletico');
    const sevilla   = league.find((e) => e.team === 'Sevilla');
    expect(atletico.result).toBe('draw');
    expect(sevilla.result).toBe('draw');
  });

  test('debe registrar el oponente correcto en cada entrada', () => {
    const league = [];
    recordMatch(league, 'Valencia', 'Villarreal', 0, 1);
    const valencia   = league.find((e) => e.team === 'Valencia');
    const villarreal = league.find((e) => e.team === 'Villarreal');
    expect(valencia.opponent).toBe('Villarreal');
    expect(villarreal.opponent).toBe('Valencia');
  });

  test('debe acumular múltiples partidos en el historial', () => {
    const league = [];
    recordMatch(league, 'Real Madrid', 'Barcelona', 1, 0);
    recordMatch(league, 'Atletico',    'Sevilla',   2, 2);
    recordMatch(league, 'Valencia',    'Betis',     1, 2);
    expect(league).toHaveLength(6);
  });
});

// ---------------------------------------------------------------------------
// getStandings
// ---------------------------------------------------------------------------

describe('getStandings', () => {
  let league;

  beforeEach(() => {
    league = buildLeague();
  });

  test('debe retornar un array con exactamente los equipos que han jugado', () => {
    const standings = getStandings(league);
    expect(standings).toHaveLength(8);
  });

  test('el equipo con más puntos debe quedar primero', () => {
    const standings = getStandings(league);
    // Real Madrid: 3 victorias = 9 puntos
    expect(standings[0].team).toBe('Real Madrid');
  });

  test('Real Madrid debe tener 9 puntos tras tres victorias', () => {
    const standings = getStandings(league);
    const madrid = standings.find((s) => s.team === 'Real Madrid');
    expect(madrid.points).toBe(9);
  });

  test('debe calcular correctamente victorias, empates y derrotas', () => {
    const standings = getStandings(league);
    const madrid = standings.find((s) => s.team === 'Real Madrid');
    expect(madrid.won).toBe(3);
    expect(madrid.drawn).toBe(0);
    expect(madrid.lost).toBe(0);
    expect(madrid.played).toBe(3);
  });

  test('debe calcular la diferencia de goles correctamente', () => {
    const standings = getStandings(league);
    const madrid = standings.find((s) => s.team === 'Real Madrid');
    // GF: 3+2+4=9, GA: 1+1+0=2, GD: +7
    expect(madrid.goalsFor).toBe(9);
    expect(madrid.goalsAgainst).toBe(2);
    expect(madrid.goalDiff).toBe(7);
  });

  test('debe ordenar correctamente por diferencia de goles cuando los puntos son iguales', () => {
    const extraLeague = [];
    // Equipo A y B empatan en puntos (3c/u), A tiene mejor GD
    recordMatch(extraLeague, 'Equipo A', 'Equipo C', 3, 0); // A gana: GD +3
    recordMatch(extraLeague, 'Equipo B', 'Equipo D', 1, 0); // B gana: GD +1
    const standings = getStandings(extraLeague);
    expect(standings[0].team).toBe('Equipo A');
    expect(standings[1].team).toBe('Equipo B');
  });

  test('debe ordenar por goles anotados cuando puntos y GD son iguales', () => {
    const extraLeague = [];
    // Ambos equipos ganan 1-0, mismos puntos y mismo GD (+1), pero A marcó en un partido
    // Creamos equipos con puntos y GD iguales pero distinto goalsFor
    recordMatch(extraLeague, 'X', 'Y', 1, 0); // X: GF=1, GD=+1, pts=3
    recordMatch(extraLeague, 'Z', 'W', 2, 1); // Z: GF=2, GD=+1, pts=3
    const standings = getStandings(extraLeague);
    const posZ = standings.findIndex((s) => s.team === 'Z');
    const posX = standings.findIndex((s) => s.team === 'X');
    expect(posZ).toBeLessThan(posX);
  });

  test('debe asignar 1 punto por empate', () => {
    const standings = getStandings(league);
    const atletico = standings.find((s) => s.team === 'Atletico');
    // Atletico: empate, derrota, empate → 1+0+1 = 2 puntos
    expect(atletico.drawn).toBe(2);
    expect(atletico.points).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// getTopTeams
// ---------------------------------------------------------------------------

describe('getTopTeams', () => {
  let league;

  beforeEach(() => {
    league = buildLeague();
  });

  test('debe retornar los N primeros equipos de la clasificación', () => {
    const top3 = getTopTeams(league, 3);
    expect(top3).toHaveLength(3);
  });

  test('el primer equipo de getTopTeams debe coincidir con el líder de getStandings', () => {
    const top = getTopTeams(league, 1);
    const standings = getStandings(league);
    expect(top[0].team).toBe(standings[0].team);
  });

  test('debe retornar todos los equipos si N es mayor que el total', () => {
    const top = getTopTeams(league, 100);
    const standings = getStandings(league);
    expect(top).toHaveLength(standings.length);
  });

  test('debe retornar arreglo vacío si N es 0', () => {
    const top = getTopTeams(league, 0);
    expect(top).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// getTeamHistory
// ---------------------------------------------------------------------------

describe('getTeamHistory', () => {
  let league;

  beforeEach(() => {
    league = buildLeague();
  });

  test('debe retornar todos los partidos jugados por el equipo', () => {
    const history = getTeamHistory(league, 'Real Madrid');
    // Real Madrid jugó 3 partidos
    expect(history).toHaveLength(3);
  });

  test('cada entrada del historial debe corresponder al equipo solicitado', () => {
    const history = getTeamHistory(league, 'Barcelona');
    const allMatch = history.every((e) => e.team === 'Barcelona');
    expect(allMatch).toBe(true);
  });

  test('debe retornar arreglo vacío para un equipo que no ha jugado', () => {
    const history = getTeamHistory(league, 'Getafe');
    expect(history).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// getHeadToHead
// ---------------------------------------------------------------------------

describe('getHeadToHead', () => {
  let league;

  beforeEach(() => {
    league = buildLeague();
  });

  test('debe retornar exactamente 2 entradas para un enfrentamiento directo', () => {
    const h2h = getHeadToHead(league, 'Real Madrid', 'Barcelona');
    expect(h2h).toHaveLength(2);
  });

  test('debe incluir la entrada de cada equipo en el enfrentamiento', () => {
    const h2h = getHeadToHead(league, 'Real Madrid', 'Barcelona');
    const teams = h2h.map((e) => e.team);
    expect(teams).toContain('Real Madrid');
    expect(teams).toContain('Barcelona');
  });

  test('debe retornar arreglo vacío si los equipos no se han enfrentado', () => {
    const h2h = getHeadToHead(league, 'Real Madrid', 'Betis');
    expect(h2h).toHaveLength(0);
  });

  test('el resultado del enfrentamiento debe ser correcto', () => {
    const h2h = getHeadToHead(league, 'Real Madrid', 'Barcelona');
    const madridEntry = h2h.find((e) => e.team === 'Real Madrid');
    expect(madridEntry.result).toBe('win');
    expect(madridEntry.goalsFor).toBe(3);
    expect(madridEntry.goalsAgainst).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// getTopScorers
// ---------------------------------------------------------------------------

describe('getTopScorers', () => {
  let league;

  beforeEach(() => {
    league = buildLeague();
  });

  test('debe retornar un array con los equipos y sus goles anotados totales', () => {
    const scorers = getTopScorers(league, 3);
    expect(scorers).toHaveLength(3);
    scorers.forEach((s) => {
      expect(s).toHaveProperty('team');
      expect(s).toHaveProperty('goalsFor');
    });
  });

  test('el equipo con más goles debe aparecer primero', () => {
    const scorers = getTopScorers(league, 8);
    // Real Madrid marcó 9 goles (3+2+4)
    expect(scorers[0].team).toBe('Real Madrid');
    expect(scorers[0].goalsFor).toBe(9);
  });

  test('debe retornar los top N equipos goleadores', () => {
    const scorers = getTopScorers(league, 2);
    expect(scorers).toHaveLength(2);
  });

  test('los goles deben acumularse correctamente de todos los partidos', () => {
    const scorers = getTopScorers(league, 8);
    const sevilla = scorers.find((s) => s.team === 'Sevilla');
    // Sevilla marcó: 1 (vs Atletico) + 1 (vs Madrid - perdió 2-1) + 3 (vs Valencia) = 5
    expect(sevilla.goalsFor).toBe(5);
  });
});

// ---------------------------------------------------------------------------
// getRelegationZone
// ---------------------------------------------------------------------------

describe('getRelegationZone', () => {
  let league;

  beforeEach(() => {
    league = buildLeague();
  });

  test('debe retornar los últimos N equipos de la clasificación', () => {
    const relegated = getRelegationZone(league, 3);
    expect(relegated).toHaveLength(3);
  });

  test('los equipos en zona de descenso deben tener menos puntos que los demás', () => {
    const standings = getStandings(league);
    const relegated = getRelegationZone(league, 3);
    const relegatedTeams = relegated.map((r) => r.team);

    // Los últimos 3 de la clasificación deben coincidir con getRelegationZone
    const lastThree = standings.slice(-3).map((s) => s.team);
    lastThree.forEach((team) => {
      expect(relegatedTeams).toContain(team);
    });
  });

  test('debe retornar el único equipo con menos puntos cuando N=1', () => {
    const standings = getStandings(league);
    const relegated = getRelegationZone(league, 1);
    expect(relegated[0].team).toBe(standings[standings.length - 1].team);
  });

  test('debe retornar arreglo vacío cuando N es 0', () => {
    const relegated = getRelegationZone(league, 0);
    expect(relegated).toHaveLength(0);
  });
});
