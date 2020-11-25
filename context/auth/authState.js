import React, { useReducer } from 'react';
import authContext from "./authContext";
import authReducer from "./authReducer";
import tokenAuth from "../../config/tokenAuth";
//import { useRouter } from "next/router"
import { REGISTRO_ERROR, 
        REGISTRO_EXITOSO, 
        USUARIO_AUTENTICADO,
        LIMPIAR_ERROR,
        LOGIN_EXITOSO,
        CERRAR_SESION,
        LOGIN_ERROR} from "../../type";
import clienteAxios from "../../config/axios";

const AuthState = ({children}) => {
   
    //Definir un state inicial
    const initialState = {
        token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
        autenticado: null,
        usuario: null,
        mensaje: null
    };

    //Definir el reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    //Registrar usuario
    const registrarUsuario = async (datos) => {
        try {
            const repuesta = await clienteAxios.post("/api/usuarios", datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: repuesta.data.msg
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            });
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ERROR
            });
        }, 3000);
        //
        //Blqueo por cords 
        //console.log(datos);
        //dispatch();
    }

    //Autentica Usuarios
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post("/api/auth", datos);
            //console.log(respuesta.data.token);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ERROR
            });
        }, 3000);
    }

    
    //Retornar el usuario autenticado en base al JWT
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem("token");
        //console.log(token + " si hay");
        if(token){
            tokenAuth(token);
        }else{
            tokenAuth();
        }

        try {
            const respuesta = await clienteAxios.get("/api/auth");
            //console.log(respuesta.data.usuario);    
            dispatch({
                type: USUARIO_AUTENTICADO,
                payload: respuesta.data.usuario
            });  
        } catch (error) {
            console.log(error);
        }
    }   
    
    //Cerrar la sesion 
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }

    return ( 
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                usuarioAutenticado,
                iniciarSesion,
                cerrarSesion
             }}
        >
            {children}
        </authContext.Provider>
     );
}
 
export default AuthState;