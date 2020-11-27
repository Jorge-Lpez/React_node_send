import React, { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import clienteAxios from "../../config/axios";
import {
    LIMPIAR_ERROR,
    SUBIR_ARCHIVO_ERROR,
    SUBIR_ARCHIVO_EXITO,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR, 
    MOSTRAR_ALERTA,
    SUBIR_ARCHIVO,
    LIMPIAR_STATE,
    OBTENER_PASSWORD,
    OBTENER_DESCARGAS} from "../../type";

const AppState = ( { children } ) => {

    //State inicial para nuestro context
    const initialState = {
        mensaje_archivo: "",
        nombre: "",
        nombre_original: "",
        cargando: null,
        descargas: 1,
        password: "",
        autor: null,
        url: ""
    };
    //State para context
    const [state, dispatch] = useReducer(appReducer, initialState);

    //Mostrando error para archivos grandes
    const ErrorLimite = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ERROR
            });
        }, 3000);
    }

    //Funcion subiendo archivos 
    const SubiendoArchivos = async (formData, nombre_original) => {
        dispatch({
            type: SUBIR_ARCHIVO
        });
        try {
            const resultado = await clienteAxios.post("/api/archivos", formData);
            console.log(resultado.data);

            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data.archivo,
                    nombre_original
                }
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            });
        }
    };

    //Creando enlace
    const crearEnlace = async () => {
        try {
            const datos = {
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor
            }
            const respuesta = await clienteAxios.post("/api/enlaces", datos);
            //console.log(respuesta.data.msg);
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: respuesta.data.msg
            });
        } catch (error) {
            console.log(error);
        } 
    }

    //Limpiar state 
    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        });
    }

    //Obtener contraseña  
    const passwordEnlace = (password) => {
        dispatch({
            type: OBTENER_PASSWORD,
            payload: password
        });
    }

    // obtener numero de descargas
    const descargaEnlace = (descargas) => {
        dispatch({
            type: OBTENER_DESCARGAS,
            payload: descargas
        });
    }

    return (
        <appContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                ErrorLimite,
                SubiendoArchivos,
                crearEnlace,
                limpiarState,
                passwordEnlace,
                descargaEnlace
            }}
        >
            {children}
        </appContext.Provider>
    );
}

export default AppState;