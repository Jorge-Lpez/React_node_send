import React, {useCallback, useContext } from 'react';
import  { useDropzone } from "react-dropzone";
import Spinner from "./spinner";
import styled from "@emotion/styled";
import appContext from '../context/app/appContext';

const Archivos = styled.div`
    height: 100%;
    input{
        height: 100%;
    }
    div{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        align-items: center;
        button{
        background-color: #4C44F1;
        border: none;
        padding: 10px;
        width: 80%;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        font-size: 1rem;
            :hover{
                background-color: #635CF3;
            }
        }
    }

    p{
        font-size: 1.6rem;
    }
`;

const Lista = styled.ul`
    border: 1px solid red;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    li{
        list-style: none;
        background-color: white;
        border: 2px solid white;
        box-shadow: 3px 3px 3px rgba(0,0,0,0.2);
        margin: 0 20px 0 20px;
        p{
            text-align: center;
            font-size: 16px;
        }
        .mega{
            font-size: 0.8rem;
        }
    }
    h2{
        margin: 0;
    }
    button{
        background-color: #4C44F1;
        border: none;
        padding: 10px;
        width: 80%;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        margin: 20px 20px 0 40px;
            :hover{
                background-color: #635CF3;
            }
        }
`;

const Dropzone = () => {

    //LLamando funciones y state del context 
    const AppContext = useContext(appContext);
    const {cargando, ErrorLimite, SubiendoArchivos, crearEnlace } = AppContext;

    const onDropRejected = () => {
        ErrorLimite("No se puedo subir, Sobrepasa el limite para subir archivos grandes crea una cuenta");
    }

    const onDropAccepted= useCallback(async (acceptedFiles) => {
        //console.log(acceptedFiles);
        //Crear un form Data
        const formData = new FormData();
        formData.append("archivo", acceptedFiles[0]);

        SubiendoArchivos(formData, acceptedFiles[0].path);
    }, []);
    // onDrop {Acepta todos los archivos aunque al aceptarlo tenga fallas por ecceder el tamaño o el formato}
    // onDropAccepted {Acepta los archivos que son aceptados por la configuracion y el backend}
    // onDropRejected {aqui caen los archivos que no sean aceptados}
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000});

    const archivos = acceptedFiles.map(archivo => (
        <li key={archivo.lastModified}>
            <p>{archivo.path}</p>
            <p className="mega">{(archivo.size / Math.pow(1024,2)).toFixed(2)} MB</p>
        </li>
    ));


    return (
    <>
        <div className="dropzonep">
              <Archivos { ...getRootProps({ className: "dropzone"})}>
                  { acceptedFiles.length > 0 ?

                    <Lista>
                        <h2>Archivos</h2>
                        {archivos}
                        {cargando ? 
                            <Spinner/>
                        :
                            <button
                                type="button"
                                onClick={() => crearEnlace()}
                            >
                                Crear Enlace
                            </button>
                        }
                    </Lista>
                  :
                  <>
                    <input
                    { ...getInputProps() }
                        />
                        {
                            isDragActive ? 
                            <div>
                                <p className="soltar">Suelta el Archivo</p>
                            </div>
                            :
                            <div>
                                <p>Selecciona un archivo y arrastralo aqui</p>
                                <button
                                type="button"
                                >
                                    Selecciona archivos para subir
                                </button>
                            </div>
                    }
                </>
                }
              </Archivos>
        </div>
    </>
     );
}
 
export default Dropzone;