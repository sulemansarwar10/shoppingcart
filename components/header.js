import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'
import { checktoken, selectUser } from '../slice/userslice'
import { selectCart, setcart } from '../slice/cartslice'
import Badge from '@mui/material/Badge';
const Header = () => {
    const router = useRouter()

    const dispatch = useDispatch()
    const Userdata = useSelector(selectUser);
    const cart = useSelector(selectCart).items;
    const titems = useSelector(selectCart).totalitems;

    const [dropdowntoggle, setdropdowntoggle] = useState(false)
    const logout = () => {
        localStorage.removeItem("token")
        setdropdowntoggle(false)
        dispatch(checktoken());
    }
    useEffect(() => {
        try {
            if (localStorage.getItem("cart") && Object.keys(cart).length <= 0) {
                dispatch(setcart(JSON.parse(localStorage.getItem("cart")).items))
            }
        } catch (error) {
            localStorage.clear()
        }
        if (localStorage.getItem("token") && !Userdata.token) {
            dispatch(checktoken());
        }

    }, [])

    return (
        <div>
            <header className="text-gray-700 body-font md:max-h-16 max-h-52 mb-10 relative z-10">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center md:items-start ">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 p-2">
                        <Image src="/logo1.svg" alt="Vercel Logo" width={72} height={72} />
                        <span className="ml-3 text-xl cursor-pointer mt-2" onClick={() => router.push('/')}>ITALIA FOOD HUB</span>
                    </a>
                    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l mt-6 md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                        <a onClick={() => router.push('/breakfast')} className="mr-5 cursor-pointer hover:bg-green-100 rounded-lg p-2">BreakFast</a>
                        <a onClick={() => router.push('/fastfood')} className="mr-5 cursor-pointer hover:bg-green-100 rounded-lg p-2">Fast Food</a>
                        <a onClick={() => router.push('/deals')} className="mr-5 cursor-pointer hover:bg-green-100 rounded-lg p-2">Deals</a>
                        <a onClick={() => router.push('/others')} className="mr-5 cursor-pointer hover:bg-green-100 rounded-lg p-2">Sides & Desserts</a>
                    </nav>



                    <div className={`flex  mt-4 mr-2 p-2 ${dropdowntoggle ? "-mr-28" : ""}`}>

                        <Badge badgeContent={titems} color="secondary" max={99}>
                            <ShoppingCartIcon onClick={() => router.push('/cart')} className='cursor-pointer p-2 z-10 ' sx={{ fontSize: 50 }} />
                        </Badge>

                        <div className=' ' onMouseLeave={() => { setdropdowntoggle(false) }}>
                            {!Userdata.token && <Link href='/login'><button className='bg-green-400 rounded-md text-sm p-2 mt-1 ml-3'>Login</button></Link>}

                            {Userdata.token && <PersonOutlineIcon className='cursor-pointer p-2 ' sx={{ fontSize: 50 }} onMouseOver={() => { setdropdowntoggle(true) }} />}
                            {
                                dropdowntoggle && <div className='bg-green-300  text-center z-10  rounded-lg -translate-x-28' >

                                    <ul>
                                        <a onClick={() => router.push('/myaccount')} ><li className='hover:bg-green-600 p-3 w-36 m-3 cursor-pointer rounded-lg'>My Account</li></a>
                                        {Userdata.isAdmin && <a onClick={() => router.push('/addproduct')} > <li className='hover:bg-green-600 p-3 w-36 m-3 cursor-pointer rounded-lg'>Add Product</li></a>}
                                        <a onClick={() => router.push('/orders')} ><li className='hover:bg-green-600 p-3 w-36 m-3 cursor-pointer rounded-lg'>Orders</li></a>
                                        <a onClick={logout}>  <li className='hover:bg-green-600 p-3 w-36 m-3 cursor-pointer rounded-lg'>Log Out</li></a>
                                    </ul>
                                </div>}

                        </div>
                    </div>
                </div>

            </header>
        </div>
    )
}

export default Header