import { useNavigate } from "react-router-dom";
import Mes from "../../Tools/Mes";
import { ExpensaContexto } from "../Layout/expensas-context";
import { useContext } from "react";


const ListaFacturas = ({facturas}) => {

    const {currency} = useContext(ExpensaContexto);

    const navigate = useNavigate();
    const handleClickFactura=(id)=>{
        navigate(`/factura/${id}`);
    }
    
    return ( 
        <table className="filas_tabla">
            <thead>
                <tr>
                    <th>Año</th>
                    <th>Mes</th>
                    <th>Lectura ({facturas[0].servicio.av})</th>
                    <th>Consumo ({facturas[0].servicio.av})</th>
                    <th>Total ({currency})</th>
                </tr>
            </thead>
            <tbody>
                {facturas.map(factura =>(
                    
                    <tr key={factura.id} onClick={()=>handleClickFactura(factura.id)}>
                        <td>{factura.anio}</td>
                        <td>{Mes(factura.mes)}</td>                        
                        <td>{factura.consumo_actual}</td>
                        <td>{factura.consumo_final}</td>
                        <td>{factura.total_pago}</td>
                        
                    </tr>
                    
                ))}
                
            </tbody>
        </table>
    );
}
 
export default ListaFacturas;