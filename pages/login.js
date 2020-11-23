import React, { useContext, useEffect } from 'react';
import Layout from "../components/layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "../context/auth/authContext";
import Alerta from "../components/alerta";
import { useRouter } from "next/router"

const Login = () => {

    const AuthContext = useContext(authContext);
    const { mensaje, autenticado, iniciarSesion } =  AuthContext;
    const router = useRouter();
    
    useEffect(() => {
        if(autenticado){
            router.push("/");
        }
    }, [autenticado])

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            password: Yup.string().required("El password no puede ir vacio")
        }),
        onSubmit: valores => {
            iniciarSesion(valores);
        },
    });
    return ( 
        <>
            <Layout>
            <div className="">
                <h2 className="">Iniciar Sesion</h2>
                {mensaje ? <Alerta/> : null}
                <div className="formulario">
                        <form
                            onSubmit={formik.handleSubmit}
                        >
                            <div>
                                <label htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email usuario"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value= {formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? 
                                    <div className="error">
                                        <p>Error</p>
                                        <div>{formik.errors.email}</div>
                                    </div>
                                 : null}
                            </div>
                            <div>
                                <label htmlFor="password">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password usuario"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value= {formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password ? 
                                    <div className="error">
                                        <p>Error</p>
                                        <div>{formik.errors.password}</div>
                                    </div>
                                 : null}
                            </div>
                            <input
                                className="boton"
                                type="submit"
                                value="Iniciar Sesion"
                            />
                        </form>
                </div>
            </div>
        </Layout>
        </>
     );
}
 
export default Login;