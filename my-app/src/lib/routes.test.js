import { describe, expect, it } from 'vitest'

import { DEFAULT_LEVEL_ID, routes } from './routes'

describe('routes contracts', () => {
  it('keeps static route paths stable', () => {
    expect(routes.main).toBe('/main')
    expect(routes.settings).toBe('/settings')
    expect(routes.highscore).toBe('/highscore')
    expect(routes.levelSelect).toBe('/levels')
    expect(routes.levelRoot).toBe('/level')
  })

  it('builds level route from level id', () => {
    expect(routes.levelById(1)).toBe('/level/1')
    expect(routes.levelById('2')).toBe('/level/2')
  })

  it('builds level recap route from level id', () => {
    expect(routes.levelRecap(1)).toBe('/level/1/recap')
    expect(routes.levelRecap('2')).toBe('/level/2/recap')
  })

  it('uses level 1 as fallback default route id', () => {
    expect(DEFAULT_LEVEL_ID).toBe(1)
  })
})
