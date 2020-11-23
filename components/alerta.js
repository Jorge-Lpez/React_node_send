import React, { useContext } from 'react';
import authContext from "../context/auth/authContext";

const Alerta = () => {
    const AuthContext = useContext(authContext);
    const { mensaje } = AuthContext;
    return ( 
        <div className="correcto"><p>{mensaje}</p></div>
     );
}
 
export default Alerta;