export const meses =["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const Mes = (mes) => {
    if(mes >= 0){        
        return meses[mes-1];
    }
    return "";
}


 
export default Mes;