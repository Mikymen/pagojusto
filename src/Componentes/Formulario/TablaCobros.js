import React, { useState, useEffect } from 'react';

const CalcularTabla = (dataTabla, totalPagar, cobros_totales) =>{
  //const newData = [...dataTabla];
  const newData= dataTabla;

  let total_consumo =0;
  let total_pago =0;
  newData.forEach(roww => {
      total_consumo += roww.consumo_final;
      roww.con_act_valido = !(roww.consumo_actual < 0 || roww.consumo_final < 0);
      roww.con_ant_valido = !(roww.consumo_anterior < 0);
  });
  let tarifa = (totalPagar > 0 && total_consumo > 0)?  totalPagar / total_consumo :0 ;
  
 
  
  newData.forEach(roww => {
      let consumo_prop=0;

      consumo_prop = tarifa * (roww.consumo_actual - roww.consumo_anterior);
      consumo_prop = Number((Math.ceil(+consumo_prop *10)/10).toFixed(1)) ;
      
      roww.total_pago = +consumo_prop;      
      total_pago += consumo_prop ;
  });

  cobros_totales.consumo_final  =total_consumo;
  cobros_totales.total_pago =total_pago;
  cobros_totales.tarifa =tarifa;
  return newData;
}

const TablaCobros = ({dataCobros, cobrosTotales, totalPagar, moneda, medida, isEditing = false, handleQuitPerson=null, dataAnt=null}) => {
    const [data, setData] = useState();

  useEffect(()=>{
    setData(dataCobros);
  }, [dataCobros]);

  useEffect(()=>{
    setData(prev =>{
      return CalcularTabla(prev, totalPagar, cobrosTotales);
    });
  },[ dataCobros,totalPagar, cobrosTotales]);


  useEffect(()=>{
    if(dataAnt)
      setData((prev) => {
        let cobros = [...prev];
        cobros.map(cobro =>{
          let cobro_ant = dataAnt.find(cobro_ant => cobro_ant.id_vecino === cobro.id_vecino );
          if(cobro_ant)
                  cobro.consumo_anterior = cobro_ant.consumo_actual;
          else
            cobro.consumo_anterior =0;

          cobro.consumo_final= cobro.consumo_actual - cobro.consumo_anterior;
          return cobro;
        })
        return CalcularTabla(cobros, totalPagar, cobrosTotales);
      });
  },[dataAnt])

  //** */
  const handleChangeInput = (id, value)=>{    
    setData(prev =>{
        const newData = [...prev];
        let row = newData.find(x => x.id_vecino === id);
        row.consumo_actual= +value;
        row.consumo_final= +value - row.consumo_anterior;

        return CalcularTabla(newData, totalPagar, cobrosTotales);
    });    
    
}
const handleChangeLecturaAnterior = (id, value)=>{    
  setData(prev =>{
      const newData = [...prev];
      let row = newData.find(x => x.id_vecino === id);
      row.consumo_anterior= +value;
      row.consumo_final= row.consumo_actual - row.consumo_anterior;

      return CalcularTabla(newData, totalPagar, cobrosTotales);
  });  
}

if(data)
    return ( 
  <>
  <div  className="overflow-auto">

        <table >
        <thead>
          <tr>
            {isEditing ? <th></th>:null}
            <th>Dpto.</th>
            <th>Propietario</th>
            <th>Lectura anterior ({medida})</th>
            <th>Lectura actual ({medida})</th>
            <th>Consumo ({medida})</th>
            <th>Pago ({moneda})</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cobro,index) => (
            <tr
              key={index}
              className={
                !cobro.valido
                  ? "row_error"
                  : undefined
              }
            >
              {isEditing ? <td><input type="button" value={'Retirar'} onClick={()=>handleQuitPerson(cobro.vecino)} /></td> :null}
              <td>{cobro.vecino.departamento}</td>
              <td>{cobro.vecino.nombre}</td>
              <td>
                {!isEditing &&cobro.consumo_anterior.toFixed(2)}
                {isEditing && (
                  <>
                    <input
                      className={
                        !cobro.con_ant_valido ? "input_error" : undefined
                      }
                      style={{ width: "100px" }}
                      type="number"
                      value={cobro.consumo_anterior}
                        onChange={(e) =>
                          handleChangeLecturaAnterior(cobro.id_vecino, e.target.value)
                        }
                    />
                  </>
                )}
              </td>
              <td>
                {!isEditing && cobro.consumo_actual.toFixed(2)}
                {isEditing && (
                  <>
                    <input
                      className={
                        !cobro.con_act_valido ? "input_error" : undefined
                      }
                      style={{ width: "100px" }}
                      type="number"
                      value={cobro.consumo_actual}
                        onChange={(e) =>
                          handleChangeInput(cobro.id_vecino, e.target.value)
                        }
                    />
                  </>
                )}
              </td>
              <td>{cobro.consumo_final.toFixed(2)}</td>
              <td>{cobro.total_pago.toFixed(2)}</td>
            </tr>
          ))}
          {data.length ===0 && 
            <tr>
              <td colSpan={7} className='msg_error'>Tabla vacia, agregue un propietario de la lista superior</td>
            </tr>
          }
        </tbody>
      </table>
  </div>
  <div className="containter">

      <p>Tarifa ({medida} x {moneda}): {cobrosTotales.tarifa.toFixed(3)}</p>
      <p>Consumo total ({medida}): {cobrosTotales.consumo_final.toFixed(2)}</p>
      <p>Pago total ({moneda}): {cobrosTotales.total_pago.toFixed(2)}</p>
  </div>
  </>
     );
}
 
export default TablaCobros;