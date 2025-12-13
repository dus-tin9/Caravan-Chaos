import { createRoot } from 'react-dom/client'

const myElement = (
  <ul>
    <li>Apple</li>
    <li>Bananas</li>
    <li>Cherries</li>
  </ul>
);

createRoot(document.getElementById('root')!).render(
  myElement
)
