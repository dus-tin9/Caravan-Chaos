import { useState } from 'react'
import Level from './components/Level'
import LevelRecap from './components/LevelRecap'

export default function App() {
  const [SiteState, setSiteState] = useState("Level")
  const [scores, setScores] = useState([])

  function currentSiteState(State) {
    switch (State) {
      case "Level":
        return <Level setSiteState={setSiteState} setScores={setScores} />
      case "MainMenu":
        return <p>Main Menu (coming soon)</p>
      case "LevelRecap":
        return <LevelRecap setSiteState={setSiteState} scores={scores} />
      case "LevelAuswahl":
        return <p>Level Auswahl (coming soon)</p>
    }
  }

  return (
    <div>
      {currentSiteState(SiteState)}
    </div>
  )
}
