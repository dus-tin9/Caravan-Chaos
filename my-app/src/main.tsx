import { createRoot } from 'react-dom/client'



function Car () {

  return (
    <h2>Hi, I am a Car</h2>
  )
}

function Garage () {

  return(
    <>
      <h1>Who lives in a Garage?</h1>
      <Car />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <Garage />
)
