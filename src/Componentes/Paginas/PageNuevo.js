import { useNavigate, useParams} from "react-router-dom";
import { useState, useRef } from "react";
import Mes,{ meses } from "../../Tools/Mes";
import { ServicioById, CobrosByFacturaId, VECINOS, FACTURAS, GuardarFactura } from "../../Tools/CoreData";
import TablaCobros from "../Formulario/TablaCobros";
import Dialogo from "../Formulario/Dialogo";
import { ExpensaContexto } from "../Layout/expensas-context";
import { useContext } from "react";

const FECHA_ACTUAL = new Date();

const input = {
  valor: 0,
  valido: undefined,
};

let selectedFactura;

let anios = [];
for (
  var i = FECHA_ACTUAL.getFullYear() - 1;
  i < FECHA_ACTUAL.getFullYear() + 5;
  i++
) {
  anios.push(i);
}

let cloneFacturas = [...FACTURAS];
  
const PageNuevo = () => {
  const navigate = useNavigate();
  const {currency} = useContext(ExpensaContexto);

  const { id_servicio } = useParams();
  const servicio = ServicioById(+id_servicio);

  const mes = useRef();
  const anio = useRef();
  const nota = useRef();
  const dialogo = useRef();
  const [totalPagar, setTotalPagar] = useState(0);

  const [lecturaAnterior, setLecturaAnterior] = useState(input);
  const [lecturaActual, setLecturaActual] = useState(input);
  const [lecturaFinal, setLecturaFinal] = useState(input);
  const [msgError, setMsgError] = useState();
  
  const [facturasLista, setFacturasLista] = useState(cloneFacturas);

  const handleLecturaFinal = (numero) => {
    let inputFinal = { valido: numero > 0 ? "false" : "true", valor: numero };
    setLecturaFinal(inputFinal);

    let inputActual = {
      valido: lecturaAnterior.valor + numero > 0 ? "false" : "true",
      valor: (lecturaAnterior.valor + numero).toFixed(2),
    };
    setLecturaActual(inputActual);
  };
  const handleLecturaActual = (numero) => {
    let inputActual = { valido: numero > 0 ? "false" : "true", valor: numero };
    setLecturaActual(inputActual);
    let inputFinal = {
      valido: numero - lecturaAnterior.valor > 0 ? "false" : "true",
      valor: (numero - lecturaAnterior.valor).toFixed(2),
    };
    setLecturaFinal(inputFinal);
  };
  const handleLecturaAnterior = (numero) => {
    let inputFinal = {
      valido: lecturaActual.valor - numero > 0 ? "false" : "true",
      valor: (lecturaActual.valor - numero).toFixed(2),
    };

    let inputAnterior = {
      valido: numero > 0 ? "false" : "true",
      valor: numero,
    };
    setLecturaAnterior(inputAnterior);
    setLecturaFinal(inputFinal);
  };



  const vecinosCobros = VECINOS.filter(vec => vec.activo===1).map((vecino) => {
    
    const cobro = {
      id: 0,
      id_factura: 0,
      id_vecino: vecino.id,
      consumo_anterior: 0,
      consumo_actual: 0,
      consumo_final: 0,
      total_pago: 0,
      factura: null,
      vecino: vecino,
      included: true,
      con_act_valido:true,
      con_ant_valido:true,
    };
    return cobro;
    
  });

  const [cobros, setCobros] = useState(vecinosCobros);
  
  const [cobrosAnt, setCobrosAnt] = useState();
  let cobrosTotales={
    consumo_final : 0,
    total_pago : 0,
    tarifa : 0
  };

  const handleQuitPerson = (vecino) => {
    setCobros((prev) => {
        let newCobro = [...prev];
      newCobro.find((cobro) => cobro.vecino === vecino).included = false;
      return newCobro;
    });
  };
  const handleAddPerson = (vecino) => {
    setCobros((prev) => {
        let newCobro = [...prev];
        newCobro.find((cobro) => cobro.vecino === vecino).included = true;
      return newCobro;
    });
  };

  const handleDialogoOpen = () =>{
    dialogo.current.abrir();
    cloneFacturas.forEach(factura => factura["seleccionado"] =false);
    setFacturasLista(cloneFacturas);
  }

  const handleDialogoSelectAnterior =(factura)=>{
    selectedFactura=factura;
    setFacturasLista(prev => {
        let row = [...prev];
        row.forEach(p => p.seleccionado =false)
        row.find(r => r.id === factura.id).seleccionado =true;
        return row;
    });
  }
  const handleDialogoConfirm = () =>{
    handleLecturaAnterior(selectedFactura.consumo_actual);
    dialogo.current.cerrar(); 
    setCobrosAnt(CobrosByFacturaId(selectedFactura.id));
  }  

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = formulario.current;
    let cobrosFinales = cobros.filter((cobro) => cobro.included === true);
    if(cobrosFinales.length === 0){
      //alerta
      setMsgError("Debe tener al menos un propietario en la tabla.")
    }else if(cobrosFinales.filter(cobro=> (cobro.con_act_valido && cobro.con_ant_valido)).length < cobrosFinales.length){
      setMsgError("Debe corregir los errores de la tabla antes de guardar.")
    }else if (totalPagar <= 0 || cobrosTotales.total_pago <= 0){
      setMsgError("El monto total y la suma de pagos debe ser mayor a 0.")
    }
     else{
      const id_factura = GuardarFactura(
        +id_servicio, 
        +anio.current.value, 
        +mes.current.value, 
        nota.current.value, 
        +lecturaAnterior.valor, 
        +lecturaActual.valor, 
        +lecturaFinal.valor, 
        totalPagar, 
        Number(cobrosTotales.tarifa.toFixed(3)), cobros.filter((cobro) => cobro.included === true) 
        );
      form.action ="/factura/"+id_factura;
      form.submit();
    }
  };

  const formulario = useRef();
  return (
    <div className="create">
      <header>
        <div className="row">
            <div className="col-xs-6">
                <h4>Datos de la factura</h4>
            </div>
            <div className="col-xs-6 last-xs">
 <button  onClick={handleDialogoOpen}>Seleccionar lectura anterior</button>
            </div>
        </div>
        
      </header>
      <hr />
      <form ref={formulario}>
        <div className="row bottom-xs">
          <div className="col-xs-6 col-md-3">
            <label htmlFor="">Año</label>
            <select defaultValue={FECHA_ACTUAL.getFullYear()} ref={anio}>
              {anios.map((val) => (
                <option key={val}>{val}</option>
              ))}
            </select>
          </div>
          <div className="col-xs-6 col-md-3">
            <label htmlFor="">Mes</label>
            <select
              name=""
              id=""
              ref={mes}
              defaultValue={FECHA_ACTUAL.getMonth() + 1}
            >
              {meses.map((mes, index) => (
                <option key={index + 1} value={index + 1}>
                  {mes}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="col-xs-4 col-md-3">
            <label htmlFor="">Lectura anterior ({servicio.av})</label>
            <input
              type="number"
              aria-invalid={lecturaAnterior.valido}
              value={lecturaAnterior.valor}
              onChange={(evt) => handleLecturaAnterior(Number(evt.target.value))}
              required
            />
          </div>
          <div className="col-xs-4  col-md-3">
            <label htmlFor="">Lectura actual ({servicio.av})</label>
            <input
              type="number"
              aria-invalid={lecturaActual.valido}
              value={lecturaActual.valor}
              onChange={(evt)=>handleLecturaActual(Number(evt.target.value))}
              required
            />
          </div>
          <div className="col-xs-4  col-md-3">
            <label htmlFor="">Consumo final ({servicio.av}) </label>
            <input
              aria-invalid={lecturaFinal.valido}
              type="number"
              value={lecturaFinal.valor}
              onChange={evt =>handleLecturaFinal(Number(evt.target.value))}
            />
            {/* <p>{lecturaActual - lecturaAnterior}</p> */}
          </div>
          <div className="col-xs-4  col-md-4"></div>
        </div>
        <div className="row center-xs">
          <div className="col-xs-8">
            <label htmlFor="">Total a pagar ({currency})</label>
            <input type="number" 
            //ref={total_pagar} 
            onChange={(evt)=> setTotalPagar(+evt.target.value)}
            value={totalPagar}
            defaultValue={0}  />

            <details>
              <summary>
                <u>Agregar una nota </u>
              </summary>
              <textarea ref={nota} placeholder="Escriba aqui..." rows="2"></textarea>
              <sub>Maximo 255 caracteres.</sub>
            </details>
          </div>
        </div>
        {/* MEJORAR DESPUES*/}
        {cobros.filter(cobro => cobro.included ===false).length > 0 &&
          <>        
            <p>Propietarios sin asignación de gastos:</p>
            <div className="overflow-auto">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Departamento</th>
                                <th>Propietario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cobros.filter(cobro => cobro.included ===false).map(cobro =>(
                                <tr key={cobro.vecino.id}>
                                    <td><button type="button" onClick={()=>handleAddPerson(cobro.vecino)} >Agregar</button></td>
                                    <td>{cobro.vecino.departamento}</td>
                                    <td>{cobro.vecino.nombre}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
            </div>
          </>
        }
        <p>Tabla de consumos:</p>
        <div>
          <TablaCobros
            dataCobros={cobros.filter(cobro => cobro.included === true)}
            totalPagar={ totalPagar}
            tarifa={0}
            moneda={currency}
            medida = {servicio.av}
            isEditing={true}
            handleQuitPerson={handleQuitPerson}
            dataAnt={cobrosAnt}
            cobrosTotales={cobrosTotales}
          />
        </div>

        <hr />
        <section className="msg_error">
          {msgError && "AVISO: " + msgError}
        </section>
        <section className="row center-xs">
          <div className="col-xs-3 col-md-2">
            <button onClick={() => navigate("/servicio/"+id_servicio)} className="secondary">
              Cancelar{" "}
            </button>
          </div>
          <div className="col-xs-6 col-md-4">
            <button type="submit" onClick={handleSubmit}>Guardar </button>
          </div>
        </section>
      </form>
      <Dialogo ref={dialogo} handleDialogoConfirm ={handleDialogoConfirm} titulo ="Lecturas anteriores">
      Seleccione un registro anterior para cargar los datos de lectura anterior y las lecturas anteriores de los propietarios.    
        <table className="filas_tabla">
            <thead>
                <tr>
                    <td>Periodo</td>
                    <td>Consumo ({servicio.av})</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                { facturasLista.filter(factura => factura.id_servicio === Number(id_servicio)).map((fact, index) =>(
                    <tr key={index} onClick={()=>handleDialogoSelectAnterior(fact)}
                    className={fact.seleccionado===true?"resaltado":undefined}
                    >
                        <td> {fact.anio+ " - " + Mes(fact.mes)}</td>
                        <td> {fact.consumo_actual}</td>
                        <td>{fact.seleccionado? <> &#10004; </> : undefined}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </Dialogo>
    </div>
  );
};

export default PageNuevo;
