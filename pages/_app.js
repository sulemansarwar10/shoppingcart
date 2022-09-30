import '../styles/globals.css'
import Shopstate from '../context/Shopstate'
function MyApp({ Component, pageProps }) {
  return <>
 <Shopstate>
  <Component {...pageProps} />
 </Shopstate>
 </> 
}

export default MyApp
