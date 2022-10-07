import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import shopcontext from '../context/shopcontext';

const addproduct = () => {
    const context = useContext(shopcontext)
    const { successtoast, warntoast } = context;
    const router = useRouter()
    const [product, setproduct] = useState({ name: "", img: "", category: "", price: "", disc: "" })
    const onchange = (e) => {
        setproduct({ ...product, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push('/')
        }
    }, [])

    const submithandle = async (e) => {
        e.preventDefault();
        if (product.name == "" || product.img == "" || product.category == "" || product.price == "" || product.disc == "") {
            warntoast('please fill all fields')
        }

        else {

            try {
                const response = await fetch(
                    `/api/product`,
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

                console.log("sign in response", json)
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
        <div>addproduct</div>
    )
}

export default addproduct