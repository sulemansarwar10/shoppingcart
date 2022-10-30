import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { checktoken, selectUser } from '../slice/userslice'
import { successtoast, warntoast } from '../slice/toastslice'
import { selectCart, addtocart, removetocart, clearcart, checkout, setorderinfo, settoken } from '../slice/cartslice'

const Cart = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [orderinfo, setOrderinfo] = useState({ fname: "", lname: "", email: "", contact: "", address: "" })
    const cart = useSelector(selectCart).items;
    const Userdata = useSelector(selectUser);
    const [disable, setdisable] = useState(true)
    const subtotal = useSelector(selectCart).subtotal;
    const onchange = (e) => {
        setOrderinfo({ ...orderinfo, [e.target.name]: e.target.value })
    }
    const submithandle = async (e) => {
        e.preventDefault();
        if (orderinfo.fname == "" || orderinfo.lname == "" || orderinfo.email == "" || orderinfo.contact == "" || orderinfo.address == "") {
            dispatch(warntoast('please fill all fields'))
        }
        else {
            setdisable(false)

            if (Userdata.token)
                dispatch(settoken(Userdata.token))
            dispatch(setorderinfo(orderinfo))
            let response = await dispatch(checkout())

            if (response && response.payload.success) {

                dispatch(successtoast(response.payload.msg))
                setOrderinfo({ fname: "", lname: "", email: "", contact: "", address: "" })
                dispatch(clearcart())
                router.push('/')
            } else if (response && !response.payload.success) {
                dispatch(warntoast(response.payload.msg))
            }
            setdisable(true)
        }
    }

    if (Object.keys(cart).length == 0)
        return (
            <div className='grid place-content-center font-extrabold min-w-full min-h-screen'>{"Your Cart is Empty"} </div>
        )
    else {
        return (<div className='md:mt-16'>
            <div className="max-w-2xl mx-auto bg-white p-16">


                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                        <input onChange={onchange} value={orderinfo.fname} type="text" name="fname" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                        <input onChange={onchange} value={orderinfo.lname} type="text" name="lname" id="lname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                        <input onChange={onchange} value={orderinfo.contact} type="tel" name="contact" id="contact" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                    <input onChange={onchange} value={orderinfo.email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address</label>
                    <textarea onChange={onchange} value={orderinfo.address} type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" />
                </div>

                <div>
                    <label className="block mt-2 text-2xl font-medium text-gray-900 dark:text-gray-300">Your Cart</label>
                    {Object.keys(cart).map((item, key) => {
                        return <div key={key} className="m-7 flex justify-around border-green-500 border-4">
                            <img src={cart[item].img} className="w-28 h-28" />
                            <div className='mt-5'>
                                <h1 className='font-extrabold'>{cart[item].name}</h1>
                                <h3>Rs. {cart[item].price} X {cart[item].qty}={cart[item].price * cart[item].qty}</h3>
                            </div>
                            <div className='mt-8 flex items-center '>
                                <button className='mx-4 bg-green-300 p-2 rounded-lg' onClick={() => { dispatch(removetocart(cart[item])) }}>-</button>
                                <h3>{cart[item].qty}</h3>
                                <button className='mx-4 bg-green-300 p-2 rounded-lg' onClick={() => { dispatch(addtocart(cart[item])) }}>+</button>
                            </div>

                        </div>
                    })}
                    <div className='font-bold border-green-500 border-t-2 flex justify-between'>

                        <div >Subtotal:</div>
                        <div>Rs. {subtotal}</div>
                    </div>
                    <div className='flex mt-2 justify-around'>
                        <button type="button" className={`grid grid-col-3 m-3 p-2 bg-green-300 w-1/3 rounded-lg text-black font-bold  ${!disable ? "hover:cursor-not-allowed duration-[500ms,800ms]" : "hover:bg-green-500"} `} disabled={!disable} onClick={submithandle}>
                            {!disable ? <div className=' flex text-center'> <div className="grid-1 my-auto h-5 w-5 mx-3 border-t-transparent border-solid animate-spin rounded-full border-black border-4"></div>
                                <div className="grid-2 my-auto"> Processing... </div></div> : <div className="grid-2 my-auto text-center"> checkout </div>}</button>
                        <button className='m-3 p-2 font-bold w-1/3 bg-green-300 hover:bg-green-500 rounded-md' onClick={() => { dispatch(clearcart()) }}>Clear Cart</button>

                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Cart