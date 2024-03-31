import { useNavigate } from "react-router-dom";
import Mes from "../../Tools/Mes";
import { ExpensaContexto } from "../Layout/expensas-context";
import { useContext } from "react";

const ListaFacturasRecientes = ({  facturas }) => {

  const {currency} =useContext(ExpensaContexto);

    const navigate = useNavigate();
    const handleClickList=(id)=>{
        navigate(`/factura/${id}`);
    }
  return (
    <table className="filas_tabla">
      <thead>
        <tr>
        <th>Servicio</th>
          <th>Periodo</th>
          <th>Consumo</th>
          <th>Total ({currency})</th>
          
        </tr>
      </thead>
      <tbody>
        {facturas.map((factura) => (
          <tr key={factura.id} onClick={() => handleClickList(factura.id)}>
            <td>{factura.servicio.nombre}</td>
            <td>{Mes(factura.mes)} {factura.anio}</td>
            <td>{factura.consumo_final} {factura.servicio.av}</td>
            <td>{factura.total_pago}</td>            
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListaFacturasRecientes;
