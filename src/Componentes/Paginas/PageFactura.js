import { FACTURA_BY_ID, CobrosByFacturaId } from "../../Tools/CoreData";
import React, { useState } from "react";
import Cabecera from "../Formulario/Cabecera";
import { useParams, useNavigate } from "react-router-dom";
import TablaCobros from "../Formulario/TablaCobros";
import { ExpensaContexto } from "../Layout/expensas-context";
import { useContext } from "react";

const PageFactura = () => {
  const {currency} = useContext(ExpensaContexto);
  const { id } = useParams();
  const factura = FACTURA_BY_ID(+id);
  const cobros = CobrosByFacturaId(+id);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const fechaFactura= new Date(factura.fecha).toLocaleDateString('es-ES', options);

  let cobrosTotales = {
    consumo_final: 0,
    total_pago: 0,
    tarifa: 0,
  };
  return (
    <div>
      <Cabecera data={factura} />
      Tabla de lecturas y cobros
      <hr />
      <TablaCobros
        dataCobros={cobros}
        isEditing={false}
        medida={factura.servicio.av}
        moneda={currency}
        cobrosTotales={cobrosTotales}
        totalPagar={ factura.total_pago}
      />
      <div class="row end-xs">
        <div class="col-xs-9">
          <div class="box"> <sub><i>Creado el: {fechaFactura}</i></sub> </div>
        </div>
      </div>
    </div>
  );
};

export default PageFactura;
