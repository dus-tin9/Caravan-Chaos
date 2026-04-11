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
  Bestie:    scoreBestie,
  Hater:     scoreHater,
  Stammkunde:   scoreRegular,
}

export function buildContext(camels) {
  const placements = new Map()
  const grids = new Map()
  for (const camel of camels) {
    grids.set(camel.id, camel.grid)
    for (let rowIndex = 0; rowIndex < camel.grid.length; rowIndex++) {
      for (let colIndex = 0; colIndex < camel.grid[rowIndex].length; colIndex++) {
        const occupant = camel.grid[rowIndex][colIndex].occupant
        if (occupant) {
          placements.set(occupant.name, { camelId: camel.id, rowIndex, colIndex })
        }
      }
    }
  }
  return { placements, grids }
}

function scorePerson(person, context) {
  if (person.needs.length === 0) return 100
  const share = 100 / person.needs.length
  return person.needs.reduce((total, need) => {
    const scorer = scorers[need.name]
    if (!scorer) return total
    const placement = context.placements.get(person.name)
    return total + scorer(need, placement, context) * share
  }, 0)
}

export function scoreLevel(people, camels) {
  const context = buildContext(camels)
  return people.map(person => ({
    id: person.id,
    name: person.name,
    score: Math.round(scorePerson(person, context)),
  }))
}
