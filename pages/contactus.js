import React, { useState, useContext } from 'react'
import shopcontext from '../context/shopcontext';
function Contactus() {

    const context = useContext(shopcontext)
    const { successtoast, warntoast } = context;

    const [user, setuser] = useState({ name: "", email: "", contact: "", message: "" })
    const onchange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
        //  console.log(user)
    }
    const submithandle = async (e) => {
        e.preventDefault();
        if (user.name == "" || user.email == "" || user.contact == "" || user.message == "") {
            warntoast('please fill all fields')
        }
        else {
            try {
                const response = await fetch(
                    `/api/contact`,
                    {
                        body: JSON.stringify(user),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST'
                    }
                );

                const json = await response.json(); // parses JSON response into native JavaScript objects

                console.log("sign in response", json)
                if (json.success) {

                    successtoast(json.msg)
                    setuser({ name: "", email: "", contact: "", message: "" })
                } else {
                    warntoast(json.msg)
                }
            } catch (error) {

            }


        }
    }


    return (
        <div>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                    <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                        <iframe width="100%" height="100%" className="absolute inset-0" frameBorder="0" title="map" marginHeight="0" marginWidth="0" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1681.0593948888504!2d74.06721493415742!3d32.56680874759753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f1bc066d51a67%3A0x441a43c10267ea1b!2z2LPZhNuM2YXYp9mGINuB2KfZiNiz!5e0!3m2!1sen!2s!4v1664385175951!5m2!1sen!2s"></iframe>
                        <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md   ">
                            <div className="lg:w-1/2 px-6">
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                                <p className="mt-1">Back Side Inyat Hospital Moh. Aziz Abad Sargodha Road Gujrat</p>
                            </div>
                            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                                <a className="text-indigo-500 leading-relaxed">italiafoodhub@gmail.com</a>
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                                <p className="leading-relaxed">+92-347-1032022</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Contact us/Feedback</h2>
                        <p className="leading-relaxed mb-5 text-gray-600">Post your queries & Feedback </p>
                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-600">Name</label>
                            <input type="text" id="name" name="name" value={user.name} onChange={onchange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" id="email" name="email" value={user.email} onChange={onchange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-600">Contact No</label>
                            <input type="text" id="contact" name="contact" value={user.contact} onChange={onchange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-600">Message</label>
                            <textarea id="message" name="message" value={user.message} onChange={onchange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                        <button onClick={submithandle} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contactus