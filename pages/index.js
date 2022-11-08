import { useEffect, useState } from 'react'
import Head from 'next/head'
import mongoose from "mongoose";
import Product from '../models/product';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { checktoken, selectUser } from '../slice/userslice'
import { selectCart, addtocart } from '../slice/cartslice'

export default function Home({ items }) {

  const dispatch = useDispatch()
  const Userdata = useSelector(selectUser);
  const Cartdata = useSelector(selectCart);


  if (!items) {

    return (
      <div className='grid place-content-center font-extrabold min-w-full min-h-screen'>{"Sorry! There are no items are available in this category"} </div>
    )
  }
  else {
    return (<div>
      <section className="text-gray-600 body-font z-0">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-evenly items-end">

            {items.map((item) => {
              return <div key={item.name} className="lg:w-1/4 md:w-1/2 p-4 w-full text-center" >
                <a className="block relative rounded  ">
                  <Image src={item.img} alt="ecommerce" className="object-cover  " width={200} height={200} />
                </a>
                <div className="mt-4">
                  <h2 className="text-gray-900 title-font text-lg font-medium cursor-pointer" onClick={() => { router.push(`/product/${item.name}`) }}>{item.name}</h2>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.disc}</h3>
                  <p className="mt-1">Rs {item.price}</p>
                </div>
                <button className='m-3 p-2 bg-green-300 hover:bg-green-500 rounded-md' onClick={() => { dispatch(addtocart(item)) }}>Add to Cart</button>
              </div>
            })}

          </div>
        </div>
      </section>
    </div>)
  }

}



export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({})
  return {
    props: {
      items: JSON.parse(JSON.stringify(products)),
    },
  }
}