import React, { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import shopcontext from '../context/shopcontext';

const header = () => {
    const router = useRouter()
    const context = useContext(shopcontext)
    const { Userdata, checktoken } = context;
    const [dropdowntoggle, setdropdowntoggle] = useState(false)
    const logout = () => {
        localStorage.removeItem("token")
        setdropdowntoggle(false)
        checktoken();
    }
    useEffect(() => {

        console.log("header useeffect")
        if (localStorage.getItem("token")) {
            checktoken();
        } else {

        }

    }, [])

    return (
        <div>
            <header className="text-gray-700 body-font md:max-h-16 max-h-52 mb-2 relative z-10">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center md:items-start ">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <Image src="/logo1.svg" alt="Vercel Logo" width={72} height={72} />
                        <span className="ml-3 text-xl cursor-pointer mt-2" onClick={() => router.push('/')}>ITALIA FOOD HUB</span>
                    </a>
                    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l mt-6 md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                        <a onClick={() => router.push('/')} className="mr-5 cursor-pointer hover:text-gray-900">BreakFast</a>
                        <a onClick={() => router.push('/')} className="mr-5 cursor-pointer hover:text-gray-900">Fast Food</a>
                        <a onClick={() => router.push('/')} className="mr-5 cursor-pointer hover:text-gray-900">Deals</a>
                        <a onClick={() => router.push('/')} className="mr-5 cursor-pointer hover:text-gray-900">Sides & Desserts</a>
                    </nav>



                    <div className='flex  mt-4 mr-2'>

                        <ShoppingCartIcon onClick={() => router.push('/cart')} className='text-5xl cursor-pointer p-2 z-10' />


                        <div className=' ' onMouseLeave={() => { setdropdowntoggle(false) }}>
                            {!Userdata.token && <Link href='/login'><button className='bg-green-400 rounded-md text-sm p-2 mt-1'>Login</button></Link>}

                            {Userdata.token && <PersonOutlineIcon className='text-5xl cursor-pointer p-2 ' onMouseOver={() => { setdropdowntoggle(true) }} />}
                            {
                                dropdowntoggle && <div className='bg-green-300  text-center z-10 overflow-visible rounded-lg -translate-x-28' >

                                    <ul>
                                        <a onClick={() => router.push('/myaccount')} ><li className='hover:bg-green-600 p-3 w-36 m-3 cursor-pointer'>My Account</li></a>
                                        <a onClick={() => router.push('/addproduct')} > <li className='hover:bg-green-600 p-3 w-36 m-3 cursor-pointer'>Add Product</li></a>
                                        <a onClick={() => router.push('/orders')} ><li className='hover:bg-green-600 p-3 w-36 m-3 cursor-pointer'>Orders</li></a>
                                        <a onClick={logout}>  <li className='hover:bg-green-600 p-3 w-36 m-3 cursor-pointer'>Log Out</li></a>
                                    </ul>
                                </div>}

                        </div>
                    </div>
                </div>

            </header>
        </div>
    )
}

export default header