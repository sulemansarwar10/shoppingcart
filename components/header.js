import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
                    {/* <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button> */}
                    <AccountCircleIcon onClick={() => router.push('/login')} className='text-5xl cursor-pointer' />
                </div>
            </header></div>
    )
}

export default header