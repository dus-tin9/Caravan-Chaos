export default function Sitz({Reihe, Platz, BesetztePl}) {

    const istBesetzt = BesetztePl.some(
                       ([r, p]) => r === Reihe && p === Platz)

    return(
        <td className={istBesetzt ? "besetzt" : "frei"}></td>
    );
}