//import styles from '../styles/Home.module.css'
import Layout from "../components/layout";
import authContext from "../context/auth/authContext";
import React, { useContext } from 'react';

export default function Home() {
  
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <Layout>
        <h1>Hola mundo</h1>
    </Layout>
  )
}
