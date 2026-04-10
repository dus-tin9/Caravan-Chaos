export default function scoreSchläfrig(need, placement) {
  if (!placement) return 0
  return placement.rowIndex === 0 ? 1 : 0
}
