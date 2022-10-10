import React, { useState, useContext, useEffect } from 'react'

const Others = () => {
    useEffect(() => {
        async function fetchData() {

            try {
                const response = await fetch(
                    `/api/others`,
                    {
                        method: 'GET'
                    }
                );

                const json = await response.json(); // parses JSON response into native JavaScript objects

                console.log("product response", json)

            } catch (error) {

            }
        }
        fetchData();

    }, [])


    return (
        <div className='grid place-content-center font-extrabold min-w-full min-h-screen'>{"Sorry! There are no items are available in this category"} </div>
    )
}

export default Others