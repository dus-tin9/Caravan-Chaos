export default function scoreRegular(need, placement) {
  if (!placement) return 0
  return (
    placement.camelId === need.camel &&
    placement.rowIndex === need.row - 1 &&
    placement.colIndex === need.column - 1
  ) ? 1 : 0
}
