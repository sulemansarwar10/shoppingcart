import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../slice/counterslice'

export default function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div className='grid place-content-center font-extrabold min-w-full min-h-screen'>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}