import { useNavigate, Link } from "react-router-dom";
import ListaFacturasRecientes from "../Formulario/ListaFacturasRecientes";
import { FACTURAS, SERVICIOS } from "../../Tools/CoreData";


const PageInicio = () => {
  
  return (
    <>
      <h3>Bienvenido!</h3>
      <p>
        Seleccione un tipo de servicio para ver o registrar consumos.
      </p>
      <ul>
        {SERVICIOS.map((servicio) => (
          <li key={servicio.id}>
            <Link to={"servicio/"+servicio.id}>{servicio.nombre}</Link>
          </li>
        ))}
      </ul>
      {/* <a  href="/#" className="contrast"> <strong>+ Crear un nuevo servicio</strong> </a>       */}
      <hr />
      <h5>Ultimas facturas</h5>
      <ListaFacturasRecientes facturas={FACTURAS} /> 
    </>
  );
};

export default PageInicio;
