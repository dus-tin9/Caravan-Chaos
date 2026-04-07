import { getPersonImageUrl } from '@/lib/personImage'

function formatNeed(need) {
  switch (need.name) {
    case 'schläfrig': return 'Schläfrig – muss in der obersten Reihe sitzen'
    case 'einsam':    return 'Einsam – kein Nachbar erlaubt'
    case 'gesellig':  return `Gesellig – mindestens ${need.anzahl} Nachbar(n)`
    case 'bestie':    return `Bestie von ${need.bestie}`
    case 'hater':     return `Hasst ${need.hated} – anderes Kamel`
    case 'regular':   return `Fester Platz – Kamel ${need.camel}, Reihe ${need.row}, Spalte ${need.column}`
    default:          return need.name
  }
}

export default function Infofeld({ selectedPerson }) {
  if (!selectedPerson) {
    return (
      <div className="Infofeld">
        <p>Keine Person ausgewählt</p>
      </div>
    )
  }

  const imageUrl = getPersonImageUrl(selectedPerson)

  return (
    <div className="Infofeld">
      <img
        src={imageUrl}
        alt={selectedPerson.name}
        style={{ width: '100%', display: 'block' }}
      />
      <h3>{selectedPerson.name}</h3>
      {selectedPerson.needs.length > 0 ? (
        <ul>
          {selectedPerson.needs.map((need, index) => (
            <li key={index}>{formatNeed(need)}</li>
          ))}
        </ul>
      ) : (
        <p>Keine Bedürfnisse</p>
      )}
    </div>
  )
}
