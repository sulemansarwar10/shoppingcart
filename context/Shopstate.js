import React, { useState } from "react";
import Shopcontext from "./shopcontext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Shopstate = (props) => {

  const [Userdata, setUserdata] = useState({ name: "", email: "", token: "" })
  const [cart, setcart] = useState({})

  const addtocart = (p) => {
    let newcart = cart
    const { name, img, price, category } = p
    if (name in cart) {
      newcart[name].qty = cart[name].qty + 1
    }
    else {
      newcart[name] = { name, img, price, category, qty: 1 }

    }
    setcart(newcart)
    savecart(newcart)
  }
  const removetocart = (p) => {
    let newcart = cart
    const { name, img, price, category } = p
    if (name in cart) {
      newcart[name].qty = cart[name].qty - 1
    }
    if (newcart[name].qty <= 0 && name in cart) {
      delete newcart[name]

    }
    setcart(newcart)
    savecart(newcart)
  }
  const clearcart = () => {
    setcart({})
    localStorage.removeItem("cart")
  }
  const savecart = (p) => {
    localStorage.setItem("cart", JSON.stringify(p))
  }
  const checktoken = async () => {
    try {
      const response = await fetch(
        `/api/authtoken`,
        {
          body: JSON.stringify({ token: localStorage.getItem("token") }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST'
        }
      );

      const json = await response.json(); // parses JSON response into native JavaScript objects
      if (json.success) {
        setUserdata({ name: json.User.name, email: json.User.email, token: localStorage.getItem("token") })
      } else {
        setUserdata({ name: "", email: "", token: "" })
        localStorage.removeItem("token")
      }
    } catch (error) {

    }
  }


  const successtoast = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const warntoast = (msg) => {
    toast.warn(msg, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const login = async (user) => {

    try {
      const response = await fetch(
        `/api/signin`,
        {
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST'
        }
      );

      const json = await response.json(); // parses JSON response into native JavaScript objects
      return json;
    } catch (error) {

    }


  }
  return (
    <>
      <Shopcontext.Provider value={{ successtoast, warntoast, login, Userdata, setUserdata, checktoken, addtocart, removetocart, clearcart, cart, setcart }}>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {props.children}
      </Shopcontext.Provider>
    </>
  )
}

export default Shopstate;