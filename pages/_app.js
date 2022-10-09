import '../styles/globals.css'
import Shopstate from '../context/Shopstate'
import Footer from '../components/footer'
import Header from '../components/header'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return <>
    <Shopstate>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Shopstate>
  </>
}

export default MyApp
