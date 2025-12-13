import { createRoot } from 'react-dom/client'



function Car (props) {

  return (
    <h2>Hi, I am a {props.color} Car</h2>
  )
}


createRoot(document.getElementById('root')!).render(
  <Car color="Red"/>
)
