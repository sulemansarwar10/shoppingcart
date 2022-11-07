import React from 'react'
import Order from '../models/order'
import mongoose from "mongoose";
import Image from 'next/image';

const MyOrder = ({ order }) => {

    if (!order || order.length == 0) {
        return (
            <div className='grid place-content-center font-extrabold min-w-full min-h-screen'>{"Sorry! There are no items are available in this category"} </div>
        )
    } else {
        const orderitems = order.items
        const delinfo = order.orderinfo
        return (
            <div className='mt-20'>
                <div className="bg-white p-8 rounded-md w-full">
                    <div className=" pb-6">

                        <h2 className="text-gray-600 font-semibold text-3xl">Order # {order.orderid}</h2>
                        <h3 className="text-xl m-2">Order Placed on {new Date(order.createdAt).toString().slice(0, 24)}</h3>

                    </div>
                    <div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-5 py-3 border-b-2 border-green-200 bg-green-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-green-200 bg-green-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Unit Price
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-green-200 bg-green-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Qty
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(order.items).map((od, key) => {
                                            return (<tr key={key}>
                                                <td className="px-5 py-5 border-b border-green-200 bg-white text-sm">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-15 h-15">
                                                            {/* <img className="w-full h-full rounded-full"
                                                            src={orderitems[od].img}
                                                            alt="" /> */}
                                                            <Image src={orderitems[od].img} alt="ecommerce" className="w-full h-full rounded-full" width={50} height={50} />

                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {orderitems[od].name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {orderitems[od].price}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {orderitems[od].qty}
                                                    </p>
                                                </td>
                                            </tr>

                                            )
                                        })}

                                    </tbody>
                                </table>
                                <div className='font-bold flex justify-between m-2'>

                                    <div >Total Price</div>
                                    <div>Rs. {order.totalprice}</div>
                                </div>
                                <div className='font-bold flex justify-between m-2 mt-3'>
                                    <div >Payment Status</div>
                                    <div>{order.paymentstatus}</div>
                                </div>
                                <div className='font-bold flex justify-between m-2 mt-3'>
                                    <div >Delivery Status</div>
                                    <div>{order.deliverystatus}</div>
                                </div>
                                <div className='font-bold flex justify-between m-2 mt-5'>
                                    <h3 className="text-base">Delivery Info</h3>
                                    <div className=''>
                                        <h4 className="text-xs">{delinfo.fname + " " + delinfo.lname}</h4>
                                        <h4 className="text-xs">{delinfo.dcontact}</h4>
                                        <h4 className="text-xs">{delinfo.demail}</h4>
                                        <h4 className="text-xs break-words max-w-xs">{delinfo.daddress}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyOrder

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    let order = await Order.findOne({ orderid: context.query.id })
    return {
        props: {
            order: JSON.parse(JSON.stringify(order)),
        },
    }
}