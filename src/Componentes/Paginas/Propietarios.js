import { VECINOS, GuardarVecinos, GuardarNuevoVecino } from "../../Tools/CoreData";
import React, { useState, useRef } from 'react';
import Dialogo from "../Formulario/Dialogo";

const Propietarios = () => {
    const form = useRef();
    const dialogo= useRef();
    const nuevoDep=useRef();
    const nuevoNom=useRef();
    const dialogoNuevo = useRef();
    const [editable, setEditable] = useState(false);
    const [vecinos, setVecinos] = useState(VECINOS.map(vec =>({...vec})));
    const [vecinosEliminados, setVecinosEliminados] = useState([]);
    const handleVecinos = (vecino, {dep, nom})=>{
        
        setVecinos(prev=>{
            const vecinosNew =[...prev ];
            let vecinoFounded = vecinosNew.find(vec =>vec.id === vecino.id);
            vecinoFounded.departamento=dep;
            vecinoFounded.nombre=nom;
            return vecinosNew;
        })     
    }
    const handleCancelar = ()=>{
        setEditable(false);
        setVecinos(VECINOS.map(vec =>({...vec})));
    }
    const handleGuardar =(e) =>{
        e.preventDefault();
        //
        const eliminados= vecinos.filter(vec => vec.activo===2);
        setVecinosEliminados(eliminados);
        if(eliminados.length>0){
            dialogo.current.abrir();
        }else{
            GuardarVecinos(vecinos);
            form.current.submit();
        }
    }
    const handleDialogoNuevoOpen = (e)=>{
        e.preventDefault();
        dialogoNuevo.current.abrir();
    }
    const handleDialogoConfirm =()=>{
        GuardarVecinos(vecinos);
        form.current.submit();
    }
    const handleDialogoNuevoConfirm =()=>{
        const dep =nuevoDep.current.value;
        const nom=nuevoNom.current.value;
        if(dep.trim() ==="" || nom.trim()===""){
            return;
        }
        GuardarNuevoVecino(dep, nom);
        form.current.submit();
    }

    const handleQuitar =(e, vecino, modo="quitar") =>{
        e.preventDefault();
        setVecinos(prev =>{
            const newVecinos =[...prev];
            newVecinos.find(vec => vec.id === vecino.id).activo=modo==="quitar"? 2 : 1;
            return newVecinos;
        });
    }

    return ( 
        <>
        <form ref={form} action="/propietarios">
            <h4>Propietarios</h4>
            {!editable && 
            <button onClick={handleDialogoNuevoOpen }>Crear nuevo +</button>
            }
            <table>
                <thead>
                    <tr>
                        <th>Departamento</th>
                        <th>Nombre</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {vecinos.map(vecino=>(
                        <>
                        {vecino.activo !==0 &&
                        <tr key={vecino.id}>
                            {!editable?  
                                <>
                                    <td>{vecino.departamento}</td>
                                    <td>{vecino.nombre}</td>
                                    <td></td>
                                </> :
                                <>
                                    <td><input type="text" value={vecino.departamento} onChange={(e)=>{handleVecinos(vecino, {dep:e.target.value, nom:vecino.nombre})}} size={1}
                                    disabled={vecino.activo===2?"disabled":undefined} 
                                    className={vecino.activo===2?"removed":undefined}
                                    /></td>
                                    <td><input type="text" value={vecino.nombre} onChange={(e)=>{handleVecinos(vecino, {dep:vecino.departamento, nom:e.target.value})}} 
                                    disabled={vecino.activo===2?"disabled":undefined} 
                                    className={vecino.activo===2?"removed":undefined}
                                    /></td>
                                    <td>
                                        {vecino.activo===1 ?
                                            <button onClick={(e)=>handleQuitar(e,vecino)}>Quitar</button>:
                                            <button className="secondary" onClick={(e)=>handleQuitar(e,vecino,"rehacer")}>Reponer</button>
                                        
                                        }
                                    </td>
                                </>                            
                            }                           
                        </tr>
                        }</>
                    ))}
                </tbody>
            </table>
            {!editable ? 
                <button onClick={()=>{setEditable(true)}}>Editar</button>:
                <>
                    <button className="secondary" onClick={handleCancelar}>Cancelar</button>
                    <button onClick={handleGuardar}>Guardar cambios</button>
                </>
            }
            
        </form>
            <Dialogo ref={dialogo} handleDialogoConfirm={handleDialogoConfirm} titulo={"Eliminar los propietarios?"}>
                <p>Una vez eliminados no se podran recuperar los siguientes propietarios:</p>
                <ul>
                    {vecinosEliminados.map(vec=>(
                        <li>{vec.departamento} - {vec.nombre}</li>
                    ))}

                </ul>
                <sub>Sin embargo seguiran apareciendo en las facturas emitidas anteriormente.</sub>
            </Dialogo>
            <Dialogo ref={dialogoNuevo} handleDialogoConfirm={handleDialogoNuevoConfirm} titulo={"Nuevo propietario"}>
                <p>A continuación ingrese la información del propietario.</p>
                <div className="row">
                    <div className="col-xs-8">
Departamento
                <input type="text" ref={nuevoDep} />
                    </div>
                    <div className="col-xs-12">
Nombre
                <input type="text" ref={nuevoNom}/>
                    </div>
                </div>
                
                
            </Dialogo>
        </>
     );
}
 
export default Propietarios;