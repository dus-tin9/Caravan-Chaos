import { createRoot } from 'react-dom/client'

function Car () {
  return (
    <>
      <h2>My Car</h2>
      <p>It's a Ford Mustang.</p>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <Car />
)
