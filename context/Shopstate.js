import React, { useState } from "react";
import Shopcontext from "./shopcontext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Shopstate = (props) => {

  const [User, setUser] = useState({ name: "", email: "", token: "" })


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
      // console.log("sign in response", json)
      // if (json.success) {

      //   successtoast(json.msg)
      //   localStorage.setItem("token", json.authtoken)
      //   setUser({ name: user.fname, email: user.email, token: json.authtoken })
      // } else {
      //   warntoast(json.msg)
      // }
    } catch (error) {

    }


  }
  return (
    <>
      <Shopcontext.Provider value={{ successtoast, warntoast, login, User, setUser }}>
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