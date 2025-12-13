import { createRoot } from 'react-dom/client'



function Car () {
  return (
    <h1 className='myClass'>Hello World!</h1>
  );
}

createRoot(document.getElementById('root')!).render(
  <Car />
)
