import { useState, useEffect } from "react";
import texts from "../texts";

const ViewCounter = () => {
    const [count, setCount] = useState(0) //usestate loendab vaatamisi, alustame 0st

    //useeffect loeb localStoragest eelmise vaatamiste arvu, suurendab seda ning salvestab uue väärtuse.
    useEffect(() => {
        //loeme eelmise väärtuse ja siis kontrollime, kas antud sessioonis on juba loetud 
        const storedCount = localStorage.getItem('pageViews') 
        const alreadyCounted = localStorage.getItem('alreadyCounted')
        
        let newCount;

        if(!alreadyCounted) { //kui ei ole loetud, käivitame loenduse 1 võrra või alustame 1st kui väärtust pole
            newCount = storedCount ? Number.parseInt(storedCount, 10) + 1 : 1;
            localStorage.setItem('pageViews', String(newCount));
            localStorage.setItem('alreadyCounted', 'true');
        }else{
            newCount = storedCount ? Number.parseInt(storedCount, 10) : 0; //kui juba loetud, võtab viimase arvu
        }

        setCount(newCount);

        return () => {
            localStorage.removeItem('alreadyCounted'); //eemaldame märgise, et järgmine kord saaks uuesti lugeda
        };

    }, []) //kood käivitub ainult 1x kui komponent ekraanile ilmub

    return (
        <div>
            <p>{texts.counter.views(count)}</p>
        </div>
    );
};

export default ViewCounter;