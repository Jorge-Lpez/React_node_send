import Layout from "../../components/layout";
import clienteAxios from "../../config/axios";
import styled from "@emotion/styled";
import React, { useState, useContext } from 'react';
import appContext from "../../context/app/appContext";
import Alerta from "../../components/alerta";

export async function getServerSideProps({params}) {
    //console.log(props.params.enlace);
    const { enlace } = params;
    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);
    console.log(resultado);
    return{
        props: {
            enlace : resultado.data
        }
    }

}

export async function getServerSidePaths(){
        const enlaces = await clienteAxios.get("/api/enlaces");  
        //console.log("esto es " + enlaces);    
        return{
            paths: enlaces.data.enlaces.map( enlace => ({
                params: { enlace : enlace.url }
            })),
            fallback: false 
        }
}

const DescargaArchivo = styled.div`
    max-width: 900px;
    margin: 40px auto;
    text-align: center;
    .boton{
        display: block;
        width: 100px; 
        margin: auto;
    }
    form{
        margin: 0 auto;
        border: 2px solid white;
        background-color: white;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        box-shadow: 4px 4px 3px rgba(0,0,0,0.2);
        label{
            text-align: left;
            
            padding: 10px 0;
            font-weight: bold;
        }
        input[type="password"]{
            padding: 10px;
            margin-bottom: 10px;
        }
        input[type="submit"]{
            width: 100%;
        }
    }
`;


export default ({enlace}) => {
    const AppContext = useContext(appContext);
    const { ErrorLimite, mensaje_archivo } = AppContext;
    //Stata para guardar si hay o no contraseña
    const [estadoPassword, setEstadoPassword ] = useState(enlace.password);
    //Guardar password 
    const [ getPassword, setPassword] = useState("");


    const verificarPassword = async e => {
        e.preventDefault();
        const data = {
            password: getPassword
        }

        try {
            const respuesta = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
            setEstadoPassword(respuesta.data.password); 
        } catch (error) {
            ErrorLimite(error.response.data.msg);
        }
    }

    return ( 
        <Layout>
            <DescargaArchivo>
                    {estadoPassword ? 
                            <> 
                                { mensaje_archivo && <Alerta/>}
                                <p>Este Enlace esta protegido por un password, colocalo a continuacion</p>
                                <div>
                                    <form
                                        onSubmit={(e) => verificarPassword(e)}
                                    >
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            value={getPassword}
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />
                                        <input
                                            className="boton"
                                            type="submit"
                                        />
                                    </form>
                                </div>
                            </>
                        : 
                        <div>
                            <h1>Descargar tu archivo: </h1>
                            <a className="boton"
                            href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                            
                            >
                                Aquí
                            </a>
                        </div>
                    }
            </DescargaArchivo>
        </Layout>
     );

}