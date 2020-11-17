import React from 'react';

const Layout = (props) => {
    return ( 
        <>
            <h1>Hola mundo esta es la navegacion</h1>

            {props.children}
        </>
     );
}
 
export default Layout;