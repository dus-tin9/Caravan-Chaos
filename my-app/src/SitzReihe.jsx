import Sitz from './Sitz.jsx'

export default function Sitz_reihe({ReihenNummer, AnzPlätze}) {
    const Plätze =  [...Array(AnzPlätze)]

    return (
    <>
    <tr>
    {Plätze.map((_,i) => (
        <Sitz Reihe={ReihenNummer} Platz={i}/>
    ))    
    }
    </tr>
    </>
    );
}
