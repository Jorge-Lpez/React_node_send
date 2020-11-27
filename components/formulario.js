import React, {useContext} from 'react';
import styled from "@emotion/styled";
import appContext from "../context/app/appContext";

const Descargas = styled.div`
    margin: 0;
    padding: 0;
    .cajas{
        width: 100%;
        label{
            width: 80%;
            font-weight: bold;
            font-size: 1.2rem;
            text-align: left;
        }
        select{
            border: 1px solid blue;
            width: 80%;
            padding: 10px;
            font-size: 20px;
            margin-top: 10px;
        }
        input{
            width:80%;
            height: 30px;
            margin-top: 10px;
        }
    }
`;

const Formulario = () => {

    const AppContext = useContext(appContext);
    const { passwordEnlace, descargaEnlace } = AppContext;

    return ( 
        <Descargas>
            <div className="cajas">
                <label>Eliminar tras:</label>
                <select
                    onChange={(e)=> descargaEnlace(parseInt(e.target.value))}
                >
                    <option>--Seleccione--</option>
                    <option value="1">1 Descarga</option>
                    <option value="5">5 Descarga</option>
                    <option value="10">10 Descarga</option>
                    <option value="20">20 Descarga</option>
                </select>
            </div>
            <div className="cajas">
                <label>
                    Agrega una contraseña si lo deseas.
                </label>
                <input
                    type="password"
                    onChange={(e) => passwordEnlace(e.target.value) }
                />
            </div>
        </Descargas>
     );
}
 
export default Formulario;