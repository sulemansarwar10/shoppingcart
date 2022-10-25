import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checktoken, selectUser } from '../slice/userslice'
import { selectCart, addtocart, removetocart, clearcart, checkout } from '../slice/cartslice'

const Cart = () => {

    const dispatch = useDispatch()

    const cart = useSelector(selectCart).items;
    const subtotal = useSelector(selectCart).subtotal;
    console.log("cart", cart)
    if (Object.keys(cart).length == 0)
        return (
            <div className='grid place-content-center font-extrabold min-w-full min-h-screen'>{"Your Cart is Empty"} </div>
        )
    else {
        return (
            <div className='grid place-content-center min-w-full my-24'>
                {Object.keys(cart).map((item, key) => {
                    return <div key={key} className="m-7 flex justify-around border-green-500 border-4">
                        <img src={cart[item].img} className="w-28 h-28" />
                        <div className='mt-5'>
                            <h1 className='font-extrabold'>{cart[item].name}</h1>
                            <h3>Rs. {cart[item].price * cart[item].qty}</h3>
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
                <button className='m-3 p-2 bg-green-300 hover:bg-green-500 rounded-md' onClick={() => { dispatch(checkout(cart)) }}>checkout</button>
                <button className='m-3 p-2 bg-green-300 hover:bg-green-500 rounded-md' onClick={() => { dispatch(clearcart()) }}>Clear Cart</button>

            </div>
        )
    }
}

export default Cart