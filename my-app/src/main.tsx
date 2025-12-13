import { createRoot } from 'react-dom/client'



function Car (props) {

  return (
    <h2>I am a {props.brand}</h2>
  )
}

function Garage () {

  return(
    <>
      <h1>Who lives in a Garage?</h1>
      <Car brand="Ford"/>
      <Car brand="BMW"/>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <Garage />
)
