import {useState, useEffect } from "react";

const useActiveStatus = () => {
    const [activeStatus, setActiveStatus] = useState(true);
    //check if the user is active
    useEffect(()=>{
        window.addEventListener("online", () => {
            setActiveStatus(true);

        })
        window.addEventListener("offline", () => {
            setActiveStatus(false);
        })
    },[])



    //boolen value
    return activeStatus;
}

export default useActiveStatus;