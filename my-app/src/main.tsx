import { createRoot } from 'react-dom/client'

const myElement = (
  <>
    <p>I am a paragraph</p>
    <p>I am a paragraph, too</p>
  </>
);

createRoot(document.getElementById('root')!).render(
  myElement
)
