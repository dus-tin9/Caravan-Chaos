import { createRoot } from 'react-dom/client'



function Car () {
  const myObj = {
    name: "Fiat",
    model: "500",
    color: "white"
  }
  return (
    <p>My Car is a {myObj.color} {myObj.name} {myObj.model}</p>
  );
}

createRoot(document.getElementById('root')!).render(
  <Car />
)
