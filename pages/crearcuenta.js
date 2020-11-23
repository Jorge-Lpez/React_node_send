import React, { useContext, useEffect } from 'react';
import Layout from "../components/layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "../context/auth/authContext";
import Alerta from "../components/alerta";

const CrearCuenta = () => {

    //Acceder al state 
    const AuthContext = useContext(authContext);
    const { mensaje, registrarUsuario } = AuthContext;
     
    //console.log(mensaje);
    const formik = useFormik({
        initialValues: {
            nombre: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("El nombre es obligatorio"),
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            password: Yup.string().required("El password no puede ir vacio").min(6, "El password debe contener 6 caracteres")
        }),
        onSubmit: valores => {
            registrarUsuario(valores);
        },
    });
    return ( 
        <Layout>
            <div className="">
                <h2 className="">Crear cuenta</h2>
                {mensaje ? <Alerta></Alerta> : null}
                <div className="formulario">
                        <form
                            onSubmit={formik.handleSubmit}
                        >
                            <div>
                                <label htmlFor="nombre">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    placeholder="Ingresa tu nombre"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value= {formik.values.nombre}
                                />
                                {formik.touched.nombre && formik.errors.nombre ? 
                                    <div className="error">
                                        <p>Error</p>
                                        <div>{formik.errors.nombre}</div>
                                    </div>
                                 : null}
                            </div>
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
                                value="Crear Usuario"
                            />
                        </form>
                </div>
            </div>
        </Layout>
     );
}

//className="md:w-4/5 xl:w-3/5 mx-auto mb-32"
//className="text-4xl font-sans font-bold text-gray-800 text-center my-4"
 
export default CrearCuenta;