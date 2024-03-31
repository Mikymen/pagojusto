import { VECINOS } from "../../Tools/CoreData";

const Propietarios = () => {
    return ( 
        <>
            <h4>Propietarios</h4>
            <table>
                <thead>
                    <tr>
                        <th>Departamento</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {VECINOS.map(vecino=>(
                        <tr key={vecino.id}>
                            <td>{vecino.departamento}</td>
                            <td>{vecino.nombre}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
            [Editar, Agregar, Eliminar]
            Proximamente...
        </>
     );
}
 
export default Propietarios;