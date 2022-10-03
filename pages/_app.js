import '../styles/globals.css'
import Shopstate from '../context/Shopstate'
import Footer from '../components/footer'
import Header from '../components/header'
function MyApp({ Component, pageProps }) {
  return <>
    <Shopstate>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Shopstate>
  </>
}

export default MyApp
