import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checktoken, selectUser } from '../slice/userslice'
import { useRouter } from 'next/router'
import { useState } from 'react'
const Orders = ({ orders }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const Userdata = useSelector(selectUser);
    const [order, setorder] = useState([])
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push('/')
        }
        const getorder = async () => {
            try {
                const response = await fetch(
                    `/api/orders/allorder`,
                    {
                        body: JSON.stringify(Userdata.email),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST'
                    }
                );

                const json = await response.json(); // parses JSON response into native JavaScript objects
                setorder(json.Orders)

            } catch (error) {

            }

        }
        if (Userdata.email)
            getorder()
    }, [Userdata])

    if (!order || order.length == 0) {
        return (
            <div className='grid place-content-center font-extrabold min-w-full min-h-screen'>{"Sorry! There are no items are available in this category"} </div>
        )
    } else {
        return (

            <div className='mt-28'>
                <h1 className='text-center font-extrabold text-3xl'>Order History</h1>
                <div className="bg-white p-8 rounded-md w-full">

                    <div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Orderid
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                products
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Created at
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Veiw Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.map((od) => {
                                            return (
                                                <tr key={od.orderid}>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex items-center">
                                                            <div className="ml-3">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {od.orderid}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="text-gray-900 whitespace-no-wrap">{Object.keys(od.items).map((o, key) => { return <div key={key}>{o},</div> })}</div>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {new Date(od.createdAt).toString().slice(0, 15)}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {od.totalprice}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <span
                                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                            <span aria-hidden
                                                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                            <span className="relative">{od.deliverystatus}</span>
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <button className='bg-green-300 p-2 rounded-md' onClick={() => { router.push(`/order?id=${od.orderid}`) }}>Veiw Details</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Orders
