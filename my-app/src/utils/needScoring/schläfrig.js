export default function scoreSchläfrig(need, placement) {
  if (!placement) return 0
  return placement.colIndex === 0 ? 1 : 0
}
