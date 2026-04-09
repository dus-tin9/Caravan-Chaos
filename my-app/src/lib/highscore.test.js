import { beforeEach, describe, expect, it } from 'vitest'

import {
  calcTotal,
  getAllHighscores,
  getHighscore,
  restoreHighscoreState,
  saveHighscoreIfBetter,
} from './highscore'

const RESERVED_KEYS = new Set([
  'getItem',
  'setItem',
  'removeItem',
  'clear',
  'key',
  'length',
])

function createLocalStorageMock() {
  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(this, key) ? this[key] : null
    },
    setItem(key, value) {
      this[key] = String(value)
    },
    removeItem(key) {
      delete this[key]
    },
    clear() {
      for (const key of Object.keys(this)) {
        if (!RESERVED_KEYS.has(key)) delete this[key]
      }
    },
    key(index) {
      const keys = Object.keys(this).filter(key => !RESERVED_KEYS.has(key))
      return keys[index] ?? null
    },
    get length() {
      return Object.keys(this).filter(key => !RESERVED_KEYS.has(key)).length
    },
  }
}

beforeEach(() => {
  globalThis.localStorage = createLocalStorageMock()
})

describe('highscore utils', () => {
  it('calcTotal sums score values', () => {
    expect(calcTotal([{ score: 10 }, { score: 15 }, { score: 5 }])).toBe(30)
  })

  it('saveHighscoreIfBetter stores a new entry for empty level', () => {
    const scores = [{ id: 1, name: 'Max', score: 80 }]
    const result = saveHighscoreIfBetter(1, scores, [{ id: 1 }], [{ id: 'camel-1' }])

    expect(result).toEqual({ isNew: true, total: 80 })
    expect(getHighscore(1)).toMatchObject({
      levelId: 1,
      total: 80,
      max: 100,
      scores,
    })
  })

  it('saveHighscoreIfBetter keeps existing entry when score is not better', () => {
    saveHighscoreIfBetter(1, [{ id: 1, name: 'Max', score: 90 }], [{ id: 1 }], [{ id: 'camel-1' }])
    const second = saveHighscoreIfBetter(1, [{ id: 1, name: 'Max', score: 70 }], [{ id: 1 }], [{ id: 'camel-1' }])

    expect(second).toEqual({ isNew: false, total: 70 })
    expect(getHighscore(1)).toMatchObject({ total: 90 })
  })

  it('getAllHighscores returns entries sorted by level id', () => {
    saveHighscoreIfBetter(3, [{ id: 1, name: 'A', score: 50 }], [], [])
    saveHighscoreIfBetter(1, [{ id: 2, name: 'B', score: 60 }], [], [])
    saveHighscoreIfBetter(2, [{ id: 3, name: 'C', score: 40 }], [], [])

    expect(getAllHighscores().map(h => h.levelId)).toEqual([1, 2, 3])
  })

  it('stores highscores per level without collisions', () => {
    saveHighscoreIfBetter(1, [{ id: 1, name: 'L1', score: 20 }], [{ id: 1 }], [{ id: 'c1' }])
    saveHighscoreIfBetter(2, [{ id: 2, name: 'L2', score: 95 }], [{ id: 2 }], [{ id: 'c2' }])

    expect(getHighscore(1)).toMatchObject({ levelId: 1, total: 20 })
    expect(getHighscore(2)).toMatchObject({ levelId: 2, total: 95 })
  })

  it('restoreHighscoreState writes level scoped people/camels keys and lastPlayedLevel', () => {
    const highscore = {
      levelId: 2,
      people: [{ id: 1, seated: true }],
      camels: [{ id: 'camel-2', grid: [] }],
    }

    restoreHighscoreState(highscore)

    expect(localStorage.getItem('people_2')).toBe(JSON.stringify(highscore.people))
    expect(localStorage.getItem('camels_2')).toBe(JSON.stringify(highscore.camels))
    expect(localStorage.getItem('lastPlayedLevel')).toBe('2')
  })
})
