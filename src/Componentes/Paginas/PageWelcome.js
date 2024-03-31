import React, { useRef } from "react";
import Configuracion from "../Formulario/Configuracion";

const PageWelcome = () => {
  const conf = useRef();
  const formulario = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    conf.current.guardar();
    formulario.current.submit();
  };

  return (
    <div className="container">
      <form action="/" ref={formulario} className="row center-xs">
        <article className="col-xs-12 col-sm-8 col-md-5 welcome">
          <h1> <u>PagoJusto</u> <span style={{fontSize:"40pt"}}>&#9997;</span></h1>
          
          <h5>Bienvenido a la calculadora de gastos comunes.</h5>
          {/* <hr /> */}
          <Configuracion ref={conf} />

          <p>
            Puede cambiar luego estas configuraciones en el menú de
            configuración.
          </p>
          <div className="end-xs">
            <button onClick={handleSubmit}>
              Guardar y continuar
              <span> &#10003;</span>
            </button>
          </div>
        </article>
      </form>
    </div>
  );
};

export default PageWelcome;
