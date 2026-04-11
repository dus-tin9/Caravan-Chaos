import scoreSchläfrig    from './needScoring/schläfrig.js'
import scoreEinsam       from './needScoring/einsam.js'
import scoreGesellschaft from './needScoring/gesellig.js'
import scoreBestie       from './needScoring/bestie.js'
import scoreHater        from './needScoring/hater.js'
import scoreRegular      from './needScoring/regular.js'

const scorers = {
  schläfrig: scoreSchläfrig,
  einsam:    scoreEinsam,
  gesellig:  scoreGesellschaft,
  bestie:    scoreBestie,
  hater:     scoreHater,
  regular:   scoreRegular,
}

export function buildContext(camels) {
  const placements = new Map()
  const grids = new Map()

  // Für alle Kamele
  for (const camel of camels) {
    // Füge zu grids hinzu
    grids.set(camel.id, camel.grid)

    //Für jeden Platz
    for (let rowIndex = 0; rowIndex < camel.grid.length; rowIndex++) {
      for (let colIndex = 0; colIndex < camel.grid[rowIndex].length; colIndex++) {

        // Person auf dem Platz
        const occupant = camel.grid[rowIndex][colIndex].occupant

        // Wenn Occupant existiert füge zu Placement Liste hinzu
        if (occupant) {
          placements.set(occupant.name, { camelId: camel.id, rowIndex, colIndex })
        }
      }
    }
  }
  return { placements, grids }
}

function scorePerson(person, context) {
  // Ohne Needs Person immer zufrieden
  if (person.needs.length === 0) return 100

  // Punkte Anteil pro Need berechnen
  const share = 100 / person.needs.length

  // Needs auf ihren Score abbilden und alle NeedScores summieren
  return person.needs.reduce((total, need) => {

    const scorer = scorers[need.name]
    if (!scorer) return total

    const placement = context.placements.get(person.name)
    return total + scorer(need, placement, context) * share
  }, 0)
}

export function scoreLevel(people, camels) {
  // Context aus Liste der Personen mit ihrer Position und Liste der Kamele mit ihrem Layout
  const context = buildContext(camels)

  // Personen und ihren berechneten Score zurückgeben
  return people.map(person => ({
    id: person.id,
    name: person.name,
    score: Math.round(scorePerson(person, context)),
  }))
}
