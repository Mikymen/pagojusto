import { Currency } from "./Currency";

let DATA = {
  servicios: [
    {
      id: 0,
      nombre: "Agua",
      medida: "Metros cubicos",
      av: "m3",
      //id_moneda: "BOB",
    },
    {
      id: 1,
      nombre: "Electricidad",
      medida: "Kilovatio-hora",
      av: "kWh",
    },
    {
      id: 2,
      nombre: "Internet",
      medida: "Ancho de banda",
      av: "MB",
    },
    {
      id: 3,
      nombre: "Expensas propiedad por superficie",
      medida: "Metro cuadrado",
      av: "m2",
    },
    {
      id: 4,
      nombre: "Expensas propiedad por individuo",
      medida: "Cantidad de personas",
      av: "persona",
    },
  ],
  facturas: [
    {
      id: 0,
      id_servicio: 0,
      anio: 2022,
      mes: 1,
      consumo_anterior: 29,
      consumo_actual: 35,
      consumo_final: 6,
      total_pago: 224,
      tarifa: 4,
      fecha:"2011-10-05T14:48:00.000Z",
    },
  ],
  vecinos: [
    { id: 0, nombre: "Juan Perez", departamento: "A50" },
    { id: 1, nombre: "Alejandra Gutierrez", departamento: "A51" },
    { id: 2, nombre: "Marco Antonio", departamento: "A53" },
    { id: 3, nombre: "Cristhian Chavez", departamento: "A54" },
    { id: 4, nombre: "Andrea Castellon", departamento: "B55" },
    { id: 5, nombre: "Erick Torrez", departamento: "B56" },
  ],
  cobros: [
    {
      id: 0,
      id_factura: 0,
      id_vecino: 0,
      consumo_anterior: 25,
      consumo_actual: 30,
      consumo_final: 5,
      total_pago: 200,
    },
    {
      id: 1,
      id_factura: 0,
      id_vecino: 1,
      consumo_anterior: 4,
      consumo_actual: 5,
      consumo_final: 1,
      total_pago: 24,
    },
  ],
};

if (typeof localStorage.DATA !== "undefined") {
  DATA = JSON.parse(localStorage.DATA);
} else {
  localStorage.setItem("DATA", JSON.stringify(DATA));
}

let facturas=DATA.facturas.map((factura) => {
    let serv = DATA.servicios.find(
      (servicio) => factura.id_servicio === servicio.id
    );
    factura["servicio"] = serv;
    return factura;
  });


  let cobros = DATA.cobros.map(cobro=>{
    let vecino = DATA.vecinos.find(
        vec => vec.id === cobro.id_vecino
    );
    let factura = DATA.facturas.find(
        fact => fact.id_factura === cobro.id_factura
    );
    cobro["vecino"] = vecino;
    cobro["factura"] = factura;
    return cobro;
  })

export const FACTURAS = facturas;

export const SERVICIOS = DATA.servicios;

export const VECINOS = DATA.vecinos;

export const COBROS = cobros;

export const ServicioById=(id)=>{
    return SERVICIOS.find(servicio => servicio.id === id);
}

export const FACTURA_BY_SERVICIO = (id)=>{
    let factura = facturas.filter(fact => fact.id_servicio === id);
    return factura;
}
export const FACTURA_BY_ID = (id) =>{
    return facturas.find(fact => fact.id === id);
}
export const CobrosByFacturaId = (id)=>{
    return cobros.filter(cobro => cobro.id_factura === id);
}

export const GuardarFactura = (id_servicio, anio, mes, consumo_anterior, consumo_actual, consumo_final, total_pago, tarifa, dataCobros)=>{
  let lastFactura_id = facturas[facturas.length -1].id;
  let factura={
    id: lastFactura_id + 1,
    id_servicio,
    anio,
    mes,
    consumo_anterior,
    consumo_actual,
    consumo_final,
    total_pago,
    tarifa,
    fecha: (new Date()).toISOString()
  };
  DATA.facturas.push(factura);

  let lastCobro_id = cobros[cobros.length -1].id;
  lastCobro_id+=1;
  
  dataCobros.forEach(cobro => {
    DATA.cobros.push({
      id: lastCobro_id++,
      id_factura: lastFactura_id + 1,
      id_vecino: cobro.id_vecino,
      consumo_anterior: cobro.consumo_anterior,
      consumo_actual: cobro.consumo_actual,
      consumo_final: cobro.consumo_final,
      total_pago: cobro.total_pago,
    })
  });

  
  localStorage.setItem("DATA", JSON.stringify(DATA));
  DATA = JSON.parse(localStorage.DATA);

  return lastFactura_id + 1;
}
