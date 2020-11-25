import React, { useState, useCallback } from 'react';
import  { useDropzone } from "react-dropzone";
import clienteAxios from "../config/axios";
import styled from "@emotion/styled";

const Archivos = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items:center;
    text-align: center;
    input{
        height: 100%;
    }
    div{
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

    .soltar{
        margin-left: 25%;
    }
`;

const Dropzone = () => {

    const onDrop = useCallback(async (acceptedFiles) => {
        console.log(acceptedFiles);

        //Crear un form Data
        const formData = new FormData();
        formData.append("archivo", acceptedFiles[0]);

        const resultado = await clienteAxios.post("/api/archivos", formData);
        console.log(resultado.data);

    }, []);
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDrop});

    console.log(acceptedFiles.lastModifiedDate);


    return ( 
        <div className="dropzonep">
              <Archivos { ...getRootProps({ className: "dropzone"})}>

                  <input
                    { ...getInputProps() }
                  />
                  {
                      isDragActive ? 
                        <p className="soltar">Suelta el Archivo</p>
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
              </Archivos>
        </div>
     );
}
 
export default Dropzone;