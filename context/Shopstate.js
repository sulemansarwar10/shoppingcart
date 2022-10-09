import React, { useState } from "react";
import Shopcontext from "./shopcontext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Shopstate = (props) => {

  const [Userdata, setUserdata] = useState({ name: "", email: "", token: "" })

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
      <Shopcontext.Provider value={{ successtoast, warntoast, login, Userdata, setUserdata, checktoken }}>
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