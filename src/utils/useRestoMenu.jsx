import { useState, useEffect } from 'react';
import { MENU_API } from "../utils/constant";

const useRestoMenu = (id) => {
    const [restoinfo, setRestoinfo] = useState(null);

    // fetch the restaurant menu data
    useEffect(()=>
    {
        fetchmenu();

    },[]);
    const fetchmenu = async ()=>{
        const data = await fetch(MENU_API + id);
        const json = await data.json();
        setRestoinfo(json.data);
    }


    return restoinfo;
}

export default useRestoMenu; 