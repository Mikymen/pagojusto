// let CONFIG={
//     id_currency: "",
//     theme:""
// }
let CONFIG = null;

if (typeof localStorage.CONFIG !== "undefined") {
  CONFIG = JSON.parse(localStorage.CONFIG);
}

export const CONFIGURACION = CONFIG;

export const GUARDARCONF = (moneda, tema) => {
  CONFIG = {
    id_currency: moneda,
    theme: tema,
  };
  localStorage.setItem("CONFIG", JSON.stringify(CONFIG));
};

export const MONEDA = CONFIG && CONFIG.id_currency;

