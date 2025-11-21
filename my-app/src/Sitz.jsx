export default function Sitz({Reihe, Platz}) {
    const BesetztePlätze = [[1,3], [2,1],[3,5]];
    let istBesetzt = false;
    if (BesetztePlätze.includes([Reihe,Platz])){
        istBesetzt = true;
    };


    return(
        <td className={istBesetzt ? "besetzt" : "frei"}/>
    );

}