import React, { useReducer } from 'react';
import authContext from "./authContext";
import authReducer from "./authReducer";
import { REGISTRO_ERROR, 
        REGISTRO_EXITOSO, 
        USUARIO_AUTENTICADO,
        LIMPIAR_ERROR } from "../../type";
import clienteAxios from "../../config/axios";

const AuthState = ({children}) => {
   
    //Definir un state inicial
    const initialState = {
        toke: "",
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
    //Usuario autenticado 
    const usuarioAutenticado = nombre => {
        dispatch({
            type: USUARIO_AUTENTICADO,
            payload: nombre   
        });
    }

    return ( 
        <authContext.Provider
            value={{
                toke: state.toke,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                usuarioAutenticado
             }}
        >
            {children}
        </authContext.Provider>
     );
}
 
export default AuthState;