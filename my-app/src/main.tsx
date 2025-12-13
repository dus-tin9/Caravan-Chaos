import { createRoot } from 'react-dom/client'

const myElement = <h1 className='myclass'>Hello World</h1>;

createRoot(document.getElementById('root')!).render(
  myElement
)
