
function Sitz({index}: {index: number}) {
    const besetztInReihe = [1,3];
    let istBesetzt = false;
    if (besetztInReihe.includes(index)){
        istBesetzt = true;
    };


    return(
        <td className={istBesetzt ? "besetzt" : "frei"}/>
    );

}
export default Sitz