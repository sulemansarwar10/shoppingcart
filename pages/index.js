import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Italia Food Hub</title>
        <meta name="Italia Food Hub" content="All items are made by home chef" />
        <link rel="icon" href="/logo1.svg" />
      </Head>

    </div>
  )
}
