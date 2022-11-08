import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './slice/toastslice'
import userReducer from './slice/userslice'
import cartReducer from './slice/cartslice'
export const store = configureStore({
    reducer: {
        toast: toastReducer,
        user: userReducer,
        cart: cartReducer
    },
})