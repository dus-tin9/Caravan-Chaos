import Sitz from './Sitz.jsx'

export default function Sitz_reihe({ Gruppe, ReihenNummer, AnzPlätze, BesetztePl}) {
    const Plätze =  [...Array(AnzPlätze)]

    return (
    <>
    {Plätze.map((value,index) => (
        <Sitz
         key={index}
         Reihe={ReihenNummer} 
         Platz={index}
         BesetztePl={BesetztePl}
         Gruppe={Gruppe}
        />
    ))
    }
    </>
    );
}
