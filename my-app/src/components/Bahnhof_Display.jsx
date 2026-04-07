import { getPersonImageUrl } from '@/lib/personImage'

export default function Bahnhof_Display({person}){

    const imageurl = getPersonImageUrl(person)

    return(
        <div className="DisplayKarte">
            <img  className="Bild"
                  src={imageurl}
                  height={100}
                  width={100}/>

            <h4 className="Name">{person.name}</h4>
            <ul className="Infos">
                {person.needs.map((need, index) =>
                    <li key={index}>{need.name}</li>
                )}
            </ul>                    
        </div>
    );


}