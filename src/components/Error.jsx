import { useRouteError } from "react-router-dom";


const Error = ()=> {
    const err = useRouteError();
    console.log(err);
    return(
        <div className="error">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <h3>{err.status}:{err.statusText}</h3>
        </div>
    )
}

export default Error;