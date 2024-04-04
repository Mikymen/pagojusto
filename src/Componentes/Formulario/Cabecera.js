import Mes from "../../Tools/Mes";
import { ExpensaContexto } from "../Layout/expensas-context";
import { useContext } from "react";

const Cabecera = ({ data }) => {
  const {currency} = useContext(ExpensaContexto);
  if (data)
    return (
      <div className="overflow-auto">
        <h4>
          Periodo: {Mes(data.mes)}-{data.anio}
        </h4>
        <table >
          <tbody>
            <tr>
              <td>
                <strong>Lectura anterior ({data.servicio.av}): </strong>{" "}
                {data.consumo_anterior}
              </td>
              <td>
                <strong>Lectura actual ({Mes(data.mes)}): </strong>
                {data.consumo_actual}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Consumo ({data.servicio.av}): </strong>
                {data.consumo_final}
              </td>
              <td>
                <strong>Total a pagar ({currency}): </strong>
                {data.total_pago}
              </td>
            </tr>
            <tr>
              <td>
                <strong>
                  Tarifa ({data.servicio.av}-{currency}):
                </strong>{" "}
                {data.tarifa}
              </td>
            </tr>
          </tbody>
        </table>
        {
          data.nota !=="" &&
          <p className="nota"><strong>Nota: </strong>{data.nota}</p>
        }
      </div>
    );
};

export default Cabecera;
