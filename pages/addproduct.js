import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import shopcontext from '../context/shopcontext';

const addproduct = () => {
    const context = useContext(shopcontext)
    const { successtoast, warntoast, Userdata } = context;
    const router = useRouter()
    const [product, setproduct] = useState({ name: "", img: "", category: "", price: "", disc: "", token: "" })
    const onchange = (e) => {
        setproduct({ ...product, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push('/')
        } else {
            setproduct({ ...product, token: localStorage.getItem("token") })
        }
    }, [])

    const submithandle = async (e) => {
        e.preventDefault();
        console.log(product)
        if (product.name == "" || product.img == "" || product.category == "" || product.price == "" || product.disc == "") {
            warntoast('please fill all fields')
        }

        else {

            try {
                const response = await fetch(
                    `/api/addproduct`,
                    {
                        body: JSON.stringify(product),
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': localStorage.getItem("token"),
                        },
                        method: 'POST'
                    }
                );

                const json = await response.json(); // parses JSON response into native JavaScript objects

                if (json.success) {

                    successtoast(json.msg)
                    setproduct({ name: "", img: "", category: "", price: "", disc: "", })
                } else {
                    warntoast(json.msg)
                }
            } catch (error) {

            }

        }
    }
    return (
        <div>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <form onSubmit={submithandle}>
                        <div className="mb-5">
                            <label
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Full Name
                            </label>
                            <input
                                value={product.name} onChange={onchange}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Full Name"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Image Url
                            </label>
                            <input
                                value={product.img} onChange={onchange}
                                type="text"
                                name="img"
                                id="img"
                                placeholder="image url"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label

                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Category
                            </label>
                            <input
                                value={product.category} onChange={onchange}
                                type="text"
                                name="category"
                                id="category"
                                placeholder="category"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                product Price
                            </label>
                            <input
                                value={product.price} onChange={onchange}
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Enter your price"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="mb-3 block text-base font-medium text-[#07074D]">
                                Product Discription
                            </label>
                            <textarea
                                value={product.disc} onChange={onchange}
                                rows="4"
                                name="disc"
                                id="disc"
                                placeholder="Type your message"
                                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            ></textarea>
                        </div>
                        <div>
                            <button
                                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default addproduct