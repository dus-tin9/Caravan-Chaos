import { createRoot } from 'react-dom/client'



function Car () {

  return (
    <h2>Hi, I am a Car</h2>
  )
}


createRoot(document.getElementById('root')!).render(
  <Car />
)
