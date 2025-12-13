import { createRoot } from 'react-dom/client'



function Fruit () {
  const x = 5;
  return(
    <h1>{(x) < 10 ? "Apple" : "Banana"}</h1>
  )
}
createRoot(document.getElementById('root')!).render(
  <Fruit />
)
