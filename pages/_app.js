import '../styles/globals.css'
import Footer from '../components/footer'
import Header from '../components/header'
import { store } from '../store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {

  return <>
    <Provider store={store}>
      {/* <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      /> */}
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  </>
}

export default MyApp
