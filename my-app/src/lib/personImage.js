const needToImage = {
  schläfrig: 'sleeper',
  einsam:    'loner',
  gesellig:  'gesellig',
  Bestie:    'bestie',
  Hater:     'hater',
  Stammkunde:   'regular',
}

export function getPersonImageUrl(person) {
  const firstNeed = person?.needs?.[0]?.name
  const imageName = needToImage[firstNeed] ?? 'standard'
  return `/src/assets/people/${imageName}.svg`
}
