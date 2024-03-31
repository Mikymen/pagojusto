import React, { useState, useRef, useImperativeHandle, forwardRef, useContext } from 'react';
import {Currency} from "../../Tools/Currency";
import { GUARDARCONF} from "../../Tools/ConfigData";
import { ExpensaContexto } from '../Layout/expensas-context';

let html = document.getElementsByTagName("html")[0];

const Configuracion = forwardRef( ({ props }, ref) => {

    const {currency, setCurrency, theme, setTheme} = useContext(ExpensaContexto);

    const [btnEstado, setBtnEstado] = useState(theme);
    const btnDayClass = btnEstado==="light"? "btnDay btnDayPressed": "btnDay";
    const btnNightClass = btnEstado==="dark"? "btnNight btnNightPressed": "btnNight";

    const moneda= useRef();

    useImperativeHandle(ref,()=>{
        return {
            cancelar(){
                setBtnEstado(theme);
                html.setAttribute("data-theme", theme);
                moneda.current.value = currency;
            },
            guardar(){
                GUARDARCONF(moneda.current ?moneda.current.value:'', btnEstado);
                setCurrency(moneda.current.value);
                setTheme(btnEstado);
            }
        }
    })

    const handleClickBtn =(btn) =>{    
        setBtnEstado(btn);
        html.setAttribute("data-theme", btn);
    }

    let monedas=[];
    Object.keys(Currency).forEach(item => {
        monedas.push({name: Currency[item].name, symbol: Currency[item].symbol, av: item})
    });


  return (
    <>      
      <p>Seleccione un tema</p>
      <div role="group">
        <button
          type="button"
          className={btnDayClass}
          onClick={() => handleClickBtn("light")}
        >
          <span>&#9788;</span>
        </button>
        <button
          type="button"
          className={btnNightClass}
          onClick={() => handleClickBtn("dark")}
        >
          <span>&#9790;</span>
        </button>
      </div>

      <p>Seleccione su moneda</p>
      <select ref={moneda} defaultValue ={currency}>
        {monedas.map((moneda, index) => (
          <option key={moneda.av} value={moneda.av}>
            {moneda.av} ({moneda.symbol}) - {moneda.name}
          </option>
        ))}
      </select>
    </>
  );
});

export default Configuracion;
