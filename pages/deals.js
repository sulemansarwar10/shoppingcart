import React, { useState, useContext, useEffect } from 'react'
import shopcontext from '../context/shopcontext';

const Deals = () => {
    const [items, setitems] = useState()
    const context = useContext(shopcontext)
    const { addtocart } = context;

    useEffect(() => {
        async function fetchData() {

            try {
                const response = await fetch(
                    `/api/deals`,
                    {
                        method: 'GET'
                    }
                );

                const json = await response.json(); // parses JSON response into native JavaScript objects
                setitems(json.products)

                console.log("product response", json)

            } catch (error) {

            }
        }
        fetchData();

    }, [])


    if (!items || items == 0) {

        return (
            <div className='grid place-content-center font-extrabold min-w-full min-h-screen'>{"Sorry! There are no items are available in this category"} </div>
        )
    }
    else {
        return (<div>
            <section className="text-gray-600 body-font z-0">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">

                        {items.map((item, key) => {
                            return <div key={item.name} className="lg:w-1/4 md:w-1/2 p-4 w-full" >
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={item.img} />
                                </a>
                                <div className="mt-4">
                                    <h2 className="text-gray-900 title-font text-lg font-medium cursor-pointer" onClick={() => { router.push(`/product/${item.name}`) }}>{item.name}</h2>
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.disc}</h3>
                                    <p className="mt-1">Rs {item.price}</p>
                                </div>
                                <button className='m-3 p-2 bg-green-300 hover:bg-green-500 rounded-md' onClick={() => { addtocart(item) }}>Add to Cart</button>
                            </div>
                        })}

                    </div>
                </div>
            </section>
        </div>)
    }

}

export default Deals