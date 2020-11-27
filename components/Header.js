import React, { useContext, useEffect } from 'react';
import styled from "@emotion/styled";
import Link from "next/link";
import styles from '../styles/Home.module.css';
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import { useRouter } from "next/router";
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

const CerrarCuenta = styled.div`
    display: flex;
    @media (max-width: 768px){
        margin-top: 10px;
    }
    button{
        background-color: black;
        color: white;
        border: none;
        font-weight: bold;
        font-size: 1.2rem;
    }

    button:hover{
        background-color: #E5514E;
    }

    p{
        font-weight: bold;
        margin-right: 20px;
    }
`;

const Header = () => {

    const AuthContext = useContext(authContext);
    const { usuario, cerrarSesion } = AuthContext;

    const AppContext = useContext(appContext);
    const {  limpiarState } = AppContext;

    const router = useRouter();
    const direccionar = () => {
        limpiarState();
        router.push("/");
    }

    return ( 
        <Encabezado>
            <img 
                src="/logo.svg"
                onClick={ () => direccionar()}
            />   

            <nav className="">
                {usuario ?
                    (<CerrarCuenta>
                        <p>Hola: {usuario.nombre}</p>
                        <button
                            type="button"
                            className="hola"
                            onClick={() => cerrarSesion()}
                        >
                            Cerrar Sesion
                        </button>
                    </CerrarCuenta>)
                :
                    (<>
                        <Link href="/login">
                            <NavLink>Iniciar Sesion</NavLink>
                        </Link>
                        
                        <Link href="/crearcuenta">
                            <NavLink className={styles.crear}>Crear Cuenta</NavLink>
                        </Link>
                    </>)
                }
            </nav>
        </Encabezado>
     );
}
 
export default Header;