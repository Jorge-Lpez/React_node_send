import Layout from "../../components/layout";
import clienteAxios from "../../config/axios";

export async function getStaticProps(props) {
    //console.log(props.params.enlace);
    const resultado = await clienteAxios.get(`/api/enlaces/${props.params.enlace}`);
    return{
        props: {
            enlace : resultado.data
        }
    }

}

export async function getStaticPaths(){
        const enlaces = await clienteAxios.get("/api/enlaces");      
        return{
            paths: enlaces.data.enlaces.map( enlace => ({
                params: { enlace : enlace.url }
            })),
            fallback: false 
        }
}


export default ({enlace}) => {
    
   //console.log(enlace);

    return ( 
        <Layout>
            <h1>Descargar tu archivo: </h1>
            <div>
                <a
                    href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                    
                >
                    Aquí
                </a>
            </div>
        </Layout>
     );

}