import { useState } from 'react'
import Level from './components/Level'


export default function App() {

  const [SiteState, setSiteState] = useState("Level")

  function currentSiteState(State){
    switch(State){
        case "Level":
            return( <Level setSiteState={setSiteState}/> )
        case "MainMenu":
            return( <MainMenu setSiteState={setSiteState}/> )
        case "LevelRecap":
            return( <LevelRecap setSiteState={setSiteState}/> )
        case "LevelAuswahl":
            return( <LevelAuswahl setSiteState={setSiteState}/> )
    }
  }


  return (
    <div>
        {currentSiteState(SiteState)}
    </div>
  )
}
