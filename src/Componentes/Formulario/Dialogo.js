import  { useRef, forwardRef, useImperativeHandle } from 'react';

const Dialogo = forwardRef(({ handleDialogoConfirm, handleDialogoClose=null, titulo, children, ...props}, ref) => {
    const dialogo= useRef();
    if(handleDialogoClose===null){
      handleDialogoClose = () =>{
            dialogo.current.close();
        }
    }
    useImperativeHandle(ref, ()=>{
        return {
            abrir(){
                dialogo.current.showModal();
            },
            cerrar(){
                dialogo.current.close();
            },
        };
    });
    

  return (
    <dialog ref={dialogo} {...props}>
      <article>
        <header>
          <button
            aria-label="Close"
            rel="prev"
            onClick={handleDialogoClose}
          ></button>
          <h4>{titulo}</h4>
        </header>
            {children}          
        <footer>
          <button className='secondary' onClick={handleDialogoClose}>
            Cancelar
          </button>
          <button autoFocus=""  onClick={handleDialogoConfirm}>
            Aceptar
          </button>
        </footer>
      </article>
    </dialog>
  );
});

export default Dialogo;
