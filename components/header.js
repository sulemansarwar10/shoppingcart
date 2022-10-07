import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
const header = () => {
    const router = useRouter()
    return (
        <div>
            <header className="text-gray-700 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <Image src="/logo1.svg" alt="Vercel Logo" width={72} height={72} />
                        <span className="ml-3 text-xl cursor-pointer" onClick={() => router.push('/')}>ITALIA FOOD HUB</span>
                    </a>
                    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                        <a onClick={() => router.push('/')} className="mr-5 cursor-pointer hover:text-gray-900">BreakFast</a>
                        <a onClick={() => router.push('/')} className="mr-5 cursor-pointer hover:text-gray-900">Fast Food</a>
                        <a onClick={() => router.push('/')} className="mr-5 cursor-pointer hover:text-gray-900">Summer Deals</a>
                        <a onClick={() => router.push('/')} className="mr-5 cursor-pointer hover:text-gray-900">Sides & Desserts</a>
                    </nav>
                    <div className='mt-2'>
                        <Link href='/login'>
                            <PersonOutlineIcon className='text-5xl cursor-pointer p-2' />
                        </Link>
                        <ShoppingCartIcon className='text-5xl cursor-pointer p-2' />
                    </div>
                </div>
            </header></div>
    )
}

export default header