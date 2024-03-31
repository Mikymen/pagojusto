import { Link } from "react-router-dom";

const PageNotFound = () => {
    return ( 
        <div className="not-found">
            <h2>ERROR 404</h2>
            <h4>Lo sentimos...</h4>
            <p>Esta pagina no existe.</p>
            <br />
            <Link to="/"> {"< " }Regresar al inicio</Link>
        </div>
     );
}
 
export default PageNotFound;