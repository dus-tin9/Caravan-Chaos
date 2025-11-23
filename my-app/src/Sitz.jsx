export default function Sitz({Gruppe, Reihe, Platz, BesetztePl}) {

    const istBesetzt = BesetztePl.some(([r, p]) => r === Reihe && p === Platz);
    const Plätze =   [  ["O", "O", "A", "O", "O"],
                        ["B", "O", "O", "O", "O"],
                        ["O", "O", "O", "O", "C"],
                        ["O", "O", "O", "O", "O"]  ]
    // const Plätze = getZustand(Gruppe);

    const NamePerson = Plätze[Reihe][Platz];
    return(
        <td className={istBesetzt ? "besetzt" : "frei"}>
          {NamePerson}
        </td>
    );
}