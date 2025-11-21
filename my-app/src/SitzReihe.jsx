import Sitz from './Sitz.jsx'

export default function Sitz_reihe({ ReihenNummer, AnzPlätze, BesetztePl}) {
    const Plätze =  [...Array(AnzPlätze)]

    return (
    <>
    <tr>
    {Plätze.map((_,i) => (
        <Sitz
         key={i}
         Reihe={ReihenNummer} 
         Platz={i}
         BesetztePl={BesetztePl}
        />
    ))    
    }
    </tr>
    </>
    );
}
