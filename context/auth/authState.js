import React, { useReducer } from 'react';
import authContext from "./authContext";
import authReducer from "./authReducer";
import { REGISTRO_ERROR, 
        REGISTRO_EXITOSO, 
        USUARIO_AUTENTICADO,
        LIMPIAR_ERROR,
        LOGIN_EXITOSO,
        LOGIN_ERROR} from "../../type";
import clienteAxios from "../../config/axios";

const AuthState = ({children}) => {
   
    //Definir un state inicial
    const initialState = {
        toke: typeof window !== "undefined" ? localStorage.getItem("token") : "",
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
            console.log(respuesta.data.token);
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
        console.log("Revisando...");
    }

    return ( 
        <authContext.Provider
            value={{
                toke: state.toke,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                usuarioAutenticado,
                iniciarSesion
             }}
        >
            {children}
        </authContext.Provider>
     );
}
 
export default AuthState;