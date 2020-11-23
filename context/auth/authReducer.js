import {REGISTRO_EXITOSO,
        REGISTRO_ERROR,
        USUARIO_AUTENTICADO,
        LIMPIAR_ERROR} from "../../type";


export default (state, action) => {
    switch (action.type) {
        case REGISTRO_ERROR:
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
        case USUARIO_AUTENTICADO:
            return{
                ...state,
                usuario: action.payload
            }
        default:
            return state;
    }
}