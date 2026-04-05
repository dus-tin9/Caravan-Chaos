import { useLocation, useNavigate } from 'react-router-dom'

import { routes } from '@/lib/routes'

export default function LevelRecap() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const scores = state?.scores ?? []

  const average = scores.length > 0
    ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length)
    : 0

  return (
    <div className="LevelRecap">
      <h1>Level Complete!</h1>
      <ul>
        {scores.map(s => (
          <li key={s.id}>{s.name} — {s.score} / 100</li>
        ))}
      </ul>
      <p><strong>Average: {average} / 100</strong></p>
      <button onClick={() => navigate(routes.main)}>
        Main Menu
      </button>
    </div>
  )
}
