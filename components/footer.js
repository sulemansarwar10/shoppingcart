import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
const footer = () => {
    const router = useRouter()

    return (
        <div>
            <footer className="text-gray-600 body-font">
                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                        <Image src="/logo1.svg" alt="Vercel Logo" width={72} height={72} />
                        <span className="ml-3 text-xl">ITALIA FOOD HUB</span>
                    </a>
                    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2022 Copyrights
                        <a id="mailto" href="mailto:italiafoodhub@gmail.com" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@italiafoodhub</a>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <WhatsAppIcon onClick={() => router.push('https://wa.me/c/923471032022')} className='mx-3 text-5xl cursor-pointer' />
                        <ContactPageIcon onClick={() => router.push('/contactus')} className='mx-3 text-5xl cursor-pointer' />
                        <DeliveryDiningIcon onClick={() => router.push('https://l.wl.co/l?u=https%3A%2F%2Fwww.foodpanda.pk%2Frestaurant%2Febf6%2Fitalia-food-hub')} className='mx-3 text-5xl cursor-pointer' />

                    </span>
                </div>
            </footer></div>
    )
}

export default footer