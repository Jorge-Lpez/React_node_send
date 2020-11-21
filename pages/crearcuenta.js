import React from 'react';
import Layout from "../components/layout";

const CrearCuenta = () => {
    return ( 
        <Layout>
            <div className="">
                <h2 className="">Crear cuenta</h2>
                <div className="formulario">
                        <form>
                            <div>
                                <label htmlFor="nombre">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    placeholder="Ingresa tu nombre"
                                />
                            </div>
                            <div>
                                <label htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email usuario"
                                />
                            </div>
                            <div>
                                <label htmlFor="password">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="password usuario"
                                />
                            </div>
                            <input
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