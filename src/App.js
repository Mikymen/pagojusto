import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Componentes/Layout/Navbar";
import PageNotFound from "./Componentes/Paginas/PageNotFound";
import PageInicio from "./Componentes/Paginas/PageInicio";
import PageNuevo from "./Componentes/Paginas/PageNuevo";

import PageServicio from "./Componentes/Paginas/PageServicio";
import PageFactura from "./Componentes/Paginas/PageFactura";
import Propietarios from "./Componentes/Paginas/Propietarios";
import {CONFIGURACION} from "./Tools/ConfigData";
import PageWelcome from './Componentes/Paginas/PageWelcome';
import PageAcerca from './Componentes/Paginas/PageAcerca';
import { ExpensaContexto } from './Componentes/Layout/expensas-context';
import React, { useState } from 'react';

let html = document.getElementsByTagName("html")[0];

function App() {
  const [configuracionState, setConfiguracionState] = useState({
    moneda: CONFIGURACION ? CONFIGURACION.id_currency:"",
    tema: CONFIGURACION ? CONFIGURACION.theme:""
});
  
  
  
  const handleChangeCurrency = (id_currency)=>{
    setConfiguracionState(prev =>{ return {...prev, moneda:id_currency}});    
  }
  const handleChangeTheme = (theme)=>{
    setConfiguracionState(prev =>{ return {...prev, tema:theme}});    
  }
  const ctxValue ={
    currency:configuracionState.moneda,
    setCurrency: handleChangeCurrency,
    theme: configuracionState.tema,
    setTheme: handleChangeTheme
  }
  

  html.setAttribute("data-theme", configuracionState.tema);

  console.log(configuracionState);


  if (typeof(Storage) !== "undefined") {
    return (
      <ExpensaContexto.Provider value={ctxValue}>
        <Router>
          <div className="App">
            {!CONFIGURACION && 
            <Routes>
              <Route path='/' element={<PageWelcome />}></Route>
              <Route path="/*" element={<PageWelcome />} />
            </Routes>
            }
            {/* <Route element = {
              <ProtectedRoute
                acceso={CONFIGURACION}
                redirectPath={"/"}
              />
            }>
            </Route> */}
            {CONFIGURACION &&
            <>
              <Navbar />
              <div className="content row around-md around-sm">
                <div className="App col-md-8 col-sm-10 col-xs-12">
                  <article className="App-header">
                    <Routes>
                      <Route path="/" element={<PageInicio />} />
                      <Route path="/propietarios" element={<Propietarios />} />
                      <Route path="/factura/:id" element={<PageFactura />} />
                      <Route path="/servicio/:id" element={<PageServicio /> } />
                      <Route path="/nuevo/:id_servicio" element={<PageNuevo />} />
                      <Route path="/acerca" element={<PageAcerca />} />
                      <Route path="/*" element={<PageNotFound />} />
                    </Routes>
                  </article>
                </div>
              </div>
            </>
            
            }
          </div>
        </Router>

      </ExpensaContexto.Provider>
    );
  } else {
    return (
    <div class="container">
      <article>
        <h1>We sorry!</h1>
        <p> No Web Storage support..</p>
        <h1>Lo sentimos </h1>
        <p>Su navegador no soporta Web Storage...</p>
      </article>
    </div>
    )
  }
  
}

export default App;
