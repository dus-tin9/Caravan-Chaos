// highscore_${levelId} → { total, max, scores, people, camels, date }

export function calcTotal(scores) {
  return scores.reduce((sum, s) => sum + s.score, 0)
}

export function getHighscore(levelId) {
  const raw = localStorage.getItem(`highscore_${levelId}`)
  return raw ? JSON.parse(raw) : null
}

export function getAllHighscores() {
  return Object.keys(localStorage)
    .filter(k => k.startsWith('highscore_'))
    .map(k => JSON.parse(localStorage.getItem(k)))
    .sort((a, b) => a.levelId - b.levelId)
}

/** Saves if total is better than stored. Returns { isNew, total }. */
export function saveHighscoreIfBetter(levelId, scores, people, camels) {
  const total = calcTotal(scores)
  const existing = getHighscore(levelId)

  if (existing && existing.total >= total) {
    return { isNew: false, total }
  }

  localStorage.setItem(`highscore_${levelId}`, JSON.stringify({
    levelId,
    total,
    max: scores.length * 100,
    scores,
    people,
    camels,
    date: new Date().toISOString(),
  }))
  return { isNew: true, total }
}

/** Loads highscore gamestate into the level's localStorage keys and sets lastPlayedLevel. */
export function restoreHighscoreState(highscore) {
  const { levelId, people, camels } = highscore
  localStorage.setItem(`people_${levelId}`, JSON.stringify(people))
  localStorage.setItem(`camels_${levelId}`, JSON.stringify(camels))
  localStorage.setItem('lastPlayedLevel', levelId)
}
