import { useParams, useNavigate, Link, } from "react-router-dom";
import { ServicioById, FACTURA_BY_SERVICIO } from "../../Tools/CoreData";
import ListaFacturas from "../Formulario/ListaFacturas";

const PageServicio = () => {
    const { id } = useParams();
    const servicio = ServicioById(+id);
    const facturasServicio = FACTURA_BY_SERVICIO(+id)
    return ( 
        <div>
            <h4>Facturas del servicio {servicio.nombre}</h4>
            <Link to={"/nuevo/"+ id} type="submit" role="button">Registrar nueva factura</Link>
            <hr />
            {facturasServicio.length > 0 &&
            <>
                <h4>Facturas de este servicio</h4>
                <ListaFacturas facturas={facturasServicio} />             
            </>
            }
            {facturasServicio.length === 0 &&
                <p>Todavia no hay facturas registradas de este servicio.</p>
            }
        </div>
     );
}
 
export default PageServicio;