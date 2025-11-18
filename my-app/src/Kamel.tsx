import SitzReihe from "./SitzReihe.tsx";
function Kamel() {

  return (
    <div className="Kamel">
      <table>
        <SitzReihe count={5}/>
        <SitzReihe count={5}/>
        <SitzReihe count={5}/>
      </table>
    </div>
  );
}

export default Kamel