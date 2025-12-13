import { createRoot } from 'react-dom/client'



function Car () {
  const myfunc = () => {
    alert("Hello World");
  };

  return (
    <>
      <button onClick={myfunc} disabled>Click Me</button>
      <button onClick={myfunc} disabled = {true}>Click Me</button>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <Car />
)
