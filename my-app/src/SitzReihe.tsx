import Sitz from './Sitz.tsx'

function Sitz_reihe({count}: {count: number}) {
    const items =  [...Array(count)]

    
    return (
    <>
    <tr>
    {items.map((_,i) => (
        <Sitz key={i} index={i}/>
    ))
    
    }
    </tr>
    </>
    );
}

export default Sitz_reihe