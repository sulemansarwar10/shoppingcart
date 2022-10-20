import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Product = () => {
    const router = useRouter()
    const { slug } = router.query
    const [item, setitem] = useState()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `/api/product`,
                    {
                        body: JSON.stringify({ name: slug }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST'
                    }
                );

                const json = await response.json(); // parses JSON response into native JavaScript objects
                setitem(json.products[0])

            } catch (error) {

            }
        }
        fetchData();

    }, [slug])

    if (item) {

        return (
            <div><section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={item.img} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{item.name}</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                            </div>
                            <p className="leading-relaxed">{item.disc}</p>

                            <div className="flex mt-10 p-5 border-t-2 border-gray-400">
                                <span className="title-font font-medium text-2xl text-gray-900">Rs {item.price}</span>
                                <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">Add to Cart</button>

                            </div>
                        </div>
                    </div>
                </div>
            </section></div>
        )
    }
    else {
        return (
            <div className='grid place-content-center font-extrabold min-w-full min-h-screen'>{"Sorry! There are no items are available in this category"} </div>
        )

    }

}
export default Product