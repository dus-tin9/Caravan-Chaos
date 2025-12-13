import { createRoot } from 'react-dom/client'
import Car from './Vehicle'




function Garage () {

  return(
    <>
      <h1>Who lives in a Garage?</h1>
      <Car />
      <Car />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <Garage />
)
