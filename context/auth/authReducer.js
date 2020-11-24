import {REGISTRO_EXITOSO,
        REGISTRO_ERROR,
        USUARIO_AUTENTICADO,
        LIMPIAR_ERROR,
        LOGIN_EXITOSO,
        LOGIN_ERROR} from "../../type";


export default (state, action) => {
    switch (action.type) {
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
        case REGISTRO_EXITOSO:
            return{
                ...state,
                mensaje: action.payload
            }
        case LIMPIAR_ERROR:
            return{
                ...state,
                mensaje: null
            }
        case LOGIN_EXITOSO:
            localStorage.setItem("token", action.payload);
            return{
                ...state,
                token: action.payload,
                autenticado: true
            }
        default:
            return state;
    }
}