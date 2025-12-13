import { createRoot } from 'react-dom/client'



function Car () {
  const myStyles = {
    color: "red",
    fontSize: "20px",
    backgroundColor: "lightYellow"
  };

  return (
    <>
      <h1 style={myStyles}>My Car</h1>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <Car />
)
