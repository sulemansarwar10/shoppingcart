import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function signup() {
    const router = useRouter()
    const [user, setuser] = useState({ fname: "", lname: "", email: "", contact: "", password: "", cpassword: "" })
    const onchange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
        //  console.log(user)
    }
    const submithandle = async (e) => {
        e.preventDefault();
        if (user.fname == "" || user.lname == "" || user.email == "" || user.contact == "" || user.password == "" || user.cpassword == "") {
            toast.warn('please fill all fields', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (user.password !== user.cpassword) {
            toast.warn('Passwards are not matching', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {

            try {
                const response = await fetch(
                    `/api/user`,
                    {
                        body: JSON.stringify(user),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST'
                    }
                );

                const json = await response.json(); // parses JSON response into native JavaScript objects

                console.log("sign in response", json)
                if (json.success) {
                    toast.success(json.msg, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setuser({ fname: "", lname: "", email: "", contact: "", password: "", cpassword: "" })
                } else {
                    toast.warn(json.msg, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } catch (error) {

            }

        }
    }

    return (
        <div>
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
            <div className="font-mono ">

                <div className="container mx-auto">
                    <div className="flex justify-center px-6 my-12">

                        <div className="w-full xl:w-3/4 lg:w-11/12 flex">

                            <img
                                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-2/4 bg-cover rounded-l-lg"
                                src='https://source.unsplash.com/4A9IELfRdwE/600x800'
                            />

                            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                                <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                    <div className="mb-4 md:flex md:justify-between">
                                        <div className="mb-4 md:mr-2 md:mb-0">
                                            <label className="block mb-2 text-sm font-bold text-gray-700" >
                                                First Name
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                name="fname"
                                                id="fname"
                                                type="text"
                                                placeholder="First Name"
                                                value={user.fname} onChange={onchange}
                                            />
                                        </div>
                                        <div className="md:ml-2">
                                            <label className="block mb-2 text-sm font-bold text-gray-700" >
                                                Last Name
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                name="lname"
                                                id="lname"
                                                type="text"
                                                placeholder="Last Name"
                                                value={user.lname} onChange={onchange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" >
                                            Email
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            name="email"
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            value={user.email} onChange={onchange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" >
                                            Contact No
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            name="contact"
                                            id="contact"
                                            type="text"
                                            placeholder="Contact No"
                                            value={user.contact} onChange={onchange}
                                        />
                                    </div>
                                    <div className="mb-4 md:flex md:justify-between">
                                        <div className="mb-4 md:mr-2 md:mb-0">
                                            <label className="block mb-2 text-sm font-bold text-gray-700" >
                                                Password
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                name="password"
                                                id="password"
                                                type="password"
                                                placeholder="******************"
                                                value={user.password} onChange={onchange}
                                            />
                                            {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
                                        </div>
                                        <div className="md:ml-2">
                                            <label className="block mb-2 text-sm font-bold text-gray-700" >
                                                Confirm Password
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                name="cpassword"
                                                id="cpassword"
                                                type="password"
                                                placeholder="******************"
                                                value={user.cpassword} onChange={onchange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button
                                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={submithandle}
                                        >
                                            Register Account
                                        </button>
                                    </div>
                                    <hr className="mb-6 border-t" />
                                    <div className="text-center">
                                        <a
                                            className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 hover:cursor-pointer"
                                            onClick={() => router.push('/forgot')}
                                        >
                                            Forgot Password?
                                        </a>
                                    </div>
                                    <div className="text-center">
                                        <a
                                            className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 hover:cursor-pointer"
                                            onClick={() => router.push('/login')}
                                        >
                                            Already have an account? Login!
                                        </a>
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

export default signup