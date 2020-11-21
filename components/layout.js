import React from 'react';
import Head from "next/head";
import Header from "./Header";
import styled from "@emotion/styled";

const Contenedor = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    main{
        margin-top: 20px;
    }
`;
 
const Layout = (props) => {
    return ( 
        <>
            <Head>
                <title>ReactNodeSend</title>
            </Head>
            
            <div>
                <Contenedor>
                    <Header/>
                    <main>
                        {props.children}
                    </main>
                </Contenedor>
            </div>
        </>
     );
}
 
export default Layout;