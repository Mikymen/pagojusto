import { Link } from "react-router-dom";

import React, { useState, useRef, useContext } from 'react';

import Dialogo from "../Formulario/Dialogo";
import Configuracion from "../Formulario/Configuracion";

const Navbar = () => {
  const conf= useRef();
  const dialogo = useRef();
  
  const handleDialogoConfirm = ()=>{    
    conf.current.guardar();
    dialogo.current.cerrar();
  }

  const handleOpenDialogo= () =>{
    dialogo.current.abrir();
  }

  const handleCloseDialog = ()=>{
    conf.current.cancelar();
    dialogo.current.cerrar();
  } 

  return (
    <article>
      <nav className="navbar">
        <ul>
            <li>
                <strong><u>PagoJusto</u> <span style={{fontSize:"24pt"}}>&#9997;</span> </strong>
            </li>
        </ul>   
        <ul className="links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/propietarios">Propietarios</Link>
          </li>
          <li>
            <span className="btnConfiguracion" onClick={handleOpenDialogo} >&#10059;</span>
          </li>
          <li>
            <Link to="/acerca">Acerca</Link>
          </li>
        </ul>
      </nav>
      <Dialogo ref={dialogo} handleDialogoConfirm ={handleDialogoConfirm} handleDialogoClose={handleCloseDialog} titulo={"Configuración"}>
        <div className="row center-xs">
          <div className="col-xs-12 col-sm-8">
        <Configuracion ref={conf} />

          </div>
        </div>
      </Dialogo>
    </article>
  );
};

export default Navbar;
