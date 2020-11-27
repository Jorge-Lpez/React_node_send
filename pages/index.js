//import styles from '../styles/Home.module.css'
import React, { useContext, useEffect} from 'react';
import Layout from "../components/layout";
import authContext from "../context/auth/authContext";
import Link from "next/link";
import styled from "@emotion/styled";
import Dropzone from "../components/Dropzone";
import appContext from "../context/app/appContext";
import Alerta from "../components/alerta";

const ContenedorCuerpo = styled.div`
    max-width:900px;
    //height: 80vh;
    margin: 0 auto;
    border: 1px solid white;
    border-radius: 10px;
    background-color: white;
    padding: 10px;
    box-shadow: 3px 3px 3px rgba(0,0,0,0.2);
    margin-top: 100px;

    .contenedor-flex{
      display: flex;
      @media (max-width: 700px){
        flex-direction: column;
        .dropzonep{
          height: 400px;
        }
      }
      .dropzonep{
        flex: 1;
        background-color: #E9E9EE;
        border: 2px dashed #B6B6B9;
        margin: 0 10px 0 10px;
      }
      .cuerpo{
        flex: 1;
        text-align: justify;
        margin:0 10px 10px 0;
        h2{
          text-align: left;
          margin:0;
        }
        p{
          font-weight: 500;
          font-size: 1.3rem;
          span{
            color: #F96D6D;
            font-weight: bold;
          }
        }
        a{
          color: #F96D6D;
          font-weight: bold;
        }
      }
    }

`;

const UrlDiv = styled.div`
    max-width:900px;
    margin: 0 auto;
    margin-top: 100px;
    p{
      text-align: center;
      span{
        color: #E75C5C;
        font-weight: bold;
        font-size: 1.4rem;
        text-transform: uppercase;
      }
    }
    button{
      width: 100%;
    }
`;


export default function Home() {
  
  const AuthContext = useContext(authContext);
  const { token, usuarioAutenticado } = AuthContext;
  
  const AppContext = useContext(appContext);
  const { mensaje_archivo, url } = AppContext;
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      usuarioAutenticado();
    }
  }, []);

  return (
    <Layout>
        { url ?
          <UrlDiv>
              <p><span>Tu URL es: </span> {`${process.env.frontendURL}/enlaces/${url}`} </p>
              <button
                  className="boton"
                  type="button"
                  onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
              > Copiar Enlace</button>
          </UrlDiv>
          :
          <>
            {mensaje_archivo ? 
            <Alerta/>
            :
            null
            }
            <ContenedorCuerpo>
              <div className="contenedor-flex">
                <Dropzone/>
                <div className="cuerpo">
                  <h2>Compartir archivos de forma sencilla y privada</h2>
                  <p><span>ReactNodeSend</span> Te permite compartir archivos de forma sencilla y eficaz,
                  de igual manera protejemos tus datos y te damos beneficios extra si inicias o creas una cuenta 
                  Te permite compartir archivos de forma sencilla y eficaz,
                  de igual manera protejemos tus datos y te damos beneficios extra si inicias o creas una cuenta</p>
                  <Link href="/crearcuenta">
                    <a>Crea un cuenta para mayores beneficios</a>
                  </Link>
                </div>
              </div>
            </ContenedorCuerpo>
          </>
        }
    </Layout>
  )
}
