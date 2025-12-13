import { createRoot } from 'react-dom/client'

function Car () {
  const brand = "Ford";
  const model = "Mustang";
  const hp = 218 * 1.38;

  return (
    <>
      <h2>My Car</h2>
      <p>It's a {brand} {model}.</p>
      <p>It has {218 * 1.38} Horspower</p>
      <p>It has {hp} Horspower</p>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <Car />
)
