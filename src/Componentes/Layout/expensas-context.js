import { createContext } from "react";
export const ExpensaContexto = createContext({
    currency:"",
    setCurrency: ()=>{},
    theme:"",
    setTheme: ()=>{}
}); 