import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
        <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Hola mundo</h1>
        
      </div>
    </Layout>
  )
}
