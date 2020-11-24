import React, { useContext } from 'react';
import styled from "@emotion/styled";
import Link from "next/link";
import styles from '../styles/Home.module.css';
//import authContext from "../context/auth/authContext";

const Encabezado = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    img{
        cursor: pointer;
        width: 268px;
        justify-content: center;
    }
    nav{
        display: flex;
        flex-direction: column;
    }
    @media (min-width: 768px){
        flex-direction: row;
        justify-content: space-between;
        nav{
            flex-direction: row;
        }
    }
`;

const NavLink = styled.a`
    color: white;
    padding: 10px;
    background-color: #E5514E;
    margin-right: 10px;
    border-radius: 10px;
    font-weight: bold;
    cursor:pointer;

    @media (max-width: 768px){
        width:120px;
        margin-bottom: 10px;
    }
`;

const Header = () => {

   // const AuthContext = useContext(authContext);
    //const { autenticado } = AuthContext;

    return ( 
        <Encabezado>
            <Link href="/">
                <img src="logo.svg"/>
            </Link>

            <nav className="">
                
                <Link href="/login">
                    <NavLink>Iniciar Sesion</NavLink>
                </Link>
                
                <Link href="/crearcuenta">
                    <NavLink className={styles.crear}>Crear Cuenta</NavLink>
                </Link>
            </nav>
        </Encabezado>
     );
}
 
export default Header;