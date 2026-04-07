export default function scoreHater(need, placement, context) {
  if (!placement) return 0
  const hatedPlacement = context.placements.get(need.hated)
  if (!hatedPlacement) return 1
  return hatedPlacement.camelId !== placement.camelId ? 1 : 0
}
