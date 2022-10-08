import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import shopcontext from '../context/shopcontext';
function login() {
    const context = useContext(shopcontext)
    const { successtoast, warntoast, login, setUser } = context;

    const router = useRouter()
    const [user, setuser] = useState({ email: "", password: "" })
    const onchange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
        //  console.log(user)
    }
    const submithandle = async (e) => {
        e.preventDefault();

        if (user.email == "" || user.password == "") {
            warntoast('please fill all fields')
        }
        else {
            let response = await login(user)
            console.log("sign in response", response)
            if (response.success) {

                successtoast(response.msg)
                localStorage.setItem("token", response.authtoken)
                setUser({ email: user.email, token: response.authtoken })
                setuser({ email: "", password: "" })
            } else {
                warntoast(response.msg)
                localStorage.clear()
            }
        }
    }

    return (
        <div>
            <div className="antialiased bg-gradient-to-br from-green-100 to-white">
                <div className="container px-6 mx-auto">
                    <div
                        className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center" >
                        <div className="flex flex-col w-full">
                            <div>
                                <svg
                                    className="w-20 h-20 mx-auto md:float-left fill-stroke text-gray-800"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                    ></path>
                                </svg>
                            </div>
                            <h1 className="text-5xl text-gray-800 font-bold">Client Area</h1>
                            <p className="w-5/12 mx-auto md:mx-0 text-gray-500">
                                Control and monitorize your website data from dashboard.
                            </p>
                        </div>
                        <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
                            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
                                <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                                    Sigin
                                </h2>
                                <form action="" className="w-full">
                                    <div id="input" className="flex flex-col w-full my-5">
                                        <label className="text-gray-500 mb-2"
                                        >Email</label>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            placeholder="Please insert your username"
                                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                            value={user.email} onChange={onchange}
                                        />
                                    </div>
                                    <div id="input" className="flex flex-col w-full my-5">
                                        <label className="text-gray-500 mb-2"
                                        >Password</label
                                        >
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Please insert your password"
                                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                            value={user.password} onChange={onchange}
                                        />
                                    </div>
                                    <div id="button" className="flex flex-col w-full my-5">
                                        <button
                                            type="button"
                                            onClick={submithandle}
                                            className="w-full py-4 bg-green-600 rounded-lg text-green-100">
                                            <div className="flex flex-row items-center justify-center">
                                                <div className="mr-2">
                                                    <svg
                                                        className="w-6 h-6"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div className="font-bold">Sigin</div>
                                            </div>
                                        </button>
                                        <div className="flex justify-evenly mt-5">
                                            <a
                                                onClick={() => router.push('/forgot')}
                                                className="w-full text-center font-medium text-gray-500 hover:cursor-pointer"
                                            >Recover password!</a
                                            >
                                            <a
                                                onClick={() => router.push('/signup')}
                                                className="w-full text-center font-medium text-gray-500 hover:cursor-pointer"
                                            >Singup!</a
                                            >
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login