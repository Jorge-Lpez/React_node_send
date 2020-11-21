import React from 'react';
import styled from "@emotion/styled";

const Encabezado = styled.header`
    padding: 40px 0;
    display: flex;
    justify-content: center;
    img{
        width: 268px;
        margin-bottom: 8rem;
    }

    @media (min-width: 768px) {
        justify-content: flex-start;
    }
`;

const Header = () => {
    return ( 
        <Encabezado>
            <img src="logo.svg"/>
        </Encabezado>
     );
}
 
export default Header;