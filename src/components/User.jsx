import { useState } from "react";

// const User = (props)=>{
const User = ({name})=>{
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(10);
    return(
        <div className="about-card">
            <h1>count = {count}</h1>
            <h1>count = {count2}</h1>
            {/* <h2>Name: Mohataseem Khan</h2> */}
            {/* <h2>Name: {props.name}</h2> */}
            <h2>Name: {name}</h2>
            <h3>Location: Mumbai</h3>
            <h4>Contact: @mohataseem89</h4>
        </div>


    )
}

export default User;