export default function Bahnhof_Display({person}){

    const imageurl = `/src/assets/people/${person.name}.svg`

    return(
        <div className="DisplayKarte">
            <img  className="Bild"
                  src={imageurl}
                  height={100}
                  width={100}/>

            <h4 className="Name">{person.name}</h4>
            <ul className="Infos">
                {person.needs.map((need, index) => 
                    <li key={index}> {need}</li>
                    )}
            </ul>                    
        </div>
    );


}