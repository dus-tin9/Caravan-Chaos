const needToImage = {
  schläfrig: 'sleeper',
  einsam:    'loner',
  gesellig:  'gesellig',
  bestie:    'bestie',
  hater:     'hater',
  regular:   'regular',
}

export function getPersonImageUrl(person) {
  const firstNeed = person?.needs?.[0]?.name
  const imageName = needToImage[firstNeed] ?? 'standard'
  return `/src/assets/people/${imageName}.svg`
}
