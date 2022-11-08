import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { successtoast, warntoast } from '../slice/toastslice'

function Forgot() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [user, setuser] = useState({ email: "" })
    const onchange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    const submithandle = async (e) => {
        e.preventDefault();

        if (user.email == "") {
            dispatch(warntoast('please fill all fields'))
        }
        else {
            try {
                const response = await fetch(
                    `/api/passreset`,
                    {
                        body: JSON.stringify(user),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST'
                    }
                );

                const json = await response.json(); // parses JSON response into native JavaScript objects
                if (json.success) {

                    dispatch(successtoast(json.msg))
                    setuser({ email: "" })
                } else {
                    dispatch(warntoast(json.msg))
                }
            } catch (error) {

            }

        }
    }
    return (
        <div>
            <div className="font-mono bg-green-100">

                <div className="container mx-auto">
                    <div className="flex justify-center px-6 my-12">
                        <div className="w-full xl:w-3/4 lg:w-11/12 flex">

                            <img
                                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                                src='https://source.unsplash.com/FnA5pAzqhMM/600x800' alt="forgot password"
                            />

                            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                                <div className="px-8 mb-4 text-center">
                                    <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                                    <p className="mb-4 text-sm text-gray-700">
                                        We get it, stuff happens. Just enter your email address below and we&apos;ll send you a
                                        link to reset your password!
                                    </p>
                                </div>
                                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" >
                                            Email
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter Email Address..."
                                            value={user.email} onChange={onchange}
                                        />
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button
                                            className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={submithandle}
                                        >
                                            Reset Password
                                        </button>
                                    </div>
                                    <hr className="mb-6 border-t" />
                                    <div className="text-center">
                                        <a
                                            className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 hover:cursor-pointer"
                                            onClick={() => router.push('/signup')}
                                        >
                                            Create an Account!
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

export default Forgot