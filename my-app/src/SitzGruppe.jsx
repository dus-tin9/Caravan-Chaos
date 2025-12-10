
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import Sitz from './Sitz.jsx'


export default function SitzGruppe({GruppenId, Plätze}) {


  const items = Plätze.filter((person) => person !== null);       // Personen aus Sitzordnung raus

  return (
    <SortableContext items={items} strategy={rectSortingStrategy}>
      <div className={GruppenId}>
        {Plätze.map((Person, index) => 
        (  <Sitz key={"${GruppenId}-Sitz-${index}"} PlatzId={"${GruppenId}-Sitz-${index}"} PersonId={Person}/>  )
        )}
      </div>
    </SortableContext>
  );
}