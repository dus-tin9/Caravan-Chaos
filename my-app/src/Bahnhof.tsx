import SitzReihe from './SitzReihe.tsx'

function Bahnhof() {

  return (
    <div className="Bahnhof">
      <table>
        <SitzReihe count={3}/>
        <SitzReihe count={4}/>
        <SitzReihe count={5}/>
        <SitzReihe count={6}/>
      </table>
    </div>
  );

}

export default Bahnhof