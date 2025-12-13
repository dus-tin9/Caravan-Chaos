import { createRoot } from 'react-dom/client'

function Car () {
  const brand = "Ford";
  const model = "Mustang";

  return (
    <>
      <h2>My Car</h2>
      <p>It's a {brand} {model}.</p>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <Car />
)
