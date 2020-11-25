import React, { useContext } from 'react';
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";

const Alerta = () => {
    const AuthContext = useContext(authContext);
    const { mensaje } = AuthContext;

    const AppContext = useContext(appContext);
    const { mensaje_archivo } = AppContext;

    return ( 
        <div className="correcto"><p>{mensaje || mensaje_archivo}</p></div>
     );
}
 
export default Alerta;