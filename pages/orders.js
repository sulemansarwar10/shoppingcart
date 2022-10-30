import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checktoken, selectUser } from '../slice/userslice'
import { useRouter } from 'next/router'
import mongoose from "mongoose";
import Order from '../models/order'
const Orders = ({ orders }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const Userdata = useSelector(selectUser);
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push('/')
        }
    }, [Userdata])

    if (!orders) {
        return (
            <div className='grid place-content-center font-extrabold min-w-full min-h-screen'>{"Sorry! There are no items are available in this category"} </div>
        )
    } else {
        return (
            <div className='grid place-content-center font-extrabold min-w-full min-h-screen'>{orders[0].email} </div>
        )
    }
}

export default Orders

export async function getServerSideProps() {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let ord = await Order.find({ email: Userdata.email })
    return {
        props: {
            orders: JSON.parse(JSON.stringify(ord)),
        },
    }
}